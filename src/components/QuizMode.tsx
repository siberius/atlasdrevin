import React, { useState, useEffect } from 'react';
import { Award, BookOpen, Check, Play, HelpCircle, AlertCircle, RefreshCcw, Sparkles, Heart, ChevronLeft, ChevronRight, ExternalLink, X, Eye, Info } from 'lucide-react';
import { ALL_SPECIES, DETECTIVE_CASES } from '../data/woodData';
import { TreeSpecies, DetectiveCase } from '../types';
import { WoodCutVisualizer } from './WoodCutVisualizer';

interface QuizModeProps {
  onEarnXp: (xp: number, speciesId: string, correct: boolean, caseId?: string) => void;
  onPlayClickSound: () => void;
  onPlaySuccessSound: () => void;
  onPlayErrorSound: () => void;
}

interface MendeluQuestion {
  id: number;
  question: string;
  images?: string[];
  imageFolder: 'makro' | 'mikro';
  options: string[];
  correctIndex: number;
  explanation: string;
}

const MENDELU_MAKRO_QUESTIONS: MendeluQuestion[] = [
  {
    id: 1,
    question: "Dřevo kterých jehličnanů nemá pryskyřičné kanálky?",
    options: [
      "Smrk ztepilý, borovice lesní, modřín opadavý",
      "Jedle bělokorá, tis červený, jalovec obecný",
      "Douglaska tisolistá, smrk ztepilý, tis červený",
      "Borovice vejmutovka, borovice lesní, modřín opadavý"
    ],
    correctIndex: 1,
    imageFolder: "makro",
    explanation: "Jedle bělokorá, tis červený a jalovec obecný jsou naše tři hlavní jehličnaté dřeviny, jejichž dřevo normálně neobsahuje pryskyřičné kanálky."
  },
  {
    id: 2,
    question: "Dřevo na obrázku patří do skupiny dřev:",
    images: ["jd_p_600.jpg"],
    options: [
      "Jehličnatých s pryskyřičnými kanálky",
      "Jehličnatých bez pryskyřičných kanálků",
      "Listnatých s kruhovitě pórovitou stavbou",
      "Listnatých s roztroušeně pórovitou stavbou"
    ],
    correctIndex: 1,
    imageFolder: "makro",
    explanation: "Snímek představuje příčný řez jedle bělokoré, která patří do skupiny jehličnanů bez pryskyřičných kanálků s pozvolným přechodem z jarního do letního dřeva."
  },
  {
    id: 3,
    question: "Pod lupou zkoumáte příčný řez borovice lesní. Čím se vyznačují světlé, okrouhlé body v zóně letního dřeva?",
    images: ["bo_p_600_a.jpg"],
    options: [
      "Jsou to jarní cévy s vysokou vodivou schopností",
      "Jedná se o velké, světlé pryskyřičné kanálky",
      "Jde o dřeňové paprsky probíhající kolmo k řezu",
      "Jsou to mechanická libriformní vlákna"
    ],
    correctIndex: 1,
    imageFolder: "makro",
    explanation: "U borovice lesní jsou v příčném řezu pod lupou dobře patrné pryskyřičné kanálky v pozdním dřevě, které vypadají jako světlé okrouhlé body."
  },
  {
    id: 4,
    question: "Identifikujte jehličnaté dřevo na obrázcích (P, R, T řezy):",
    images: ["md_p_600.jpg", "md_r_600.jpg", "md_t_600.jpg"],
    options: [
      "Smrk ztepilý",
      "Borovice lesní",
      "Jedle bělokorá",
      "Modřín opadavý"
    ],
    correctIndex: 3,
    imageFolder: "makro",
    explanation: "Modřín opadavý vykazuje kontrastní, úzké pryskyřičné kanálky, velmi široké a tmavé červenohnědé letní dřevo, které ostře hraničí s jarním dřevem dalšího letokruhu."
  },
  {
    id: 5,
    question: "Jaký řez dřevem je vyobrazen na příkladu jilmu?",
    images: ["jm_r_600.jpg"],
    options: [
      "Příčný řez (transverzální)",
      "Radiální řez (středový / zrcadlový)",
      "Tangenciální řez (fládrový)",
      "Šikmý řez"
    ],
    correctIndex: 1,
    imageFolder: "makro",
    explanation: "Na radiálním řezu jilmu dřeňové paprsky probíhají rovnoběžně s rovinou řezu, což vytváří charakteristická zrcátka a podlouhlé profilové cévy."
  },
  {
    id: 6,
    question: "Pro příčný řez akátu je typická kruhovitě pórovitá stavba s výrazně zbarveným jádrem. Čím je tvořen nápadný prstenec na začátku letokruhu?",
    images: ["ak_p_600.jpg"],
    options: [
      "Velkými jarními cévami (póry) v souvislém uspořádání",
      "Hustými skupinkami drobných pórů v pozdním dřevě",
      "Koncentrickými pruhy tlustostěnných dřeňových paprsků",
      "Pryskyřičnými kanálky uspořádanými do kruhu"
    ],
    correctIndex: 0,
    imageFolder: "makro",
    explanation: "Trnovník akát má na začátku letokruhu v jarním dřevě velmi výrazný prstenec složený z velkých jarních cév vyplněných tyly, což dává dřevu kruhovitě pórovitou povahu."
  },
  {
    id: 7,
    question: "Identifikujte listnaté dřevo na řezu:",
    images: ["or_p_600.jpg", "or_r_600.jpg", "or_t_600.jpg"],
    options: [
      "Dub letní",
      "Buk lesní",
      "Javor klen",
      "Ořešák vlašský"
    ],
    correctIndex: 3,
    imageFolder: "makro",
    explanation: "Ořešák má středně až tmavě hnědé jádro s polokruhovitě pórovitou stavbou. Cévy jsou na podélných řezech vidět jako tmavé rýhy."
  },
  {
    id: 8,
    question: "Identifikujte vzácné jehličnaté dřevo na obrázku:",
    images: ["tis_p_600.jpg", "tis_r_600.jpg", "tis_t_600.jpg"],
    options: [
      "Jalovec obecný",
      "Jedle bělokorá",
      "Smrk ztepilý",
      "Tis červený"
    ],
    correctIndex: 3,
    imageFolder: "makro",
    explanation: "Tis má krásné vínově červené až tmavé jádrové dřevo, chybí mu pryskyřičné kanálky, a má velmi úzké a často členité a vlnité letokruhy."
  },
  {
    id: 9,
    question: "Dřevo dubu letního řadíme podle hmotnosti a hustoty do skupiny dřev:",
    options: [
      "Velmi lehkých (pod 400 kg/m³)",
      "Lehkých (400 - 540 kg/m³)",
      "Středně těžkých (550 - 640 kg/m³)",
      "Těžkých (nad 650 kg/m³)"
    ],
    correctIndex: 3,
    imageFolder: "makro",
    explanation: "Dubové dřevo patří se svou průměrnou hustotou v suchém stavu cca 690-720 kg/m³ mezi těžká, tvrdá a velmi trvanlivá dřeva."
  },
  {
    id: 10,
    question: "Identifikujte listnatou dřevinu se širokými paprsky:",
    images: ["bk_p_600.jpg", "bk_r_600.jpg", "bk_t_600_2.jpg"],
    options: [
      "Dub letní",
      "Habr obecný",
      "Bříza bělokorá",
      "Buk lesní"
    ],
    correctIndex: 3,
    imageFolder: "makro",
    explanation: "Buk lesní (bk) má roztroušeně pórovitou stavbu a velmi široké dřeňové paprsky. Ty se na radiálním řezu projevují jako typická červenohnědá lesklá zrcátka a na tangenciálním řezu jako tmavá, vřetenovitá čárkování."
  }
];

