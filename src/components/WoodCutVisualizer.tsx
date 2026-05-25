import React, { useState, useEffect } from 'react';
import { TreeSpecies } from '../types';
import { WSL_IMAGE_MAPPING } from '../data/wslImageMapping';
import { MACRO_IMAGE_P, MACRO_IMAGE_R, MACRO_IMAGE_T } from '../data/macroImageMapping';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, ExternalLink, Image as ImageIcon, Info, HelpCircle } from 'lucide-react';

interface VisualizerProps {
  species?: TreeSpecies;
  cutType: 'P' | 'R' | 'T';
  className?: string;
  zoom?: boolean;
  initialViewMode?: 'macro' | 'micro' | 'schema';
  simplified?: boolean;
}

export const getWikipediaUrl = (speciesId: string): string => {
  const wikiMapping: Record<string, string> = {
    jedle: "https://cs.wikipedia.org/wiki/Jedle_b%C4%9Blokor%C3%A1",
    smrk: "https://cs.wikipedia.org/wiki/Smrk_ztepil%C3%BD",
    tis: "https://cs.wikipedia.org/wiki/Tis_%C4%8Derven%C3%BD",
    jalovec: "https://cs.wikipedia.org/wiki/Jalovec_obecn%C3%BD",
    modrin: "https://cs.wikipedia.org/wiki/Mod%C5%99%C3%ADn_opadav%C3%BD",
    douglaska: "https://cs.wikipedia.org/wiki/Douglaska_tisolist%C3%A1",
    borovice_lesni: "https://cs.wikipedia.org/wiki/Borovice_lesn%C3%AD",
    borovice_vejmutovka: "https://cs.wikipedia.org/wiki/Borovice_vejmutovka",
    dub: "https://cs.wikipedia.org/wiki/Dub_letn%C3%AD",
    pajasan: "https://cs.wikipedia.org/wiki/Pajasan_%C5%BEl%C3%A1znat%C3%BD",
    jilm: "https://cs.wikipedia.org/wiki/Jilm",
    akat: "https://cs.wikipedia.org/wiki/Trnovn%C3%ADk_b%C3%ADl%C3%BD",
    morusovnik: "https://cs.wikipedia.org/wiki/Moru%C5%A1e",
    jasan: "https://cs.wikipedia.org/wiki/Jasan_ztepil%C3%BD",
    kastanovnik: "https://cs.wikipedia.org/wiki/Ka%C5%A1tanovn%C3%ADk_jedl%C3%BD",
    oresak: "https://cs.wikipedia.org/wiki/O%C5%9ee%C5%A1%C3%A1k_kr%C3%A1lovsk%C3%BD",
    tresen: "https://cs.wikipedia.org/wiki/T%C5%99e%C5%A1e%C5%88_pta%C4%8D%C3%AD",
    svestka: "https://cs.wikipedia.org/wiki/%C5%A0vestka_dom%C3%A1c%C3%AD",
    platan: "https://cs.wikipedia.org/wiki/Platan",
    buk: "https://cs.wikipedia.org/wiki/Buk_lesn%C3%AD",
    habr: "https://cs.wikipedia.org/wiki/Habr_obecn%C3%BD",
    olse: "https://cs.wikipedia.org/wiki/Ol%C5%A1e_lepkav%C3%A1",
    javor: "https://cs.wikipedia.org/wiki/Javor_klen",
    babyka: "https://cs.wikipedia.org/wiki/Babyka_obecn%C3%A1",
    briza: "https://cs.wikipedia.org/wiki/B%C5%99%C3%ADza_b%C4%9Blokor%C3%A1",
    lipa: "https://cs.wikipedia.org/wiki/L%C3%ADpa_srd%C4%8Dit%C3%A1",
    osika: "https://cs.wikipedia.org/wiki/Osika_obecn%C3%A1",
    hrusen: "https://cs.wikipedia.org/wiki/Hru%C5%A1e%C5%88_obecn%C3%A1",
    jirovec: "https://cs.wikipedia.org/wiki/J%C3%ADrovec_ma%C4%8Fal",
    vrba: "https://cs.wikipedia.org/wiki/Vrba",
    topol: "https://cs.wikipedia.org/wiki/Topol",
    jerab: "https://cs.wikipedia.org/wiki/Je%C5%99%C3%A1b",
    jablon: "https://cs.wikipedia.org/wiki/Jablo%C5%88_lesn%C3%AD",
  };
  return wikiMapping[speciesId] || '';
};

export const getWikiTitleFromUrl = (url: string): string => {
  if (!url) return '';
  const parts = url.split('/wiki/');
  if (parts.length > 1) {
    return decodeURIComponent(parts[1]).replace(/_/g, ' ');
  }
  return '';
};

export const getCleanLatinName = (latin: string | undefined): string => {
  if (!latin) return '';
  return latin.split('/')[0].trim();
};

export const getMendelMacroUrl = (speciesId: string, cutType: 'P' | 'R' | 'T'): string | null => {
  let prefix = '';
  switch (speciesId) {
    case 'borovice_lesni': prefix = 'bo'; break;
    case 'douglaska': prefix = 'dg'; break;
    case 'jalovec': prefix = 'jal'; break;
    case 'jedle': prefix = 'jd'; break;
    case 'modrin': prefix = 'md'; break;
    case 'smrk': prefix = 'sm'; break;
    case 'tis': prefix = 'tis'; break;
    case 'borovice_vejmutovka': prefix = 'vj'; break;
    case 'akat': prefix = 'ak'; break;
    case 'buk': prefix = 'bk'; break;
    case 'briza': prefix = 'br'; break;
    case 'dub': prefix = 'db'; break;
    case 'habr': prefix = 'hb'; break;
    case 'hrusen': prefix = 'hr'; break;
    case 'jablon': prefix = 'jb'; break;
    case 'jilm': prefix = 'jm'; break;
    case 'jerab': prefix = 'jr'; break;
    case 'jasan': prefix = 'js'; break;
    case 'javor': prefix = 'jv'; break;
    case 'babyka': prefix = 'jv'; break;
    case 'jirovec': prefix = 'ji'; break;
    case 'kastanovnik': prefix = 'ks'; break;
    case 'lipa': prefix = 'lp'; break;
    case 'morusovnik': prefix = 'mo'; break;
    case 'olse': prefix = 'ol'; break;
    case 'oresak': prefix = 'or'; break;
    case 'osika': prefix = 'os'; break;
    case 'pajasan': prefix = 'pj'; break;
    case 'platan': prefix = 'pt'; break;
    case 'svestka': prefix = 'sv'; break;
    case 'topol': prefix = 'tp'; break;
    case 'tresen': prefix = 'tr'; break;
    case 'vrba': prefix = 'vr'; break;
    default: return null;
  }
  const suffix = cutType.toLowerCase();
  return `https://stavbadreva.ldf.mendelu.cz/lexikon/makro/obr/${prefix}_${suffix}_600.jpg`;
};

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

export const getMendelSpeciesCode = (speciesId: string): string => {
  const mapping: Record<string, string> = {
    borovice_lesni: 'bo',
    douglaska: 'dg',
    jalovec: 'jal',
    jedle: 'jd',
    modrin: 'md',
    smrk: 'sm',
    tis: 'tis',
    borovice_vejmutovka: 'vj',
    akat: 'ak',
    buk: 'bk',
    briza: 'br',
    dub: 'db',
    habr: 'hb',
    hrusen: 'hr',
    jablon: 'jb',
    jilm: 'jm',
    jerab: 'jr',
    jasan: 'js',
    javor: 'jv',
    babyka: 'jv',
    jirovec: 'ji',
    kastanovnik: 'ks',
    lipa: 'lp',
    morusovnik: 'mo',
    olse: 'ol',
    oresak: 'or',
    osika: 'os',
    pajasan: 'pj',
    platan: 'pt',
    svestka: 'sv',
    topol: 'tp',
    tresen: 'tr',
    vrba: 'vr'
  };
  return mapping[speciesId] || '';
};

