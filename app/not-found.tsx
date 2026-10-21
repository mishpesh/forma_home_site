import { ActionLink, SectionLabel } from '@/components/ui';
export default function NotFound() {
  return (
    <section className="error-page page-pad">
      <SectionLabel>404 / A little off plan</SectionLabel>
      <h1>Let’s find your space.</h1>
      <p>
        This page isn’t part of the plan. Explore the project collection or head back to the studio.
      </p>
      <ActionLink href="/projects">Explore Our Projects</ActionLink>
    </section>
  );
}
