import { useState, useEffect, useRef } from 'react';

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
  { id: 1,  name: 'Morning Dew Ring',        type: 'Rings',     material: '14K Gold',         price: '$179', description: 'A slim band with a single dewdrop diamond. Effortless for every morning.' },
  { id: 2,  name: 'Soft Arc Necklace',        type: 'Necklaces', material: 'Gold Vermeil',     price: '$129', description: 'A delicate arc pendant on a fine chain. Minimal and wearable every day.' },
  { id: 3,  name: 'Pebble Stud Earrings',     type: 'Earrings',  material: 'Sterling Silver',  price: '$89',  description: 'Smooth pebble-shaped studs. Comfortable enough to forget you\'re wearing them.' },
  { id: 4,  name: 'Whisper Bracelet',         type: 'Bracelets', material: '14K Gold Fill',    price: '$109', description: 'A barely-there chain bracelet with a tiny charm. Subtle luxury at its finest.' },
  { id: 5,  name: 'Crescent Moon Ring',       type: 'Rings',     material: 'Rose Gold',        price: '$159', description: 'A crescent silhouette ring in rose gold. Wear it alone or stack it freely.' },
  { id: 6,  name: 'Linen Chain Necklace',     type: 'Necklaces', material: '18K Gold',         price: '$199', description: 'A flat linen-weave chain that catches light beautifully. Classic and versatile.' },
  { id: 7,  name: 'Dot Huggie Earrings',      type: 'Earrings',  material: '14K Gold',         price: '$139', description: 'Tiny huggies with a single dot accent. Perfect for all-day, every-day wear.' },
  { id: 8,  name: 'Tide Anklet',              type: 'Anklets',   material: 'Gold Vermeil',     price: '$79',  description: 'A fine chain anklet with a wave charm. Light, breezy, and always in style.' },
  { id: 9,  name: 'Sunbeam Pendant',          type: 'Necklaces', material: 'Sterling Silver',  price: '$119', description: 'A radiating sunburst pendant on a box chain. Warm energy you can wear.' },
  { id: 10, name: 'Oval Signet Ring',         type: 'Rings',     material: '14K Gold',         price: '$219', description: 'A petite oval signet with a smooth face. Personalise it or wear it plain.' },
  { id: 11, name: 'Feather Drop Earrings',    type: 'Earrings',  material: 'Gold Vermeil',     price: '$99',  description: 'Lightweight feather drops that move with you. Elegant without trying.' },
  { id: 12, name: 'Stacking Ring Set',        type: 'Rings',     material: 'Mixed Metals',     price: '$149', description: 'Three slim bands — gold, silver, rose gold. Stack them your way.' },
  { id: 13, name: 'Paperclip Chain',          type: 'Necklaces', material: '18K Gold Fill',    price: '$169', description: 'The iconic paperclip link chain. Timeless, modern, and endlessly wearable.' },
  { id: 14, name: 'Bamboo Hoop Earrings',     type: 'Earrings',  material: '14K Gold',         price: '$189', description: 'Textured bamboo-style hoops. A classic silhouette with a tactile finish.' },
  { id: 15, name: 'Dainty Tennis Bracelet',   type: 'Bracelets', material: 'White Gold',       price: '$299', description: 'A row of micro-pavé diamonds on a white gold chain. Everyday luxury defined.' },
  { id: 16, name: 'Horizon Bar Necklace',     type: 'Necklaces', material: 'Sterling Silver',  price: '$109', description: 'A clean horizontal bar pendant. Engrave it or let it speak for itself.' },
];

function LuxeCard({ card }: { card: JewelryCard }) {
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
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#c9a84c" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="3" stroke="#c9a84c" strokeWidth="1.5"/>
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

        {/* Details on hover — gold */}
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

/* ── Infinite horizontal marquee row ── */
const CARD_WIDTH = 220;  // px
const CARD_GAP   = 20;   // px
const SPEED      = 40;   // px per second  (positive = left, negative = right)

function MarqueeRow({ cards, direction = 1 }: { cards: JewelryCard[]; direction?: 1 | -1 }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef(0);
  const rafRef   = useRef<number>(0);
  const pauseRef = useRef(false);

  // Duplicate cards enough to fill >2 viewport widths so the loop is seamless
  const repeated = [...cards, ...cards, ...cards, ...cards];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemWidth  = CARD_WIDTH + CARD_GAP;
    const totalWidth = cards.length * itemWidth;  // one full set width

    let lastTime: number | null = null;

    function tick(now: number) {
      if (!pauseRef.current) {
        const dt = lastTime == null ? 0 : (now - lastTime) / 1000;
        posRef.current += SPEED * direction * dt;

        // Wrap: when we've scrolled exactly one full set, reset to 0
        if (direction === 1 && posRef.current >= totalWidth) posRef.current -= totalWidth;
        if (direction === -1 && posRef.current <= -totalWidth) posRef.current += totalWidth;

        if (track) track.style.transform = `translateX(${-posRef.current}px)`;
      }
      lastTime = now;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cards, direction]);

  return (
    <div
      style={{ overflow: 'hidden', width: '100%' }}
      onMouseEnter={() => { pauseRef.current = true; }}
      onMouseLeave={() => { pauseRef.current = false; }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: `${CARD_GAP}px`,
          willChange: 'transform',
          width: 'max-content',
        }}
      >
        {repeated.map((card, i) => (
          <div
            key={`${card.id}-${i}`}
            style={{ width: `${CARD_WIDTH}px`, flexShrink: 0 }}
          >
            <LuxeCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Split 16 cards into two rows of 8 */
const ROW_A = PIECES.slice(0, 8);
const ROW_B = PIECES.slice(8, 16);

export default function EverydayLuxe({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex flex-col" style={{ backgroundColor: '#0a0a0a' }}>

      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-8 md:px-16 py-6">
        <div>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '4px' }}>
            Dual Elegance Jewelry
          </p>
          <h1 style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Everyday Luxe
          </h1>
        </div>
        <button onClick={onClose} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.5)' }} aria-label="Close">
          <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Close</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Marquee rows */}
      <div className="flex-1 flex flex-col justify-center gap-5 py-6" style={{ overflow: 'hidden' }}>
        <MarqueeRow cards={ROW_A} direction={1}  />
        <MarqueeRow cards={ROW_B} direction={-1} />
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 pb-6 text-center">
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '11px', color: 'rgba(201,168,76,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          All pieces are handcrafted · Free shipping on orders over $150
        </p>
      </div>
    </div>
  );
}
