/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collection from './components/Collection';
import ShirtBanner from './components/ShirtBanner';
import SignatureOutfits from './components/SignatureOutfits';
import Instagram from './components/Instagram';
import DualElegance from './components/DualElegance';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';

export default function App() {
  return (
    <CartProvider>
      <SearchProvider>
      <SmoothScroll>
        <main className="relative bg-white min-h-screen text-black">
          <Navbar />
          <Hero />

          <div
            className="relative w-full overflow-hidden"
            style={{ height: '18vh' }}
          >
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(82, 142, 95, 0.18)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, #ffffff 100%)' }} />
          </div>

          <Collection />
          <ShirtBanner />
          <SignatureOutfits />
          <Instagram />
          <DualElegance />
          <Footer />
        </main>
      </SmoothScroll>
      </SearchProvider>
    </CartProvider>
  );
}
