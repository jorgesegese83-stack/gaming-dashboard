import { useId } from 'react';
import { hexToRgbTriplet } from '../utils/color';

const PATTERNS = {
  grid: {
    width: 22,
    height: 22,
    render: (stroke) => <path d="M22 0H0V22" fill="none" stroke={stroke} strokeWidth="1" />,
  },
  diagonal: {
    width: 14,
    height: 14,
    render: (stroke) => <path d="M-2 16L16 -2M5 16L16 5M-2 9L9 -2" fill="none" stroke={stroke} strokeWidth="1" />,
  },
  hex: {
    width: 28,
    height: 48,
    render: (stroke) => (
      <path d="M14 0L28 8V24L14 32L0 24V8ZM14 32V48" fill="none" stroke={stroke} strokeWidth="1" />
    ),
  },
  rings: {
    width: 32,
    height: 32,
    render: (stroke) => (
      <>
        <circle cx="16" cy="16" r="11" fill="none" stroke={stroke} strokeWidth="1" />
        <circle cx="16" cy="16" r="5" fill="none" stroke={stroke} strokeWidth="1" />
      </>
    ),
  },
  circuit: {
    width: 32,
    height: 32,
    render: (stroke) => (
      <>
        <path d="M0 16H10L16 10H32M16 10V0M22 32V22L26 18" fill="none" stroke={stroke} strokeWidth="1" />
        <circle cx="10" cy="16" r="1.6" fill={stroke} />
        <circle cx="26" cy="18" r="1.6" fill={stroke} />
      </>
    ),
  },
  waves: {
    width: 32,
    height: 16,
    render: (stroke) => <path d="M0 8Q8 0 16 8T32 8" fill="none" stroke={stroke} strokeWidth="1" />,
  },
};

export default function ArtworkFallback({ accent, pattern = 'grid', monogram, size = 'card' }) {
  const patternId = useId().replace(/:/g, '');
  const accentRgb = hexToRgbTriplet(accent);
  const { width, height, render } = PATTERNS[pattern] ?? PATTERNS.grid;
  const isHero = size === 'hero';

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(120% 90% at 85% 0%, rgb(${accentRgb} / 0.45), transparent 60%),
          radial-gradient(90% 80% at 0% 100%, rgb(${accentRgb} / 0.2), transparent 65%),
          linear-gradient(160deg, #0c0e18 0%, #05060a 100%)`,
      }}
    >
      <svg className="art-pattern absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse">
            {render(`rgb(${accentRgb} / 0.35)`)}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <div className="art-streak absolute inset-0" />

      <div
        className={`absolute flex items-center justify-center border border-white/15 bg-white/[0.06] shadow-glass backdrop-blur-md ${
          isHero ? 'right-16 top-6 h-24 w-24 rounded-3xl' : 'right-4 top-12 h-16 w-16 rounded-2xl'
        }`}
        style={{ boxShadow: `0 0 40px -6px rgb(${accentRgb} / 0.55), inset 0 1px 0 rgb(255 255 255 / 0.12)` }}
      >
        <span
          className={`font-numeric font-bold tracking-wide ${isHero ? 'text-4xl' : 'text-2xl'}`}
          style={{ color: `rgb(${accentRgb})`, textShadow: `0 0 18px rgb(${accentRgb} / 0.7)` }}
        >
          {monogram}
        </span>
      </div>
    </div>
  );
}
