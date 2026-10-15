import React from 'react';
import { Leaf, ArrowUp, Award } from 'lucide-react';

export default function Footer({ onScrollTop }) {
  return (
    <footer className="border-t border-emerald-500/20 bg-eco-darkest text-slate-400 text-xs py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-500 p-0.5">
                <div className="w-full h-full bg-eco-bg rounded-[10px] flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Vision<span className="text-emerald-400">Sort</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Empowering consumers and municipalities with instant AI material classification, zero-contamination routing, and transparent Life Cycle Assessment (LCA) environmental accounting.
            </p>

            <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400">
              <Award className="w-4 h-4 text-lime-400" />
              <span>Built for the ClimateTech AI Innovation Hackathon</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold">
              Platform
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#demo" className="hover:text-emerald-400 transition-colors">AI Optical Scanner</a></li>
              <li><a href="#assumptions" className="hover:text-emerald-400 transition-colors">LCA Assumptions Math</a></li>
              <li><a href="#impact" className="hover:text-emerald-400 transition-colors">Impact Dashboard</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Scientific Sources */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold">
              Methodology & Data
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a 
                  href="https://www.epa.gov/warm" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  EPA WARM v15 Documentation ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://plasticsrecycling.org/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  APR Postconsumer Resin LCA ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ipcc.ch/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  IPCC Solid Waste Guidelines ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://drawdown.org/solutions/composting" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  Project Drawdown: Composting ↗
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-300 text-xs flex items-center space-x-1">
            <span>Crafted by</span>
            <strong className="text-white">Rohit & The VisionSort Engineering Team</strong>
            <span>for the ClimateTech AI Hackathon.</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onScrollTop}
              className="p-2.5 rounded-xl border border-emerald-500/20 bg-eco-surface hover:bg-emerald-950/40 text-slate-400 hover:text-emerald-400 transition-all flex items-center space-x-1"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[11px] font-mono">Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
