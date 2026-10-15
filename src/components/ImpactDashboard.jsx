import React from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend 
} from 'recharts';
import { 
  Trophy, Award, Flame, Sparkles, Car, TreePine, Lightbulb, 
  Smartphone, RotateCcw, PlusCircle, CheckCircle2, ShieldCheck 
} from 'lucide-react';
import { BADGES_LIST } from '../data/sampleItems';

const CATEGORY_COLORS = {
  Plastic: '#38bdf8',
  Organic: '#10b981',
  Paper: '#f59e0b',
  Glass: '#34d399',
  Hazardous: '#ef4444',
  'E-waste': '#a855f7',
  Metal: '#94a3b8'
};

export default function ImpactDashboard({ 
  history, 
  onResetHistory, 
  onAddSampleHistory 
}) {
  // Aggregate stats from history
  const totalItems = history.length;
  const totalCo2SavedKg = history.reduce((acc, item) => acc + (item.co2SavedKg || 0.05), 0);
  const totalWaterSavedLiters = history.reduce((acc, item) => acc + (item.waterSavedLiters || 2.5), 0);
  const totalEnergySavedKwh = history.reduce((acc, item) => acc + (item.energySavedKwh || 0.3), 0);

  // Equivalencies
  const treesEquiv = ((totalCo2SavedKg / 21) * 365).toFixed(1); // tree-days
  const kmAvoided = (totalCo2SavedKg * 4.2).toFixed(1); // average 120g CO2/km gas car
  const ledHours = (totalEnergySavedKwh * 100).toFixed(0); // 10W LED bulb
  const phoneCharges = (totalEnergySavedKwh / 0.012).toFixed(0); // 12Wh phone battery

  // Prepare Category breakdown for Recharts Pie Chart
  const categoryCountMap = {};
  history.forEach(item => {
    const cat = item.category || 'Other';
    categoryCountMap[cat] = (categoryCountMap[cat] || 0) + 1;
  });

  const pieData = Object.keys(categoryCountMap).map(cat => ({
    name: cat,
    value: categoryCountMap[cat],
    color: CATEGORY_COLORS[cat] || '#10b981'
  }));

  // Prepare weekly timeline data for Bar Chart
  const weeklyData = [
    { day: 'Mon', items: 2, co2: 0.18 },
    { day: 'Tue', items: 3, co2: 0.34 },
    { day: 'Wed', items: 1, co2: 0.12 },
    { day: 'Thu', items: 4, co2: 0.52 },
    { day: 'Fri', items: 2, co2: 0.22 },
    { day: 'Sat', items: 3, co2: 0.41 },
    { day: 'Today', items: Math.max(1, totalItems % 5), co2: +(totalCo2SavedKg * 0.4).toFixed(2) }
  ];

  return (
    <section id="impact" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Trophy className="w-3.5 h-3.5 text-lime-400" />
              <span>Personal Environmental Ledger</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              My Impact Dashboard
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Track your cumulative sorting history, circular material breakdown, streak badges, and tangible everyday climate equivalents.
            </p>
          </div>

          {/* Quick Demo Controls */}
          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={onAddSampleHistory}
              className="px-3.5 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 transition-colors flex items-center space-x-1.5"
              title="Add mock items to quickly test charts"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Add Demo Items</span>
            </button>
            <button
              onClick={onResetHistory}
              className="px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors flex items-center space-x-1.5"
              title="Reset sorting log"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Top 4 Cumulative Scorecards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="glass-card rounded-2xl p-5 border border-emerald-500/20">
            <div className="text-[11px] font-mono uppercase text-slate-400">Total Sorted</div>
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
              {totalItems}
            </div>
            <div className="text-xs text-emerald-400 mt-1 flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Active Sorting Streak: 5 Days</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-emerald-500/20">
            <div className="text-[11px] font-mono uppercase text-slate-400">Total CO₂e Saved</div>
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-lime-400 mt-1">
              {totalCo2SavedKg.toFixed(2)} <span className="text-sm font-mono text-slate-300">kg</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Equal to {(totalCo2SavedKg * 1000).toFixed(0)}g net GHG abatement
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-emerald-500/20">
            <div className="text-[11px] font-mono uppercase text-slate-400">Water Conserved</div>
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-sky-400 mt-1">
              {totalWaterSavedLiters.toFixed(1)} <span className="text-sm font-mono text-slate-300">L</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Freshwater saved across supply chains
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-emerald-500/20">
            <div className="text-[11px] font-mono uppercase text-slate-400">Energy Preserved</div>
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-amber-400 mt-1">
              {totalEnergySavedKwh.toFixed(2)} <span className="text-sm font-mono text-slate-300">kWh</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Displacing fossil grid load
            </div>
          </div>

        </div>

        {/* Charts Grid: Recharts Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Material Category Breakdown Pie / Donut (5 Cols) */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-emerald-500/25 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Materials Diverted</h3>
                <p className="text-xs text-slate-400">Distribution by circular waste category</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                {pieData.length} Streams
              </span>
            </div>

            <div className="h-64 relative flex items-center justify-center">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      stroke="rgba(8, 26, 17, 0.8)"
                      strokeWidth={3}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0c2317', 
                        borderColor: '#10b981', 
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '12px'
                      }}
                      itemStyle={{ color: '#ffffff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-xs text-slate-400">No items logged yet. Scan an item above!</div>
              )}
            </div>

            {/* Custom Legend Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-emerald-500/15">
              {pieData.map(item => (
                <div 
                  key={item.name} 
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-eco-surface/80 border border-emerald-500/10 text-xs"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 font-medium">{item.name}</span>
                  <span className="font-mono text-slate-400">({item.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Emissions Avoided Bar Chart (7 Cols) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-emerald-500/25 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Cumulative Carbon Savings</h3>
                <p className="text-xs text-slate-400">Kilograms of CO₂e displaced per day</p>
              </div>
              <span className="text-xs font-mono text-lime-400 bg-lime-500/10 px-2 py-0.5 rounded">
                WARM v15 Model
              </span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="day" 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false}
                    tickFormatter={(val) => `${val}kg`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0c2317', 
                      borderColor: '#10b981', 
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '12px'
                    }}
                    formatter={(val) => [`${val} kg CO₂e saved`, 'Avoided GHG']}
                  />
                  <Bar 
                    dataKey="co2" 
                    fill="#10e283" 
                    radius={[6, 6, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-emerald-500/15">
              <span>Weekly trend: <strong className="text-emerald-400">+24%</strong> sorting efficiency</span>
              <span className="font-mono text-lime-400">Peak day: Thursday (4 items)</span>
            </div>
          </div>

        </div>

        {/* Tangible Fun Everyday Equivalencies */}
        <div className="mb-12">
          <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center space-x-2">
            <span>What Your Impact Actually Means</span>
            <span className="text-xs font-normal text-slate-400">— Tangible real-world parallels</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <TreePine className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-white">{treesEquiv} Tree-Days</div>
                <div className="text-xs text-slate-400">Urban pine tree carbon uptake</div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-sky-500/20 flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-sky-500/15 flex items-center justify-center text-sky-400 flex-shrink-0">
                <Car className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-white">{kmAvoided} km</div>
                <div className="text-xs text-slate-400">Gasoline vehicle driving avoided</div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-amber-500/20 flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-white">{ledHours} Hours</div>
                <div className="text-xs text-slate-400">Continuous 10W LED illumination</div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-purple-500/20 flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Smartphone className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-white">{phoneCharges} Charges</div>
                <div className="text-xs text-slate-400">Smartphone full battery cycles</div>
              </div>
            </div>

          </div>
        </div>

        {/* Gamification & Achievement Badges */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-white flex items-center space-x-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Eco-Achievements & Milestones</span>
              </h3>
              <p className="text-xs text-slate-300">Earn badges by consistently categorizing materials and preventing contamination.</p>
            </div>
            <div className="text-xs font-mono text-emerald-400">
              {BADGES_LIST.filter(b => totalItems >= b.unlockedAt).length} of {BADGES_LIST.length} Unlocked
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BADGES_LIST.map(badge => {
              const isUnlocked = totalItems >= badge.unlockedAt;
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isUnlocked
                      ? 'bg-emerald-950/40 border-emerald-400/40 shadow-glow-sm'
                      : 'bg-eco-surface/40 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                      isUnlocked 
                        ? 'bg-gradient-to-br from-emerald-400 to-lime-400 text-slate-950' 
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {badge.id === 'first-scan' && '✨'}
                      {badge.id === 'plastic-buster' && '🛡️'}
                      {badge.id === 'climate-champ' && '🔥'}
                      {badge.id === 'hazard-hero' && '🏅'}
                    </div>
                    {isUnlocked ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        UNLOCKED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-800/80">
                        {badge.unlockedAt - totalItems} more needed
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-sm text-white">{badge.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{badge.description}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
