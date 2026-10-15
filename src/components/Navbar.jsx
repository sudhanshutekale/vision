import React from 'react';
import { Leaf, Sun, Moon, Volume2, VolumeX, Key, Sparkles, BarChart3, Scan, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({
  darkMode,
  setDarkMode,
  soundMuted,
  setSoundMuted,
  openApiModal,
  sortedCount = 0
}) {
  const toggleSound = () => {
    const nextState = !soundMuted;
    setSoundMuted(nextState);
    sound.muted = nextState;
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-eco-bg/85 dark:bg-eco-bg/85 border-b border-eco-emerald/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-500 p-0.5 shadow-glow-sm transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-eco-bg rounded-[10px] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-emerald-400 group-hover:text-lime-300 transition-colors" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white dark:text-white light:text-slate-900 group-hover:text-emerald-400 transition-colors">
                Vision<span className="text-emerald-400">Sort</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                AI Waste Core
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans hidden sm:block">Intelligent Material Sorting & LCA</p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
          <a href="#demo" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
            <Scan className="w-4 h-4 text-emerald-400" />
            <span>AI Scanner</span>
          </a>
          <a href="#impact" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
            <BarChart3 className="w-4 h-4 text-lime-400" />
            <span>My Impact</span>
          </a>
          <a href="#how-it-works" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            <span>How It Works</span>
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Live item badge */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-300 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
            <span>{sortedCount} Sorted</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className="p-2 sm:p-2.5 rounded-xl border border-emerald-500/20 bg-eco-surface/80 hover:bg-emerald-950/50 text-slate-300 hover:text-emerald-300 transition-all"
            title={soundMuted ? "Unmute audio feedback" : "Mute audio feedback"}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={openApiModal}
            aria-label="API Settings"
            className="flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-emerald-500/20 bg-eco-surface/80 hover:bg-emerald-950/50 text-slate-300 hover:text-emerald-300 transition-all text-xs font-mono"
            title="Configure Gemini Vision API key or view engine mode"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Vision API</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark/Light Mode"
            className="p-2 sm:p-2.5 rounded-xl border border-emerald-500/20 bg-eco-surface/80 hover:bg-emerald-950/50 text-slate-300 hover:text-emerald-300 transition-all"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-300 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Quick CTA */}
          <a
            href="#demo"
            className="hidden lg:inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-slate-950 font-semibold text-xs tracking-wide shadow-glow-sm hover:shadow-glow transition-all"
          >
            <span>Scan Waste</span>
          </a>

        </div>
      </div>
    </header>
  );
}
