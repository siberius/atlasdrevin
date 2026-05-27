import React, { useState, useEffect } from 'react';
import { Search, Compass, Sliders, Info, ChevronRight, ChevronLeft, X, ExternalLink, Moon, Sun } from 'lucide-react';
import { ALL_SPECIES } from '../data/woodData';
import { TreeSpecies } from '../types';
import { WoodCutVisualizer, BotanicalReferences } from './WoodCutVisualizer';

// Returns 4-letter Scientific Wood Anatomy WSL code from species ID
export const getScientificCode = (speciesId: string): string => {
  const mapping: Record<string, string> = {
    jedle: 'ABAL',
    smrk: 'PCAB',
    tis: 'TABA',
    jalovec: 'JUCO',
    modrin: 'LADE',
    douglaska: 'PSME',
    borovice_lesni: 'PISY',
    borovice_vejmutovka: 'PIST',
    dub: 'QURO',
    pajasan: 'AIAL',
    jilm: 'ULSC',
    akat: 'RBPS',
    morusovnik: 'MOAL',
    jasan: 'FXEX',
    kastanovnik: 'CASA',
    oresak: 'JGRE',
    tresen: 'PNAV',
    svestka: 'PNDO',
    platan: 'PLOR',
    buk: 'FASY',
    habr: 'CPBE',
    olse: 'ALGL',
    javor: 'ACPS',
    babyka: 'ACCA',
    briza: 'BEPE',
    lipa: 'TICO',
    osika: 'PPTR',
    hrusen: 'PRCO',
    jirovec: 'AEHI',
    vrba: 'SAAL',
    topol: 'PPNI',
    jerab: 'SOAU',
    jablon: 'PRMA'
  };
  return mapping[speciesId] || '';
};

interface AtlasProps {
  onPlayClickSound: () => void;
  initialSelectedSpeciesId?: string;
  onClearInitialSelectedSpecies?: () => void;
  isNightMode?: boolean;
  onToggleNightMode?: () => void;
}

