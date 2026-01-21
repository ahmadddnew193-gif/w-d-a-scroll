import React, { useState } from 'react';

const CTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => {
        setEmail('');
        setStatus('idle');
    }, 3000);
  };

  return (
    <section className="py-32 px-4 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50 pointer-events-none"></div>
      
      <div className="max-w-xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">JOIN THE WAITING LIST</h2>
        <p className="text-gray-400 mb-8">
          Production is strictly limited. Enter your email to secure your pair of W.D.A Antigravity units before public release.
        </p>
        
        {status === 'success' ? (
          <div className="p-4 bg-neon/10 border border-neon text-neon rounded">
            You are on the list. Prepare for lift-off.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              required
              placeholder="ENTER EMAIL ADDRESS" 
              className="flex-1 bg-gray-900 border border-gray-800 text-white px-6 py-4 rounded focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-neon text-black font-bold px-8 py-4 rounded hover:bg-neon-hover transition-colors whitespace-nowrap"
            >
              SECURE ACCESS
            </button>
          </form>
        )}
        
        <p className="mt-6 text-xs text-gray-600">
          By subscribing, you agree to our Terms of Antigravity Service.
        </p>
      </div>
    </section>
  );
};

export default CTA;