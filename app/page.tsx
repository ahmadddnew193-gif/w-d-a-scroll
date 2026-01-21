import ShoeScroll from "@/components/ShoeScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <ShoeScroll />

      {/* Content Section - Pricing & CTA */}
      <div className="relative z-10 bg-[#0c0c0c] text-white py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-32">

          {/* Pricing Section */}
          <section id="pricing" className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Engineered for everyone.</h2>
              <p className="text-white/60 text-lg">Choose the perfect configuration for your workflow.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Standard */}
              <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors">
                <div className="space-y-2 mb-6">
                  <h3 className="text-xl font-bold">Standard Edition</h3>
                  <div className="text-3xl font-bold">$199</div>
                  <p className="text-sm text-white/50">Core essentials.</p>
                </div>
                <ul className="space-y-3 text-sm text-white/70 mb-8 list-none">
                  <li className="flex gap-2">✓ <span>Precision Machined Body</span></li>
                  <li className="flex gap-2">✓ <span>Custom Switches</span></li>
                  <li className="flex gap-2">✓ <span>White Backlight</span></li>
                </ul>
                <button className="w-full py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                  Pre-order Standard
                </button>
              </div>

              {/* Pro */}
              <div className="p-8 rounded-2xl border border-white/20 bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                <div className="space-y-2 mb-6">
                  <h3 className="text-xl font-bold">Pro Edition</h3>
                  <div className="text-3xl font-bold">$299</div>
                  <p className="text-sm text-white/50">Ultimate performance.</p>
                </div>
                <ul className="space-y-3 text-sm text-white/70 mb-8 list-none">
                  <li className="flex gap-2">✓ <span>Aerospace Grade Aluminum</span></li>
                  <li className="flex gap-2">✓ <span>Hot-Swappable PCB</span></li>
                  <li className="flex gap-2">✓ <span>RGB Per-Key Lighting</span></li>
                  <li className="flex gap-2">✓ <span>Wireless / Bluetooth 5.0</span></li>
                </ul>
                <button className="w-full py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors">
                  Pre-order Pro
                </button>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-8 py-12 rounded-3xl bg-neutral-900/50 border border-white/5">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Ready to upgrade?</h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              Join thousands of developers crafting their best work on WpDev hardware. Limited batch available for pre-order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform">
                Get Started Now
              </button>
              <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors">
                View Specs
              </button>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
