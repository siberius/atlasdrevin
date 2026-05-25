import React, { useState, useEffect } from 'react';
import { Search, Compass, Sliders, Info, ChevronRight, ChevronLeft, X, ExternalLink } from 'lucide-react';
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
}

export const AtlasMode: React.FC<AtlasProps> = ({ onPlayClickSound }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [classFilter, setClassFilter] = useState<'all' | 'jehlicnate' | 'listnate'>('all');
  const [hardnessFilter, setHardnessFilter] = useState<string>('all');
  const [selectedSpecies, setSelectedSpecies] = useState<TreeSpecies | null>(null);

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
  };

  const handleNextSpecies = () => {
    if (navList.length <= 1 || currentIndex === -1) return;
    onPlayClickSound();
    const nextIndex = (currentIndex + 1) % navList.length;
    setSelectedSpecies(navList[nextIndex]);
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

  return (
    <div className="space-y-6">
      {/* Search and Filters panel */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-3xs space-y-4">
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
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-xl text-sm placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-stone-50/50"
            />
          </div>

          {/* Class Filter */}
          <div className="flex bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => { onPlayClickSound(); setClassFilter('all'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                classFilter === 'all' ? 'bg-white text-stone-900 shadow-3xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Všechny
            </button>
            <button
              onClick={() => { onPlayClickSound(); setClassFilter('jehlicnate'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                classFilter === 'jehlicnate' ? 'bg-white text-emerald-800 shadow-3xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Jehličnaté
            </button>
            <button
              onClick={() => { onPlayClickSound(); setClassFilter('listnate'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                classFilter === 'listnate' ? 'bg-white text-emerald-800 shadow-3xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Listnaté
            </button>
          </div>
        </div>

        {/* Hardness filtering & count info */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs text-stone-500">
          <div className="flex items-center space-x-2">
            <Sliders className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-medium">Tvrdost:</span>
            <select
              value={hardnessFilter}
              onChange={(e) => { onPlayClickSound(); setHardnessFilter(e.target.value); }}
              className="bg-stone-50 border border-stone-200 rounded-md py-1 px-2 focus:outline-hidden text-xs text-stone-700 font-semibold"
            >
              <option value="all">Všechny tvrdosti</option>
              <option value="mekke">Měkké / Velmi měkké</option>
              <option value="stredne">Středně tvrdé</option>
              <option value="tvrde">Tvrdé / Velmi tvrdé</option>
            </select>
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
            onClick={() => { onPlayClickSound(); setSelectedSpecies(s); }}
            className="border border-stone-200 rounded-2xl p-5 hover:border-emerald-500 hover:shadow-2xs cursor-pointer transition-all bg-white flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start gap-2">
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider font-mono shrink-0 ${
                  s.class === 'jehlicnate' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-orange-50/50 text-amber-800 border-amber-100'
                }`}>
                  {s.class === 'jehlicnate' ? 'Jehličnan' : 'Listnáč'}
                </span>
                <div className="flex items-center space-x-1 shrink-0 bg-stone-50/80 px-1.5 py-0.5 rounded-lg border border-stone-150">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 font-extrabold text-[8.5px] text-white flex items-center justify-center shadow-3xs" title="Příčný řez (P)">P</span>
                  <span className="w-4 h-4 rounded-full bg-blue-600 font-extrabold text-[8.5px] text-white flex items-center justify-center shadow-3xs" title="Středový řez (R)">R</span>
                  <span className="w-4 h-4 rounded-full bg-amber-600 font-extrabold text-[8.5px] text-white flex items-center justify-center shadow-3xs" title="Tečný řez (T)">T</span>
                </div>
              </div>

              <h3 className="text-base font-black text-stone-900 tracking-tight mt-3">{s.name}</h3>
              <p className="text-xs text-stone-500 mt-1 italic font-mono">{s.latinName} {s.author}</p>
              <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
                {s.ringsDesc}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100/60 mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border font-mono ${getWeightBadgeColor(s.weight)}`}>
                  Váha: {s.weight.split(' ')[0]}
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border font-mono ${getHardnessBadgeColor(s.hardness)}`}>
                  {s.hardness.split(' ')[0]}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700" />
            </div>
          </div>
        ))}
      </div>

      {filteredSpecies.length === 0 && (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-400 space-y-4">
          <Compass className="w-12 h-12 text-stone-300 mx-auto animate-pulse" />
          <p className="text-sm font-medium">Žádná dřevina neodpovídá vybraným filtrům.</p>
        </div>
      )}

      {/* Detailed Specimen Modal (Specimen Card) */}
      {selectedSpecies && (
        <div 
          onClick={() => setSelectedSpecies(null)}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in py-10 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden border border-stone-200 relative my-auto cursor-default"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between items-start gap-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 font-mono tracking-widest uppercase bg-emerald-50 px-2 py-0.5 rounded">
                  Botanický vzorek atlasu ({selectedSpecies.class === 'jehlicnate' ? 'Jehličnaté' : 'Listnaté'})
                </span>
                <h3 className="text-2xl font-black text-stone-900 tracking-tight mt-1">{selectedSpecies.name}</h3>
                <p className="text-sm text-stone-500 font-mono italic">
                  {selectedSpecies.latinName} {selectedSpecies.author}
                </p>
              </div>

              {/* Navigation controls & Close Button */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {navList.length > 1 && (
                  <div className="flex items-center space-x-1.5 bg-white border border-stone-200 p-1 rounded-xl shadow-3xs">
                    <button
                      onClick={handlePrevSpecies}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-50 active:bg-stone-100 transition-colors flex items-center justify-center shrink-0"
                      title="Předchozí dřevina (Klávesa ← / vlevo)"
                    >
                      <ChevronLeft className="w-4 h-4 font-bold" />
                    </button>
                    <span className="text-xs font-mono font-bold text-stone-600 px-1 cursor-default select-none">
                      {currentIndex + 1} / {navList.length}
                    </span>
                    <button
                      onClick={handleNextSpecies}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-50 active:bg-stone-100 transition-colors flex items-center justify-center shrink-0"
                      title="Následující dřevina (Klávesa → / vpravo)"
                    >
                      <ChevronRight className="w-4 h-4 font-bold" />
                    </button>
                  </div>
                )}

                <button
                  id="close-atlas-modal"
                  onClick={() => setSelectedSpecies(null)}
                  className="p-1.5 px-3.5 rounded-xl border border-stone-200 text-stone-700 bg-white hover:bg-stone-50 transition-colors text-xs font-black shadow-3xs"
                >
                  ✕ zavřít
                </button>
              </div>
            </div>

            {/* Specimen Details Content */}
            <div className="p-6 space-y-6">
              {/* Cuts Gallery */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <h4 className="text-xs font-extrabold uppercase font-mono text-stone-400 tracking-wider">Metodické zobrazení anatomických řezů:</h4>
                  {getScientificCode(selectedSpecies.id) && (
                    <a
                      href={`https://www.wsl.ch/land/products/dendro/species.php?code=${getScientificCode(selectedSpecies.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 hover:bg-emerald-100/80 transition-all shadow-3xs cursor-pointer self-start"
                    >
                      <span>Vědecká databáze WSL (Kód: {getScientificCode(selectedSpecies.id)})</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Příčný řez (P) */}
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-150 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-stone-200/40">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-black text-[10px] inline-flex items-center justify-center shadow-3xs shrink-0">P</span>
                          <span className="text-xs font-extrabold text-stone-700 uppercase tracking-wider font-mono">Příčný řez</span>
                        </div>
                      </div>
                      <WoodCutVisualizer species={selectedSpecies} cutType="P" className="w-full aspect-square mb-2.5 shadow-2xs" />
                      <p className="text-[11px] text-stone-500 font-mono leading-relaxed mt-1">{selectedSpecies.pDesc}</p>
                    </div>
                  </div>

                  {/* Radiální řez (R) */}
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-150 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-stone-200/40">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono font-black text-[10px] inline-flex items-center justify-center shadow-3xs shrink-0">R</span>
                          <span className="text-xs font-extrabold text-stone-700 uppercase tracking-wider font-mono">Radiální řez</span>
                        </div>
                      </div>
                      <WoodCutVisualizer species={selectedSpecies} cutType="R" className="w-full aspect-square mb-2.5 shadow-2xs" />
                      <p className="text-[11px] text-stone-500 font-mono leading-relaxed mt-1">{selectedSpecies.rDesc}</p>
                    </div>
                  </div>

                  {/* Tangenciální řez (T) */}
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-150 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-stone-200/40">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-mono font-black text-[10px] inline-flex items-center justify-center shadow-3xs shrink-0">T</span>
                          <span className="text-xs font-extrabold text-stone-700 uppercase tracking-wider font-mono">Tangenciální řez</span>
                        </div>
                      </div>
                      <WoodCutVisualizer species={selectedSpecies} cutType="T" className="w-full aspect-square mb-2.5 shadow-2xs" />
                      <p className="text-[11px] text-stone-500 font-mono leading-relaxed mt-1">{selectedSpecies.tDesc}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attributes breakdown grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100 text-sm">
                <div>
                  <h4 className="text-xs font-extrabold uppercase font-mono text-stone-400 tracking-wider mb-3">Botanický popis stavby</h4>
                  <div className="divide-y divide-stone-100 text-xs">
                    <div className="py-2 flex justify-between items-start gap-4">
                      <span className="font-mono text-stone-500 shrink-0">Pikantní doplňky / Vůně:</span>
                      <span className="font-semibold text-stone-900 text-right leading-tight max-w-[60%] sm:max-w-[70%]">
                        {selectedSpecies.specialFeatures ? selectedSpecies.specialFeatures[0] : 'Bez zápachu'}
                      </span>
                    </div>
                    <div className="py-2 flex justify-between items-start gap-4">
                      <span className="font-mono text-stone-500 shrink-0">Letokruhy:</span>
                      <span className="font-semibold text-stone-900 text-right leading-tight max-w-[60%] sm:max-w-[70%]">
                        {selectedSpecies.ringsDesc}
                      </span>
                    </div>
                    <div className="py-2 flex justify-between items-start gap-4 animate-fade-in">
                      <span className="font-mono text-stone-500 shrink-0">Hmotnost:</span>
                      <span className="font-semibold text-stone-900 text-right leading-tight max-w-[60%] sm:max-w-[70%]">
                        {selectedSpecies.weight}
                      </span>
                    </div>
                    <div className="py-2 flex justify-between items-start gap-4">
                      <span className="font-mono text-stone-500 shrink-0">Běl / Sapwood:</span>
                      <span className="font-semibold text-stone-900 text-right leading-tight max-w-[60%] sm:max-w-[70%]">
                        {selectedSpecies.sapwoodColor}
                      </span>
                    </div>
                    {selectedSpecies.heartwoodColor && (
                      <div className="py-2 flex justify-between items-start gap-4">
                        <span className="font-mono text-stone-500 shrink-0">Jádro / Heartwood:</span>
                        <span className="font-semibold text-stone-900 text-right leading-tight max-w-[60%] sm:max-w-[70%]">
                          {selectedSpecies.heartwoodColor}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase font-mono text-stone-400 tracking-wider">Metodické nápovědy k určování</h4>
                  <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 space-y-2">
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Chcete-li bezpečně určit dřevinu **{selectedSpecies.name}**, hledejte v klíči následující cestu:
                    </p>
                    <div className="p-3 bg-stone-100/50 rounded-lg text-xs font-mono font-medium text-stone-700 flex flex-wrap items-center gap-1.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full inline-block shrink-0" />
                      <span>{selectedSpecies.class === 'jehlicnate' ? 'Jehličnany' : 'Listnáče'}</span>
                      <ChevronRight className="w-3" />
                      <span>{selectedSpecies.hasHeartwood ? 'S jádrem (vylišeno)' : 'Bez jádra (bělové)'}</span>
                      <ChevronRight className="w-3" />
                      <span className="text-emerald-700 font-bold">
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
              
              {/* Botanical & Anatomical References cleanly integrated once at the bottom of the modal */}
              <div className="pt-2 border-t border-stone-150">
                <BotanicalReferences species={selectedSpecies} />
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
