import type { Article } from "@/data/blog/types";

export type { Article } from "@/data/blog/types";
export { CATEGORY_LABELS } from "@/data/blog/types";

/* Every file in ./blog/posts is one article (default export). Eager, so the
   list is static at build time and the SSG can pre-render each slug. */
const modules = import.meta.glob<{ default: Article }>("./blog/posts/*.ts", { eager: true });

/** All articles, newest first. */
export const articles: Article[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => b.date.localeCompare(a.date));
