import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Check } from "lucide-react";

/* Long-form Hebrew typography for article markdown. Styles live on the
   rendered elements (Tailwind), not on a `prose` wrapper — the typography
   plugin isn't registered in this project, and RTL reading needs its own
   measure, leading and list rhythm anyway. */

/**
 * GFM tables scroll sideways inside their own box on narrow screens,
 * edge to edge on mobile, with a hint that appears only when the table
 * actually overflows (measured after mount, so SSR and hydration agree).
 */
const TableScroller = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollWidth > el.clientWidth + 1);
    check();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="my-9 -mx-5 sm:mx-0">
      <div
        ref={ref}
        className="overflow-x-auto overscroll-x-contain border-y sm:border sm:rounded-2xl border-border bg-card focus-visible:ring-inset"
        {...(overflows
          ? { tabIndex: 0, role: "region", "aria-label": "טבלה — ניתן לגלול הצידה" }
          : {})}
      >
        <table className="w-full border-collapse text-[0.875rem] leading-relaxed tabular-nums sm:text-[0.9375rem]">
          {children}
        </table>
      </div>
      {overflows && (
        <p className="mt-2 px-5 sm:px-0 flex items-center gap-1.5 text-xs text-muted-foreground" aria-hidden>
          <ArrowLeft size={12} />
          גללו הצידה לכל הטבלה
        </p>
      )}
    </div>
  );
};

const isExternal = (href: string) => /^(https?:)?\/\//.test(href);

type HastLike = { type?: string; value?: string; children?: HastLike[] };

/** Visible text length of a hast node (for table-cell wrapping decisions). */
const textLength = (node: HastLike | undefined): number =>
  !node
    ? 0
    : node.type === "text"
      ? (node.value ?? "").length
      : (node.children ?? []).reduce((n, c) => n + textLength(c), 0);

/* Short cells (amounts, rates, ranges) never break mid-figure — the table
   scrolls instead; sentences keep wrapping, within a readable width. */
const cellWrap = (node: HastLike | undefined) =>
  textLength(node) <= 28 ? "whitespace-nowrap" : "min-w-[12rem] max-w-[22rem]";

/** Section headings (the article's "##", FAQ, sources): an amber rule, then the title. */
export const SECTION_HEADING_CLASS =
  "mb-6 text-[1.625rem] md:text-[2rem] font-extrabold leading-[1.2] tracking-[-0.02em] text-primary focus:outline-none before:mb-5 before:block before:h-[3px] before:w-10 before:rounded-full before:bg-accent before:content-['']";

