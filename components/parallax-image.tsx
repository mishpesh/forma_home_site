'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ParallaxImage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  return (
    <div ref={ref} className="hero-parallax-frame">
      <motion.div className="hero-parallax-layer" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
