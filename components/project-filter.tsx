'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects, categories, type Category } from '@/lib/projects';
import { ProjectCard } from './project-card';
export function ProjectFilter() {
  const [active, setActive] = useState<Category>('All Projects');
  const filtered = projects.filter((p) => active === 'All Projects' || p.category === active);
  return (
    <section className="portfolio page-pad">
      <div className="project-filters" role="group" aria-label="Filter projects by category">
        {categories.map((c) => (
          <button key={c} aria-pressed={active === c} onClick={() => setActive(c)}>
            {c}
            {c === 'All Projects' && <sup>06</sup>}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {filtered.length} projects shown
      </p>
      <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              data-ui-motion
              layout
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectCard project={p} index={projects.indexOf(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <p className="demo-note">
        A collection of fictional design studies. Reference photography illustrates the concepts;
        these are not completed FORMA commissions.
      </p>
    </section>
  );
}
