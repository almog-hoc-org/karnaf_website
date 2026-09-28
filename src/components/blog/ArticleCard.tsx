import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { Article, ArticleCategory } from "@/data/blog/types";
import { CATEGORY_LABELS } from "@/data/blog/types";
import { CoverImage } from "./CoverImage";
import { formatHebrewDate, lastUpdated, readTimeLabel, wasUpdated } from "./articleUtils";

/** Category label: navy ink with an amber tick (amber alone is too light for 12px text). */
export const CategoryTag = ({
  category,
  className = "",
}: {
  category: ArticleCategory;
  className?: string;
}) => (
  <span className={`inline-flex items-center gap-2 text-[0.8125rem] font-bold tracking-[0.02em] text-primary ${className}`}>
    <span className="block h-[2px] w-4 rounded-full bg-accent" aria-hidden />
    {CATEGORY_LABELS[category]}
  </span>
);

/** "עודכן 28 בספטמבר 2026 · 9 דקות קריאה" */
export const ArticleMeta = ({ article, className = "" }: { article: Article; className?: string }) => {
  const iso = lastUpdated(article);
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground ${className}`}>
      <span>
        {wasUpdated(article) ? "עודכן " : ""}
        <time dateTime={iso}>{formatHebrewDate(iso)}</time>
      </span>
      <span aria-hidden>·</span>
      <span>{readTimeLabel(article)}</span>
    </p>
  );
};

/* Whole-card click target without nesting interactive content: the title
   link stretches over the card with ::after, and the focus ring is drawn
   on that overlay so keyboard users see the card, not just the title. */
const stretchedLink =
  "after:absolute after:inset-0 after:content-[''] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:ring-2 focus-visible:after:ring-accent focus-visible:after:ring-offset-4 focus-visible:after:ring-offset-background";

/**
 * Grid card: fixed-ratio cover, category, title, excerpt, date and read time.
 * `compactOnMobile` turns it into a thumbnail row below `sm` (used for
 * "להמשך קריאה", where three full-width cards would be a long scroll).
 */
export const ArticleCard = ({
  article,
  headingLevel = "h3",
  compactOnMobile = false,
}: {
  article: Article;
  headingLevel?: "h2" | "h3";
  compactOnMobile?: boolean;
}) => {
  const Heading = headingLevel;
  const c = compactOnMobile;
  return (
    <article
      className={`group relative h-full ${
        c ? "grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-4 sm:flex sm:flex-col sm:gap-0" : "flex flex-col"
      }`}
    >
      <CoverImage
        article={article}
        informative={false}
        size={c ? "sm" : "md"}
        className={`rounded-2xl shadow-depth-1 transition-shadow duration-500 group-hover:shadow-depth-3 ${
          c ? "aspect-square rounded-xl sm:aspect-[16/10] sm:rounded-2xl" : "aspect-[16/10]"
        }`}
        imgClassName="transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <CategoryTag category={article.category} className={c ? "sm:mt-5" : "mt-5"} />
        <Heading
          className={`font-extrabold tracking-[-0.015em] text-primary ${
            c ? "mt-1.5 text-[1.0625rem] leading-snug sm:mt-2.5 sm:text-[1.3125rem] sm:leading-[1.3]" : "mt-2.5 text-[1.3125rem] leading-[1.3]"
          }`}
        >
          <Link
            to={`/blog/${article.slug}`}
            className={`decoration-accent decoration-2 underline-offset-[6px] group-hover:underline after:rounded-2xl ${stretchedLink}`}
          >
            {article.title}
          </Link>
        </Heading>
        <p
          className={`mt-2.5 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted-foreground ${
            c ? "hidden sm:block" : ""
          }`}
        >
          {article.excerpt}
        </p>
        <ArticleMeta article={article} className={c ? "pt-2 sm:mt-auto sm:pt-4" : "mt-auto pt-4"} />
      </div>
    </article>
  );
};

/** The index's lead story: a large cover beside (desktop) or above (mobile) the headline. */
export const LeadStory = ({ article }: { article: Article }) => (
  <article className="group relative grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
    <CoverImage
      article={article}
      priority
      size="lg"
      className="-mx-5 aspect-[16/10] sm:mx-0 sm:rounded-editorial lg:col-span-7 sm:shadow-depth-2"
      imgClassName="transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
    />
    <div className="lg:col-span-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
          {article.featured ? "המאמר המוביל" : "חדש בבלוג"}
        </span>
        <CategoryTag category={article.category} />
      </div>
      <h2
        id="lead-story-title"
        className="mt-5 text-[1.875rem] font-black leading-[1.12] tracking-[-0.025em] text-primary md:text-[2.375rem] lg:text-[2.5rem]"
      >
        <Link
          to={`/blog/${article.slug}`}
          className={`decoration-accent decoration-[3px] underline-offset-[8px] group-hover:underline ${stretchedLink} after:rounded-editorial`}
        >
          {article.title}
        </Link>
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">{article.excerpt}</p>
      <ArticleMeta article={article} className="mt-5" />
      <span className="mt-6 inline-flex items-center gap-2 font-bold text-primary" aria-hidden>
        לקריאת המאמר
        <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
      </span>
    </div>
  </article>
);
