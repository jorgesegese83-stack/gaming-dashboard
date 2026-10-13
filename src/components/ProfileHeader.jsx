import { useState } from 'react';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

// Iconos duotono: relleno suave + trazo, estilo vitrina de trofeos
const duotone = { fill: 'currentColor', fillOpacity: 0.22 };

function MedalIcon({ className }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M7.5 2.5h3l2.4 6-2.5 1z" {...duotone} />
      <path d="M16.5 2.5h-3l-1.4 3.4M16.5 2.5l-2.3 6.1" />
      <circle cx="12" cy="15" r="6" {...duotone} />
      <path d="M12 11.8l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z" fill="currentColor" strokeWidth={1} />
    </svg>
  );
}

function PlatinumTrophyIcon({ className }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M7 3.5h10V9a5 5 0 0 1-10 0z" {...duotone} />
      <path d="M17 5h2.5v1.5A3.5 3.5 0 0 1 16.4 10M7 5H4.5v1.5A3.5 3.5 0 0 0 7.6 10M12 14v3.5M8 21h8l-1-3.5H9z" />
      <path d="M12 5.6l.7 1.4 1.5.2-1.1 1.1.3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1.1 1.5-.2z" fill="currentColor" strokeWidth={0.8} />
    </svg>
  );
}

function CrownIcon({ className }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M3.5 8l4.5 4 4-7 4 7 4.5-4-1.8 10H5.3z" {...duotone} />
      <path d="M5.5 21h13" />
      <circle cx="12" cy="13.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Anillo de progreso real con el promedio de completado
function ProgressRing({ value }) {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90" aria-hidden="true">
      <circle cx="18" cy="18" r={radius} fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={3.5} />
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - value / 100)}
        className="transition-[stroke-dashoffset] duration-1000 ease-out"
      />
    </svg>
  );
}

// Nombres completos para que Tailwind no purgue las variantes
const STAT_TONES = {
  game: 'stat-icon',
  platinum: 'stat-icon stat-icon--platinum',
  gold: 'stat-icon stat-icon--gold',
};

function StatCard({ icon, label, value, detail, tone = 'game' }) {
  return (
    <div className="group/stat flex flex-col items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] sm:flex-row sm:items-center">
      <span
        className={`${STAT_TONES[tone]} flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover/stat:scale-110`}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-numeric text-2xl font-bold leading-none tabular-nums text-white">{value}</p>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        {detail && <p className="text-[11px] text-slate-500">{detail}</p>}
      </div>
    </div>
  );
}

function LevelChip({ level, variant = 'current' }) {
  const isNext = variant === 'next';

  return (
    <span
      className={`level-chip inline-flex shrink-0 items-baseline gap-1 rounded-md px-2.5 py-1 ${isNext ? 'level-chip--next' : ''}`}
      aria-label={isNext ? `Siguiente nivel: ${level}` : `Nivel actual: ${level}`}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Nv.</span>
      <span className="level-chip__value font-numeric text-lg font-bold leading-none tabular-nums">{level}</span>
    </span>
  );
}

function LiveStatus({ status, currentGame }) {
  const isOnline = status !== 'offline';
  const isPlaying = status === 'playing' && currentGame;

  if (!isOnline) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-400">
        <span className="h-2 w-2 rounded-full bg-slate-500" />
        Desconectado
      </span>
    );
  }

  return (
    <span className="relative inline-flex">
      <span className="absolute -inset-0.5 animate-pulse rounded-full bg-gradient-to-r from-emerald-400/40 to-cyan-400/40 blur-sm" />
      <span className="relative inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-slate-950/70 px-3 py-1 text-xs font-semibold backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-emerald-300 to-cyan-400" />
        </span>
        <span className="text-emerald-300">En línea</span>
        {isPlaying && (
          <>
            <span className="text-slate-500">—</span>
            <span className="text-cyan-100">Jugando a {currentGame}</span>
          </>
        )}
      </span>
    </span>
  );
}

