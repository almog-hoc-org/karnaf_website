import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export const InteractiveGradientOrbs = () => {
  const mouse = useMousePosition();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Orb 1 - Top Right */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(25 100% 50%) 0%, transparent 70%)',
        }}
        animate={{
          x: mouse.x * 0.02,
          y: mouse.y * 0.02,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />

      {/* Orb 2 - Center Left */}
      <motion.div
        className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(35 100% 55%) 0%, transparent 70%)',
        }}
        animate={{
          x: mouse.x * -0.015,
          y: mouse.y * 0.025,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />

      {/* Orb 3 - Bottom Center */}
      <motion.div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(45 100% 60%) 0%, transparent 70%)',
        }}
        animate={{
          x: mouse.x * 0.01,
          y: mouse.y * -0.02,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />
    </div>
  );
};
