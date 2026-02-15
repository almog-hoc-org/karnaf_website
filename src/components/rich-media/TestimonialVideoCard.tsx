import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Testimonial } from "@/data/testimonials";
import VideoPlayer from "./VideoPlayer";

interface TestimonialVideoCardProps {
  testimonial: Testimonial;
  index?: number;
}

const TestimonialVideoCard = ({ testimonial, index = 0 }: TestimonialVideoCardProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const hasVideo = !!testimonial.videoUrl;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />

        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={14} className="fill-primary text-primary" />
          ))}
        </div>

        <p className="text-foreground text-sm leading-relaxed mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground font-bold text-sm">{testimonial.name}</p>
            <p className="text-muted-foreground text-xs">{testimonial.role}</p>
          </div>

          {hasVideo && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVideoOpen(true)}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Play size={16} className="ml-0.5" />
            </motion.button>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            testimonial.service === "course"
              ? "bg-blue-500/10 text-blue-600"
              : "bg-primary/10 text-primary"
          }`}>
            {testimonial.service === "course" ? "הדרך לדירה" : "ליווי פרימיום"}
          </span>
        </div>
      </motion.div>

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
