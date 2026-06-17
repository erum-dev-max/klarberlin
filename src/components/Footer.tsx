export default function Footer() {
  return (
    <footer
      className="relative w-full"
      style={{
        /* Dramatic dark background — deep charcoal with a warm undertone */
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1410 50%, #0f0c0a 100%)',
        borderRadius: '28px 28px 0 0',
        overflow: 'hidden',
        marginTop: '0',
      }}
    >
      {/* Top shade — soft glow bleeding down from above */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom, rgba(201,168,76,0.10) 0%, transparent 100%)',
          borderRadius: '28px 28px 0 0',
        }}
      />

      <div className="relative px-8 md:px-16 py-10">

        {/* Top row — brand + socials */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">

          {/* Brand */}
          <div>
            <h2 style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(22px, 3vw, 32px)',
              color: '#ffffff',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>
              KLAR BERLIN
            </h2>
            <p style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: '11px',
              color: 'rgba(201,168,76,0.7)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginTop: '5px',
            }}>
              Premium Basics · Dual Elegance Jewelry
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">

            {/* TikTok */}
            <a href="#" aria-label="TikTok"
              className="flex items-center justify-center rounded-full transition-all duration-300"
              style={{ width: '38px', height: '38px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" aria-label="Instagram"
              className="flex items-center justify-center rounded-full transition-all duration-300"
              style={{ width: '38px', height: '38px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" aria-label="Facebook"
              className="flex items-center justify-center rounded-full transition-all duration-300"
              style={{ width: '38px', height: '38px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>

          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(201,168,76,0.15)', marginBottom: '24px' }} />

        {/* Middle row — contact + links */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-8">

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: '10px' }}>
              Contact
            </p>
            <a href="tel:+1234567890" style={{ display: 'block', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginBottom: '6px', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              +1 (234) 567-890
            </a>
            <a href="mailto:hello@klarberlin.com" style={{ display: 'block', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              hello@klarberlin.com
            </a>
          </div>

          {/* Shipping */}
          <div>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: '10px' }}>
              Shipping
            </p>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '220px' }}>
              Free shipping on orders over $150.
              Standard delivery 3–5 business days.
            </p>
          </div>

          {/* Returns */}
          <div>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: '10px' }}>
              Return Policy
            </p>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '220px' }}>
              30-day hassle-free returns.
              Items must be unworn and in original packaging.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(201,168,76,0.10)', marginBottom: '16px' }} />

        {/* Bottom row — copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
            © {new Date().getFullYear()} <strong style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>KLAR BERLIN</strong>. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <a key={link} href="#"
                style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', letterSpacing: '0.04em' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
