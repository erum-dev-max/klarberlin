import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

interface JewelryCard {
  id: number;
  name: string;
  type: string;
  material: string;
  price: string;
  description: string;
  image?: string;
}

// ── Couples Collection ────────────────────────────────────────────────────────
const COUPLES: JewelryCard[] = [
  { id: 1,  name: 'Eternal Bond Ring',       type: 'Rings',     material: '18K Gold',        price: '$299', description: 'A matching set symbolizing unbreakable connection. Engraved with a subtle infinity motif.' },
  { id: 2,  name: 'Twin Flame Necklace',      type: 'Necklaces', material: 'Sterling Silver', price: '$189', description: 'Two interlocking pendants — one for each half of the pair. Wear yours, gift theirs.' },
  { id: 3,  name: 'Golden Hour Bracelet',     type: 'Bracelets', material: '14K Gold Fill',   price: '$149', description: 'Delicate chain with a sun-and-moon charm set. Designed to be worn together or apart.' },
  { id: 4,  name: 'Celestial Stud Earrings',  type: 'Earrings',  material: 'White Gold',      price: '$219', description: 'Star and crescent studs crafted in white gold. Minimal, meaningful, timeless.' },
  { id: 5,  name: 'Soulmate Locket',          type: 'Necklaces', material: 'Rose Gold',       price: '$259', description: 'A locket that holds two photos — one on each side. Rose gold finish with a matte texture.' },
  { id: 6,  name: 'Infinity Cuff',            type: 'Bracelets', material: '925 Silver',      price: '$129', description: 'Open-ended cuff with an infinity symbol. Adjustable fit, unisex design.' },
  { id: 7,  name: 'Promise Band Set',         type: 'Rings',     material: '18K White Gold',  price: '$349', description: 'A pair of slim bands with a shared diamond accent. Stackable and elegant.' },
  { id: 8,  name: 'Dual Charm Anklet',        type: 'Anklets',   material: 'Gold Vermeil',    price: '$99',  description: 'Matching anklets with a tiny heart charm. Lightweight and perfect for everyday wear.' },
];

// ── Statement Pieces ──────────────────────────────────────────────────────────
const STATEMENT: JewelryCard[] = [
  { id: 9,  name: 'Obsidian Crown Ring',      type: 'Rings',     material: 'Black Rhodium',   price: '$389', description: 'A bold architectural band with a raw obsidian centerpiece. Designed to command attention.' },
  { id: 10, name: 'Sovereign Chain',           type: 'Necklaces', material: '18K Gold',        price: '$459', description: 'A heavy-link chain with a geometric pendant. Worn alone or layered — always a statement.' },
  { id: 11, name: 'Eclipse Cuff',              type: 'Bracelets', material: 'Oxidised Silver', price: '$229', description: 'Wide open cuff with a sun-eclipse motif. Unisex, bold, and built to be noticed.' },
  { id: 12, name: 'Noir Drop Earrings',        type: 'Earrings',  material: 'Black Gold',      price: '$319', description: 'Long asymmetric drops in matte black gold. Minimal lines, maximum presence.' },
  { id: 13, name: 'Architect Pendant',         type: 'Necklaces', material: 'Sterling Silver', price: '$279', description: 'A structural pendant inspired by brutalist architecture. Sharp angles, soft chain.' },
  { id: 14, name: 'Titan Signet Ring',         type: 'Rings',     material: '18K White Gold',  price: '$499', description: 'A wide signet ring with a custom-engraved face. Power and identity in one piece.' },
  { id: 15, name: 'Void Hoop Earrings',        type: 'Earrings',  material: 'Blackened Steel', price: '$189', description: 'Oversized hoops with a matte void finish. Lightweight despite their commanding size.' },
  { id: 16, name: 'Monolith Bracelet',         type: 'Bracelets', material: '925 Silver',      price: '$349', description: 'A solid bar bracelet with a polished face and brushed sides. Sculpture you can wear.' },
];