const MENDELU_MIKRO_QUESTIONS: MendeluQuestion[] = [
  {
    id: 1,
    question: "Dřeňové paprsky (zrcátka) zřetelně viditelné pouhým okem na všech třech řezech má ze zobrazených dřevin:",
    options: [
      "Smrk ztepilý",
      "Buk lesní",
      "Jasan ztepilý",
      "Bříza bělokorá"
    ],
    correctIndex: 1,
    imageFolder: "makro",
    explanation: "Buk lesní (bk) má mimořádně široké dřeňové paprsky, které jsou dobře patrné na příčném (tmavé pruhy), radiálním (široká, lesklá zrcátka) i tangenciálním řezu (vřetenovité čárky)."
  },
  {
    id: 2,
    question: "Do jaké skupiny dřeňových i nespecifikovaných struktur řadíme dřevo zobrazené na příčném řezu?",
    images: ["jv_p_600.jpg"],
    options: [
      "Jehličnaté bez pryskyřičných kanálků",
      "Listnaté s kruhovitě pórovitou stavbou",
      "Listnaté s roztroušeně pórovitou stavbou",
      "Listnaté s polokruhovitě pórovitou stavbou"
    ],
    correctIndex: 2,
    imageFolder: "makro",
    explanation: "Snímek představuje příčný řez javoru klenu, který má roztroušeně pórovité dřevo. Cévy jsou drobné, samostatné nebo v malých skupinkách a rovnoměrně rozmístěné v celém letokruhu."
  },
  {
    id: 3,
    question: "Na podélném tangenciálním řezu buku lesního vidíme četné tmavé vřetenovité útvary o výšce až několik milimetrů. O jakou anatomickou strukturu se jedná?",
    images: ["bk_t_600_2_a.jpg"],
    options: [
      "Cévy (tracheje)",
      "Pryskyřičné kanálky",
      "Dřeňové paprsky",
      "Tracheidy"
    ],
    correctIndex: 2,
    imageFolder: "makro",
    explanation: "Na tangenciálním řezu buku lesního vidíme široké dřeňové paprsky jako tmavá, vřetenovitá čárkování. U buku jsou tyto paprsky víceřadé a makroskopicky výborně rozpoznatelné na řezu žiletkou."
  },
  {
    id: 4,
    question: "Prozkoumejte tři řezy zkoumaného dřeva a určete správnou dřevinu:",
    images: ["jm_p_600.jpg", "jm_r_600.jpg", "jm_t_600.jpg"],
    options: [
      "Dub letní",
      "Jilm vaz",
      "Buk lesní",
      "Pajasan žláznatý"
    ],
    correctIndex: 1,
    imageFolder: "makro",
    explanation: "Dřevo jilmu má kruhovitě pórovitou stavbu s vlnitými proužky pórů v pozdním dřevě, doprovázenými zřetelným tmavým barevným jádrem."
  },
  {
    id: 5,
    question: "Podle makroskopických znaků na řezech identifikujte jehličnatou dřevinu:",
    images: ["dg_p_600.jpg", "dg_r_600.jpg", "dg_t_600.jpg"],
    options: [
      "Smrk ztepilý",
      "Borovice lesní",
      "Modřín opadavý",
      "Douglaska tisolistá"
    ],
    correctIndex: 3,
    imageFolder: "makro",
    explanation: "Douglaska tisolistá má podobné dřevo jako modřín či smrk. Vyznačuje se však načervenalým až růžovohnědým jádrem, úzkou světlou bělí a pryskyřičnými kanálky, které bývají uspořádané spíše v hloučcích."
  },
  {
    id: 6,
    question: "Tmavěji vybarvená, podstatně hustší a mechanicky odolnější zóna dřeva v každém letokruhu na snímku modřínu se označuje jako:",
    images: ["md_p_600.jpg"],
    options: [
      "Bělové dřevo",
      "Rané (jarní) dřevo",
      "Pozdní (letní) dřevo",
      "Nepravé jádro"
    ],
    correctIndex: 2,
    imageFolder: "makro",
    explanation: "Na příčném řezu modřínu se střídají světlejší pásy raného dříví a podstatně tmavší a hustší pásy pozdního dříví, které tvoří kontrastní rozhraní letokruhů."
  },
  {
    id: 7,
    question: "Identifikujte listnatou jádrovou dřevinu s kruhovitě pórovitou stavbou na zobrazených řezech:",
    images: ["ak_p_600.jpg", "ak_r_600.jpg", "ak_t_600.jpg"],
    options: [
      "Dub letní",
      "Kaštanovník jedlý",
      "Trnovník akát",
      "Pajasan žláznatý"
    ],
    correctIndex: 2,
    imageFolder: "makro",
    explanation: "Trnovník akát má velmi tvrdé, těžké, zelenožluté až olivově hnědé jádrové dřevo s kruhovitě pórovitou stavbou a tylem zcela ucpanými jarními cévami."
  },
  {
    id: 8,
    question: "Na obrázcích vidíme jehličnaté dřevo s velmi širokými jarními letokruhy a četnými pryskyřičnými kanálky. Určete dřevinu:",
    images: ["vj_p_600.jpg", "vj_r_600.jpg", "vj_t_600.jpg"],
    options: [
      "Borovice lesní",
      "Smrk ztepilý",
      "Borovice vejmutovka",
      "Modřín opadavý"
    ],
    correctIndex: 2,
    imageFolder: "makro",
    explanation: "Borovice vejmutovka se od borovice lesní liší jemnější strukturou, méně zřetelným přechodem letokruhů a velkými, velmi četnými pryskyřičnými kanály, které jsou na podélných řezech vidět jako tmavé čárky."
  },
  {
    id: 9,
    question: "Která z následujících dvojic hospodářských dřevin nemá barevně vylišeno jádro a běl (tzv. dřeva bezjádrová či zralá)?",
    options: [
      "Borovice lesní a modřín opadavý",
      "Smrk ztepilý a jedle bělokorá",
      "Dub letní a trnovník akát",
      "Tis červený a ořešák vlašský"
    ],
    correctIndex: 1,
    imageFolder: "makro",
    explanation: "Smrk ztepilý a jedle bělokorá patří mezi dřeviny bez barevně odlišeného jádra. Jejich dřevo je světlé v celém průřezu."
  },
  {
    id: 10,
    question: "Identifikujte jehličnaté dřevo vzácnějšího keře/stromu s výrazným fialovohnědým jádrem, vlnitými úzkými letokruhy a chybějícími pryskyřičnými kanálky:",
    images: ["jal_p_600.jpg", "jal_r_600.jpg", "jal_t_600.jpg"],
    options: [
      "Smrk ztepilý",
      "Tis červený",
      "Jalovec obecný",
      "Jedle bělokorá"
    ],
    correctIndex: 2,
    imageFolder: "makro",
    explanation: "Jalovec obecný má úzké vlnovité letokruhy, fialovohnědé vonné jádro a žlutavou úzkou běl. Neobsahuje pryskyřičné kanálky."
  }
];

