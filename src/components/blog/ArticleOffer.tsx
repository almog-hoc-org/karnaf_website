import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, Users } from "lucide-react";
import { Reveal } from "@/components/v2/Reveal";
import { COURSE_PRICE_LABEL, offerLineFor } from "./articleUtils";
import type { Article } from "@/data/blog/types";
import { COURSE_ACCESS_LABEL } from "@/lib/constants";

/**
 * One commercial offer per article, declared by the article itself
 * (`article.offer`): buying, financing and checking a home point at the
 * self-serve course; investment / accompaniment topics point at the 1:1
 * track. The mid-article card and the end banner both read the same field,
 * so an article never sends its reader to two different products.
 *
 * Course copy stays inside what the course is: a self-paced digital
 * program. No personal support, analyst, calculators or community — those
 * belong to /premium only (CLAUDE.md → Commerce).
 */

type OfferKind = Article["offer"];

const DESTINATION: Record<OfferKind, string> = {
  course: "/course",
  premium: "/premium#contact",
};

/** Compact card set between the article's second and third sections. */
export const ArticleInlineOffer = ({ article }: { article: Pick<Article, "offer" | "offerLine"> }) => {
  const course = article.offer === "course";
  const Icon = course ? GraduationCap : Users;
  return (
    <aside
      aria-label={course ? "התוכנית הדיגיטלית" : "ליווי משקיעים אישי"}
      className="my-12 rounded-2xl border border-border bg-card p-6 md:p-7 shadow-depth-1"
    >
      <div className="flex items-start gap-4 md:gap-5">
        <span
          className="hidden sm:inline-flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"
          aria-hidden
        >
          <Icon size={20} />
        </span>
        <div className="min-w-0">
          <p className="mb-1.5 text-sm font-bold text-muted-foreground">
            {course ? "מהכתבה לתוכנית" : "מהכתבה לליווי אישי"}
          </p>
          <p className="text-[1.0625rem] md:text-lg font-bold leading-relaxed text-primary">
            {offerLineFor(article)}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              to={DESTINATION[article.offer]}
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {course ? `לתוכנית הדיגיטלית · ${COURSE_PRICE_LABEL}` : "לשיחת היכרות — חינם"}
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" aria-hidden />
            </Link>
            <span className="text-sm text-muted-foreground">
              {course ? `גישה מיידית · ${COURSE_ACCESS_LABEL}` : "ללא התחייבות · חוזרים תוך 24 שעות"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

interface OfferBannerProps {
  offer: OfferKind;
  line: string;
  /** Overrides the default headline for the product. */
  title?: string;
  eyebrow?: string;
  headingLevel?: "h2" | "h3";
}

/** Dark closing banner — one destination. Used at the end of an article and on the blog index. */
export const OfferBanner = ({ offer, line, title, eyebrow, headingLevel = "h2" }: OfferBannerProps) => {
  const course = offer === "course";
  const Heading = headingLevel;
  return (
    <Reveal blur={0}>
      <div className="relative overflow-hidden rounded-editorial bg-[hsl(var(--ink))] text-[hsl(var(--ink-foreground))] p-7 md:p-12 grain-texture">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(55% 80% at 88% 0%, hsl(var(--accent) / 0.22) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 grid gap-7 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-3 text-sm font-bold text-accent">
              <span className="block w-8 h-px bg-accent" aria-hidden />
              {eyebrow ?? (course ? "המדריך המעשי לרכישת דירה" : "ליווי משקיעים 1:1")}
            </p>
            <Heading className="text-2xl md:text-[2.125rem] font-black leading-[1.15] tracking-[-0.02em] mb-4">
              {title ?? (course ? "רוצים ללמוד לעשות את זה נכון?" : "מעדיפים שמישהו יעבור את הדרך איתכם?")}
            </Heading>
            <p className="text-base md:text-lg leading-relaxed text-[hsl(var(--ink-foreground)/0.75)]">{line}</p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            {course && (
              <p className="text-sm text-[hsl(var(--ink-foreground)/0.7)]">
                <span className="text-2xl font-black text-[hsl(var(--ink-foreground))] tabular-nums">
                  {COURSE_PRICE_LABEL}
                </span>{" "}
                · גישה מיידית ל-{COURSE_ACCESS_LABEL}
              </p>
            )}
            <Link
              to={DESTINATION[offer]}
              className="group inline-flex min-h-[52px] items-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 font-bold text-accent-foreground shadow-glow-accent transition-colors hover:bg-accent/90"
            >
              {course ? "לתוכנית המלאה" : "לשיחת היכרות — חינם"}
              <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/** The end-of-article banner — the article's one offer, with its own line. */
export const ArticleEndBanner = ({ article }: { article: Pick<Article, "offer" | "offerLine"> }) => (
  <OfferBanner offer={article.offer} line={offerLineFor(article)} />
);
