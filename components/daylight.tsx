'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

/** A window's soft light and shadow shift with the reader's scroll. */
export function Daylight({ variant = 'window' }: { variant?: 'window' | 'wash' }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.4 });
  const x = useTransform(progress, [0, 1], [-26, 26]);
  const y = useTransform(progress, [0, 1], [18, -18]);
  const rotate = useTransform(progress, [0, 1], [-3, 1]);
  const opacity = useTransform(progress, [0, 0.25, 0.75, 1], [0.3, 0.9, 0.8, 0.3]);

  return (
    <div ref={ref} className={`daylight daylight-${variant}`} aria-hidden="true">
      <motion.div data-daylight className="daylight-pattern" style={{ x, y, rotate, opacity }}>
        {variant === 'window' && (
          <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" focusable="false">
            <g transform="translate(90 -50) skewX(-22) rotate(-13 600 400)">
              <rect x="245" y="65" width="710" height="670" fill="none" strokeWidth="32" />
              <path d="M600 65V735M245 395H955" fill="none" strokeWidth="24" />
            </g>
          </svg>
        )}
      </motion.div>
    </div>
  );
}