export const QuizMode: React.FC<QuizModeProps> = ({
  onEarnXp,
  onPlayClickSound,
  onPlaySuccessSound,
  onPlayErrorSound
}) => {
  const [activeSubMode, setActiveSubMode] = useState<'detective' | 'quick' | 'mendelu_makro' | 'mendelu_mikro'>('detective');

  // Detective State
  const [selectedCase, setSelectedCase] = useState<DetectiveCase | null>(null);
  const [activeDetectiveStep, setActiveDetectiveStep] = useState<number>(0);
  const [detectiveLives, setDetectiveLives] = useState<number>(3);
  const [detectiveFinished, setDetectiveFinished] = useState<'success' | 'fail' | null>(null);

  // Quick Quiz State
  const [quickQuestion, setQuickQuestion] = useState<{
    species: TreeSpecies;
    property: string;
    propertyLabel: string;
    options: string[];
    correctIndex: number;
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // MENDELU Quiz State
  const [mendelQuestions, setMendelQuestions] = useState<MendeluQuestion[]>([]);
  const [currentMendelIndex, setCurrentMendelIndex] = useState<number>(0);
  const [mendelAnswers, setMendelAnswers] = useState<Record<number, number>>({});
  const [mendelSubmitted, setMendelSubmitted] = useState<boolean>(false);
  const [mendelScore, setMendelScore] = useState<number | null>(null);
  const [mendelShowSolution, setMendelShowSolution] = useState<boolean>(false);
  const [zoomedTestImage, setZoomedTestImage] = useState<string | null>(null);

  // Close zoomed image on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomedTestImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const startMendeluTest = (type: 'makro' | 'mikro') => {
    onPlayClickSound();
    const questionsList = type === 'makro' ? MENDELU_MAKRO_QUESTIONS : MENDELU_MIKRO_QUESTIONS;
    setMendelQuestions(questionsList);
    setCurrentMendelIndex(0);
    setMendelAnswers({});
    setMendelSubmitted(false);
    setMendelScore(null);
    setMendelShowSolution(false);
    setZoomedTestImage(null);
  };

  const handlePrev = () => {
    if (currentMendelIndex > 0) {
      onPlayClickSound();
      setCurrentMendelIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentMendelIndex < 9) {
      onPlayClickSound();
      setCurrentMendelIndex(prev => prev + 1);
    }
  };

  const handleSubmitTest = () => {
    // Calculate score
    let score = 0;
    mendelQuestions.forEach((q, idx) => {
      if (mendelAnswers[idx] === q.correctIndex) {
        score++;
      }
    });

    onPlaySuccessSound();
    setMendelScore(score);
    setMendelSubmitted(true);
    setMendelShowSolution(true);

    // Reward XP based on score
    onEarnXp(score * 10, 'mendelu_test', score >= 5);
  };

  // Initialize a random Quick Quiz question
  const generateQuickQuestion = () => {
    onPlayClickSound();
    const targetIdx = Math.floor(Math.random() * ALL_SPECIES.length);
    const target = ALL_SPECIES[targetIdx];

    // Pick a diagnostic property of the species dynamically
    const propsList = [
      { key: 'latinName', label: 'Jaký je latinský název pro tuto dřevinu?', value: target.latinName },
      { key: 'class', label: 'Jaká je taxonomická skupina této dřeviny?', value: target.class === 'jehlicnate' ? 'Jehličnaté' : 'Listnaté' },
      { key: 'hardness', label: 'Jaká je typická tvrdost tohoto dřeva?', value: target.hardness },
      { key: 'weight', label: 'Jaká je typická hmotnost tohoto dřeva?', value: target.weight }
    ];

    if (target.specialFeatures && target.specialFeatures.length > 0) {
      propsList.push({
        key: 'feature',
        label: 'Pro kterou dřevinu platí tato typická diagnostická vlastnost?',
        value: target.specialFeatures[Math.floor(Math.random() * target.specialFeatures.length)]
      });
    }

    const pickedProp = propsList[Math.floor(Math.random() * propsList.length)];

    // Generate incorrect buffer options
    const incorrectOptions: string[] = [];
    while (incorrectOptions.length < 3) {
      const rIdx = Math.floor(Math.random() * ALL_SPECIES.length);
      const rSpec = ALL_SPECIES[rIdx];
      
      let candidate = '';
      if (pickedProp.key === 'feature') {
        // If query is about characteristic we show tree names as options
        candidate = rSpec.name;
      } else {
        candidate = pickedProp.key === 'latinName' ? rSpec.latinName : (pickedProp.key === 'class' ? (rSpec.class === 'jehlicnate' ? 'Jehličnaté' : 'Listnaté') : (pickedProp.key === 'hardness' ? rSpec.hardness : rSpec.weight));
      }

      const correctValue = pickedProp.key === 'feature' ? target.name : pickedProp.value;
      if (candidate !== correctValue && !incorrectOptions.includes(candidate)) {
        incorrectOptions.push(candidate);
      }
    }

    // Merge correct and incorrect options
    const correctValue = pickedProp.key === 'feature' ? target.name : pickedProp.value;
    const finalOptions = [...incorrectOptions];
    const correctIdx = Math.floor(Math.random() * 4);
    finalOptions.splice(correctIdx, 0, correctValue);

    setQuickQuestion({
      species: target,
      property: pickedProp.key === 'feature' ? pickedProp.value : target.name,
      propertyLabel: pickedProp.label,
      options: finalOptions,
      correctIndex: correctIdx
    });
    setSelectedAnswer(null);
    setQuizFinished(false);
  };

  const handleSelectCase = (c: DetectiveCase) => {
    onPlayClickSound();
    setSelectedCase(c);
    setActiveDetectiveStep(0);
    setDetectiveLives(3);
    setDetectiveFinished(null);
  };

  const handleDetectiveSubmitOption = (speciesId: string) => {
    if (!selectedCase) return;

    if (speciesId === selectedCase.targetSpecies.id) {
      onPlaySuccessSound();
      setDetectiveFinished('success');
      onEarnXp(100, selectedCase.targetSpecies.id, true, selectedCase.id);
    } else {
      onPlayErrorSound();
      const nextLives = detectiveLives - 1;
      setDetectiveLives(nextLives);
      if (nextLives <= 0) {
        setDetectiveFinished('fail');
      }
    }
  };

  const handleQuickAnswerSubmit = (index: number) => {
    if (selectedAnswer !== null || !quickQuestion) return;
    setSelectedAnswer(index);
    setQuizFinished(true);

    if (index === quickQuestion.correctIndex) {
      onPlaySuccessSound();
      onEarnXp(20, quickQuestion.species.id, true);
    } else {
      onPlayErrorSound();
    }
  };

  return (
    <div className="space-y-6">
      {/* Quiz tab selector */}
      <div className="flex flex-wrap border-b border-stone-200">
        <button
          onClick={() => { onPlayClickSound(); setActiveSubMode('detective'); setSelectedCase(null); }}
          className={`pb-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 px-3 sm:px-6 transition-all cursor-pointer ${
            activeSubMode === 'detective'
              ? 'border-emerald-600 text-emerald-800 font-extrabold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          🔍 Detektivka ve dřevě
        </button>
        <button
          onClick={() => { onPlayClickSound(); setActiveSubMode('quick'); generateQuickQuestion(); }}
          className={`pb-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 px-3 sm:px-6 transition-all cursor-pointer ${
            activeSubMode === 'quick'
              ? 'border-emerald-600 text-emerald-800 font-extrabold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          ⚡ Bleskový kvíz
        </button>
        <button
          onClick={() => { setActiveSubMode('mendelu_makro'); startMendeluTest('makro'); }}
          className={`pb-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 px-3 sm:px-6 transition-all cursor-pointer ${
            activeSubMode === 'mendelu_makro'
              ? 'border-emerald-600 text-emerald-800 font-extrabold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          🪵 MENDELU Makro Test 1
        </button>
        <button
          onClick={() => { setActiveSubMode('mendelu_mikro'); startMendeluTest('mikro'); }}
          className={`pb-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 px-3 sm:px-6 transition-all cursor-pointer ${
            activeSubMode === 'mendelu_mikro'
              ? 'border-emerald-600 text-emerald-800 font-extrabold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          🪵 MENDELU Makro Test 2
        </button>
      </div>

      {activeSubMode === 'detective' ? (
        /* Detective Game mode */
        !selectedCase ? (
          /* Case selection grid */
          <div className="space-y-4">
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200/60 leading-relaxed text-sm text-stone-600">
              <h3 className="font-bold text-stone-800 mb-1">Vítej v Detektivce v lese!</h3>
              <p>
                Studenti mívají potíže s představivostí, proto jsme pro tebe vytvořili <strong>hru na vyšetřovatele</strong>. Vyber si případ, pozorně prozkoumej smyslové stopy popsané lesníky a botaniky a pokus se vybrat správný druh stromu. Nesmíš udělat víc než 3 chybné závěry, jinak se vzorek zničí!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DETECTIVE_CASES.map((c) => {
                const badgeColor = c.difficulty === 'začátečník' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : c.difficulty === 'pokročilý' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-red-50 text-red-800 border-red-200';
                return (
                  <div
                    key={c.id}
                    onClick={() => handleSelectCase(c)}
                    className="border border-stone-200 rounded-2xl p-5 hover:border-emerald-500 hover:shadow-xs cursor-pointer transition-all bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                        {c.difficulty}
                      </span>
                      <span className="text-stone-400 text-xs font-mono">+100 XP</span>
                    </div>
                    <h4 className="text-base font-bold text-stone-900 mt-3">{c.title}</h4>
                    <p className="text-xs text-stone-500 mt-1 truncate">
                      Nalezen záhadný vzorek: {c.clues[0]}
                    </p>
                    <button className="text-xs font-bold text-emerald-700 mt-4 flex items-center space-x-1 group hover:text-emerald-800 cursor-pointer">
                      <span>Prozkoumat stopy</span>
                      <Play className="w-3 h-3 group-hover:translate-x-0.5 transition-transform fill-emerald-800" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Active Case Investigation screen */
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6 max-w-4xl mx-auto">
            {/* Case header info */}
            <div className="pb-4 border-b border-stone-100 flex flex-wrap justify-between items-center gap-4">
              <div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-800 mb-1 block cursor-pointer"
                >
                  ← Zpět na seznam případů
                </button>
                <h3 className="text-lg font-black text-stone-900">Případ: {selectedCase.title}</h3>
              </div>

              {/* Health/Lives bar */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold font-mono text-stone-500">Životy:</span>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((heart) => (
                    <Heart
                      key={heart}
                      className={`w-5 h-5 ${
                        heart <= detectiveLives
                          ? 'fill-red-500 text-red-500 animate-bounce'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* If Detective is ongoing */}
            {detectiveFinished === null ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Clues box */}
                <div className="md:col-span-5 bg-amber-50/55 border border-amber-200/50 rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-extrabold text-amber-900 tracking-wider uppercase font-mono">Důkazní listina vzorku:</h4>
                  <ul className="space-y-3">
                    {selectedCase.clues.map((clue, index) => (
                      <li key={index} className="text-xs text-stone-700 leading-relaxed flex items-start space-x-2 select-none">
                        <span className="font-mono text-amber-700 mt-0.5 shrink-0 bg-amber-200/60 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                          {index + 1}
                        </span>
                        <span>{clue}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3.5 bg-white/70 rounded-xl text-stone-500 text-[10px] italic flex items-start space-x-2 border border-amber-200/20">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>Použij botanickou lupu! Rozhodni, kterému stromu tyto důkazy perfektně odpovídají.</span>
                  </div>
                </div>

                {/* Submissions form (pick tree species from list) */}
                <div className="md:col-span-7 space-y-3">
                  <h4 className="text-sm font-bold text-stone-900">Učiňte závěrečnou identifikaci vzorku:</h4>
                  <p className="text-xs text-stone-500 mb-3">Zvolte správnou dřevinu na základě botanického klíče a důkazů:</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[350px] overflow-y-auto pr-1">
                    {ALL_SPECIES.map((spec) => (
                      <button
                        key={spec.id}
                        id={`btn-case-spec-${spec.id}`}
                        onClick={() => handleDetectiveSubmitOption(spec.id)}
                        className="p-3 text-left border border-stone-200/80 rounded-xl hover:border-emerald-600 hover:bg-emerald-50/10 text-xs font-semibold text-stone-800 transition-all truncate cursor-pointer"
                      >
                        {spec.name}
                        <span className="block text-[9px] text-stone-400 italic font-normal font-mono">
                          {spec.latinName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : detectiveFinished === 'success' ? (
              /* Success Endscreen */
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto border border-emerald-200 shadow-3xs animate-bounce">
                  <Award className="w-9 h-9" />
                </div>
                <h4 className="text-xl font-bold text-emerald-950">Pracoval jsi skvěle, detektive!</h4>
                <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                  Úspěšně jsi vyřešil případ a správně určil vzorek: <strong>{selectedCase.targetSpecies.name} ({selectedCase.targetSpecies.latinName})</strong>. Získal jsi +100 zkušenostních bodů (XP).
                </p>

                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Určit jiný případ
                  </button>
                </div>
              </div>
            ) : (
              /* Fail Endscreen */
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 mx-auto border border-red-200 shadow-3xs">
                  <AlertCircle className="w-9 h-9" />
                </div>
                <h4 className="text-xl font-bold text-red-950">Tvá hypotéza padla...</h4>
                <p className="text-sm text-stone-600 max-w-lg mx-auto">
                  Rozbory se neshodují. Vzorek jsi svým špatným řezáním poškodil a vyšetřovací stopa vychladla. Zkus to znovu a prostuduj nápovědu lépe!
                </p>

                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleSelectCase(selectedCase)}
                    className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                    <span>Opakovat případ</span>
                  </button>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="px-5 py-2 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Výběr případu
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      ) : activeSubMode === 'quick' ? (
        /* Quick Quiz Category game */
        quickQuestion && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs max-w-xl mx-auto space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-stone-100">
              <span className="text-xs font-extrabold uppercase font-mono text-emerald-700">⚡ Bleskové přezkoušení (+20 XP)</span>
              <span className="text-[11px] font-mono text-stone-400">Náhodný test</span>
            </div>

            {/* Question label */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-stone-800 leading-relaxed text-center">
                {quickQuestion.propertyLabel}
              </h4>

              {/* Dynamic Property box or schema */}
              <div className="bg-stone-50 rounded-xl p-5 border border-stone-200/60 flex flex-col items-center">
                <span className="text-stone-500 text-xs font-mono uppercase tracking-wider mb-2">Popis struktury:</span>
                <p className="text-sm font-semibold text-stone-950 text-center leading-relaxed">
                  "{quickQuestion.property}"
                </p>
              </div>
            </div>

            {/* Answers options layout */}
            <div className="grid grid-cols-1 gap-2">
              {quickQuestion.options.map((opt, ix) => {
                const isSelected = selectedAnswer === ix;
                const isCorrect = quickQuestion.correctIndex === ix;
                
                let btnStyle = 'border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/10 text-stone-800 cursor-pointer';
                if (quizFinished) {
                  if (isCorrect) btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950';
                  else if (isSelected) btnStyle = 'bg-red-100 border-red-500 text-red-950';
                  else btnStyle = 'opacity-55 border-stone-100 text-stone-400';
                }

                return (
                  <button
                    key={ix}
                    id={`btn-quick-opt-${ix}`}
                    disabled={quizFinished}
                    onClick={() => handleQuickAnswerSubmit(ix)}
                    className={`p-4 text-left border rounded-xl font-semibold text-sm transition-all flex justify-between items-center ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {quizFinished && isCorrect && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Next question */}
            {quizFinished && (
              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={generateQuickQuestion}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  <span>Pokračovat v testu</span>
                </button>
              </div>
            )}
          </div>
        )
      ) : (
        /* MENDELU Makro & Mikro Quizzes */
        mendelQuestions.length > 0 && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Progress tracker header with circle buttons */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 shadow-3xs space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-stone-250/25">
                <div>
                  <h3 className="text-sm font-black text-stone-900 flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    <span>{activeSubMode === 'mendelu_makro' ? '🪵 MENDELU Makroskopický test 1' : '🪵 MENDELU Makroskopický test 2'}</span>
                  </h3>
                  <p className="text-[10.5px] text-stone-500 font-medium">Oficiální výukové testové sady z Lesnické a dřevařské fakulty MENDELU</p>
                </div>
                {mendelSubmitted && mendelScore !== null && (
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Skóre: {mendelScore} / 10 ({Math.round((mendelScore/10)*100)}%)
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 font-mono">
                {mendelQuestions.map((q, idx) => {
                  const isCurrent = idx === currentMendelIndex;
                  const hasAnswer = mendelAnswers[idx] !== undefined;
                  let circleClass = 'bg-stone-100 text-stone-600 border-stone-200 hover:border-stone-400';
                  
                  if (mendelSubmitted) {
                    const wasCorrect = mendelAnswers[idx] === q.correctIndex;
                    circleClass = wasCorrect 
                      ? 'bg-emerald-600 text-white border-emerald-700 font-extrabold shadow-3xs' 
                      : (mendelAnswers[idx] !== undefined ? 'bg-red-500 text-white border-red-600 font-extrabold shadow-3xs' : 'bg-stone-200 text-stone-400 border-stone-300');
                  } else if (isCurrent) {
                    circleClass = 'bg-amber-600 text-white border-amber-600 font-black scale-105 shadow-3xs';
                  } else if (hasAnswer) {
                    circleClass = 'bg-stone-800 text-stone-100 border-stone-800 font-extrabold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => { onPlayClickSound(); setCurrentMendelIndex(idx); }}
                      className={`w-8 h-8 rounded-full border text-xs flex items-center justify-center transition-all cursor-pointer ${circleClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* score evaluation summary panel */}
            {mendelSubmitted && mendelScore !== null && !mendelShowSolution && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center space-y-4 shadow-3xs">
                <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-200 shadow-3xs animate-bounce">
                  <Award className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-amber-950">Test byl úspěšně vyhodnocen!</h4>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Zodpověděli jste správně <strong className="text-amber-800 font-black">{mendelScore} z 10</strong> otázek. 
                  Získali jste <strong className="text-emerald-800 font-black">+{mendelScore * 10} XP</strong> do hodnocení.
                </p>
                <div className="text-xs text-stone-500 max-w-sm mx-auto p-3 bg-white/50 rounded-xl border border-stone-200/50">
                  {mendelScore >= 9 ? '🏆 Excelentní! Prokazuješ hluboké anatomické znalosti.' : mendelScore >= 7 ? '👏 Velmi pěkný výsledek s drobnými chybami.' : mendelScore >= 5 ? '👍 Dobrý základ, ale prostuduj dřeviny podrobněji.' : '📚 Je třeba více potrénovat. Vyhledej vzorky v atlasu!'}
                </div>
                <button
                  onClick={() => setMendelShowSolution(true)}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Prohlédnout odpovědi s vysvětlením
                </button>
              </div>
            )}

            {/* Active Question Panel */}
            {(!mendelSubmitted || mendelShowSolution) && (
              <div className="bg-white border border-stone-200 rounded-2xl p-7 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Image wrapper - expanded large as requested */}
                  {mendelQuestions[currentMendelIndex].images && mendelQuestions[currentMendelIndex].images!.length > 0 ? (
                    <div className="md:col-span-6 space-y-3 shrink-0">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                        <span className="text-[10px] font-black uppercase font-mono text-stone-400 tracking-wider">Vzorek k rozpoznání:</span>
                        <span className="text-[9.5px] text-amber-700 font-mono font-bold animate-pulse">Kliknutím zvětšíte 🔬</span>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {/* Main big image, stretched beautifully */}
                        <div 
                          className="relative rounded-2xl overflow-hidden border border-stone-250 shadow-sm bg-stone-50 aspect-square w-full select-none group cursor-zoom-in"
                          onClick={() => setZoomedTestImage(mendelQuestions[currentMendelIndex].images![0])}
                        >
                          <img
                            src={`/api/image-proxy?url=${encodeURIComponent(`https://stavbadreva.ldf.mendelu.cz/lexikon/${mendelQuestions[currentMendelIndex].imageFolder}/obr/${mendelQuestions[currentMendelIndex].images![0]}`)}`}
                            onError={(e) => {
                              e.currentTarget.src = `https://stavbadreva.ldf.mendelu.cz/lexikon/${mendelQuestions[currentMendelIndex].imageFolder}/obr/${mendelQuestions[currentMendelIndex].images![0]}`;
                            }}
                            alt="Mendelu test sample"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white shadow-md">
                            <Eye className="w-4 h-4" />
                          </div>
                          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/75 backdrop-blur-3xs text-[9.5px] font-mono text-stone-200">
                            Snímek: {mendelQuestions[currentMendelIndex].images![0]}
                          </div>
                        </div>

                        {/* Additional images grid if available */}
                        {mendelQuestions[currentMendelIndex].images!.length > 1 && (
                          <div className="grid grid-cols-2 gap-2">
                            {mendelQuestions[currentMendelIndex].images!.slice(1).map((filename, index) => (
                              <div
                                key={index}
                                onClick={() => setZoomedTestImage(filename)}
                                className="relative aspect-square rounded-xl overflow-hidden border border-stone-200 shadow-4xs bg-stone-50 cursor-pointer group select-none"
                              >
                                <img
                                  src={`/api/image-proxy?url=${encodeURIComponent(`https://stavbadreva.ldf.mendelu.cz/lexikon/${mendelQuestions[currentMendelIndex].imageFolder}/obr/${filename}`)}`}
                                  onError={(e) => {
                                    e.currentTarget.src = `https://stavbadreva.ldf.mendelu.cz/lexikon/${mendelQuestions[currentMendelIndex].imageFolder}/obr/${filename}`;
                                  }}
                                  alt={`Vzorek ${index + 2}`}
                                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-[8px] font-mono text-stone-200">
                                  {filename}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {/* Options layout */}
                  <div className={`${mendelQuestions[currentMendelIndex].images && mendelQuestions[currentMendelIndex].images!.length > 0 ? 'md:col-span-6' : 'md:col-span-12 w-full'} space-y-4`}>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 bg-stone-100 text-stone-600 border border-stone-250 rounded-md">
                        Otázka {currentMendelIndex + 1} / 10
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-stone-800 leading-snug">
                      {mendelQuestions[currentMendelIndex].question}
                    </h3>

                    {/* Options list */}
                    <div className="grid grid-cols-1 gap-2.5">
                      {mendelQuestions[currentMendelIndex].options.map((opt, ix) => {
                        const isSelected = mendelAnswers[currentMendelIndex] === ix;
                        const isCorrectOpt = mendelQuestions[currentMendelIndex].correctIndex === ix;
                        
                        let optionStyle = 'border-stone-200 hover:border-amber-600 hover:bg-stone-50/5 text-stone-700 cursor-pointer';
                        
                        if (mendelSubmitted) {
                          if (isCorrectOpt) {
                            optionStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold shadow-3xs';
                          } else if (isSelected) {
                            optionStyle = 'bg-red-105 border-red-500 text-red-950';
                          } else {
                            optionStyle = 'opacity-45 border-stone-150 text-stone-400 bg-stone-50/30';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-amber-100 border-amber-600 text-amber-950 font-black shadow-3xs scale-[1.01]';
                        }

                        return (
                          <button
                            key={ix}
                            disabled={mendelSubmitted}
                            onClick={() => {
                              if (mendelSubmitted) return;
                              onPlayClickSound();
                              setMendelAnswers(prev => ({
                                ...prev,
                                [currentMendelIndex]: ix
                              }));
                            }}
                            className={`p-3.5 text-left border rounded-xl text-xs transition-all flex justify-between items-center ${optionStyle}`}
                          >
                            <div className="flex items-center space-x-3.5 font-medium">
                              <span className="w-5.5 h-5.5 rounded-full bg-stone-100 border border-stone-300 text-stone-700 text-[10.5px] font-black flex items-center justify-center font-mono shrink-0">
                                {String.fromCharCode(65 + ix)}
                              </span>
                              <span className="leading-relaxed pr-2">{opt}</span>
                            </div>
                            {mendelSubmitted && isCorrectOpt && (
                              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanatory notes banner */}
                    {mendelSubmitted && (
                      <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-4 space-y-1 text-left shadow-3xs">
                        <h5 className="text-[10.5px] font-black uppercase tracking-wider font-mono text-emerald-900 flex items-center space-x-1 border-b border-emerald-200/50 pb-1 mb-1.5">
                          <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>Botanické vysvětlení a nápověda:</span>
                        </h5>
                        <p className="text-[11px] text-emerald-950 leading-relaxed font-sans font-medium">
                          {mendelQuestions[currentMendelIndex].explanation}
                        </p>
                      </div>
                    )}

                    {/* Question navigation footer */}
                    <div className="pt-4 border-t border-stone-150 flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={handlePrev}
                          disabled={currentMendelIndex === 0}
                          className="px-3 py-1.5 rounded-lg border border-stone-250 text-stone-600 bg-white hover:bg-stone-50 text-xs font-semibold disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition-colors flex items-center space-x-0.5"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Předchozí</span>
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={currentMendelIndex === 9}
                          className="px-3 py-1.5 rounded-lg border border-stone-250 text-stone-600 bg-white hover:bg-stone-50 text-xs font-semibold disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition-colors flex items-center space-x-0.5"
                        >
                          <span>Další</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {!mendelSubmitted ? (
                        currentMendelIndex === 9 || Object.keys(mendelAnswers).length === 10 ? (
                          <button
                            onClick={handleSubmitTest}
                            className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-black rounded-lg text-xs shadow-md transition-all flex items-center space-x-1 cursor-pointer scale-103"
                          >
                            <span>Vyhodnotit test 🎓</span>
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono font-bold text-stone-400">
                            Zodpovězeno: {Object.keys(mendelAnswers).length} / 10
                          </span>
                        )
                      ) : (
                        <button
                          onClick={() => startMendeluTest(activeSubMode === 'mendelu_makro' ? 'makro' : 'mikro')}
                          className="px-4 py-2 bg-stone-900 hover:bg-black text-white font-black rounded-lg text-xs transition-colors flex items-center space-x-1 cursor-pointer"
                        >
                          <RefreshCcw className="w-3.5 h-3.5" />
                          <span>Opakovat test</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )
      )}

      {/* Image zoom modal for microscopic anatomy details */}
      {zoomedTestImage && (
        <div 
          onClick={() => setZoomedTestImage(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 z-50 select-none cursor-zoom-out"
        >
          <div className="absolute top-4 right-4 flex items-center space-x-3">
            <span className="text-white/60 font-mono text-[11.5px] bg-white/10 px-2.5 py-0.5 rounded border border-white/5 font-bold">
              {zoomedTestImage}
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); setZoomedTestImage(null); }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="max-w-4xl max-h-[82vh] bg-white rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={`/api/image-proxy?url=${encodeURIComponent(`https://stavbadreva.ldf.mendelu.cz/lexikon/${mendelQuestions[currentMendelIndex]?.imageFolder || 'makro'}/obr/${zoomedTestImage}`)}`}
              onError={(e) => {
                e.currentTarget.src = `https://stavbadreva.ldf.mendelu.cz/lexikon/${mendelQuestions[currentMendelIndex]?.imageFolder || 'makro'}/obr/${zoomedTestImage}`;
              }}
              alt="Mendelu test sample detail" 
              className="max-w-full max-h-[72vh] object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-stone-50 border-t border-stone-200 text-center font-bold text-xs text-stone-800 font-sans leading-none">
              Detailní anatomický řez – {zoomedTestImage}
            </div>
          </div>
          
          <p className="text-[11px] text-white/50 font-mono mt-3">
            Kliknutím kdekoliv mimo obrázek se vrátíte zpět do testu
          </p>
        </div>
      )}
    </div>
  );
};
