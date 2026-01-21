import React, { useRef, useState, useEffect } from 'react';
import { generatePartDescription } from '../services/geminiService';

const ShoeExplosion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activePart, setActivePart] = useState<string>('Overview');
  const [aiText, setAiText] = useState<string>("Scroll to analyze W.D.A architecture.");
  const [loading, setLoading] = useState(false);

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we are into the sticky section
      // Start slightly before 0 to prime it
      let percent = (windowHeight - top) / (height - windowHeight);
      
      // Clamp between 0 and 1
      percent = Math.max(0, Math.min(1, percent));
      setProgress(percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // AI Trigger logic based on scroll progress
  useEffect(() => {
    let part = 'Overview';
    if (progress > 0.1 && progress <= 0.4) part = 'Upper Weave';
    if (progress > 0.4 && progress <= 0.7) part = 'Zero-G Core';
    if (progress > 0.7) part = 'Traction Plate';

    if (part !== activePart) {
      setActivePart(part);
      fetchAiDescription(part);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, activePart]);

  const fetchAiDescription = async (part: string) => {
    setLoading(true);
    setAiText("Accessing Gemini Mainframe...");
    const text = await generatePartDescription(part);
    setAiText(text);
    setLoading(false);
  };

  // Styles based on progress
  // Top Layer (Laces/Tongue) moves UP significantly
  const topStyle = { transform: `translateY(-${progress * 250}px) translateZ(0)` };
  // Upper moves UP slightly
  const upperStyle = { transform: `translateY(-${progress * 120}px) translateZ(0)` };
  // Midsole stays roughly central but expands gaps
  const midStyle = { transform: `translateY(${progress * 50}px) translateZ(0)` };
  // Sole moves DOWN
  const soleStyle = { transform: `translateY(${progress * 200}px) translateZ(0)` };

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-dark-bg">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden">
        
        {/* Left Panel: Info */}
        <div className="absolute md:relative z-20 top-20 md:top-auto left-0 w-full md:w-1/3 px-8 text-left pointer-events-none md:pointer-events-auto">
          <div className="bg-black/50 backdrop-blur-md p-6 border-l-2 border-neon">
            <h3 className="text-neon font-mono text-xl mb-2">{activePart.toUpperCase()}</h3>
            <div className={`transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
              <p className="text-white text-lg leading-relaxed">{aiText}</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
               <span className="w-2 h-2 bg-neon rounded-full animate-pulse"></span>
               <span className="text-xs text-gray-500 font-mono">LIVE GEMINI DATA FEED</span>
            </div>
          </div>
        </div>

        {/* Center: The Shoe SVG */}
        <div className="w-full md:w-2/3 h-full flex items-center justify-center relative">
          <svg 
            viewBox="0 0 600 400" 
            className="w-full max-w-3xl h-auto drop-shadow-2xl filter"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="midsoleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#333" />
                <stop offset="50%" stopColor="#555" />
                <stop offset="100%" stopColor="#333" />
              </linearGradient>
            </defs>

            {/* Layer 4: Traction Plate (Sole) */}
            <g style={{ transition: 'transform 0.1s linear', ...soleStyle }}>
              <path 
                d="M50,300 Q150,310 250,300 T550,280 L540,320 Q250,350 50,330 Z" 
                fill="#1a1a1a" 
                stroke="#333" 
                strokeWidth="2"
              />
               {/* Tread details */}
               <path d="M70,325 L90,325 M120,328 L140,328 M450,310 L500,305" stroke="#ccff00" strokeWidth="4" opacity={progress} />
            </g>

            {/* Layer 3: Zero-G Core (Midsole) */}
            <g style={{ transition: 'transform 0.1s linear', ...midStyle }}>
              <path 
                d="M50,300 Q150,310 250,300 T550,280 L550,250 Q250,280 50,250 Z" 
                fill="url(#midsoleGradient)" 
              />
              {/* The Tech Glow */}
              <ellipse cx="300" cy="275" rx="100" ry="10" fill="#ccff00" filter="url(#neon-glow)" opacity={0.5 + (progress * 0.5)} />
              <text x="300" y="280" fontSize="10" fill="black" textAnchor="middle" opacity={progress} fontFamily="monospace">ANTIGRAVITY UNIT</text>
            </g>

            {/* Layer 2: Upper Weave */}
            <g style={{ transition: 'transform 0.1s linear', ...upperStyle }}>
              <path 
                d="M50,250 Q120,150 200,140 L350,140 Q500,160 550,250 L50,250 Z" 
                fill="#222" 
                stroke="#444" 
              />
              {/* Mesh pattern detail */}
              <path d="M200,140 Q250,200 300,240 M220,140 Q270,200 320,240" stroke="#333" fill="none" />
              <path d="M540,240 L450,180" stroke="#ccff00" strokeWidth="2" />
            </g>

            {/* Layer 1: Laces & Tongue */}
            <g style={{ transition: 'transform 0.1s linear', ...topStyle }}>
              <path 
                d="M180,140 L380,140 L360,100 Q280,90 200,100 Z" 
                fill="#111" 
                stroke="#333" 
              />
              {/* Laces */}
              <path 
                d="M220,140 L240,110 M250,140 L270,110 M280,140 L300,110" 
                stroke="#ccff00" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
            </g>

            {/* Connection Lines (appear when separated) */}
            <g opacity={progress}>
              <line x1="300" y1="140" x2="300" y2="250" stroke="#ccff00" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="300" y1="280" x2="300" y2="300" stroke="#ccff00" strokeWidth="1" strokeDasharray="4 4" />
            </g>

          </svg>
        </div>

        {/* Right Panel: Scroll Indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 h-64 w-1 bg-gray-800 rounded hidden md:block">
          <div 
            className="w-full bg-neon rounded transition-all duration-100"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoeExplosion;