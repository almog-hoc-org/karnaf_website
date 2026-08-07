import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Quote } from "lucide-react";
import { FigureChip } from "@/components/ui/figure-number";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Testimonial } from "@/data/testimonials";
import VideoPlayer from "./VideoPlayer";

interface TestimonialVideoCardProps {
  testimonial: Testimonial;
  index?: number;
}

/** First letters of the first two name parts, e.g. "נועם ד." → "נד". */
function initialsOf(name: string): string {
  return name
    .replace(/["״'׳]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

const TestimonialVideoCard = ({ testimonial, index = 0 }: TestimonialVideoCardProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const hasVideo = !!testimonial.videoUrl;

  return (
    <>
      <motion.figure
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="h-full bg-card border border-border rounded-2xl p-6 hover:border-accent/40 transition-colors duration-300 relative overflow-hidden flex flex-col"
      >
        <Quote
          size={64}
          className="absolute -top-2 left-2 text-accent/[0.07] rotate-180"
          aria-hidden
        />

        {/* No star rows — feelings are the competitor's currency. A
            testimonial is crowned by its quantified outcome when it has
            one ("מספרים, לא תחושות"); real stories without a number stay,
            uncrowned, rather than getting a decorative rating. */}
        {testimonial.metric && (
          <div className="relative mb-4">
            <FigureChip>{testimonial.metric}</FigureChip>
          </div>
        )}

        <blockquote className="relative text-foreground text-sm leading-relaxed mb-6 flex-1">
          ״{testimonial.quote}״
        </blockquote>

        <figcaption className="relative flex items-center gap-3 pt-4 border-t border-border">
          {testimonial.photo ? (
            <img
              src={testimonial.photo}
              alt=""
              className="w-11 h-11 rounded-full object-cover shrink-0"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span
              aria-hidden
              className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center font-bold text-sm bg-primary/10 text-primary"
            >
              {initialsOf(testimonial.name)}
            </span>
          )}

          <div className="min-w-0 flex-1">
            <p className="text-foreground font-bold text-sm truncate">
              {testimonial.name}
            </p>
            <p className="text-muted-foreground text-xs truncate">
              {testimonial.role}
              {testimonial.location && ` · ${testimonial.location}`}
            </p>
          </div>

          {hasVideo && (
            <button
              onClick={() => setVideoOpen(true)}
              aria-label={`צפייה בעדות של ${testimonial.name}`}
              className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-colors shrink-0 active:scale-95"
            >
              <Play size={16} className="mr-0.5" fill="currentColor" />
            </button>
          )}
        </figcaption>
      </motion.figure>

      {hasVideo && (
        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="max-w-3xl bg-background border-border p-2">
            <VideoPlayer url={testimonial.videoUrl!} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TestimonialVideoCard;
