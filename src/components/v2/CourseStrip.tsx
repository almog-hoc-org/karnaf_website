import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

/**
 * Thin product-callout strip — surfaces the digital course as a visible
 * commerce path right after the homepage hero. Sits between Hero and
 * the rest of the homepage so every visitor sees the product/price
 * before they even start scrolling.
 */
export const CourseStrip = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "hsl(217 50% 8%)",
        color: "hsl(36 33% 95%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, hsl(24 80% 52% / 0.18) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grain-texture pointer-events-none" />

      <div className="relative container mx-auto px-5 md:px-6 py-5 md:py-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div className="flex items-center gap-4 md:gap-5 flex-1 text-center md:text-right">
          <span
            aria-hidden
            className="hidden md:flex w-11 h-11 rounded-full items-center justify-center bg-accent/15 border border-accent/30 flex-shrink-0"
          >
            <GraduationCap size={20} className="text-accent" />
          </span>
          <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 flex-1 min-w-0">
            <span className="font-bold text-base md:text-lg leading-tight">
              הדרך לדירה — תוכנית הליווי הדיגיטלית
            </span>
            <span
              className="text-eyebrow uppercase tracking-[0.18em]"
              style={{ color: "hsl(36 33% 95% / 0.65)" }}
            >
              50+ שיעורים{" · "}גישה מיידית{" · "}ליווי צמוד
            </span>
          </div>
        </div>

        <Link
          to="/course#pricing"
          className="group inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm md:text-base px-6 md:px-7 py-3 md:py-3.5 rounded-full transition-all whitespace-nowrap"
        >
          להצטרף לתוכנית
          <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">
            ←
          </span>
        </Link>
      </div>
    </section>
  );
};
