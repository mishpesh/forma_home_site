'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

/** A photographic pause: existing licensed references, with restrained scroll movement. */
export function InteriorAtmosphere() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 28, mass: 0.35 });
  const y = useTransform(progress, [0, 1], [18, -18]);

  return (
    <section ref={ref} className="interior-atmosphere" aria-label="Interior inspiration">
      <figure>
        <div className="atmosphere-frame">
          <motion.div className="atmosphere-image" data-atmosphere-image style={{ y }}>
            <Image
              src="/images/villa.jpg"
              alt="Contemporary living space with timber walls, stone finishes and full-height garden glazing — interior reference"
              fill
              sizes="(max-width: 700px) 100vw, 67vw"
            />
          </motion.div>
        </div>
        <figcaption>
          <span>Light, space & natural materials.</span>
          <span>Reference photography</span>
        </figcaption>
      </figure>
      <figure>
        <div className="atmosphere-frame atmosphere-bathroom">
          <Image
            src="/images/bathroom.jpg"
            alt="Sunlit bathroom with a freestanding bath, pale stone and sculptural white basins — interior reference"
            fill
            sizes="(max-width: 700px) 100vw, 33vw"
          />
        </div>
        <figcaption>
          <span>Room for everyday rituals.</span>
          <span>Reference photography</span>
        </figcaption>
      </figure>
    </section>
  );
}
