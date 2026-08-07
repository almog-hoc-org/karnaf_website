import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { WedgeBullet } from "@/components/ui/wedge";
import { gaVideoPlay, gaVideoProgress } from "@/lib/analytics";

interface VimeoEmbedProps {
  videoId: string;
  title: string;
  /** height/width as a percentage — matches Vimeo's own embed padding. */
  aspectPercent?: number;
}

/**
 * Lightweight Vimeo embed with a click-to-play facade: nothing from
 * player.vimeo.com loads until the visitor asks for it, so the sales
 * page keeps its LCP/INP budget. The poster comes from Vimeo's public
 * oEmbed endpoint (fetched only once the block is near the viewport),
 * with a branded gradient as the fallback. Watch progress is reported
 * to GA4 so we can tell whether the video actually sells.
 */
const VimeoEmbed = ({ videoId, title, aspectPercent = 64.98 }: VimeoEmbedProps) => {
  const [activated, setActivated] = useState(false);
  const [poster, setPoster] = useState<string | null>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: "300px" });

  // Poster only — no player code, no cookies.
  useEffect(() => {
    if (!inView || poster) return;
    let cancelled = false;
    fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
        `https://vimeo.com/${videoId}`
      )}&width=1280`
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.thumbnail_url) setPoster(data.thumbnail_url as string);
      })
      .catch(() => {
        /* Branded fallback stays — never block the video on this. */
      });
    return () => {
      cancelled = true;
    };
  }, [inView, videoId, poster]);

  // Watch-progress reporting. Vimeo's player.js is a classic script (not an
  // ES module), so it is injected rather than imported. Entirely optional:
  // if it fails to load, the video still plays.
  useEffect(() => {
    if (!activated) return;
    let player: { destroy?: () => void } | null = null;
    let cancelled = false;
    const marks = new Set<number>();

    const attach = () => {
      const Player = (window as unknown as { Vimeo?: { Player: new (el: HTMLIFrameElement) => unknown } })
        .Vimeo?.Player;
      if (cancelled || !Player || !frameRef.current) return;
      try {
        const instance = new Player(frameRef.current) as {
          on: (event: string, cb: (data: { percent: number }) => void) => void;
          destroy?: () => void;
        };
        instance.on("timeupdate", ({ percent }) => {
          for (const mark of [25, 50, 75, 95]) {
            if (percent * 100 >= mark && !marks.has(mark)) {
              marks.add(mark);
              gaVideoProgress(mark);
            }
          }
        });
        player = instance;
      } catch {
        /* Progress tracking is a nice-to-have; playback never depends on it. */
      }
    };

    const SCRIPT_SRC = "https://player.vimeo.com/api/player.js";
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if ((window as unknown as { Vimeo?: unknown }).Vimeo) {
      attach();
    } else if (existing) {
      existing.addEventListener("load", attach, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.addEventListener("load", attach, { once: true });
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      try {
        player?.destroy?.();
      } catch {
        /* ignore */
      }
    };
  }, [activated]);

  return (
    <div
      ref={ref}
      className="relative w-full rounded-2xl overflow-hidden border shadow-depth-3"
      style={{
        paddingTop: `${aspectPercent}%`,
        borderColor: "hsl(36 33% 95% / 0.12)",
        backgroundColor: "hsl(217 50% 8%)",
      }}
    >
      {activated ? (
        <iframe
          ref={frameRef}
          src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title={title}
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            gaVideoPlay();
            setActivated(true);
          }}
          aria-label={`הפעלת הסרטון: ${title}`}
          className="absolute inset-0 w-full h-full group cursor-pointer"
        >
          {poster && (
            <img
              src={poster}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
          <span
            className="absolute inset-0"
            aria-hidden
            style={{
              background: poster
                ? "linear-gradient(180deg, hsl(217 50% 8% / 0.35) 0%, hsl(217 50% 8% / 0.65) 100%)"
                : "radial-gradient(70% 90% at 50% 40%, hsl(24 80% 52% / 0.22) 0%, transparent 70%), hsl(217 50% 8%)",
            }}
          />
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            {/* Play mark = the horn wedge (role #4 of the device). */}
            <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center shadow-[0_16px_48px_-8px_hsl(24_80%_52%_/_0.6)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
              <WedgeBullet className="w-9 h-9 text-accent-foreground" />
            </span>
            <span className="text-white font-bold text-base md:text-lg drop-shadow-lg">
              {title}
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default VimeoEmbed;
