import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Photo } from './ui';
import type { Project } from '@/lib/projects';
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}`}>
        <div className="project-image">
          <Photo name={project.image} alt={project.alt} sizes="(max-width: 700px) 100vw, 55vw" />
          <span className="project-open">
            <ArrowUpRight size={24} strokeWidth={1} />
          </span>
          <span className="project-index">0{index + 1} / Concept study</span>
        </div>
        <div className="project-caption">
          <h3>{project.title}</h3>
          <ArrowUpRight size={20} />
          <span>{project.location}</span>
          <span>
            {project.area} m² · {project.category}
          </span>
        </div>
      </Link>
    </article>
  );
}
