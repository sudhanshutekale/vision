import React from 'react';
import { Camera, Cpu, CheckCircle2, ArrowRight, Sparkles, Layers } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Capture Any Waste Item',
      subtitle: 'Browser Camera or Drag & Drop',
      description: 'Point your smartphone camera or drop an image into the scanner. VisionSort processes high-resolution frames with zero app install required.',
      icon: Camera,
      badge: 'Step 1: Ingest',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      number: '02',
      title: 'Neural Material Classification',
      subtitle: 'Polymer & Resin Decomposition',
      description: 'Advanced vision models detect SPI recycling codes (PET #1, HDPE #2), fiber composition, and organic moisture signatures in under 1.5 seconds.',
      icon: Cpu,
      badge: 'Step 2: Inference',
      gradient: 'from-lime-400 to-emerald-500'
    },
    {
      number: '03',
      title: 'Act & Audit Real Carbon',
      subtitle: 'Color-Coded Routing & LCA Audit',
      description: 'Receive definitive municipal bin routing, vital preparation rules (rinse, separate caps), and watch your transparent EPA WARM carbon savings accumulate.',
      icon: CheckCircle2,
      badge: 'Step 3: Verification',
      gradient: 'from-sky-400 to-emerald-400'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-eco-surface/50 border-y border-emerald-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span>Intuitive 3-Stage Workflow</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How VisionSort Works
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            From raw camera snapshot to verified lifecycle carbon accounting in three seamless steps.
          </p>
        </div>

        {/* 3-Step Interactive Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Subtle connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/30 via-lime-500/30 to-sky-500/30 -translate-y-12 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="glass-card rounded-3xl p-7 border border-emerald-500/20 hover:border-emerald-500/40 relative z-10 space-y-5 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Header with Step Number & Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-extrabold text-slate-700/60 group-hover:text-emerald-500/40 transition-colors">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {step.badge}
                  </span>
                </div>

                {/* Glowing Icon Container */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} p-0.5 shadow-glow-sm group-hover:scale-105 transition-transform`}>
                  <div className="w-full h-full bg-eco-bg rounded-[14px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-emerald-300 transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono text-lime-400">
                    {step.subtitle}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
