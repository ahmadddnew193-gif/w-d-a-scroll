import React from 'react';
import Hero from './components/Hero';
import ShoeExplosion from './components/ShoeExplosion';
import Pricing from './components/Pricing';
import CTA from './components/CTA';

const App: React.FC = () => {
  return (
    <main className="bg-black text-white min-h-screen selection:bg-neon selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-black tracking-tighter">W.D.A</div>
        <div className="hidden md:flex gap-6 text-sm font-mono text-gray-300">
          <span>MODELS</span>
          <span>TECH</span>
          <span>LABS</span>
        </div>
        <button className="border border-white px-4 py-1 text-xs font-bold hover:bg-white hover:text-black transition-colors">
          CART (0)
        </button>
      </nav>

      <Hero />
      <ShoeExplosion />
      <Pricing />
      <CTA />
      
      <footer className="py-8 text-center text-gray-800 text-sm">
        &copy; {new Date().getFullYear()} W.D.A INDUSTRIES. ENGINEERED FOR FLIGHT.
      </footer>
    </main>
  );
};

export default App;