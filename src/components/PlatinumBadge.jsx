export function TrophyIcon({ className = 'h-3.5 w-3.5' }) {
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
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
    </svg>
  );
}

const SIZE_CLASSES = {
  sm: 'gap-1.5 px-2.5 py-1 text-[10px]',
  md: 'gap-2 px-3 py-1.5 text-xs',
};

export default function PlatinumBadge({ label = 'Platino', size = 'sm' }) {
  return (
    <span className={`platinum-badge rounded-md font-extrabold uppercase tracking-[0.14em] ${SIZE_CLASSES[size]}`}>
      <TrophyIcon className={size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
      {label}
    </span>
  );
}
