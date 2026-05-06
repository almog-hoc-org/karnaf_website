import { Suspense, lazy, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useInView } from "react-intersection-observer";

/**
 * react-player drags in HLS.js (~520kB) and dash.js (~990kB).
 * Lazy-load it so those bundles only ship to pages that actually
 * render a video — and only after the player scrolls into view.
 */
const ReactPlayer = lazy(() =>
  import("react-player").then((mod) => ({
    default: mod.default as unknown as React.ComponentType<Record<string, unknown>>,
  }))
);

interface VideoPlayerProps {
  url: string;
  title?: string;
  thumbnail?: string;
  ratio?: number;
}

const VideoPlayer = ({ url, title, thumbnail, ratio = 16 / 9 }: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: "200px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-xl group"
    >
      <AspectRatio ratio={ratio}>
        {inView ? (
          <Suspense fallback={<div className="w-full h-full bg-card animate-pulse" />}>
            <ReactPlayer
              url={url}
              playing={playing}
              controls
              width="100%"
              height="100%"
              light={!playing && (thumbnail || true)}
              playIcon={<></>}
              onClickPreview={() => setPlaying(true)}
              config={{
                youtube: {
                  rel: 0,
                  hl: "he",
                },
              }}
            />
            {!playing && (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
                aria-label={title ? `הפעל וידאו: ${title}` : "הפעל וידאו"}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/30"
                >
                  <Play size={28} className="text-primary-foreground ml-1" />
                </motion.div>
              </button>
            )}
          </Suspense>
        ) : (
          <div className="w-full h-full bg-card animate-pulse" />
        )}
      </AspectRatio>
      {title && (
        <div className="p-4">
          <p className="text-sm font-medium text-foreground">{title}</p>
        </div>
      )}
    </motion.div>
  );
};

export default VideoPlayer;
