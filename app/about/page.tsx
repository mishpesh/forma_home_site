import type { Metadata } from 'next';
import { PageHeading, Photo, SectionLabel, CTA, TextLink } from '@/components/ui';
import { Reveal } from '@/components/motion';
export const metadata: Metadata = {
  title: 'The Studio',
  description:
    'Meet the philosophy behind FORMA, a fictional Barcelona interior studio exploring honest materials, considered spaces and a personal approach.',
};
export default function About() {
  return (
    <>
      <PageHeading
        eyebrow="The studio / Barcelona"
        title="Good spaces.\nBetter everyday living."
        description="We believe the best interiors don’t just look beautiful. They feel like they belong to the people who live in them."
      />
      <Photo
        name="studio"
        alt="A light-filled creative studio with shared work tables and natural materials — atmosphere reference"
        priority
        className="about-hero"
        sizes="100vw"
      />
      <section className="intro section-space page-pad">
        <SectionLabel number="01">Our point of view</SectionLabel>
        <Reveal className="intro-content">
          <h2>
            Less noise.
            <br />
            More meaning.
          </h2>
          <p className="intro-large">
            A home is more than a collection of beautiful things. It’s the way light falls in the
            morning. The space around a table. The feeling of arriving.
          </p>
          <div className="intro-bottom">
            <p>
              FORMA is a fictional studio imagined in Barcelona, shaped by the Mediterranean’s sense
              of simplicity and warmth. This portfolio explores a design philosophy: listen first,
              work with what matters, and create spaces that grow more personal over time.
            </p>
            <TextLink href="/projects">Explore the concepts</TextLink>
          </div>
        </Reveal>
      </section>
      <section className="values rust page-pad section-space">
        <SectionLabel number="02">What matters to us</SectionLabel>
        <div className="values-grid">
          {[
            {
              title: 'People before spaces.',
              text: 'We start with the life a space needs to hold. Personal routines and everyday needs guide every design decision.',
            },
            {
              title: 'Honest materials.',
              text: 'Wood that feels like wood. Stone with its own character. Materials selected for their purpose, texture and ability to age well.',
            },
            {
              title: 'Thoughtful by design.',
              text: 'We question what is needed, look for lasting solutions and make every square metre work a little harder.',
            },
          ].map((v) => (
            <Reveal key={v.title}>
              <h2>{v.title}</h2>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="about-process page-pad section-space">
        <Reveal>
          <SectionLabel number="03">Working together</SectionLabel>
          <h2>
            From the first conversation
            <br />
            to feeling at home.
          </h2>
        </Reveal>
        <div className="about-process-grid">
          <Photo
            name="dining"
            alt="Contemporary living space with warm wood and sculptural furniture"
          />
          <div>
            {[
              {
                title: 'A conversation',
                text: 'Share your ideas, needs, budget and hopes for the space.',
              },
              {
                title: 'A shared direction',
                text: 'Explore layouts, references and materials, then refine the brief together.',
              },
              {
                title: 'A considered plan',
                text: 'Turn the concept into a practical scope, drawings and clear decisions.',
              },
              {
                title: 'Bringing it together',
                text: 'Coordinate the details, review the work and prepare a thoughtful handover.',
              },
            ].map((s, i) => (
              <div className="about-step" key={s.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="demo-note">
          FORMA is a portfolio concept, not an operating company. The studio and interiors shown
          here are reference photographs, not our premises or completed commissions.
        </p>
      </section>
      <CTA />
    </>
  );
}
