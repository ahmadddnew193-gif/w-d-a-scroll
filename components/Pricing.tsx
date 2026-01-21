import React from 'react';

const PricingCard: React.FC<{ title: string; price: string; features: string[]; highlight?: boolean }> = ({ title, price, features, highlight }) => (
  <div className={`p-8 rounded-2xl border transition-transform hover:scale-105 ${highlight ? 'bg-panel-bg border-neon shadow-[0_0_20px_rgba(204,255,0,0.2)]' : 'bg-transparent border-gray-800'}`}>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <div className="text-4xl font-black text-white mb-6">{price}</div>
    <ul className="space-y-3 mb-8">
      {features.map((f, i) => (
        <li key={i} className="flex items-center text-gray-400">
          <svg className="w-4 h-4 mr-2 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {f}
        </li>
      ))}
    </ul>
    <button className={`w-full py-3 rounded font-bold tracking-wider ${highlight ? 'bg-neon text-black hover:bg-neon-hover' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
      PRE-ORDER
    </button>
  </div>
);

const Pricing: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">ACQUIRE THE TECH</h2>
          <p className="text-gray-400">Select your gravity configuration.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard 
            title="STANDARD ISSUE" 
            price="$299" 
            features={["Zero-G Foam Core", "Carbon Fiber Shank", "Standard Lacing", "1 Year Warranty"]} 
          />
          <PricingCard 
            title="PROTOTYPE X" 
            price="$499" 
            features={["Active Levitation", "Neural Interface", "Self-Lacing System", "Lifetime Updates"]} 
            highlight={true} 
          />
          <PricingCard 
            title="COLLECTOR" 
            price="$899" 
            features={["Titanium Chassis", "NFT Ownership", "Private Club Access", "Signed by Designer"]} 
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;