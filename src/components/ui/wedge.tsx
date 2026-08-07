/**
 * טריז הקרן — the one graphic device derived from the rhino's horn, used
 * in exactly four roles across the site: section seam, list bullet,
 * amber-word underline and the video play mark. One shape in four jobs
 * reads as an owned code; more would read as noise.
 */

/** Sharp horn crescent pointing forward (start-of-line in RTL). */
export const WedgeBullet = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} aria-hidden focusable="false">
    <path
      d="M14.5 2 C9 4.8 4 6.6 1.2 8 C4 9.4 9 11.2 14.5 14 C11.6 10 11.6 6 14.5 2 Z"
      fill="currentColor"
    />
  </svg>
);

const seamColor = {
  ink: "hsl(217 50% 8%)",
  background: "hsl(36 33% 95%)",
  card: "hsl(0 0% 100%)",
} as const;

type SeamTone = keyof typeof seamColor;

/**
 * Diagonal section seam: the section above (`from`) cuts into the section
 * below (`to`) at a horn-sharp angle instead of a straight line.
 */
export const WedgeSeam = ({
  from,
  to,
}: {
  from: SeamTone;
  to: SeamTone;
}) => (
  <div
    aria-hidden
    className="relative h-10 md:h-16 -mt-px"
    style={{ backgroundColor: seamColor[to] }}
  >
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: seamColor[from],
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 12%)",
      }}
    />
  </div>
);
