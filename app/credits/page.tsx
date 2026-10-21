import type { Metadata } from 'next';
import { TextLink } from '@/components/ui';
export const metadata: Metadata = { title: 'Credits & Demo Information' };
const photos = [
  ['Hero & Light on the Wall', 'photo-1600210492486-724fe5c67fb0'],
  ['Casa Calma', 'photo-1600607687920-4e2a09cf159d'],
  ['Kitchen reference', 'photo-1556912172-45b7abe8b7e1'],
  ['Mediterranean interior', 'photo-1600607687939-ce8a6c25118c'],
  ['Bathroom reference', 'photo-1620626011761-996317b8d101'],
  ['Dining reference', 'photo-1616486338812-3dadae4b4ace'],
  ['Studio reference', 'photo-1497366754035-f200968a6e72'],
  ['Bedroom reference', 'photo-1616486029423-aaa4789e8c9a'],
  ['Interior detail', 'photo-1600210491892-03d54c0aaf87'],
  ['House reference', 'photo-1600047509807-ba8f99d2cdde'],
  ['Workspace reference', 'photo-1497366811353-6870744d04b2'],
];
export default function Credits() {
  return (
    <article className="credits page-pad">
      <span className="section-label">A note on this website</span>
      <h1>Imagined with care.</h1>
      <p>
        FORMA is a fictional interior design and renovation studio. This website demonstrates
        frontend design and development. It does not represent an operating company, and it contains
        no real client commissions, awards, testimonials or company contact details.
      </p>
      <h2>Photography</h2>
      <p>
        Reference photographs are sourced from{' '}
        <a href="https://unsplash.com" target="_blank" rel="noreferrer">
          Unsplash
        </a>{' '}
        and used under the{' '}
        <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">
          Unsplash License
        </a>
        . Project names, locations, areas and descriptions are fictional. Gallery images are
        independent visual references and may depict different properties. No authorship of these
        interiors or photographs is claimed.
      </p>
      <ul>
        {photos.map(([label, id]) => (
          <li key={id}>
            <span>{label}</span>
            <a
              href={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`}
              target="_blank"
              rel="noreferrer"
            >
              Original reference ↗
            </a>
          </li>
        ))}
      </ul>
      <h2>Before / After</h2>
      <p>
        The living-room comparison was supplied by the project owner as a renovation reference. The
        two images are supplied as separate equal-size frames, preserved without retouching,
        resizing or cropping and delivered in lossless WebP. Photographer and original publication
        details were not supplied, so no open license or authorship is claimed here. This is an
        independent reference, not a FORMA commission; no endorsement is implied.
      </p>
      <h2>Estimates & consultation previews</h2>
      <p>
        All prices are illustrative. The estimate uses only the published per-square-metre rates and
        selected additional services. It adds no taxes, fees, property-type multipliers or other
        markups. It is not a commercial quote.
      </p>
      <p>
        The consultation form does not transmit your details to a company and does not store them on
        a server. Details remain in browser memory while the page is open. The copy function writes
        to your device’s clipboard. Downloaded estimates are plain text files created in your
        browser.
      </p>
      <h2>Type & direction</h2>
      <p>
        Space Grotesk and Inter, locally hosted open-source typefaces. Art direction follows a warm
        bone and terracotta architectural editorial, with natural light and honest materials at its
        heart.
      </p>
      <div className="mt-10">
        <TextLink href="/">Back to FORMA</TextLink>
      </div>
    </article>
  );
}
