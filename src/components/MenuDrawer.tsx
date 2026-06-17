import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Category {
  label: string;
  sub: (string | { label: string; items: string[] })[];
}

const CATEGORIES: Category[] = [
  {
    label: 'Men',
    sub: [
      { label: 'Tops / Shirts',        items: ['T-Shirts', 'Polo Shirts', 'Dress Shirts', 'Casual Button-Downs', 'Sweaters', 'Hoodies', 'Sweatshirts'] },
      { label: 'Bottoms',              items: ['Jeans', 'Chinos', 'Dress Trousers', 'Khakis', 'Cargo Pants', 'Joggers', 'Track Pants', 'Shorts'] },
      { label: 'Outerwear',            items: ['Blazers', 'Suit Jackets', 'Denim Jackets', 'Bomber Jackets', 'Trench Coats', 'Raincoats', 'Vests'] },
      { label: 'Formal / Suits',       items: ['Tuxedos', '2-Piece Suits', '3-Piece Suits', 'Waistcoats'] },
      { label: 'Activewear',           items: ['Tracksuits', 'Athletic Shorts', 'Moisture-Wicking Shirts', 'Compression Wear'] },
      { label: 'Undergarments',        items: ['Boxers', 'Boxer Briefs', 'Briefs', 'Undershirts', 'Socks'] },
      { label: 'Sleepwear & Loungewear', items: ['Pajama Sets', 'Robes', 'Lounge Pants'] },
      { label: 'Swimwear',             items: ['Swim Trunks', 'Board Shorts', 'Rash Guards'] },
    ],
  },
  {
    label: 'Women',
    sub: [
      { label: 'Tops',                 items: ['Blouses', 'T-Shirts', 'Tank Tops', 'Sweaters', 'Cardigans', 'Button-Downs'] },
      { label: 'Bottoms',              items: ['Jeans', 'Trousers', 'Leggings', 'Skirts', 'Shorts'] },
      { label: 'Dresses & Jumpsuits',  items: ['Casual Dresses', 'Formal / Gowns', 'Jumpsuits', 'Rompers'] },
      { label: 'Outerwear',            items: ['Coats', 'Jackets', 'Blazers', 'Vests', 'Trench Coats'] },
      { label: 'Activewear',           items: ['Yoga Pants', 'Sports Bras', 'Tracksuits', 'Gym Tops'] },
      { label: 'Sleep & Lounge',       items: ['Pajamas', 'Robes', 'Loungewear Sets'] },
      { label: 'Intimates',            items: ['Bras', 'Underwear', 'Shapewear', 'Lingerie'] },
      { label: 'Swimwear',             items: ['Bikinis', 'One-Pieces', 'Cover-Ups'] },
    ],
  },
  {
    label: 'Kids',
    sub: [
      { label: 'Tops',       items: ['T-Shirts', 'Polo Shirts', 'Tank Tops', 'Blouses', 'Sweaters', 'Hoodies'] },
      { label: 'Bottoms',    items: ['Jeans', 'Leggings', 'Joggers', 'Trousers', 'Shorts', 'Skirts', 'Capris'] },
      { label: 'One-Pieces', items: ['Dresses', 'Rompers', 'Jumpsuits', 'Overalls'] },
    ],
  },
];

export default function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const subListRef  = useRef<HTMLDivElement>(null);

  // Which top-level category is open
  const [expanded, setExpanded] = useState<string | null>(null);
  // Which sub-category is open (works for Men and Women)
  const [subExpanded, setSubExpanded] = useState<string | null>(null);


  // Panel open/close
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (!overlay || !panel) return;

    if (open) {
      gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out', pointerEvents: 'auto' });
      gsap.fromTo(panel, { x: '-100%' }, { x: '0%', duration: 0.45, ease: 'power3.out' });
      const labels = panel.querySelectorAll('.cat-label');
      gsap.fromTo(labels,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', stagger: 0.08, delay: 0.25 }
      );
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', pointerEvents: 'none' });
      gsap.to(panel,   { x: '-100%', duration: 0.4, ease: 'power3.in' });
      setExpanded(null);
      setSubExpanded(null);
    }
  }, [open]);

  // Animate top-level sub-list
  useEffect(() => {
    const list = subListRef.current;
    if (!list) return;
    if (expanded) {
      gsap.fromTo(list,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power3.out' }
      );
      const items = list.querySelectorAll('.sub-item');
      gsap.fromTo(items,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out', stagger: 0.04, delay: 0.1 }
      );
    } else {
      gsap.to(list, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
    }
  }, [expanded]);

  const toggleCat = (label: string) => {
    setExpanded(prev => prev === label ? null : label);
    setSubExpanded(null);
  };

  const toggleSub = (label: string) => {
    setSubExpanded(prev => prev === label ? null : label);
  };

  const activeCat = CATEGORIES.find(c => c.label === expanded);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        style={{ opacity: 0, pointerEvents: 'none' }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 left-0 h-full w-full max-w-[360px] z-[70] bg-white flex flex-col"
        style={{ transform: 'translateX(-100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-end px-7 py-6 border-b border-black/6">
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <nav className="flex-1 overflow-y-auto px-7 pt-8 pb-6">

          {/* Horizontal category tabs */}
          <div className="flex items-center gap-6 border-b border-black/8 pb-5 mb-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat.label}
                onClick={() => toggleCat(cat.label)}
                className="cat-label flex items-center gap-1"
                style={{ opacity: 0 }}
              >
                <span
                  className="text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-200"
                  style={{ color: expanded === cat.label ? 'black' : 'rgba(0,0,0,0.38)' }}
                >
                  {cat.label}
                </span>
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  style={{
                    transform: expanded === cat.label ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    color: expanded === cat.label ? 'black' : 'rgba(0,0,0,0.38)',
                  }}
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>

          {/* Sub-list */}
          <div ref={subListRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
            {activeCat && (
              <ul className="flex flex-col">
                {activeCat.sub.map((item, i) => {
                  // Flat string item (Men / Kids)
                  if (typeof item === 'string') {
                    return (
                      <li key={item} className="sub-item border-b border-black/5" style={{ opacity: 0 }}>
                        <button className="w-full text-left py-3 px-1 text-sm font-medium text-black/65 hover:text-black hover:pl-3 transition-all duration-200">
                          {item}
                        </button>
                      </li>
                    );
                  }

                  // Nested sub-category (Women)
                  return (
                    <li key={item.label} className="sub-item border-b border-black/5" style={{ opacity: 0 }}>
                      {/* Sub-category header */}
                      <button
                        onClick={() => toggleSub(item.label)}
                        className="w-full flex items-center justify-between py-3 px-1 group"
                      >
                        <span
                          className="text-sm font-semibold transition-colors duration-200"
                          style={{ color: subExpanded === item.label ? 'black' : 'rgba(0,0,0,0.65)' }}
                        >
                          {item.label}
                        </span>
                        <svg
                          width="11" height="11" viewBox="0 0 12 12" fill="none"
                          style={{
                            transform: subExpanded === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.25s ease',
                            color: subExpanded === item.label ? 'black' : 'rgba(0,0,0,0.3)',
                          }}
                        >
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>

                      {/* Nested items */}
                      {subExpanded === item.label && (
                        <ul className="flex flex-col pl-3 pb-2">
                          {item.items.map(sub => (
                            <li key={sub}>
                              <button className="w-full text-left py-2 text-xs text-black/50 hover:text-black transition-colors duration-200">
                                {sub}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

        </nav>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-black/6" />
      </div>
    </>
  );
}
