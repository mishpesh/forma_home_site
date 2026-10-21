import type { Metadata } from 'next';
import { PageHeading } from '@/components/ui';
import { Estimator } from '@/components/estimator';
export const metadata: Metadata = {
  title: 'Get an Estimate',
  description:
    'Explore a transparent demonstration renovation estimate. Choose your area, finish and additional services to see an itemised cost.',
};
export default function EstimatePage() {
  return (
    <>
      <div className="estimate-intro">
        <PageHeading
          eyebrow="Your project starts here"
          title="Let’s imagine\nwhat’s possible."
          description="A few simple choices. A transparent starting point for your renovation. No personal details needed."
        />
      </div>
      <Estimator />
      <section className="estimate-bottom page-pad">
        <p>A number is just the beginning.</p>
        <p>
          Every home is different. This calculator uses illustrative rates to demonstrate the
          process. A real project would begin with a conversation and a detailed, tailored scope.
        </p>
      </section>
    </>
  );
}
