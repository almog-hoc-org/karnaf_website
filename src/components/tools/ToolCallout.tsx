import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, ExternalLink } from "lucide-react";
import { toolBySlug } from "@/data/tools";

const CLASS =
  "group mt-8 flex items-center gap-4 rounded-2xl border border-accent/40 bg-accent/5 p-5 transition-colors hover:border-accent";

/**
 * "Run your own numbers" — links an article to its tool (`article.tool`):
 * our calculators in-site, Karnaf Analyst's in a new tab. Renders nothing
 * for an unknown slug.
 */
export const ToolCallout = ({ slug }: { slug: string | undefined }) => {
  const tool = toolBySlug(slug);
  if (!tool) return null;
  const body = (
    <>
      <span className="inline-flex w-11 h-11 shrink-0 rounded-full bg-accent/15 items-center justify-center text-accent" aria-hidden>
        <Calculator size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-muted-foreground">
          {tool.external ? "קרנף אנליסט · חינם" : "חשבו בעצמכם, בחינם"}
        </span>
        <span className="block font-bold text-foreground leading-snug">{tool.title}</span>
      </span>
      {tool.external ? (
        <>
          <ExternalLink size={18} aria-hidden className="shrink-0 text-primary" />
          <span className="sr-only">(נפתח בחלון חדש)</span>
        </>
      ) : (
        <ArrowLeft size={18} aria-hidden className="shrink-0 text-primary transition-transform group-hover:-translate-x-1" />
      )}
    </>
  );
  return tool.external ? (
    <a href={tool.href} target="_blank" rel="noopener noreferrer" className={CLASS}>
      {body}
    </a>
  ) : (
    <Link to={tool.href} className={CLASS}>
      {body}
    </Link>
  );
};
