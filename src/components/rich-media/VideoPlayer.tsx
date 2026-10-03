import { useState } from "react";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import VimeoEmbed from "@/components/course/VimeoEmbed";
import { parseVideoUrl } from "@/lib/video";

interface VideoPlayerProps {
  url: string;
  title?: string;
  thumbnail?: string;
  ratio?: number;
}

/**
 * Click-to-play video with no player code until the visitor asks for it.
 * It replaced react-player, which shipped dash.js + hls.js (~1.5MB) and
 * was modulepreloaded on /course although no testimonial had a video.
 * Vimeo goes through the course's VimeoEmbed facade (oEmbed poster, GA4
 * progress); YouTube gets a youtube-nocookie iframe behind its own poster.
 */
const VideoPlayer = ({ url, title, thumbnail, ratio = 16 / 9 }: VideoPlayerProps) => {
  const video = parseVideoUrl(url);
  const label = title || "וידאו";

  if (video.kind === "vimeo") {
    return (
      <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-xl">
        <VimeoEmbed videoId={video.id} title={label} aspectPercent={100 / ratio} />
        {title && <p className="p-4 text-sm font-medium text-foreground">{title}</p>}
      </div>
    );
  }

  if (video.kind === "youtube") {
    return <YouTubeFacade id={video.id} title={title} label={label} thumbnail={thumbnail} ratio={ratio} />;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
    >
      <Play size={16} aria-hidden /> לצפייה בווידאו{title ? `: ${title}` : ""}
    </a>
  );
};

const YouTubeFacade = ({
  id,
  title,
  label,
  thumbnail,
  ratio,
}: {
  id: string;
  title?: string;
  label: string;
  thumbnail?: string;
  ratio: number;
}) => {
  const [playing, setPlaying] = useState(false);
  const poster = thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-xl">
      <AspectRatio ratio={ratio}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&hl=he`}
            title={label}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full"
            aria-label={`הפעל וידאו: ${label}`}
          >
            <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" aria-hidden />
            <span
              className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/30 transition-transform group-hover:scale-110"
              aria-hidden
            >
              <Play size={28} className="text-primary-foreground ml-1" />
            </span>
          </button>
        )}
      </AspectRatio>
      {title && <p className="p-4 text-sm font-medium text-foreground">{title}</p>}
    </div>
  );
};

export default VideoPlayer;
