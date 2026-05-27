import { useState, useEffect } from 'react';
import { AppHeader } from './components/AppHeader';
import { KeyMode } from './components/KeyMode';
import { QuizMode } from './components/QuizMode';
import { AtlasMode } from './components/AtlasMode';
import { AchievementsTab } from './components/AchievementsTab';
import { InteractiveSchemas } from './components/InteractiveSchemas';
import { CutsExplanationModal } from './components/CutsExplanationModal';
import { ComparatorMode } from './components/ComparatorMode';
import { UserStats, Achievement } from './types';
import { soundManager } from './components/SoundManager';
import { ALL_SPECIES, ACHIEVEMENTS, DETECTIVE_CASES } from './data/woodData';
import { Trees, Sparkles, BookOpen, GraduationCap, X, Award, CheckCircle2, Mail, Linkedin, Download } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'wood_botany_key_stats_v1';

const INITIAL_STATS: UserStats = {
  xp: 0,
  streak: 1,
  lastPlayed: new Date().toISOString(),
  completedSpeciesIds: [],
  correctAnswers: 0,
  totalAnswers: 0,
  unlockedAchievements: [],
  completedDetectiveCases: []
};

export default function App() {
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('key');
  const [isNightMode, setIsNightMode] = useState<boolean>(() => {
    return localStorage.getItem('wood_botany_night_mode') === 'true';
  });
  const [showUnlockModal, setShowUnlockModal] = useState<Achievement | null>(null);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showCutsHelper, setShowCutsHelper] = useState<boolean>(false);
  const [atlasSelectedSpeciesId, setAtlasSelectedSpeciesId] = useState<string | undefined>(undefined);
  const [resetKey, setResetKey] = useState<number>(0);
  const [welcomeDismissed, setWelcomeDismissed] = useState<boolean>(() => {
    return localStorage.getItem('wood_botany_welcome_dismissed_v1') === 'true';
  });

  const handleToggleNightMode = () => {
    const nextVal = !isNightMode;
    setIsNightMode(nextVal);
    localStorage.setItem('wood_botany_night_mode', String(nextVal));
    soundManager.playClick();
  };

  const handleDismissWelcome = () => {
    setWelcomeDismissed(true);
    localStorage.setItem('wood_botany_welcome_dismissed_v1', 'true');
    soundManager.playClick();
  };

  // Load stats from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as UserStats;
        if (!parsed.completedDetectiveCases) {
          parsed.completedDetectiveCases = [];
        }
        
        // Dynamic streak check
        const lastDateStr = parsed.lastPlayed;
        if (lastDateStr) {
          const lastDate = new Date(lastDateStr);
          const today = new Date();
          
          // Zero out time elements
          const d1 = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
          const d2 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          
          const timeDiff = d2.getTime() - d1.getTime();
          const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          
          if (daysDiff === 1) {
            parsed.streak += 1;
            parsed.lastPlayed = today.toISOString();
          } else if (daysDiff > 1) {
            parsed.streak = 1;
            parsed.lastPlayed = today.toISOString();
          }
        }
        setStats(parsed);
      } catch (e) {
        console.error('Failed to parse previous user stats', e);
      }
    }
  }, []);

  // Listen to Escape key to close modals, and Ctrl+0 cheat to unlock certificate and 100% completion in App.tsx
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowInfoModal(false);
        setShowUnlockModal(null);
        setShowCutsHelper(false);
      }
      
      // Cheat code Ctrl + 0 (or Meta + 0 for mac)
      if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        const fullStats: UserStats = {
          xp: 1520,
          streak: 10,
          completedSpeciesIds: ALL_SPECIES.map(spec => spec.id),
          correctAnswers: 100,
          totalAnswers: 100,
          unlockedAchievements: ACHIEVEMENTS.map(ach => ach.id),
          completedDetectiveCases: DETECTIVE_CASES.map(c => c.id),
          completedQuizzes: ['mendelu_makro', 'mendelu_mikro'],
          lastPlayed: new Date().toISOString()
        };
        saveStats(fullStats);
        soundManager.playLevelUp();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stats]);

  // Save stats to localStorage
  const saveStats = (newStats: UserStats) => {
    setStats(newStats);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStats));
  };

  const handleEarnXp = (xpAwarded: number, speciesId: string, isCorrect: boolean, caseId?: string) => {
    const updatedCompleted = [...stats.completedSpeciesIds];
    // Don't add trigger ID mendelu_test as a completed species ID
    if (speciesId && speciesId !== 'mendelu_test' && !updatedCompleted.includes(speciesId)) {
      updatedCompleted.push(speciesId);
    }

    const updatedCases = [...(stats.completedDetectiveCases || [])];
    const updatedQuizzes = [...(stats.completedQuizzes || [])];

    if (caseId) {
      if (caseId.startsWith('mendelu_') || caseId.startsWith('makro_')) {
        if (!updatedQuizzes.includes(caseId)) {
          updatedQuizzes.push(caseId);
        }
      } else {
        if (!updatedCases.includes(caseId)) {
          updatedCases.push(caseId);
        }
      }
    }

    const nextXp = stats.xp + xpAwarded;
    const nextCorrectAnswers = stats.correctAnswers + (isCorrect ? 1 : 0);
    const nextTotalAnswers = stats.totalAnswers + 1;

    let newlyUnlockedBadge: Achievement | null = null;
    const updatedAchievements = [...stats.unlockedAchievements];

    // Badge triggers
    const checkBadge = (badgeId: string) => {
      if (!updatedAchievements.includes(badgeId)) {
        updatedAchievements.push(badgeId);
        const achObj = ACHIEVEMENTS.find(a => a.id === badgeId);
        if (achObj) newlyUnlockedBadge = achObj;
      }
    };

    // 1. First solved
    if (updatedCompleted.length >= 1) {
      checkBadge('first_solve');
    }

    // 2. Conifer Master: verify all 8 conifer species
    const conifers = ALL_SPECIES.filter(s => s.class === 'jehlicnate').map(s => s.id);
    const masteredConifers = updatedCompleted.filter(id => conifers.includes(id));
    if (masteredConifers.length === conifers.length) {
      checkBadge('conifer_master');
    }

    // 3. Broadleaf Master: at least 5 broadleaves
    const listnaci = ALL_SPECIES.filter(s => s.class === 'listnate').map(s => s.id);
    const masteredListnaci = updatedCompleted.filter(id => listnaci.includes(id));
    if (masteredListnaci.length >= 5) {
      checkBadge('broadleaf_master');
    }

    // 4. Perfect Run
    if (xpAwarded >= 50 && isCorrect) {
      checkBadge('perfect_run');
    }

    // 5. XP milestone
    if (nextXp >= 500) {
      checkBadge('xp_500');
    }

    // 6. Streak milestone
    if (stats.streak >= 3) {
      checkBadge('streak_3');
    }

    const nextStatsObj: UserStats = {
      ...stats,
      xp: nextXp,
      completedSpeciesIds: updatedCompleted,
      correctAnswers: nextCorrectAnswers,
      totalAnswers: nextTotalAnswers,
      unlockedAchievements: updatedAchievements,
      completedDetectiveCases: updatedCases,
      completedQuizzes: updatedQuizzes,
      lastPlayed: new Date().toISOString()
    };

    saveStats(nextStatsObj);

    if (newlyUnlockedBadge) {
      soundManager.playLevelUp();
      setShowUnlockModal(newlyUnlockedBadge);
    }
  };

  const handleToggleSound = () => {
    const isEn = soundManager.toggle();
    setSoundEnabled(isEn);
    soundManager.playClick();
  };

  const handleResetStats = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem('wood_botany_key_progress_v1');
    localStorage.removeItem('wood_botany_welcome_dismissed_v1');
    setWelcomeDismissed(false);
    setStats(INITIAL_STATS);
    setActiveTab('key');
    setResetKey(prev => prev + 1);
    soundManager.playClick();
  };

  const playClick = () => soundManager.playClick();
  const playSuccess = () => soundManager.playSuccess();
  const playError = () => soundManager.playError();

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'key':
        return (
          <KeyMode
            key={resetKey}
            onEarnXp={handleEarnXp}
            onPlayClickSound={playClick}
            onPlaySuccessSound={playSuccess}
            onPlayErrorSound={playError}
            onOpenCutsExplanation={() => setShowCutsHelper(true)}
          />
        );
      case 'schemas':
        return (
          <InteractiveSchemas
            onSelectSpecies={(speciesId) => {
              const corrected = speciesId === 'vejmutovka' ? 'borovice_vejmutovka' : speciesId;
              setAtlasSelectedSpeciesId(corrected);
              setActiveTab('atlas');
            }}
          />
        );
      case 'quiz':
        return (
          <QuizMode
            onEarnXp={handleEarnXp}
            onPlayClickSound={playClick}
            onPlaySuccessSound={playSuccess}
            onPlayErrorSound={playError}
          />
        );
      case 'atlas':
        return (
          <AtlasMode
            onPlayClickSound={playClick}
            initialSelectedSpeciesId={atlasSelectedSpeciesId}
            onClearInitialSelectedSpecies={() => setAtlasSelectedSpeciesId(undefined)}
            isNightMode={isNightMode}
            onToggleNightMode={handleToggleNightMode}
          />
        );
      case 'compare':
        return <ComparatorMode />;
      case 'achievements':
        return <AchievementsTab stats={stats} />;
      default:
        return (
          <KeyMode
            key={resetKey}
            onEarnXp={handleEarnXp}
            onPlayClickSound={playClick}
            onPlaySuccessSound={playSuccess}
            onPlayErrorSound={playError}
            onOpenCutsExplanation={() => setShowCutsHelper(true)}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans pb-12 antialiased transition-colors duration-500 ${
      isNightMode ? 'dark bg-stone-950 text-stone-200' : 'bg-stone-100 text-stone-900'
    }`}>
      {/* Dynamic Header */}
      <AppHeader
        stats={stats}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onResetStats={handleResetStats}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenInfo={() => setShowInfoModal(true)}
        onOpenCutsExplanation={() => setShowCutsHelper(true)}
        isNightMode={isNightMode}
        onToggleNightMode={handleToggleNightMode}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-5 flex-1 w-full space-y-4 lg:space-y-5">
        
        {/* Czech student welcome banner */}
        {!welcomeDismissed && (
          <div className="bg-emerald-800 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
              <Trees className="w-56 h-56" />
            </div>
            
            {/* Close button */}
            <button
              onClick={handleDismissWelcome}
              className="absolute top-4 right-4 text-emerald-200 hover:text-white hover:bg-emerald-700/50 p-1.5 rounded-full transition-colors cursor-pointer z-20"
              title="Skrýt uvítání"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="space-y-1 relative z-10 pr-6 md:pr-0">
              <h2 className="text-xl font-bold tracking-tight">Vítej v interaktivním klíči k určování dřevin!</h2>
              <p className="text-xs text-emerald-100/90 leading-relaxed max-w-2xl">
                Tato česká výuková aplikace tě naučí makroskopicky určovat <strong>33 hlavních jehličnatých a listnatých dřevin</strong> podle oficiálního makroskopického klíče a atlasu. Procvičuj, hraj případy v detektivce, sbírej XP body a objevuj tajemství stavby dřeva!
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0 z-10">
              <div className="p-3 bg-emerald-700/60 rounded-xl border border-emerald-500/30 text-emerald-100 flex items-center space-x-2 text-xs font-semibold">
                <GraduationCap className="w-4 h-4 text-emerald-300" />
                <span>Praktická pomůcka do cvičení</span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Tab Body rendering */}
        {renderActiveTabContent()}

      </main>

      {/* Unlock Trophy Badge celebration Modal */}
      {showUnlockModal && (
        <div 
          onClick={() => setShowUnlockModal(null)}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center space-y-4 border border-emerald-200 relative cursor-default"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto border border-emerald-200 animate-bounce">
              <Award className="w-9 h-9 fill-emerald-500" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono text-emerald-700">Skvělý výsledek!</span>
              <h3 className="text-lg font-black text-stone-900">Odemčen odznak!</h3>
              <p className="text-xs text-stone-500">Získal jsi novou trofej do své školní sbírky</p>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/60 font-medium">
              <h4 className="text-sm font-bold text-emerald-950">{showUnlockModal.title}</h4>
              <p className="text-xs text-stone-600 mt-1">{showUnlockModal.description}</p>
            </div>

            <button
              onClick={() => setShowUnlockModal(null)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
            >
              Paráda, vyzvednout odměnu
            </button>
          </div>
        </div>
      )}

      {/* Info About App and Author Modal */}
      {showInfoModal && (
        <div 
          id="info-about-modal-overlay"
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in cursor-pointer"
          onClick={() => setShowInfoModal(false)}
        >
          <div 
            id="info-about-modal-card"
            className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-stone-200 relative text-left cursor-default flex flex-col max-h-[85vh] my-auto overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close icon - Fixed position, elevated z-index */}
            <button 
              id="info-modal-close-x"
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-750 hover:bg-stone-100 rounded-full transition-colors cursor-pointer z-20 bg-white/85 shadow-3xs"
              aria-label="Zavřít"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header - Sticky/Fixed top of the card */}
            <div className="px-6 pt-6 pb-3.5 border-b border-stone-100 flex items-center space-x-3 shrink-0 bg-white">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shrink-0">
                <Trees className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900 leading-tight">O autorech a přístupnosti</h3>
                <p className="text-[10px] font-mono text-emerald-700 uppercase tracking-widest font-semibold font-bold">Stavba dřeva • Přístupná aplikace</p>
              </div>
            </div>

            {/* Body - Flex-1 Scrollable panel */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-xs text-stone-600 leading-relaxed scrollbar-thin">
              <div className="space-y-1">
                <h4 className="font-extrabold text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold">ODBORNÉ METODICKÉ ZPRACOVÁNÍ</h4>
                <p className="text-stone-700 font-sans">
                  Zpracováno podle <strong>Klíče k makroskopickému určování vybraných dřev jehličnatých a listnatých dřevin</strong>, Lesnická a dřevařská fakulta, Ústav nauky o dřevě, <a href="https://stavbadreva.ldf.mendelu.cz/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline hover:text-emerald-800">Mendelova univerzita v Brně</a>.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-[10px] uppercase font-mono tracking-widest text-stone-400">VĚDECKÁ DATABÁZE ŘEZŮ &amp; KOLEKCE</h4>
                <p className="text-stone-700 font-sans">
                  Referenční botanické zařazení, kódy dřevin a mezinárodní odkazy pro mikroskopické a makroskopické řezy jsou provázány s vědeckou databází <strong><a href="https://www.wsl.ch/land/products/dendro/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline hover:text-emerald-800">Wood Anatomy (woodanatomy.ch)</a></strong>, kterou spravuje Švýcarský federální výzkumný ústav <strong>WSL</strong>.
                </p>
                <p className="text-stone-700 font-sans mt-1">
                  Rozsáhlejší mikroskopické popisy a anatomická data čerpají rovněž z mezinárodní akademické databáze <strong><a href="https://insidewood.lib.ncsu.edu/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline hover:text-emerald-800">InsideWood (NCSU)</a></strong>.
                </p>
              </div>

              <div className="space-y-1 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/50 text-stone-700 leading-normal border-l-3 border-l-amber-500">
                <h4 className="font-extrabold text-[10px] uppercase font-mono tracking-widest text-amber-800 mb-0.5">ZDROJE DATABÁZE &amp; VEKTORY</h4>
                <p>
                  Náhledy mikroskopických a makroskopických řezů <strong>P, T, R</strong> pocházejí z vědecko-výukového portálu <strong><a href="https://stavbadreva.ldf.mendelu.cz/" target="_blank" rel="noopener noreferrer" className="text-amber-900 font-bold underline hover:text-amber-950">Stavba dřeva MENDELU</a></strong>. Další doplňující taxonomické a botanické informace jsou propojeny s otevřenou encyklopedií <strong><a href="https://cs.wikipedia.org/" target="_blank" rel="noopener noreferrer" className="text-amber-900 font-bold underline hover:text-amber-950">Wikipedie</a></strong>.
                </p>
                <p className="mt-1 flex items-center gap-1 font-medium bg-white/60 p-1.5 rounded-lg border border-amber-100/30 text-[11px]">
                  <span>✨ Schémata určovacího klíče lze pohodlně <strong>stáhnout ve formátu SVG</strong> pomocí tlačítka přímo u schématu.</span>
                </p>
              </div>

              <div className="space-y-1 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/50 text-stone-700 leading-normal border-l-3 border-l-blue-600">
                <h4 className="font-extrabold text-[10px] uppercase font-mono tracking-widest text-blue-800 font-bold mb-0.5">BEZBARIÉROVOST &amp; DIGITÁLNÍ PŘÍSTUPNOST</h4>
                <p className="font-sans">
                  Tento výukový portál je plně uzpůsoben pro uživatele se specifickými potřebami, zejména pro <strong>zrakově, sluchově, tělesně a kognitivně znevýhodněné</strong>. Návrh rozhraní, navigační prvky a barevné kontrasty striktně odpovídají mezinárodním standardům bezbariérovosti webu <strong>WCAG 2.1 / 2.2 (úroveň AA)</strong> a harmonizované evropské normě <strong>EN 301 549</strong>.
                </p>
                <div className="text-[11px] text-stone-600 space-y-1 mt-1 bg-white/60 p-2 rounded-lg border border-blue-100/30">
                  <p>• <strong>Optimalizované asistenční čtečky:</strong> Všechny mikroskopické i makroskopické řezy jsou doplněny o sémantické popisky (ARIA a ALT atributy) popisující anatomickou strukturu (tracheidy, cévy, póry) pro hlasový výstup slepeckých čteček.</p>
                  <p>• <strong>Klávesnicová navigace:</strong> Aplikaci lze kompletně ovládat a vyhodnocovat pomocí standardních prvků tabulátoru bez nutnosti použití myši.</p>
                  <p>• <strong>Zraková &amp; sluchová podpora:</strong> Zvukové zpětné vazby (úspěch/kliknutí) jsou doprovázeny vizuálními efekty s vysokým kontrastem pro sluchově znevýhodněné.</p>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-[10px] uppercase font-mono tracking-widest text-stone-400 font-bold">VÝVOJ &amp; LICENCE</h4>
                <p className="text-stone-700">
                  Vytvořeno v <strong>Google AI Studio</strong> s modelem <strong>Gemini 3.5 Flash</strong> v roce <strong>2026</strong>.
                </p>
                <p className="text-[11px] text-stone-600 bg-emerald-50/20 p-2 rounded-xl border border-emerald-100/50 my-1 leading-snug">
                  Aplikace je příkladem <strong>SPA (single page application)</strong> aplikace v jednom souboru HTML vytvořené v Google AI Studiu.
                </p>
                <p className="text-stone-700 font-semibold text-[11px] mt-1">
                  Autor: Luděk Sušický
                </p>
                <p className="text-[10px] text-stone-400 font-mono">
                  GPLv3 Copyright &copy; 2026 Luděk Sušický
                </p>
              </div>

              {/* Dedicated offline HTML application downloader card */}
              <div className="space-y-2 bg-emerald-50 p-4 rounded-2xl border border-emerald-150 text-stone-750">
                <h4 className="font-extrabold text-[10.5px] uppercase font-mono tracking-widest text-emerald-850 flex items-center space-x-1.5">
                  <Download className="w-4 h-4 text-emerald-600 animate-bounce" />
                  <span>📥 STÁHNOUT OFFLINE VERZI APP</span>
                </h4>
                <p className="text-[11.5px] text-stone-700 font-sans leading-relaxed">
                  Zkompilovaný soubor <strong>dreviny.html</strong> obsahuje celou tuto interaktivní aplikaci (určovací klíč, diagramy, herní kvízy i plný atlas) zabalenou do jednoho jediného souboru, který funguje i zcela bez internetu!
                </p>
                <div className="flex flex-col space-y-2 pt-1">
                  <a
                    href="/dreviny.html"
                    download="dreviny.html"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-center flex items-center justify-center space-x-2 shadow-xs cursor-pointer transition-colors text-xs"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    <span>Uložit celou aplikaci (dreviny.html)</span>
                  </a>
                  <p className="text-[9.5px] text-stone-500 font-sans leading-normal italic text-center px-1">
                    *Tip: Pokud v levém stromu souborů IDE vidíte u souboru "dreviny.html" červené kolečko s vykřičníkem, je to kvůli limitu stahování velkých souborů v editoru (~587kb). Odkaz výše stahuje přímo ze serveru a funguje bez chyby!
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-stone-100 pt-3">
                <h4 className="font-extrabold text-[10px] uppercase font-mono tracking-widest text-stone-400">O AUTOROVI</h4>
                <p className="text-stone-750">
                  SŠ a VŠ učitel Informatiky zabývající se AI ve vzdělávání a vibecodingu.
                </p>

                {/* Contact links */}
                <div className="space-y-1.5 pt-1">
                  <a 
                    href="mailto:ludek.susicky@gmail.com" 
                    id="author-link-email"
                    className="flex items-center space-x-2.5 p-2 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-100 transition-colors font-mono text-[11px]"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">ludek.susicky@gmail.com</span>
                  </a>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <a 
                      href="https://www.linkedin.com/in/ludek-susicky/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      id="author-link-linkedin"
                      className="flex items-center space-x-2 p-2 bg-blue-50/50 hover:bg-blue-50 text-blue-900 rounded-xl border border-blue-100 transition-colors font-mono text-[11px]"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">LinkedIn</span>
                    </a>
                    
                    <a 
                      href="https://x.com/ludeksusicky" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      id="author-link-x"
                      className="flex items-center space-x-2 p-2 bg-stone-50 hover:bg-stone-100 text-stone-900 rounded-xl border border-stone-200 transition-colors font-mono text-[11px]"
                    >
                      <span className="font-black text-[11px] text-stone-700 w-3.5 text-center shrink-0">X</span>
                      <span className="truncate">@ludeksusicky</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky/Fixed Footer at the bottom of the card */}
            <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 shrink-0">
              <button
                id="info-modal-close-btn"
                onClick={() => setShowInfoModal(false)}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-850 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer text-center"
              >
                Rozumím
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reusable Cuts Explanation Modal */}
      <CutsExplanationModal
        isOpen={showCutsHelper}
        onClose={() => setShowCutsHelper(false)}
        onPlayClickSound={playClick}
      />

      {/* Static Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center text-stone-400 text-xs font-mono space-y-1">
        <p>GPLv3 Copyright &copy; 2026 Luděk Sušický. Všechna práva vyhrazena.</p>
        <p className="text-[10px] text-stone-500">Zpracováno podle odborného klíče LDF MENDELU.</p>
        <p className="text-[9px] text-stone-400">Aplikace je příkladem SPA (single page application) v jednom souboru HTML vytvořené v Google AI Studio.</p>
      </footer>
    </div>
  );
}
