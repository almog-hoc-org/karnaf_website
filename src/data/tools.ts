import { analystLink } from "@/lib/constants";

/**
 * The calculators and data tools the site offers, in display order. Our
 * own tools live under /tools; the market-data ones are Karnaf Analyst's
 * (analyst.karnafnadlan.com) and open there, tagged with UTM. Only live
 * tools are listed — no "coming soon" cards.
 */
export interface ToolEntry {
  slug: string;
  title: string;
  description: string;
  href: string;
  /** Opens on Karnaf Analyst, in a new tab. */
  external: boolean;
}

export const TOOLS: ToolEntry[] = [
  {
    slug: "purchase-tax",
    title: "מחשבון מס רכישה 2026",
    description: "דירה יחידה, משפרי דיור, דירה נוספת ועולים חדשים — לפי המדרגות העדכניות, עם פירוט של כל מדרגה.",
    href: "/tools/purchase-tax",
    external: false,
  },
  {
    slug: "total-cost",
    title: "כמה באמת עולה לקנות דירה",
    description: "מס רכישה, עורך דין, תיווך, שמאי, עמלות משכנתא ואגרות — בפירוט אחד, וכמה הון עצמי צריך בפועל.",
    href: "/tools/total-cost",
    external: false,
  },
  {
    slug: "affordability",
    title: "כמה דירה אתם יכולים להרשות לעצמכם",
    description: "לפי ההון העצמי, ההכנסה ומגבלות בנק ישראל: המחיר המרבי, המשכנתא, ההחזר — ומה בדיוק מגביל אתכם.",
    href: "/tools/affordability",
    external: false,
  },
  {
    slug: "20-80",
    title: "מבצע 20/80: כמה הדירה עולה באמת",
    description: "כמה שווה מבצע מימון של קבלן בכסף של היום, מה מוסיפה ההצמדה למדד, וכמה הון עצמי צריך ביום המסירה.",
    href: "/tools/20-80",
    external: false,
  },
  {
    slug: "price-check",
    title: "בדיקת מחיר מול עסקאות אמת",
    description: "המחיר שמבקשים מכם גבוה או נמוך מהשוק? השוואה לעסקאות שדווחו לרשות המסים, באותו רחוב ובאותה שכונה.",
    href: analystLink("/check", "tools-hub"),
    external: true,
  },
  {
    slug: "city-prices",
    title: "מחירי דירות לפי עיר",
    description: "מחיר חציוני, מחיר למ״ר, עסקאות אחרונות ומגמות — עיר אחר עיר.",
    href: analystLink("/cities", "tools-hub"),
    external: true,
  },
  {
    slug: "mortgage-mix",
    title: "מחשבון תמהיל משכנתא",
    description: "החזר חודשי לכל מסלול, השפעת ההצמדה, וכמה יקפוץ ההחזר אם הפריים יעלה.",
    href: analystLink("/calculators", "tools-hub"),
    external: true,
  },
];

export const toolBySlug = (slug: string | undefined): ToolEntry | undefined =>
  TOOLS.find((t) => t.slug === slug);