export default function ProfileHeader({ profile, stats, featuredGame }) {
  const { username, title, avatar, level, currentXp, nextLevelXp, status, currentGame, memberSince } = profile;
  const { unlocked, total, platinums, perfectGames, averageCompletion } = stats;
  const [hasAvatarError, setHasAvatarError] = useState(false);

  const xpPercentage = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));
  const xpRemaining = Math.max(0, nextLevelXp - currentXp);

  return (
    <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-glass backdrop-blur-xl">
      {featuredGame && (
        <span className="pointer-events-none absolute right-5 top-3.5 hidden items-center gap-2 rounded-md border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md sm:inline-flex">
          <span className="text-game h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
          Jugando ahora · {featuredGame.title}
        </span>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative flex flex-col gap-8 p-6 sm:p-8 sm:pt-12">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:text-left">
          <div className="relative shrink-0">
            <div className="avatar-halo pointer-events-none absolute -inset-6 rounded-full" />
            <div className="avatar-neon relative h-28 w-28 rounded-full ring-2 ring-[rgb(var(--game-rgb)/0.55)] ring-offset-4 ring-offset-black">
              <div className="h-full w-full overflow-hidden rounded-full bg-slate-900">
                {hasAvatarError || !avatar ? (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[rgb(var(--game-rgb)/0.5)] via-slate-900 to-black font-numeric text-4xl font-bold text-white">
                    {username.slice(0, 2).toUpperCase()}
                  </div>
                ) : (
                  <img
                    src={avatar}
                    alt={`Avatar de ${username}`}
                    onError={() => setHasAvatarError(true)}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
            {status !== 'offline' && (
              <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950">
                <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative h-3.5 w-3.5 rounded-full bg-gradient-to-br from-emerald-300 to-cyan-400" />
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</p>
            <h1 className="mt-1 break-all text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl">{username}</h1>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <LiveStatus status={status} currentGame={currentGame} />
              <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-slate-400 backdrop-blur-md">
                Miembro desde <span className="font-numeric font-semibold text-slate-200">{memberSince}</span>
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 flex flex-wrap items-end justify-between gap-2 text-xs">
            <span className="font-semibold uppercase tracking-widest text-slate-400">Experiencia</span>
            <span className="font-numeric text-sm font-semibold tabular-nums text-slate-400">
              <span className="text-white">{currentXp.toLocaleString('es-AR')}</span> / {nextLevelXp.toLocaleString('es-AR')} XP
              <span className="text-game ml-2">−{xpRemaining.toLocaleString('es-AR')}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <LevelChip level={level} />
            <div
              className="relative h-2.5 flex-1 rounded-full border border-white/10 bg-black/50"
              role="progressbar"
              aria-label="Progreso de experiencia"
              aria-valuenow={xpPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="xp-fill relative h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{ width: `${xpPercentage}%` }}
              >
                <span className="xp-tip absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full" />
              </div>
            </div>
            <LevelChip level={level + 1} variant="next" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            icon={<MedalIcon className="h-5 w-5" />}
            label="Logros"
            value={`${unlocked}/${total}`}
            detail={`${total - unlocked} por desbloquear`}
            tone="game"
          />
          <StatCard
            icon={<PlatinumTrophyIcon className="h-5 w-5" />}
            label="Platinos"
            value={platinums}
            detail="Trofeos máximos"
            tone="platinum"
          />
          <StatCard
            icon={<CrownIcon className="h-5 w-5" />}
            label="Juegos al 100%"
            value={perfectGames}
            detail="Completados"
            tone="gold"
          />
          <StatCard
            icon={<ProgressRing value={averageCompletion} />}
            label="Promedio"
            value={`${averageCompletion}%`}
            detail="De completado"
            tone="game"
          />
        </div>
      </div>
    </header>
  );
}
