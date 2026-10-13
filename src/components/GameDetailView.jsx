import { useEffect, useMemo, useState } from 'react';
import AchievementIcon from './AchievementIcon';
import PlatformBadge from './PlatformBadge';
import PlatinumBadge, { TrophyIcon } from './PlatinumBadge';
import { RARITY, formatDate, getAchievementStats } from '../data/mockGames';
import { hexToRgbTriplet } from '../utils/color';

const RARITY_STYLES = {
  [RARITY.COMMON]: {
    label: 'Común',
    rgb: '161 161 170',
    badge: 'border-rarity-common/30 bg-rarity-common/10 text-rarity-common',
  },
  [RARITY.RARE]: {
    label: 'Raro',
    rgb: '56 189 248',
    badge: 'border-rarity-rare/30 bg-rarity-rare/10 text-rarity-rare',
  },
  [RARITY.ULTRA]: {
    label: 'Ultra Raro',
    rgb: '232 121 249',
    badge: 'border-rarity-ultra/30 bg-rarity-ultra/10 text-rarity-ultra',
  },
};

const PLATINUM_STYLE = {
  label: 'Platino',
  rgb: '245 197 66',
  badge: 'platinum-badge',
};

const TABS = [
  { id: 'all', label: 'Todos' },
  { id: 'unlocked', label: 'Desbloqueados' },
  { id: 'locked', label: 'Bloqueados' },
];

function ArrowLeftIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

// Logo oficial del juego; si no existe, título en texto gigante
function GameLogo({ src, title }) {
  const [hasLogo, setHasLogo] = useState(Boolean(src));

  return (
    <h1 id="game-detail-title" className="mt-4">
      {hasLogo ? (
        <>
          <img
            src={src}
            alt=""
            onError={() => setHasLogo(false)}
            className="-my-6 h-auto w-[min(32rem,85%)] object-contain object-left drop-shadow-[0_6px_24px_rgb(0_0_0/0.8)]"
          />
          <span className="sr-only">{title}</span>
        </>
      ) : (
        <span className="block text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgb(0_0_0/0.8)] sm:text-6xl lg:text-7xl">
          {title}
        </span>
      )}
    </h1>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <p className="font-numeric text-2xl font-bold leading-none tabular-nums text-white">{value}</p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
    </div>
  );
}

