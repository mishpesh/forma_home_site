'use client';
import Link from 'next/link';
export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="error-page page-pad">
      <span className="section-label">A pause in the plans</span>
      <h1>Let’s try that again.</h1>
      <p>Something interrupted this page. Try loading it again, or return to the home page.</p>
      <button onClick={reset} className="button-solid">
        Try again
      </button>
      <Link className="text-link" href="/">
        Return home ↗
      </Link>
    </section>
  );
}
