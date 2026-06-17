const OUTFITS = [
  {
    id: 1,
    src: '/navy_shirt.png',
    label: 'Signature No. 01',
    name: 'The Berlin Silhouette',
    desc: 'A structured cut born from Berlin\'s raw architectural lines. Worn as a statement, remembered as a signature.',
    fabric: '100% Merino Wool Blend',
    origin: 'Crafted in Berlin',
    price: '$129',
    tag: 'Limited Edition',
    accent: '#1e3a6e',
  },
  {
    id: 2,
    src: '/sky shirt.png',
    label: 'Signature No. 02',
    name: 'The Klar Drift',
    desc: 'Effortless drape, deliberate form. The Klar Drift moves with you — soft on the surface, precise in every seam.',
    fabric: '95% Cotton · 5% Elastane',
    origin: 'Crafted in Berlin',
    price: '$114',
    tag: 'New Season',
    accent: '#2980b9',
  },
];

export default function SignatureOutfits() {
  return (
    <section className="w-full bg-white px-6 md:px-16 py-20">

      {/* Section header */}
      <div className="flex items-center gap-5 mb-5">

        {/* Icon — a diamond/signature mark */}
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#0a0a0a',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.5 8.5H22L16.5 13L18.5 20L12 16L5.5 20L7.5 13L2 8.5H8.5L12 2Z"
              stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>

        <div>
          <p style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '10px',
            fontWeight: 900,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.35)',
          }}>
            KLAR BERLIN
          </p>
          <h2 style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(26px, 4vw, 44px)',
            letterSpacing: '-0.02em',
            color: '#0a0a0a',
            lineHeight: 1.05,
          }}>
            Signature Outfits
          </h2>
        </div>
      </div>

      {/* Brand statement */}
      <div className="mb-14" style={{ maxWidth: '620px' }}>
        <p style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: 'rgba(0,0,0,0.5)',
          lineHeight: 1.8,
          letterSpacing: '0.01em',
        }}>
          <strong style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em' }}>KLAR BERLIN</strong> was built on one belief — that what you wear carries weight.
          Each Signature piece is designed with restraint and precision, drawing from
          Berlin's culture of quiet confidence. No excess. No noise.
          Just clothing that speaks the moment you walk in.
        </p>
      </div>

      {/* Two cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {OUTFITS.map(outfit => (
          <div
            key={outfit.id}
            className="relative rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#f5f5f5' }}
          >
            {/* Tag */}
            <div className="absolute top-5 left-5 z-10">
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#ffffff',
                backgroundColor: '#0a0a0a',
                padding: '4px 10px',
                borderRadius: '4px',
              }}>
                {outfit.tag}
              </span>
            </div>

            {/* Image */}
            <div
              className="flex items-center justify-center"
              style={{ height: '400px', backgroundColor: '#efefef' }}
            >
              <img
                src={outfit.src}
                alt={outfit.name}
                className="object-contain"
                style={{ height: '340px', width: 'auto' }}
              />
            </div>

            {/* Details — always visible */}
            <div className="px-7 py-6" style={{ backgroundColor: '#ffffff' }}>

              {/* Label */}
              <p style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: outfit.accent,
                marginBottom: '6px',
              }}>
                {outfit.label}
              </p>

              {/* Name */}
              <h3 style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 900,
                fontSize: '20px',
                color: '#0a0a0a',
                letterSpacing: '-0.01em',
                marginBottom: '8px',
                lineHeight: 1.2,
              }}>
                {outfit.name}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '13px',
                color: 'rgba(0,0,0,0.55)',
                lineHeight: 1.7,
                marginBottom: '16px',
              }}>
                {outfit.desc}
              </p>

              {/* Specs row */}
              <div
                className="flex items-center justify-between"
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.07)',
                  paddingTop: '14px',
                }}
              >
                <div>
                  <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    Fabric
                  </p>
                  <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px', fontWeight: 600, color: '#0a0a0a' }}>
                    {outfit.fabric}
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    Origin
                  </p>
                  <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px', fontWeight: 600, color: '#0a0a0a' }}>
                    {outfit.origin}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    Price
                  </p>
                  <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.01em' }}>
                    {outfit.price}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <button
                style={{
                  marginTop: '16px',
                  width: '100%',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontWeight: 800,
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  backgroundColor: '#0a0a0a',
                  color: '#ffffff',
                  padding: '13px 0',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = outfit.accent)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0a0a0a')}
              >
                View Piece
              </button>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