const components: Components = {
  // A stray "#" heading inside a section is typeset as a section heading
  // (the page already has its H1).
  h1: ({ node: _n, ...props }) => <h2 className={`mt-14 ${SECTION_HEADING_CLASS}`} {...props} />,
  h3: ({ node: _n, ...props }) => (
    <h3
      className="mt-11 mb-3 text-[1.25rem] md:text-[1.375rem] font-bold leading-snug tracking-[-0.01em] text-primary"
      {...props}
    />
  ),
  h4: ({ node: _n, ...props }) => (
    <h4 className="mt-8 mb-2 text-lg font-bold leading-snug text-primary" {...props} />
  ),
  p: ({ node: _n, ...props }) => <p className="my-6" {...props} />,
  strong: ({ node: _n, ...props }) => <strong className="font-bold text-primary" {...props} />,
  a: ({ node: _n, href = "", children, ...props }) => {
    const cls =
      "font-semibold text-primary underline decoration-accent/70 decoration-2 underline-offset-[5px] transition-colors hover:decoration-accent";
    if (href.startsWith("/") && !href.startsWith("//")) {
      return (
        <Link to={href} className={cls}>
          {children}
        </Link>
      );
    }
    if (isExternal(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props}>
          {children}
          <span className="sr-only"> (נפתח בחלון חדש)</span>
        </a>
      );
    }
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  },
  ul: ({ node: _n, className, ...props }) =>
    className?.includes("contains-task-list") ? (
      <ul className="my-6 space-y-3 list-none ps-0" {...props} />
    ) : (
      <ul
        className="my-6 ps-6 space-y-3 list-disc marker:text-accent [&_ul]:mt-3 [&_ol]:mt-3"
        {...props}
      />
    ),
  ol: ({ node: _n, className: _c, ...props }) => (
    <ol
      className="my-6 ps-7 space-y-3 list-decimal marker:text-accent marker:font-bold [&_ul]:mt-3 [&_ol]:mt-3"
      {...props}
    />
  ),
  li: ({ node: _n, className, ...props }) =>
    className?.includes("task-list-item") ? (
      <li className="flex items-start gap-3" {...props} />
    ) : (
      <li className="ps-1.5" {...props} />
    ),
  // GFM task-list boxes (read-only): a drawn box instead of the greyed-out
  // disabled checkbox, amber with a check when done.
  input: ({ node: _n, type, checked, disabled: _d, ...props }) =>
    type === "checkbox" ? (
      <span className="relative mt-[0.33em] inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          {...props}
          type="checkbox"
          checked={!!checked}
          disabled
          className="peer h-5 w-5 appearance-none rounded-md border-2 border-primary/30 bg-card checked:border-accent checked:bg-accent"
        />
        <Check
          size={13}
          strokeWidth={3}
          className="pointer-events-none absolute hidden text-accent-foreground peer-checked:block"
          aria-hidden
        />
      </span>
    ) : (
      <input type={type} checked={checked} {...props} />
    ),
  blockquote: ({ node: _n, ...props }) => (
    <blockquote
      className="my-9 rounded-2xl border border-accent/25 bg-accent/[0.06] px-6 py-5 md:px-8 md:py-6 text-foreground [&>p]:my-3 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-14 mx-auto w-24 border-0 h-px bg-foreground/20" />
  ),
  img: ({ node: _n, alt = "", ...props }) => (
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      className="my-8 block w-full h-auto rounded-2xl border border-border"
      {...props}
    />
  ),
  code: ({ node: _n, className, ...props }) =>
    className ? (
      <code className={`${className} text-sm`} {...props} />
    ) : (
      <code className="rounded-md bg-secondary px-1.5 py-0.5 text-[0.9em] text-primary" {...props} />
    ),
  pre: ({ node: _n, ...props }) => (
    <pre
      dir="ltr"
      className="my-8 overflow-x-auto rounded-2xl bg-[hsl(var(--ink))] p-5 text-sm text-[hsl(var(--ink-foreground))]"
      {...props}
    />
  ),
  table: ({ node: _n, children }) => <TableScroller>{children}</TableScroller>,
  thead: ({ node: _n, ...props }) => <thead className="bg-secondary text-primary border-b border-primary/15" {...props} />,
  tbody: ({ node: _n, ...props }) => (
    <tbody className="[&>tr:nth-child(even)]:bg-secondary/40" {...props} />
  ),
  tr: ({ node: _n, ...props }) => <tr className="border-t border-border first:border-t-0" {...props} />,
  th: ({ node: _n, ...props }) => (
    <th
      className="min-w-[7.5rem] px-4 py-3 text-start align-bottom font-bold leading-snug first:ps-5 last:pe-5"
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td
      className={`px-4 py-3 align-top text-foreground first:ps-5 first:font-semibold first:text-primary last:pe-5 ${cellWrap(node as HastLike)}`}
      {...props}
    />
  ),
};

const remarkPlugins = [remarkGfm];

interface ProseProps {
  markdown: string;
  className?: string;
  /** "body" for the article, "compact" for FAQ answers. */
  size?: "body" | "compact";
}

const SIZE = {
  body: "text-[1.0625rem] md:text-[1.1875rem] leading-[1.85]",
  compact: "text-base md:text-[1.0625rem] leading-[1.8]",
} as const;

/** Article markdown (GFM) with the blog's long-form typography. */
export const Prose = ({ markdown, className = "", size = "body" }: ProseProps) => (
  <div
    className={`${SIZE[size]} text-foreground tracking-[-0.003em] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 ${className}`}
  >
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {markdown}
    </ReactMarkdown>
  </div>
);
