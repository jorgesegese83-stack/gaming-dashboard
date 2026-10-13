import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ProfileHeader from './components/ProfileHeader';
import GameCard from './components/GameCard';
import GameDetailView from './components/GameDetailView';
import CoverImage from './components/CoverImage';
import TechBackground from './components/TechBackground';
import { DesktopIcon, GamepadIcon } from './components/PlatformBadge';
import { hexToRgbTriplet } from './utils/color';
import { PLATFORMS, PLATFORM_LABELS, getAchievementStats, mockGames, userProfile } from './data/mockGames';

const FILTERS = [
  { id: PLATFORMS.ALL, Icon: null },
  { id: PLATFORMS.STEAM, Icon: DesktopIcon },
  { id: PLATFORMS.PSN, Icon: GamepadIcon },
];

const FILTER_ACTIVE_STYLES = {
  [PLATFORMS.ALL]: 'border-white/25 bg-white/10 text-white',
  [PLATFORMS.STEAM]: 'border-steam-light/40 bg-gradient-to-r from-steam-dark via-steam to-steam-blue text-steam-light shadow-badge-steam',
  [PLATFORMS.PSN]: 'border-psn-light/50 bg-gradient-to-r from-psn-dark to-psn text-white shadow-badge-psn',
};

const computeGlobalStats = (games) => {
  const totals = games.reduce(
    (acc, game) => {
      const { unlocked, total, percentage } = getAchievementStats(game);

      acc.unlocked += unlocked;
      acc.total += total;
      acc.percentageSum += percentage;
      acc.perfectGames += percentage === 100 ? 1 : 0;
      acc.platinums += game.achievements.filter(({ isPlatinum, unlocked: isUnlocked }) => isPlatinum && isUnlocked).length;

      return acc;
    },
    { unlocked: 0, total: 0, percentageSum: 0, perfectGames: 0, platinums: 0 },
  );

  return {
    unlocked: totals.unlocked,
    total: totals.total,
    perfectGames: totals.perfectGames,
    platinums: totals.platinums,
    averageCompletion: games.length === 0 ? 0 : Math.round(totals.percentageSum / games.length),
  };
};

const GLOBAL_STATS = computeGlobalStats(mockGames);

const FEATURED_GAME = mockGames.find(({ title }) => title === userProfile.currentGame) ?? null;

const GAME_COUNT_BY_PLATFORM = {
  [PLATFORMS.ALL]: mockGames.length,
  [PLATFORMS.STEAM]: mockGames.filter(({ platform }) => platform === PLATFORMS.STEAM).length,
  [PLATFORMS.PSN]: mockGames.filter(({ platform }) => platform === PLATFORMS.PSN).length,
};

// Acento por defecto: el juego que se está jugando ahora
const DEFAULT_RGB = FEATURED_GAME ? hexToRgbTriplet(FEATURED_GAME.accentColor) : '148 163 184';

// Fondo: base técnica generada por código + una capa por juego que se funde al abrir su vista de detalle
function CinematicBackground({ activeGameId }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-[#04060a]" aria-hidden="true">
      <TechBackground />

      {mockGames.map(({ id, heroBanner, art }) => (
        <div
          key={id}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${id === activeGameId ? 'opacity-100' : 'opacity-0'}`}
        >
          <CoverImage sources={[heroBanner, art.header]} alt="" className="cinematic-art" />
          <div className="detail-overlay absolute inset-0" />
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState(PLATFORMS.ALL);
  // El juego abierto a pantalla completa también transforma el fondo y el acento
  const [selectedGame, setSelectedGame] = useState(null);
  const libraryScrollRef = useRef(0);

  const filteredGames = useMemo(
    () => (activeFilter === PLATFORMS.ALL ? mockGames : mockGames.filter(({ platform }) => platform === activeFilter)),
    [activeFilter],
  );

  const handleSelectGame = useCallback((game) => {
    libraryScrollRef.current = window.scrollY;
    setSelectedGame(game);
  }, []);
  const handleBack = useCallback(() => setSelectedGame(null), []);

  // Detalle siempre arriba; al volver, la biblioteca recupera su posición
  useLayoutEffect(() => {
    window.scrollTo(0, selectedGame ? 0 : libraryScrollRef.current);
  }, [selectedGame]);

  const gameRgb = selectedGame ? hexToRgbTriplet(selectedGame.accentColor) : DEFAULT_RGB;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#04060a]" style={{ '--game-rgb': gameRgb }}>
      <CinematicBackground activeGameId={selectedGame?.id} />

      {selectedGame ? (
        <GameDetailView key={selectedGame.id} game={selectedGame} onBack={handleBack} />
      ) : (
        <main className="relative mx-auto max-w-7xl animate-fade-in px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <ProfileHeader profile={userProfile} stats={GLOBAL_STATS} featuredGame={FEATURED_GAME} />

          <section className="mt-12" aria-labelledby="library-title">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="library-title" className="text-2xl font-bold tracking-tight text-white">
                  Biblioteca de <span className="text-game">Logros</span>
                </h2>
                <p className="mt-1 text-sm text-gamer-muted">
                  <span className="font-numeric font-semibold text-slate-300">{filteredGames.length}</span>{' '}
                  {filteredGames.length === 1 ? 'juego' : 'juegos'} · {PLATFORM_LABELS[activeFilter]}
                </p>
              </div>

              <div
                className="flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-xl"
                role="group"
                aria-label="Filtrar por plataforma"
              >
                {FILTERS.map(({ id, Icon }) => {
                  const isActive = activeFilter === id;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveFilter(id)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan ${
                        isActive
                          ? FILTER_ACTIVE_STYLES[id]
                          : 'border-transparent text-gamer-muted hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {PLATFORM_LABELS[id]}
                      <span className="rounded bg-black/30 px-1.5 font-numeric text-sm leading-5">{GAME_COUNT_BY_PLATFORM[id]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {filteredGames.length > 0 ? (
              <div key={activeFilter} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGames.map((game, index) => (
                  <div key={game.id} className="animate-slide-up" style={{ animationDelay: `${index * 70}ms` }}>
                    <GameCard game={game} onSelect={handleSelectGame} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-gamer-muted">
                No hay juegos para esta plataforma.
              </div>
            )}
          </section>

          <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-gamer-muted">
            Fase 1 · Datos simulados · Hecho con React + Vite + Tailwind CSS
          </footer>
        </main>
      )}
    </div>
  );
}
