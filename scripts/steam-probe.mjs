// Prueba técnica de la Steam Web API (Fase 2 del plan).
// Con UNA clave de la app se leen los datos de CUALQUIER usuario de Steam con perfil público.
// En producción el SteamID llegará del "Iniciar sesión con Steam"; aquí se pasa a mano.
//
// Uso: npm run steam:probe -- <perfil>
//   <perfil> = SteamID64, URL del perfil o nombre personalizado de cualquier usuario

import { mkdir, writeFile } from 'node:fs/promises';

const API = 'https://api.steampowered.com';
const GAMES_TO_SAMPLE = 5;

const key = process.env.STEAM_API_KEY;
const rawId = process.argv[2];

if (!key || key.startsWith('pega-')) {
  console.error('Falta STEAM_API_KEY en el archivo .env (mira .env.example).');
  process.exit(1);
}

if (!rawId) {
  console.error('Indica el perfil a analizar: npm run steam:probe -- https://steamcommunity.com/id/usuario');
  process.exit(1);
}

async function steam(path, params = {}) {
  const url = new URL(`${API}/${path}`);
  Object.entries({ key, format: 'json', ...params }).forEach(([name, value]) => url.searchParams.set(name, value));

  const response = await fetch(url);
  const body = await response.json().catch(() => null);
  return { status: response.status, body };
}

// Acepta SteamID64, URL de perfil (/profiles/123 o /id/nombre) o nombre personalizado
async function resolveSteamId(input) {
  const trimmed = input.trim().replace(/\/+$/, '');
  const fromUrl = trimmed.match(/\/(profiles|id)\/([^/]+)$/);
  const [kind, value] = fromUrl ? [fromUrl[1], fromUrl[2]] : [/^\d{17}$/.test(trimmed) ? 'profiles' : 'id', trimmed];

  if (kind === 'profiles') return value;

  const { body } = await steam('ISteamUser/ResolveVanityURL/v1/', { vanityurl: value });
  if (body?.response?.success !== 1) throw new Error(`No se encontró el perfil "${value}".`);
  return body.response.steamid;
}

const formatDate = (unix) => (unix ? new Date(unix * 1000).toLocaleDateString('es-ES') : '—');

async function main() {
  const steamId = await resolveSteamId(rawId);

  const { status: summaryStatus, body: summary } = await steam('ISteamUser/GetPlayerSummaries/v2/', { steamids: steamId });
  if (summaryStatus === 403) throw new Error('Steam rechazó la clave de API (403). Revisa STEAM_API_KEY.');
  const player = summary?.response?.players?.[0];
  if (!player) throw new Error(`No existe ningún perfil con SteamID ${steamId}.`);

  console.log(`\nPerfil: ${player.personaname} (${steamId})`);
  console.log(`Visibilidad: ${player.communityvisibilitystate === 3 ? 'pública' : 'PRIVADA'}`);

  const { body: owned } = await steam('IPlayerService/GetOwnedGames/v1/', {
    steamid: steamId,
    include_appinfo: 1,
    include_played_free_games: 1,
  });
  const games = owned?.response?.games;

  if (!games) {
    console.log('\nSteam no devuelve juegos: el perfil o los "Detalles de juegos" son privados.');
    console.log('Cámbialo en Steam → Perfil → Editar perfil → Privacidad → Detalles de juegos: Público.');
    return;
  }

  const topGames = [...games].sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, GAMES_TO_SAMPLE);
  console.log(`Juegos en la biblioteca: ${games.length}. Analizando los ${topGames.length} más jugados…\n`);

  const sample = { fetchedAt: new Date().toISOString(), player: { steamId, name: player.personaname, avatar: player.avatarfull }, games: [] };

  for (const game of topGames) {
    const hours = Math.round(game.playtime_forever / 60);
    const [{ status, body: progress }, { body: schema }, { body: global }] = await Promise.all([
      steam('ISteamUserStats/GetPlayerAchievements/v1/', { steamid: steamId, appid: game.appid, l: 'spanish' }),
      steam('ISteamUserStats/GetSchemaForGame/v2/', { appid: game.appid, l: 'spanish' }),
      steam('ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/', { gameid: game.appid }),
    ]);

    const playerAchievements = progress?.playerstats?.achievements;
    if (!playerAchievements) {
      const reason = status === 403 ? 'perfil privado' : 'el juego no tiene logros';
      console.log(`· ${game.name} — ${hours} h — sin datos (${reason})`);
      sample.games.push({ appid: game.appid, name: game.name, hours, achievements: null, reason });
      continue;
    }

    const schemaByName = new Map((schema?.game?.availableGameStats?.achievements ?? []).map((item) => [item.name, item]));
    const rarityByName = new Map(
      (global?.achievementpercentages?.achievements ?? []).map((item) => [item.name, Number(item.percent)]),
    );

    const achievements = playerAchievements.map(({ apiname, achieved, unlocktime }) => {
      const info = schemaByName.get(apiname) ?? {};
      return {
        id: apiname,
        title: info.displayName ?? apiname,
        description: info.description ?? '',
        hidden: info.hidden === 1,
        icon: info.icon ?? null,
        iconLocked: info.icongray ?? null,
        rarityPercent: rarityByName.has(apiname) ? Math.round(rarityByName.get(apiname) * 10) / 10 : null,
        unlocked: achieved === 1,
        unlockedAt: achieved === 1 ? new Date(unlocktime * 1000).toISOString() : null,
      };
    });

    const unlocked = achievements.filter(({ unlocked: isUnlocked }) => isUnlocked);
    const rarest = [...unlocked].sort((a, b) => (a.rarityPercent ?? 100) - (b.rarityPercent ?? 100))[0];
    const percentage = Math.round((unlocked.length / achievements.length) * 100);

    console.log(`· ${game.name} — ${hours} h — ${unlocked.length}/${achievements.length} logros (${percentage}%)`);
    if (rarest) console.log(`    más raro: "${rarest.title}" (${rarest.rarityPercent ?? '?'}% de jugadores, ${formatDate(Date.parse(rarest.unlockedAt) / 1000)})`);

    sample.games.push({
      appid: game.appid,
      name: game.name,
      hours,
      lastPlayed: game.rtime_last_played ? new Date(game.rtime_last_played * 1000).toISOString() : null,
      achievements,
    });
  }

  await mkdir('scripts/out', { recursive: true });
  await writeFile('scripts/out/steam-sample.json', JSON.stringify(sample, null, 2));
  console.log('\nMuestra completa guardada en scripts/out/steam-sample.json');
}

main().catch((error) => {
  console.error(`\nError: ${error.message}`);
  process.exit(1);
});
