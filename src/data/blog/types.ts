/**
 * Blog article schema. One article per file in `./posts/` (default export),
 * collected by `src/data/articles.ts` — so articles can be added or edited
 * independently without touching a shared list.
 *
 * Honesty rules for article content (see CLAUDE.md / PRODUCT.md):
 * - every number, rate, tax bracket or market figure is backed by an entry
 *   in `sources` (official body or established news outlet, with a date);
 * - nothing is claimed about the course that the syllabus doesn't contain
 *   (no calculators, community, AI analyst or personal support in the course);
 * - `updated` moves whenever facts in the article are re-checked.
 */

export type ArticleCategory =
  | "guide"
  | "mortgage"
  | "tax"
  | "negotiation"
  | "market"
  | "new-build"
  | "renewal"
  | "investment";

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  guide: "מדריך רכישה",
  mortgage: "משכנתא ומימון",
  tax: "מיסוי",
  negotiation: "משא ומתן",
  market: "שוק הנדל״ן",
  "new-build": "דירה מקבלן",
  renewal: "התחדשות עירונית",
  investment: "השקעות",
};

export interface ArticleSource {
  /** Title of the cited page/report, as published. */
  title: string;
  /** Publisher, e.g. "בנק ישראל", "רשות המסים", "גלובס". */
  publisher: string;
  url: string;
  /** Publication date of the source, ISO (YYYY-MM-DD) when known. */
  date?: string;
}

export interface ArticleCover {
  /** Public path, e.g. "/blog/covers/<slug>.webp" (1600px wide, webp). */
  src: string;
  /** Optional 1200×630 JPG for social sharing, e.g. "/blog/covers/<slug>-og.jpg". */
  og?: string;
  alt: string;
  /** Photographer / author as the license requires, e.g. "צילום: Jane Doe". */
  credit: string;
  /** e.g. "CC BY-SA 4.0", "Unsplash License", "Public domain". */
  license: string;
  /** Page the image was taken from (license proof). */
  sourceUrl: string;
}

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface Article {
  slug: string;
  title: string;
  /** 1–2 sentences for cards and meta description (≤ 160 chars ideal). */
  excerpt: string;
  category: ArticleCategory;
  /** First published, ISO date. */
  date: string;
  /** Last fact-check / content update, ISO date. */
  updated?: string;
  /** e.g. "8 דקות קריאה". */
  readTime: string;
  cover: ArticleCover;
  /** 3–5 short bullets: the article's answer in brief (shown as a summary box). */
  takeaways: string[];
  /** Markdown (GFM: tables allowed). Sections start at `##`. */
  content: string;
  sources: ArticleSource[];
  /** Which product the article's offer points at (one per article). */
  offer: "course" | "premium";
  /** One contextual sentence: why this article's reader wants that offer. */
  offerLine: string;
  faq?: ArticleFaq[];
  /** Pinned as the lead story on the blog index. */
  featured?: boolean;
}

/**
 * An article without its body: what lists, cards and "related" links need.
 * The blog index and related-article strips ship this, so an article's
 * text only reaches the visitor who opens it.
 */
export type ArticleSummary = Omit<Article, "content" | "takeaways" | "sources" | "faq">;
