import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, HelpCircle, RefreshCcw, Info, Sparkles, AlertCircle, GitBranch, X } from 'lucide-react';
import { KeyNode, TreeSpecies } from '../types';
import { KEY_NODES, ALL_SPECIES } from '../data/woodData';
import { WoodCutVisualizer, BotanicalReferences } from './WoodCutVisualizer';
import { soundManager } from './SoundManager';

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

          {/* Left wing of the amber glass plane -drawn BEHIND the log- (wider and up to height of log) */}
          <polygon points="40,61 85,47 85,107 40,121" fill="rgba(245, 158, 11, 0.22)" stroke="#d97706" strokeWidth="1.8" />
          <path d="M 52,75 L 52,95" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 49,91 L 52,95 L 55,91" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

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

          {/* Front wing of the amber glass plane -drawn IN FRONT of the log- */}
          <polygon points="85,47 135,31 135,91 85,107" fill="rgba(245, 158, 11, 0.25)" stroke="#d97706" strokeWidth="1.8" />
          <path d="M 122,55 L 122,75" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 119,71 L 122,75 L 125,71" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
  onOpenCutsExplanation: () => void;
}

const LOCAL_PROGRESS_KEY = 'wood_botany_key_progress_v1';

export const KeyMode: React.FC<KeyModeProps> = ({
  onEarnXp,
  onPlayClickSound,
  onPlaySuccessSound,
  onPlayErrorSound,
  onOpenCutsExplanation
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
  const [finishedActiveCutTab, setFinishedActiveCutTab] = useState<'P' | 'R' | 'T'>('P');
  const [selectedCutType, setSelectedCutType] = useState<'P' | 'R' | 'T'>('P');
  const [mobileHelperExpanded, setMobileHelperExpanded] = useState<boolean>(false);

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

  // Keydown interactive handlers are now defined below to avoid hoisting ordering constraints

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

  // Comprehensive keyboard navigation handler (Escape to reset, Backspace/ArrowLeft to go back, 1-9 to choose)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in some input (not applicable in this tab, but good practice)
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'Escape') {
        if (finishedSpecies) {
          handleReset();
          return;
        }
      }

      // If active question is opened (finishedSpecies is NOT set)
      if (!finishedSpecies) {
        // Backspace or ArrowLeft to go back
        if ((e.key === 'Backspace' || e.key === 'ArrowLeft') && history.length > 0) {
          e.preventDefault();
          handleBack();
          return;
        }

        // Numeric keys 1, 2, 3...
        const activeChoices = currentNode?.choices || [];
        const isNumeric = /^[1-9]$/.test(e.key);
        if (isNumeric) {
          const choiceIndex = parseInt(e.key, 10) - 1;
          if (choiceIndex >= 0 && choiceIndex < activeChoices.length) {
            e.preventDefault();
            handleChoice(activeChoices[choiceIndex].targetNodeId);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [finishedSpecies, currentNode, history]);

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
  const activeSidebarCutType = hoveredChoiceHint ? (hoveredChoiceHint === 'PRT' ? 'P' : hoveredChoiceHint) : selectedCutType;

  const getCutIndicatorColor = (cut: 'P' | 'R' | 'T' | 'PRT') => {
    switch (cut) {
      case 'P': return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'R': return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'T': return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'PRT': return 'bg-purple-100 text-purple-900 border-purple-300';
    }
  };
  // Generate vertical progress tree on desktop left
  const renderVerticalProgressTree = () => {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-3xs flex flex-col h-full space-y-4">
        <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
          <GitBranch className="w-4 h-4 text-emerald-600 shrink-0" />
          <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">Rozhodovací cesta</h3>
        </div>
        
        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {/* Start Node */}
          <div className="relative pl-6">
            {(history.length > 0 || currentNodeId !== 'start') && (
              <div className="absolute left-2.5 top-5 bottom-[-16px] w-0.5 border-l-2 border-dashed border-stone-200" />
            )}
            <div className={`absolute left-1.5 top-1 w-2.5 h-2.5 rounded-full border-2 transition-all ${
              currentNodeId === 'start' 
                ? 'bg-emerald-600 border-emerald-250 ring-4 ring-emerald-50' 
                : 'bg-stone-300 border-stone-150'
            }`} />
            
            <button
              onClick={() => {
                if (currentNodeId !== 'start') {
                  onPlayClickSound();
                  setHistory([]);
                  setCurrentNodeId('start');
                  setFinishedSpecies(null);
                }
              }}
              disabled={currentNodeId === 'start'}
              className={`text-left block text-xs font-bold font-sans transition-all leading-tight ${
                currentNodeId === 'start' ? 'text-emerald-700' : 'text-stone-600 hover:text-emerald-600'
              }`}
            >
              Klíč start
            </button>
            <span className="block text-[10px] text-stone-400 font-mono mt-0.5">Výchozí rozcestník</span>
          </div>

          {/* History Item Nodes */}
          {history.map((hid, index) => {
            const node = KEY_NODES.find(n => n.id === hid);
            return (
              <div key={hid} className="relative pl-6">
                <div className="absolute left-2.5 top-5 bottom-[-16px] w-0.5 border-l-2 border-dashed border-stone-200" />
                <div className="absolute left-1.5 top-1 w-2.5 h-2.5 rounded-full border-2 bg-stone-300 border-stone-150" />
                
                <button
                  onClick={() => {
                    onPlayClickSound();
                    const indexInHistory = history.indexOf(hid);
                    setHistory(history.slice(0, indexInHistory));
                    setCurrentNodeId(hid);
                    setFinishedSpecies(null);
                  }}
                  className="text-left block text-xs font-bold text-stone-600 hover:text-emerald-600 transition-colors leading-tight font-sans"
                >
                  {node?.title || hid}
                </button>
                <span className="block text-[9.5px] text-stone-400 font-mono mt-0.5 truncate max-w-[170px]">
                  Tabulka: {hid}
                </span>
              </div>
            );
          })}

          {/* Current Active Node */}
          {currentNodeId !== 'start' && (
            <div className="relative pl-6">
              <div className="absolute left-1.5 top-1 w-2.5 h-2.5 rounded-full border-2 bg-emerald-600 border-emerald-250 ring-4 ring-emerald-50 animate-pulse" />
              
              <div className="text-left leading-tight">
                <span className="block text-xs font-black text-emerald-800 font-sans">
                  {currentNode.title}
                </span>
                <span className="block text-[9px] text-stone-500 font-mono mt-0.5">
                  Aktivní krok: {currentNode.id}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 lg:space-y-5">
      {/* progress & helper header */}
      <div className="lg:hidden flex flex-wrap justify-between items-center bg-stone-50 border border-stone-200/60 rounded-xl p-3 gap-2">
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
          onClick={onOpenCutsExplanation}
          className="flex items-center space-x-1 text-xs text-emerald-700 font-medium hover:text-emerald-800 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Vysvětlivka řezů</span>
        </button>
      </div>

      {/* Main Grid: Interactive Form & Visual Mockup */}
      {!finishedSpecies ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left Column: Tree-like vertical progress sidebar (Desktop only) */}
          <div className="hidden lg:block lg:col-span-2 h-full">
            {renderVerticalProgressTree()}
          </div>

          {/* Center Column: Decision Node card */}
          <div className="col-span-1 lg:col-span-6 bg-white border border-stone-200 rounded-2xl shadow-xs overflow-hidden flex flex-col h-full">
            {/* Node Title */}
            <div className="p-5 bg-stone-50/50 border-b border-stone-100">
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
                <div className="bg-stone-100/50 rounded-xl p-3.5 text-xs text-stone-600 border border-stone-200/40 mt-3 leading-relaxed">
                  {currentNode.description}
                </div>
              )}
            </div>

            {/* choices */}
            <div className="p-5 space-y-3 px-5 flex-1" role="group" aria-label="Možnosti rozhodovacího klíče">
              {currentNode.choices.map((choice, index) => (
                <div
                  key={choice.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleChoice(choice.targetNodeId)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleChoice(choice.targetNodeId);
                    }
                  }}
                  onMouseEnter={() => choice.cutHint && setHoveredChoiceHint(choice.cutHint)}
                  onMouseLeave={() => setHoveredChoiceHint(null)}
                  className="group relative border border-stone-205 rounded-xl p-4 hover:border-emerald-500 hover:bg-emerald-50/10 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden cursor-pointer transition-all duration-200 shadow-3xs"
                  aria-label={`Volba ${index + 1}: ${choice.text}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                     <div className="flex items-start gap-4">
                      {/* radio bullet with numeric shortcut label for high accessibility */}
                      <div className="w-5 h-5 rounded-full border border-stone-300 group-hover:border-emerald-600 flex items-center justify-center mt-0.5 transition-colors bg-stone-50 shrink-0 group-focus-visible:border-emerald-600">
                        <span className="text-[10px] font-mono font-bold text-stone-500 group-hover:text-emerald-700 transition-colors">
                          {index + 1}
                        </span>
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

          {/* Right Column: Interactive illustration panel */}
          <div className="col-span-1 lg:col-span-4 flex flex-col h-full">
            <div className="bg-white border border-stone-200 rounded-2xl shadow-3xs flex flex-col justify-start h-full overflow-hidden">
              {/* Accordion header for mobile, standard section header for PC */}
              <button
                type="button"
                onClick={() => {
                  onPlayClickSound();
                  setMobileHelperExpanded(!mobileHelperExpanded);
                }}
                className="w-full text-left p-4 flex items-center justify-between border-b border-stone-100 lg:border-b-0 lg:cursor-default"
              >
                <div className="flex flex-col">
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">Dřevní struktura (pomocný model)</h3>
                  <p className="text-[9.5px] text-stone-400 font-mono mt-0.5 lg:hidden">
                    {mobileHelperExpanded ? "Kliknutním sbalíte pomocný model" : "Kliknutím rozbalíte 3D schéma a makro"}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayClickSound();
                      onOpenCutsExplanation();
                    }}
                    className="flex lg:hidden items-center space-x-1 text-xs text-emerald-700 font-semibold hover:text-emerald-800 transition-colors cursor-pointer mr-2"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Vysvětlivka řezů</span>
                  </button>
                  <span className="lg:hidden text-stone-400 font-bold text-lg select-none">
                    {mobileHelperExpanded ? "−" : "+"}
                  </span>
                </div>
              </button>

              {/* Collapsible Body */}
              <div className={`p-4 pt-0 lg:pt-4 flex flex-col space-y-3 flex-1 justify-between ${mobileHelperExpanded ? 'block' : 'hidden lg:flex'}`}>
                <div className="flex flex-col space-y-3">
                  <div className="hidden lg:flex items-center justify-between">
                    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">Dřevní struktura (pomocný model)</h3>
                    <button
                      type="button"
                      onClick={onOpenCutsExplanation}
                      className="flex items-center space-x-1 text-xs text-emerald-700 font-semibold hover:text-emerald-800 transition-colors cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Vysvětlivka řezů</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => { onPlayClickSound(); setSelectedCutType('P'); }}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all font-mono cursor-pointer ${
                        activeSidebarCutType === 'P'
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50 bg-white'
                      }`}
                      aria-pressed={activeSidebarCutType === 'P'}
                      aria-label="Příčný řez (P) - příčný řez dřevem kolmo k ose dřeně"
                    >
                      Příčný (P)
                    </button>
                    <button
                      type="button"
                      onClick={() => { onPlayClickSound(); setSelectedCutType('R'); }}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all font-mono cursor-pointer ${
                        activeSidebarCutType === 'R'
                          ? 'bg-blue-600 text-white border-blue-700'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50 bg-white'
                      }`}
                      aria-pressed={activeSidebarCutType === 'R'}
                      aria-label="Středový radiální řez (R) - řez procházející dření a rovnoběžný s dřeňovými paprsky"
                    >
                      Středový (R)
                    </button>
                    <button
                      type="button"
                      onClick={() => { onPlayClickSound(); setSelectedCutType('T'); }}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all font-mono cursor-pointer ${
                        activeSidebarCutType === 'T'
                          ? 'bg-amber-600 text-white border-amber-700'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50 bg-white'
                      }`}
                      aria-pressed={activeSidebarCutType === 'T'}
                      aria-label="Tečný tangenciální řez (T) - řez vedený tětivou rovnoběžně s osou kmene a kolmo k dřeňovým paprskům"
                    >
                      Tečný (T)
                    </button>
                  </div>

                  {/* Vector schema renders real-time according to decisions - Stacked vertically */}
                  {(() => {
                    return (
                      <div className="grid grid-cols-1 gap-3 items-stretch">
                        {/* 3D Schema Card */}
                        <div className="bg-stone-50 border border-stone-150 rounded-2xl p-2.5 flex flex-col items-center justify-between text-center">
                          <div className="w-full flex-1 flex items-center justify-center min-h-[110px] lg:min-h-[160px]">
                            <LogCutSvg cutType={activeSidebarCutType} className="max-h-[110px] lg:max-h-[160px] w-auto h-auto transition-transform duration-300" />
                          </div>
                          <span className="mt-1.5 font-mono text-[9px] text-stone-500 font-extrabold uppercase tracking-wide">
                            3D Schéma ({activeSidebarCutType})
                          </span>
                        </div>

                        {/* Real Board Texture Card */}
                        <div className="bg-stone-50 border border-stone-150 rounded-2xl p-2.5 flex flex-col items-center justify-between">
                          <div className="w-full flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-stone-100 shadow-inner">
                            <WoodCutVisualizer
                              species={illustrationSpecies}
                              cutType={activeSidebarCutType}
                              zoom={true}
                              simplified={true}
                              className="h-[110px] lg:h-[160px] w-full rounded-xl object-cover"
                            />
                          </div>
                          <span className="mt-1.5 font-mono text-[9px] text-stone-500 font-extrabold uppercase tracking-wide truncate max-w-full text-center">
                            Makro ({illustrationSpecies?.name || 'Vzor'})
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="text-[10px] text-stone-400 bg-stone-50 p-2.5 rounded-xl border border-stone-100 font-mono text-center leading-normal">
                  Mění se na základě vašich voleb. Ukazuje typickou makroskopickou stavbu dříví pro vybranou větev klíče podle odborných podkladů LDF MENDELU.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Final species screen */
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 max-w-5xl mx-auto">
          {/* Top colored card banner */}
          <div className="p-8 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-emerald-700 text-white relative overflow-hidden">
            {/* Background sparkle path */}
            <div className="absolute top-0 right-0 py-2 inline-flex opacity-10">
              <Sparkles className="w-64 h-64 text-white" />
            </div>

            {/* Close cross button */}
            <button
              onClick={handleReset}
              className="absolute top-3.5 right-3.5 p-1.5 text-emerald-100 hover:text-white hover:bg-emerald-600/60 rounded-full transition-all cursor-pointer z-25 bg-emerald-800/30 border border-emerald-500/10 shadow-3xs"
              title="Zavřít a určit další vzorek"
              aria-label="Zavřít"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 relative z-10">
              <span className="text-[11px] font-extrabold uppercase tracking-widest font-mono text-emerald-250 bg-emerald-800 px-3 py-1 rounded-full border border-emerald-500/50">
                Botanické určení dokončeno!
              </span>
              <h2 className="text-3.5xl font-black tracking-tight mt-3 flex items-center">
                <CheckCircle2 className="w-8 h-8 mr-2.5 shrink-0 fill-white text-emerald-750" />
                {finishedSpecies.name}
              </h2>
              <p className="text-lg text-emerald-100 font-mono italic">
                {finishedSpecies.latinName} <span className="not-italic text-sm font-sans text-emerald-200 opacity-80">{finishedSpecies.author}</span>
              </p>
            </div>

            <button
              onClick={handleReset}
              className="hidden md:flex px-5 py-2.5 rounded-xl bg-white text-emerald-800 font-bold hover:bg-emerald-50 transition-all shadow-sm items-center space-x-2 relative z-10 shrink-0 text-sm cursor-pointer"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Určit další vzorek</span>
            </button>
          </div>

          {/* Dynamic Rendered Visualizations Cards */}
          <div className="bg-stone-50 p-5 sm:p-8 text-stone-900 border-b border-stone-200">
            {/* Mobile Tab Switcher */}
            <div className="md:hidden flex bg-stone-200/55 p-1 rounded-xl border border-stone-200/40 mb-4">
              <button
                onClick={() => { onPlayClickSound(); setFinishedActiveCutTab('P'); }}
                className={`flex-1 py-1.5 text-center text-xs font-extrabold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                  finishedActiveCutTab === 'P' ? 'bg-white text-emerald-800 shadow-3xs' : 'text-stone-500'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white font-mono font-black text-[8px] flex items-center justify-center shrink-0">P</span>
                <span>Příčný</span>
              </button>
              <button
                onClick={() => { onPlayClickSound(); setFinishedActiveCutTab('R'); }}
                className={`flex-1 py-1.5 text-center text-xs font-extrabold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                  finishedActiveCutTab === 'R' ? 'bg-white text-blue-900 shadow-3xs' : 'text-stone-500'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white font-mono font-black text-[8px] flex items-center justify-center shrink-0">R</span>
                <span>Radiální</span>
              </button>
              <button
                onClick={() => { onPlayClickSound(); setFinishedActiveCutTab('T'); }}
                className={`flex-1 py-1.5 text-center text-xs font-extrabold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                  finishedActiveCutTab === 'T' ? 'bg-white text-amber-900 shadow-3xs' : 'text-stone-500'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-amber-600 text-white font-mono font-black text-[8px] flex items-center justify-center shrink-0">T</span>
                <span>Tečný</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={finishedActiveCutTab === 'P' ? 'block hover:scale-[1.01] transition-transform' : 'hidden md:block hover:scale-[1.01] transition-transform'}>
                <WoodCutVisualizer key={`finished-${finishedSpecies.id}-P`} species={finishedSpecies} cutType="P" className="w-full aspect-square shadow-sm" />
                <p className="text-xs text-stone-500 mt-2.5 font-mono leading-relaxed">{finishedSpecies.pDesc}</p>
              </div>
              <div className={finishedActiveCutTab === 'R' ? 'block hover:scale-[1.01] transition-transform' : 'hidden md:block hover:scale-[1.01] transition-transform'}>
                <WoodCutVisualizer key={`finished-${finishedSpecies.id}-R`} species={finishedSpecies} cutType="R" className="w-full aspect-square shadow-sm" />
                <p className="text-xs text-stone-500 mt-2.5 font-mono leading-relaxed">{finishedSpecies.rDesc}</p>
              </div>
              <div className={finishedActiveCutTab === 'T' ? 'block hover:scale-[1.01] transition-transform' : 'hidden md:block hover:scale-[1.01] transition-transform'}>
                <WoodCutVisualizer key={`finished-${finishedSpecies.id}-T`} species={finishedSpecies} cutType="T" className="w-full aspect-square shadow-sm" />
                <p className="text-xs text-stone-500 mt-2.5 font-mono leading-relaxed">{finishedSpecies.tDesc}</p>
              </div>
            </div>

            {/* Mobile-only button to determine another specimen below the drawings */}
            <div className="md:hidden mt-5">
              <button
                onClick={handleReset}
                className="w-full py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md flex items-center justify-center space-x-2 text-sm cursor-pointer border border-emerald-500/20"
              >
                <RefreshCcw className="w-4 h-4 animate-spin-slow" />
                <span>Určit další vzorek</span>
              </button>
            </div>
          </div>

          {/* Properties breakdown (Stunning 3-column Layout where References are on the Right) */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-emerald-800 text-emerald-50 rounded-b-3xl">
            {/* Column 1: Makroskopické vlastnosti */}
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

            {/* Column 2: Konstrukční vlastnosti */}
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

            {/* Column 3: Botanical references on the far right (Aligned to Right) */}
            <div className="space-y-4 md:border-l md:border-emerald-700/50 md:pl-6">
              <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-emerald-300">Botanické &amp; Anatomické zdroje</h3>
              <BotanicalReferences 
                species={finishedSpecies} 
                className="bg-emerald-900/40 border-emerald-700/60 shadow-none text-emerald-100" 
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