export const BotanicalReferences: React.FC<{ species: any; className?: string }> = ({ species, className = '' }) => {
  const [dbImages, setDbImages] = React.useState<{ P: string[], R: string[], T: string[], tree?: string[] } | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!species) return;
    const cleanLatin = getCleanLatinName(species.latinName);
    setIsLoading(true);
    fetch(`/api/wood-database-images?latinName=${encodeURIComponent(cleanLatin)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.images) {
          setDbImages(data.images);
        } else if (data.status === 'ok') {
          setDbImages(data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, [species]);

  const wslCode = getScientificCode(species.id);
  const wslUrl = wslCode ? `https://www.wsl.ch/land/products/dendro/species.php?code=${wslCode}` : '';
  const mendelCode = getMendelSpeciesCode(species.id);
  const mendelUrl = mendelCode 
    ? `https://stavbadreva.ldf.mendelu.cz/lexikon/makro/index.html?drevina=${mendelCode}`
    : "https://stavbadreva.ldf.mendelu.cz/";
  const wikiUrl = getWikipediaUrl(species.id);

  return (
    <div className={`bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-[11px] space-y-3.5 shadow-3xs text-left ${className}`}>
      <div className="flex flex-col space-y-2.5">
        <div className="text-stone-500 font-sans font-extrabold text-[10px] uppercase tracking-wider flex items-center space-x-1.5 border-b border-stone-200/50 pb-1.5">
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>Botanické & Anatomické reference:</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5 font-mono">
          {wslUrl ? (
            <a
              href={wslUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 px-2.5 bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-lg text-stone-700 hover:text-emerald-700 transition-colors shadow-3xs group"
            >
              <span className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
                <span>🔬</span>
                <span className="font-semibold text-stone-800 text-[10.5px] truncate text-emerald-700">Anatomie WSL ({wslCode})</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-500 shrink-0 ml-1 transition-colors" />
            </a>
          ) : (
            <div className="flex items-center space-x-2 p-2 px-2.5 bg-stone-100/60 border border-stone-200 rounded-lg text-stone-400 text-[10px] select-none italic">
              <span>🔬</span>
              <span>Anatomické snímky WSL nedostupné</span>
            </div>
          )}
          
          {mendelUrl ? (
            <a
              href={mendelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 px-2.5 bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-lg text-stone-700 hover:text-amber-700 transition-colors shadow-3xs group"
            >
              <span className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap font-mono">
                <span>🎓</span>
                <span className="font-semibold text-stone-800 text-[10.5px] truncate text-amber-700">
                  MENDELU: {species.name} {mendelCode ? `(${mendelCode.toUpperCase()})` : ''}
                </span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-500 shrink-0 ml-1 transition-colors" />
            </a>
          ) : (
            <div className="flex items-center space-x-2 p-2 px-2.5 bg-stone-100/60 border border-stone-200 rounded-lg text-stone-400 text-[10px] select-none italic">
              <span>🎓</span>
              <span>Atlas MENDELU nedostupný</span>
            </div>
          )}

          {wikiUrl ? (
            <a
              href={wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 px-2.5 bg-white hover:bg-blue-50 border border-stone-200 hover:border-blue-300 rounded-lg text-stone-700 hover:text-blue-700 transition-colors shadow-3xs group"
            >
              <span className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap font-mono">
                <span>🌐</span>
                <span className="font-semibold text-stone-800 text-[10.5px] truncate text-blue-700 font-sans">Wikipedia: {species.name}</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-blue-500 shrink-0 ml-1 transition-colors" />
            </a>
          ) : (
            <div className="flex items-center space-x-2 p-2 px-2.5 bg-stone-100/60 border border-stone-200 rounded-lg text-stone-400 text-[10px] select-none italic">
              <span>🌐</span>
              <span>Wikipedie nedostupná</span>
            </div>
          )}
        </div>
        
        {dbImages?.tree && dbImages.tree.length > 0 && (
          <div className="pt-2 border-t border-stone-200/50 flex flex-col space-y-1 pb-1">
            <span className="text-[9.5px] font-sans font-extrabold text-stone-500 uppercase tracking-wider flex items-center space-x-1">
              <span>🌿</span> <span>Botanický náhled (Strom / Listy / Kůra - Wood DB):</span>
            </span>
            <div className="flex items-center space-x-2 bg-amber-50/20 hover:bg-amber-50/45 p-2 rounded-lg border border-amber-500/10 transition-colors">
              <img 
                src={`/api/image-proxy?url=${encodeURIComponent(dbImages.tree[0])}`} 
                alt="Tree botanical preview" 
                className="w-12 h-12 rounded-md object-cover border border-stone-200 shadow-3xs cursor-zoom-in hover:scale-105 transition-all duration-200"
                referrerPolicy="no-referrer"
                onClick={(e) => {
                  e.stopPropagation();
                  const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(dbImages.tree![0])}`;
                  window.open(proxiedUrl, '_blank');
                }}
                title="Kliknutím otevřete v plné velikosti"
              />
              <span className="text-[10px] text-stone-600 font-sans leading-tight">
                Autentický botanický snímek celého stromu, habitu nebo detailu listů a kůry pro druh <strong className="text-stone-800 font-semibold">{species?.name}</strong> (<em className="text-stone-700 font-serif">{getCleanLatinName(species?.latinName)}</em>) přímo ze sbírek Wood Database.
              </span>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-stone-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
          <div className="flex items-center space-x-1.5 text-stone-500 font-sans text-[10px]">
            <HelpCircle className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>Chcete anatomicky identifikovat jiný vzorek dřeva?</span>
          </div>
          <a
            href="https://www.wood-database.com/wood-filter/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 p-1 px-2 rounded bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 lg:text-amber-800 transition-all font-mono text-[9.5px]"
          >
            <span>🔍</span>
            <span className="font-black">Identifikační klíč Wood Filter</span>
            <ExternalLink className="w-3 h-3 text-amber-500 shrink-0 ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Global preference for view mode (macro, micro, botany) across all instances
let globalViewModePreference: 'macro' | 'micro' | 'botany' = 'macro';

export const WoodCutVisualizer: React.FC<VisualizerProps> = ({
  species,
  cutType,
  className = '',
  zoom = false,
  initialViewMode,
  simplified = false
}) => {
  const [viewMode, setViewModeState] = useState<'macro' | 'micro' | 'botany'>(() => {
    if (simplified) return 'macro';
    if (initialViewMode === 'micro' || initialViewMode === 'schema') return 'micro';
    return globalViewModePreference;
  });

  // Custom setViewMode to notify other visualizers on the screen (sync transversal/radial/tangential)
  const setViewMode = (newMode: 'macro' | 'micro' | 'botany') => {
    if (!simplified) {
      globalViewModePreference = newMode;
      window.dispatchEvent(new CustomEvent('wood-visualizer-viewmode-change', { detail: newMode }));
    }
    setViewModeState(newMode);
  };

  // Sync with other visualizers
  useEffect(() => {
    if (simplified) return;
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<'macro' | 'micro' | 'botany'>;
      setViewModeState(customEvent.detail);
    };
    window.addEventListener('wood-visualizer-viewmode-change', handleSync);
    return () => {
      window.removeEventListener('wood-visualizer-viewmode-change', handleSync);
    };
  }, [simplified]);
  const [wikiImage, setWikiImage] = useState<string | null>(null);
  const [isLoadingWikiImage, setIsLoadingWikiImage] = useState<boolean>(false);
  const [activeImgIdx, setActiveImgIdx] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Close zoomed image on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [dbImages, setDbImages] = useState<{ P: string[], R: string[], T: string[], tree?: string[] } | null>(null);
  const [isLoadingDbImages, setIsLoadingDbImages] = useState<boolean>(false);

  // Map species to WSL mapping keys
  const getMappedImages = (): string[] => {
    if (!species) return [];
    const wslData = WSL_IMAGE_MAPPING[species.id];
    if (!wslData) return [];
    let urls: string[] = [];
    if (cutType === 'P') urls = wslData.transversal || [];
    else if (cutType === 'R') urls = wslData.radial || [];
    else if (cutType === 'T') urls = wslData.tangential || [];
    
    // Fallback: if the specific cut has no microscopic images in WSL database,
    // we use transversal or any other available cut of this species so details are always present!
    if (urls.length === 0) {
      urls = wslData.transversal || [];
    }
    if (urls.length === 0) {
      urls = wslData.radial || [];
    }
    if (urls.length === 0) {
      urls = wslData.tangential || [];
    }
    
    return urls.map(url => url.replace(/k\.jpg$/, '.jpg'));
  };

  // Asynchronously query wood-database anatomy images
  useEffect(() => {
    if (!species || simplified) return;
    setIsLoadingDbImages(true);
    setDbImages(null);
    const cleanLatin = species.latinName ? species.latinName.split('/')[0].trim() : '';
    if (!cleanLatin) {
      setIsLoadingDbImages(false);
      return;
    }

    fetch(`/api/wood-database-images?latinName=${encodeURIComponent(cleanLatin)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.images) {
          setDbImages(data.images);
        }
      })
      .catch(err => console.error("Anatomy scraper error:", err))
      .finally(() => setIsLoadingDbImages(false));
  }, [species?.id]);

  const getCombinedImages = (): { url: string; source: 'wsl' | 'wood-database' }[] => {
    const combined: { url: string; source: 'wsl' | 'wood-database' }[] = [];
    const wslUrls = getMappedImages();
    wslUrls.forEach(url => {
      combined.push({ url, source: 'wsl' });
    });

    if (dbImages) {
      let dbUrls: string[] = [];
      if (cutType === 'P') dbUrls = dbImages.P || [];
      else if (cutType === 'R') dbUrls = dbImages.R || [];
      else if (cutType === 'T') dbUrls = dbImages.T || [];

      dbUrls.forEach(url => {
        const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(url)}`;
        combined.push({ url: proxiedUrl, source: 'wood-database' });
      });
    }

    return combined;
  };

  const combinedImages = getCombinedImages();
  const images = combinedImages.map(item => item.url);
  const hasImages = images.length > 0;
  
  // Fetch botanical tree / leaf / branch page image from Wikipedia API using mapped article URL title
  useEffect(() => {
    if (!species || simplified) {
      setWikiImage(null);
      return;
    }
    const wikiUrl = getWikipediaUrl(species.id);
    const title = getWikiTitleFromUrl(wikiUrl);
    if (!title) {
      setWikiImage(null);
      return;
    }

    setIsLoadingWikiImage(true);
    setWikiImage(null);

    const apiQueryUrl = `https://cs.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=thumbnail&pithumbsize=600&titles=${encodeURIComponent(title)}&origin=*`;

    fetch(apiQueryUrl)
      .then(res => res.json())
      .then(data => {
        const pages = data?.query?.pages;
        if (pages) {
          const pageId = Object.keys(pages)[0];
          const thumbnail = pages[pageId]?.thumbnail?.source;
          if (thumbnail) {
            setWikiImage(thumbnail);
          } else {
            setWikiImage(null);
          }
        } else {
          setWikiImage(null);
        }
      })
      .catch(err => {
        console.error("Wikipedia API fetch error:", err);
        setWikiImage(null);
      })
      .finally(() => {
        setIsLoadingWikiImage(false);
      });
  }, [species?.id]);

  // Priority checkout for botanical preview:
  // 1. Wikipedia page image
  // 2. Wood Database crawled tree picture (dbImages?.tree)
  const getNahledImage = (): string | null => {
    if (wikiImage) {
      return wikiImage;
    }
    if (dbImages?.tree && dbImages.tree.length > 0) {
      return `/api/image-proxy?url=${encodeURIComponent(dbImages.tree[0])}`;
    }
    return null;
  };

  const nahledImage = getNahledImage();

  const mendelUrl = species ? getMendelMacroUrl(species.id, cutType) : null;
  const mendelProxiedUrl = mendelUrl ? `/api/image-proxy?url=${encodeURIComponent(mendelUrl)}` : null;

  // Reset active image index and preserve global preference mode
  useEffect(() => {
    setActiveImgIdx(0);
    if (simplified) {
      setViewModeState('macro');
    } else {
      setViewModeState(globalViewModePreference);
    }
  }, [species?.id, cutType, initialViewMode, simplified]);

  // Fallback viewMode if active viewMode becomes unavailable
  useEffect(() => {
    if (viewMode === 'botany' && !isLoadingWikiImage && !isLoadingDbImages && !nahledImage) {
      // If botany tab is selected but has no image, fallback to macro
      setViewMode('macro');
    }
  }, [isLoadingWikiImage, isLoadingDbImages, nahledImage, viewMode]);

  // Safe default values if no species provided (used during general dictionary / navigation)
  const isListnaty = species ? species.class === 'listnate' : true;
  const porosity = species ? species.porosity : 'roztrousene';
  const hasJadro = species ? species.hasHeartwood : true;
  const isWavy = species ? (species.id === 'tis' || species.id === 'jalovec' || species.id === 'habr' || species.id === 'jilm' || species.id === 'svestka') : false;
  const hasPithFlecks = species ? species.specialFeatures?.some(f => f.toLowerCase().includes('skvrny')) : false;

  const wslCode = species ? getScientificCode(species.id) : '';
  const wslUrl = wslCode ? `https://www.wsl.ch/land/products/dendro/species.php?code=${wslCode}` : '';
  const woodDbUrl = species ? `https://www.wood-database.com/?s=${encodeURIComponent(getCleanLatinName(species.latinName))}` : '';
  const wikiUrl = species ? getWikipediaUrl(species.id) : '';

  // Derive wood color schemes
  // Sapwood color: cream, yellowish, whitish, pinkish
  let sapColor = '#f5e6d3'; // warm cream
  let heartColor = '#c19a6b'; // warm brownish amber
  
  if (species) {
    const id = species.id;
    if (id === 'jedle') { sapColor = '#f7f4ed'; heartColor = '#ded6c1'; }
    else if (id === 'smrk') { sapColor = '#faf6eb'; heartColor = '#f2e8cf'; }
    else if (id === 'tis') { sapColor = '#fffaeb'; heartColor = '#b83b1d'; }
    else if (id === 'jalovec') { sapColor = '#fff9ec'; heartColor = '#803c6b'; }
    else if (id === 'modrin') { sapColor = '#fff6e0'; heartColor = '#bd4620'; }
    else if (id === 'douglaska') { sapColor = '#fcf0dc'; heartColor = '#cf5e40'; }
    else if (id === 'borovice_lesni') { sapColor = '#fcf2d2'; heartColor = '#be5934'; }
    else if (id === 'borovice_vejmutovka') { sapColor = '#faf3cf'; heartColor = '#d29676'; }
    else if (id === 'dub') { sapColor = '#f2e2be'; heartColor = '#8b5a2b'; }
    else if (id === 'pajasan') { sapColor = '#f6ecc5'; heartColor = '#737a4e'; }
    else if (id === 'jilm') { sapColor = '#eee3c8'; heartColor = '#6e3f20'; }
    else if (id === 'akat') { sapColor = '#faf8d4'; heartColor = '#8a8e3d'; }
    else if (id === 'morusovnik') { sapColor = '#f7eebe'; heartColor = '#946615'; }
    else if (id === 'jasan') { sapColor = '#fbebcf'; heartColor = '#ab8b65'; }
    else if (id === 'kastanovnik') { sapColor = '#faeecd'; heartColor = '#875b31'; }
    else if (id === 'oresak') { sapColor = '#e1dbcd'; heartColor = '#4e3b31'; }
    else if (id === 'tresen') { sapColor = '#fdecd5'; heartColor = '#ac533c'; }
    else if (id === 'svestka') { sapColor = '#fce5cd'; heartColor = '#7d1e44'; }
    else if (id === 'platan') { sapColor = '#fbdfcc'; heartColor = '#9e623b'; }
    else if (id === 'buk') { sapColor = '#faded0'; heartColor = '#da9d80'; }
    else if (id === 'habr') { sapColor = '#eae7dd'; heartColor = '#eae7dd'; }
    else if (id === 'olse') { sapColor = '#f5c697'; heartColor = '#f5c697'; }
    else if (id === 'javor') { sapColor = '#fbfbf5'; heartColor = '#fbfbf5'; }
    else if (id === 'babyka') { sapColor = '#f4e9db'; heartColor = '#f4e9db'; }
    else if (id === 'briza') { sapColor = '#fcf8ec'; heartColor = '#fcf8ec'; }
    else if (id === 'lipa') { sapColor = '#faf5e1'; heartColor = '#faf5e1'; }
    else if (id === 'osika') { sapColor = '#f1eedf'; heartColor = '#f1eedf'; }
    else if (id === 'hrusen') { sapColor = '#eccbbf'; heartColor = '#d99c87'; }
    else if (id === 'jirovec') { sapColor = '#faf8e4'; heartColor = '#faf8e4'; }
    else if (id === 'vrba') { sapColor = '#faedd0'; heartColor = '#cc8e60'; }
    else if (id === 'topol') { sapColor = '#fbf7dc'; heartColor = '#8a9b68'; }
    else if (id === 'jerab') { sapColor = '#fae1cc'; heartColor = '#a87758'; }
    else if (id === 'jablon') { sapColor = '#fadfc5'; heartColor = '#b55a43'; }
  }

  // Underlay base bg: base wood context
  const baseBg = hasJadro ? heartColor : sapColor;

  // Custom textures renderers based on cut
  const renderPriyrez = () => {
    // Příčný řez (Transverse) - Concentric Circles
    const ringsCount = zoom ? 5 : 9;
    
    // Core Wood background is the light sapwood.
    // If hasHeartwood is true, we draw an organic, wavy central zone in heartColor (heartwood core).
    // This perfectly matches botany where sapwood is on the outside and heartwood is on the inside!
    let heartwoodCore = null;
    let heartwoodTransition = null;

    if (hasJadro && species) {
      // Define a custom organic heartwood radius based on the species' specific sapwood width:
      let heartwoodRadius = 105;
      const id = species.id;
      if (id === 'oresak') heartwoodRadius = 85; // Walnut has broad sapwood, small core
      else if (id === 'tis' || id === 'akat' || id === 'svestka') heartwoodRadius = 130; // Very narrow sapwood
      else if (id === 'jalovec' || id === 'modrin' || id === 'dub' || id === 'tresen') heartwoodRadius = 118;
      else if (id === 'borovice_lesni') heartwoodRadius = 90; // Pine has broad sapwood

      // 1. Double layer: a transitional blend path (diffusion zone)
      const transPoints = [];
      const steps = 80;
      for (let j = 0; j <= steps; j++) {
        const angle = (j / steps) * Math.PI * 2;
        const wobble = Math.sin(angle * 7) * 5.0 + Math.cos(angle * 13) * 2.0 + Math.sin(angle * 3) * 1.5;
        const r = heartwoodRadius + 15 + wobble; // wider radius
        const x = 150 + Math.cos(angle) * r;
        const y = 150 + Math.sin(angle) * r;
        transPoints.push(`${j === 0 ? 'M' : 'L'} ${x} ${y}`);
      }
      
      heartwoodTransition = (
        <path
          d={transPoints.join(' ') + ' Z'}
          fill={heartColor}
          opacity={0.38}
        />
      );

      // 2. Main core heartwood path
      const corePoints = [];
      for (let j = 0; j <= steps; j++) {
        const angle = (j / steps) * Math.PI * 2;
        const wobble = Math.sin(angle * 7) * 5.0 + Math.cos(angle * 13) * 2.0 + Math.sin(angle * 3) * 1.5;
        const r = heartwoodRadius + wobble;
        const x = 150 + Math.cos(angle) * r;
        const y = 150 + Math.sin(angle) * r;
        corePoints.push(`${j === 0 ? 'M' : 'L'} ${x} ${y}`);
      }
      
      heartwoodCore = (
        <path
          d={corePoints.join(' ') + ' Z'}
          fill={heartColor}
          opacity={0.94}
        />
      );
    }

    const rings = [];
    for (let i = 1; i <= ringsCount; i++) {
      const radius = i * (zoom ? 35 : 18) + 8;
      let dPath = '';
      
      // Calculate a wobbly/wavy path to simulate biological growth rings (not sterile compass circles)
      const points = [];
      const steps = 80;
      const isWavySpecies = isWavy;
      const baseWaviness = isWavySpecies ? 4.5 : 0.8;
      const rWaviness = baseWaviness * (radius / 60);

      for (let j = 0; j <= steps; j++) {
        const angle = (j / steps) * Math.PI * 2;
        const wobble = Math.sin(angle * 8 + i) * rWaviness + 
                       Math.cos(angle * 13 - i) * (rWaviness * 0.3) +
                       Math.sin(angle * 3 + i * 0.5) * (rWaviness * 0.4);
        const currR = radius + wobble;
        const x = 150 + Math.cos(angle) * currR;
        const y = 150 + Math.sin(angle) * currR;
        points.push(`${j === 0 ? 'M' : 'L'} ${x} ${y}`);
      }
      dPath = points.join(' ') + ' Z';

      // Draw two components for every growth ring:
      // A. Soft, wide underlay line simulating the latewood color gradual transition band
      rings.push(
        <path
          key={`ring-band-${i}`}
          d={dPath}
          fill="none"
          stroke={species?.class === 'jehlicnate' ? '#704f2d' : '#573d1f'}
          strokeWidth={2.8}
          opacity={0.16 + (i * 0.02)}
        />
      );

      // B. Fine, crisp dark edge line representing the outer limit of the latewood
      rings.push(
        <path
          key={`ring-line-${i}`}
          d={dPath}
          fill="none"
          stroke={species?.class === 'jehlicnate' ? '#5a3d21' : '#452e18'}
          strokeWidth={species?.id === 'jilm' || species?.id === 'tis' ? 1.6 : 0.8}
          opacity={0.32 + (i * 0.04)}
        />
      );
    }

    // Draw pores if listnaty (hardwoods)
    const poresList = [];
    if (isListnaty && species) {
      if (porosity === 'kruhovite') {
        // Kruhovitě pórovité (Ring-porous): large pore rings in earlywood of each ring
        for (let rIdx = 1; rIdx < ringsCount; rIdx++) {
          const radius = rIdx * (zoom ? 35 : 18) + 12;
          const poreCount = rIdx * 12;
          
          for (let pIdx = 0; pIdx < poreCount; pIdx++) {
            const angle = (pIdx / poreCount) * Math.PI * 2;
            const isWavySpecies = isWavy;
            const rWaviness = (isWavySpecies ? 4.5 : 0.8) * (radius / 60);
            const wobble = Math.sin(angle * 8 + rIdx) * rWaviness + 
                           Math.cos(angle * 13 - rIdx) * (rWaviness * 0.3) +
                           Math.sin(angle * 3 + rIdx * 0.5) * (rWaviness * 0.4);
            const currR = radius + wobble - 1.8; // offset into earlywood
            const x = 150 + Math.cos(angle) * currR;
            const y = 150 + Math.sin(angle) * currR;
            
            // Akát has clogged gilded tyloses (tyly), others have open dark vessels
            const color = species.id === 'akat' ? '#e5c158' : '#331f0d';
            const size = (zoom ? 2.6 : 1.6) * (0.8 + Math.random() * 0.4);
            
            poresList.push(
              <circle
                key={`pore-ring-${rIdx}-${pIdx}`}
                cx={x + (Math.random() - 0.5) * 1.5}
                cy={y + (Math.random() - 0.5) * 1.5}
                r={size}
                fill={color}
                stroke={species.id === 'akat' ? '#7c8030' : 'none'}
                strokeWidth={0.4}
                opacity={0.78}
              />
            );
          }
        }
        // Small scattered pores in late wood
        for (let rIdx = 1; rIdx < ringsCount; rIdx++) {
          const radius = rIdx * (zoom ? 35 : 18) + 21;
          const poreCount = rIdx * 5;
          for (let pIdx = 0; pIdx < poreCount; pIdx++) {
            const angle = ((pIdx + 0.5) / poreCount) * Math.PI * 2;
            const x = 150 + Math.cos(angle) * radius;
            const y = 150 + Math.sin(angle) * radius;
            poresList.push(
              <circle
                key={`pore-sparse-${rIdx}-${pIdx}`}
                cx={x + (Math.random() - 0.5) * 2}
                cy={y + (Math.random() - 0.5) * 2}
                r={zoom ? 0.9 : 0.6}
                fill="#36220f"
                opacity={0.55}
              />
            );
          }
        }
      } else if (porosity === 'polokruhovite') {
        // Polokruhovitě pórovité (Semi-ring porous - e.g. Ořešák, Třešeň, Švestka):
        // Pores start larger/dense and gracefully scale down in size and frequency outwards across each growth ring boundaries!
        for (let rIdx = 1; rIdx < ringsCount; rIdx++) {
          const ringInnerR = rIdx * (zoom ? 35 : 18) + 8;
          const ringWidth = zoom ? 35 : 18;
          const bandsCount = 3;
          
          for (let band = 0; band < bandsCount; band++) {
            const subRadius = ringInnerR + band * (ringWidth / 3.0) + 1.2;
            const rOffsetPercent = subRadius / 60;
            const poreCount = Math.max(3, Math.round(rIdx * (9 - band * 2.5)));
            const poreSize = Math.max(0.4, (zoom ? 2.1 : 1.3) - band * (zoom ? 0.5 : 0.3));
            
            for (let pIdx = 0; pIdx < poreCount; pIdx++) {
              const angle = (pIdx / poreCount) * Math.PI * 2 + band * 0.15;
              const rWaviness = (isWavy ? 4.5 : 0.8) * rOffsetPercent;
              const wobble = Math.sin(angle * 8 + subRadius) * rWaviness + 
                             Math.cos(angle * 13 - subRadius) * (rWaviness * 0.3);
              const currR = subRadius + wobble;
              const x = 150 + Math.cos(angle) * currR;
              const y = 150 + Math.sin(angle) * currR;
              
              poresList.push(
                <circle
                  key={`pore-semi-${rIdx}-${band}-${pIdx}`}
                  cx={x + (Math.random() - 0.5) * 1.5}
                  cy={y + (Math.random() - 0.5) * 1.5}
                  r={poreSize * (0.85 + Math.random() * 0.3)}
                  fill="#36220f"
                  opacity={0.8 - band * 0.15}
                />
              );
            }
          }
        }
      } else {
        // Roztroušeně pórovité (Diffuse-porous - e.g. Buk, Javor, Bříza, Lípa, Olše):
        // Massive abundance of extremely fine micro-pores distributed uniformly across the entire trunk!
        const numPores = zoom ? 380 : 260;
        for (let i = 0; i < numPores; i++) {
          const radius = Math.sqrt(Math.random()) * 135 + 8;
          const angle = Math.random() * Math.PI * 2;
          const x = 150 + Math.cos(angle) * radius;
          const y = 150 + Math.sin(angle) * radius;
          poresList.push(
            <circle
              key={`pore-diff-${i}`}
              cx={x}
              cy={y}
              r={(zoom ? 0.9 : 0.55) * (0.8 + Math.random() * 0.4)}
              fill="#432c18"
              opacity={0.5}
            />
          );
        }
      }
    }

    // Draw ray lines with subtle organic winding curves kolmo k letokruhům
    const rayLines = [];
    if (species && (species.rayType === 'visible_all' || species.rayType === 'wide' || species.rayType === 'narrow')) {
      const isWide = species.rayType === 'wide' || species.rayType === 'visible_all';
      const count = isWide ? (species.id === 'platan' ? 24 : 18) : 32;
      const opacity = isWide ? 0.42 : 0.22;
      const strokeW = isWide ? 1.6 : 0.65;
      const color = species.id === 'platan' ? '#dca082' : '#dfc196';

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const outerR = 145;
        const pathPoints = [];
        const segments = 12;
        
        for (let s = 0; s <= segments; s++) {
          const currR = (s / segments) * outerR;
          // Curve rays slightly to squeeze organically around wood growing rings
          const rCurve = angle + Math.sin(currR * 0.045) * 0.02 + Math.cos(currR * 0.09) * 0.012;
          const x = 150 + Math.cos(rCurve) * currR;
          const y = 150 + Math.sin(rCurve) * currR;
          pathPoints.push(`${s === 0 ? 'M' : 'L'} ${x} ${y}`);
        }
        
        rayLines.push(
          <path
            key={`ray-line-${i}`}
            d={pathPoints.join(' ')}
            fill="none"
            stroke={color}
            strokeWidth={strokeW}
            opacity={opacity}
          />
        );
      }
    }

    // Resin canals for conifers
    const resinCanals = [];
    if (species && species.class === 'jehlicnate' && species.hasResinCanals) {
      const canalCount = species.hasResinCanals === 'many' ? 35 : 12;
      for (let i = 0; i < canalCount; i++) {
        const radius = Math.random() * 115 + 15;
        const angle = Math.random() * Math.PI * 2;
        const x = 150 + Math.cos(angle) * radius;
        const y = 150 + Math.sin(angle) * radius;
        resinCanals.push(
          <circle
            key={`resin-${i}`}
            cx={x}
            cy={y}
            r={1.1}
            fill="#fff3e6"
            stroke="#946a42"
            strokeWidth={0.5}
            opacity={0.85}
          />
        );
      }
    }

    // Pith Flecks (Dřeňové skvrny)
    const pfElements = [];
    if (hasPithFlecks) {
      pfElements.push(
        <path
          key="pf-1"
          d="M 115 85 Q 130 80 155 93"
          fill="none"
          stroke="#7d4e28"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.8}
        />,
        <path
          key="pf-2"
          d="M 85 175 Q 100 195 125 185"
          fill="none"
          stroke="#7d4e28"
          strokeWidth={2.4}
          strokeLinecap="round"
          opacity={0.75}
        />
      );
    }

    return (
      <g>
        {/* Core Wood Background represents sapwood */}
        <rect width={300} height={300} fill={sapColor} />
        {/* Heartwood organic transition zone underlay */}
        {heartwoodTransition}
        {/* Heartwood main organic core */}
        {heartwoodCore}
        {/* Wood morphological structures across both core & sapwood */}
        {rings}
        {poresList}
        {resinCanals}
        {rayLines}
        {pfElements}
        {/* Fine biological pith core center (dřeň) */}
        <circle cx={150} cy={150} r={3.8} fill="#4f351f" opacity={0.85} />
      </g>
    );
  };

  const renderRadialrez = () => {
    // Radiální řez (Radial) - Parallel Vertical Lines
    const linesCount = 11;
    const verticalLines = [];
    const grainColor = species?.class === 'listnate' ? '#5a3d21' : '#8c603b';

    for (let i = 0; i < linesCount; i++) {
      const x = (i + 0.5) * 27;
      
      // Draw wavy vertical growth bands to mimic real vertical fibers on log splits
      const bandPoints = [];
      const steps = 10;
      for (let s = 0; s <= steps; s++) {
        const y = (s / steps) * 300;
        const wobble = Math.sin(y * 0.014 + i) * 2.8 + Math.cos(y * 0.035 - i) * 1.0;
        bandPoints.push(`${s === 0 ? 'M' : 'L'} ${x + wobble} ${y}`);
      }

      // Draw shadow underlay to give depth/color gradual zone
      verticalLines.push(
        <path
          key={`grain-band-radial-${i}`}
          d={bandPoints.join(' ')}
          fill="none"
          stroke={grainColor}
          strokeWidth={species?.id === 'modrin' || species?.id === 'borovice_lesni' || species?.id === 'jasan' ? 6.5 : 3.5}
          opacity={0.12}
        />
      );

      // Draw sharp latewood boundary
      verticalLines.push(
        <path
          key={`grain-line-radial-${i}`}
          d={bandPoints.join(' ')}
          fill="none"
          stroke={grainColor}
          strokeWidth={1.3}
          opacity={0.24 + (i % 3) * 0.12}
        />
      );
    }

    // Draw svislé rýhy cév (vertical vessel chambers) for listnaté
    const radialVessels = [];
    if (species && species.class === 'listnate') {
      const isRingPorous = species.porosity === 'kruhovite';
      const numGrooves = isRingPorous ? 24 : 12;
      for (let i = 0; i < numGrooves; i++) {
        const x = Math.random() * 270 + 15;
        const startY = Math.random() * 140;
        const len = 80 + Math.random() * 150;
        
        const pathPts = [];
        for (let y = startY; y <= startY + len; y += 25) {
          const wobble = Math.sin(y * 0.015) * 1.5;
          pathPts.push(`${y === startY ? 'M' : 'L'} ${x + wobble} ${y}`);
        }
        
        radialVessels.push(
          <path
            key={`radial-vessel-${i}`}
            d={pathPts.join(' ')}
            fill="none"
            stroke="#38210b"
            strokeWidth={isRingPorous ? 1.6 : 0.8}
            strokeDasharray="4, 11, 8, 9"
            opacity={0.35}
          />
        );
      }
    }

    // Draw dřeňové paprsky as glowing rectangular "mirrors" (zrcadla) if radial visible
    const mirrors = [];
    if (species && (species.rayType !== 'invisible')) {
      const mirrorCount = species.rayType === 'wide' || species.id === 'platan' ? 24 : 11;
      const mWidth = species.rayType === 'wide' || species.id === 'platan' ? 42 : 24;
      const mHeight = species.rayType === 'wide' || species.id === 'platan' ? 12 : 6;
      const opacity = species.rayType === 'wide' || species.id === 'platan' ? 0.62 : 0.32;
      
      // Determine mirror color
      let mColor = '#fedc9d'; // gold warm shiny
      if (species.id === 'dub') mColor = '#e1b17b';
      else if (species.id === 'svestka' || species.id === 'tresen') mColor = '#d36c5c';
      else if (species.id === 'platan') mColor = '#d89470';
      else if (species.id === 'akat' || species.id === 'morusovnik') mColor = '#d6cb60';

      for (let i = 0; i < mirrorCount; i++) {
        const x = Math.random() * 240 + 10;
        const y = Math.random() * 260 + 10;
        mirrors.push(
          <rect
            key={`mirror-${i}`}
            x={x}
            y={y}
            width={mWidth}
            height={mHeight}
            rx={1.5}
            fill={mColor}
            opacity={opacity}
            style={{ mixBlendMode: 'screen' }}
          />
        );
      }
    }

    // Draw resin canal bands if conifer with canals
    const canals = [];
    if (species && species.class === 'jehlicnate' && species.hasResinCanals) {
      const cCount = species.hasResinCanals === 'many' ? 8 : 3;
      for (let i = 0; i < cCount; i++) {
        const x = Math.random() * 260 + 20;
        canals.push(
          <line
            key={`rcanal-${i}`}
            x1={x}
            y1={0}
            x2={x}
            y2={300}
            stroke="#ffeed4"
            strokeWidth={1.2}
            strokeDasharray="14, 7"
            opacity={0.65}
          />
        );
      }
    }

    // Sapwood-Heartwood dual tone sidebars (Left and Right represent outer trunk edges)
    let sapOverlay = null;
    if (hasJadro && species) {
      // Both edges represent lighter sapwood since this cut passes directly through the center (střed) of the trunk
      sapOverlay = (
        <g>
          <rect
            x={0}
            y={0}
            width={65}
            height={300}
            fill={sapColor}
            opacity={0.92}
          />
          <rect
            x={235}
            y={0}
            width={65}
            height={300}
            fill={sapColor}
            opacity={0.92}
          />
        </g>
      );
    }

    // Pith center line (dřeň) running down the vertical center
    const pithLine = (
      <line
        x1={150}
        y1={0}
        x2={150}
        y2={300}
        stroke="#4f351f"
        strokeWidth={2.2}
        opacity={0.7}
        strokeDasharray="18, 6, 3, 6"
      />
    );

    return (
      <g>
        <rect width={300} height={300} fill={baseBg} />
        {verticalLines}
        {radialVessels}
        {canals}
        {mirrors}
        {sapOverlay}
        {pithLine}
      </g>
    );
  };

  const renderTangencialrez = () => {
    // Tangenciální řez (Tangential / Fládr) - Real Wood Anatomical Board Structure with Organic Flame Lines
    const strokeColor = species?.class === 'listnate' ? '#5a3d21' : '#8c603b';
    const isJehlicnaty = species?.class === 'jehlicnate';
    const isRingPorous = species?.porosity === 'kruhovite';
    const isSemiRing = species?.porosity === 'polokruhovite';

    const hasHighContrast = species ? (
      species.id === 'modrin' || 
      species.id === 'borovice_lesni' || 
      species.id === 'douglaska' ||
      species.id === 'jasan' || 
      species.id === 'dub' || 
      species.id === 'akat' || 
      species.id === 'jilm' ||
      species.id === 'svestka'
    ) : false;

    const baseLineW = hasHighContrast ? 3.4 : 1.5;
    const shadowLineW = hasHighContrast ? 14 : 5.5;
    const shadowOpacity = hasHighContrast ? 0.08 : 0.04;
    const lineOpacityMultiplier = hasHighContrast ? 1.0 : 0.75;

    // We will draw central V-shaped flame arches and side contour grain
    const flamesAndStripes = [];

    // Helper to generate a wavy central gothic flame arch
    const getFlamePath = (centerX: number, peakY: number, baseWidth: number, waveAmp = 2.4) => {
      const leftPoints = [];
      const rightPoints = [];
      const segments = 16;
      
      for (let s = 0; s <= segments; s++) {
        const t = s / segments;
        const y = 300 - t * (300 - peakY);
        const xOffset = baseWidth * Math.sqrt(Math.max(0, 1.001 - t));
        const waveL = Math.sin(y * 0.045 + peakY) * waveAmp;
        const waveR = Math.cos(y * 0.045 - peakY) * waveAmp;
        
        leftPoints.push({ x: centerX - xOffset + waveL, y });
        rightPoints.push({ x: centerX + xOffset + waveR, y });
      }
      
      let pathStr = `M ${leftPoints[0].x} ${leftPoints[0].y}`;
      for (let s = 1; s < leftPoints.length; s++) {
        pathStr += ` L ${leftPoints[s].x} ${leftPoints[s].y}`;
      }
      for (let s = rightPoints.length - 1; s >= 0; s--) {
        pathStr += ` L ${rightPoints[s].x} ${rightPoints[s].y}`;
      }
      return pathStr;
    };

    // Helper to generate side lines that do not peak on screen
    const getSideLine = (startX: number, endX: number, waveAmp = 2.4) => {
      const points = [];
      const segments = 12;
      for (let s = 0; s <= segments; s++) {
        const t = s / segments;
        const y = t * 300;
        const baseIndent = startX + (endX - startX) * t;
        const wave = Math.sin(y * 0.045 + startX) * waveAmp;
        points.push(`${s === 0 ? 'M' : 'L'} ${baseIndent + wave} ${y}`);
      }
      return points.join(' ');
    };

    const centralFlames = [
      { peakY: 245, width: 45, opacityVal: 0.35 },
      { peakY: 190, width: 75, opacityVal: 0.45 },
      { peakY: 130, width: 105, opacityVal: 0.55 },
      { peakY: 70, width: 135, opacityVal: 0.65 },
      { peakY: 15, width: 165, opacityVal: 0.75 }
    ];

    const sideLines = [
      // Left side lines
      { sX: 105, eX: 65, opacityVal: 0.65 },
      { sX: 75, eX: 35, opacityVal: 0.55 },
      { sX: 45, eX: 10, opacityVal: 0.45 },
      { sX: 20, eX: -10, opacityVal: 0.35 },
      // Right side lines
      { sX: 195, eX: 235, opacityVal: 0.65 },
      { sX: 225, eX: 265, opacityVal: 0.55 },
      { sX: 255, eX: 290, opacityVal: 0.45 },
      { sX: 280, eX: 310, opacityVal: 0.35 }
    ];

    // Render central flame arches
    centralFlames.forEach((flame, idx) => {
      const dPath = getFlamePath(150, flame.peakY, flame.width);
      
      // Latewood shadow band
      flamesAndStripes.push(
        <path
          key={`flame-sh-${idx}`}
          d={dPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={shadowLineW}
          opacity={shadowOpacity}
        />
      );
      
      // Fine boundary ring
      flamesAndStripes.push(
        <path
          key={`flame-${idx}`}
          d={dPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={baseLineW}
          opacity={flame.opacityVal * lineOpacityMultiplier}
        />
      );
    });

    // Render side lines
    sideLines.forEach((line, idx) => {
      const dPath = getSideLine(line.sX, line.eX);
      
      flamesAndStripes.push(
        <path
          key={`side-sh-${idx}`}
          d={dPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={shadowLineW}
          opacity={shadowOpacity}
        />
      );

      flamesAndStripes.push(
        <path
          key={`side-${idx}`}
          d={dPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={baseLineW}
          opacity={line.opacityVal * lineOpacityMultiplier}
        />
      );
    });

    // Svislé rýhy cév (Vessel grooves) flowing organically around central peaks
    const vesselGrooves = [];
    if (species && !isJehlicnaty) {
      if (isRingPorous) {
        const isAkat = species.id === 'akat';
        const numVessels = 28;
        for (let i = 0; i < numVessels; i++) {
          const x = 35 + Math.random() * 230;
          const y = Math.random() * 160;
          const len = 70 + Math.random() * 100;
          vesselGrooves.push(
            <line
              key={`pore-groove-${i}`}
              x1={x}
              y1={y}
              x2={x + Math.sin(y * 0.05) * 1.5}
              y2={y + len}
              stroke={isAkat ? '#bf9f33' : '#331c08'}
              strokeWidth={1.8}
              strokeDasharray="5, 12, 10, 8"
              opacity={0.65}
            />
          );
        }
      } else if (isSemiRing) {
        const numVessels = 18;
        for (let i = 0; i < numVessels; i++) {
          const x = 30 + Math.random() * 240;
          const y = Math.random() * 180;
          const len = 50 + Math.random() * 70;
          vesselGrooves.push(
            <line
              key={`pore-groove-semi-${i}`}
              x1={x}
              y1={y}
              x2={x + Math.sin(y * 0.05) * 1.0}
              y2={y + len}
              stroke="#3c2612"
              strokeWidth={1.3}
              strokeDasharray="3, 9, 5, 7"
              opacity={0.5}
            />
          );
        }
      } else {
        const numVessels = 14;
        for (let i = 0; i < numVessels; i++) {
          const x = 20 + Math.random() * 260;
          const y = Math.random() * 200;
          const len = 20 + Math.random() * 25;
          vesselGrooves.push(
            <line
              key={`pore-groove-diff-${i}`}
              x1={x}
              y1={y}
              x2={x}
              y2={y + len}
              stroke="#4a311d"
              strokeWidth={0.8}
              strokeDasharray="1, 7"
              opacity={0.35}
            />
          );
        }
      }
    }

    // Conifer Resin Canals
    const coniferFeatures = [];
    if (species && isJehlicnaty && species.hasResinCanals) {
      const count = species.hasResinCanals === 'many' ? 12 : 5;
      for (let i = 0; i < count; i++) {
        const x = Math.random() * 260 + 20;
        const y = Math.random() * 180;
        coniferFeatures.push(
          <line
            key={`conifer-canal-${i}`}
            x1={x}
            y1={y}
            x2={x}
            y2={y + 35}
            stroke="#fff2dc"
            strokeWidth={1.0}
            strokeDasharray="9, 4"
            opacity={0.7}
          />
        );
      }
    }

    // Medullary Wood Rays as vertical spindles / lenticels on T-section
    const raySpindles = [];
    if (species) {
      const id = species.id;
      if (id === 'buk') {
        const count = 75;
        for (let i = 0; i < count; i++) {
          const x = 20 + Math.random() * 260;
          const y = Math.random() * 280;
          const h = 7 + Math.random() * 5;
          const w = 1.6;
          raySpindles.push(
            <path
              key={`beech-spindle-${i}`}
              d={`M ${x} ${y} Q ${x - w/2} ${y + h/2} ${x} ${y + h} Q ${x + w/2} ${y + h/2} ${x} ${y}`}
              fill="#8d3d24"
              opacity={0.65}
            />
          );
        }
      } else if (id === 'platan') {
        const count = 120;
        for (let i = 0; i < count; i++) {
          const x = 15 + Math.random() * 270;
          const y = Math.random() * 280;
          const h = 5 + Math.random() * 4;
          const w = 1.3;
          raySpindles.push(
            <path
              key={`platan-spindle-${i}`}
              d={`M ${x} ${y} Q ${x - w/2} ${y + h/2} ${x} ${y + h} Q ${x + w/2} ${y + h/2} ${x} ${y}`}
              fill="#ad6644"
              opacity={0.7}
            />
          );
        }
      } else if (id === 'dub') {
        const count = 12;
        for (let i = 0; i < count; i++) {
          const x = 30 + Math.random() * 240;
          const y = Math.random() * 150;
          const h = 50 + Math.random() * 75;
          const w = 1.4;
          raySpindles.push(
            <path
              key={`oak-giant-ray-${i}`}
              d={`M ${x} ${y} Q ${x - w/2} ${y + h/2} ${x} ${y + h} Q ${x + w/2} ${y + h/2} ${x} ${y}`}
              fill="#523925"
              opacity={0.38}
            />
          );
        }
      } else if (id === 'habr' || id === 'olse') {
        const count = 8;
        for (let i = 0; i < count; i++) {
          const x = 40 + Math.random() * 220;
          const y = Math.random() * 120;
          const h = 70 + Math.random() * 90;
          const w = 3.2;
          raySpindles.push(
            <path
              key={`aggregate-ray-${i}`}
              d={`M ${x} ${y} Q ${x - w/2} ${y + h/2} ${x} ${y + h} Q ${x + w/2} ${y + h/2} ${x} ${y}`}
              fill="#433125"
              opacity={0.25}
            />
          );
        }
      } else if (species.rayType === 'visible_all' || species.rayType === 'wide' || species.rayType === 'narrow') {
        const count = 28;
        for (let i = 0; i < count; i++) {
          const x = 20 + Math.random() * 260;
          const y = Math.random() * 280;
          const h = 4 + Math.random() * 3;
          const w = 0.8;
          raySpindles.push(
            <path
              key={`generic-spindle-${i}`}
              d={`M ${x} ${y} Q ${x - w/2} ${y + h/2} ${x} ${y + h} Q ${x + w/2} ${y + h/2} ${x} ${y}`}
              fill="#3a2717"
              opacity={0.38}
            />
          );
        }
      }
    }

    // Sapwood light edge contours representing log outline
    let sapOverlay = null;
    if (hasJadro && species) {
      sapOverlay = (
        <g>
          <path
            d="M 0 0 L 35 0 C 42 100 42 200 35 300 L 0 300 Z"
            fill={sapColor}
            opacity={0.9}
          />
          <path
            d="M 300 0 L 265 0 C 258 100 258 200 265 300 L 300 300 Z"
            fill={sapColor}
            opacity={0.9}
          />
        </g>
      );
    }

    return (
      <g>
        <rect width={300} height={300} fill={baseBg} />
        {flamesAndStripes}
        {vesselGrooves}
        {coniferFeatures}
        {raySpindles}
        {sapOverlay}
      </g>
    );
  };

  const renderActiveCut = () => {
    switch (cutType) {
      case 'P':
        return renderPriyrez();
      case 'R':
        return renderRadialrez();
      case 'T':
        return renderTangencialrez();
      default:
        return renderPriyrez();
    }
  };

  const titleOfCut = cutType === 'P' 
    ? 'Příčný (transverzální) řez' 
    : cutType === 'R' 
      ? 'Středový (radiální) řez' 
      : 'Tečný (tangenciální) řez';
  const shortcutOfCut = cutType;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImgIdx > 0) {
      setActiveImgIdx(activeImgIdx - 1);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImgIdx < images.length - 1) {
      setActiveImgIdx(activeImgIdx + 1);
    }
  };

  const toggleViewMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewMode(viewMode === 'micro' ? 'macro' : 'micro');
  };

  const getWslCodeFromImgUrl = (url: string): string => {
    const decoded = decodeURIComponent(url);
    const parts = decoded.split('/wood/');
    if (parts.length > 1) {
      return parts[1].split('/')[0].toUpperCase();
    }
    return '';
  };

  const badgeColor = cutType === 'P' ? 'bg-emerald-600' : cutType === 'R' ? 'bg-blue-600' : 'bg-amber-600';

  return (
    <div className="flex flex-col w-full space-y-2">
      {/* TABS SELECTOR ABOVE THE IMAGE */}
      {!simplified && (
        <div className="flex items-center justify-between bg-stone-100 p-1.5 rounded-lg border border-stone-200 shadow-3xs">
          <span className="text-[10px] font-extrabold font-mono text-stone-500 uppercase tracking-wider pl-1.5 flex items-center space-x-1.5">
            <span className={`w-2 h-2 rounded-full ${badgeColor}`} />
            <span>Řez {shortcutOfCut}:</span>
          </span>
          <div className="flex bg-stone-200/60 p-0.5 rounded-md border border-stone-250 text-[10px] font-mono font-bold text-stone-700 shadow-3xs">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setViewMode('macro'); }}
              className={`px-2.5 py-0.5 rounded cursor-pointer transition-all duration-150 ${
                viewMode === 'macro'
                  ? 'bg-amber-600 text-white font-black shadow-3xs'
                  : 'hover:bg-stone-300 text-stone-600'
              }`}
            >
              Makro 🪵
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setViewMode('micro'); }}
              className={`px-2.5 py-0.5 rounded cursor-pointer transition-all duration-150 ${
                viewMode === 'micro'
                  ? 'bg-blue-600 text-white font-black shadow-3xs'
                  : 'hover:bg-stone-300 text-stone-600'
              }`}
            >
              Detaily 🔬
            </button>
            {nahledImage && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setViewMode('botany'); }}
                className={`px-2.5 py-0.5 rounded cursor-pointer transition-all duration-150 ${
                  viewMode === 'botany'
                    ? 'bg-emerald-600 text-white font-black shadow-3xs'
                    : 'hover:bg-stone-300 text-stone-600'
                }`}
              >
                Botanika 🌿
              </button>
            )}
          </div>
        </div>
      )}

      <div className={`relative rounded-xl overflow-hidden border border-stone-250 shadow-sm bg-stone-100 group ${className}`}>
      {viewMode === 'macro' ? (
        // MACRO MODE (Genuine macroscopic wood board structure from LDF MENDELU ending in p_600.jpg, r_600.jpg, t_600.jpg)
        <div className="relative w-full h-full group">
          {mendelProxiedUrl ? (
            <img
              src={mendelProxiedUrl}
              alt={`Makro textura desky - ${species?.name}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.03]"
              onClick={() => setIsZoomed(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-50 border border-stone-150 p-6 text-center">
              <ImageIcon className="w-6 h-6 mb-2 text-stone-400" />
              <p className="text-[11px] font-bold text-stone-500">Makro textura desky není k dispozici</p>
            </div>
          )}

          {/* Quick Label for Macro Mode */}
          <div className="absolute bottom-2 left-2 flex items-center space-x-1 z-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
            <div className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[9px] font-mono text-stone-200 flex items-center space-x-1 z-10 shadow-3xs border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Makro z MENDELU 🪵</span>
            </div>
          </div>

          {/* Action Overlay */}
          <div className="absolute top-2 right-2 flex items-center space-x-1.5 z-10">
            {mendelProxiedUrl && (
              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className="p-1.5 rounded-md bg-black/60 hover:bg-black/85 backdrop-blur-xs text-white border border-white/10 cursor-pointer shadow-md transition-colors"
                title="Zvětšit"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : viewMode === 'botany' ? (
        // BOTANY MODE (Botanical preview of tree / foliage / bark from Wikipedia or Wood Database)
        <div className="relative w-full h-full group">
          {isLoadingWikiImage ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-50 border border-stone-150 p-6 text-center">
              <span className="w-5 h-5 rounded-full border-2 border-stone-200 border-t-amber-600 animate-spin mb-2" />
              <p className="text-[11px] font-bold text-stone-500 font-mono">Načítání botanického náhledu...</p>
            </div>
          ) : nahledImage ? (
            <img
              src={nahledImage}
              alt={`Náhled na strom - ${species?.name}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.03]"
              onClick={() => setIsZoomed(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-50 border border-stone-150 p-6 text-center">
              <ImageIcon className="w-6 h-6 mb-2 text-stone-400" />
              <p className="text-[11px] font-bold text-stone-500">Náhled není dostupný</p>
            </div>
          )}

          {/* Details Overlay and Quick Labels */}
          <div className="absolute bottom-2 left-2 flex items-center space-x-1 z-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
            <div className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[9px] font-mono text-stone-200 flex items-center space-x-1 z-10 shadow-3xs border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{wikiImage ? 'Botanický náhled z Wiki 🌿' : 'Botanický náhled z Wood DB 🌿'}</span>
            </div>
          </div>

          {/* Action Overlay */}
          <div className="absolute top-2 right-2 flex items-center space-x-1.5 z-10">
            {nahledImage && (
              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className="p-1.5 rounded-md bg-black/60 hover:bg-black/85 backdrop-blur-xs text-white border border-white/10 cursor-pointer shadow-md transition-colors"
                title="Zvětšit"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        // MICRO MODE (Microscopic view of cellular architecture and growth details)
        hasImages ? (
          <div className="relative w-full h-full group">
            <img
              src={images[activeImgIdx]}
              alt={`${titleOfCut} - ${species?.name}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.03]"
              onClick={() => setIsZoomed(true)}
            />

            {/* Carousel arrows */}
            {images.length > 1 && (
              <>
                {activeImgIdx > 0 && (
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all shadow-sm z-10 cursor-pointer"
                    title="Předchozí snímek"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                {activeImgIdx < images.length - 1 && (
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all shadow-sm z-10 cursor-pointer"
                    title="Další snímek"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </>
            )}

            {/* Carousel counter / details */}
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-mono text-stone-200 z-10 shadow-3xs group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
              Snímek {activeImgIdx + 1}/{images.length}
            </div>

            {/* Reference label */}
            <div className="absolute bottom-2 left-2 flex items-center space-x-1 z-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
              <div className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[9px] font-mono text-stone-200 flex items-center space-x-1 z-10 shadow-3xs border border-white/5">
                <span className={`w-1.5 h-1.5 rounded-full ${combinedImages[activeImgIdx]?.source === 'wood-database' ? 'bg-amber-400 animate-pulse' : 'bg-blue-400 animate-pulse'}`} />
                <span>{combinedImages[activeImgIdx]?.source === 'wood-database' ? 'Detail Wood DB 🔬' : 'Detail WSL 🔬'}</span>
              </div>
            </div>

            {/* Action Overlay */}
            <div className="absolute top-2 right-2 flex items-center space-x-1.5 z-10">
              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className="p-1.5 rounded-md bg-black/60 hover:bg-black/85 backdrop-blur-xs text-white border border-white/10 cursor-pointer shadow-md transition-colors"
                title="Zvětšit"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-stone-50 border border-stone-200 rounded-xl relative">
            <div className="my-auto text-center space-y-2 pt-4">
              {isLoadingDbImages ? (
                <div className="flex flex-col items-center justify-center space-y-2 py-4">
                  <span className="w-5 h-5 rounded-full border-2 border-stone-200 border-t-amber-600 animate-spin" />
                  <p className="text-[11px] font-bold text-stone-500 font-mono">
                    Snímky se stahují z Wood DB...
                  </p>
                  <p className="text-[9px] text-stone-400 max-w-[170px] mx-auto font-sans leading-tight">
                    Vyhledáváme a klasifikujeme řezy podle latinského názvu {getCleanLatinName(species?.latinName)}
                  </p>
                </div>
              ) : (
                <>
                  <div className="inline-flex p-2 bg-stone-100 rounded-full text-stone-400">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-semibold text-stone-600 leading-snug">
                    Vědecké detaily pro tento druh nejsou ve WSL dostupné
                  </p>
                  <div className="flex flex-col space-y-1 max-w-[180px] mx-auto pt-1 relative z-10">
                    <a
                      href={`https://insidewood.lib.ncsu.edu/search?scientificName=${encodeURIComponent(species?.latinName || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] bg-stone-100 hover:bg-stone-200 border border-stone-300/60 rounded px-1.5 py-0.5 font-bold font-mono text-stone-700 flex items-center justify-center space-x-1 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Hledat InsideWood</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <a
                      href={`https://www.wood-database.com/?s=${encodeURIComponent(getCleanLatinName(species?.latinName))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] bg-stone-100 hover:bg-stone-200 border border-stone-300/60 rounded px-1.5 py-0.5 font-bold font-mono text-stone-700 flex items-center justify-center space-x-1 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Hledat Wood Database</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      )}

      {/* Persistent Badge Label Overlay */}
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/45 backdrop-blur-xs text-[10px] font-mono font-medium text-white flex items-center space-x-1 z-10 shadow-3xs border border-white/5 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
        <span className={`w-4 h-4 rounded-full ${badgeColor} inline-flex items-center justify-center font-bold text-[9px]`}>
          {shortcutOfCut}
        </span>
        <span>{titleOfCut}</span>
      </div>

      {/* ZOOM LIGHTBOX MODAL */}
      {isZoomed && (
        <div className="fixed inset-0 z-100 flex flex-col justify-between bg-neutral-950/98 backdrop-blur-md p-4 sm:p-6" onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}>
          {/* Lightbox Header */}
          <div className="w-full max-w-5xl mx-auto flex items-center justify-between text-white pb-3 border-b border-stone-800" onClick={(e) => e.stopPropagation()}>
            <div>
              <h2 className="text-sm font-extrabold uppercase font-mono tracking-wider text-emerald-400 flex items-center space-x-2">
                <span className={`w-5 h-5 rounded-full ${badgeColor} inline-flex items-center justify-center font-black text-white text-[11px]`}>
                  {cutType}
                </span>
                <span>
                  {viewMode === 'macro' ? 'Makroskopická stavba dřeva' : viewMode === 'botany' ? 'Botanický náhled stromu' : titleOfCut}
                  {!simplified && species && ` • ${species.name}`}
                </span>
              </h2>
              {!simplified && species && (
                <p className="text-[11px] font-mono text-stone-400 italic mt-0.5">
                  {species.latinName} {species.author}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Center Image */}
          <div className="relative flex-1 max-w-5xl w-full mx-auto my-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {viewMode === 'macro' && mendelProxiedUrl ? (
              <img
                src={mendelProxiedUrl}
                alt={`Makro textura desky - ${species?.name} Zoomed`}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] max-w-full rounded-lg object-contain border border-stone-800 shadow-2xl"
              />
            ) : viewMode === 'botany' && nahledImage ? (
              <img
                src={nahledImage}
                alt={`Botanický náhled - ${species?.name} Zoomed`}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] max-w-full rounded-lg object-contain border border-stone-800 shadow-2xl"
              />
            ) : hasImages ? (
              <img
                src={images[activeImgIdx]}
                alt={`${titleOfCut} - ${species?.name} Zoomed`}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] max-w-full rounded-lg object-contain border border-stone-800 shadow-2xl"
              />
            ) : (
              <div className="text-stone-400 text-xs font-mono">Žádný reálný snímek není k dispozici k přiblížení</div>
            )}

            {/* Lightbox Carousel buttons (microscope images carousel) */}
            {viewMode === 'micro' && images.length > 1 && (
              <>
                {activeImgIdx > 0 && (
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center transition-all border border-stone-800 cursor-pointer shadow-xl"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
                {activeImgIdx < images.length - 1 && (
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center transition-all border border-stone-800 cursor-pointer shadow-xl"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Lightbox Footer */}
          <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between text-stone-400 text-xs pt-3 border-t border-stone-800 gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center space-x-1 bg-stone-900 p-2 px-3 rounded-lg border border-stone-800 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px]">
                {viewMode === 'macro' 
                  ? 'Zdroj: LDF MENDELU (Makroskopická stavba dřeva)'
                  : viewMode === 'botany'
                    ? wikiImage
                      ? 'Zdroj: Botanický portrét a habitus (Wikipedie)'
                      : 'Zdroj: Wood-Database.com (Botanický habitus)'
                    : combinedImages[activeImgIdx]?.source === 'wood-database'
                      ? `Zdroj: Wood-Database.com (Anatomické detaily) (${activeImgIdx + 1}/${images.length})`
                      : `Zdroj: WSL Wood Anatomy of Central European Species (${activeImgIdx + 1}/${images.length})`
                }
              </span>
            </div>
            
            <div className="flex space-x-2">
              {!simplified && (
                viewMode === 'micro' ? (
                  combinedImages[activeImgIdx]?.source === 'wood-database' ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://www.wood-database.com/?s=${encodeURIComponent(getCleanLatinName(species?.latinName))}`);
                      }}
                      className="bg-amber-700 hover:bg-amber-600 border border-amber-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all text-xs cursor-pointer"
                    >
                      <span>Otevřít Wood Database</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const wslCode = getWslCodeFromImgUrl(images[activeImgIdx]);
                        if (wslCode) {
                          window.open(`https://www.wsl.ch/land/products/dendro/species.php?code=${wslCode}`);
                        }
                      }}
                      className="bg-emerald-700 hover:bg-emerald-600 border border-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all text-xs cursor-pointer"
                    >
                      <span>Otevřít WSL databázi</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const mCode = species ? getMendelSpeciesCode(species.id) : '';
                      const dynamicUrl = mCode 
                        ? `https://stavbadreva.ldf.mendelu.cz/lexikon/makro/index.html?drevina=${mCode}`
                        : 'https://stavbadreva.ldf.mendelu.cz/';
                      window.open(dynamicUrl);
                    }}
                    className="bg-amber-700 hover:bg-amber-600 border border-amber-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all text-xs cursor-pointer"
                  >
                    <span>Otevřít Atlas MENDELU</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )
              )}
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="bg-stone-800 hover:bg-stone-700 font-bold px-4 py-1.5 rounded-lg transition-all text-xs cursor-pointer text-white"
              >
                Zavřít
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
};
