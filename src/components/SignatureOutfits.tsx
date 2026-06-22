
export default function SignatureOutfits() {
  return (
    <section className="w-full bg-white px-6 md:px-16 py-8">

      {/* Section header */}
      <div className="flex items-center gap-5 mb-3">

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
      <div className="mb-0" style={{ maxWidth: '620px' }}>
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



    </section>
  );
}
