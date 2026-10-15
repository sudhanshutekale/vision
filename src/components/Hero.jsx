import React from 'react';
import { ArrowDown, Scan, Sparkles, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onTryClick }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-lime-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Pill Announcement */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium shadow-glow-sm">
              <span className="flex h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
              <span>Next-Gen Computer Vision & LCA Modeling</span>
            </div>

            {/* Bold Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Point. Snap.{' '}
              <span className="text-gradient-emerald">
                Sort.
              </span>
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Transform your camera into an AI waste auditor. Instantly identify packaging materials, receive certified color-coded bin guidance, and uncover transparent, verifiable carbon and water savings.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onTryClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-bold text-base shadow-glow hover:shadow-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Scan className="w-5 h-5" />
                <span>Try VisionSort Live</span>
              </button>

              <a
                href="#assumptions"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl border border-emerald-500/30 bg-eco-surface/60 hover:bg-emerald-950/40 text-slate-200 hover:text-white font-medium text-base transition-all duration-200"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>View Assumptions</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-emerald-500/15 flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>EPA WARM v15 Methodology</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-lime-400" />
                <span>Sub-second Detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Zero Contamination Routing</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Animated Phone & Scanner Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Phone Container */}
            <div className="relative w-[280px] sm:w-[320px] rounded-[42px] p-3.5 bg-gradient-to-b from-slate-700/60 via-slate-800/80 to-slate-900 border-2 border-slate-600/50 shadow-2xl shadow-emerald-950/40">
              
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/60 animate-pulse" />
              </div>

              {/* Phone Screen Area */}
              <div className="relative w-full h-[520px] rounded-[32px] overflow-hidden bg-eco-darkest border border-slate-800 flex flex-col justify-between p-4">
                
                {/* Background Waste Item Sample with realistic lighting */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1562077772-3b12ab8ba990?w=600&auto=format&fit=crop&q=80"
                    alt="Scanner demo item"
                    className="w-full h-full object-cover opacity-80 filter brightness-95"
                  />
                  {/* Subtle dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-eco-darkest via-transparent to-eco-darkest/70" />
                </div>

                {/* Animated Laser Scanning Beam */}
                <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-10">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10e283] animate-scan" />
                </div>

                {/* Reticle / Bounding Box Overlay */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-48 h-56 border border-emerald-400/40 rounded-xl pointer-events-none z-10 flex flex-col justify-between p-2">
                  {/* Four Corner Brackets */}
                  <div className="flex justify-between">
                    <span className="w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                    <span className="w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                  </div>
                  <div className="flex justify-between">
                    <span className="w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                    <span className="w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
                  </div>
                </div>

                {/* Top Phone HUD */}
                <div className="relative z-20 flex items-center justify-between pt-5 text-[10px] font-mono text-emerald-300">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-emerald-500/30">
                    OPTICAL 4K
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
                    <span>TRACKING</span>
                  </span>
                </div>

                {/* Bottom Result HUD Card */}
                <div className="relative z-20 glass-card p-3.5 rounded-2xl border border-emerald-400/40 shadow-glow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Detected Object</div>
                      <div className="text-sm font-bold text-white">PET Water Bottle</div>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-blue-600/90 text-white font-bold text-[11px] shadow-sm flex items-center space-x-1">
                      <span>Blue Bin</span>
                    </span>
                  </div>

                  <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-lime-400 h-1.5 rounded-full w-[98.7%]" />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                    <span>Conf: 98.7%</span>
                    <span className="text-lime-400 font-semibold">-63g CO₂e avoided</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Info Pill 1 */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -left-6 sm:-left-12 glass-panel p-3 rounded-2xl shadow-glow-sm border border-emerald-500/30 hidden sm:flex items-center space-x-3 text-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">
                ♻️
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400">Recycling Stream</div>
                <div className="font-semibold text-white">Single-Stream Curbside</div>
              </div>
            </motion.div>

            {/* Floating Info Pill 2 */}
            <motion.div 
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 sm:-right-8 glass-panel p-3 rounded-2xl shadow-glow-lime border border-lime-500/30 hidden sm:flex items-center space-x-3 text-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-lime-500/20 border border-lime-500/40 flex items-center justify-center text-lime-400 font-bold">
                🌱
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400">Net LCA Impact</div>
                <div className="font-semibold text-lime-300">3.8L Water Conserved</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
