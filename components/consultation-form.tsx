'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Copy, ArrowUpRight } from 'lucide-react';
import {
  parseEstimate,
  calculateEstimate,
  money,
  estimateText,
  propertyTypes,
} from '@/lib/estimate';
import { services } from '@/lib/projects';
type FormData = {
  name: string;
  email: string;
  phone: string;
  project: string;
  budget: string;
  date: string;
  description: string;
};
export function ConsultationForm() {
  const params = useSearchParams();
  const [estimate] = useState(() => parseEstimate(params));
  const [service] = useState(() => services.find((s) => s.slug === params.get('service')));
  const [data, setData] = useState<FormData>(() => ({
    name: '',
    email: '',
    phone: '',
    project: estimate?.property || '',
    budget: estimate ? String(calculateEstimate(estimate).total) : '',
    date: '',
    description: estimate
      ? `I would like to discuss a ${estimate.tier.toLowerCase()} renovation of my ${estimate.area} m² ${estimate.property.toLowerCase()}. ${estimate.extras.length ? 'Please include the services shown in the calculator reference below.' : ''}`
      : service
        ? `I would like to discuss ${service.title.toLowerCase()} for my space.`
        : '',
  }));
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [moved, setMoved] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (moved) heading.current?.focus();
  }, [step, moved]);
  const set = (key: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));
  const go = (n: number) => {
    setStep(n);
    setMoved(true);
    setCopied(false);
  };
  const preview = [
    `FORMA — Consultation preview (not sent)`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || 'Not provided'}`,
    `Project: ${data.project}`,
    `Budget: ${data.budget ? money(Number(data.budget)) : 'To be discussed'}`,
    `Preferred start: ${data.date || 'Flexible'}`,
    `Description: ${data.description}`,
    ...(estimate ? ['', 'Calculator reference:', estimateText(estimate)] : []),
    '',
    'Demo only. No data has been sent to a company or saved on a server.',
  ].join('\n');
  async function copy() {
    try {
      await navigator.clipboard.writeText(preview);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <div className="consultation-form">
      <div className="form-progress" aria-label="Consultation steps">
        {['Your details', 'Your project', 'Review preview'].map((label, i) => (
          <div
            key={label}
            aria-current={step === i || (step === 3 && i === 2) ? 'step' : undefined}
          >
            <span>{step > i ? <Check size={12} /> : String(i + 1).padStart(2, '0')}</span>
            {label}
          </div>
        ))}
      </div>
      <form
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          if (step === 1) {
            const description = form.current?.querySelector<HTMLTextAreaElement>('#description');
            description?.setCustomValidity(
              data.description.trim().length < 15
                ? 'Please describe your project in at least 15 non-blank characters.'
                : '',
            );
          }
          if (form.current?.reportValidity()) go(step + 1);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            data-ui-motion
            key={step}
            onAnimationComplete={() => {
              if (moved) heading.current?.focus({ preventScroll: true });
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <>
                <h2 ref={heading} tabIndex={-1}>
                  First, a little about you.
                </h2>
                <p className="form-subtitle">A name and a way to reach you, for your preview.</p>
                <div className="field">
                  <label htmlFor="full-name">
                    Full Name <span>Required</span>
                  </label>
                  <input
                    autoComplete="name"
                    id="full-name"
                    name="name"
                    required
                    minLength={2}
                    maxLength={100}
                    pattern=".*\S.*"
                    placeholder="Your full name"
                    value={data.name}
                    onChange={(e) => set('name', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">
                    Email <span>Required</span>
                  </label>
                  <input
                    autoComplete="email"
                    id="email"
                    name="email"
                    required
                    type="email"
                    maxLength={200}
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={(e) => set('email', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">
                    Phone Number <span>Optional</span>
                  </label>
                  <input
                    autoComplete="tel"
                    id="phone"
                    name="phone"
                    type="tel"
                    pattern="[+0-9() .\-]{6,25}"
                    placeholder="Include your country code"
                    value={data.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    aria-describedby="phone-help"
                  />
                  <span id="phone-help" className="field-note">
                    6–25 characters: numbers, spaces, +, ( ), . or -
                  </span>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <h2 ref={heading} tabIndex={-1}>
                  What are you imagining?
                </h2>
                <p className="form-subtitle">Tell us a little about the space and your plans.</p>
                {estimate && (
                  <div className="prefill-note">
                    <Check size={16} />
                    Your calculator choices have been added to this preview.
                  </div>
                )}
                <div className="field">
                  <label htmlFor="project-type">
                    Project Type <span>Required</span>
                  </label>
                  <select
                    id="project-type"
                    required
                    value={data.project}
                    onChange={(e) => set('project', e.target.value)}
                  >
                    <option value="">Select your space</option>
                    {propertyTypes.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="budget">
                      Estimated Budget (€) <span>Optional</span>
                    </label>
                    <input
                      id="budget"
                      type="number"
                      min="0"
                      max="10000000"
                      step="1"
                      placeholder="e.g. 50000"
                      value={data.budget}
                      onChange={(e) => set('budget', e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="start-date">
                      Preferred Start Date <span>Optional</span>
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      value={data.date}
                      onChange={(e) => set('date', e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="description">
                    Project Description <span>Required</span>
                  </label>
                  <textarea
                    id="description"
                    required
                    minLength={15}
                    maxLength={3000}
                    rows={4}
                    placeholder="Your space, your ideas, and what matters to you…"
                    value={data.description}
                    onChange={(e) => {
                      e.target.setCustomValidity('');
                      set('description', e.target.value);
                    }}
                  />
                  <span className="field-note">At least 15 characters.</span>
                </div>
              </>
            )}
            {step >= 2 && (
              <>
                <span className="preview-status">
                  <Check size={15} />
                  {step === 3 ? 'Demo completed — nothing was sent' : 'Ready to review'}
                </span>
                <h2 ref={heading} tabIndex={-1}>
                  {step === 3 ? 'Your ideas, all together.' : 'A preview of your project.'}
                </h2>
                <p className="form-subtitle">
                  {step === 3
                    ? 'Your demonstration is complete. Copy your project details to keep them.'
                    : 'Review the details below. You can go back and change anything.'}
                </p>
                <dl className="consultation-preview">
                  {[
                    ['Full name', data.name],
                    ['Email', data.email],
                    ['Phone', data.phone || 'Not provided'],
                    ['Project type', data.project],
                    [
                      'Estimated budget',
                      data.budget ? money(Number(data.budget)) : 'To be discussed',
                    ],
                    ['Preferred start', data.date || 'Flexible'],
                    ['Your project', data.description],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                {estimate && (
                  <div className="calculator-reference">
                    <span className="section-label">Calculator reference</span>
                    <p>
                      {estimate.area} m² · {estimate.property} · {estimate.tier}
                    </p>
                    {calculateEstimate(estimate).lines.map((l) => (
                      <div key={l.label}>
                        <span>{l.label}</span>
                        <span>{money(l.amount)}</span>
                      </div>
                    ))}
                    <strong>
                      {money(calculateEstimate(estimate).total)} · Demonstration rates
                    </strong>
                  </div>
                )}
                <div className="privacy-note">
                  <strong>This is a demonstration preview.</strong>
                  <p>
                    Your information is not sent to FORMA and is not saved on a server. It is held
                    only in this page’s memory and clears when you reload or leave. Copying puts it
                    on your device’s clipboard.
                  </p>
                </div>
                {step === 3 && (
                  <button type="button" className="button-solid" onClick={copy}>
                    <Copy size={16} />
                    {copied ? 'Copied to clipboard' : 'Copy Project Details'}
                  </button>
                )}
                <span role="status" className="field-note">
                  {copied
                    ? 'Project details copied.'
                    : copyError
                      ? 'Clipboard access is unavailable. Select and copy the preview text above.'
                      : ''}
                </span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="wizard-controls">
          {step > 0 ? (
            <button type="button" className="wizard-back" onClick={() => go(Math.min(step - 1, 1))}>
              <ArrowLeft size={16} />
              {step === 3 ? 'Edit details' : 'Back'}
            </button>
          ) : (
            <span className="field-note">No data is submitted.</span>
          )}
          {step < 3 && (
            <button type="submit" className="button-solid">
              {step === 0 ? 'Your Project' : step === 1 ? 'Review Preview' : 'Complete Demo'}
              {step === 2 ? <Check size={16} /> : <ArrowRight size={16} />}
            </button>
          )}
          {step === 3 && (
            <Link className="text-link" href="/projects">
              Explore the concepts
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
