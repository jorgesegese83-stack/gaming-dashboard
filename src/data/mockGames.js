const STEAM_ASSETS = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps';

export const PLATFORMS = {
  ALL: 'all',
  STEAM: 'steam',
  PSN: 'psn',
};

export const PLATFORM_LABELS = {
  [PLATFORMS.ALL]: 'Todos',
  [PLATFORMS.STEAM]: 'Steam',
  [PLATFORMS.PSN]: 'PlayStation',
};

export const RARITY = {
  COMMON: 'common',
  RARE: 'rare',
  ULTRA: 'ultra',
};

export const userProfile = {
  username: 'NeonRonin_83',
  title: 'Cazador de Trofeos',
  avatar: 'https://unsplash.com/photos/1kl2uGs6k5w/download?w=400',
  level: 42,
  currentXp: 7350,
  nextLevelXp: 10000,
  status: 'playing',
  currentGame: 'Elden Ring',
  memberSince: 2015,
};

const rawGames = [
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    platform: PLATFORMS.STEAM,
    heroBanner: `${STEAM_ASSETS}/1245620/library_hero.jpg`,
    art: {
      capsule: `${STEAM_ASSETS}/1245620/capsule_616x353.jpg`,
      header: `${STEAM_ASSETS}/1245620/header.jpg?t=1787868578`,
    },
    accentColor: '#eab308',
    pattern: 'rings',
    monogram: 'ER',
    playtimeHours: 186,
    lastPlayed: '2026-10-11',
    achievements: [
      { id: 'er-01', icon: 'sword', title: 'Shardbearer Godrick', description: 'Derrotaste a Godrick el Injertado.', rarity: RARITY.COMMON, rarityPercent: 62.1, unlockedAt: '2024-03-02' },
      { id: 'er-02', icon: 'moon', title: 'Shardbearer Rennala', description: 'Derrotaste a Rennala, Reina de la Luna Llena.', rarity: RARITY.COMMON, rarityPercent: 51.4, unlockedAt: '2024-03-09' },
      { id: 'er-03', icon: 'drop', title: 'Shardbearer Radahn', description: 'Derrotaste al General Radahn, Azote de las Estrellas.', rarity: RARITY.RARE, rarityPercent: 38.7, unlockedAt: '2024-03-20' },
      { id: 'er-04', icon: 'tree', title: 'Shardbearer Morgott', description: 'Derrotaste a Morgott, el Rey de los Augurios.', rarity: RARITY.RARE, rarityPercent: 34.2, unlockedAt: '2024-04-01' },
      { id: 'er-05', icon: 'swords', title: 'Legendary Armaments', description: 'Conseguiste todas las armas legendarias.', rarity: RARITY.ULTRA, rarityPercent: 9.8, unlockedAt: '2024-04-15' },
      { id: 'er-06', icon: 'butterfly', title: 'Malenia, Blade of Miquella', description: 'Derrotaste a Malenia, la Espada de Miquella.', rarity: RARITY.ULTRA, rarityPercent: 7.3, unlockedAt: null },
      { id: 'er-07', icon: 'sparkles', title: 'Age of the Stars', description: 'Alcanzaste el final de la Era de las Estrellas.', rarity: RARITY.ULTRA, rarityPercent: 8.1, unlockedAt: null },
      { id: 'er-08', icon: 'crown', title: 'Elden Lord', description: 'Alcanzaste el final del Señor del Círculo.', rarity: RARITY.RARE, rarityPercent: 20.4, unlockedAt: '2024-05-02' },
    ],
  },
  {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    platform: PLATFORMS.STEAM,
    heroBanner: `${STEAM_ASSETS}/1091500/library_hero.jpg`,
    art: {
      capsule: `${STEAM_ASSETS}/1091500/capsule_616x353.jpg`,
      header: `${STEAM_ASSETS}/1091500/e9047d8ec47ae3d94bb8b464fb0fc9e9972b4ac7/header.jpg?t=1784714077`,
    },
    accentColor: '#ffee00',
    pattern: 'circuit',
    monogram: 'CP',
    playtimeHours: 94,
    lastPlayed: '2026-09-28',
    achievements: [
      { id: 'cp-01', icon: 'city', title: 'Bienvenido a Night City', description: 'Completá el prólogo y convertite en mercenario.', rarity: RARITY.COMMON, rarityPercent: 78.5, unlockedAt: '2023-11-10' },
      { id: 'cp-02', icon: 'chip', title: 'Cromado hasta los dientes', description: 'Instalá 10 implantes cibernéticos.', rarity: RARITY.COMMON, rarityPercent: 55.2, unlockedAt: '2023-11-18' },
      { id: 'cp-03', icon: 'car', title: 'Piloto de la Avenida', description: 'Conseguí 10 vehículos diferentes.', rarity: RARITY.RARE, rarityPercent: 27.6, unlockedAt: '2023-12-02' },
      { id: 'cp-04', icon: 'terminal', title: 'Netrunner legendario', description: 'Neutralizá a 100 enemigos con hackeos rápidos.', rarity: RARITY.RARE, rarityPercent: 18.9, unlockedAt: null },
      { id: 'cp-05', icon: 'audio', title: 'Samurái para siempre', description: 'Completá todas las misiones secundarias de Johnny.', rarity: RARITY.RARE, rarityPercent: 22.3, unlockedAt: '2024-01-05' },
      { id: 'cp-06', icon: 'crosshair', title: 'Arsenal icónico', description: 'Reuní todas las armas icónicas.', rarity: RARITY.ULTRA, rarityPercent: 4.2, unlockedAt: null },
      { id: 'cp-07', icon: 'sunrise', title: 'Bajo el Sol', description: 'Alcanzá el final del Sol.', rarity: RARITY.ULTRA, rarityPercent: 11.7, unlockedAt: '2024-01-20' },
      { id: 'cp-08', icon: 'cards', title: 'Todas las cartas', description: 'Desbloqueá todos los finales del juego.', rarity: RARITY.ULTRA, rarityPercent: 3.1, unlockedAt: null },
    ],
  },
  {
    id: 'hades',
    title: 'Hades',
    platform: PLATFORMS.STEAM,
    heroBanner: `${STEAM_ASSETS}/1145360/library_hero.jpg`,
    art: {
      capsule: `${STEAM_ASSETS}/1145360/capsule_616x353.jpg`,
      header: `${STEAM_ASSETS}/1145360/header.jpg?t=1758127023`,
    },
    accentColor: '#ff4655',
    pattern: 'diagonal',
    monogram: 'HD',
    playtimeHours: 72,
    lastPlayed: '2026-08-15',
    achievements: [
      { id: 'hd-01', icon: 'flame', title: 'Escape del Inframundo', description: 'Escapá del Inframundo por primera vez.', rarity: RARITY.COMMON, rarityPercent: 48.3, unlockedAt: '2024-06-10' },
      { id: 'hd-02', icon: 'bolt', title: 'Bendición del Olimpo', description: 'Recibí dones de todos los dioses olímpicos.', rarity: RARITY.COMMON, rarityPercent: 41.0, unlockedAt: '2024-06-04' },
      { id: 'hd-03', icon: 'sword', title: 'Maestro de armas', description: 'Escapá con cada una de las Armas Infernales.', rarity: RARITY.RARE, rarityPercent: 19.6, unlockedAt: '2024-07-01' },
      { id: 'hd-04', icon: 'paw', title: 'El mejor amigo', description: 'Acariciá al perro guardián de la Casa de Hades.', rarity: RARITY.COMMON, rarityPercent: 66.8, unlockedAt: '2024-05-28' },
      { id: 'hd-05', icon: 'skull', title: 'Calor extremo', description: 'Escapá con 32 de Calor activado.', rarity: RARITY.ULTRA, rarityPercent: 2.4, unlockedAt: null },
      { id: 'hd-06', icon: 'temple', title: 'Arquitecto de la Casa', description: 'Comprá todas las renovaciones del Contratista.', rarity: RARITY.RARE, rarityPercent: 14.5, unlockedAt: '2024-07-20' },
      { id: 'hd-07', icon: 'heart', title: 'Relaciones divinas', description: 'Alcanzá la confianza máxima con todos los personajes.', rarity: RARITY.ULTRA, rarityPercent: 6.9, unlockedAt: '2024-08-11' },
      { id: 'hd-08', icon: 'flower', title: 'Final verdadero', description: 'Completá el epílogo de la historia.', rarity: RARITY.RARE, rarityPercent: 16.2, unlockedAt: '2024-08-02' },
    ],
  },
  {
    id: 'god-of-war-ragnarok',
    title: 'God of War Ragnarök',
    platform: PLATFORMS.PSN,
    heroBanner: `${STEAM_ASSETS}/2322010/library_hero.jpg`,
    art: {
      capsule: `${STEAM_ASSETS}/2322010/capsule_616x353.jpg`,
      header: `${STEAM_ASSETS}/2322010/header.jpg?t=1776465233`,
    },
    accentColor: '#5ec8ff',
    pattern: 'hex',
    monogram: 'GoW',
    playtimeHours: 58,
    lastPlayed: '2026-07-30',
    achievements: [
      { id: 'gw-01', icon: 'axe', title: 'Padre e hijo', description: 'Completá el prólogo.', rarity: RARITY.COMMON, rarityPercent: 89.2, unlockedAt: '2026-06-02' },
      { id: 'gw-02', icon: 'snowflake', title: 'Fimbulwinter', description: 'Sobreviví al gran invierno.', rarity: RARITY.COMMON, rarityPercent: 74.5, unlockedAt: '2026-06-05' },
      { id: 'gw-03', icon: 'moon', title: 'Aullido del lobo', description: 'Recorré los Nueve Reinos en trineo.', rarity: RARITY.COMMON, rarityPercent: 63.0, unlockedAt: '2026-06-09' },
      { id: 'gw-04', icon: 'hammer', title: 'Herrero de los Nueve Reinos', description: 'Mejorá el Hacha Leviatán al nivel máximo.', rarity: RARITY.RARE, rarityPercent: 21.3, unlockedAt: '2026-07-01' },
      { id: 'gw-05', icon: 'crown', title: 'Reina Valquiria', description: 'Derrotá a la reina de las Valquirias.', rarity: RARITY.ULTRA, rarityPercent: 9.4, unlockedAt: '2026-07-18' },
      { id: 'gw-06', icon: 'mountain', title: 'Ragnarök', description: 'Completá la historia principal.', rarity: RARITY.RARE, rarityPercent: 45.6, unlockedAt: '2026-06-28' },
      { id: 'gw-07', icon: 'map', title: 'Explorador de reinos', description: 'Completá todos los Favores.', rarity: RARITY.RARE, rarityPercent: 15.8, unlockedAt: '2026-07-25' },
      { id: 'gw-08', icon: 'trophy', title: 'Platino: Dios de la Guerra', description: 'Conseguí todos los trofeos del juego.', rarity: RARITY.ULTRA, rarityPercent: 5.1, unlockedAt: '2026-07-30', isPlatinum: true },
    ],
  },
  {
    id: 'ghost-of-tsushima',
    title: 'Ghost of Tsushima',
    platform: PLATFORMS.PSN,
    heroBanner: `${STEAM_ASSETS}/2215430/library_hero.jpg`,
    art: {
      capsule: `${STEAM_ASSETS}/2215430/capsule_616x353.jpg`,
      header: `${STEAM_ASSETS}/2215430/header.jpg?t=1763409398`,
    },
    accentColor: '#f9a8d4',
    pattern: 'waves',
    monogram: 'GoT',
    playtimeHours: 64,
    lastPlayed: '2026-05-14',
    achievements: [
      { id: 'gt-01', icon: 'torii', title: 'El camino del Fantasma', description: 'Completá el Acto I.', rarity: RARITY.COMMON, rarityPercent: 82.4, unlockedAt: '2025-01-12' },
      { id: 'gt-02', icon: 'sword', title: 'Maestro de las posturas', description: 'Desbloqueá todas las posturas de combate.', rarity: RARITY.RARE, rarityPercent: 31.5, unlockedAt: '2025-01-25' },
      { id: 'gt-03', icon: 'paw', title: 'Amigo de los zorros', description: 'Seguí a los zorros hasta todos los santuarios.', rarity: RARITY.RARE, rarityPercent: 24.8, unlockedAt: '2025-02-03' },
      { id: 'gt-04', icon: 'waves', title: 'Aguas termales', description: 'Visitá todas las aguas termales de la isla.', rarity: RARITY.COMMON, rarityPercent: 47.9, unlockedAt: '2025-02-01' },
      { id: 'gt-05', icon: 'flower', title: 'Poeta del viento', description: 'Componé todos los haikus.', rarity: RARITY.RARE, rarityPercent: 28.1, unlockedAt: '2025-02-10' },
      { id: 'gt-06', icon: 'swords', title: 'Duelista invicto', description: 'Ganá todos los duelos.', rarity: RARITY.RARE, rarityPercent: 36.2, unlockedAt: '2025-02-14' },
      { id: 'gt-07', icon: 'castle', title: 'Leyenda de Tsushima', description: 'Liberá todos los territorios de la isla.', rarity: RARITY.ULTRA, rarityPercent: 12.6, unlockedAt: null },
      { id: 'gt-08', icon: 'trophy', title: 'Platino: El Fantasma', description: 'Conseguí todos los trofeos del juego.', rarity: RARITY.ULTRA, rarityPercent: 8.7, unlockedAt: null, isPlatinum: true },
    ],
  },
  {
    id: 'spider-man-remastered',
    title: "Marvel's Spider-Man Remastered",
    platform: PLATFORMS.PSN,
    heroBanner: `${STEAM_ASSETS}/1817070/library_hero.jpg`,
    art: {
      capsule: `${STEAM_ASSETS}/1817070/capsule_616x353.jpg`,
      header: `${STEAM_ASSETS}/1817070/header.jpg?t=1787838689`,
    },
    accentColor: '#ef233c',
    pattern: 'grid',
    monogram: 'SM',
    playtimeHours: 31,
    lastPlayed: '2026-10-02',
    achievements: [
      { id: 'sm-01', icon: 'spider', title: 'Amigo y vecino', description: 'Completá el prólogo.', rarity: RARITY.COMMON, rarityPercent: 91.3, unlockedAt: '2025-08-20' },
      { id: 'sm-02', icon: 'backpack', title: 'Coleccionista de mochilas', description: 'Encontrá todas las mochilas ocultas.', rarity: RARITY.RARE, rarityPercent: 33.4, unlockedAt: '2025-08-28' },
      { id: 'sm-03', icon: 'camera', title: 'Fotógrafo urbano', description: 'Fotografiá todos los monumentos de la ciudad.', rarity: RARITY.RARE, rarityPercent: 27.2, unlockedAt: null },
      { id: 'sm-04', icon: 'mask', title: 'Cazador de villanos', description: 'Derrotá a los seis grandes villanos.', rarity: RARITY.COMMON, rarityPercent: 58.6, unlockedAt: '2025-09-05' },
      { id: 'sm-05', icon: 'flask', title: 'Científico brillante', description: 'Completá todas las investigaciones.', rarity: RARITY.RARE, rarityPercent: 22.9, unlockedAt: null },
      { id: 'sm-06', icon: 'shirt', title: 'Armario completo', description: 'Desbloqueá todos los trajes.', rarity: RARITY.ULTRA, rarityPercent: 14.3, unlockedAt: null },
      { id: 'sm-07', icon: 'city', title: 'Rey de los tejados', description: 'Completá todos los desafíos de la ciudad.', rarity: RARITY.ULTRA, rarityPercent: 10.5, unlockedAt: null },
      { id: 'sm-08', icon: 'trophy', title: 'Platino: Spectacular', description: 'Conseguí todos los trofeos del juego.', rarity: RARITY.ULTRA, rarityPercent: 9.9, unlockedAt: null, isPlatinum: true },
    ],
  },
];

export const mockGames = rawGames.map((game) => ({
  ...game,
  // Logo transparente oficial de la biblioteca de Steam (misma carpeta que el banner)
  logo: game.heroBanner.replace('library_hero.jpg', 'logo.png'),
  achievements: game.achievements.map((achievement) => ({
    ...achievement,
    unlocked: achievement.unlockedAt !== null,
    isPlatinum: achievement.isPlatinum ?? false,
  })),
}));

export const getAchievementStats = ({ achievements }) => {
  const total = achievements.length;
  const unlocked = achievements.filter(({ unlocked: isUnlocked }) => isUnlocked).length;
  const percentage = total === 0 ? 0 : Math.round((unlocked / total) * 100);

  return { unlocked, total, percentage };
};

export const formatDate = (isoDate) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
