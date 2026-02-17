import { motion } from 'framer-motion';

export const MorphingBlobs = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
          </filter>
        </defs>

        <g filter="url(#goo)">
          <motion.circle
            cx="20%"
            cy="30%"
            r="15%"
            fill="hsl(25 100% 50% / 0.15)"
            animate={{
              cx: ['20%', '25%', '20%'],
              cy: ['30%', '35%', '30%'],
              r: ['15%', '18%', '15%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.circle
            cx="80%"
            cy="60%"
            r="20%"
            fill="hsl(35 100% 55% / 0.12)"
            animate={{
              cx: ['80%', '75%', '80%'],
              cy: ['60%', '55%', '60%'],
              r: ['20%', '23%', '20%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.circle
            cx="50%"
            cy="80%"
            r="18%"
            fill="hsl(45 100% 60% / 0.1)"
            animate={{
              cx: ['50%', '55%', '50%'],
              cy: ['80%', '75%', '80%'],
              r: ['18%', '21%', '18%'],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </g>
      </svg>
    </div>
  );
};
