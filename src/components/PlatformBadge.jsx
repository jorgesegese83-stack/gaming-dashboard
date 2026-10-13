import { PLATFORMS } from '../data/mockGames';

export function DesktopIcon({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function GamepadIcon({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 11h4M8 9v4" />
      <circle cx="15.5" cy="10.5" r="0.75" fill="currentColor" />
      <circle cx="17.5" cy="12.5" r="0.75" fill="currentColor" />
      <path d="M17.3 5H6.7a4 4 0 0 0-4 3.6l-.9 8.1a2.5 2.5 0 0 0 2.5 2.8c.8 0 1.6-.5 2-1.2L7 17h10l.7 1.3c.4.7 1.2 1.2 2 1.2a2.5 2.5 0 0 0 2.5-2.8l-.9-8.1a4 4 0 0 0-4-3.6z" />
    </svg>
  );
}

const BADGE_CONFIG = {
  [PLATFORMS.STEAM]: {
    label: 'Steam',
    Icon: DesktopIcon,
    className:
      'border-steam-light/30 bg-gradient-to-r from-steam-dark via-steam to-steam-blue text-steam-light shadow-badge-steam',
  },
  [PLATFORMS.PSN]: {
    label: 'PlayStation',
    Icon: GamepadIcon,
    className: 'border-psn-light/50 bg-gradient-to-r from-psn-dark to-psn text-white shadow-badge-psn',
  },
};

const SIZE_CLASSES = {
  sm: 'gap-1.5 px-2 py-1 text-[10px]',
  md: 'gap-2 px-3 py-1.5 text-xs',
};

export default function PlatformBadge({ platform, size = 'sm' }) {
  const config = BADGE_CONFIG[platform];

  if (!config) return null;

  const { label, Icon, className } = config;

  return (
    <span
      className={`inline-flex items-center rounded-md border font-bold uppercase tracking-[0.12em] backdrop-blur-md ${SIZE_CLASSES[size]} ${className}`}
    >
      <Icon className={size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
      {label}
    </span>
  );
}
