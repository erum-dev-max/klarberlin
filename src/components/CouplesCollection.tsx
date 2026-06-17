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

const JEWELRY: JewelryCard[] = [
  { id: 1, name: 'Eternal Bond Ring',      type: 'Rings',     material: '18K Gold',       price: '$299', description: 'A matching set symbolizing unbreakable connection. Engraved with a subtle infinity motif.' },
  { id: 2, name: 'Twin Flame Necklace',    type: 'Necklaces', material: 'Sterling Silver', price: '$189', description: 'Two interlocking pendants — one for each half of the pair. Wear yours, gift theirs.' },
  { id: 3, name: 'Golden Hour Bracelet',   type: 'Bracelets', material: '14K Gold Fill',   price: '$149', description: 'Delicate chain with a sun-and-moon charm set. Designed to be worn together or apart.' },
  { id: 4, name: 'Celestial Stud Earrings',type: 'Earrings',  material: 'White Gold',      price: '$219', description: 'Star and crescent studs crafted in white gold. Minimal, meaningful, timeless.' },
  { id: 5, name: 'Soulmate Locket',        type: 'Necklaces', material: 'Rose Gold',       price: '$259', description: 'A locket that holds two photos — one on each side. Rose gold finish with a matte texture.' },
  { id: 6, name: 'Infinity Cuff',          type: 'Bracelets', material: '925 Silver',      price: '$129', description: 'Open-ended cuff with an infinity symbol. Adjustable fit, unisex design.' },
  { id: 7, name: 'Promise Band Set',       type: 'Rings',     material: '18K White Gold',  price: '$349', description: 'A pair of slim bands with a shared diamond accent. Stackable and elegant.' },
  { id: 8, name: 'Dual Charm Anklet',      type: 'Anklets',   material: 'Gold Vermeil',    price: '$99',  description: 'Matching anklets with a tiny heart charm. Lightweight and perfect for everyday wear.' },
];

function JewelryCardItem({ card }: { card: JewelryCard }) {
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
          ? '0 20px 60px rgba(201,168,76,0.25), 0 4px 20px rgba(0,0,0,0.4)'
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          height: '65%',
          backgroundColor: hovered ? '#f9f5ec' : '#f5f5f5',
          transition: 'background-color 0.35s ease',
        }}
      >
        {card.image ? (
          <img src={card.image} alt={card.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-20">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#c9a84c" strokeWidth="1.5"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase' }}>
              Image
            </span>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className="px-4 py-3" style={{ height: '35%' }}>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '4px' }}>
          {card.type}
        </p>
        <h3 style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '13px', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '4px' }}>
          {card.name}
        </h3>

        {/* Details on hover */}
        <div style={{ overflow: 'hidden', maxHeight: hovered ? '80px' : '0px', transition: 'max-height 0.35s ease' }}>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '10px', fontWeight: 400, color: '#c9a84c', lineHeight: 1.55, marginBottom: '6px' }}>
            {card.description}
          </p>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '10px', color: 'rgba(201,168,76,0.7)', fontWeight: 500 }}>{card.material}</span>
            <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '14px', fontWeight: 900, color: '#c9a84c' }}>{card.price}</span>
          </div>
        </div>

        {/* Price at rest */}
        <div style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.2s ease', marginTop: '2px' }}>
          <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '13px', fontWeight: 700, color: '#c9a84c' }}>{card.price}</span>
        </div>
      </div>
    </div>
  );
}

export default function CouplesCollection({ onClose }: { onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll behind overlay
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Local Lenis smooth scroll on the overlay's scroll container
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

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Header — no border */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-8 md:px-16 py-6"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <div>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '4px' }}>
            Dual Elegance Jewelry
          </p>
          <h1 style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Couples Collection
          </h1>
        </div>

        <button onClick={onClose} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.5)' }} aria-label="Close">
          <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Close</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable area — Lenis smooth scroll */}
      <div
        ref={scrollRef}
        className="flex-1"
        style={{ overflow: 'hidden', position: 'relative' }}
      >
        <div>
        {/* 4-column grid */}
        <div
          className="px-8 md:px-16 py-8"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}
        >
          {JEWELRY.map(card => (
            <div key={card.id}>
              <JewelryCardItem card={card} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-8 md:px-16 pb-16 text-center">
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '11px', color: 'rgba(201,168,76,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            All pieces are handcrafted · Free engraving on orders over $200
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
