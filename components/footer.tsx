import Link from 'next/link';
export function Footer() {
  return (
    <footer className="site-footer page-pad">
      <div className="footer-top">
        <div>
          <Link href="/" className="logo">
            FORMA®
          </Link>
          <p>
            Thoughtful interiors.
            <br />
            Built around you.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/projects">Projects</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/estimate">Get an Estimate ↗</Link>
        </nav>
        <div className="footer-location">
          Rooted in the Mediterranean.
          <br />
          Imagined in Barcelona, Spain.
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} FORMA</span>
        <Link href="/credits">Image credits & demo information ↗</Link>
      </div>
    </footer>
  );
}
