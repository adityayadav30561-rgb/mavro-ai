/** The mark is an M drawn as one unbroken stroke, ending in the blue node: one flow, one system. */
export function Logo() {
  return (
    <span className="logo">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d="M3 17V5l8 9 8-9v12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="19" cy="17" r="2.4" fill="var(--blue)" />
      </svg>
      <span className="logo__word">MAVRO</span>
    </span>
  );
}
