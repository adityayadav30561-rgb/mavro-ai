/*
 * Module icons. One drawing language: 24px grid, 1.6 stroke, round joins, and a single filled detail in the
 * brand blue marking what the module is about (the moving part, the checked lot, the posted figure).
 */
const paths = {
  finance: (
    <>
      <path d="M4 20h16" />
      <path d="M6.5 16.5v-4M11 16.5V8.5M15.5 16.5v-6" />
      <rect x="18" y="4" width="3" height="3" rx="0.8" className="i-fill" />
      <path d="M6.5 9 11 5.5l4.5 2.5L18.5 6" />
    </>
  ),
  procurement: (
    <>
      <path d="M7 3.5h7.5L18 7v13.5H7z" />
      <path d="M14.5 3.5V7H18" />
      <path d="M9.5 11.5h6M9.5 14.5h6M9.5 17.5h3.5" />
      <circle cx="4.5" cy="9" r="1.6" className="i-fill" />
    </>
  ),
  inventory: (
    <>
      <path d="M3.5 13.5h8v7h-8zM12.5 13.5h8v7h-8z" />
      <path d="M8 6.5h8v7H8z" className="i-fill-soft" />
      <path d="M7.5 13.5v2.5M16.5 13.5v2.5M12 6.5V9" />
    </>
  ),
  sales: (
    <>
      <path d="M4 18.5 9 13l3.5 3L20 8" />
      <path d="M15 8h5v5" />
      <circle cx="9" cy="13" r="1.5" className="i-fill" />
    </>
  ),
  orders: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
      <path d="M8 8.5h8M8 12h8M8 15.5h4.5" />
      <circle cx="17" cy="17" r="2.6" className="i-fill" />
    </>
  ),
  production: (
    <>
      <circle cx="12" cy="12" r="3" className="i-fill-soft" />
      <path d="M12 3.5v2.3M12 18.2v2.3M3.5 12h2.3M18.2 12h2.3M6 6l1.6 1.6M16.4 16.4 18 18M6 18l1.6-1.6M16.4 7.6 18 6" />
      <circle cx="12" cy="12" r="6.2" />
    </>
  ),
  bom: (
    <>
      <rect x="9" y="3.5" width="6" height="4.5" rx="1" className="i-fill-soft" />
      <rect x="3.5" y="16" width="5.5" height="4.5" rx="1" />
      <rect x="15" y="16" width="5.5" height="4.5" rx="1" />
      <path d="M12 8v4M6.2 16v-2.5a1.5 1.5 0 0 1 1.5-1.5h8.6a1.5 1.5 0 0 1 1.5 1.5V16" />
    </>
  ),
  quality: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6z" />
      <path d="m8.8 12.2 2.3 2.3 4.4-4.6" className="i-stroke-accent" />
    </>
  ),
  warehouse: (
    <>
      <path d="M3.5 9.5 12 4l8.5 5.5V20.5h-17z" />
      <path d="M7.5 20.5v-7h9v7M7.5 16.5h9" />
      <rect x="10.5" y="7.6" width="3" height="2" rx="0.6" className="i-fill" />
    </>
  ),
  dispatch: (
    <>
      <path d="M3.5 6.5h10v10h-10z" />
      <path d="M13.5 10h4l3 3.2v3.3h-7" />
      <circle cx="7" cy="18" r="1.8" className="i-fill" />
      <circle cx="17" cy="18" r="1.8" className="i-fill" />
    </>
  ),
  transport: (
    <>
      <circle cx="5" cy="18" r="2" className="i-fill" />
      <circle cx="19" cy="6" r="2" />
      <path d="M7 18h6.5a3 3 0 0 0 0-6h-3a3 3 0 0 1 0-6H17" strokeDasharray="0.1 2.6" />
      <path d="M17 18h2.5" />
    </>
  ),
  route: (
    <>
      <path d="M12 21s6-5.6 6-10.5a6 6 0 0 0-12 0C6 15.4 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.3" className="i-fill" />
    </>
  ),
  scheme: (
    <>
      <path d="M4 20.5h16" />
      <path d="M5 20.5v-4h4v4M10 20.5v-8h4v8M15 20.5v-12h4v12" />
      <path d="M15 8.5h4v3.5h-4z" className="i-fill" />
      <path d="M5 11.5 9 8l3 1.5L17 4" />
    </>
  ),
  claims: (
    <>
      <path d="M5 3.5h14v17l-2.4-1.6-2.3 1.6-2.3-1.6-2.3 1.6-2.3-1.6L5 20.5z" />
      <path d="M8.5 8.5h7M8.5 12h7" />
      <circle cx="14.5" cy="15.6" r="1.6" className="i-fill" />
    </>
  ),
  distribution: (
    <>
      <circle cx="12" cy="5" r="2" className="i-fill" />
      <circle cx="5" cy="18.5" r="2" />
      <circle cx="12" cy="18.5" r="2" />
      <circle cx="19" cy="18.5" r="2" />
      <path d="M12 7v9.5M12 11H6.5a1.5 1.5 0 0 0-1.5 1.5v4M12 11h5.5a1.5 1.5 0 0 1 1.5 1.5v4" />
    </>
  ),
  workflow: (
    <>
      <rect x="3.5" y="4" width="6" height="5" rx="1.2" />
      <rect x="14.5" y="15" width="6" height="5" rx="1.2" className="i-fill-soft" />
      <path d="M9.5 6.5h4a3 3 0 0 1 3 3V15" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <path d="M9 17.5h5.5" />
    </>
  ),
  master: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
      <circle cx="16" cy="17.2" r="1.2" className="i-fill" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6z" />
      <rect x="9.3" y="10.5" width="5.4" height="4.5" rx="1" className="i-fill" />
      <path d="M10.3 10.5V9.3a1.7 1.7 0 0 1 3.4 0v1.2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8z" className="i-fill-soft" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" className="i-fill" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2" />
      <circle cx="17" cy="9" r="2.4" className="i-fill" />
      <path d="M16 14.4c2.6.1 4.5 2 4.5 4.6" />
    </>
  ),
  travel: (
    <>
      <rect x="4" y="7.5" width="16" height="12" rx="2" />
      <path d="M9 7.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5v2" />
      <path d="M4 12.5h16" />
      <rect x="10.5" y="11" width="3" height="3" rx="0.8" className="i-fill" />
    </>
  ),
  gate: (
    <>
      <path d="M4 20.5V8M20 20.5V8" />
      <path d="M2.5 8h19" />
      <path d="M4 12h16" strokeDasharray="2 2.4" />
      <rect x="9" y="15" width="6" height="5.5" rx="1" className="i-fill-soft" />
      <circle cx="4" cy="5.5" r="1.6" className="i-fill" />
    </>
  ),
  auction: (
    <>
      <path d="m13.5 4.5 6 6M10 8l6 6" />
      <path d="m11.75 6.25 6 6-2.5 2.5-6-6z" className="i-fill-soft" />
      <path d="m9.5 11.5-6 6 2 2 6-6" />
      <path d="M13 20.5h7.5" />
      <circle cx="18.5" cy="4.5" r="1.4" className="i-fill" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
      <circle cx="16" cy="17.5" r="1.3" className="i-fill" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
      <rect x="9.5" y="6" width="5" height="4" rx="1" className="i-fill-soft" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <rect x="13" y="13.5" width="4" height="3.5" rx="0.8" className="i-fill" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3.5c3.6 2.2 5.2 6 4.6 10.5l-2.1 2.5h-5L7.4 14C6.8 9.5 8.4 5.7 12 3.5z" />
      <circle cx="12" cy="9.5" r="1.9" className="i-fill" />
      <path d="M9.5 16.5 8 20.5l2.5-1.2M14.5 16.5l1.5 4-2.5-1.2M7.4 14l-2.4 2 .8 2.5M16.6 14l2.4 2-.8 2.5" />
    </>
  ),
  headset: (
    <>
      <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
      <rect x="3.5" y="13" width="4" height="6" rx="1.5" className="i-fill-soft" />
      <rect x="16.5" y="13" width="4" height="6" rx="1.5" className="i-fill-soft" />
      <path d="M18.5 19c0 1.4-1.6 2-4 2" />
      <circle cx="13" cy="21" r="1.2" className="i-fill" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.5 4.2a4.5 4.5 0 0 0-5.3 5.9L3.8 15.5a1.8 1.8 0 0 0 2.6 2.6l5.4-5.4a4.5 4.5 0 0 0 5.9-5.3l-2.7 2.7-2.4-.4-.4-2.4z" />
      <circle cx="5.3" cy="16.9" r="0.9" className="i-fill" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <circle cx="12" cy="15.5" r="1.5" className="i-fill" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z" />
      <path d="M9 8h6M9 11.5h6" />
      <rect x="9" y="14.5" width="3.5" height="2" rx="0.6" className="i-fill" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" className="i-fill" />
    </>
  ),
  arrow: <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />,
  chevron: <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
} as const;

export type IconName = keyof typeof paths;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      width={size}
      height={size}
      style={{ width: `${size / 16}rem`, height: `${size / 16}rem` }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
