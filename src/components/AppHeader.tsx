import React, { useState, useEffect, useRef } from 'react';
import { Award, Flame, Sparkles, Volume2, VolumeX, Trees, RotateCcw, Info, BarChart3, BookOpen, Download, HelpCircle, GitFork, Menu, X, Moon, Sun, ArrowLeftRight } from 'lucide-react';
import { UserStats } from '../types';

interface HeaderProps {
  stats: UserStats;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetStats: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenInfo: () => void;
  onOpenCutsExplanation: () => void;
  isNightMode: boolean;
  onToggleNightMode: () => void;
}

export const AppHeader: React.FC<HeaderProps> = ({
  stats,
  soundEnabled,
  onResetStats,
  activeTab,
  setActiveTab,
  onOpenInfo,
  onOpenCutsExplanation,
  onToggleSound,
  isNightMode,
  onToggleNightMode
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer select-none shrink-0" onClick={() => { setActiveTab('key'); setIsOpen(false); }}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20 shrink-0">
              <Trees className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 leading-tight">
              <h1 className="text-sm sm:text-lg font-black text-stone-900 tracking-tight truncate">Klíč Dřevin</h1>
              <p className="text-[8px] sm:text-[10px] text-emerald-700 font-mono tracking-wider uppercase truncate">Makroskopický klíč</p>
            </div>
          </div>

          {/* Central navigation for desktop */}
          <nav className="hidden md:flex space-x-1 bg-stone-100 p-1 rounded-lg">
            <button
              id="tab-btn-key"
              onClick={() => setActiveTab('key')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'key'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Určovací klíč
            </button>
            <button
              id="tab-btn-schemas"
              onClick={() => setActiveTab('schemas')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'schemas'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Schémata klíče
            </button>
            <button
              id="tab-btn-quiz"
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Kvízy &amp; Detektivka
            </button>
            <button
              id="tab-btn-compare"
              onClick={() => setActiveTab('compare')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'compare'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Srovnávač</span>
            </button>
            <button
              id="tab-btn-atlas"
              onClick={() => setActiveTab('atlas')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'atlas'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Atlas dřevin
            </button>
          </nav>

          {/* Quick-stats and Hamburger Button */}
          <div className="flex items-center space-x-3" ref={menuRef}>
            {/* Quick XP display visible outside menu on screens wider than mobile */}
            <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-250/50 text-emerald-800 text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
              <span>{stats.xp} XP</span>
            </div>

            {/* Hamburger / Close Menu Toggle Icon */}
            <button
              id="header-hamburger-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                isOpen 
                  ? 'bg-emerald-600 text-white border-emerald-600' 
                  : 'bg-stone-50 border-stone-250 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
              title="Menu nastavení a statistik"
            >
              {isOpen ? <X className="w-5 h-5 animate-pulse" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Dropdown collapsible overlay panel */}
            {isOpen && (
              <div className="absolute right-4 top-16 w-72 bg-white rounded-2xl border border-stone-200 shadow-xl py-3 z-50 animate-scale-up space-y-2 text-stone-700">
                
                {/* 1. Header with Stats Summary (Streak + XP) */}
                <div className="px-4 pb-2 border-b border-stone-100 space-y-2">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-extrabold">Můj profil &amp; skóre</div>
                  <div className="grid grid-cols-2 gap-2">
                    {/* XP display */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-50 border border-emerald-200/50 text-emerald-900">
                      <div className="flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
                        <span className="text-sm font-mono font-black">{stats.xp}</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-tight text-emerald-700 mt-1 uppercase">Celkem XP</span>
                    </div>

                    {/* Streak Display */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-50 border border-amber-200/50 text-amber-900">
                      <div className="flex items-center space-x-1.5">
                        <Flame className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                        <span className="text-sm font-mono font-black">{stats.streak} dnů</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-tight text-amber-700 mt-1 uppercase">Aktivita</span>
                    </div>
                  </div>
                </div>

                {/* 2. Primary Actions menu list */}
                <div className="px-2 space-y-0.5">
                  
                  {/* Statistika a odznaky */}
                  <button
                    onClick={() => {
                      setActiveTab('achievements');
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                      activeTab === 'achievements'
                        ? 'bg-emerald-50 text-emerald-900'
                        : 'hover:bg-stone-50 text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Statistika a odznaky</span>
                  </button>

                  {/* Zvuk toggle button */}
                  <button
                    onClick={() => {
                      onToggleSound();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-stone-50 text-stone-700 hover:text-stone-900 text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      {soundEnabled ? (
                        <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                      <span>Zvukové efekty</span>
                    </div>
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md font-bold border ${
                      soundEnabled 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                        : 'bg-stone-100 text-stone-500 border-stone-200'
                    }`}>
                      {soundEnabled ? 'Zapnuto' : 'Vypnuto'}
                    </span>
                  </button>

                  {/* Noční verze Atlasu toggle button */}
                  <button
                    onClick={() => {
                      onToggleNightMode();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-stone-50 text-stone-700 hover:text-stone-900 text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      {isNightMode ? (
                        <Moon className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
                      ) : (
                        <Sun className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                      <span>Noční verze atlasu</span>
                    </div>
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md font-bold border ${
                      isNightMode 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                        : 'bg-stone-100 text-stone-500 border-stone-200'
                    }`}>
                      {isNightMode ? 'Zapnuto' : 'Vypnuto'}
                    </span>
                  </button>

                  {/* Stáhnout HTML */}
                  <a
                    href="/dreviny.html"
                    download="dreviny.html"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-stone-50 text-stone-700 hover:text-stone-900 text-left cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Stáhnout celou aplikaci HTML</span>
                  </a>

                  {/* Otazník / Vysvětlivka řezů */}
                  <button
                    onClick={() => {
                      onOpenCutsExplanation();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-stone-50 text-stone-700 hover:text-stone-900 text-left cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Vysvětlivka řezů</span>
                  </button>

                  {/* O programu */}
                  <button
                    onClick={() => {
                      onOpenInfo();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-stone-50 text-stone-700 hover:text-stone-900 text-left cursor-pointer"
                  >
                    <Info className="w-4 h-4 text-stone-500 shrink-0" />
                    <span>O autorech</span>
                  </button>

                  {/* Vynulovat postup / Refresh */}
                  <div className="pt-2 border-t border-stone-100 mt-1">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        if (confirm('Opravdu chcete vymazat veškerý pokrok, XP body a začít znovu?')) {
                          onResetStats();
                        }
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all text-left cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Vynulovat postup</span>
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom navigation tab list */}
      <div className="md:hidden flex justify-around border-t border-stone-100 bg-stone-50/90 py-1.5">
        <button
          onClick={() => { setActiveTab('key'); setIsOpen(false); }}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'key' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Trees className="w-4 h-4" />
          <span>Klíč</span>
        </button>
        <button
          onClick={() => { setActiveTab('schemas'); setIsOpen(false); }}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'schemas' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <GitFork className="w-4 h-4" />
          <span>Schémata</span>
        </button>
        <button
          onClick={() => { setActiveTab('quiz'); setIsOpen(false); }}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'quiz' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Kvízy</span>
        </button>
        <button
          onClick={() => { setActiveTab('compare'); setIsOpen(false); }}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'compare' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4 text-amber-600" />
          <span>Srovnat</span>
        </button>
        <button
          onClick={() => { setActiveTab('atlas'); setIsOpen(false); }}
          className={`flex flex-col items-center space-y-0.5 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'atlas' ? 'text-emerald-700 font-bold' : 'text-stone-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Atlas</span>
        </button>
      </div>
    </header>
  );
};
