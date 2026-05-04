import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ClipImageProps {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  loading?: "eager" | "lazy";
}

export const ClipImage = ({
  src,
  alt,
  className = "",
  ratio = "aspect-[4/5]",
  loading = "lazy",
}: ClipImageProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  setShown(true);
                  io?.disconnect();
                }
              });
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
          )
        : null;
    io?.observe(el);
    const t = window.setTimeout(() => setShown(true), 2500);
    return () => {
      window.clearTimeout(t);
      io?.disconnect();
    };
  }, [reduce]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${ratio} ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        initial={reduce ? false : { scale: 1.15, opacity: 0 }}
        animate={shown ? { scale: 1, opacity: 1 } : { scale: 1.15, opacity: 0 }}
        transition={{ duration: reduce ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};
