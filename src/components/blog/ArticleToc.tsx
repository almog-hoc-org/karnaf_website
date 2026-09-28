import { useRef, type MouseEvent } from "react";
import { ChevronDown, ListOrdered } from "lucide-react";
import { useStillMotion } from "@/hooks/use-still-motion";

export interface TocItem {
  id: string;
  text: string;
}

/**
 * Jump to a section: smooth unless the reader asked for stillness, the
 * URL fragment updated without adding a history entry (so Back still
 * leaves the article), and focus moved to the heading for keyboard and
 * screen-reader users. Without JS the plain #fragment link still works.
 */
function useJump(onJump?: () => void) {
  const still = useStillMotion();
  return (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    onJump?.();
    el.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
    window.history.replaceState(window.history.state, "", `#${encodeURIComponent(id)}`);
    el.focus({ preventScroll: true });
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Desktop: sticky contents with a rail that fills as the article is read. */
export const ArticleTocRail = ({ items, activeId }: { items: TocItem[]; activeId: string | null }) => {
  const jump = useJump();
  const activeIndex = items.findIndex((it) => it.id === activeId);

  return (
    <nav
      aria-label="תוכן העניינים"
      className="sticky top-28 overflow-y-auto overscroll-contain pb-6 pe-1"
      style={{ maxHeight: "calc(100vh - 8.5rem - var(--sticky-cta-h, 0px))" }}
    >
      <p className="mb-4 text-sm font-bold text-primary">בכתבה</p>
      <div className="relative">
        {/* The rail and its fill (reading progress, --read from useArticleReading) */}
        <span className="absolute top-3 bottom-3 start-[5px] w-px bg-border" aria-hidden />
        <span
          className="absolute top-3 bottom-3 start-[5px] w-px origin-top bg-accent"
          style={{ transform: "scaleY(var(--read, 0))" }}
          aria-hidden
        />
        <ol>
          {items.map((it, i) => {
            const active = i === activeIndex;
            const passed = activeIndex > -1 && i < activeIndex;
            return (
              <li key={it.id} className="relative ps-7">
                <span
                  aria-hidden
                  className={`absolute start-[2px] top-[0.9rem] h-[7px] w-[7px] rounded-full border transition-[background-color,border-color,transform] duration-300 ${
                    active
                      ? "scale-[1.35] border-accent bg-accent"
                      : passed
                        ? "border-accent bg-accent"
                        : "border-foreground/25 bg-background"
                  }`}
                />
                <a
                  href={`#${it.id}`}
                  onClick={(e) => jump(e, it.id)}
                  aria-current={active ? "location" : undefined}
                  className={`block rounded-md py-2 text-[0.9375rem] leading-snug transition-colors ${
                    active ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {it.text}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

/** Mobile / tablet: a collapsed contents box (native <details> — in the HTML, no JS needed). */
export const ArticleTocCollapsible = ({ items }: { items: TocItem[] }) => {
  const ref = useRef<HTMLDetailsElement>(null);
  const jump = useJump(() => {
    if (ref.current) ref.current.open = false;
  });

  return (
    <nav aria-label="תוכן העניינים">
      <details ref={ref} className="group rounded-2xl border border-border bg-card">
        <summary className="flex min-h-[56px] cursor-pointer list-none items-center gap-3 rounded-2xl px-5 py-3 font-bold text-primary [&::-webkit-details-marker]:hidden">
          <ListOrdered size={18} className="text-accent shrink-0" aria-hidden />
          <span className="flex-1">תוכן העניינים</span>
          <span className="text-sm font-medium text-muted-foreground tabular-nums">
            {items.length} חלקים
          </span>
          <ChevronDown
            size={18}
            className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <ol className="border-t border-border px-2 py-2">
          {items.map((it, i) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => jump(e, it.id)}
                className="flex min-h-[44px] items-baseline gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] leading-snug text-foreground transition-colors hover:bg-secondary"
              >
                <span className="w-6 shrink-0 text-xs font-bold text-muted-foreground tabular-nums">{pad(i + 1)}</span>
                <span>{it.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
};
