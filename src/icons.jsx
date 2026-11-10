const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function Icon({ name, size = 20, className = '' }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', className, 'aria-hidden': true, ...base };
  switch (name) {
    case 'home':
      return (
        <svg {...props}>
          <path d="M3.5 10.5 12 3l8.5 7.5" />
          <path d="M5.5 9.5V21h13V9.5" />
          <path d="M9.5 21v-6h5v6" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...props}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 13 9 5 9-5" />
          <path d="m3 17.5 9 5 9-5" />
        </svg>
      );
    case 'user':
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="3.6" />
          <path d="M4.5 20c.8-3.6 3.8-5.5 7.5-5.5s6.7 1.9 7.5 5.5" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="10.8" cy="10.8" r="6.3" />
          <path d="m15.5 15.5 4.5 4.5" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...props}>
          <path d="M4 12h15" />
          <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
        </svg>
      );
    case 'back':
      return (
        <svg {...props}>
          <path d="M20 12H5" />
          <path d="M10.5 6.5 5 12l5.5 5.5" />
        </svg>
      );
    case 'close':
      return (
        <svg {...props}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case 'play':
      return (
        <svg {...props}>
          <path d="M8 5.5v13l10-6.5-10-6.5Z" />
        </svg>
      );
    case 'pause':
      return (
        <svg {...props}>
          <path d="M9 5.5v13M15 5.5v13" />
        </svg>
      );
    case 'volume':
      return (
        <svg {...props}>
          <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4v-5Z" />
          <path d="M16 8.5a5 5 0 0 1 0 7M18.7 6a8.5 8.5 0 0 1 0 12" />
        </svg>
      );
    case 'mute':
      return (
        <svg {...props}>
          <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4v-5Z" />
          <path d="m16 9.5 5 5M21 9.5l-5 5" />
        </svg>
      );
    case 'copy':
      return (
        <svg {...props}>
          <rect x="8.5" y="8.5" width="11" height="12" rx="1.5" />
          <path d="M15.5 5.5v-1h-11v12h1" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...props}>
          <path d="m12 3 7 3v5.5c0 4.5-2.8 7.6-7 9.5-4.2-1.9-7-5-7-9.5V6l7-3Z" />
          <path d="m9 12 2.2 2.2L15.5 10" />
        </svg>
      );
    case 'signal':
      return (
        <svg {...props}>
          <path d="M4 18v-3M9 18v-6M14 18V8M19 18V4" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case 'logout':
      return (
        <svg {...props}>
          <path d="M14 4.5H5.5v15H14" />
          <path d="M10 12h10" />
          <path d="m16.5 8.5 3.5 3.5-3.5 3.5" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...props}>
          <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
          <path d="m6.5 6.5 3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...props}>
          <rect x="4" y="4" width="6" height="6" />
          <rect x="14" y="4" width="6" height="6" />
          <rect x="4" y="14" width="6" height="6" />
          <rect x="14" y="14" width="6" height="6" />
        </svg>
      );
    default:
      return null;
  }
}

export function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="logo-mark">
      <path d="M32 4 58 19v26L32 60 6 45V19Z" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M32 14v36M18 32h28" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="32" cy="32" r="4.2" fill="currentColor" />
    </svg>
  );
}

export function Rarity({ value }) {
  return (
    <span className="rarity" title={`${value} 星`}>
      {Array.from({ length: value }).map((_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}
