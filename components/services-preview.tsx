'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/projects';
import { Photo, TextLink } from './ui';
import { Reveal } from './motion';

export function ServicesPreview() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return (
    <div className="services-preview-body">
      <Reveal className="services-preview-photo">
        <div className="service-image-stack">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              className="service-image-layer"
              initial={false}
              animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.035 }}
              transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={active !== i}
            >
              <Photo name={service.image} alt={`${service.title} — interior reference`} />
            </motion.div>
          ))}
        </div>
        <div className="service-photo-caption" aria-live="polite" aria-atomic="true">
          <span>0{active + 1} / 05</span>
          <span>{services[active].benefits[0]}</span>
        </div>
      </Reveal>
      <div className="service-links">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.03}>
            <Link
              href={`/services#${service.slug}`}
              onPointerEnter={(event) => {
                if (event.pointerType !== 'touch') setActive(i);
              }}
              onFocus={() => setActive(i)}
              className={active === i ? 'service-active' : ''}
            >
              <span className="service-num">0{i + 1}</span>
              <h3>{service.title}</h3>
              <ArrowUpRight size={23} strokeWidth={1} />
            </Link>
          </Reveal>
        ))}
        <TextLink href="/services">Explore Our Services</TextLink>
      </div>
    </div>
  );
}
