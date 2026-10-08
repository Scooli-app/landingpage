/** Centres of the 12 stars, on a ring around the badge's centre. */
const STARS = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(angle) * 36, y: 50 + Math.sin(angle) * 36 };
});

/** A five-pointed star of radius 10 around the origin. */
const STAR_PATH =
  "M0,-10 L2.35,-3.24 L9.51,-3.09 L3.8,1.24 L5.88,8.09 L0,4 L-5.88,8.09 L-3.8,1.24 L-9.51,-3.09 L-2.35,-3.24 Z";

/**
 * The common "GDPR" badge large SaaS companies show next to their privacy
 * claims: EU blue, a ring of 12 yellow stars, a padlock and "GDPR". It is not
 * an official mark (the GDPR has no certification logo), so it is decorative;
 * the caption beside it carries the claim, which the privacy policy states.
 */
export function GdprSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="50" r="49" fill="#003399" />
      <circle cx="50" cy="50" r="45.5" fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="0.8" />
      {STARS.map((star) => (
        <path
          key={`${star.x}-${star.y}`}
          d={STAR_PATH}
          transform={`translate(${star.x.toFixed(2)} ${star.y.toFixed(2)}) scale(0.36)`}
          fill="#FFCC00"
        />
      ))}
      {/* Padlock */}
      <path
        d="M45.2 39.5v-3.6a4.8 4.8 0 0 1 9.6 0v3.6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="42.6" y="39.2" width="14.8" height="10.4" rx="2" fill="#ffffff" />
      <circle cx="50" cy="44" r="1.5" fill="#003399" />
      <text
        x="50"
        y="66"
        textAnchor="middle"
        fontFamily="var(--font-geist), system-ui, sans-serif"
        fontWeight="700"
        fontSize="14"
        letterSpacing="0.6"
        fill="#ffffff"
      >
        GDPR
      </text>
    </svg>
  );
}
