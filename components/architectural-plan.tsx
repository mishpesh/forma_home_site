'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

const strokes = [
  'M70 100H530V540H70V100Z',
  'M82 112H518V528H82V112Z',
  'M82 315H260M340 315H518M340 112V230M340 300V315',
  'M260 315V395M260 475V528',
  'M260 315V395A80 80 0 0 1 180 315',
  'M340 230H410A70 70 0 0 1 340 300',
  'M260 475H180A80 80 0 0 1 260 395',
  'M145 106H265M145 100V112M265 100V112M524 365V475M518 365H530M518 475H530',
  'M105 145H215V260H105Z M114 154H206V183H114Z',
  'M375 142H485V195H375Z M375 215H410V265H375Z',
  'M310 365H470V405H310Z M380 435H425V480H380Z',
  'M70 65H530M70 53V77M530 53V77M565 100V540M553 100H577M553 540H577',
];

/** Decorative sketch, drawn once when it enters view; never captures input. */
export function ArchitecturalPlan() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();
  const drawn = reduced || visible;

  return (
    <div ref={ref} className="architectural-plan" aria-hidden="true">
      <svg viewBox="0 0 600 600" fill="none" focusable="false">
        {strokes.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            initial={false}
            animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }}
            transition={
              reduced ? { duration: 0 } : { duration: 1.6, delay: i * 0.1, ease: 'easeInOut' }
            }
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
