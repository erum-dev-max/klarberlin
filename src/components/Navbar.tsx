import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import CartDrawer from './CartDrawer';
import MenuDrawer from './MenuDrawer';

export default function Navbar() {
  const lettersRef   = useRef<(HTMLSpanElement | null)[]>([]);
  const inputRef     = useRef<HTMLInputElement>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null);

  // Two words — letters animated individually
  const word1 = 'KLAR';
  const word2 = 'BERLIN';

  const { totalCount } = useCart();
  const { query, setQuery } = useSearch();

  const [cartOpen,   setCartOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The Hero section is 100vh. Change color to black just before it clears the hero.
      if (window.scrollY > window.innerHeight - 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Letter-by-letter reveal — K, L, A, R … B, E, R, L, I, N
  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    gsap.set(letters, { opacity: 0, y: 10 });
    gsap.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power3.out',
      stagger: 0.1,   // 100ms between each letter
      delay: 0.4,
    });
  }, []);

  // Animate search bar open / close
  useEffect(() => {
    const wrap = inputWrapRef.current;
    if (!wrap) return;
    if (searchOpen) {
      gsap.to(wrap, { width: 220, opacity: 1, duration: 0.35, ease: 'power3.out' });
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      gsap.to(wrap, { width: 0, opacity: 0, duration: 0.3, ease: 'power3.in' });
      setQuery('');
    }
  }, [searchOpen, setQuery]);

  const toggleSearch = () => setSearchOpen(v => !v);
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setSearchOpen(false);
  };

  const textColorClass = isScrolled ? 'text-black' : 'text-white';
  const bgColorClass = isScrolled ? 'bg-black' : 'bg-white';
  const borderColorClass = isScrolled 
    ? 'border-black/30 focus:border-black placeholder-black/30' 
    : 'border-white/30 focus:border-white placeholder-white/30';
  const badgeClass = isScrolled ? 'bg-black text-white' : 'bg-white text-black';

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 h-20 transition-colors duration-300"
        style={{ backgroundColor: 'transparent' }}
      >
        {/* Left side — hamburger */}
        <div className="absolute inset-y-0 left-0 flex items-center px-8 md:px-16">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[5px] group"
            aria-label="Open menu"
          >
            <span className={`block w-6 h-[1.5px] ${bgColorClass} group-hover:opacity-50 transition-all duration-300`} />
            <span className={`block w-4 h-[1.5px] ${bgColorClass} group-hover:opacity-50 transition-all duration-300`} />
            <span className={`block w-6 h-[1.5px] ${bgColorClass} group-hover:opacity-50 transition-all duration-300`} />
          </button>
        </div>

        {/* Brand name — absolutely centered, always visible */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center pointer-events-auto cursor-default select-none"
            style={{ gap: '0.55em' }}
          >
            {/* KLAR */}
            <div className="flex">
              {word1.split('').map((char, i) => (
                <span
                  key={`w1-${i}`}
                  ref={el => { lettersRef.current[i] = el; }}
                  className={`inline-block font-black ${textColorClass} text-xl md:text-2xl transition-colors duration-300`}
                  style={{
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    paddingLeft: i === 0 ? '0.14em' : undefined,
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* BERLIN */}
            <div className="flex">
              {word2.split('').map((char, i) => (
                <span
                  key={`w2-${i}`}
                  ref={el => { lettersRef.current[word1.length + i] = el; }}
                  className={`inline-block font-black ${textColorClass} text-xl md:text-2xl transition-colors duration-300`}
                  style={{
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    paddingLeft: i === 0 ? '0.14em' : undefined,
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right side — search + cart */}
        <div className="absolute inset-y-0 right-0 flex items-center gap-4 px-8 md:px-16">

          {/* Search */}
          <div className="flex items-center gap-2">
            <div ref={inputWrapRef} className="overflow-hidden" style={{ width: 0, opacity: 0 }}>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Search name or color…"
                className={`bg-transparent border-b ${borderColorClass} ${textColorClass} outline-none text-sm pb-0.5 transition-all duration-300`}
                style={{ width: '220px' }}
                aria-label="Search products"
              />
            </div>
            <button
              onClick={toggleSearch}
              className="flex items-center justify-center group"
              aria-label={searchOpen ? 'Close search' : 'Open search'}
            >
              {searchOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                  className={`${textColorClass} group-hover:opacity-50 transition-colors duration-300`}>
                  <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  className={`${textColorClass} group-hover:opacity-50 transition-colors duration-300`}>
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center group"
            aria-label="Open cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              className={`${textColorClass} group-hover:opacity-50 transition-colors duration-300`}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {totalCount > 0 && (
              <span className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full ${badgeClass} text-[9px] font-black flex items-center justify-center transition-colors duration-300`}>
                {totalCount}
              </span>
            )}
          </button>

        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
