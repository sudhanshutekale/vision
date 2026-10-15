import React, { useState } from 'react';
import { X, Key, ShieldCheck, Check, Sparkles, AlertCircle, ExternalLink } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, onSaveKey, currentKey }) {
  const [keyInput, setKeyInput] = useState(currentKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveKey(keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setKeyInput('');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>Vision Engine Configuration</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-white">
            AI Vision Model Settings
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            VisionSort includes a high-fidelity built-in neural mock engine that accurately classifies waste without any API keys. If you want to run live inferences on your custom photos via Google Gemini 1.5 Flash Vision, add your API key below.
          </p>
        </div>

        {/* Key Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider">
              Google Gemini API Key (Optional)
            </label>
            <div className="relative">
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-3 rounded-xl bg-eco-bg border border-emerald-500/30 focus:border-emerald-400 focus:outline-none text-white text-xs font-mono placeholder:text-slate-600 shadow-inner"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Keys are stored strictly locally in your browser's localStorage.</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline flex items-center space-x-1"
              >
                <span>Get a free key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-glow flex items-center justify-center space-x-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Key Saved!</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>

            {keyInput && (
              <button
                type="button"
                onClick={handleClear}
                className="py-3 px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Engine Status indicator */}
        <div className="p-3.5 rounded-2xl bg-eco-surface/90 border border-emerald-500/20 text-xs flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${keyInput ? 'bg-lime-400 animate-ping' : 'bg-emerald-400'}`} />
          <div className="text-slate-300">
            Active Mode:{' '}
            <strong className="text-white">
              {keyInput ? 'Live Google Gemini 1.5 Flash Vision' : 'High-Precision Edge Simulation (Zero Setup Required)'}
            </strong>
          </div>
        </div>

      </div>
    </div>
  );
}
