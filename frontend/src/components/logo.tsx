/** Logo LINAF (repris du site d'origine). `id` évite les collisions de dégradés quand il apparaît deux fois. */
export function Logo({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 346.22 227.99" className={className} role="img" aria-label="LINAF">
      <defs>
        <linearGradient id={`${id}-a`} x1="130.45" y1="71.92" x2="218.63" y2="-7.28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#036bb4" />
          <stop offset="1" stopColor="#30275d" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="11.89" y1="184.59" x2="86.61" y2="154.4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0f281b" />
          <stop offset="1" stopColor="#117c36" />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="0" y1="62.1" x2="119.27" y2="62.1" gradientUnits="userSpaceOnUse">
          <stop offset=".36" stopColor="#f8ac04" />
          <stop offset="1" stopColor="#fdeb19" />
        </linearGradient>
      </defs>
      <path
        d="M130.73 148.68h20.55l-2.78 11.48h-26.25c-5.59 0-9.7-5.25-8.36-10.67l10.65-43.23h16.69l-10.5 42.43zm42.09 11.48h-16.69l13.28-53.91h16.69l-13.28 53.91zm45.68-20.69h.18l8.26-33.22h15.62l-13.28 53.91h-18.31l-2.96-33.3h-.18l-8.17 33.3h-15.62l13.28-53.91h18.67l2.51 33.22zm69.74 20.69h-17.77l.54-9.44h-13.28l-3.95 9.44h-17.77l28.9-53.91h21l2.33 53.91zm-25.85-20.01h9.33l1.08-22.88h-.18l-10.23 22.88zm80.95-22.42h-21.27l-2.24 9.21h19.92l-2.69 11.02h-19.92l-5.48 22.2h-16.69l11.07-44.91c1.3-5.29 6.04-9 11.49-9h28.69l-2.87 11.48z"
        fill="#fff"
      />
      <path d="M100.9,22.42l18.37,53.93h58.07l11.85-41.48s10.67,3.56,30.22,33.19c0,0-18.96-55.7-90.67-66.37l-27.85,20.74Z" fill={`url(#${id}-a)`} />
      <path d="M85.38,174.13l-4-55.11-56-12.15L4.79,140.5s3.26,59.41,80.59,86.67c0,0-39.41-17.19-45.63-32l45.63-21.04Z" fill={`url(#${id}-b)`} />
      <path
        d="M117.23.13S50.71-5.73 12.79 62.35c0 0-16.06 29.7-12.18 61.85 0 0 .77-35.41 11.29-51.41l3.56.3 9.93 33.78 56 12.15 37.89-42.67-18.37-53.93-30.33-5.63.47-4.14S87.45.05 117.23.13z"
        fill={`url(#${id}-c)`}
      />
    </svg>
  );
}