export const AtlasMode: React.FC<AtlasProps> = ({ 
  onPlayClickSound,
  initialSelectedSpeciesId,
  onClearInitialSelectedSpecies,
  isNightMode = false,
  onToggleNightMode
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [classFilter, setClassFilter] = useState<'all' | 'jehlicnate' | 'listnate'>('all');
  const [hardnessFilter, setHardnessFilter] = useState<string>('all');
  const [selectedSpecies, setSelectedSpecies] = useState<TreeSpecies | null>(null);
  const [activeCutTab, setActiveCutTab] = useState<'P' | 'R' | 'T'>('P');

  // Automatically open species modal if triggered from schema
  useEffect(() => {
    if (initialSelectedSpeciesId) {
      const found = ALL_SPECIES.find(s => s.id === initialSelectedSpeciesId);
      if (found) {
        setSelectedSpecies(found);
        if (onClearInitialSelectedSpecies) {
          onClearInitialSelectedSpecies();
        }
      }
    }
  }, [initialSelectedSpeciesId, onClearInitialSelectedSpecies]);

  // Filter wood list on terms
  const filteredSpecies = ALL_SPECIES.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.latinName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'all' || s.class === classFilter;
    
    let matchesHardness = true;
    if (hardnessFilter !== 'all') {
      const hStr = s.hardness.toLowerCase();
      if (hardnessFilter === 'mekke') {
        matchesHardness = hStr.includes('měkké') || hStr.includes('velmi měkké');
      } else if (hardnessFilter === 'stredne') {
        matchesHardness = hStr.includes('středně');
      } else if (hardnessFilter === 'tvrde') {
        matchesHardness = hStr.includes('tvrdé') || hStr.includes('velmi tvrdé');
      }
    }

    return matchesSearch && matchesClass && matchesHardness;
  });

  const getWeightBadgeColor = (w: string) => {
    if (w.includes('velmi lehké') || w.includes('lehké')) return 'bg-sky-50 text-sky-800 border-sky-100';
    if (w.includes('středně')) return 'bg-emerald-50 text-emerald-800 border-emerald-100';
    return 'bg-amber-50 text-amber-800 border-amber-100';
  };

  const getHardnessBadgeColor = (h: string) => {
    if (h.includes('měkké')) return 'bg-cyan-50 text-cyan-800 border-cyan-100';
    if (h.includes('středně')) return 'bg-teal-50 text-teal-800 border-teal-100';
    return 'bg-rose-50 text-rose-800 border-rose-100';
  };

  // Navigování mezi stromy v otevřeném okně atlasu
  const getNavList = () => {
    if (selectedSpecies && filteredSpecies.some(s => s.id === selectedSpecies.id)) {
      return filteredSpecies;
    }
    return ALL_SPECIES;
  };

  const navList = getNavList();
  const currentIndex = selectedSpecies ? navList.findIndex(s => s.id === selectedSpecies.id) : -1;

  const handlePrevSpecies = () => {
    if (navList.length <= 1 || currentIndex === -1) return;
    onPlayClickSound();
    const prevIndex = (currentIndex - 1 + navList.length) % navList.length;
    setSelectedSpecies(navList[prevIndex]);
    setActiveCutTab('P');
  };

  const handleNextSpecies = () => {
    if (navList.length <= 1 || currentIndex === -1) return;
    onPlayClickSound();
    const nextIndex = (currentIndex + 1) % navList.length;
    setSelectedSpecies(navList[nextIndex]);
    setActiveCutTab('P');
  };

  // Klávesové šipky pro listování stromy
  useEffect(() => {
    if (!selectedSpecies) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevSpecies();
      } else if (e.key === 'ArrowRight') {
        handleNextSpecies();
      } else if (e.key === 'Escape') {
        setSelectedSpecies(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedSpecies, currentIndex, navList]);

  const bgCard = isNightMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900';
  const bgPanel = isNightMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200';
  const textTitle = isNightMode ? 'text-stone-50' : 'text-stone-900';
  const textSub = isNightMode ? 'text-stone-450 font-mono' : 'text-stone-500 font-mono';
  const textDesc = isNightMode ? 'text-stone-300' : 'text-stone-600';
  const borderCol = isNightMode ? 'border-stone-800' : 'border-stone-100/60';
  const bgTag = isNightMode ? 'bg-stone-805' : 'bg-stone-100';
  const bgSubCard = isNightMode ? 'bg-stone-850 border-stone-750' : 'bg-stone-50 border-stone-150';
  const textMuted = isNightMode ? 'text-stone-400' : 'text-stone-400';

  return (
    <div className="space-y-6">
      {/* Search and Filters panel */}
      <div className={`${bgPanel} border rounded-2xl p-5 shadow-3xs space-y-4 transition-colors`}>
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
            <input
              id="search-wood-input"
              type="text"
              placeholder="Vyhledat v dřevinách (např. smrk, dub, platan, Robinia...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-xl text-sm placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 ${
                isNightMode ? 'bg-stone-850 border-stone-750 text-stone-100 placeholder-stone-500' : 'bg-stone-50/50 border-stone-200 text-stone-900'
              }`}
            />
          </div>

          {/* Class Filter */}
          <div className={`flex ${bgTag} p-1 rounded-xl`}>
            <button
              onClick={() => { onPlayClickSound(); setClassFilter('all'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                classFilter === 'all' 
                  ? (isNightMode ? 'bg-stone-700 text-white shadow-3xs' : 'bg-white text-stone-900 shadow-3xs')
                  : (isNightMode ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-800')
              }`}
            >
              Všechny
            </button>
            <button
              onClick={() => { onPlayClickSound(); setClassFilter('jehlicnate'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                classFilter === 'jehlicnate' 
                  ? (isNightMode ? 'bg-emerald-800 text-white shadow-3xs' : 'bg-white text-emerald-800 shadow-3xs')
                  : (isNightMode ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-800')
              }`}
            >
              Jehličnaté
            </button>
            <button
              onClick={() => { onPlayClickSound(); setClassFilter('listnate'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                classFilter === 'listnate' 
                  ? (isNightMode ? 'bg-amber-805 text-white shadow-3xs' : 'bg-white text-emerald-800 shadow-3xs')
                  : (isNightMode ? 'text-stone-400 hover:text-stone-200' : 'text-stone-500 hover:text-stone-800')
              }`}
            >
              Listnaté
            </button>
          </div>
        </div>

        {/* Hardness filtering & count info */}
        <div className={`flex flex-wrap items-center justify-between gap-3 pt-3 border-t ${isNightMode ? 'border-stone-800/80' : 'border-stone-100'} text-xs text-stone-500`}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Sliders className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-medium">Tvrdost:</span>
              <select
                value={hardnessFilter}
                onChange={(e) => { onPlayClickSound(); setHardnessFilter(e.target.value); }}
                className={`border rounded-md py-1 px-2 focus:outline-hidden text-xs font-semibold ${
                  isNightMode ? 'bg-stone-850 border-stone-700 text-stone-200' : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                <option value="all">Všechny tvrdosti</option>
                <option value="mekke">Měkké / Velmi měkké</option>
                <option value="stredne">Středně tvrdé</option>
                <option value="tvrde">Tvrdé / Velmi tvrdé</option>
              </select>
            </div>

            {/* Night Mode Switcher Button */}
            {onToggleNightMode && (
              <button
                type="button"
                onClick={onToggleNightMode}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  isNightMode
                    ? 'bg-emerald-950/40 text-emerald-450 border-emerald-900/60'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {isNightMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Světlý režim atlasu</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-stone-500" />
                    <span>Noční režim atlasu</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="font-mono text-[11px] font-semibold text-stone-400">
            Nalezeno: {filteredSpecies.length} z {ALL_SPECIES.length} dřevin
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSpecies.map((s) => (
          <div
            key={s.id}
            id={`atlas-card-${s.id}`}
            onClick={() => { onPlayClickSound(); setSelectedSpecies(s); setActiveCutTab('P'); }}
            className={`border rounded-2xl p-5 hover:border-emerald-500 hover:shadow-2xs cursor-pointer transition-all flex flex-col justify-between ${bgCard}`}
          >
            <div>
              <div className="flex justify-between items-start gap-2">
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider font-mono shrink-0 ${
                  s.class === 'jehlicnate' 
                    ? (isNightMode ? 'bg-emerald-950/40 text-emerald-305 border-emerald-900/60' : 'bg-emerald-50 text-emerald-800 border-emerald-100')
                    : (isNightMode ? 'bg-amber-950/40 text-amber-305 border-amber-900/60' : 'bg-orange-50/50 text-amber-800 border-amber-100')
                }`}>
                  {s.class === 'jehlicnate' ? 'Jehličnan' : 'Listnáč'}
                </span>
                <div className={`flex items-center space-x-1 shrink-0 ${isNightMode ? 'bg-stone-850' : 'bg-stone-50/80'} px-1.5 py-0.5 rounded-lg border ${isNightMode ? 'border-stone-750' : 'border-stone-150'}`}>
                  <span className="w-4 h-4 rounded-full bg-emerald-600 font-extrabold text-[8.5px] text-white flex items-center justify-center shadow-3xs" title="Příčný řez (P)">P</span>
                  <span className="w-4 h-4 rounded-full bg-blue-600 font-extrabold text-[8.5px] text-white flex items-center justify-center shadow-3xs" title="Středový řez (R)">R</span>
                  <span className="w-4 h-4 rounded-full bg-amber-600 font-extrabold text-[8.5px] text-white flex items-center justify-center shadow-3xs" title="Tečný řez (T)">T</span>
                </div>
              </div>

              <h3 className={`text-base font-black tracking-tight mt-3 ${textTitle}`}>{s.name}</h3>
              <p className={`text-xs mt-1 italic font-mono ${textSub}`}>{s.latinName} {s.author}</p>
              <p className={`text-xs mt-2.5 line-clamp-2 leading-relaxed ${textDesc}`}>
                {s.ringsDesc}
              </p>
            </div>

            <div className={`pt-4 border-t mt-4 flex items-center justify-between ${borderCol}`}>
              <div className="flex flex-wrap gap-1">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border font-mono ${
                  isNightMode ? 'bg-stone-800 text-stone-300 border-stone-700' : getWeightBadgeColor(s.weight)
                }`}>
                  Váha: {s.weight.split(' ')[0]}
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border font-mono ${
                  isNightMode ? 'bg-stone-800 text-stone-300 border-stone-700' : getHardnessBadgeColor(s.hardness)
                }`}>
                  {s.hardness.split(' ')[0]}
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-colors ${isNightMode ? 'text-stone-500' : 'text-stone-400'}`} />
            </div>
          </div>
        ))}
      </div>

      {filteredSpecies.length === 0 && (
        <div className={`border rounded-2xl p-12 text-center space-y-4 ${isNightMode ? 'bg-stone-900 border-stone-800 text-stone-400' : 'bg-white border-stone-200 text-stone-400'}`}>
          <Compass className="w-12 h-12 text-stone-300 mx-auto animate-pulse" />
          <p className="text-sm font-medium">Žádná dřevina neodpovídá vybraným filtrům.</p>
        </div>
      )}

      {/* Detailed Specimen Modal (Specimen Card) */}
      {selectedSpecies && (
        <div 
          onClick={() => setSelectedSpecies(null)}
          className="fixed inset-0 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`rounded-2xl shadow-xl max-w-5xl w-full max-h-[85vh] flex flex-col overflow-hidden border relative my-auto cursor-default ${
              isNightMode ? 'bg-stone-900 border-stone-800 text-stone-150' : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            {/* Header */}
            <div className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between items-start gap-4 ${
              isNightMode ? 'border-stone-800 bg-stone-850/80' : 'border-stone-200 bg-stone-50'
            }`}>
              <div>
                <span className={`text-[10px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded ${
                  isNightMode ? 'bg-emerald-950 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  Botanický vzorek atlasu ({selectedSpecies.class === 'jehlicnate' ? 'Jehličnaté' : 'Listnaté'})
                </span>
                <h3 className={`text-2xl font-black tracking-tight mt-1 ${isNightMode ? 'text-stone-100' : 'text-stone-900'}`}>{selectedSpecies.name}</h3>
                <p className={`text-sm font-mono italic ${isNightMode ? 'text-stone-400' : 'text-stone-500'}`}>
                  {selectedSpecies.latinName} {selectedSpecies.author}
                </p>
              </div>

              {/* Navigation controls & Close Button */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {navList.length > 1 && (
                  <div className={`flex items-center space-x-1.5 p-1 rounded-xl shadow-3xs border ${
                    isNightMode ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-200'
                  }`}>
                    <button
                      onClick={handlePrevSpecies}
                      className={`p-1.5 rounded-lg transition-colors flex items-center justify-center shrink-0 ${
                        isNightMode ? 'text-stone-300 hover:text-stone-100 hover:bg-stone-700' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                      title="Předchozí dřevina (Klávesa ← / vlevo)"
                    >
                      <ChevronLeft className="w-4 h-4 font-bold" />
                    </button>
                    <span className={`text-xs font-mono font-bold px-1 cursor-default select-none ${isNightMode ? 'text-stone-400' : 'text-stone-600'}`}>
                      {currentIndex + 1} / {navList.length}
                    </span>
                    <button
                      onClick={handleNextSpecies}
                      className={`p-1.5 rounded-lg transition-colors flex items-center justify-center shrink-0 ${
                        isNightMode ? 'text-stone-300 hover:text-stone-100 hover:bg-stone-700' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                      title="Následující dřevina (Klávesa → / vpravo)"
                    >
                      <ChevronRight className="w-4 h-4 font-bold" />
                    </button>
                  </div>
                )}

                <button
                  id="close-atlas-modal"
                  onClick={() => setSelectedSpecies(null)}
                  className={`p-1.5 px-3.5 rounded-xl border transition-colors text-xs font-black shadow-3xs cursor-pointer ${
                    isNightMode ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  ✕ zavřít
                </button>
              </div>
            </div>

            {/* Specimen Details Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                {/* Left/Main content area (cuts & descriptions) */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Cuts Gallery */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                      <h4 className="text-xs font-extrabold uppercase font-mono text-stone-400 tracking-wider">Metodické zobrazení anatomických řezů:</h4>
                    </div>
                    
                    {/* Mobile Tab Switcher */}
                    <div className={`md:hidden flex p-1 rounded-xl mb-4 border shadow-3xs ${
                      isNightMode ? 'bg-stone-850 border-stone-800' : 'bg-stone-100 border-stone-200/60'
                    }`}>
                      <button
                        onClick={() => { onPlayClickSound(); setActiveCutTab('P'); }}
                        className={`flex-1 py-1.5 text-center text-xs font-extrabold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                          activeCutTab === 'P' 
                            ? (isNightMode ? 'bg-stone-700 text-white shadow-3xs' : 'bg-white text-emerald-800 shadow-3xs') 
                            : 'text-stone-500'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-mono font-black text-[8.5px] flex items-center justify-center shadow-3xs shrink-0">P</span>
                        <span>Příčný</span>
                      </button>
                      <button
                        onClick={() => { onPlayClickSound(); setActiveCutTab('R'); }}
                        className={`flex-1 py-1.5 text-center text-xs font-extrabold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                          activeCutTab === 'R' 
                            ? (isNightMode ? 'bg-stone-700 text-white shadow-3xs' : 'bg-white text-blue-800 shadow-3xs') 
                            : 'text-stone-500'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-mono font-black text-[8.5px] flex items-center justify-center shadow-3xs shrink-0">R</span>
                        <span>Radiální</span>
                      </button>
                      <button
                        onClick={() => { onPlayClickSound(); setActiveCutTab('T'); }}
                        className={`flex-1 py-1.5 text-center text-xs font-extrabold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                          activeCutTab === 'T' 
                            ? (isNightMode ? 'bg-stone-700 text-white shadow-3xs' : 'bg-white text-amber-800 shadow-3xs') 
                            : 'text-stone-500'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-amber-600 text-white font-mono font-black text-[8.5px] flex items-center justify-center shadow-3xs shrink-0">T</span>
                        <span>Tečný</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Příčný řez (P) */}
                      <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                        isNightMode ? 'bg-stone-850 border-stone-800' : 'bg-stone-50 border-stone-150'
                      } ${activeCutTab === 'P' ? 'flex' : 'hidden md:flex'}`}>
                        <div>
                          <WoodCutVisualizer species={selectedSpecies} cutType="P" className="w-full aspect-square mb-2.5 shadow-2xs" />
                          <p className={`text-[11px] font-mono leading-relaxed mt-1 ${isNightMode ? 'text-stone-300' : 'text-stone-500'}`}>{selectedSpecies.pDesc}</p>
                        </div>
                      </div>

                      {/* Radiální řez (R) */}
                      <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                        isNightMode ? 'bg-stone-850 border-stone-800' : 'bg-stone-50 border-stone-150'
                      } ${activeCutTab === 'R' ? 'flex' : 'hidden md:flex'}`}>
                        <div>
                          <WoodCutVisualizer species={selectedSpecies} cutType="R" className="w-full aspect-square mb-2.5 shadow-2xs" />
                          <p className={`text-[11px] font-mono leading-relaxed mt-1 ${isNightMode ? 'text-stone-300' : 'text-stone-500'}`}>{selectedSpecies.rDesc}</p>
                        </div>
                      </div>

                      {/* Tangenciální řez (T) */}
                      <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                        isNightMode ? 'bg-stone-850 border-stone-800' : 'bg-stone-50 border-stone-150'
                      } ${activeCutTab === 'T' ? 'flex' : 'hidden md:flex'}`}>
                        <div>
                          <WoodCutVisualizer species={selectedSpecies} cutType="T" className="w-full aspect-square mb-2.5 shadow-2xs" />
                          <p className={`text-[11px] font-mono leading-relaxed mt-1 ${isNightMode ? 'text-stone-300' : 'text-stone-500'}`}>{selectedSpecies.tDesc}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attributes breakdown grid */}
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t text-sm ${isNightMode ? 'border-stone-800' : 'border-stone-150'}`}>
                    <div>
                      <h4 className="text-xs font-extrabold uppercase font-mono text-stone-400 tracking-wider mb-3">Botanický popis stavby</h4>
                      <div className={`divide-y text-xs ${isNightMode ? 'divide-stone-800' : 'divide-stone-100'}`}>
                        <div className="py-2 flex justify-between items-start gap-4">
                          <span className={`font-mono shrink-0 ${isNightMode ? 'text-stone-400' : 'text-stone-500'}`}>Pikantní doplňky / Vůně:</span>
                          <span className={`font-semibold text-right leading-tight max-w-[60%] sm:max-w-[70%] ${isNightMode ? 'text-stone-200' : 'text-stone-900'}`}>
                            {selectedSpecies.specialFeatures ? selectedSpecies.specialFeatures[0] : 'Bez zápachu'}
                          </span>
                        </div>
                        <div className="py-2 flex justify-between items-start gap-4">
                          <span className={`font-mono shrink-0 ${isNightMode ? 'text-stone-400' : 'text-stone-500'}`}>Letokruhy:</span>
                          <span className={`font-semibold text-right leading-tight max-w-[60%] sm:max-w-[70%] ${isNightMode ? 'text-stone-200' : 'text-stone-900'}`}>
                            {selectedSpecies.ringsDesc}
                          </span>
                        </div>
                        <div className="py-2 flex justify-between items-start gap-4 animate-fade-in">
                          <span className={`font-mono shrink-0 ${isNightMode ? 'text-stone-400' : 'text-stone-500'}`}>Hmotnost:</span>
                          <span className={`font-semibold text-right leading-tight max-w-[60%] sm:max-w-[70%] ${isNightMode ? 'text-stone-200' : 'text-stone-900'}`}>
                            {selectedSpecies.weight}
                          </span>
                        </div>
                        <div className="py-2 flex justify-between items-start gap-4">
                          <span className={`font-mono shrink-0 ${isNightMode ? 'text-stone-400' : 'text-stone-500'}`}>Běl / Sapwood:</span>
                          <span className={`font-semibold text-right leading-tight max-w-[60%] sm:max-w-[70%] ${isNightMode ? 'text-stone-200' : 'text-stone-900'}`}>
                            {selectedSpecies.sapwoodColor}
                          </span>
                        </div>
                        {selectedSpecies.heartwoodColor && (
                          <div className="py-2 flex justify-between items-start gap-4">
                            <span className={`font-mono shrink-0 ${isNightMode ? 'text-stone-400' : 'text-stone-500'}`}>Jádro / Heartwood:</span>
                            <span className={`font-semibold text-right leading-tight max-w-[60%] sm:max-w-[70%] ${isNightMode ? 'text-stone-200' : 'text-stone-900'}`}>
                              {selectedSpecies.heartwoodColor}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold uppercase font-mono text-stone-400 tracking-wider">Metodické nápovědy k určování</h4>
                      <div className={`rounded-xl p-4 border space-y-2 ${
                        isNightMode ? 'bg-stone-850/60 border-stone-800' : 'bg-stone-50 border-stone-100'
                      }`}>
                        <p className={`text-xs leading-relaxed ${isNightMode ? 'text-stone-300' : 'text-stone-600'}`}>
                          Chcete-li bezpečně určit dřevinu **{selectedSpecies.name}**, hledejte v klíči následující cestu:
                        </p>
                        <div className={`p-3 rounded-lg text-xs font-mono font-medium flex flex-wrap items-center gap-1.5 leading-relaxed ${
                          isNightMode ? 'bg-stone-800/40 text-stone-300' : 'bg-stone-100/50 text-stone-700'
                        }`}>
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full inline-block shrink-0" />
                          <span>{selectedSpecies.class === 'jehlicnate' ? 'Jehličnany' : 'Listnáče'}</span>
                          <ChevronRight className="w-3" />
                          <span>{selectedSpecies.hasHeartwood ? 'S jádrem (vylišeno)' : 'Bez jádra (bělové)'}</span>
                          <ChevronRight className="w-3" />
                          <span className="text-emerald-500 font-bold">
                            {selectedSpecies.rayType === 'invisible' ? 'Paprsky neviditelné' :
                             selectedSpecies.rayType === 'radial_only' ? 'Paprsky pouze v R-řezu' :
                             selectedSpecies.rayType === 'visible_all' ? 'Paprsky viditelné všude' :
                             selectedSpecies.rayType === 'wide' ? 'Široké dřeňové paprsky' :
                             selectedSpecies.rayType === 'narrow' ? 'Úzké dřeňové paprsky' :
                             selectedSpecies.rayType === 'very_narrow' ? 'Velmi úzké paprsky' :
                             selectedSpecies.rayType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> {/* End Left/Main column area (lg:col-span-3) */}

                {/* Right Sidebar Column - only on desktop visible next to other things, otherwise at the bottom */}
                <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-0">
                  <div className={`font-sans font-extrabold text-[10px] uppercase tracking-wider flex items-center space-x-1 border-b pb-1 ${
                    isNightMode ? 'text-stone-400 border-stone-800' : 'text-stone-500 border-stone-200'
                  }`}>
                    <span>ℹ️ REFU / MULTI-ODKAZY</span>
                  </div>
                  <BotanicalReferences species={selectedSpecies} />
                </div>

              </div> {/* End Grid wrapper */}
            </div> {/* End Modal Body layout content */}
          </div>
        </div>
      )}
    </div>
  );
};
