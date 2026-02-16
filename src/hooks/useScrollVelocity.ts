import { useEffect, useState } from 'react';
import { useScroll, useVelocity } from 'framer-motion';

export const useScrollVelocity = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    return scrollVelocity.on('change', (latest) => {
      setVelocity(latest);
    });
  }, [scrollVelocity]);

  return velocity;
};
