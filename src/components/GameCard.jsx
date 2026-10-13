import ArtworkFallback from './ArtworkFallback';
import CoverImage from './CoverImage';
import PlatformBadge from './PlatformBadge';
import PlatinumBadge, { TrophyIcon } from './PlatinumBadge';
import { formatDate, getAchievementStats } from '../data/mockGames';
import { hexToRgbTriplet } from '../utils/color';

export default function GameCard({ game, onSelect }) {
  const { title, art, accentColor, pattern, monogram, platform, playtimeHours, lastPlayed } = game;
  const { unlocked, total, percentage } = getAchievementStats(game);
  const isPerfect = percentage === 100;

  return (
    <button
      type="button"
      onClick={() => onSelect(game)}      aria-label={`Ver logros de ${title}`}
      data-platform={platform}
      style={{ '--accent-rgb': hexToRgbTriplet(accentColor) }}
      className={`game-card group flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left backdrop-blur-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan ${
        isPerfect ? 'game-card--perfect' : ''
      }`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <CoverImage
          sources={[art.capsule, art.header]}
          alt={`Portada de ${title}`}
          fallback={<ArtworkFallback accent={accentColor}pattern={pattern} monogram={monogram} />}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="cover-scrim absolute inset-0" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <PlatformBadge platform={platform} />
          {isPerfect && <PlatinumBadge />}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="line-clamp-1 text-lg font-semibold leading-tight text-white drop-shadow-lg">{title}</h3>
          <p className="mt-1 text-xs text-slate-300">
            <span className="font-numeric text-sm font-semibold text-white">{playtimeHours} h</span> jugadas · Última sesión{' '}
            {formatDate(lastPlayed)}
          </p>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-3 p-4 pt-3">
        <div className="flex items-end justify-between">
          <span
            className={`font-numeric text-3xl font-bold leading-none tabular-nums ${
              isPerfect ? 'text-gold-satin' : 'text-white'
            }`}
          >
            {percentage}%
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-gamer-muted">
            <TrophyIcon className={`h-4 w-4 ${isPerfect ? 'text-gold' : 'text-accent'}`} />
            <span className="font-numeric text-base font-semibold tabular-nums text-white">
              {unlocked}/{total}
            </span>
            trofeos
          </span>
        </div>

        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label={`Progreso de logros de ${title}`}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={`h-full rounded-full transition-[width] duration-700 ease-out ${
              isPerfect ? 'bar-gold' : 'bar-accent'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <span className="mt-1 text-xs font-medium text-gamer-muted transition-colors duration-300 group-hover:text-white">
          Ver logros <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </button>
  );
}
