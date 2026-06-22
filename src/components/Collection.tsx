import { useState, useRef, useEffect, MouseEvent } from 'react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

interface ShirtCard {
  src: string;
  name: string;
  color: string;
  fabric: string;
  weight: string;
  fit: string;
  price: string;
  accent: string;
}

const CARDS: ShirtCard[] = [
  {
    src: '/navy_shirt.png',
    name: 'Navy Essential',
    color: 'Navy Blue',
    fabric: '100% Combed Cotton',
    weight: '180 GSM',
    fit: 'Regular Fit',
    price: '$38',
    accent: '58, 90, 148',
  },
  {
    src: '/sky shirt.png',
    name: 'Sky Classic',
    color: 'Sky Blue',
    fabric: '100% Combed Cotton',
    weight: '175 GSM',
    fit: 'Relaxed Fit',
    price: '$36',
    accent: '87, 171, 214',
  },
  {
    src: '/green.png',
    name: 'Olive Signature',
    color: 'Olive Green',
    fabric: '95% Cotton / 5% Elastane',
    weight: '185 GSM',
    fit: 'Slim Fit',
    price: '$42',
    accent: '82, 142, 95',
  },
  {
    src: '/navy_shirt.png',
    name: 'Navy Premium',
    color: 'Navy Blue',
    fabric: '100% Pima Cotton',
    weight: '200 GSM',
    fit: 'Oversized Fit',
    price: '$45',
    accent: '58, 90, 148',
  },
  {
    src: '/sky shirt.png',
    name: 'Sky Limited',
    color: 'Sky Blue',
    fabric: '100% Pima Cotton',
    weight: '190 GSM',
    fit: 'Regular Fit',
    price: '$44',
    accent: '87, 171, 214',
  },
  {
    src: '/green.png',
    name: 'Olive Reserve',
    color: 'Olive Green',
    fabric: '100% Combed Cotton',
    weight: '195 GSM',
    fit: 'Regular Fit',
    price: '$46',
    accent: '82, 142, 95',
  },
];

function Card({ card }: { card: ShirtCard }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation();
    addItem({ src: card.src, name: card.name, color: card.color, price: card.price, accent: card.accent });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="relative rounded-2xl cursor-pointer flex-shrink-0"
      style={{
        width: 'clamp(280px, 30vw, 400px)',
        padding: '2px',
        background: hovered
          ? `linear-gradient(135deg, rgba(${card.accent},0.9) 0%, rgba(${card.accent},0.3) 50%, rgba(${card.accent},0.9) 100%)`
          : 'transparent',
        boxShadow: hovered
          ? `0 0 0 1px rgba(${card.accent},0.5), 0 20px 60px rgba(${card.accent},0.25), 0 4px 20px rgba(0,0,0,0.08)`
          : '0 4px 24px rgba(0,0,0,0.07)',
        transition: 'background 0.45s ease, box-shadow 0.45s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-[14px] bg-white" style={{ height: '480px' }}>

        {/* Image area */}
        <div
          className="flex items-center justify-center h-full relative"
          style={{
            backgroundColor: hovered ? `rgba(${card.accent}, 0.07)` : 'rgb(249,249,249)',
            transition: 'background-color 0.45s ease',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: hovered
                ? `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(${card.accent},0.18) 0%, transparent 70%)`
                : 'none',
            }}
          />
          <img
            src={card.src}
            alt={card.name}
            className="h-[280px] md:h-[320px] w-auto object-contain relative z-10"
            style={{
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
        </div>

        {/* Details overlay — slides up on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 px-6 py-5"
          style={{
            background: `linear-gradient(to top, rgba(${card.accent},0.06) 0%, #ffffff 100%)`,
            transform: hovered ? 'translateY(0%)' : 'translateY(100%)',
            transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] mb-1 font-medium"
            style={{ color: `rgba(${card.accent}, 1)` }}>
            {card.color}
          </p>
          <h3 className="text-lg font-bold tracking-tight text-black mb-3">{card.name}</h3>

          <div className="flex flex-col gap-1.5 mb-4">
            {[
              { label: 'Fabric', value: card.fabric },
              { label: 'Weight', value: card.weight },
              { label: 'Fit',    value: card.fit    },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-400">{label}</span>
                <span className="text-black font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-black">{card.price}</span>
            <button
              onClick={handleAddToCart}
              className="text-[11px] uppercase tracking-[0.25em] px-4 py-2 transition-all duration-300 flex items-center gap-2"
              style={{
                border: `1px solid rgba(${card.accent}, 0.8)`,
                color: added ? '#fff' : `rgba(${card.accent},1)`,
                backgroundColor: added ? `rgba(${card.accent},1)` : 'transparent',
              }}
            >
              {added ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6l4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Added
                </>
              ) : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Static name */}
        <div
          className="px-6 py-4"
          style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.25s ease' }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] font-medium"
            style={{ color: `rgba(${card.accent},0.7)` }}>
            {card.color}
          </p>
          <h3 className="text-base font-bold text-black">{card.name}</h3>
        </div>
      </div>
    </div>
  );
}

const SPEED = 60; // px per second
const GAP   = 32; // px — matches the gap-8 class

function InfiniteTrack({ cards }: { cards: ShirtCard[] }) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const posRef    = useRef(0);
  const rafRef    = useRef<number>(0);
  const pauseRef  = useRef(false);
  const lastRef   = useRef<number | null>(null);

  // Triple the cards so there's always content to the right while looping
  const looped = [...cards, ...cards, ...cards];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Width of one full set (used for seamless wrap)
    const firstChild = track.children[0] as HTMLElement | null;
    if (!firstChild) return;

    const itemW = firstChild.offsetWidth + GAP;
    const setW  = cards.length * itemW;

    function tick(now: number) {
      const dt = lastRef.current == null ? 0 : (now - lastRef.current) / 1000;
      lastRef.current = now;

      if (!pauseRef.current) {
        posRef.current += SPEED * dt;
        if (posRef.current >= setW) posRef.current -= setW;
        if (track) track.style.transform = `translateX(${-posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cards]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { pauseRef.current = true; }}
      onMouseLeave={() => { pauseRef.current = false; }}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{ gap: `${GAP}px`, willChange: 'transform', width: 'max-content' }}
      >
        {looped.map((card, i) => (
          <Card key={`${card.src}-${card.name}-${i}`} card={card} />
        ))}
      </div>
    </div>
  );
}

export default function Collection() {
  const { query } = useSearch();

  const filtered = query.trim()
    ? CARDS.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.color.toLowerCase().includes(query.toLowerCase())
      )
    : CARDS;

  return (
    <section className="relative w-full bg-white py-24 overflow-hidden">

      {/* Header */}
      <div className="px-6 md:px-16 mb-12">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-3">The Collection</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black">
          Crafted for every day.
        </h2>
      </div>

      {/* Infinite scroll or empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center px-6">
          <p className="text-sm text-gray-400 uppercase tracking-[0.4em]">No results for "{query}"</p>
          <p className="text-xs text-gray-300">Try searching by color — Navy Blue, Sky Blue, or Olive Green</p>
        </div>
      ) : (
        <InfiniteTrack cards={filtered} />
      )}

    </section>
  );
}
