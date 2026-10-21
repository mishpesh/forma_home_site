'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
const links = [
  ['Home', '/'],
  ['Projects', '/projects'],
  ['Services', '/services'],
  ['About', '/about'],
  ['Contact', '/contact'],
];
export function Header() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuPanel.current?.querySelector<HTMLElement>('a')?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === 'Tab') {
        const nodes = [
          menuButton.current,
          ...Array.from(menuPanel.current?.querySelectorAll<HTMLElement>('a') ?? []),
        ].filter(Boolean) as HTMLElement[];
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener('keydown', key);
    };
  }, [open]);
  const close = () => setOpen(false);
  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="logo" aria-label="FORMA home" onClick={close}>
        FORMA<span className="logo-dot">®</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>
            {label}
          </Link>
        ))}
      </nav>
      <Link className="header-estimate" href="/estimate">
        Get an Estimate
        <ArrowUpRight size={16} />
      </Link>
      <button
        ref={menuButton}
        className="menu-button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <motion.div
        className="reading-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuPanel}
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <nav aria-label="Mobile navigation">
              {links.map(([label, href], i) => (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  <span>0{i + 1}</span>
                  {label}
                  <ArrowUpRight />
                </Link>
              ))}
              <Link href="/estimate" onClick={close}>
                Get an Estimate
                <ArrowUpRight />
              </Link>
            </nav>
            <p>
              Interior design & renovation
              <br />
              Barcelona, Spain
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
