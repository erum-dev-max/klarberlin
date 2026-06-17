import { useEffect, useRef, CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const SHIRTS = [
  { src: '/navy_shirt.png', alt: 'Klar Berlin Navy T-Shirt'  },
  { src: '/sky shirt.png',  alt: 'Klar Berlin Sky T-Shirt'   },
  { src: '/green.png',      alt: 'Klar Berlin Green T-Shirt' },
];

const EDGE_COLORS = [
  'rgba(58, 90, 148, 0.72)',
  'rgba(87, 171, 214, 0.72)',
  'rgba(82, 142, 95, 0.72)',
];

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const stageRef    = useRef<HTMLDivElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const stripesRef  = useRef<HTMLDivElement>(null);
  const introRef    = useRef<HTMLDivElement>(null);
  const skyInfoRef  = useRef<HTMLDivElement>(null);
  const saleTagRef  = useRef<HTMLDivElement>(null);
  const oliveTextRef = useRef<HTMLDivElement>(null);
  const shirtRefs   = useRef<(HTMLDivElement | null)[]>([]);

  // Navy intro typed spans
  const t1Ref = useRef<HTMLSpanElement>(null);
  const t2Ref = useRef<HTMLSpanElement>(null);
  const t3Ref = useRef<HTMLSpanElement>(null);
  const t4Ref = useRef<HTMLSpanElement>(null);
  const t5Ref = useRef<HTMLSpanElement>(null);

  // Sky info typed spans
  const s1Ref = useRef<HTMLSpanElement>(null);
  const s2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage   = stageRef.current;
    const bg      = bgRef.current;
    const stripes = stripesRef.current;
    const intro   = introRef.current;
    const skyInfo  = skyInfoRef.current;
    const saleTag  = saleTagRef.current;
    const oliveText = oliveTextRef.current;
    const shirts  = shirtRefs.current;
    if (!section || !stage || !bg || !stripes || !intro || !skyInfo || !saleTag || !oliveText || shirts.some(r => !r)) return;

    // ── 3D stage ──────────────────────────────────────────────────────────────
    gsap.set(stage, { perspective: 1200 });
    shirts.forEach((el, i) => {
      gsap.set(el!, {
        rotateY:            i === 0 ? 0 : 90,
        opacity:            i === 0 ? 1 : 0,
        transformOrigin:    'center center',
        backfaceVisibility: 'hidden',
      });
    });

    // ── Stripe entrance ───────────────────────────────────────────────────────
    const lines = stripes.querySelectorAll('.stripe-line');
    gsap.fromTo(lines,
      { scaleX: 0, transformOrigin: 'center center' },
      { scaleX: 1, duration: 1.1, ease: 'expo.out', stagger: 0.12, delay: 0.3 }
    );

    // ── Navy intro typewriter ─────────────────────────────────────────────────
    gsap.set(intro, { opacity: 1 });
    const typeRefs = [t1Ref, t2Ref, t3Ref, t4Ref, t5Ref];
    const texts = [
      'Made for the Vibe.',
      'Clean fits. Bold energy. Endless confidence.',
      'Curated collections for couples, trendsetters,',
      'and dreamers who wear their story with pride.',
      'New Season • New Mood • New You',
    ];
    const typeTl = gsap.timeline({ delay: 0.6 });
    typeRefs.forEach((ref, i) => {
      if (!ref.current) return;
      typeTl.to(ref.current, {
        duration: texts[i].length * 0.045,
        text: { value: texts[i], delimiter: '' },
        ease: 'none',
      }, i === 0 ? 0 : '+=0.18');
    });

    // ── Sky info — hidden initially, text pre-filled ─────────────────────────
    gsap.set(skyInfo, { opacity: 0, y: 20 });
    gsap.set(saleTag, { opacity: 0, scale: 0.7, rotation: -4 });
    // Pre-fill text so it's always readable when visible
    if (s1Ref.current) s1Ref.current.textContent = 'We offer a sale every 6 months.';
    if (s2Ref.current) s2Ref.current.textContent = "Don't miss your chance to refresh your wardrobe.";

    // ── Olive text — hidden initially ────────────────────────────────────────
    gsap.set(oliveText, { opacity: 0, y: 16 });
    const parseRgba = (s: string) => s.match(/[\d.]+/g)!.map(Number) as [number,number,number,number];
    const setGradient = (color: string) => {
      bg.style.background = `radial-gradient(ellipse 72% 72% at 50% 50%, #ffffff 0%, #ffffff 28%, ${color} 100%)`;
    };
    setGradient(EDGE_COLORS[0]);

    // ── Scroll timeline ───────────────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.8,
      },
    });

    // Navy intro fades out
    tl.to(intro, { opacity: 0, y: -30, ease: 'power2.in', duration: 0.35 }, 0);

    const addFlip = (i: number, at: number) => {
      const outEl = shirts[i]!;
      const inEl  = shirts[i + 1]!;
      tl.to(outEl, { rotateY: -90, opacity: 0, ease: 'power2.in',  duration: 0.5 }, at);
      tl.to(inEl,  { rotateY: 0,   opacity: 1, ease: 'power2.out', duration: 0.5 }, at + 0.5);

      const fromBg = parseRgba(EDGE_COLORS[i]);
      const toBg   = parseRgba(EDGE_COLORS[i + 1]);
      const proxy  = { t: 0 };
      tl.to(proxy, {
        t: 1, duration: 1.0, ease: 'power1.inOut',
        onUpdate() {
          const p = proxy.t;
          const lr  = (a: number, b: number) => Math.round(a + (b - a) * p);
          const lrA = (a: number, b: number) => +(a + (b - a) * p).toFixed(3);
          setGradient(`rgba(${lr(fromBg[0],toBg[0])},${lr(fromBg[1],toBg[1])},${lr(fromBg[2],toBg[2])},${lrA(fromBg[3],toBg[3])})`);
        },
      }, at);
    };

    addFlip(0, 0);
    addFlip(1, 1.0);

    // Sky info animates in when sky shirt arrives and out when green arrives
    // Tied to scroll progress so it's always correct on back-scroll too
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.8,
      onUpdate: (self) => {
        const p = self.progress;

        // Sky shirt visible: 28%→72%
        let skyOpacity = 0;
        if (p >= 0.28 && p < 0.35) {
          skyOpacity = (p - 0.28) / 0.07;
        } else if (p >= 0.35 && p <= 0.65) {
          skyOpacity = 1;
        } else if (p > 0.65 && p <= 0.72) {
          skyOpacity = 1 - (p - 0.65) / 0.07;
        }
        gsap.set(skyInfo, { opacity: skyOpacity, y: skyOpacity < 1 && p < 0.35 ? 20 * (1 - skyOpacity) : 0 });
        gsap.set(saleTag, { opacity: skyOpacity, scale: skyOpacity < 1 && p < 0.35 ? 0.7 + 0.3 * skyOpacity : 1 });

        // Olive shirt visible: 68%→100%
        let oliveOpacity = 0;
        if (p >= 0.68 && p < 0.76) {
          oliveOpacity = (p - 0.68) / 0.08;
        } else if (p >= 0.76) {
          oliveOpacity = 1;
        }
        gsap.set(oliveText, { opacity: oliveOpacity, y: oliveOpacity < 1 ? 16 * (1 - oliveOpacity) : 0 });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const base: CSSProperties = {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    display: 'block',
    minHeight: '1.6em',
  };

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Background */}
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 72% 72% at 50% 50%, #ffffff 0%, #ffffff 28%, rgba(58,90,148,0.72) 100%)` }}
        />

        {/* 5 stripes */}
        <div
          ref={stripesRef}
          className="absolute pointer-events-none flex flex-col items-center justify-center"
          style={{
            zIndex: 1,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(320px, 36vw, 460px)',
            gap: '11px',
          }}
        >
          {[
            { color: '#1e3a6e', opacity: 0.85 },
            { color: '#c9a84c', opacity: 0.70 },
            { color: '#0a0a0a', opacity: 0.90 },
            { color: '#c9a84c', opacity: 0.70 },
            { color: '#1e3a6e', opacity: 0.85 },
          ].map((stripe, i) => (
            <div key={i} className="stripe-line w-full"
              style={{ height: '9px', backgroundColor: stripe.color, opacity: stripe.opacity, borderRadius: '1px' }}
            />
          ))}
        </div>

        {/* Navy intro — top-left */}
        <div ref={introRef} className="absolute pointer-events-none"
          style={{ top: '20vh', left: '5vw', zIndex: 20, maxWidth: '300px', opacity: 0 }}
        >
          <span style={{ ...base, fontWeight: 800, fontSize: '16px', color: '#1e3a6e', letterSpacing: '0.01em' }}>
            <span ref={t1Ref} />
          </span>
          <span style={{ ...base, marginTop: '6px', marginBottom: '6px' }}>
            <span ref={t2Ref} style={{
              fontWeight: 800, fontSize: '13px', color: '#ffffff',
              backgroundColor: '#0a0a0a', padding: '3px 10px 4px',
              letterSpacing: '0.03em', lineHeight: 1.9, display: 'inline', borderRadius: '6px',
            }} />
          </span>
          <span style={{ ...base, fontWeight: 500, fontSize: '12.5px', color: '#1e3a6e', letterSpacing: '0.01em', marginTop: '8px' }}>
            <span ref={t3Ref} />
          </span>
          <span style={{ ...base, fontWeight: 500, fontSize: '12.5px', color: '#1e3a6e', letterSpacing: '0.01em' }}>
            <span ref={t4Ref} />
          </span>
          <span style={{ ...base, fontWeight: 600, fontSize: '10px', color: '#1e3a6e', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '10px' }}>
            <span ref={t5Ref} />
          </span>
        </div>

        {/* Sky shirt info — top-right */}
        <div ref={skyInfoRef} className="absolute pointer-events-none"
          style={{ top: '18vh', right: '5vw', zIndex: 20, maxWidth: '280px', textAlign: 'right' }}
        >
          {/* Sale tag card */}
          <div ref={saleTagRef}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0d6efd',
              borderRadius: '14px',
              padding: '14px 22px 12px',
              marginBottom: '14px',
              boxShadow: '0 8px 32px rgba(13,110,253,0.35), 0 2px 8px rgba(0,0,0,0.12)',
              position: 'relative',
            }}
          >
            {/* Tag hole */}
            <div style={{
              position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)',
              width: '14px', height: '14px', borderRadius: '50%',
              backgroundColor: '#ffffff', border: '2px solid rgba(13,110,253,0.4)',
            }} />
            <span style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 900,
              fontSize: '36px',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>20%</span>
            <span style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 700,
              fontSize: '11px',
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginTop: '4px',
            }}>OFF</span>
          </div>

          {/* Typed lines */}
          <span style={{ ...base, fontWeight: 800, fontSize: '14px', color: '#1565a0', letterSpacing: '0.01em', textAlign: 'right' }}>
            <span ref={s1Ref} />
          </span>
          <span style={{ ...base, fontWeight: 500, fontSize: '12px', color: '#2980b9', letterSpacing: '0.01em', marginTop: '4px', textAlign: 'right' }}>
            <span ref={s2Ref} />
          </span>
        </div>


        <div ref={stageRef} className="relative z-10 flex items-center justify-center">

          {/* Olive text — pinned to top of shirt */}
          <div
            ref={oliveTextRef}
            className="absolute pointer-events-none"
            style={{
              top: '0px',
              left: '50%',
              transform: 'translate(-50%, -100%)',
              paddingBottom: '10px',
              zIndex: 11,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Heading */}
            <span style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 900,
              fontSize: '13px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              background: 'linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
            }}>
              Luxurious Outfit
            </span>
            {/* Subheading */}
            <span style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 500,
              fontSize: '10px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.5)',
              display: 'block',
              marginTop: '5px',
            }}>
              Luxurious Fit Texture
            </span>
          </div>

          {SHIRTS.map((shirt, i) => (
            <div key={shirt.src} ref={el => { shirtRefs.current[i] = el; }} className="absolute">
              <img src={shirt.src} alt={shirt.alt} className="w-[420px] md:w-[520px] object-contain" />
            </div>
          ))}
          <div className="w-[420px] md:w-[520px] h-[560px] invisible" />
        </div>

      </div>
    </section>
  );
}
