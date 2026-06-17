import { useState } from 'react';

interface BannerItem {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  tag: string;
  price: string;
  details: {
    fabric: string;
    weight: string;
    fit: string;
    care: string;
    sizes: string[];
  };
  description: string;
}

const BANNERS: BannerItem[] = [
  {
    id: 1,
    src: '/navy_shirt.png',
    title: 'Navy Essential',
    subtitle: 'The everyday staple, elevated.',
    tag: 'Bestseller',
    price: '$38',
    description:
      'Cut from 180 GSM combed cotton, the Navy Essential is designed to outlast trends and outlive seasons. Structured enough for a dinner, relaxed enough for a Sunday.',
    details: {
      fabric: '100% Combed Cotton',
      weight: '180 GSM',
      fit: 'Regular Fit',
      care: 'Machine wash cold, tumble dry low',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
  },
  {
    id: 2,
    src: '/sky shirt.png',
    title: 'Sky Classic',
    subtitle: 'Light, breezy, built for the season.',
    tag: 'New Season',
    price: '$36',
    description:
      'The Sky Classic brings a fresh lightness to your wardrobe. 175 GSM combed cotton in a relaxed fit — made for the moments between the rush.',
    details: {
      fabric: '100% Combed Cotton',
      weight: '175 GSM',
      fit: 'Relaxed Fit',
      care: 'Machine wash cold, hang dry',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
  },
];

// ── Full product page ─────────────────────────────────────────────────────────
function ProductPage({ item, onClose }: { item: BannerItem; onClose: () => void }) {
  const [selectedSize, setSelectedSize] = useState('M');

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col bg-white overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 md:px-16 py-5 border-b border-black/6 sticky top-0 bg-white z-10">
        <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
          Nairum · {item.tag}
        </span>
        <button
          onClick={onClose}
          className="flex items-center gap-2 group"
          style={{ color: 'rgba(0,0,0,0.45)' }}
          aria-label="Close"
        >
          <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Close</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Content — image left, details right */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">

        {/* Left — image */}
        <div
          className="md:w-1/2 flex items-center justify-center"
          style={{ backgroundColor: '#f7f7f7', minHeight: '60vh' }}
        >
          <img
            src={item.src}
            alt={item.title}
            className="object-contain"
            style={{ maxHeight: '80vh', maxWidth: '90%', padding: '48px' }}
          />
        </div>

        {/* Right — details */}
        <div
          className="md:w-1/2 flex flex-col justify-center px-10 md:px-16 py-12 bg-white"
        >
          {/* Tag */}
          <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', display: 'block', marginBottom: '10px' }}>
            {item.tag}
          </span>

          {/* Title */}
          <h1 style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em', color: '#0a0a0a', marginBottom: '6px', lineHeight: 1.1 }}>
            {item.title}
          </h1>

          {/* Subtitle */}
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '14px', color: 'rgba(0,0,0,0.45)', marginBottom: '20px' }}>
            {item.subtitle}
          </p>

          {/* Price */}
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 900, fontSize: '28px', color: '#0a0a0a', marginBottom: '24px', letterSpacing: '-0.01em' }}>
            {item.price}
          </p>

          {/* Description */}
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '14px', color: 'rgba(0,0,0,0.6)', lineHeight: 1.75, marginBottom: '28px', maxWidth: '420px' }}>
            {item.description}
          </p>

          {/* Details */}
          <div className="flex flex-col gap-2 mb-8" style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '20px' }}>
            {[
              { label: 'Fabric', value: item.details.fabric },
              { label: 'Weight', value: item.details.weight },
              { label: 'Fit',    value: item.details.fit    },
              { label: 'Care',   value: item.details.care   },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between" style={{ fontSize: '13px' }}>
                <span style={{ color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>{label}</span>
                <span style={{ color: '#0a0a0a', fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Size selector */}
          <div className="mb-8">
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '10px' }}>
              Size — {selectedSize}
            </p>
            <div className="flex gap-2 flex-wrap">
              {item.details.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: '44px', height: '44px',
                    borderRadius: '6px',
                    border: selectedSize === size ? '2px solid #0a0a0a' : '1px solid rgba(0,0,0,0.15)',
                    backgroundColor: selectedSize === size ? '#0a0a0a' : 'transparent',
                    color: selectedSize === size ? '#ffffff' : '#0a0a0a',
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 800,
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              backgroundColor: '#0a0a0a',
              color: '#ffffff',
              padding: '16px 40px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '380px',
              transition: 'background-color 0.25s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1e3a6e')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0a0a0a')}
          >
            Add to Cart — {item.price}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Banner section ────────────────────────────────────────────────────────────
export default function ShirtBanner() {
  const [active, setActive] = useState<BannerItem | null>(null);

  return (
    <>
      {active && <ProductPage item={active} onClose={() => setActive(null)} />}

      <section className="w-full bg-white px-6 md:px-16 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BANNERS.map(item => (
            <div
              key={item.id}
              className="relative overflow-hidden group cursor-pointer"
              style={{ borderRadius: '16px', backgroundColor: '#f4f4f4' }}
              onClick={() => setActive(item)}
            >
              {/* Image */}
              <div
                className="flex items-center justify-center"
                style={{ height: '520px', overflow: 'hidden' }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  style={{ height: '440px', width: 'auto' }}
                />
              </div>

              {/* Overlay — slides up on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-7 py-6"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
                }}
              >
                <div>
                  {/* Tag */}
                  <span style={{ display: 'inline-block', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '6px' }}>
                    {item.tag}
                  </span>
                  <h3 style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 900, fontSize: '22px', color: '#ffffff', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                    {item.subtitle}
                  </p>
                </div>

                {/* Shop Now button */}
                <button
                  style={{
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    fontWeight: 800,
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    backgroundColor: '#ffffff',
                    color: '#0a0a0a',
                    padding: '11px 22px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#0a0a0a';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#0a0a0a';
                  }}
                  onClick={e => { e.stopPropagation(); setActive(item); }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