function AchievementItem({ achievement }) {
  const { icon, title, description, rarity, rarityPercent, unlocked, unlockedAt, isPlatinum } = achievement;
  const rarityStyle = isPlatinum ? PLATINUM_STYLE : RARITY_STYLES[rarity];

  return (
    <li
      style={{ '--ach-rgb': rarityStyle.rgb }}
      className={`group flex items-center gap-4 rounded-2xl border p-4 backdrop-blur-xl transition-all duration-300 ${
        unlocked
          ? 'border-white/10 bg-black/40 hover:-translate-y-0.5 hover:border-[rgb(var(--ach-rgb)/0.45)] hover:bg-black/50'
          : 'border-white/5 bg-black/30 hover:border-white/10'
      }`}
    >
      <div className={`ach-frame relative h-16 w-16 shrink-0 ${unlocked ? 'ach-frame--lit' : ''}`}>
        <div className="ach-frame__inner flex items-center justify-center">
          <AchievementIcon name={icon} className={`h-7 w-7 ${unlocked ? 'ach-frame__glyph' : 'text-slate-600'}`} />
        </div>
        {!unlocked && (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md border border-white/10 bg-[#0b0e16] text-slate-400">
            <AchievementIcon name="lock" className="h-3 w-3" />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`font-semibold ${unlocked ? 'text-white' : 'text-slate-400'}`}>{title}</h3>
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${rarityStyle.badge}`}>
            {rarityStyle.label}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>
            <span className="font-numeric text-sm font-semibold text-slate-300">{rarityPercent}%</span> de los jugadores
          </span>
          {unlocked ? (
            <span className="inline-flex items-center gap-1 font-medium text-emerald-300">
              <AchievementIcon name="check" className="h-3.5 w-3.5" />
              <span className="font-numeric text-sm">{formatDate(unlockedAt)}</span>
            </span>
          ) : (
            <span className="font-medium text-slate-500">Bloqueado</span>
          )}
        </div>
      </div>
    </li>
  );
}

export default function GameDetailView({ game, onBack }) {
  const { title, logo, accentColor, platform, achievements, playtimeHours, lastPlayed } = game;
  const { unlocked, total, percentage } = getAchievementStats(game);
  const isPerfect = percentage === 100;
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onBack();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const tabCounts = useMemo(() => ({ all: total, unlocked, locked: total - unlocked }), [total, unlocked]);

  const rarityBreakdown = useMemo(
    () =>
      Object.entries(RARITY_STYLES).map(([rarity, { label, rgb }]) => {
        const ofRarity = achievements.filter((achievement) => achievement.rarity === rarity);
        return { rarity, label, rgb, unlocked: ofRarity.filter(({ unlocked: isUnlocked }) => isUnlocked).length, total: ofRarity.length };
      }),
    [achievements],
  );

  const visibleAchievements = useMemo(() => {
    if (activeTab === 'unlocked') return achievements.filter((achievement) => achievement.unlocked);
    if (activeTab === 'locked') return achievements.filter((achievement) => !achievement.unlocked);
    return achievements;
  }, [achievements, activeTab]);

  return (
    <div
      className="relative mx-auto min-h-screen max-w-7xl animate-fade-in px-4 pb-16 pt-6 sm:px-6 lg:px-8"
      style={{ '--accent-rgb': hexToRgbTriplet(accentColor) }}
      aria-labelledby="game-detail-title"
    >
      <button
        type="button"
        onClick={onBack}
        className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/40 py-2 pl-3 pr-2 text-sm font-semibold text-slate-200 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-black/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <ArrowLeftIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Volver a la biblioteca
        <kbd className="rounded-md border border-white/15 bg-white/10 px-1.5 py-0.5 font-sans text-[10px] font-bold tracking-wider text-slate-300">
          ESC
        </kbd>
      </button>

      {/* Cabecera imponente sobre el arte del juego */}
      <section className="flex min-h-[48vh] flex-col justify-end pb-8 pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <PlatformBadge platform={platform} />
          {isPerfect && <PlatinumBadge />}
        </div>

        <GameLogo src={logo} title={title} />

        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          <MetaItem label="Horas jugadas" value={`${playtimeHours} h`} />
          <MetaItem label="Trofeos" value={`${unlocked}/${total}`} />
          <MetaItem label="Última sesión" value={formatDate(lastPlayed)} />
        </div>
      </section>

      {/* Panel de progreso ancho */}
      <section className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-glass backdrop-blur-xl sm:p-6" aria-label="Progreso del juego">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-end gap-3">
            <span className={`font-numeric text-5xl font-bold leading-none tabular-nums ${isPerfect ? 'text-gold-satin' : 'text-white'}`}>
              {percentage}%
            </span>
            <span className="mb-1 text-sm text-slate-400">completado</span>
          </div>
          <span className="inline-flex items-center gap-2 text-sm text-slate-400">
            <TrophyIcon className={`h-5 w-5 ${isPerfect ? 'text-gold' : 'text-accent'}`} />
            <span className="font-numeric text-lg font-semibold tabular-nums text-white">{total - unlocked}</span>
            {total - unlocked === 1 ? 'trofeo restante' : 'trofeos restantes'}
          </span>
        </div>

        <div
          className="mt-4 h-3 w-full overflow-hidden rounded-full border border-white/10 bg-white/5"
          role="progressbar"
          aria-label={`Progreso de logros de ${title}`}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={`h-full rounded-full transition-[width] duration-1000 ease-out ${isPerfect ? 'bar-gold' : 'bar-accent'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {rarityBreakdown.map(({ rarity, label, rgb, unlocked: rarityUnlocked, total: rarityTotal }) => (
            <div key={rarity} className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: `rgb(${rgb})` }}>
                  {label}
                </span>
                <span className="font-numeric text-sm font-semibold tabular-nums text-white">
                  {rarityUnlocked}/{rarityTotal}
                </span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${rarityTotal === 0 ? 0 : (rarityUnlocked / rarityTotal) * 100}%`,
                    background: `rgb(${rgb})`,
                    boxShadow: `0 0 8px rgb(${rgb} / 0.6)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lista de logros a todo el ancho */}
      <section className="mt-10" aria-labelledby="achievements-title">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="achievements-title" className="text-2xl font-bold tracking-tight text-white">
            Logros <span className="text-game">del juego</span>
          </h2>

          <div className="flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-xl" role="group" aria-label="Filtrar logros">
            {TABS.map(({ id, label }) => {
              const isActive = activeTab === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                    isActive
                      ? 'border-[rgb(var(--accent-rgb)/0.5)] bg-[rgb(var(--accent-rgb)/0.15)] text-white'
                      : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {label}
                  <span className="rounded bg-black/30 px-1.5 font-numeric text-sm leading-5">{tabCounts[id]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {visibleAchievements.length > 0 ? (
          <ul key={activeTab} className="grid animate-fade-in grid-cols-1 gap-4 lg:grid-cols-2">
            {visibleAchievements.map((achievement) => (
              <AchievementItem key={achievement.id} achievement={achievement} />
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-slate-400">No hay logros en esta categoría.</p>
        )}
      </section>
    </div>
  );
}
