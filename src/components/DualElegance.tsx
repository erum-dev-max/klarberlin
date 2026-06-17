import { useState } from 'react';
import CouplesCollection from './CouplesCollection';
import StatementPieces from './StatementPieces';
import EverydayLuxe from './EverydayLuxe';
import ShopJewelry from './ShopJewelry';

export default function DualElegance() {
  const [couplesOpen,   setCouplesOpen]   = useState(false);
  const [statementOpen, setStatementOpen] = useState(false);
  const [luxeOpen,      setLuxeOpen]      = useState(false);
  const [shopOpen,      setShopOpen]      = useState(false);
  return (
    <>
      {couplesOpen   && <CouplesCollection onClose={() => setCouplesOpen(false)} />}
      {statementOpen && <StatementPieces   onClose={() => setStatementOpen(false)} />}
      {luxeOpen      && <EverydayLuxe      onClose={() => setLuxeOpen(false)} />}
      {shopOpen      && <ShopJewelry       onClose={() => setShopOpen(false)} />}
    <section className="relative w-full bg-white py-24 px-6 md:px-16 overflow-hidden">

      {/* Decorative background circle */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          top: '50%',
          right: '-100px',
          transform: 'translateY(-50%)',
        }}
      />

      {/* Label */}
      <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-4">
        Now at the Shop
      </p>

      {/* Heading */}
      <h2
        className="font-black tracking-tight text-black mb-3"
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: 'clamp(32px, 5vw, 64px)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}
      >
        Dual Elegance
        <br />
        <span style={{ color: '#c9a84c' }}>Jewelry.</span>
      </h2>

      {/* Tagline */}
      <p
        className="mb-10"
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 400,
          fontSize: '14px',
          color: 'rgba(0,0,0,0.5)',
          letterSpacing: '0.02em',
          maxWidth: '360px',
          lineHeight: 1.7,
        }}
      >
        Where timeless craftsmanship meets modern edge.
        Pieces made to be worn together — and remembered forever.
      </p>

      {/* Feature cards */}
      <div className="flex flex-col md:flex-row gap-5 mb-12">
        {[
          {
            title: 'Couples Collection',
            desc: 'Matching sets designed for two. Wear your bond.',
            icon: '◈',
            bg: '#0a0a0a',
            text: '#ffffff',
            onClick: () => setCouplesOpen(true),
          },
          {
            title: 'Statement Pieces',
            desc: 'Bold. Minimal. Unforgettable. For those who stand out.',
            icon: '◇',
            bg: '#c9a84c',
            text: '#ffffff',
            onClick: () => setStatementOpen(true),
          },
          {
            title: 'Everyday Luxe',
            desc: 'Fine jewelry for daily wear. Effortless and enduring.',
            icon: '○',
            bg: '#f5f5f5',
            text: '#0a0a0a',
            onClick: () => setLuxeOpen(true),
          },
        ].map(card => (
          <div
            key={card.title}
            className="flex-1 rounded-2xl p-7 flex flex-col justify-between"
            style={{
              backgroundColor: card.bg,
              minHeight: '180px',
              cursor: card.onClick ? 'pointer' : 'default',
            }}
            onClick={card.onClick}
          >
            <span style={{ fontSize: '22px', color: card.text, opacity: 0.6 }}>{card.icon}</span>
            <div>
              <h3 style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontWeight: 800,
                fontSize: '15px',
                color: card.text,
                letterSpacing: '-0.01em',
                marginBottom: '6px',
              }}>
                {card.title}
              </h3>
              <p style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontWeight: 400,
                fontSize: '12px',
                color: card.text,
                opacity: 0.7,
                lineHeight: 1.6,
              }}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-6">
        <button
          className="transition-all duration-300"
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 800,
            fontSize: '12px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            backgroundColor: '#0a0a0a',
            color: '#ffffff',
            padding: '14px 32px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c9a84c')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0a0a0a')}
          onClick={() => setShopOpen(true)}
        >
          Shop Jewelry
        </button>
        <span style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 500,
          fontSize: '12px',
          color: 'rgba(0,0,0,0.4)',
          letterSpacing: '0.04em',
        }}>
          New arrivals every season
        </span>
      </div>

    </section>
    </>
  );
}
