import { articles } from "@/data/articles";
import { relatedArticles } from "@/components/blog/articleUtils";
import type { Article, ArticleSummary } from "./types";

/**
 * Build-time data for the blog routes. Only the route loaders and
 * getStaticPaths in App.tsx import this module, and only during the SSG
 * build (or `vite` dev), so the full articles never enter a browser
 * bundle: vite-react-ssg inlines each page's loader result into its HTML
 * and writes it to static-loader-data/*.json for client-side navigation.
 * Net effect: the blog index ships summaries, an article page ships its
 * own text — and the home and sales pages ship no article text at all.
 */

export interface BlogIndexData {
  articles: ArticleSummary[];
}

export interface BlogArticleData {
  article: Article;
  related: ArticleSummary[];
}

export const toSummary = ({ content: _c, takeaways: _t, sources: _s, faq: _f, ...summary }: Article): ArticleSummary =>
  summary;

export const blogIndexData = (): BlogIndexData => ({ articles: articles.map(toSummary) });

export const blogArticleData = (slug: string | undefined): BlogArticleData | null => {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  return { article, related: relatedArticles(article, articles, 3).map(toSummary) };
};

export const articlePaths = (): string[] => articles.map((a) => `blog/${a.slug}`);
