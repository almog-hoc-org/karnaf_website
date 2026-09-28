import { ExternalLink, Info, Plus, Zap } from "lucide-react";
import type { ArticleFaq as FaqItem, ArticleSource } from "@/data/blog/types";
import { Prose, SECTION_HEADING_CLASS } from "./ArticleProse";
import { formatHebrewDate } from "./articleUtils";

/** "בקצרה" — the article's answer in 3–5 lines, right under the header. */
export const ArticleTakeaways = ({ items }: { items: string[] }) => (
  <section
    aria-labelledby="takeaways-title"
    className="rounded-2xl border border-border bg-card p-6 shadow-depth-1 md:p-8"
  >
    <h2 id="takeaways-title" className="flex items-center gap-2.5 text-base font-black text-primary">
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground"
        aria-hidden
      >
        <Zap size={14} strokeWidth={2.5} />
      </span>
      בקצרה
    </h2>
    <ul className="mt-5 divide-y divide-border">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3.5 py-3.5 first:pt-0 last:pb-0">
          <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <Prose markdown={t} size="compact" className="min-w-0 font-medium" />
        </li>
      ))}
    </ul>
  </section>
);

/**
 * FAQ as native <details>: every answer is in the pre-rendered HTML (a
 * closed Radix accordion doesn't render its content at all), so crawlers
 * and AI answer engines read the same answers the FAQPage JSON-LD claims.
 */
export const ArticleFaq = ({ items }: { items: FaqItem[] }) => (
  <section aria-labelledby="faq" className="mt-16">
    <h2 id="faq" tabIndex={-1} className={SECTION_HEADING_CLASS}>
      שאלות נפוצות
    </h2>
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-2xl border border-border bg-card transition-shadow open:shadow-depth-1"
        >
          <summary className="flex min-h-[56px] cursor-pointer list-none items-start gap-4 rounded-2xl px-5 py-4 text-[1.0625rem] font-bold leading-snug text-primary md:px-6 [&::-webkit-details-marker]:hidden">
            <span className="flex-1 pt-0.5">{item.q}</span>
            <span
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform duration-200 group-open:rotate-45 group-open:border-accent group-open:text-accent"
              aria-hidden
            >
              <Plus size={14} />
            </span>
          </summary>
          <div className="px-5 pb-5 md:px-6 md:pb-6">
            <Prose markdown={item.a} size="compact" />
          </div>
        </details>
      ))}
    </div>
  </section>
);

/** "מקורות": publisher · title · date, each opening the source in a new tab. */
export const ArticleSources = ({ sources }: { sources: ArticleSource[] }) => (
  <section aria-labelledby="sources" className="mt-16">
    <h2 id="sources" tabIndex={-1} className={SECTION_HEADING_CLASS}>
      מקורות
    </h2>
    <ol className="space-y-4">
      {sources.map((s, i) => (
        <li key={`${s.url}-${i}`} className="flex gap-3 text-[0.9375rem] leading-relaxed">
          <span className="w-6 shrink-0 font-bold text-muted-foreground tabular-nums">{i + 1}.</span>
          <p className="min-w-0 text-foreground">
            <span className="font-bold text-primary">{s.publisher}</span>
            <span className="mx-1.5 text-muted-foreground" aria-hidden>
              ·
            </span>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              dir="auto"
              className="break-words underline decoration-foreground/25 decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {s.title}
              <ExternalLink size={12} className="ms-1 inline-block align-[-1px] text-muted-foreground" aria-hidden />
              <span className="sr-only"> (נפתח בחלון חדש)</span>
            </a>
            {s.date && (
              <>
                <span className="mx-1.5 text-muted-foreground" aria-hidden>
                  ·
                </span>
                <time dateTime={s.date} className="text-muted-foreground">
                  {formatHebrewDate(s.date)}
                </time>
              </>
            )}
          </p>
        </li>
      ))}
    </ol>
  </section>
);

/** General-information disclaimer; the fact-check date only when the article carries one. */
export const ArticleDisclaimer = ({ updated }: { updated?: string }) => (
  <aside
    aria-label="הבהרה"
    className="mt-12 flex gap-3 rounded-2xl border border-border p-5 text-sm leading-relaxed text-muted-foreground"
  >
    <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
    <p>
      המאמר מציג מידע כללי בלבד. הוא אינו ייעוץ משפטי, מיסויי או פיננסי ואינו תחליף לבדיקה של איש מקצוע
      מוסמך במקרה הספציפי שלכם.
      {updated && (
        <>
          {" "}
          העובדות והנתונים נבדקו נכון ל־<time dateTime={updated}>{formatHebrewDate(updated)}</time>.
        </>
      )}
    </p>
  </aside>
);
