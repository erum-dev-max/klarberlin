const STORIES = [
  {
    label: 'How It Started',
    heading: 'A dream stitched into reality.',
    body: 'Klar Berlin began in a small studio with one goal — make premium basics accessible to everyone.',
    gradient: 'linear-gradient(160deg, #1e3a6e 0%, #3a6bc4 100%)',
    tag: '✦ Our Story',
  },
  {
    label: 'The Mission',
    heading: 'Quality you can feel. Confidence you can wear.',
    body: 'Every thread is chosen with intention. Every fit is crafted to move with you, not against you.',
    gradient: 'linear-gradient(160deg, #57abd6 0%, #a8d8ea 100%)',
    tag: '✦ Our Mission',
  },
  {
    label: 'The Community',
    heading: 'Worn by dreamers. Built for trendsetters.',
    body: 'From couples to creatives, Klar Berlin is the uniform of those who wear their story with pride.',
    gradient: 'linear-gradient(160deg, #3a6e4a 0%, #82c895 100%)',
    tag: '✦ Our People',
  },
];

export default function Instagram() {
  return (
    <section className="relative w-full bg-white py-24 px-6 md:px-16">

      {/* Heading */}
      <div className="mb-14">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-3">Follow Along</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black">
          Our Instagram Story.
        </h2>
      </div>

      {/* Story cards */}
      <div className="flex gap-5 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory' }}>
        {STORIES.map((story) => (
          <div
            key={story.label}
            className="flex-shrink-0 relative rounded-3xl overflow-hidden flex flex-col justify-between"
            style={{
              width: '220px',
              height: '380px',
              background: story.gradient,
              scrollSnapAlign: 'start',
              padding: '24px 20px',
            }}
          >
            {/* Top tag */}
            <div>
              <span style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
              }}>
                {story.tag}
              </span>
            </div>

            {/* Bottom content */}
            <div>
              {/* Small label */}
              <p style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '8px',
              }}>
                {story.label}
              </p>

              {/* Heading */}
              <h3 style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontSize: '16px',
                fontWeight: 800,
                lineHeight: 1.35,
                color: '#ffffff',
                marginBottom: '10px',
                letterSpacing: '-0.01em',
              }}>
                {story.heading}
              </h3>

              {/* Body — two lines */}
              <p style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.8)',
              }}>
                {story.body}
              </p>
            </div>

            {/* Story progress bar — decorative */}
            <div
              className="absolute top-4 left-4 right-4 flex gap-1"
            >
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: '2px',
                    borderRadius: '2px',
                    backgroundColor: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Instagram handle */}
      <div className="mt-10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8"/>
            <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8"/>
            <circle cx="17.5" cy="6.5" r="1" fill="white"/>
          </svg>
        </div>
        <span style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 700,
          fontSize: '13px',
          color: '#0a0a0a',
          letterSpacing: '0.04em',
        }}>
          @klarberlin
        </span>
        <span style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 400,
          fontSize: '12px',
          color: 'rgba(0,0,0,0.4)',
        }}>
          — Follow our journey
        </span>
      </div>

    </section>
  );
}
