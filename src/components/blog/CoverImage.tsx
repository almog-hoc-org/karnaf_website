import type { Article } from "@/data/blog/types";
import { CATEGORY_LABELS } from "@/data/blog/types";
import { hasRealCover } from "./articleUtils";

interface CoverImageProps {
  article: Pick<Article, "cover" | "category">;
  /** Wrapper classes — the aspect ratio and rounding live here. */
  className?: string;
  /** Classes for the <img> itself (e.g. a hover zoom). */
  imgClassName?: string;
  /** The article page's cover: eager + high fetch priority. Everything else is lazy. */
  priority?: boolean;
  /** Scale of the typographic fallback's label. */
  size?: "sm" | "md" | "lg";
  /** Pass false where the image only decorates a link that already names the article. */
  informative?: boolean;
}

/* "sm" is a phone thumbnail that grows back into a card from `sm` up. */
const FALLBACK = {
  sm: { label: "text-sm sm:text-xl md:text-2xl", pad: "p-3 sm:p-5 md:p-6", mark: "hidden sm:block" },
  md: { label: "text-xl md:text-2xl", pad: "p-5 md:p-6", mark: "" },
  lg: { label: "text-2xl md:text-4xl", pad: "p-5 md:p-6", mark: "" },
} as const;

/**
 * An article's cover photo in a fixed-ratio frame (the ratio comes from the
 * wrapper class, and the intrinsic width/height reserve the space, so
 * nothing shifts when the photo lands).
 *
 * Posts that don't have a photo yet (the legacy ones point at the brand
 * share card) get a typographic cover instead — ink, a drafting grid and
 * the category — so the index never shows eight identical mascot crops.
 */
export const CoverImage = ({
  article,
  className = "",
  imgClassName = "",
  priority = false,
  size = "md",
  informative = true,
}: CoverImageProps) => {
  const { cover, category } = article;

  if (!hasRealCover(cover)) {
    return (
      <div
        aria-hidden
        className={`relative overflow-hidden bg-[hsl(var(--ink))] text-[hsl(var(--ink-foreground))] ${className}`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(36 33% 95% / 0.07) 1px, transparent 1px), linear-gradient(to bottom, hsl(36 33% 95% / 0.07) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            WebkitMaskImage: "linear-gradient(200deg, black 10%, transparent 85%)",
            maskImage: "linear-gradient(200deg, black 10%, transparent 85%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 90% at 12% 0%, hsl(var(--accent) / 0.26) 0%, transparent 62%)",
          }}
        />
        <div className="absolute inset-0 grain-texture" />
        <span
          className={`absolute top-4 start-5 text-xs font-bold text-[hsl(var(--ink-foreground)/0.6)] ${FALLBACK[size].mark}`}
        >
          קרנף נדל״ן · ידע
        </span>
        <div className={`absolute inset-x-0 bottom-0 ${FALLBACK[size].pad}`}>
          <span className="mb-2 block h-[2px] w-8 rounded-full bg-accent sm:mb-3" />
          <span className={`block font-black leading-tight tracking-[-0.02em] ${FALLBACK[size].label}`}>
            {CATEGORY_LABELS[category]}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-secondary ${className}`}>
      <img
        src={cover.src}
        alt={informative ? cover.alt : ""}
        width={1600}
        height={900}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "auto" : "async"}
        {...(priority ? { fetchpriority: "high" } : {})}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
};
