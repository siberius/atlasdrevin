import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Lock, Download, Sparkles, AlertCircle, HelpCircle, X } from 'lucide-react';
import { UserStats } from '../types';
import { ALL_SPECIES } from '../data/woodData';

interface CertificateSectionProps {
  stats: UserStats;
}

export const CertificateSection: React.FC<CertificateSectionProps> = ({ stats }) => {
  const [name, setName] = useState<string>('');
  const [showBypass, setShowBypass] = useState<boolean>(false);
  const [isBypassed, setIsBypassed] = useState<boolean>(false);
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  
  // Listen for Escape to close name request modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showNameModal) {
        setShowNameModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showNameModal]);
  
  // Completed species count
  const speciesCount = stats.completedSpeciesIds ? stats.completedSpeciesIds.length : 0;
  const isSpeciesFinished = speciesCount >= ALL_SPECIES.length;

  // Completed detective cases count
  const detectiveCount = stats.completedDetectiveCases ? stats.completedDetectiveCases.length : 0;
  const isDetectiveFinished = detectiveCount >= 12;

  // Completed quizzes count (Makro Test 1 & 2)
  const completedQuizzes = stats.completedQuizzes || [];
  const isQuizzesFinished = completedQuizzes.includes('mendelu_makro') && completedQuizzes.includes('mendelu_mikro');

  // Final validation
  const isEligible = (isSpeciesFinished && isDetectiveFinished && isQuizzesFinished) || isBypassed;

  // Formatting current date in Czech format: DD. MM. YYYY
  const getFormattedDate = () => {
    const today = new Date();
    return `${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}`;
  };

  const handleDownloadSVG = () => {
    const displayName = name.trim() || 'Úspěšný Student';
    const currentDate = getFormattedDate();

    // Elegant high-fidelity Vector SVG Certificate Template
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 565" width="800" height="565" style="background:#fdfcf9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <!-- Elegant border border -->
  <rect x="15" y="15" width="770" height="535" fill="none" stroke="#065f46" stroke-width="5" rx="16" />
  <rect x="25" y="25" width="750" height="515" fill="none" stroke="#65a30d" stroke-width="1.5" stroke-dasharray="8,5" rx="12" />
  
  <!-- Subtle Leaf/Wood rings watermark decoration (background) -->
  <g opacity="0.04" transform="translate(400, 282) scale(0.6)">
    <circle r="100" fill="none" stroke="#000" stroke-width="2" />
    <circle r="180" fill="none" stroke="#000" stroke-width="3" />
    <circle r="250" fill="none" stroke="#000" stroke-width="4" />
    <circle r="340" fill="none" stroke="#000" stroke-width="5" />
    <circle r="410" fill="none" stroke="#000" stroke-width="6" />
    <path d="M-500,0 L500,0 M0,-500 L0,500" stroke="#000" stroke-width="4" />
  </g>

  <!-- Corner classic flourishes -->
  <path d="M 30,55 L 55,30 M 30,65 L 65,30 M 30,75 L 75,30" stroke="#065f46" stroke-width="1.5" opacity="0.7" />
  <path d="M 770,55 L 745,30 M 770,65 L 735,30 M 770,75 L 725,30" stroke="#065f46" stroke-width="1.5" opacity="0.7" />
  <path d="M 30,510 L 55,535 M 30,500 L 65,535 M 30,490 L 75,535" stroke="#065f46" stroke-width="1.5" opacity="0.7" />
  <path d="M 770,510 L 745,535 M 770,500 L 735,535 M 770,490 L 725,535" stroke="#065f46" stroke-width="1.5" opacity="0.7" />

  <!-- University Emblem placeholder -->
  <g text-anchor="middle">
    <text x="400" y="55" font-size="11" font-weight="bold" fill="#065f46" letter-spacing="3" font-family="system-ui, sans-serif">INTERAKTIVNÍ KLÍČ A ATLAS DŘEVIN</text>
    <text x="400" y="70" font-size="9" font-weight="600" fill="#65a30d" letter-spacing="1">VÝUKOVÁ MODULÁRNÍ APLIKACE</text>
  </g>

  <!-- Tree Icon Emblem positioned lower as requested without overlapping texts -->
  <g transform="translate(400, 110)" text-anchor="middle">
    <ellipse cx="0" cy="0" rx="20" ry="12" fill="#065f46" opacity="0.9" />
    <path d="M0,-7 L4,-1 L1.5,-1 L5,5 L-5,5 L-1.5,-1 L-4,-1 Z" fill="#ffffff" />
  </g>

  <!-- Title -->
  <text x="400" y="170" text-anchor="middle" font-size="32" font-weight="900" fill="#065f46" letter-spacing="1" font-family="system-ui, sans-serif">CERTIFIKÁT ABSOLVENTA</text>
  <text x="400" y="195" text-anchor="middle" font-size="13" font-weight="500" fill="#4b5563" font-style="italic">
    Interaktivní klíč k určování dřevin (lesní botanika a makroskopická diagnostika)
  </text>

  <!-- Awarded to explanation -->
  <text x="400" y="245" text-anchor="middle" font-size="12" fill="#6b7280" font-family="system-ui, sans-serif">Tento diplom hrdě stvrzuje, že</text>

  <!-- Recipient Name -->
  <text x="400" y="295" text-anchor="middle" font-size="30" font-weight="bold" fill="#111827" font-family="system-ui, sans-serif">${displayName}</text>
  
  <!-- Ribbon separator -->
  <line x1="220" y1="312" x2="580" y2="312" stroke="#065f46" stroke-width="2" />
  <polygon points="400,307 394,317 406,317" fill="#65a30d" />

  <!-- Detail description of achievement content -->
  <g transform="translate(400, 345)" text-anchor="middle" font-size="11.5" fill="#374151" font-family="system-ui, sans-serif">
    <text font-weight="bold" font-size="13" fill="#1f2937" y="0">Úspěl(a) ve všech zkouškách a identifikacích dřevin</text>
    <text y="20">Bezchybně popsal(a) a v botanickém klíči utřídil(a) všech 33 hlavních jehličnatých a listnatých dřevin,</text>
    <text y="38">makroskopicky identifikoval stavbu dřeva, dřeňové paprsky, cévy a pryskyřičné kanálky v této aplikaci</text>
    <text y="56">a úspěšně vyřešil(a) všech 12 vyšetřovacích případů a zkouškové testy.</text>
  </g>

  <!-- Date dynamic -->
  <g transform="translate(190, 465)">
    <text font-size="10" fill="#9ca3af" font-family="system-ui, sans-serif">DATUM ABSOLVOVÁNÍ</text>
    <text y="20" font-size="13" font-weight="bold" fill="#1f2937" font-family="system-ui, sans-serif">${currentDate}</text>
  </g>

  <!-- Stamp and Authority -->
  <g transform="translate(720, 460)" text-anchor="end">
    <text font-size="10" fill="#9ca3af" font-family="system-ui, sans-serif">AUTOR A VÝVOJ APLIKACE</text>
    <text y="20" font-size="17" font-weight="bold" font-style="italic" fill="#2563eb" font-family="'Brush Script MT', 'Great Vibes', 'Georgia', cursive, Georgia, serif" opacity="0.95">Luděk Sušický</text>
    <line x1="-135" y1="28" x2="0" y2="28" stroke="#d1d5db" stroke-width="1" />
    <text y="40" font-size="8.5" fill="#9ca3af" font-family="system-ui, sans-serif">DIGITÁLNÍ PODPIS AUTORA</text>
  </g>

  <!-- Seal icon sticker at the center base -->
  <g transform="translate(415, 465)">
    <circle r="22" fill="#65a30d" opacity="0.15" />
    <circle r="18" fill="none" stroke="#65a30d" stroke-width="1.5" stroke-dasharray="4,2" />
    <path d="M-6,-2 L0,4 L8,-4" fill="none" stroke="#65a30d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- Legal / Credit & License Footer (extremely small, grey text) -->
  <text x="400" y="525" text-anchor="middle" font-size="8.5" fill="#a1a1aa" font-family="monospace">
    Licence a vývoj: © 2026 Luděk Sušický (GPLv3). Interaktivní klíč a atlas dřevin. Vytvořeno pomocí Google AI Studio.
  </text>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Certifikat_KlicDrevin_${displayName.replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
      {/* Header and Badge status */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl border ${
            isEligible 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
              : 'bg-stone-50 text-stone-400 border-stone-200'
          }`}>
            <Award className={`w-6 h-6 ${isEligible ? 'fill-emerald-100 animate-pulse' : ''}`} />
          </div>
          <div>
            <h3 className="text-base font-black text-stone-900 leading-snug">Certifikát této aplikace</h3>
            <p className="text-xs text-stone-500 font-medium">Stáhněte si vektorový SVG diplom podepsaný autorem</p>
          </div>
        </div>

        {isEligible ? (
          <span className="text-[10px] uppercase font-mono tracking-widest bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300 font-bold">
            🔓 ODEMČENO
          </span>
        ) : (
          <span className="text-[10px] uppercase font-mono tracking-widest bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full border border-stone-200 font-bold flex items-center space-x-1">
            <Lock className="w-3 h-3 mr-0.5" />
            <span>UZAMČENO</span>
          </span>
        )}
      </div>

      {/* Conditions layout */}
      <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/60 text-xs text-stone-605 space-y-3">
        <h4 className="font-bold text-stone-800 text-[11px] uppercase tracking-wider font-mono">Podmínky pro získání certifikátu:</h4>
        
        <div className="space-y-2">
          {/* Progress 1: 33 species */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className={`w-4 h-4 ${isSpeciesFinished ? 'text-emerald-600 fill-emerald-100' : 'text-stone-300'}`} />
              <span className={isSpeciesFinished ? 'text-stone-900 font-semibold' : 'text-stone-500'}>
                Úspěšně určit všech 33 druhů českých dřevin
              </span>
            </div>
            <span className="font-mono font-bold text-stone-700">
              {speciesCount} / 33
            </span>
          </div>

          {/* Progress 2: 12 cases */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className={`w-4 h-4 ${isDetectiveFinished ? 'text-emerald-600 fill-emerald-100' : 'text-stone-300'}`} />
              <span className={isDetectiveFinished ? 'text-stone-900 font-semibold' : 'text-stone-500'}>
                Vyřešit všech 12 detektivních případů v lese
              </span>
            </div>
            <span className="font-mono font-bold text-stone-700">
              {detectiveCount} / 12
            </span>
          </div>

          {/* Progress 3: Both Makro tests */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className={`w-4 h-4 ${isQuizzesFinished ? 'text-emerald-600 fill-emerald-100' : 'text-stone-300'}`} />
              <span className={isQuizzesFinished ? 'text-stone-900 font-semibold' : 'text-stone-500'}>
                Úspěšně zvládnout oba praktické Makro testy
              </span>
            </div>
            <span className="font-mono font-bold text-stone-700">
              {completedQuizzes.length} / 2
            </span>
          </div>
        </div>

        {/* Helpful text */}
        <p className="text-[11px] text-stone-500 italic border-t border-stone-200/50 pt-2 leading-relaxed">
          Tento certifikát vyžaduje stoprocentní diagnostickou přesvědčivost v určení makroskopických detailů lesních stromů.
        </p>
      </div>

      {/* Active control block */}
      {isEligible ? (
        <div className="space-y-4 pt-2">
          <button
            onClick={() => setShowNameModal(true)}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Sestavit a stáhnout certifikát absolventa</span>
          </button>
        </div>
      ) : (
        <div className="pt-1">
          <div className="flex items-start space-x-2 bg-stone-50 border border-stone-200 p-3 rounded-xl text-[11px] text-stone-500">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Splňte obě výukové podmínky výše, čímž prokážete své botanické a diagnostické dovednosti, a certifikát se automaticky zpřístupní k sestavení a stažení.
            </p>
          </div>
        </div>
      )}

      {/* Subtle Teacher Bypass Toggle */}
      <div className="border-t border-stone-150 pt-3 flex flex-col items-center">
        <button
          onClick={() => setShowBypass(!showBypass)}
          className="text-[10px] text-stone-400 font-mono hover:text-stone-700 transition-colors"
        >
          {showBypass ? 'Skrýt učitelskou zkratku' : '▸ Režim pro učitele / Testování'}
        </button>

        {showBypass && (
          <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-stone-600 text-center w-full space-y-2">
            <p className="font-semibold text-stone-800">
              Učitelský / Testovací režim:
            </p>
            <p className="text-stone-500 text-[10px]">
              Nemáte-li čas procházet kompletní detektivku a klíč, tímto tlačítkem nasimulujete kompletní splnění.
            </p>
            <button
              onClick={() => setIsBypassed(!isBypassed)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
                isBypassed
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
              }`}
            >
              {isBypassed ? '🔓 Vynucené splnění: AKTIVNÍ' : '🔒 Vynutit splnění hry a klíče'}
            </button>
          </div>
        )}
      </div>

      {/* Name Request Prompt Modal */}
      {showNameModal && (
        <div 
          onClick={() => setShowNameModal(false)}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-stone-200 relative my-auto cursor-default space-y-4"
          >
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-100">
                <Award className="w-6 h-6 fill-emerald-50 text-emerald-600" />
              </div>
              <h3 className="text-base font-black text-stone-950">Zadejte jméno žáka</h3>
              <p className="text-xs text-stone-550 leading-relaxed">
                Zadejte prosím celé jméno a příjmení studenta, které se vytiskne na oficiální reprezentativní certifikát.
              </p>
            </div>

            <div className="space-y-1.5">
              <input
                type="text"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                placeholder="Např. Jan Novák"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 outline-none rounded-xl text-sm text-stone-850 placeholder-stone-400 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all font-semibold"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (name.trim()) {
                      handleDownloadSVG();
                      setShowNameModal(false);
                    }
                  }
                }}
              />
            </div>

            <div className="flex space-x-2 pt-1">
              <button
                onClick={() => setShowNameModal(false)}
                className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 active:scale-98 text-stone-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Zrušit
              </button>
              <button
                onClick={() => {
                  if (name.trim()) {
                    handleDownloadSVG();
                    setShowNameModal(false);
                  }
                }}
                disabled={!name.trim()}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1 shadow-3xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Uložit &amp; Stáhnout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
