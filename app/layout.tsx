import type { Metadata } from 'next';
import localFont from 'next/font/local';
const inter = localFont({
  src: '../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  display: 'swap',
  variable: '--font-inter',
});
const space = localFont({
  src: '../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',
  display: 'swap',
  variable: '--font-space',
});
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MotionProvider } from '@/components/motion';
import './globals.css';
import './atmosphere.css';
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'https://forma-interior-studio.wirybream10.chatgpt.site'),
  ),
  title: { default: 'FORMA — Spaces designed for living.', template: '%s — FORMA' },
  description:
    'A concept interior design and renovation studio in Barcelona. Explore thoughtful spaces, discover our approach and build your demonstration renovation estimate.',
  icons: { icon: '/icon.svg' },
  openGraph: {
    title: 'FORMA — Spaces designed for living.',
    description: 'Thoughtful interiors. Timeless design. Exceptional craftsmanship.',
    images: [
      {
        url: '/images/hero.jpg',
        width: 2000,
        height: 1333,
        alt: 'Contemporary interior with natural materials',
      },
    ],
    type: 'website',
  },
  robots: { index: false, follow: true },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-scroll-behavior="smooth" lang="en" className={`${inter.variable} ${space.variable}`}>
      <body>
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
