import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black z-0"></div>
      
      <div className="z-10 text-center px-4">
        <h2 className="text-neon tracking-widest text-sm mb-4 font-mono animate-pulse">PROJECT W.D.A</h2>
        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-6">
          WALK <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800">DEFYING</span> <br/>
          AIR
        </h1>
        <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg">
          The first gravity-neutral footwear powered by Gemini intelligence.
        </p>
        
        <div className="animate-bounce mt-10">
          <svg className="w-6 h-6 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs text-neon font-mono mt-2 block">INITIATE DISASSEMBLY</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;