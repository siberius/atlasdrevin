export interface TreeCut {
  id: 'P' | 'R' | 'T';
  name: string; // Příčný, Radiální, Tangenciální
  description: string;
}

export type WoodClass = 'jehlicnate' | 'listnate';
export type Porosity = 'none' | 'kruhovite' | 'polokruhovite' | 'roztrousene';

export interface TreeSpecies {
  id: string;
  name: string; // Czech common name
  latinName: string; // Latin botanical name
  author: string; // Name authority (e.g. L., Mill.)
  class: WoodClass;
  porosity: Porosity;
  hasHeartwood: boolean; // má vylišeno jádro a běl
  hasResinCanals?: boolean | 'few' | 'many'; // pryskyřičné kanálky
  rayType: 'invisible' | 'radial_only' | 'visible_all' | 'wide' | 'narrow' | 'very_narrow'; // dřeňové paprsky
  weight: 'lehke' | 'stredni' | 'tezke' | string;
  hardness: 'mekke' | 'stredne_tvrde' | 'tvrde' | string;
  sapwoodColor: string; // běl color desc
  heartwoodColor?: string; // jádro color desc
  ringsDesc: string; // letokruhy
  pDesc: string; // příčný řez popis
  rDesc: string; // radiální řez popis
  tDesc: string; // tangenciální řez popis
  specialFeatures?: string[]; // dřeňové skvrny, vůně, zrcátka, etc.
  webImageSource?: string; // a suggestion for realistic representation
}

export interface QuizQuestion {
  id: string;
  targetSpecies: TreeSpecies;
  providedCues: {
    cut: 'P' | 'R' | 'T' | 'general';
    desc: string;
    icon?: string;
  }[];
  options: {
    id: string;
    name: string;
    isCorrect: boolean;
  }[];
}

export interface DetectiveCase {
  id: string;
  title: string;
  difficulty: 'začátečník' | 'pokročilý' | 'expert';
  targetSpecies: TreeSpecies;
  clues: string[];
  stepsToSolve?: string[]; // step IDs in order
}

export interface KeyNode {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  cutImage?: 'P' | 'R' | 'T' | 'PRT';
  choices: {
    id: string;
    text: string;
    targetNodeId: string; // Next node ID or 'SPECIES_<id>'
    cutHint?: 'P' | 'R' | 'T' | 'PRT';
    details?: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: string;
  icon: string;
}

export interface UserStats {
  xp: number;
  streak: number;
  lastPlayed: string;
  completedSpeciesIds: string[];
  correctAnswers: number;
  totalAnswers: number;
  unlockedAchievements: string[];
  completedDetectiveCases?: string[];
  completedQuizzes?: string[];
}

/**
 * Resolves an external image URL to either pass through our backend proxy (if running on our server)
 * or to go directly to the source URL (if running as a standalone dreviny.html file locally or on standard static hosting).
 */
export function getProxiedImageUrl(originalUrl: string): string {
  if (!originalUrl) return '';
  if (typeof window !== 'undefined') {
    const isLocalFile = window.location.protocol === 'file:' || 
                        window.location.protocol.startsWith('content') ||
                        window.location.protocol === 'about:';
    const isStandalone = isLocalFile || 
      (!window.location.hostname.includes('run.app') && 
       window.location.hostname !== 'localhost' && 
       window.location.hostname !== '127.0.0.1');
    if (isStandalone) {
      // When running as a standalone local file or on custom static hosting,
      // the browser sends no referrer (or setting referrerPolicy="no-referrer" removes it),
      // which allows bypassing Mendel's domain-specific hotlink blocks natively.
      return originalUrl;
    }
  }
  return `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`;
}

