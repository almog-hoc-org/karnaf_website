import { Link } from "react-router-dom";
import { ArrowLeft, Calculator } from "lucide-react";
import { toolBySlug } from "@/data/tools";

/**
 * "Run your own numbers" — links an article to its calculator
 * (`article.tool`). Renders nothing for an unknown slug.
 */
export const ToolCallout = ({ slug }: { slug: string | undefined }) => {
  const tool = toolBySlug(slug);
  if (!tool || tool.external) return null;
  return (
    <Link
      to={tool.href}
      className="group mt-8 flex items-center gap-4 rounded-2xl border border-accent/40 bg-accent/5 p-5 transition-colors hover:border-accent"
    >
      <span className="inline-flex w-11 h-11 shrink-0 rounded-full bg-accent/15 items-center justify-center text-accent" aria-hidden>
        <Calculator size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-muted-foreground">חשבו בעצמכם, בחינם</span>
        <span className="block font-bold text-foreground leading-snug">{tool.title}</span>
      </span>
      <ArrowLeft size={18} aria-hidden className="shrink-0 text-primary transition-transform group-hover:-translate-x-1" />
    </Link>
  );
};
