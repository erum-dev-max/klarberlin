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

const PIECES: JewelryCard[] = [
  { id: 1, name: 'Obsidian Crown Ring',      type: 'Rings',     material: 'Black Rhodium',    price: '$389', description: 'A bold architectural band with a raw obsidian centerpiece. Designed to command attention.' },
  { id: 2, name: 'Sovereign Chain',           type: 'Necklaces', material: '18K Gold',         price: '$459', description: 'A heavy-link chain with a geometric pendant. Worn alone or layered — always a statement.' },
  { id: 3, name: 'Eclipse Cuff',              type: 'Bracelets', material: 'Oxidised Silver',  price: '$229', description: 'Wide open cuff with a sun-eclipse motif. Unisex, bold, and built to be noticed.' },
  { id: 4, name: 'Noir Drop Earrings',        type: 'Earrings',  material: 'Black Gold',       price: '$319', description: 'Long asymmetric drops in matte black gold. Minimal lines, maximum presence.' },
  { id: 5, name: 'Architect Pendant',         type: 'Necklaces', material: 'Sterling Silver',  price: '$279', description: 'A structural pendant inspired by brutalist architecture. Sharp angles, soft chain.' },
  { id: 6, name: 'Titan Signet Ring',         type: 'Rings',     material: '18K White Gold',   price: '$499', description: 'A wide signet ring with a custom-engraved face. Power and identity in one piece.' },
  { id: 7, name: 'Void Hoop Earrings',        type: 'Earrings',  material: 'Blackened Steel',  price: '$189', description: 'Oversized hoops with a matte void finish. Lightweight despite their commanding size.' },
  { id: 8, name: 'Monolith Bracelet',         type: 'Bracelets', material: '925 Silver',       price: '$349', description: 'A solid bar bracelet with a polished face and brushed sides. Sculpture you can wear.' },
];

function PieceCard({ card }: { card: JewelryCard }) {
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
          : '0 4px 20px rgba(0,0,0,0.35)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          height: '65%',
          backgroundColor: hovered ? '#f9f5ec' : '#f0f0f0',
          transition: 'background-color 0.35s ease',
        }}
      >
        {card.image ? (
          <img src={card.image} alt={card.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-20">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" stroke="#c9a84c" strokeWidth="1.5" fill="none"/>
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

        {/* Details on hover — gold text */}
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

export default function StatementPieces({ onClose }: { onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll behind overlay
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Local Lenis smooth scroll
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
    <div
      className="fixed inset-0 z-[80] flex flex-col"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-8 md:px-16 py-6"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <div>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '4px' }}>
            Dual Elegance Jewelry
          </p>
          <h1 style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Statement Pieces
          </h1>
        </div>

        <button onClick={onClose} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.5)' }} aria-label="Close">
          <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Close</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Smooth scrollable content */}
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
            {PIECES.map(card => (
              <div key={card.id}>
                <PieceCard card={card} />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-8 md:px-16 pb-16 text-center">
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '11px', color: 'rgba(201,168,76,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              All pieces are handcrafted · Limited edition drops every season
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
