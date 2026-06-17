import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, totalCount } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;
    if (open) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out', pointerEvents: 'auto' });
      gsap.to(drawerRef.current,  { x: 0,       duration: 0.45, ease: 'power3.out' });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', pointerEvents: 'none' });
      gsap.to(drawerRef.current,  { x: '100%',  duration: 0.4, ease: 'power3.in' });
    }
  }, [open]);

  const total = items.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace('$', '')) * item.qty;
  }, 0);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
        style={{ opacity: 0, pointerEvents: 'none' }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-[420px] z-[70] bg-white flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-black/8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">Your</p>
            <h2 className="text-xl font-black tracking-tight text-black">
              Cart {totalCount > 0 && <span className="text-gray-400 font-normal text-base">({totalCount})</span>}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors duration-200"
            aria-label="Close cart"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-20">
                <path d="M6 6h4l6 24h20l4-16H14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="20" cy="36" r="2" fill="black"/>
                <circle cx="32" cy="36" r="2" fill="black"/>
              </svg>
              <p className="text-sm text-gray-400 uppercase tracking-[0.3em]">Your cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.name}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: `rgba(${item.accent}, 0.05)`, border: `1px solid rgba(${item.accent}, 0.15)` }}
              >
                {/* Shirt thumbnail */}
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(${item.accent}, 0.1)` }}
                >
                  <img src={item.src} alt={item.name} className="h-12 w-auto object-contain" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: `rgba(${item.accent}, 1)` }}>
                    {item.color}
                  </p>
                  <p className="text-sm font-bold text-black truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-black text-black">{item.price}</span>
                    {item.qty > 1 && (
                      <span className="text-xs text-gray-400">× {item.qty}</span>
                    )}
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.name)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/8 transition-colors flex-shrink-0"
                  aria-label={`Remove ${item.name}`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1L11 11M11 1L1 11" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-7 border-t border-black/8">
            <div className="flex justify-between items-center mb-5">
              <span className="text-sm text-gray-400 uppercase tracking-[0.3em]">Total</span>
              <span className="text-2xl font-black text-black">${total.toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-black text-white text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-gray-900 transition-colors duration-300">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
