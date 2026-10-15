import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WasteScanner from './components/WasteScanner';
import EnvironmentalImpact from './components/EnvironmentalImpact';
import ImpactDashboard from './components/ImpactDashboard';
import HowItWorks from './components/HowItWorks';
import WhySortingMatters from './components/WhySortingMatters';
import ApiKeyModal from './components/ApiKeyModal';
import Footer from './components/Footer';
import { SAMPLE_ITEMS, INITIAL_USER_HISTORY } from './data/sampleItems';

export default function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('visionsort_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Sound effects mute state
  const [soundMuted, setSoundMuted] = useState(false);

  // API modal state
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('visionsort_gemini_key') || '';
  });

  // User sorting history (persisted in localStorage)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('visionsort_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USER_HISTORY;
      }
    }
    return INITIAL_USER_HISTORY;
  });

  // Current active scanned item
  const [activeItem, setActiveItem] = useState(SAMPLE_ITEMS[0]);

  // Synchronize HTML dark/light class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('visionsort_theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('visionsort_theme', 'light');
    }
  }, [darkMode]);

  // Persist history changes
  useEffect(() => {
    localStorage.setItem('visionsort_history', JSON.stringify(history));
  }, [history]);

  const handleSortComplete = (scannedItem) => {
    setActiveItem(scannedItem);
    const newEntry = {
      id: `sort-${Date.now()}`,
      name: scannedItem.name,
      category: scannedItem.category,
      binType: scannedItem.bin?.type || 'blue',
      co2SavedKg: scannedItem.impact?.co2SavedKg || 0.063,
      waterSavedLiters: scannedItem.impact?.waterSavedLiters || 3.8,
      energySavedKwh: scannedItem.impact?.energySavedKwh || 0.38,
      timestamp: 'Just now'
    };
    setHistory(prev => [newEntry, ...prev]);
  };

  const handleResetHistory = () => {
    if (window.confirm('Reset your personal sorting log?')) {
      setHistory([]);
      localStorage.removeItem('visionsort_history');
    }
  };

  const handleAddSampleHistory = () => {
    const randomSample = SAMPLE_ITEMS[Math.floor(Math.random() * SAMPLE_ITEMS.length)];
    const mockEntry = {
      id: `sample-${Date.now()}`,
      name: randomSample.name,
      category: randomSample.category,
      binType: randomSample.bin.type,
      co2SavedKg: randomSample.impact.co2SavedKg,
      waterSavedLiters: randomSample.impact.waterSavedLiters,
      energySavedKwh: randomSample.impact.energySavedKwh,
      timestamp: 'Just now'
    };
    setHistory(prev => [mockEntry, ...prev]);
  };

  const handleSaveApiKey = (key) => {
    setGeminiApiKey(key);
    if (key) {
      localStorage.setItem('visionsort_gemini_key', key);
    } else {
      localStorage.removeItem('visionsort_gemini_key');
    }
  };

  const scrollToDemo = () => {
    const elem = document.getElementById('demo');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-eco-bg text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      
      {/* Top sticky navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
        openApiModal={() => setApiModalOpen(true)}
        sortedCount={history.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 1. Hero Section with Scanner Mockup */}
        <Hero onTryClick={scrollToDemo} />

        {/* 2. Centerpiece Live Demo Scanner */}
        <WasteScanner onSortComplete={handleSortComplete} />

        {/* 3. Environmental Impact Panel with Assumptions Accordion */}
        <EnvironmentalImpact activeItem={activeItem} />

        {/* 4. My Impact Dashboard with Recharts & Badges */}
        <ImpactDashboard 
          history={history}
          onResetHistory={handleResetHistory}
          onAddSampleHistory={handleAddSampleHistory}
        />

        {/* 5. How It Works: 3-step timeline */}
        <HowItWorks />

        {/* 6. Why Sorting Matters: 4 compelling stat cards */}
        <WhySortingMatters />

      </main>

      {/* 7. Footer with Hackathon & Team Credits */}
      <Footer onScrollTop={scrollToTop} />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
        onSaveKey={handleSaveApiKey}
        currentKey={geminiApiKey}
      />

    </div>
  );
}
