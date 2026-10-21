import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/projects';
import { Photo, SectionLabel, CTA } from '@/components/ui';
import { Reveal } from '@/components/motion';
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return { title: p?.title || 'Project not found', description: p?.subtitle };
}
export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index],
    next = projects[(index + 1) % projects.length];
  return (
    <>
      <header className="project-detail-header page-pad">
        <Link href="/projects" className="back-link">
          <ArrowLeft size={16} />
          All projects
        </Link>
        <div>
          <SectionLabel>Residential & commercial / Concept study</SectionLabel>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
        </div>
      </header>
      <Photo
        name={project.image}
        alt={project.alt}
        priority
        className="project-hero"
        sizes="100vw"
      />
      <section className="project-story page-pad section-space">
        <dl className="project-facts">
          <div>
            <dt>Location</dt>
            <dd>{project.location}</dd>
          </div>
          <div>
            <dt>Area</dt>
            <dd>{project.area} m²</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>{project.scope}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Fictional design study</dd>
          </div>
        </dl>
        <Reveal>
          <SectionLabel>The concept</SectionLabel>
          <h2>{project.subtitle}</h2>
          <p>{project.description}</p>
          <p className="demo-note">
            This is a fictional project. Gallery images are independent reference photographs
            exploring the material palette and atmosphere; they do not document one built property.
          </p>
        </Reveal>
      </section>
      <section className="project-gallery page-pad" aria-label="Concept reference gallery">
        {project.gallery.map((name, i) => (
          <Reveal key={`${name}-${i}`}>
            <Photo
              name={name}
              alt={`${project.title} — ${['material and atmosphere', 'spatial inspiration', 'interior detail'][i]} reference`}
            />
            <p className="image-caption">
              0{i + 1} / {['Material & atmosphere', 'Spatial inspiration', 'The details'][i]} ·
              Reference photograph
            </p>
          </Reveal>
        ))}
      </section>
      <Link href={`/projects/${next.slug}`} className="next-project page-pad section-space">
        <SectionLabel>Next concept</SectionLabel>
        <h2>
          {next.title}
          <ArrowUpRight strokeWidth={1} />
        </h2>
      </Link>
      <CTA title="Something similar.\nEntirely yours." />
    </>
  );
}
