import React from 'react';
import { AlertCircle, Flame, BatteryCharging, Factory, TrendingUp, Sparkles } from 'lucide-react';

export default function WhySortingMatters() {
  const stats = [
    {
      figure: '91%',
      label: 'Unrecycled Plastic',
      headline: 'The Global Polymer Crisis',
      detail: 'Of the 8.3 billion metric tons of virgin plastic manufactured to date, only 9% has ever been recycled. Sorting clean PET and HDPE prevents microplastic fragmentation.',
      badge: 'Ocean & Landfill Risk',
      color: 'text-sky-400',
      border: 'border-sky-500/30',
      bgGlow: 'bg-sky-500/10'
    },
    {
      figure: '28x',
      label: 'More Potent than CO₂',
      headline: 'Landfill Methane Trap',
      detail: 'When food scraps decompose in oxygen-deprived landfills, they emit massive volumes of methane (CH₄). Aerobic composting converts that biomass into organic soil humus.',
      badge: 'Short-Lived Climate Pollutant',
      color: 'text-lime-400',
      border: 'border-lime-500/30',
      bgGlow: 'bg-lime-500/10'
    },
    {
      figure: '95%',
      label: 'Energy Saved on Aluminum',
      headline: 'Infinite Circular Metals',
      detail: 'Remelting an aluminum can uses only 5% of the energy needed to mine virgin bauxite ore. That single can can be recycled, filled, and returned to store shelves in 60 days.',
      badge: 'Zero Quality Loss',
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bgGlow: 'bg-amber-500/10'
    },
    {
      figure: '70%',
      label: 'Heavy Metal Toxicity',
      headline: 'Hidden E-Waste Hazards',
      detail: 'Electronics and spent batteries account for just 2% of municipal solid waste volume, yet represent over 70% of toxic lead, cadmium, and lithium leaching into aquifers.',
      badge: 'Groundwater Threat',
      color: 'text-red-400',
      border: 'border-red-500/30',
      bgGlow: 'bg-red-500/10'
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-lime-400" />
            <span>The Science of Circular Waste</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Precision Sorting Matters
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Contamination is the #1 reason municipal recycling trucks are rejected and diverted to incinerators. Proper identification changes the math completely.
          </p>
        </div>

        {/* 4 Compelling Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`glass-card rounded-3xl p-6 sm:p-7 border ${item.border} relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Radial glow backdrop */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${item.bgGlow} rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none`} />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-slate-300 uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <div className={`font-display text-4xl sm:text-5xl font-black tracking-tight ${item.color}`}>
                    {item.figure}
                  </div>
                  <div className="text-xs font-mono font-medium text-slate-300 mt-0.5">
                    {item.label}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <h3 className="font-display font-bold text-base text-white">
                    {item.headline}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {item.detail}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>Verified IPCC/EPA Data</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