// ── Everyday Luxe ─────────────────────────────────────────────────────────────
const LUXE: JewelryCard[] = [
  { id: 17, name: 'Morning Dew Ring',          type: 'Rings',     material: '14K Gold',        price: '$179', description: 'A slim band with a single dewdrop diamond. Effortless for every morning.' },
  { id: 18, name: 'Soft Arc Necklace',          type: 'Necklaces', material: 'Gold Vermeil',    price: '$129', description: 'A delicate arc pendant on a fine chain. Minimal and wearable every day.' },
  { id: 19, name: 'Pebble Stud Earrings',       type: 'Earrings',  material: 'Sterling Silver', price: '$89',  description: 'Smooth pebble-shaped studs. Comfortable enough to forget you\'re wearing them.' },
  { id: 20, name: 'Whisper Bracelet',           type: 'Bracelets', material: '14K Gold Fill',   price: '$109', description: 'A barely-there chain bracelet with a tiny charm. Subtle luxury at its finest.' },
  { id: 21, name: 'Crescent Moon Ring',         type: 'Rings',     material: 'Rose Gold',       price: '$159', description: 'A crescent silhouette ring in rose gold. Wear it alone or stack it freely.' },
  { id: 22, name: 'Linen Chain Necklace',       type: 'Necklaces', material: '18K Gold',        price: '$199', description: 'A flat linen-weave chain that catches light beautifully. Classic and versatile.' },
  { id: 23, name: 'Dot Huggie Earrings',        type: 'Earrings',  material: '14K Gold',        price: '$139', description: 'Tiny huggies with a single dot accent. Perfect for all-day, every-day wear.' },
  { id: 24, name: 'Tide Anklet',                type: 'Anklets',   material: 'Gold Vermeil',    price: '$79',  description: 'A fine chain anklet with a wave charm. Light, breezy, and always in style.' },
  { id: 25, name: 'Sunbeam Pendant',            type: 'Necklaces', material: 'Sterling Silver', price: '$119', description: 'A radiating sunburst pendant on a box chain. Warm energy you can wear.' },
  { id: 26, name: 'Oval Signet Ring',           type: 'Rings',     material: '14K Gold',        price: '$219', description: 'A petite oval signet with a smooth face. Personalise it or wear it plain.' },
  { id: 27, name: 'Feather Drop Earrings',      type: 'Earrings',  material: 'Gold Vermeil',    price: '$99',  description: 'Lightweight feather drops that move with you. Elegant without trying.' },
  { id: 28, name: 'Stacking Ring Set',          type: 'Rings',     material: 'Mixed Metals',    price: '$149', description: 'Three slim bands — gold, silver, rose gold. Stack them your way.' },
  { id: 29, name: 'Paperclip Chain',            type: 'Necklaces', material: '18K Gold Fill',   price: '$169', description: 'The iconic paperclip link chain. Timeless, modern, and endlessly wearable.' },
  { id: 30, name: 'Bamboo Hoop Earrings',       type: 'Earrings',  material: '14K Gold',        price: '$189', description: 'Textured bamboo-style hoops. A classic silhouette with a tactile finish.' },
  { id: 31, name: 'Dainty Tennis Bracelet',     type: 'Bracelets', material: 'White Gold',      price: '$299', description: 'A row of micro-pavé diamonds on a white gold chain. Everyday luxury defined.' },
  { id: 32, name: 'Horizon Bar Necklace',       type: 'Necklaces', material: 'Sterling Silver', price: '$109', description: 'A clean horizontal bar pendant. Engrave it or let it speak for itself.' },
];

// ── Card component ────────────────────────────────────────────────────────────
function JCard({ card }: { card: JewelryCard }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer"
      style={{
        backgroundColor: '#ffffff',
        aspectRatio: '3/4',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 60px rgba(201,168,76,0.25), 0 4px 20px rgba(0,0,0,0.5)'
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full flex items-center justify-center"
        style={{ height: '65%', backgroundColor: hovered ? '#f9f5ec' : '#f0f0f0', transition: 'background-color 0.35s ease' }}>
        {card.image
          ? <img src={card.image} alt={card.name} className="h-full w-full object-cover" />
          : (
            <div className="flex flex-col items-center gap-2 opacity-20">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#c9a84c" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3" stroke="#c9a84c" strokeWidth="1.5"/>
              </svg>
              <span style={{ fontSize: '8px', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase' }}>Image</span>
            </div>
          )
        }
      </div>

      <div className="px-4 py-3" style={{ height: '35%' }}>
        <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '4px' }}>{card.type}</p>
        <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '4px' }}>{card.name}</h3>

        <div style={{ overflow: 'hidden', maxHeight: hovered ? '80px' : '0px', transition: 'max-height 0.35s ease' }}>
          <p style={{ fontSize: '10px', color: '#c9a84c', lineHeight: 1.55, marginBottom: '6px' }}>{card.description}</p>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '10px', color: 'rgba(201,168,76,0.7)', fontWeight: 500 }}>{card.material}</span>
            <span style={{ fontSize: '14px', fontWeight: 900, color: '#c9a84c' }}>{card.price}</span>
          </div>
        </div>

        <div style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.2s ease', marginTop: '2px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#c9a84c' }}>{card.price}</span>
        </div>
      </div>
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="px-8 md:px-16 pt-14 pb-6 flex items-end gap-5">
      <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.3em', color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase' }}>
        {index}
      </span>
      <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1 }}>
        {title}
      </h2>
      {/* Divider */}
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(201,168,76,0.15)', marginBottom: '6px' }} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ShopJewelry({ onClose }: { onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const lenis = new Lenis({
      wrapper: el,
      content: el.firstElementChild as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex flex-col" style={{ backgroundColor: '#0a0a0a' }}>

      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-8 md:px-16 py-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '4px' }}>
            Dual Elegance Jewelry
          </p>
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Shop Jewelry
          </h1>
        </div>
        <button onClick={onClose} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.5)' }} aria-label="Close">
          <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Close</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Smooth scrollable content */}
      <div ref={scrollRef} className="flex-1" style={{ overflow: 'hidden', position: 'relative' }}>
        <div>

          {/* ── 1. Couples Collection ── */}
          <SectionHeading index="01" title="Couples Collection" />
          <div className="px-8 md:px-16 pb-4"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {COUPLES.map(c => <div key={c.id}><JCard card={c} /></div>)}
          </div>

          {/* ── 2. Statement Pieces ── */}
          <SectionHeading index="02" title="Statement Pieces" />
          <div className="px-8 md:px-16 pb-4"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {STATEMENT.map(c => <div key={c.id}><JCard card={c} /></div>)}
          </div>

          {/* ── 3. Everyday Luxe ── */}
          <SectionHeading index="03" title="Everyday Luxe" />
          <div className="px-8 md:px-16 pb-4"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {LUXE.map(c => <div key={c.id}><JCard card={c} /></div>)}
          </div>

          {/* Footer */}
          <div className="px-8 md:px-16 py-16 text-center">
            <p style={{ fontSize: '11px', color: 'rgba(201,168,76,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              All pieces are handcrafted · Free engraving on orders over $200 · Free shipping over $150
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
