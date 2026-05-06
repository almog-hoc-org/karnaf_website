import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees on either axis (default 6). */
  max?: number;
  /** Tag to render. Default `div`. */
  as?: "div" | "article" | "section";
}

/** Subtle mouse-reactive 3D tilt wrapper — silent under prefers-reduced-motion. */
export const TiltCard = ({
  children,
  className = "",
  max = 6,
  as: Tag = "div",
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setTilt({ rx: -dy * max, ry: dx * max });
  };
  const onMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`transition-transform duration-300 will-change-transform ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </Tag>
  );
};
