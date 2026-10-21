import type { Metadata } from 'next';
import { PageHeading, CTA } from '@/components/ui';
import { ProjectFilter } from '@/components/project-filter';
export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore six conceptual spaces, from Mediterranean apartments to considered kitchens and creative workplaces.',
};
export default function Projects() {
  return (
    <>
      <PageHeading
        eyebrow="The portfolio / 06 concept studies"
        title="Different spaces.\nOne thoughtful approach."
        description="A collection of imagined places, each with its own character. Connected by a belief in thoughtful, enduring design."
      />
      <ProjectFilter />
      <CTA title="A space that feels\nlike you." />
    </>
  );
}
