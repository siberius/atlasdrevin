import React, { useState } from 'react';
import { ALL_SPECIES } from '../data/woodData';
import { TreeSpecies } from '../types';
import { WoodCutVisualizer } from './WoodCutVisualizer';
import { 
  ArrowLeftRight, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  ShieldCheck, 
  Bookmark, 
  Compass, 
  Fingerprint, 
  Scale, 
  FlameKindling,
  Info
} from 'lucide-react';

export const ComparatorMode: React.FC = () => {
  const [leftSpeciesId, setLeftSpeciesId] = useState<string>('smrk');
  const [rightSpeciesId, setRightSpeciesId] = useState<string>('jedle');
  
  const [activeCutType, setActiveCutType] = useState<'P' | 'R' | 'T'>('P');
  const [viewMode, setViewMode] = useState<'macro' | 'micro'>('macro');

  const leftSpecies = ALL_SPECIES.find(s => s.id === leftSpeciesId) || ALL_SPECIES[0];
  const rightSpecies = ALL_SPECIES.find(s => s.id === rightSpeciesId) || ALL_SPECIES[1];

  // Helper helper to format resin canals text
  const formatResinCanals = (species: TreeSpecies) => {
    if (species.class === 'listnate') return 'Chybí (listnatá dřevina nemá pryskyřičné kanálky)';
    if (!species.hasResinCanals) return 'Chybí';
    if (species.hasResinCanals === 'many') return 'Přítomny - četné, velké (zřetelné)';
    if (species.hasResinCanals === 'few') return 'Přítomny - drobné, ojedinělé';
    return 'Přítomny';
  };

  const getWeightLabel = (weight: string) => {
    switch (weight) {
      case 'lehke': return 'Lehké dřevo ⚖️';
      case 'stredni': return 'Středně těžké ⚖️';
      case 'tezke': return 'Těžké dřevo ⚖️';
      default: return weight;
    }
  };

  const getHardnessLabel = (hardness: string) => {
    switch (hardness) {
      case 'mekke': return 'Měkké dřevo 🪓';
      case 'stredne_tvrde': return 'Středně tvrdé 🪓';
      case 'tvrde': return 'Tvrdé dřevo 🪓';
      default: return hardness;
    }
  };

  // Pre-determined diagnostic highlight text for Spruce vs Fir (smrk vs jedle)
  const isSpruceVsFir = 
    (leftSpeciesId === 'smrk' && rightSpeciesId === 'jedle') || 
    (leftSpeciesId === 'jedle' && rightSpeciesId === 'smrk');

  return (
    <div className="space-y-6 animate-fade-in" id="comparator-root">
      
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-stone-850 to-stone-900 text-stone-100 p-6 rounded-2xl shadow-sm border border-stone-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-amber-600/30 text-amber-300 text-[10px] font-mono rounded border border-amber-500/20 font-bold uppercase tracking-widest">Studijní pomůcka</span>
            <span className="text-xs text-stone-400 font-semibold">• Srovnejte jakékoli 2 dřeviny</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-amber-500" />
            <span>Interaktivní srovnávač (Bento-Grid porovnání)</span>
          </h2>
          <p className="text-xs text-stone-300 leading-relaxed max-w-2xl">
            Vylučte chybné odpovědi u zkoušky! Tento nástroj vám umožní prozkoumat makroskopickou a mikroskopickou stavbu dříví u dvou vzorků najednou, včetně porovnání největšího zkouškového chytáku: <strong>smrku vs. jedle</strong>.
          </p>
        </div>
      </div>

      {/* Selector and Main Controls */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-3xs flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Left selector */}
        <div className="w-full md:w-1/3 space-y-1">
          <label htmlFor="left-species-select" className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest font-mono">První dřevina (Levá strana):</label>
          <select
            id="left-species-select"
            value={leftSpeciesId}
            onChange={(e) => setLeftSpeciesId(e.target.value)}
            className="w-full text-xs font-bold bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
          >
            {ALL_SPECIES.map((spec) => (
              <option key={`left-${spec.id}`} value={spec.id}>
                {spec.name} ({spec.latinName})
              </option>
            ))}
          </select>
        </div>

        {/* Global cut type selector & image view selector */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center shrink-0 w-full md:w-auto">
          {/* Anatomical Cut Selector */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider font-mono mb-1.5">Určovací řez (P/R/T)</span>
            <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200 shadow-3xs">
              {(['P', 'R', 'T'] as const).map((cut) => (
                <button
                  key={`global-cut-${cut}`}
                  onClick={() => setActiveCutType(cut)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono cursor-pointer transition-all ${
                    activeCutType === cut
                      ? 'bg-emerald-600 text-white shadow-3xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  aria-pressed={activeCutType === cut}
                  aria-label={`Zvolit řez ${cut === 'P' ? 'Příčný (P)' : cut === 'R' ? 'Radiální (R)' : 'Tangenciální (T)'}`}
                >
                  {cut === 'P' ? 'Příčný (P)' : cut === 'R' ? 'Středový (R)' : 'Tečný (T)'}
                </button>
              ))}
            </div>
          </div>

          {/* View Model (Macro vs Micro Detail) */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider font-mono mb-1.5">Měřítko (Makro/Mikro)</span>
            <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200 shadow-3xs">
              <button
                onClick={() => setViewMode('macro')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all ${
                  viewMode === 'macro'
                    ? 'bg-amber-600 text-white shadow-3xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-pressed={viewMode === 'macro'}
                aria-label="Nastavit měřítko na Makroskopické (dřevěná deska)"
              >
                Makro 🪵
              </button>
              <button
                onClick={() => setViewMode('micro')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all ${
                  viewMode === 'micro'
                    ? 'bg-blue-600 text-white shadow-3xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-pressed={viewMode === 'micro'}
                aria-label="Nastavit měřítko na Mikroskopické (detaily buněk)"
              >
                Detail 🔬
              </button>
            </div>
          </div>
        </div>

        {/* Right selector */}
        <div className="w-full md:w-1/3 space-y-1">
          <label htmlFor="right-species-select" className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest font-mono text-left md:text-right">Druhá dřevina (Pravá strana):</label>
          <select
            id="right-species-select"
            value={rightSpeciesId}
            onChange={(e) => setRightSpeciesId(e.target.value)}
            className="w-full text-xs font-bold bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-800 focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
          >
            {ALL_SPECIES.map((spec) => (
              <option key={`right-${spec.id}`} value={spec.id}>
                {spec.name} ({spec.latinName})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Visual Workspace SidebySide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        
        {/* Left Card Visualizer */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col space-y-4">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <div>
              <span className="text-[9px] font-extrabold uppercase font-mono tracking-widest text-stone-400 bg-stone-100 px-2 py-0.5 rounded">Vzorek vlevo</span>
              <h3 className="text-base font-black text-stone-900 mt-1">{leftSpecies.name}</h3>
              <p className="text-[11px] text-stone-500 italic font-mono mt-0.5">{leftSpecies.latinName}</p>
            </div>
          </div>

          <div className="w-full aspect-square md:aspect-video lg:aspect-square bg-stone-50 rounded-xl overflow-hidden shadow-inner border border-stone-150">
            <WoodCutVisualizer
              key={`comp-left-${leftSpeciesId}`}
              species={leftSpecies}
              cutType={activeCutType}
              initialViewMode={viewMode}
              simplified={true}
              className="w-full h-full"
            />
          </div>

          <div className="bg-stone-50/70 rounded-xl p-3 border border-stone-205 text-xs text-stone-600 leading-relaxed font-sans shadow-3xs">
            <div className="font-bold text-stone-700 text-[11px] uppercase tracking-wider font-mono mb-1">Popis textury ({activeCutType}-řez):</div>
            {activeCutType === 'P' ? leftSpecies.pDesc : activeCutType === 'R' ? leftSpecies.rDesc : leftSpecies.tDesc}
          </div>
        </div>

        {/* Right Card Visualizer */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col space-y-4">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <div>
              <span className="text-[9px] font-extrabold uppercase font-mono tracking-widest text-stone-400 bg-stone-100 px-2 py-0.5 rounded">Vzorek vpravo</span>
              <h3 className="text-base font-black text-stone-900 mt-1">{rightSpecies.name}</h3>
              <p className="text-[11px] text-stone-500 italic font-mono mt-0.5">{rightSpecies.latinName}</p>
            </div>
          </div>

          <div className="w-full aspect-square md:aspect-video lg:aspect-square bg-stone-50 rounded-xl overflow-hidden shadow-inner border border-stone-150">
            <WoodCutVisualizer
              key={`comp-right-${rightSpeciesId}`}
              species={rightSpecies}
              cutType={activeCutType}
              initialViewMode={viewMode}
              simplified={true}
              className="w-full h-full"
            />
          </div>

          <div className="bg-stone-50/70 rounded-xl p-3 border border-stone-205 text-xs text-stone-600 leading-relaxed font-sans shadow-3xs">
            <div className="font-bold text-stone-700 text-[11px] uppercase tracking-wider font-mono mb-1">Popis textury ({activeCutType}-řez):</div>
            {activeCutType === 'P' ? rightSpecies.pDesc : activeCutType === 'R' ? rightSpecies.rDesc : rightSpecies.tDesc}
          </div>
        </div>

      </div>

      {/* Spruce vs Fir Diagnostic Box */}
      {isSpruceVsFir && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 shadow-sm space-y-3 border-l-4 border-l-amber-500 animate-pulse-slow">
          <h4 className="font-extrabold text-xs text-amber-850 uppercase font-mono tracking-widest flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Zkouškový srovnávací blesk: Smrk vs. Jedle</span>
          </h4>
          <p className="text-xs text-amber-900 font-sans leading-relaxed">
            Toto je nejčastější kámen úrazu u zkoušek! Smrk a jedle jsou velmi podobné jehličnany, ale s těmito 4 pravidly je bezpečně rozeznáte:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs font-sans text-stone-750 pt-1">
            <div className="bg-white/60 p-3 rounded-xl border border-amber-100">
              <span className="font-bold text-amber-950 block mb-0.5">1. Pryskyřičné kanálky (P-řez)</span>
              <p className="leading-relaxed">
                <strong>Smrk:</strong> Vždy má pryskyřičné kanálky. Hledejte drobná bílá očička (příčný řez) nebo drobné světlé proužky.<br />
                <strong>Jedle:</strong> Nikdy pryskyřičné kanálky nemá. Příčný řez je zcela homogenní bez bílých teček.
              </p>
            </div>
            <div className="bg-white/60 p-3 rounded-xl border border-amber-100">
              <span className="font-bold text-amber-950 block mb-0.5">2. Pryskyřičná vůně</span>
              <p className="leading-relaxed">
                <strong>Smrk:</strong> Voní příjemně a čerstvě po lesní pryskyřici.<br />
                <strong>Jedle:</strong> Nevoní po pryskyřici. Suchá voní nevýrazně, vlhká má typický zatuchlý nebo kyselkavý zápach.
              </p>
            </div>
            <div className="bg-white/60 p-3 rounded-xl border border-amber-100">
              <span className="font-bold text-amber-950 block mb-0.5">3. Zbarvení a vzhled sukových přeslenů</span>
              <p className="leading-relaxed">
                <strong>Smrk:</strong> Dřevo je žlutobílé s lesklým medově-oranžovým odstínem.<br />
                <strong>Jedle:</strong> Nevýrazně šedobílé dříví bez lesku, často vykazuje matný namodralý nebo fialový tón.
              </p>
            </div>
            <div className="bg-white/60 p-3 rounded-xl border border-amber-100">
              <span className="font-bold text-amber-950 block mb-0.5">4. Svislé a radiální zvlnění kořenů</span>
              <p className="leading-relaxed">
                Sukové dírkování u jedle mívá okrouhlé a rovné otvory, zatímco smrk vykazuje šikmější ovály se zřetelnými bělmo-jádrovými barevnými lemy.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Comparative Bento-Grid */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono pl-1">Komparativní bento grid (Anatomické parametry)</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Botanical taxonomy */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-3xs space-y-3 flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-500" />
              <span>Taxonomické zařazení</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-sans border-t border-stone-100 pt-3">
              <div>
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vlevo</span>
                <span className="font-bold text-stone-850 mt-0.5 block">{leftSpecies.class === 'jehlicnate' ? 'Jehličnatá (Měkká)' : 'Listnatá dříví'}</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">{leftSpecies.class}</span>
              </div>
              <div className="border-l border-stone-105 pl-4">
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vpravo</span>
                <span className="font-bold text-stone-850 mt-0.5 block">{rightSpecies.class === 'jehlicnate' ? 'Jehličnatá (Měkká)' : 'Listnatá dříví'}</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">{rightSpecies.class}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Resin Canals */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-3xs space-y-3 flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Fingerprint className="w-3.5 h-3.5 text-amber-500" />
              <span>Pryskyřičné kanálky</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-sans border-t border-stone-100 pt-3">
              <div>
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vlevo</span>
                <span className="font-bold text-stone-850 mt-1 block leading-normal">{formatResinCanals(leftSpecies)}</span>
              </div>
              <div className="border-l border-stone-105 pl-4">
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vpravo</span>
                <span className="font-bold text-stone-850 mt-1 block leading-normal">{formatResinCanals(rightSpecies)}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Pores porosity (listnate only) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-3xs space-y-3 flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <FlameKindling className="w-3.5 h-3.5 text-blue-500" />
              <span>Uspořádání cév (pórů)</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-sans border-t border-stone-100 pt-3">
              <div>
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vlevo</span>
                {leftSpecies.class === 'listnate' ? (
                  <span className="font-bold text-stone-850 mt-1 block leading-normal">
                    {leftSpecies.porosity === 'kruhovite' ? 'Kruhovitě pórovité ⭕' : 
                     leftSpecies.porosity === 'polokruhovite' ? 'Polokruhovitě pórovité 🌗' : 
                     'Roztroušeně pórovité 🌌'}
                  </span>
                ) : (
                  <span className="text-stone-400 italic mt-1 block">Bez cév (jehličnan má tracheidy)</span>
                )}
              </div>
              <div className="border-l border-stone-105 pl-4">
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vpravo</span>
                {rightSpecies.class === 'listnate' ? (
                  <span className="font-bold text-stone-850 mt-1 block leading-normal">
                    {rightSpecies.porosity === 'kruhovite' ? 'Kruhovitě pórovité ⭕' : 
                     rightSpecies.porosity === 'polokruhovite' ? 'Polokruhovitě pórovité 🌗' : 
                     'Roztroušeně pórovité 🌌'}
                  </span>
                ) : (
                  <span className="text-stone-400 italic mt-1 block">Bez cév (jehličnan má tracheidy)</span>
                )}
              </div>
            </div>
          </div>

          {/* Card 4: Fading heartwood difference */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-3xs space-y-3 flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
              <span>Vylišení jádra a běli</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-sans border-t border-stone-100 pt-3">
              <div>
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vlevo</span>
                <span className="font-bold text-stone-850 mt-1 block leading-normal">
                  {leftSpecies.hasHeartwood ? 'Járové dřevo vylišeno (barevný kontrast) 🪵' : 'Bělové dříví (bez barevného jádra) 🪵'}
                </span>
                {leftSpecies.heartwoodColor && (
                  <span className="text-[10px] text-stone-500 block mt-1">Střed: {leftSpecies.heartwoodColor}</span>
                )}
              </div>
              <div className="border-l border-stone-105 pl-4">
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vpravo</span>
                <span className="font-bold text-stone-850 mt-1 block leading-normal">
                  {rightSpecies.hasHeartwood ? 'Járové dřevo vylišeno (barevný kontrast) 🪵' : 'Bělové dříví (bez barevného jádra) 🪵'}
                </span>
                {rightSpecies.heartwoodColor && (
                  <span className="text-[10px] text-stone-500 block mt-1">Střed: {rightSpecies.heartwoodColor}</span>
                )}
              </div>
            </div>
          </div>

          {/* Card 5: Physical statistics (Weight and Hardness) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-3xs space-y-3 flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-purple-500" />
              <span>Vlastnosti dříví</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-sans border-t border-stone-100 pt-3">
              <div className="space-y-1.5">
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vlevo</span>
                <span className="font-bold text-stone-700 block text-[11px] bg-stone-50 p-1 rounded border border-stone-200/50 text-center">
                  {getWeightLabel(leftSpecies.weight)}
                </span>
                <span className="font-bold text-stone-700 block text-[11px] bg-stone-50 p-1 rounded border border-stone-200/50 text-center">
                  {getHardnessLabel(leftSpecies.hardness)}
                </span>
              </div>
              <div className="border-l border-stone-105 pl-4 space-y-1.5">
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vpravo</span>
                <span className="font-bold text-stone-700 block text-[11px] bg-stone-50 p-1 rounded border border-stone-200/50 text-center">
                  {getWeightLabel(rightSpecies.weight)}
                </span>
                <span className="font-bold text-stone-700 block text-[11px] bg-stone-50 p-1 rounded border border-stone-200/50 text-center">
                  {getHardnessLabel(rightSpecies.hardness)}
                </span>
              </div>
            </div>
          </div>

          {/* Card 6: Growth rings transition sharpness */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-3xs space-y-3 flex flex-col justify-between">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Letokruhy a přechody</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-sans border-t border-stone-100 pt-3">
              <div>
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vlevo</span>
                <span className="font-bold text-stone-850 mt-1 block leading-relaxed text-[11px]">{leftSpecies.ringsDesc}</span>
              </div>
              <div className="border-l border-stone-105 pl-4">
                <span className="text-stone-400 block text-[9px] font-mono uppercase">Vzorek vpravo</span>
                <span className="font-bold text-stone-850 mt-1 block leading-relaxed text-[11px]">{rightSpecies.ringsDesc}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Diagnostic Special Features row */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 shadow-3xs">
          <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-3">
            <Bookmark className="w-3.5 h-3.5 text-stone-600 font-bold" />
            <span>Klíčové makroskopické rozpoznávací znaky (Senzorické detaily):</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-stone-600">
            <div className="bg-white p-3.5 rounded-xl border border-stone-150">
              <span className="font-bold text-stone-800 block text-[11px] uppercase tracking-wider font-mono mb-2 text-emerald-800">
                ⭐ {leftSpecies.name}:
              </span>
              <ul className="list-disc list-inside space-y-1 pl-1 text-[11.5px] text-stone-700">
                {leftSpecies.specialFeatures?.map((feat, i) => (
                  <li key={`left-feat-${i}`} className="hover:text-stone-950 transition-colors">{feat}</li>
                )) || <li className="italic">Nebyly uvedeny specifické doplňující diagnostické znaky</li>}
              </ul>
            </div>
            
            <div className="bg-white p-3.5 rounded-xl border border-stone-150">
              <span className="font-bold text-stone-800 block text-[11px] uppercase tracking-wider font-mono mb-2 text-emerald-800">
                ⭐ {rightSpecies.name}:
              </span>
              <ul className="list-disc list-inside space-y-1 pl-1 text-[11.5px] text-stone-700">
                {rightSpecies.specialFeatures?.map((feat, i) => (
                  <li key={`right-feat-${i}`} className="hover:text-stone-950 transition-colors">{feat}</li>
                )) || <li className="italic">Nebyly uvedeny specifické doplňující diagnostické znaky</li>}
              </ul>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
