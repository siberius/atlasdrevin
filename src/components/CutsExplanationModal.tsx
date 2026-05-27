import React, { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface CutsExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayClickSound: () => void;
}

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
            <clipPath id="t-helper-top-cap-clip-modal">
              <polygon points="0,0 160,0 160,25 110,39 85,47 0,55" />
            </clipPath>
            <clipPath id="t-helper-cut-face-clip-path-modal">
              <polygon points="85,47 110,39 110,99 85,107" />
            </clipPath>
          </defs>

          {/* Left wing of the amber glass plane -drawn BEHIND the log- */}
          <polygon points="40,61 85,47 85,107 40,121" fill="rgba(245, 158, 11, 0.22)" stroke="#d97706" strokeWidth="1.8" />
          <path d="M 52,75 L 52,95" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 49,91 L 52,95 L 55,91" fill="none" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Trunk main body */}
          <path d="M 45,35 L 45,95 A 35,14 0 0,0 115,95 L 115,35 Z" fill="#6d5a47" stroke="#4c3d30" strokeWidth="1.5" />
          <line x1="55" y1="45" x2="55" y2="85" stroke="#524335" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.6" />
          
          {/* Top Cap */}
          <g clipPath="url(#t-helper-top-cap-clip-modal)">
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
          <g clipPath="url(#t-helper-cut-face-clip-path-modal)">
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

export const CutsExplanationModal: React.FC<CutsExplanationModalProps> = ({
  isOpen,
  onClose,
  onPlayClickSound
}) => {
  const [helperCutType, setHelperCutType] = useState<'P' | 'R' | 'T'>('P');

  // Keydown Escape handler to close the modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
      onClick={onClose}
      className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-stone-200 relative my-auto cursor-default"
      >
        
        {/* Modal Header */}
        <div className="p-4 md:p-5 border-b border-stone-200 bg-stone-50 flex justify-between items-center">
          <div>
            <h3 className="text-base md:text-lg font-extrabold text-stone-900">Vysvětlivka makroskopických řezů</h3>
            <p className="text-[11px] text-stone-500 font-medium">Naučte se rozlišovat tři základní roviny řezu kmenem stromu</p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 hover:bg-stone-200 text-xs font-bold font-mono bg-stone-100 px-3 py-1.5 rounded-full transition-all"
            aria-label="Zavřít"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-6 space-y-4 flex-1 overflow-y-auto">
          
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
              Příčný řez (P)
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
              Středový řez (R)
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
              Tečný řez (T)
            </button>
          </div>

          {/* 2-Column Responsive Information Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            
            {/* Left Column: Descriptions and educational texts */}
            <div className="order-2 md:order-1 space-y-3">
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border border-stone-200/80 font-mono tracking-wider text-stone-500 bg-stone-50">
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
                    <li key={idx} className="flex items-start space-x-2 text-[11px] text-stone-600 leading-relaxed font-medium">
                      <span className="text-emerald-500 font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Schema/Cylinder mockup illustrating cuts */}
            <div className="order-1 md:order-2 flex flex-col items-center justify-center bg-stone-50/50 p-4 border border-stone-150 rounded-2xl w-full min-h-[220px]">
              <span className="text-[9.5px] font-mono font-bold text-stone-400 uppercase tracking-wider mb-2">3D prostorová orientace řezu</span>
              <LogCutSvg cutType={helperCutType} className="w-56 h-56 max-w-full drop-shadow-md select-none" />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
