import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { normalizeLineBreaks } from '@/lib/text';
export function ActionLink({
  href,
  children,
  light = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`action-link ${light ? 'light' : ''} ${className}`}>
      <span>{children}</span>
      <ArrowUpRight size={17} strokeWidth={1.5} />
    </Link>
  );
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-link">
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Photo({
  name,
  alt,
  priority = false,
  className = '',
  sizes = '(max-width: 700px) 100vw, 50vw',
}: {
  name: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image src={`/images/${name}.jpg`} alt={alt} fill sizes={sizes} preload={priority} />
    </div>
  );
}
export function SectionLabel({ children, number }: { children: ReactNode; number?: string }) {
  return (
    <div className="section-label">
      {number && <span className="section-number">{number} /</span>}
      {children}
    </div>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="page-heading page-pad">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h1>{normalizeLineBreaks(title)}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
export function CTA({ title = 'Your next chapter\nstarts with a space.' }: { title?: string }) {
  return (
    <section className="cta rust page-pad">
      <SectionLabel>Let’s make room for something good.</SectionLabel>
      <div className="cta-row">
        <h2>
          {normalizeLineBreaks(title)
            .split('\n')
            .map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
        </h2>
        <Link href="/contact" className="circle-link" aria-label="Start your project">
          <ArrowUpRight strokeWidth={1} />
        </Link>
      </div>
      <div className="cta-bottom">
        <p>
          Tell us what you’re imagining.
          <br />
          We’ll help you see what’s possible.
        </p>
        <TextLink href="/contact">Start Your Project</TextLink>
      </div>
    </section>
  );
}
export function NextArrow() {
  return <ArrowRight size={18} />;
}
