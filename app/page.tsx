import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion';
import { ActionLink, TextLink, SectionLabel, CTA } from '@/components/ui';
import { ProjectCard } from '@/components/project-card';
import { Comparison } from '@/components/comparison';
import { ServicesPreview } from '@/components/services-preview';
import { ParallaxImage } from '@/components/parallax-image';
import { InteriorAtmosphere } from '@/components/interior-atmosphere';
import { projects } from '@/lib/projects';
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-topline page-pad">
          <span>Interior design & renovation</span>
          <span>
            Barcelona, Spain <span className="tiny-star">✳</span>
          </span>
        </div>
        <div className="hero-visual">
          <ParallaxImage>
            <Image
              src="/images/hero.jpg"
              alt="Sunlit contemporary living room with warm timber, linen seating and sculptural details"
              fill
              preload
              sizes="100vw"
            />
          </ParallaxImage>
          <div className="hero-shade" />
          <div className="hero-copy">
            <Reveal>
              <p className="hero-eyebrow">A sense of place. A way of life.</p>
              <h1>
                Spaces designed
                <br />
                for living<span className="title-dot">.</span>
              </h1>
              <p className="hero-description">
                Thoughtful interiors. Timeless design.
                <br className="mobile-only" /> Exceptional craftsmanship.
              </p>
              <div className="hero-actions">
                <ActionLink href="/projects" light>
                  Explore Our Projects
                </ActionLink>
                <Link className="hero-secondary" href="/contact">
                  Start Your Project <ArrowUpRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="hero-image-caption">
            <span>Light on the Wall — A residential concept</span>
            <span>01 / 06</span>
          </div>
        </div>
        <div className="hero-foot page-pad">
          <span>Considered spaces. Meaningful transformations.</span>
          <a href="#studio">
            Discover FORMA <ArrowDown size={15} />
          </a>
        </div>
      </section>
      <section id="studio" className="intro section-space page-pad">
        <Reveal className="intro-label">
          <SectionLabel number="01">The studio</SectionLabel>
        </Reveal>
        <Reveal className="intro-photo" delay={0.1}>
          <figure>
            <div className="intro-photo-frame">
              <Image
                src="/images/detail.jpg"
                alt="Interior reference with exposed timber beams, a pale brick fireplace and softly textured seating"
                fill
                sizes="(max-width: 700px) 90vw, (max-width: 1000px) 38vw, 29vw"
              />
            </div>
            <figcaption>Material. Light. A sense of home.</figcaption>
          </figure>
        </Reveal>
        <div className="intro-content">
          <Reveal>
            <h2>
              Good design begins
              <br />
              with how you live.
            </h2>
            <p className="intro-large">
              We bring a thoughtful eye and a practical mind to the spaces you call your own.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="intro-bottom">
              <p>
                FORMA is a concept design and renovation studio, imagined in Barcelona. Inspired by
                Mediterranean light, honest materials and everyday rituals, we explore homes that
                feel as good as they look.
              </p>
              <TextLink href="/about">A little about us</TextLink>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="featured section-space page-pad">
        <Reveal>
          <div className="section-heading">
            <div>
              <SectionLabel number="02">Selected spaces</SectionLabel>
              <h2>Made for living.</h2>
            </div>
            <TextLink href="/projects">
              View All Projects <span className="count">(06)</span>
            </TextLink>
          </div>
        </Reveal>
        <div className="featured-grid">
          <Reveal>
            <ProjectCard project={projects[0]} />
          </Reveal>
          <Reveal className="featured-offset" delay={0.1}>
            <ProjectCard project={projects[2]} index={2} />
          </Reveal>
        </div>
        <p className="demo-note">
          Imagined spaces, real inspiration. All projects are concept studies, illustrated with
          reference photography.
        </p>
      </section>
      <section className="services-preview rust page-pad section-space">
        <Reveal>
          <div className="section-heading">
            <div>
              <SectionLabel number="03">Our services</SectionLabel>
              <h2>
                From a first thought
                <br />
                to the final detail.
              </h2>
            </div>
            <p>
              One considered vision.
              <br />
              Every part of your space.
            </p>
          </div>
        </Reveal>
        <ServicesPreview />
      </section>
      <InteriorAtmosphere />
      <section className="approach section-space page-pad">
        <Reveal>
          <SectionLabel number="04">Our approach</SectionLabel>
          <div className="approach-heading">
            <h2>
              A clear process.
              <br />A personal journey.
            </h2>
            <p>
              Great spaces don’t happen by chance. They come from listening closely, asking the
              right questions and caring about the details.
            </p>
          </div>
        </Reveal>
        <div className="process-grid">
          {[
            {
              n: '01',
              title: 'Listen & discover',
              text: 'Your routines, your aspirations, your sense of home. We start with you.',
            },
            {
              n: '02',
              title: 'Imagine & refine',
              text: 'Ideas become layouts, materials and a shared vision for your space.',
            },
            {
              n: '03',
              title: 'Make it happen',
              text: 'Thoughtful coordination brings every element of the design together.',
            },
            {
              n: '04',
              title: 'Settle into living',
              text: 'The final details, a considered handover, and room for your next chapter.',
            },
          ].map((item) => (
            <Reveal key={item.n}>
              <div className="process-item">
                <span>{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="transformation section-space page-pad">
        <Reveal>
          <div className="section-heading">
            <div>
              <SectionLabel number="05">The possibilities</SectionLabel>
              <h2>A new perspective.</h2>
            </div>
            <p>
              See what thoughtful design can change.
              <br />
              Move the line to explore.
            </p>
          </div>
          <Comparison />
        </Reveal>
      </section>
      <section className="estimate-preview section-space page-pad">
        <div>
          <Reveal>
            <SectionLabel number="06">Let’s put a number to it</SectionLabel>
            <h2>
              A clearer picture.
              <br />
              From the very start.
            </h2>
            <p>
              Explore the possibilities for your space with our interactive renovation estimator. A
              few simple choices. A transparent breakdown.
            </p>
            <ActionLink href="/estimate">Get an Estimate</ActionLink>
            <span className="estimate-disclaimer">
              Demonstration rates · No personal details needed
            </span>
          </Reveal>
        </div>
        <Reveal>
          <Link href="/estimate" className="estimate-teaser">
            <div className="teaser-heading">
              <span>Your space, reimagined.</span>
              <ArrowUpRight size={20} />
            </div>
            <div className="teaser-size">
              <span>75</span> m²
            </div>
            <div className="teaser-rule">
              <span />
            </div>
            <div className="teaser-line">
              <span>Standard renovation</span>
              <span>€600 / m²</span>
            </div>
            <div className="teaser-total">
              <span>A starting point</span>
              <strong>€45,000</strong>
            </div>
            <span className="teaser-note">Your ideas. Your parameters. Your estimate.</span>
          </Link>
        </Reveal>
      </section>
      <CTA />
    </>
  );
}
