import type { Article, ArticleCategory, ArticleCover } from "@/data/blog/types";
import { CHAPTERS_LABEL, LESSON_MINUTES, PARTS_LABEL } from "@/data/courseStats";
import { COURSE_PRICE } from "@/lib/constants";

/* Pure helpers shared by the blog index and the article page. Everything
   here is deterministic (no Date parsing, no Intl, no window) so the
   pre-rendered HTML and the first client render always agree. */

const HE_MONTHS = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

/**
 * "2026-09-28" → "28 בספטמבר 2026", "2026-09" → "ספטמבר 2026", "2026" → "2026".
 * Anything else is returned unchanged.
 */
export function formatHebrewDate(iso: string): string {
  const m = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?/.exec(iso.trim());
  if (!m) return iso;
  if (!m[2]) return m[1];
  const month = HE_MONTHS[Number(m[2]) - 1];
  if (!month) return iso;
  return m[3] ? `${Number(m[3])} ב${month} ${m[1]}` : `${month} ${m[1]}`;
}

/** Last fact-check date, falling back to the publish date. */
export const lastUpdated = (a: Pick<Article, "date" | "updated">): string => a.updated || a.date;

/** True when the article carries an update date later than its publish date. */
export const wasUpdated = (a: Pick<Article, "date" | "updated">): boolean =>
  !!a.updated && a.updated > a.date;

/** Legacy posts say "צפייה" (from the old video category) — the blog is read, not watched. */
export const readTimeLabel = (a: Pick<Article, "readTime">): string =>
  a.readTime.replace("צפייה", "קריאה");

/** Legacy posts point at the brand share card instead of a real photo. */
export const hasRealCover = (cover: ArticleCover | undefined): boolean =>
  !!cover?.src && cover.src !== "/og-image.jpg" && !cover.src.endsWith("/placeholder.svg");

/** Photo credit line — the credit may already start with "צילום:". */
export function creditLine(cover: ArticleCover): string {
  const credit = cover.credit.trim();
  if (!credit) return "";
  const who = /^(צילום|איור|תמונה|צילומים)\s*[:：]/.test(credit) ? credit : `צילום: ${credit}`;
  return cover.license.trim() ? `${who} · רישיון ${cover.license.trim()}` : who;
}

/** The pinned lead story, else the newest article. */
export function leadArticle(list: Article[]): Article | undefined {
  return list.find((a) => a.featured) ?? list[0];
}

/** Same category first (newest first inside it), then the newest of the rest. */
export function relatedArticles(article: Article, list: Article[], n = 3): Article[] {
  const others = list.filter((a) => a.slug !== article.slug);
  const same = others.filter((a) => a.category === article.category);
  const rest = others.filter((a) => a.category !== article.category);
  return [...same, ...rest].slice(0, n);
}

/** Categories that actually have articles, in CATEGORY_LABELS order. */
export function usedCategories(list: Article[], order: ArticleCategory[]): ArticleCategory[] {
  const present = new Set(list.map((a) => a.category));
  return order.filter((c) => present.has(c));
}

/* ── Offer ───────────────────────────────────────────────────────────── */

export const COURSE_PRICE_LABEL = `₪${COURSE_PRICE.toLocaleString("he-IL")}`;

/* Course copy stays inside what the course is — a self-paced digital
   program: no personal support, analyst, calculators or community. */
const DEFAULT_OFFER_LINES: Record<Article["offer"], string> = {
  course: `${PARTS_LABEL} ו-${CHAPTERS_LABEL} בשיעורים של ${LESSON_MINUTES} דקות — מהיסודות, דרך המימון והמשא ומתן, ועד החתימה. בקצב שלכם.`,
  premium:
    "אנליסט אישי שעובר איתכם את כל הדרך — מהאסטרטגיה, דרך בדיקת העסקה במספרים, ועד שאתם חותמים על נכס משלכם.",
};

/** The article's own offer sentence, or a sensible default for its product. */
export const offerLineFor = (article: Pick<Article, "offer" | "offerLine">): string =>
  article.offerLine?.trim() || DEFAULT_OFFER_LINES[article.offer];

/** Default offer line for a product (the blog index banner). */
export const defaultOfferLine = (offer: Article["offer"]): string => DEFAULT_OFFER_LINES[offer];

/* ── Markdown structure ──────────────────────────────────────────────── */

/** Inline markdown → plain text (headings, TOC labels, JSON-LD answers). */
export function stripInlineMarkdown(md: string): string {
  return md
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    .replace(/(^|[^\w*])\*(?!\s)(.+?)\*(?!\w)/g, "$1$2")
    .replace(/\\([\\`*_{}[\]()#+\-.!])/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * A URL-fragment-safe id for a Hebrew heading: niqqud and punctuation
 * (including gershayim ״ and geresh ׳) are dropped, letters and digits in
 * any script are kept, whitespace becomes "-".
 */
export function slugifyHeading(text: string): string {
  return text
    .normalize("NFC")
    .replace(/[֑-ׇ]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface ArticleSection {
  /** null for the lede before the first "##". */
  heading: { id: string; text: string } | null;
  /** Markdown of the section body (without its "##" line). */
  body: string;
}

/**
 * Split the article at its "##" headings (outside fenced code), so the
 * page can give every section a stable id for the table of contents,
 * track the active one, and drop the offer between two sections. Ids are
 * de-duplicated in document order.
 */
export function splitSections(md: string): ArticleSection[] {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const sections: ArticleSection[] = [];
  const used = new Map<string, number>();
  let current: ArticleSection = { heading: null, body: "" };
  let buf: string[] = [];
  let fence: string | null = null;

  const flush = () => {
    current.body = buf.join("\n").trim();
    if (current.heading || current.body) sections.push(current);
    buf = [];
  };

  for (const line of lines) {
    const fenceMatch = /^\s{0,3}(`{3,}|~{3,})/.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      if (fence === null) fence = marker;
      else if (fence === marker) fence = null;
    }
    const h2 = fence === null ? /^\s{0,3}##\s+(.+?)\s*#*\s*$/.exec(line) : null;
    if (h2) {
      flush();
      const text = stripInlineMarkdown(h2[1]);
      const base = slugifyHeading(text) || `section-${sections.length + 1}`;
      const count = used.get(base) ?? 0;
      used.set(base, count + 1);
      current = { heading: { id: count ? `${base}-${count + 1}` : base, text }, body: "" };
    } else {
      buf.push(line);
    }
  }
  flush();
  return sections;
}
