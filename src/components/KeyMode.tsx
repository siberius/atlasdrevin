import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, HelpCircle, RefreshCcw, Info, Sparkles, AlertCircle } from 'lucide-react';
import { KeyNode, TreeSpecies } from '../types';
import { KEY_NODES, ALL_SPECIES } from '../data/woodData';
import { WoodCutVisualizer, BotanicalReferences } from './WoodCutVisualizer';
import { soundManager } from './SoundManager';
import { InteractiveSchemas } from './InteractiveSchemas';

const LogCutSvg: React.FC<{ cutType: 'P' | 'R' | 'T'; className?: string }> = ({ cutType, className = "w-full max-h-[140px]" }) => {
  switch (cutType) {
    case 'P':
      return (
        <svg viewBox="0 0 160 120" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* BOTTOM HALF of the log */}
          <path d="M 45,80 L 45,110 A 35,14 0 0,0 115,110 L 115,80 Z" fill="#6d5a47" stroke="#4c3d30" strokeWidth="1.2" />
          <line x1="55" y1="80" x2="55" y2="110" stroke="#524335" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="105" y1="80" x2="105" y2="110" stroke="#524335" strokeWidth="1.2" strokeDasharray="4 3" />

          {/* Exposed inner wood cut at the dividing point (y=80) */}
          <ellipse cx="80" cy="80" rx="35" ry="14" fill="#edd6b8" stroke="#a3825e" strokeWidth="1.2" />
          <ellipse cx="80" cy="80" rx="28" ry="11" fill="none" stroke="#a3825e" strokeWidth="0.8" opacity="0.6" strokeDasharray="4 2" />
          <ellipse cx="80" cy="80" rx="21" ry="8" fill="none" stroke="#a3825e" strokeWidth="0.8" opacity="0.6" strokeDasharray="4 2" />
          <ellipse cx="80" cy="80" rx="14" ry="5" fill="none" stroke="#a3825e" strokeWidth="0.8" opacity="0.6" strokeDasharray="4 2" />

          {/* Cutting plane - Green horizontal glass pane passing through center of the GAP */}
          <path d="M 12,71 L 118,45 L 148,60 L 42,86 Z" fill="rgba(16, 185, 129, 0.28)" stroke="#10b981" strokeWidth="1.8" />
          
          {/* Direction plane arrows on green glass - showing the horizontal orientation */}
          <path d="M 62,65 L 85,59" stroke="#047857" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 79,56 L 86,59 L 81,63" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          <path d="M 28,73 L 46,68.5" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 41,65.5 L 46,68.5 L 42,72.5" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          <path d="M 98,63 L 116,58.5" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 111,55.5 L 116,58.5 L 112,62.5" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* TOP HALF of the log */}
          <path d="M 45,20 L 45,52 A 35,14 0 0,0 115,52 L 115,20 Z" fill="#6d5a47" stroke="#4c3d30" strokeWidth="1.2" />
          <line x1="55" y1="20" x2="55" y2="52" stroke="#524335" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="105" y1="20" x2="105" y2="52" stroke="#524335" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="80" y1="20" x2="80" y2="52" stroke="#524335" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          
          {/* Top Cap (concentric growth rings) */}
          <ellipse cx="80" cy="20" rx="35" ry="14" fill="#edd6b8" stroke="#a3825e" strokeWidth="1.8" />
          <ellipse cx="80" cy="20" rx="28" ry="11" fill="none" stroke="#a3825e" strokeWidth="1.2" />
          <ellipse cx="80" cy="20" rx="21" ry="8" fill="none" stroke="#a3825e" strokeWidth="1.2" />
          <ellipse cx="80" cy="20" rx="14" ry="5" fill="none" stroke="#a3825e" strokeWidth="1.2" />
          <ellipse cx="80" cy="20" rx="7" ry="2.5" fill="none" stroke="#a3825e" strokeWidth="1.2" />
          <ellipse cx="80" cy="20" rx="1.5" ry="0.6" fill="#604223" />
        </svg>
      );
    case 'R':
      return (
        <svg viewBox="0 0 160 120" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Trunk main body */}
          <path d="M 45,35 L 45,95 A 35,14 0 0,0 115,95 L 115,35 Z" fill="#6d5a47" stroke="#4c3d30" strokeWidth="1.5" />
          <line x1="55" y1="45" x2="55" y2="85" stroke="#524335" strokeWidth="1.2" strokeDasharray="6 4" />
          <line x1="105" y1="45" x2="105" y2="85" stroke="#524335" strokeWidth="1.2" strokeDasharray="6 4" />
          
          {/* Top Cap */}
          <ellipse cx="80" cy="35" rx="35" ry="14" fill="#edd6b8" stroke="#a3825e" strokeWidth="1.8" />
          <ellipse cx="80" cy="35" rx="28" ry="11" fill="none" stroke="#a3825e" strokeWidth="1.2" />
          <ellipse cx="80" cy="35" rx="21" ry="8" fill="none" stroke="#a3825e" strokeWidth="1.2" />
          <ellipse cx="80" cy="35" rx="14" ry="5" fill="none" stroke="#a3825e" strokeWidth="1.2" />
          <ellipse cx="80" cy="35" rx="7" ry="2.5" fill="none" stroke="#a3825e" strokeWidth="1.2" />
          <ellipse cx="80" cy="35" rx="1.5" ry="0.6" fill="#604223" />

          {/* Exposed Radial Cut Faces overlay */}
          <polygon points="80,35 55,45 55,105 80,95" fill="#e8d3ba" stroke="#a3825e" strokeWidth="1" />
          <polygon points="80,35 105,45 105,105 80,95" fill="#edd6b8" stroke="#a3825e" strokeWidth="1" />
          
          <line x1="76" y1="37" x2="76" y2="97" stroke="#a3825e" strokeWidth="1.2" opacity="0.6" />
          <line x1="72" y1="39" x2="72" y2="99" stroke="#a3825e" strokeWidth="1.5" opacity="0.7" />
          <line x1="61" y1="41" x2="61" y2="101" stroke="#a3825e" strokeWidth="1.2" opacity="0.6" />
          <line x1="62" y1="43" x2="62" y2="103" stroke="#a3825e" strokeWidth="1.8" opacity="0.85" />
          <line x1="58" y1="44" x2="58" y2="104" stroke="#a3825e" strokeWidth="1.2" opacity="0.5" />

          <line x1="84" y1="38" x2="84" y2="98" stroke="#a3825e" strokeWidth="1.2" opacity="0.6" />
          <line x1="88" y1="40" x2="88" y2="100" stroke="#a3825e" strokeWidth="1.5" opacity="0.7" />
          <line x1="93" y1="42" x2="93" y2="102" stroke="#a3825e" strokeWidth="1.2" opacity="0.6" />
          <line x1="98" y1="44" x2="98" y2="104" stroke="#a3825e" strokeWidth="1.8" opacity="0.85" />
          <line x1="102" y1="45" x2="102" y2="105" stroke="#a3825e" strokeWidth="1.2" opacity="0.5" />

          {/* Cutting plane - Two vertical glass planes forming an 'L' shape */}
          <polygon points="35,26 80,12 80,88 35,102" fill="rgba(59, 130, 246, 0.22)" stroke="#2563eb" strokeWidth="1.8" />
          <polygon points="80,12 125,26 125,102 80,88" fill="rgba(59, 130, 246, 0.28)" stroke="#2563eb" strokeWidth="1.8" />
          <line x1="80" y1="12" x2="80" y2="88" stroke="#1d4ed8" strokeWidth="2.2" />

          {/* Direction vertical arrows on both wings */}
          <path d="M 48,53 L 48,68" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 45,64 L 48,68 L 51,64" fill="none" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          <path d="M 112,53 L 112,68" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 109,64 L 112,68 L 115,64" fill="none" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          <line x1="80" y1="35" x2="80" y2="95" stroke="#a3825e" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
        </svg>
      );
    case 'T':
      return (
        <svg viewBox="0 0 160 120" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="t-helper-top-cap-clip">
              <polygon points="0,0 160,0 160,25 110,39 85,47 0,55" />
            </clipPath>
            <clipPath id="t-helper-cut-face-clip-path">
              <polygon points="85,47 110,39 110,99 85,107" />
            </clipPath>
          </defs>

          {/* Left wing of the amber glass plane -drawn BEHIND the log- */}
          <polygon points="70,52 85,47 85,107 70,112" fill="rgba(245, 158, 11, 0.22)" stroke="#d97706" strokeWidth="1.8" />
          <path d="M 77,75 L 77,90" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 74,86 L 77,90 L 80,86" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Trunk main body */}
          <path d="M 45,35 L 45,95 A 35,14 0 0,0 115,95 L 115,35 Z" fill="#6d5a47" stroke="#4c3d30" strokeWidth="1.5" />
          <line x1="55" y1="45" x2="55" y2="85" stroke="#524335" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.6" />
          
          {/* Top Cap */}
          <g clipPath="url(#t-helper-top-cap-clip)">
            <ellipse cx="80" cy="35" rx="35" ry="14" fill="#edd6b8" stroke="#a3825e" strokeWidth="1.8" />
            <ellipse cx="80" cy="35" rx="28" ry="11" fill="none" stroke="#a3825e" strokeWidth="1.2" />
            <ellipse cx="80" cy="35" rx="21" ry="8" fill="none" stroke="#a3825e" strokeWidth="1.2" />
            <ellipse cx="80" cy="35" rx="14" ry="5" fill="none" stroke="#a3825e" strokeWidth="1.2" />
            <ellipse cx="80" cy="35" rx="7" ry="2.5" fill="none" stroke="#a3825e" strokeWidth="1.2" />
            <ellipse cx="80" cy="35" rx="1.5" ry="0.6" fill="#604223" />
          </g>

          {/* Sliced wood flat face */}
          <polygon points="85,47 110,39 110,99 85,107" fill="#edd6b8" stroke="#a3825e" strokeWidth="1.2" />

          {/* Parabolic wavy fládr arches drawn precisely */}
          <g clipPath="url(#t-helper-cut-face-clip-path)">
            <path d="M 85,95 Q 97.5,60 110,87" fill="none" stroke="#8e6844" strokeWidth="1.8" />
            <path d="M 85,83 Q 97.5,45 110,75" fill="none" stroke="#8e6844" strokeWidth="2.4" opacity="0.95" />
            <path d="M 85,71 Q 97.5,30 110,63" fill="none" stroke="#8e6844" strokeWidth="1.5" opacity="0.9" />
            <path d="M 85,59 Q 97.5,15 110,51" fill="none" stroke="#8e6844" strokeWidth="2.8" opacity="0.85" />
            <path d="M 85,47 Q 97.5,0 110,39" fill="none" stroke="#8e6844" strokeWidth="2.2" opacity="0.75" />
            <path d="M 85,107 Q 95,90 105,99" fill="none" stroke="#8e6844" strokeWidth="1.2" opacity="0.7" />
          </g>

          {/* Cutting plane - Amber vertical glass pane */}
          <polygon points="85,47 120,35 120,95 85,107" fill="rgba(245, 158, 11, 0.25)" stroke="#d97706" strokeWidth="1.8" />

          {/* Direction vertical arrows on both wings */}
          <path d="M 102,62 L 102,77" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 99,73 L 102,77 L 105,73" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
};

