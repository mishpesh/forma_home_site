import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageHeading, SectionLabel } from '@/components/ui';
import { ConsultationForm } from '@/components/consultation-form';
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Imagine your next project with FORMA. Build a consultation preview, explore frequently asked questions and learn about this Barcelona studio concept.',
};
const faqs = [
  [
    'Where is FORMA based?',
    'FORMA is a fictional studio imagined in Barcelona, Spain. This website is a portfolio demonstration. There is no real office, phone number or company contact associated with it.',
  ],
  [
    'Are these real completed projects?',
    'No. Every project is a fictional design study. Portfolio photographs are reference images used to communicate an atmosphere and material palette. The Before / After is a living-room reference supplied by the project owner. It is not a FORMA project.',
  ],
  [
    'How accurate is the renovation estimate?',
    'The calculator uses demonstration rates of €350, €600 or €950 per m², plus the selected extras. It applies no additional multipliers, fees or markups. It is not a commercial quote. A real renovation would require a professional assessment and a detailed scope.',
  ],
  [
    'Can I send a consultation request here?',
    'This frontend demo creates a preview you can copy. It does not send email, contact a company, or save your personal details on a server. Please do not enter sensitive information.',
  ],
  [
    'Can I change my choices after using the calculator?',
    'Yes. Use Back to revisit calculator steps without losing your choices. When you continue to this page, the project type, budget and project description are prefilled from your estimate. You can edit them before reviewing the preview.',
  ],
];
export default function Contact() {
  return (
    <>
      <PageHeading
        eyebrow="Let’s start a conversation"
        title="Every good space\nstarts with an idea."
        description="Tell us what you’re imagining. Use the demo below to bring your project thoughts together."
      />
      <section className="contact-grid page-pad">
        <aside className="contact-aside">
          <SectionLabel>Your next chapter</SectionLabel>
          <h2>
            Make room
            <br />
            for possibility.
          </h2>
          <p>
            A new home. A fresh perspective.
            <br />A space that finally feels like you.
          </p>
          <div className="contact-location">
            <span className="location-dot" />
            Barcelona, Spain
            <ArrowUpRight size={17} />
          </div>
          <p className="demo-note">
            Demonstration location only.
            <br />
            FORMA is a fictional studio.
            <br />
            This form creates a local preview.
          </p>
        </aside>
        <Suspense fallback={<div className="loading-panel">Preparing your project preview…</div>}>
          <ConsultationForm />
        </Suspense>
      </section>
      <section className="faq page-pad section-space">
        <div>
          <SectionLabel>A few things to know</SectionLabel>
          <h2>
            Good questions.
            <br />
            Clear answers.
          </h2>
        </div>
        <div>
          {faqs.map(([question, answer], i) => (
            <details key={question}>
              <summary>
                <span>0{i + 1}</span>
                {question}
                <span className="faq-plus">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
