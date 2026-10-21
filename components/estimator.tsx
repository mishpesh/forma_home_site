'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { navigateChoice } from './choice-navigation';
import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  Building2,
  House,
  Store,
  Plus,
  Minus,
} from 'lucide-react';
import {
  propertyTypes,
  packages,
  extras,
  defaultEstimate,
  calculateEstimate,
  estimateParams,
  estimateText,
  money,
  type Estimate,
} from '@/lib/estimate';
const steps = ['Property type', 'Property size', 'Renovation', 'The extras', 'Your estimate'];
function AnimatedTotal({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const spring = useSpring(value, { stiffness: 130, damping: 26 });
  const display = useTransform(spring, (v) => money(Math.round(v)));
  useEffect(() => {
    if (reduced) spring.jump(value);
    else spring.set(value);
  }, [value, spring, reduced]);
  return <motion.span>{display}</motion.span>;
}
export function Estimator() {
  const [estimate, setEstimate] = useState<Estimate>(defaultEstimate);
  const [step, setStep] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [areaInput, setAreaInput] = useState('75');
  const heading = useRef<HTMLHeadingElement>(null);
  const [moved, setMoved] = useState(false);
  const areaValid =
    areaInput.trim() !== '' &&
    Number.isInteger(Number(areaInput)) &&
    Number(areaInput) >= 25 &&
    Number(areaInput) <= 250;
  const result = calculateEstimate(estimate);
  const update = <K extends keyof Estimate>(key: K, value: Estimate[K]) =>
    setEstimate((prev) => ({ ...prev, [key]: value }));
  function go(next: number) {
    if (step === 1 && !areaValid && next > step) return;
    setStep(next);
    setFurthest((prev) => Math.max(prev, next));
    setMoved(true);
  }
  useEffect(() => {
    if (moved) heading.current?.focus();
  }, [step, moved]);
  function setArea(value: string) {
    setAreaInput(value);
    const n = Number(value);
    if (value.trim() && Number.isInteger(n) && n >= 25 && n <= 250) update('area', n);
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([estimateText(estimate)], { type: 'text/plain;charset=utf-8' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FORMA-concept-estimate.txt';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="estimator page-pad">
      <div className="wizard-progress" aria-label="Estimate steps">
        {steps.map((label, i) => (
          <button
            key={label}
            onClick={() => go(i)}
            disabled={i > furthest || (step === 1 && !areaValid && i > step)}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className="step-number">
              {i < step ? <Check size={14} /> : String(i + 1).padStart(2, '0')}
            </span>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className="estimator-grid">
        <div className="wizard-main">
          <div className="wizard-step-top">
            <span>Step 0{step + 1} of 05</span>
            <span>Your home. Your possibilities.</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              data-ui-motion
              key={step}
              onAnimationComplete={() => {
                if (moved) heading.current?.focus({ preventScroll: true });
              }}
              className="wizard-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {step === 0 && (
                <>
                  <h2 tabIndex={-1} ref={heading}>
                    What kind of space?
                  </h2>
                  <p>Every space has its own story. Where does yours begin?</p>
                  <div
                    className="property-options"
                    role="radiogroup"
                    aria-label="Property type"
                    onKeyDown={navigateChoice}
                  >
                    {propertyTypes.map((type, i) => {
                      const Icon = [Building2, House, Store][i];
                      return (
                        <button
                          role="radio"
                          tabIndex={estimate.property === type ? 0 : -1}
                          aria-checked={estimate.property === type}
                          key={type}
                          className={`property-option ${estimate.property === type ? 'selected' : ''}`}
                          onClick={() => update('property', type)}
                        >
                          <Icon strokeWidth={1} size={34} />
                          <span>{type}</span>
                          <span className="selection-indicator">
                            {estimate.property === type && <Check size={12} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="field-note">
                    Property type describes your project. It does not change the price.
                  </p>
                </>
              )}
              {step === 1 && (
                <>
                  <h2 tabIndex={-1} ref={heading}>
                    Room for possibility.
                  </h2>
                  <p>How much space are you planning to transform?</p>
                  <div className="area-control">
                    <label htmlFor="area-number">Property size</label>
                    <div className="area-input-wrap">
                      <input
                        id="area-number"
                        inputMode="numeric"
                        type="number"
                        min="25"
                        max="250"
                        step="1"
                        value={areaInput}
                        onChange={(e) => setArea(e.target.value)}
                        aria-invalid={!areaValid}
                        aria-describedby="area-help"
                      />
                      <span>m²</span>
                    </div>
                    <input
                      id="area-range"
                      aria-label="Property size in square metres"
                      type="range"
                      min="25"
                      max="250"
                      value={estimate.area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                    <div className="range-labels">
                      <span>25 m²</span>
                      <span>250 m²</span>
                    </div>
                    <p id="area-help" className={!areaValid ? 'field-error' : 'field-note'}>
                      {areaValid
                        ? 'Enter a whole number or move the slider.'
                        : 'Please enter a whole number between 25 and 250 m².'}
                    </p>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 tabIndex={-1} ref={heading}>
                    Choose your finish.
                  </h2>
                  <p>Three starting points. One clear rate per square metre.</p>
                  <div
                    className="package-options"
                    role="radiogroup"
                    aria-label="Renovation package"
                    onKeyDown={navigateChoice}
                  >
                    {packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        role="radio"
                        tabIndex={estimate.tier === pkg.id ? 0 : -1}
                        aria-checked={estimate.tier === pkg.id}
                        className={`package-option ${estimate.tier === pkg.id ? 'selected' : ''}`}
                        onClick={() => update('tier', pkg.id)}
                      >
                        <span className="package-name">
                          {pkg.id}
                          <span className="selection-indicator">
                            {estimate.tier === pkg.id && <Check size={12} />}
                          </span>
                        </span>
                        <span className="package-rate">
                          {money(pkg.rate)}
                          <small>/ m²</small>
                        </span>
                        <span className="package-description">{pkg.description}</span>
                        <span className="package-details">{pkg.details}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h2 tabIndex={-1} ref={heading}>
                    Make it your own.
                  </h2>
                  <p>Add the things that matter. You can also continue without extras.</p>
                  <div className="extras-options">
                    {extras.map((extra) => {
                      const selected = estimate.extras.includes(extra.id);
                      return (
                        <button
                          key={extra.id}
                          aria-pressed={selected}
                          className={`extra-option ${selected ? 'selected' : ''}`}
                          onClick={() =>
                            update(
                              'extras',
                              selected
                                ? estimate.extras.filter((e) => e !== extra.id)
                                : [...estimate.extras, extra.id],
                            )
                          }
                        >
                          <span className="extra-icon">
                            {selected ? <Minus size={19} /> : <Plus size={19} />}
                          </span>
                          <span>
                            <strong>{extra.label}</strong>
                            <small>{extra.description}</small>
                          </span>
                          <span>
                            +{money(extra.price)}
                            {extra.unit === 'm²' ? ' / m²' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <h2 tabIndex={-1} ref={heading}>
                    A clearer picture.
                  </h2>
                  <p>A starting point for your next chapter. Here’s how it adds up.</p>
                  <div
                    className="result-amount"
                    aria-label={`Estimated total ${money(result.total)}`}
                  >
                    <AnimatedTotal value={result.total} />
                    <span>Demonstration estimate</span>
                  </div>
                  <div className="result-facts">
                    <span>{estimate.property}</span>
                    <span>{estimate.area} m²</span>
                    <span>{estimate.tier} renovation</span>
                  </div>
                  <div className="result-lines">
                    {result.lines.map((line) => (
                      <div key={line.label}>
                        <span>{line.label}</span>
                        <span>{money(line.amount)}</span>
                      </div>
                    ))}
                    <div className="result-grand">
                      <strong>Total</strong>
                      <strong>{money(result.total)}</strong>
                    </div>
                  </div>
                  <div className="result-actions">
                    <button className="button-outline" onClick={download}>
                      <Download size={16} />
                      Download Estimate <small>(.txt)</small>
                    </button>
                    <Link href={`/contact?${estimateParams(estimate)}`} className="button-solid">
                      Request Consultation
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                  <p className="demo-note">
                    These are demonstration prices, not a commercial quotation. No taxes, fees,
                    property multipliers or other markups have been added. Actual scope and pricing
                    require a professional assessment.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="wizard-controls">
            <button className="wizard-back" onClick={() => go(step - 1)} disabled={step === 0}>
              <ArrowLeft size={17} />
              Back
            </button>
            {step < 4 ? (
              <button
                className="button-solid"
                onClick={() => go(step + 1)}
                disabled={step === 1 && !areaValid}
              >
                {step === 3 ? 'See My Estimate' : 'Next'}
                <ArrowRight size={17} />
              </button>
            ) : (
              <button className="text-link" onClick={() => go(0)}>
                Revisit your choices
                <ArrowLeft size={16} />
              </button>
            )}
          </div>
        </div>
        <aside className="estimate-summary">
          <span className="section-label">Your space, at a glance</span>
          <div className="summary-property">
            {estimate.property}
            <span>{estimate.area} m²</span>
          </div>
          <div className="summary-rows">
            <div>
              <span>{estimate.tier} renovation</span>
              <span>{money(result.rate)} / m²</span>
            </div>
            {extras
              .filter((e) => estimate.extras.includes(e.id))
              .map((e) => (
                <div key={e.id}>
                  <span>{e.label}</span>
                  <span>{money(e.unit === 'm²' ? estimate.area * e.price : e.price)}</span>
                </div>
              ))}
          </div>
          <div className="summary-total">
            <span>Estimated total</span>
            <strong aria-live="polite">
              {areaValid ? <AnimatedTotal value={result.total} /> : <span>—</span>}
            </strong>
          </div>
          <p>
            Transparent by design.
            <br />
            No hidden coefficients or markups.
          </p>
          <span className="demo-note">
            Demonstration rates only.
            <br />
            Not a commercial quotation.
          </span>
        </aside>
      </div>
    </div>
  );
}
