import type { Metadata } from 'next';
import { services } from '@/lib/projects';
import { PageHeading, Photo, SectionLabel, TextLink, CTA } from '@/components/ui';
import { Reveal } from '@/components/motion';
export const metadata: Metadata = {
  title: 'Services',
  description:
    'A considered approach to interior design, full apartment renovation, kitchen and bathroom remodeling, space planning and project management.',
};
export default function Services() {
  return (
    <>
      <PageHeading
        eyebrow="Our services"
        title="The whole picture.\nEvery little detail."
        description="Whether you’re rethinking one room or starting a new chapter, our concept services connect the big idea with the smallest detail."
      />
      <div className="services-list page-pad">
        {services.map((s, i) => (
          <section className="service-detail" id={s.slug} key={s.slug}>
            <Reveal className="service-photo">
              <Photo name={s.image} alt={`Interior reference for ${s.title.toLowerCase()}`} />
            </Reveal>
            <Reveal className="service-copy">
              <SectionLabel>
                0{i + 1} / {s.title}
              </SectionLabel>
              <h2>{s.title}</h2>
              <p>{s.description}</p>
              <ul>
                {s.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <TextLink href={`/contact?service=${s.slug}`}>Let’s talk about your space</TextLink>
            </Reveal>
          </section>
        ))}
      </div>
      <CTA />
    </>
  );
}