interface KeyModeProps {
  onEarnXp: (xp: number, speciesId: string, correct: boolean, caseId?: string) => void;
  onPlayClickSound: () => void;
  onPlaySuccessSound: () => void;
  onPlayErrorSound: () => void;
}

const LOCAL_PROGRESS_KEY = 'wood_botany_key_progress_v1';

export const KeyMode: React.FC<KeyModeProps> = ({
  onEarnXp,
  onPlayClickSound,
  onPlaySuccessSound,
  onPlayErrorSound
}) => {
  const jedleSpecies = ALL_SPECIES.find(s => s.id === 'jedle');
  
  // Load state from local storage or default
  const [currentNodeId, setCurrentNodeId] = useState<string>(() => {
    const raw = localStorage.getItem(LOCAL_PROGRESS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.currentNodeId === 'string') {
          return parsed.currentNodeId;
        }
      } catch (e) {
        console.error('Failed to parse cached key state', e);
      }
    }
    return 'start';
  });

  const [history, setHistory] = useState<string[]>(() => {
    const raw = localStorage.getItem(LOCAL_PROGRESS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.history)) {
          return parsed.history;
        }
      } catch (e) {}
    }
    return [];
  });

  const [hoveredChoiceHint, setHoveredChoiceHint] = useState<'P' | 'R' | 'T' | 'PRT' | null>(null);
  const [showHelperModal, setShowHelperModal] = useState<boolean>(false);
  const [helperCutType, setHelperCutType] = useState<'P' | 'R' | 'T'>('P');
  const [keyViewMode, setKeyViewMode] = useState<'step' | 'schemas'>('step');

  const [finishedSpecies, setFinishedSpecies] = useState<TreeSpecies | null>(() => {
    const raw = localStorage.getItem(LOCAL_PROGRESS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.finishedSpecies) {
          return parsed.finishedSpecies;
        }
      } catch (e) {}
    }
    return null;
  });

  // Persist state to local storage on adjustments
  useEffect(() => {
    localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify({
      currentNodeId,
      history,
      finishedSpecies
    }));
  }, [currentNodeId, history, finishedSpecies]);

  // Keydown Escape handler for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowHelperModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentNode = KEY_NODES.find(n => n.id === currentNodeId) || KEY_NODES[0];

  const handleChoice = (targetId: string) => {
    onPlayClickSound();
    setHistory(prev => [...prev, currentNodeId]);

    if (targetId.startsWith('SPECIES_')) {
      const specId = targetId.replace('SPECIES_', '');
      const found = ALL_SPECIES.find(s => s.id === specId);
      if (found) {
        setFinishedSpecies(found);
        onPlaySuccessSound();
        onEarnXp(50, found.id, true);
      }
    } else {
      setCurrentNodeId(targetId);
    }
  };

  const handleBack = () => {
    onPlayClickSound();
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentNodeId(prev);
      setFinishedSpecies(null);
    }
  };

  const handleReset = () => {
    onPlayClickSound();
    setCurrentNodeId('start');
    setHistory([]);
    setFinishedSpecies(null);
  };

  // Generate readable history trail
  const getProgressTrail = () => {
    return history.map((hid, index) => {
      const node = KEY_NODES.find(n => n.id === hid);
      return (
        <span key={hid} className="flex items-center text-xs text-stone-500 font-medium">
          {index > 0 && <ChevronRight className="w-3" />}
          <span className="hover:text-emerald-700 cursor-pointer truncate max-w-[120px] ml-1" onClick={() => {
            onPlayClickSound();
            const indexInHistory = history.indexOf(hid);
            setHistory(history.slice(0, indexInHistory));
            setCurrentNodeId(hid);
            setFinishedSpecies(null);
          }}>
            {node?.title}
          </span>
        </span>
      );
    });
  };

  // Get illustrative wood parameters based on current node
  const getIllustrationSpecies = () => {
    if (currentNodeId === 'jehlicnate_bez_jadra') {
      return ALL_SPECIES.find(s => s.id === 'smrk');
    }
    if (currentNodeId === 'jehlicnate_s_jadrem_bez_kanalku') {
      return ALL_SPECIES.find(s => s.id === 'tis');
    }
    if (currentNodeId === 'jehlicnate_s_jadrem_malo_kanalku') {
      return ALL_SPECIES.find(s => s.id === 'modrin');
    }
    if (currentNodeId === 'jehlicnate_s_jadrem_hodne_kanalku') {
      return ALL_SPECIES.find(s => s.id === 'borovice_lesni');
    }
    if (currentNodeId.startsWith('listnate_kruhovite')) {
      return ALL_SPECIES.find(s => s.id === 'dub');
    }
    if (currentNodeId === 'listnate_polokruhovite') {
      return ALL_SPECIES.find(s => s.id === 'tresen');
    }
    if (currentNodeId.startsWith('listnate_roztrousene_viditelne_vsude')) {
      return ALL_SPECIES.find(s => s.id === 'buk');
    }
    if (currentNodeId === 'listnate_roztrousene_radialni_pouze') {
      return ALL_SPECIES.find(s => s.id === 'javor');
    }
    if (currentNodeId.startsWith('listnate_roztrousene_nezretelne')) {
      return ALL_SPECIES.find(s => s.id === 'topol');
    }
    
    // Smart fallbacks so the illustrative model is NEVER empty or non-functional
    if (currentNodeId.includes('listnate')) {
      return ALL_SPECIES.find(s => s.id === 'buk');
    }
    if (currentNodeId.includes('jehlicnate')) {
      return ALL_SPECIES.find(s => s.id === 'jedle');
    }
    
    return ALL_SPECIES.find(s => s.id === 'jedle'); // global root level default
  };

  const illustrationSpecies = getIllustrationSpecies();

  const getCutIndicatorColor = (cut: 'P' | 'R' | 'T' | 'PRT') => {
    switch (cut) {
      case 'P': return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'R': return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'T': return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'PRT': return 'bg-purple-100 text-purple-900 border-purple-300';
    }
  };

  const handleSelectSpeciesFromSchema = (speciesId: string) => {
    const targetId = speciesId === 'vejmutovka' ? 'borovice_vejmutovka' : speciesId;
    const found = ALL_SPECIES.find(s => s.id === targetId);
    if (found) {
      setFinishedSpecies(found);
      setKeyViewMode('step');
      onPlaySuccessSound();
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub Mode Switcher Bar */}
      <div className="flex bg-stone-200/50 p-1 rounded-xl self-start w-full sm:w-auto overflow-hidden border border-stone-200 max-w-sm select-none">
        <button
          onClick={() => { onPlayClickSound(); setKeyViewMode('step'); }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            keyViewMode === 'step' 
              ? 'bg-white text-stone-900 shadow-3xs' 
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          👣 Průvodce určením
        </button>
        <button
          onClick={() => { onPlayClickSound(); setKeyViewMode('schemas'); }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            keyViewMode === 'schemas' 
              ? 'bg-white text-stone-900 shadow-3xs' 
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          📊 Celková schémata klíče
        </button>
      </div>

      {keyViewMode === 'schemas' ? (
        <InteractiveSchemas onSelectSpecies={handleSelectSpeciesFromSchema} />
      ) : (
        <>
          {/* progress & helper header */}
          <div className="flex flex-wrap justify-between items-center bg-stone-50 border border-stone-200/60 rounded-xl p-3 gap-2">
        <div className="flex flex-wrap items-center gap-1 overflow-x-auto py-1">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider font-mono mr-2">Cesta:</span>
          <span className="flex items-center text-xs text-stone-500 font-medium">
            <span className="hover:text-emerald-700 cursor-pointer" onClick={handleReset}>Klíč start</span>
          </span>
          {getProgressTrail()}
          {finishedSpecies && (
            <span className="flex items-center text-xs font-bold text-emerald-700">
              <ChevronRight className="w-3" />
              <span className="ml-1">{finishedSpecies.name}</span>
            </span>
          )}
        </div>

        <button
          onClick={() => setShowHelperModal(true)}
          className="flex items-center space-x-1 text-xs text-emerald-700 font-medium hover:text-emerald-800 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Vysvětlivka řezů</span>
        </button>
      </div>

      {/* Main Grid: Interactive Form & Visual Mockup */}
      {!finishedSpecies ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Decision Node card */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl shadow-xs overflow-hidden flex flex-col h-full">
            {/* Node Title */}
            <div className="p-6 bg-stone-50/50 border-b border-stone-100">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono tracking-widest uppercase bg-emerald-50 px-2 py-0.5 rounded">Tabulka: {currentNode.id}</span>
                  <h2 className="text-xl font-bold text-stone-900 mt-2">{currentNode.title}</h2>
                  {currentNode.subtitle && (
                    <p className="text-sm text-stone-500 mt-1">{currentNode.subtitle}</p>
                  )}
                </div>
                {history.length > 0 && (
                  <button
                    onClick={handleBack}
                    className="p-1 px-2.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors text-xs font-medium flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Zpět</span>
                  </button>
                )}
              </div>
              {currentNode.description && (
                <div className="bg-stone-100/50 rounded-xl p-3.5 text-xs text-stone-600 border border-stone-200/40 mt-4 leading-relaxed">
                  {currentNode.description}
                </div>
              )}
            </div>

            {/* choices */}
            <div className="p-6 space-y-4 flex-1">
              {currentNode.choices.map((choice) => (
                <div
                  key={choice.id}
                  onClick={() => handleChoice(choice.targetNodeId)}
                  onMouseEnter={() => choice.cutHint && setHoveredChoiceHint(choice.cutHint)}
                  onMouseLeave={() => setHoveredChoiceHint(null)}
                  className="group relative border border-stone-200/80 rounded-2xl p-5 hover:border-emerald-500 hover:bg-emerald-50/10 cursor-pointer transition-all duration-200 shadow-3xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="flex items-start gap-4">
                      {/* radio bullet */}
                      <div className="w-5 h-5 rounded-full border border-stone-300 group-hover:border-emerald-600 flex items-center justify-center mt-0.5 transition-colors bg-white shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 scale-0 group-hover:scale-100 transition-transform duration-200" />
                      </div>

                      {/* text content */}
                      <div className="space-y-1">
                        <p className="text-sm text-stone-800 font-medium leading-relaxed group-hover:text-stone-900 transition-colors">
                          {choice.text}
                        </p>
                        {choice.details && (
                          <p className="text-xs text-stone-400 group-hover:text-emerald-700/80 font-mono flex items-center transition-colors pt-1">
                            <Info className="w-3 h-3 mr-1 inline" />
                            <span>{choice.details}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Cut shortcut preview badge */}
                    {choice.cutHint && (
                      <span className={`shrink-0 text-[10px] font-bold px-2.5 py-0.5 rounded-full border font-mono ${getCutIndicatorColor(choice.cutHint)} self-start sm:self-start mt-0.5 ml-9 sm:ml-0`}>
                        Sledovat {choice.cutHint}-řez
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive illustration column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-3xs flex flex-col justify-between flex-1 space-y-4">
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">Dřevní struktura (pomocný model)</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => { onPlayClickSound(); setHoveredChoiceHint('P'); }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all font-mono ${
                    (hoveredChoiceHint === 'P' || !hoveredChoiceHint)
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Příčný (P)
                </button>
                <button
                  onClick={() => { onPlayClickSound(); setHoveredChoiceHint('R'); }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all font-mono ${
                    hoveredChoiceHint === 'R'
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Středový (R)
                </button>
                <button
                  onClick={() => { onPlayClickSound(); setHoveredChoiceHint('T'); }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all font-mono ${
                    hoveredChoiceHint === 'T'
                      ? 'bg-amber-600 text-white border-amber-700'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Tečný (T)
                </button>
              </div>

              {/* Vector schema renders real-time according to decisions or hover hints in a dual bento setup */}
              {(() => {
                const activeSidebarCutType = hoveredChoiceHint === 'PRT' ? 'P' : (hoveredChoiceHint || 'P');
                return (
                  <div className="grid grid-cols-2 gap-4 items-stretch">
                    {/* 3D Schema Card */}
                    <div className="bg-stone-50 border border-stone-150 rounded-2xl p-4 flex flex-col items-center justify-between text-center min-h-[380px] md:min-h-[440px]">
                      <div className="w-full flex-1 flex items-center justify-center">
                        <LogCutSvg cutType={activeSidebarCutType} className="max-h-[280px] w-full transition-transform duration-300 hover:scale-[1.03]" />
                      </div>
                      <span className="mt-2.5 font-mono text-[10px] text-stone-500 font-extrabold uppercase tracking-wide">
                        3D Schéma ({activeSidebarCutType})
                      </span>
                    </div>

                    {/* Real Board Texture Card */}
                    <div className="bg-stone-50 border border-stone-150 rounded-2xl p-4 flex flex-col items-center justify-between min-h-[380px] md:min-h-[440px]">
                      <div className="w-full flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-stone-100 shadow-inner">
                        <WoodCutVisualizer
                          species={illustrationSpecies}
                          cutType={activeSidebarCutType}
                          zoom={true}
                          simplified={true}
                          className="h-[280px] w-full rounded-xl object-cover transition-transform duration-300 hover:scale-[1.03]"
                        />
                      </div>
                      <span className="mt-2.5 font-mono text-[10px] text-stone-500 font-extrabold uppercase tracking-wide truncate max-w-full text-center">
                        Makro ({illustrationSpecies?.name || 'Vzor'})
                      </span>
                    </div>
                  </div>
                );
              })()}

              <div className="text-[11px] text-stone-400 bg-stone-50 p-2 rounded-xl border border-stone-100 font-mono text-center">
                Mění se na základě vašich voleb. Ukazuje typickou makroskopickou stavbu dříví pro vybranou větev klíče.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Final species screen */
        <div className="bg-emerald-600 text-white rounded-3xl overflow-hidden shadow-xl border border-emerald-700 max-w-4xl mx-auto">
          {/* Top colored card banner */}
          <div className="p-8 pb-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 relative overflow-hidden">
            {/* Background sparkle path */}
            <div className="absolute top-0 right-0 py-2 inline-flex opacity-10">
              <Sparkles className="w-64 h-64 text-white" />
            </div>

            <div className="space-y-1 relative z-10">
              <span className="text-[11px] font-extrabold uppercase tracking-widest font-mono text-emerald-200 bg-emerald-700 px-3 py-1 rounded-full border border-emerald-500/50">
                Botanické určení dokončeno! (+50 XP)
              </span>
              <h2 className="text-3.5xl font-black tracking-tight mt-2 flex items-center">
                <CheckCircle2 className="w-8 h-8 mr-2 shrink-0 fill-white text-emerald-600" />
                {finishedSpecies.name}
              </h2>
              <p className="text-lg text-emerald-100 font-mono italic">
                {finishedSpecies.latinName} <span className="not-italic text-sm font-sans text-emerald-200 opacity-80">{finishedSpecies.author}</span>
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 font-bold hover:bg-emerald-50 transition-all shadow-sm flex items-center space-x-2 relative z-10 shrink-0 text-sm"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Určit další vzorek</span>
            </button>
          </div>

          {/* Dynamic Rendered Visualizations Cards */}
          <div className="bg-stone-50 p-8 text-stone-900 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-stone-200">
            <div>
              <WoodCutVisualizer species={finishedSpecies} cutType="P" className="w-full aspect-square shadow-sm" />
              <p className="text-xs text-stone-500 mt-2 font-mono leading-relaxed">{finishedSpecies.pDesc}</p>
            </div>
            <div>
              <WoodCutVisualizer species={finishedSpecies} cutType="R" className="w-full aspect-square shadow-sm" />
              <p className="text-xs text-stone-500 mt-2 font-mono leading-relaxed">{finishedSpecies.rDesc}</p>
            </div>
            <div>
              <WoodCutVisualizer species={finishedSpecies} cutType="T" className="w-full aspect-square shadow-sm" />
              <p className="text-xs text-stone-500 mt-2 font-mono leading-relaxed">{finishedSpecies.tDesc}</p>
            </div>
          </div>

          {/* Properties breakdown */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-emerald-800 text-emerald-50 rounded-b-3xl">
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-emerald-300">Makroskopické vlastnosti</h3>
              <ul className="space-y-2.5 text-sm">
                <li><strong className="text-emerald-100 text-xs uppercase block font-mono">Užitečnost / Třída:</strong> {finishedSpecies.class === 'jehlicnate' ? 'Jehličnatá dřevina (bez cév)' : 'Listnatá dřevina'}</li>
                {finishedSpecies.porosity !== 'none' && (
                  <li><strong className="text-emerald-100 text-xs uppercase block font-mono">Pórovitost:</strong> {finishedSpecies.porosity === 'kruhovite' ? 'Kruhovitě pórovitá' : finishedSpecies.porosity === 'polokruhovite' ? 'Polokruhovitě pórovitá' : 'Roztroušeně pórovitá'}</li>
                )}
                <li><strong className="text-emerald-100 text-xs uppercase block font-mono">Barevnost:</strong> Běl: {finishedSpecies.sapwoodColor} {finishedSpecies.heartwoodColor && `, Jádro: ${finishedSpecies.heartwoodColor}`}</li>
                <li><strong className="text-emerald-100 text-xs uppercase block font-mono">Letokruhy:</strong> {finishedSpecies.ringsDesc}</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-emerald-300">Konstrukční vlastnosti</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-emerald-700/60 pb-1 flex justify-between">
                    <td className="font-mono text-emerald-200">Hustota / váha:</td>
                    <td className="font-semibold text-right">{finishedSpecies.weight}</td>
                  </tr>
                  <tr className="border-b border-emerald-700/60 py-1 flex justify-between">
                    <td className="font-mono text-emerald-200">Tvrdost dřeva:</td>
                    <td className="font-semibold text-right">{finishedSpecies.hardness}</td>
                  </tr>
                </tbody>
              </table>

              {finishedSpecies.specialFeatures && finishedSpecies.specialFeatures.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <h4 className="text-xs uppercase font-mono text-emerald-300 tracking-wider font-bold">Diagnostické doplňky</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {finishedSpecies.specialFeatures.map((feat, ix) => (
                      <span key={ix} className="text-xs px-2.5 py-1 rounded bg-emerald-700/65 text-emerald-100 border border-emerald-500/20">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botanical references at the bottom of key success panel */}
          <div className="mt-6">
            <BotanicalReferences species={finishedSpecies} />
          </div>

        </div>
      )}
    </>
  )}

      {/* Basic Cuts explanation Modal */}
      {showHelperModal && (() => {
        const getHelperCutDetails = () => {
          switch (helperCutType) {
            case 'P':
              return {
                badgeBg: 'bg-emerald-600',
                textColor: 'text-emerald-900',
                title: 'Příčný (transverzální) řez (P)',
                summary: 'Vedený vodorovně / kolmo na osu kmene. Odhaluje kruhové letokruhy, cévy v jarním dřevě a pryskyřičné kanálky.',
                bullets: [
                  'Je to anatomicky nejvýznamnější rovina pro určování dřeva.',
                  'Letokruhy se jeví jako soustředné kružnice se zřetelným jarním (světlejším, řidším) a letním (tmavším, hustším) dřevem.',
                  'U jehličnatých dřevin sledujeme přítomnost pryskyřičných kanálků (drobných světlých či tmavých teček).',
                  'U listnatých dřevin s lupou zkoumáme uspořádání pórů (cév) - zda jsou v kruhu (kruhovitě pórovité) či rovnoměrně rozptýlené (roztroušeně pórovité).'
                ]
              };
            case 'R':
              return {
                badgeBg: 'bg-blue-600',
                textColor: 'text-blue-900',
                title: 'Středový (radiální) řez (R)',
                summary: 'Vedený svisle středem kmene přes dřeň. Odhaluje rovnoběžné pásy letokruhů a zrcátka dřeňových paprsků.',
                bullets: [
                  'Rovina řezu prochází podélně středovou osou kmenu a dření.',
                  'Letokruhy zde tvoří svislé rovnoběžné pruhy střídajícího se jarního a letního dřeva.',
                  'Dřeňové paprsky probíhají přesně kolmo na letokruhy; na tomto řezu se jeví jako příčné lesklé plošky zvané zrcátka.',
                  'Zrcátka jsou vynikajícím rozlišovacím znakem pro dub (vysoká, široká) a buk (středně velká, hustá).'
                ]
              };
            case 'T':
              return {
                badgeBg: 'bg-amber-600',
                textColor: 'text-amber-900',
                title: 'Tečný (tangenciální) řez (T)',
                summary: 'Vedený svisle mimo osu kmene. Vzniká dekorativní parabolická (fládrová) kresba letokruhů ve tvaru V parabol.',
                bullets: [
                  'Rovina řezu je svislá, ale vede mimo střed, tečně k letokruhům.',
                  'Letokruhy vytvářejí charakteristickou parabolickou kresbu tvaru křivek (tzv. fládr).',
                  'Dřeňové paprsky jsou zde protnuty kolmo; strukturně se jeví jako svislá drobná vřetena.',
                  'Rozmístění a velikost těchto vřeten spolehlivě rozlišuje jemnocévné listnáče jako buk a olši.'
                ]
              };
          }
        };

        const details = getHelperCutDetails();

        return (
          <div 
            onClick={() => setShowHelperModal(false)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden border border-stone-200 relative my-auto cursor-default"
            >
              
              {/* Modal Header */}
              <div className="p-4 md:p-5 border-b border-stone-200 bg-stone-50 flex justify-between items-center">
                <div>
                  <h3 className="text-base md:text-lg font-extrabold text-stone-900">Vysvětlivka makroskopických řezů</h3>
                  <p className="text-[11px] text-stone-500 font-medium">Naučte se rozlišovat tři základní roviny řezu kmenem stromu</p>
                </div>
                <button
                  onClick={() => setShowHelperModal(false)}
                  className="text-stone-400 hover:text-stone-600 hover:bg-stone-200 text-xs font-bold font-mono bg-stone-100 px-3 py-1.5 rounded-full transition-all"
                  aria-label="Zavřít"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 md:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                
                {/* Clean Tab Page Selector */}
                <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 shadow-3xs max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => { onPlayClickSound(); setHelperCutType('P'); }}
                    className={`flex-1 text-center py-2 rounded-lg cursor-pointer text-xs font-bold transition-all ${
                      helperCutType === 'P'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-stone-600 hover:bg-stone-200/60'
                    }`}
                  >
                    Příčný rez (P)
                  </button>
                  <button
                    type="button"
                    onClick={() => { onPlayClickSound(); setHelperCutType('R'); }}
                    className={`flex-1 text-center py-2 rounded-lg cursor-pointer text-xs font-bold transition-all ${
                      helperCutType === 'R'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-stone-600 hover:bg-stone-200/60'
                    }`}
                  >
                    Středový rez (R)
                  </button>
                  <button
                    type="button"
                    onClick={() => { onPlayClickSound(); setHelperCutType('T'); }}
                    className={`flex-1 text-center py-2 rounded-lg cursor-pointer text-xs font-bold transition-all ${
                      helperCutType === 'T'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-stone-600 hover:bg-stone-200/60'
                    }`}
                  >
                    Tečný rez (T)
                  </button>
                </div>

                {/* 2-Column Responsive Information Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                  
                  {/* Left Column: Descriptions and educational texts (Order-2 on mobile, Order-1 on desktop) */}
                  <div className="order-2 md:order-1 space-y-3">
                    <div className="space-y-1">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border border-stone-200/80 font-mono tracking-wider text-stone-500 bg-stone-50`}>
                        {helperCutType === 'P' ? 'TRANSVERZÁLNÍ' : helperCutType === 'R' ? 'RADIÁLNÍ' : 'TANGENCIÁLNÍ'} ROVINA
                      </span>
                      <h4 className="font-extrabold text-stone-900 text-base sm:text-lg leading-tight">
                        {details?.title}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed font-semibold italic">
                        {details?.summary}
                      </p>
                    </div>

                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/60 space-y-2">
                      <h5 className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                        Co zkoumáme a pozorujeme:
                      </h5>
                      <ul className="space-y-1.5">
                        {details?.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-[11px] text-stone-600 leading-relaxed">
                            <span className="text-emerald-500 font-extrabold shrink-0 mt-0.5">✓</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Schema and macro texture side-by-side (Order-1 on mobile, Order-2 on desktop) */}
                  <div className="order-1 md:order-2 space-y-2">
                    <div className="grid grid-cols-2 gap-4 items-stretch">
                      
                      {/* Left Block: 3D Log Schema */}
                      <div className="bg-stone-50 border border-stone-150 rounded-2xl p-4 flex flex-col items-center justify-between text-center min-h-[380px] md:min-h-[440px]">
                        <div className="w-full flex-1 flex items-center justify-center">
                          <LogCutSvg cutType={helperCutType} className="max-h-[280px] w-full transition-transform duration-300 hover:scale-[1.03]" />
                        </div>
                        <span className="mt-2.5 font-mono text-[10px] text-stone-500 font-extrabold uppercase tracking-wide">
                          3D Schéma ({helperCutType})
                        </span>
                      </div>

                      {/* Right Block: Real Macro texture */}
                      <div className="bg-stone-50 border border-stone-150 rounded-2xl p-4 flex flex-col items-center justify-between min-h-[380px] md:min-h-[440px]">
                        <div className="w-full flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-stone-100 shadow-inner">
                          <WoodCutVisualizer
                            species={jedleSpecies}
                            cutType={helperCutType}
                            simplified={true}
                            zoom={true}
                            className="h-[280px] w-full rounded-xl object-cover transition-transform duration-300 hover:scale-[1.03]"
                          />
                        </div>
                        <span className="mt-2.5 font-mono text-[10px] text-stone-500 font-extrabold uppercase tracking-wide text-center truncate max-w-full">
                          Makro (Jedle b.)
                        </span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Warning student tip banner */}
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/30 text-amber-950 flex items-start space-x-2.5 text-[11px] shadow-3xs">
                  <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                  <span className="leading-snug">
                    <strong>Tip:</strong> Při makroskopickém zkoumání s lupou (10x zvětšení) je nejdůležitější najít čistý líc příčného řezu (P) seříznutý žiletkou. Radiální řez (R) odhalí reflexní zrcátka a tangenciální řez (T) odhalí síťovanou strukturu vřeten dřeňových paprsků.
                  </span>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-3 md:p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setShowHelperModal(false)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm transition-colors"
                >
                  Rozumím, zpět do výuky
                </button>
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
};
