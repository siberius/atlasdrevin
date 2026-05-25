import React from 'react';
import { Award, Flame, Sparkles, Volume2, VolumeX, Trees, RotateCcw, Info, BarChart3 } from 'lucide-react';
import { UserStats } from '../types';

interface HeaderProps {
  stats: UserStats;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetStats: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenInfo: () => void;
}

export const AppHeader: React.FC<HeaderProps> = ({
  stats,
  soundEnabled,
  onToggleSound,
  onResetStats,
  activeTab,
  setActiveTab,
  onOpenInfo
}) => {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer select-none shrink-0" onClick={() => setActiveTab('key')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20 shrink-0">
              <Trees className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 leading-tight">
              <h1 className="text-sm sm:text-lg font-black text-stone-900 tracking-tight truncate">Klíč Dřevin</h1>
              <p className="text-[8px] sm:text-[10px] text-emerald-700 font-mono tracking-wider uppercase truncate">Makroskopický klíč</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1 bg-stone-100 p-1 rounded-lg">
            <button
              id="tab-btn-key"
              onClick={() => setActiveTab('key')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === 'key'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Určovací klíč
            </button>
            <button
              id="tab-btn-quiz"
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Kvízy &amp; Detektivka
            </button>
            <button
              id="tab-btn-atlas"
              onClick={() => setActiveTab('atlas')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === 'atlas'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Atlas dřevin
            </button>
            <button
              id="tab-btn-achievements"
              onClick={() => setActiveTab('achievements')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center space-x-1 ${
                activeTab === 'achievements'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-stone-700 shrink-0" />
              <span>Stat</span>
            </button>
          </nav>

          {/* User Score Stats & Audio Tools */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Streak */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1 rounded-full bg-amber-50 border border-amber-200/50 text-amber-700 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-[10px] sm:text-xs font-bold font-mono">{stats.streak}d</span>
            </div>

            {/* XP */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/50 text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
              <span className="text-[10px] sm:text-xs font-bold font-mono">{stats.xp} <span className="hidden sm:inline">XP</span></span>
            </div>

            {/* Volume */}
            <button
              onClick={onToggleSound}
              className={`p-1.5 rounded-lg border text-stone-500 hover:bg-stone-50 hover:text-stone-800 transition-colors ${
                soundEnabled ? 'border-emerald-200 text-emerald-700 bg-emerald-50/50' : 'border-stone-200'
              }`}
              title={soundEnabled ? 'Ztišit zvuky' : 'Zapnout zvuky'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Info About App */}
            <button
              id="header-info-modal-btn"
              onClick={onOpenInfo}
              className="p-1.5 rounded-lg border border-stone-200 text-emerald-700 hover:text-emerald-950 hover:bg-emerald-50 transition-colors"
              title="Informace"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* Reset */}
            <button
              onClick={() => {
                if (confirm('Opravdu chcete vymazat statistiky a začít znovu?')) {
                  onResetStats();
                }
              }}
              className="p-1.5 rounded-lg border border-stone-200 text-stone-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              title="Vynulovat postup"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation tab list */}
      <div className="md:hidden flex justify-around border-t border-stone-100 bg-stone-50/90 py-1.5">
        <button
          onClick={() => setActiveTab('key')}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'key' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Trees className="w-4 h-4" />
          <span>Klíč</span>
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'quiz' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Kvízy</span>
        </button>
        <button
          onClick={() => setActiveTab('atlas')}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'atlas' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Atlas</span>
        </button>
        <button
          id="mobile-tab-btn-achievements"
          onClick={() => setActiveTab('achievements')}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'achievements' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Stat</span>
        </button>
      </div>
    </header>
  );
};
