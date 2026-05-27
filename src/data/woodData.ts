import { TreeSpecies, KeyNode } from '../types';

export const ALL_SPECIES: TreeSpecies[] = [
  {
    id: 'jedle',
    name: 'Jedle bělokorá',
    latinName: 'Abies alba',
    author: 'Mill.',
    class: 'jehlicnate',
    porosity: 'none',
    hasHeartwood: false,
    hasResinCanals: false,
    rayType: 'invisible',
    weight: 'lehké (cca 450 kg/m³)',
    hardness: 'měkké',
    sapwoodColor: 'jednotně šedobílá až stříbřitě šedá',
    ringsDesc: 'velmi zřetelné, s ostrým přechodem od světlejšího jarního k tmavšímu letnímu dříví',
    pDesc: 'Struktura bez pryskyřičných kanálků, jarní dříví tvoří velkou část letokruhu, přechod středně ostrý.',
    rDesc: 'Dřeňové paprsky zcela nezřetelné, chybí vertikální pryskyřičné pruhy.',
    tDesc: 'Zcela chybí tmavé čárky pryskyřičných kanálků, dřeňové paprsky nelze vidět lupou.',
    specialFeatures: ['vůně neutrální (vůně po pryskyřici zcela chybí)', 'čerstvé dřevo má charakteristický mokrý šedý tón v centru (vyzrálé dřevo)']
  },
  {
    id: 'smrk',
    name: 'Smrk obecný',
    latinName: 'Picea abies',
    author: '(L.) Karst.',
    class: 'jehlicnate',
    porosity: 'none',
    hasHeartwood: false,
    hasResinCanals: 'few',
    rayType: 'invisible',
    weight: 'lehké (cca 470 kg/m³)',
    hardness: 'měkké',
    sapwoodColor: 'jednotně žlutobílá až lehce krémová',
    ringsDesc: 'velmi zřetelné, pozvolný přechod od jarního k letnímu dříví',
    pDesc: 'Pryskyřičné kanálky přítomny – drobné, málo zřetelné světlé tečky v letním dřevě.',
    rDesc: 'Pryskyřičné kanálky tvoří velmi jemné tmavší svislé čárky.',
    tDesc: 'Drobné svislé rýhy kanálků, dřeňové paprsky nezřetelné.',
    specialFeatures: ['jemná pryskyřičná vůně', 'dřevo mírně lesklé, hedvábné', 'kovový zvonivý tón při úderu (rezonanční dřevo)']
  },
  {
    id: 'tis',
    name: 'Tis červený',
    latinName: 'Taxus baccata',
    author: 'L.',
    class: 'jehlicnate',
    porosity: 'none',
    hasHeartwood: true,
    hasResinCanals: false,
    rayType: 'very_narrow',
    weight: 'těžké (cca 670-800 kg/m³)',
    hardness: 'středně tvrdé až tvrdé',
    sapwoodColor: 'úzká, nažloutlá až čistě bílá',
    heartwoodColor: 'oranžovohnědé až sytě červenohnědé, na vzduchu tmavne do fialova',
    ringsDesc: 'velmi úzké, často zvlněné a husté',
    pDesc: 'Extrémně husté a úzké letokruhy, pozvolný přechod jarní/letní, bez pryskyřičných kanálků.',
    rDesc: 'Zřetelný kontrast mezi úzkou bílou bělí a temně rudým jádrem, dřeňové paprsky velmi jemné.',
    tDesc: 'Často vysoce dekorativní textura se zvlněnými letokruhy a drobnými očky ("pepřový tis").',
    specialFeatures: ['vysoce jedovaté dřevo', 'extrémní pružnost a pevnost v tahu (tradiční luky)', 'trvanlivost trvající staletí']
  },
  {
    id: 'jalovec',
    name: 'Jalovec obecný',
    latinName: 'Juniperus communis',
    author: 'L.',
    class: 'jehlicnate',
    porosity: 'none',
    hasHeartwood: true,
    hasResinCanals: false,
    rayType: 'very_narrow',
    weight: 'lehké až středně těžké (cca 550 kg/m³)',
    hardness: 'měkké',
    sapwoodColor: 'úzká, nažloutlá až světle růžovobílá',
    heartwoodColor: 'sytě žlutohnědé až fialově hnědé',
    ringsDesc: 'velmi těsné, často zvlněné a asymetrické',
    pDesc: 'Často velmi zvlněné letokruhy, letní dříví nevýrazné, bez pryskyřičných kanálků.',
    rDesc: 'Zřetelná barevná hranice, dřeňové paprsky nezřetelné.',
    tDesc: 'Výrazný hedvábný lesk a pestré barevné tóny od fialové po zlatavou.',
    specialFeatures: ['silná a stabilní gáfrová/kořenitá vůně', 'vynikající odolnost vůči hnilobě', 'používá se na drobnou řezbářskou práci a dýmky']
  },
  {
    id: 'modrin',
    name: 'Modřín opadavý',
    latinName: 'Larix decidua',
    author: 'Mill.',
    class: 'jehlicnate',
    porosity: 'none',
    hasHeartwood: true,
    hasResinCanals: 'few',
    rayType: 'invisible',
    weight: 'středně těžké (cca 580 kg/m³)',
    hardness: 'středně tvrdé',
    sapwoodColor: 'velmi úzká, nažloutlá až světle hnědobílá',
    heartwoodColor: 'cihlově červené až tmavě červenohnědé, na vzduchu výrazně tmavne',
    ringsDesc: 'velmi zřetelné, s velmi ostrým přechodem a širokým, tmavým letním dřevem',
    pDesc: 'Velmi jasný kontrast v rámci letokruhu. Drobné pryskyřičné kanálky jako ojedinělé tečky.',
    rDesc: 'Světlé a tmavé pruhy tvoří výrazný pruhovaný vzor. Kanálky tvoří tmavší jemné rýhy.',
    tDesc: 'Výrazná fládrová struktura, kanálky viditelné jako tenké svislé tmavší nitky.',
    specialFeatures: ['vysoký podíl pryskyřice', 'vynikající trvanlivost ve vodě (tzv. "evropský teak")', 'kyselá pryskyřičná vůně']
  },
  {
    id: 'douglaska',
    name: 'Douglaska tisolistá',
    latinName: 'Pseudotsuga menziesii',
    author: '(Mirb.) Franco',
    class: 'jehlicnate',
    porosity: 'none',
    hasHeartwood: true,
    hasResinCanals: 'few',
    rayType: 'invisible',
    weight: 'lehké až středně těžké (cca 500-530 kg/m³)',
    hardness: 'měkké',
    sapwoodColor: 'středně široká, čistě bílá až světle růžovo-bílá',
    heartwoodColor: 'lososově růžové až sytě červenohnědé',
    ringsDesc: 'často velmi široké letokruhy, ostrý přechod jarní/letní dříví',
    pDesc: 'Rozsáhlá a zřetelná zóna tmavého letního dříví. Kanálky zřetelné jako drobné tečky.',
    rDesc: 'Pryskyřičné kanálky tvoří tmavší svislé pásky, široké barevné pruhování.',
    tDesc: 'Široký rustikální fládr se zřetelnými tmavými jarní/letní přechody.',
    specialFeatures: ['sladká pryskyřičná vůně (voní po lesním ovoci)', 'dřevo je lehoučké, ale konstrukčně pevné', 'původem ze Severní Ameriky']
  },
  {
    id: 'borovice_lesni',
    name: 'Borovice lesní',
    latinName: 'Pinus sylvestris',
    author: 'L.',
    class: 'jehlicnate',
    porosity: 'none',
    hasHeartwood: true,
    hasResinCanals: 'many',
    rayType: 'invisible',
    weight: 'lehké (cca 510 kg/m³)',
    hardness: 'měkké',
    sapwoodColor: 'velmi široká, nažloutlá bílá, čerstvá často zamodrává působením hub',
    heartwoodColor: 'červenorůžové až tmavě měděně hnědé',
    ringsDesc: 'velmi zřetelné, ostrý přechod jarní/letní dříví, letní dříví užší',
    pDesc: 'Pryskyřičné kanálky četné, viditelné pouhým okem jako světlé/tmavé tečky v letním dříví.',
    rDesc: 'Kanálky tvoří zřetelné svislé tmavé čárky. Velký podíl světlé nažloutlé běli.',
    tDesc: 'Zřetelný fládr s výraznými pryskyřičnými kanálky jako jemnými rýžkami.',
    specialFeatures: ['intenzivní pryskyřičná vůně', 'velmi časté "zamodrání" běli (charakteristický modrošedý tón)', 'snadno se opracovává, taje pod teplem (roní pryskyřici)']
  },
  {
    id: 'borovice_vejmutovka',
    name: 'Borovice vejmutovka',
    latinName: 'Pinus strobus',
    author: 'L.',
    class: 'jehlicnate',
    porosity: 'none',
    hasHeartwood: true,
    hasResinCanals: 'many',
    rayType: 'invisible',
    weight: 'velmi lehké (cca 400 kg/m³)',
    hardness: 'velmi měkké',
    sapwoodColor: 'široká, žlutobílá až krémová',
    heartwoodColor: 'světle hnědé až narůžovělé, málo kontrastní vůči běli',
    ringsDesc: 'zřetelné, pozvolný přechod jarní/letní dříví, letní dříví velmi nevýrazné',
    pDesc: 'Pryskyřičné kanálky četné a velké, tvoří výrazné velké svítivé skvrny (tečky).',
    rDesc: 'Kanálky tvoří velmi zřetelné dlouhé svislé rýhy na radíálu.',
    tDesc: 'Měkký nevýrazný fládr s viditelnými svislými čárkami pryskyřice.',
    specialFeatures: ['extrémně měkké, křehké dřevo (lze rýt nehtem)', 'používalo se na lodní stěžně', 'nasládlá vůně']
  },
  {
    id: 'dub',
    name: 'Dub letní / zimní',
    latinName: 'Quercus robur / petraea',
    author: 'L. / (Matusch.) Liebl.',
    class: 'listnate',
    porosity: 'kruhovite',
    hasHeartwood: true,
    rayType: 'wide',
    weight: 'těžké (cca 720-760 kg/m³)',
    hardness: 'tvrdé',
    sapwoodColor: 'ledově úzká, světle žlutá až světle hnědá',
    heartwoodColor: 'světle hnědé až sytě tmavohnědé (koňaková barva)',
    ringsDesc: 'velmi zřetelné, s jasnou kruhovou stavbou jarních velkých cév',
    pDesc: 'V jarním dřevě obrovské makropóry kolmo uspořádané. V letním dřevě mikropóry tvoří světlé radiální větvení. Paprsky tvoří široké svítivé linie.',
    rDesc: 'Dřeňové paprsky tvoří široká, lesklá, křivolaká a nepravidelná "zrcadla" (zrcátka).',
    tDesc: 'Dřeňové paprsky tvoří široké tmavohnědé svislé pásy (čárky) vysoké až několik centimetrů.',
    specialFeatures: ['typická trpká tříslovinová vůně (tanin)', 'extrémní trvanlivost pod vodou (černá dubová dřeva)', 'kyselá reakce při styku se železem (černá barva)']
  },
  {
    id: 'pajasan',
    name: 'Pajasan žláznatý',
    latinName: 'Ailanthus altissima',
    author: '(Mill.) Swingle',
    class: 'listnate',
    porosity: 'kruhovite',
    hasHeartwood: true,
    rayType: 'wide',
    weight: 'středně těžké (cca 630 kg/m³)',
    hardness: 'středně tvrdé až tvrdé',
    sapwoodColor: 'široká, jasně nažloutlá až krémově bílá',
    heartwoodColor: 'žlutošedé, žlutozelené až olivově hnědé',
    ringsDesc: 'zřetelné, kruhovitě uspořádané makropóry',
    pDesc: 'V letním dřevě světlé mikropóry tvoří tečky nebo krátké tangenciální vlnky (shluky cév).',
    rDesc: 'Dřeňové paprsky tvoří lesklá zřetelná zrcátka, dřevo je celkově vysoce lesklé.',
    tDesc: 'Rysy paprsků zřetelné, mírně nazelenalé tóny dodávají dřevu exotický vzhled.',
    specialFeatures: ['invazivní druh s charakteristickým zápachem listí, ale dekorativním dřevem', 'jádro má často zajímavý zeleno-šedý odstín']
  },
  {
    id: 'jilm',
    name: 'Jilm (vazy/hraby)',
    latinName: 'Ulmus',
    author: 'L.',
    class: 'listnate',
    porosity: 'kruhovite',
    hasHeartwood: true,
    rayType: 'narrow',
    weight: 'středně těžké (cca 650 kg/m³)',
    hardness: 'středně tvrdé až tvrdé',
    sapwoodColor: 'úzká, šedobílá až lehce hnědobílá',
    heartwoodColor: 'čokoládově hnědé až tmavě hnědo-červené',
    ringsDesc: 'velmi zřetelné, letokruhy zvlněné',
    pDesc: 'V letním dřevě tvoří mikropóry husté, zvlněné tangenciální proužky (vlnkování jako krajka).',
    rDesc: 'Dřeňové paprsky tvoří četná jemná tmavohnědá zrcátka na tmavém pozadí.',
    tDesc: 'Krásný divoký pruhovaně vlnitý fládr, paprsky málo znatelné.',
    specialFeatures: ['dřevo je houževnaté, těžko štípatelné', 'velmi pružné (historické nábojové sudy, kola vozu)']
  },
  {
    id: 'akat',
    name: 'Trnovník bílý (akát)',
    latinName: 'Robinia pseudoacacia',
    author: 'L.',
    class: 'listnate',
    porosity: 'kruhovite',
    hasHeartwood: true,
    rayType: 'narrow',
    weight: 'těžké (cca 750-800 kg/m³)',
    hardness: 'velmi tvrdé',
    sapwoodColor: 'extrémně úzká (často jen 2-3 letokruhy), žlutobílá',
    heartwoodColor: 'zelenavě žlutohnědé až olivově zlaté, na slunci tmavne do hněda',
    ringsDesc: 'zřetelné, makropóry jarního dříví jsou zcela ucpány tylem (thylami)',
    pDesc: 'Makropóry jarního dřeva vypadají jako žlutavé ucpávky (klubíčka tyl). Dřevo velmi husté.',
    rDesc: 'Dřeňové paprsky tvoří malá, velmi lesklá jasná zrcátka, dřevo má skleněný lesk.',
    tDesc: 'Výrazný hedvábný odlesk, jasná stavba cév.',
    specialFeatures: ['pod UV světlem fluorescentní (září zelenavě)', 'chemicky nejodolnější česká dřevina', 'naprosto netlející na suchu i ve vodě']
  },
  {
    id: 'morusovnik',
    name: 'Morusovník (moruše)',
    latinName: 'Morus',
    author: 'L.',
    class: 'listnate',
    porosity: 'kruhovite',
    hasHeartwood: true,
    rayType: 'narrow',
    weight: 'těžké (cca 700 kg/m³)',
    hardness: 'tvrdé',
    sapwoodColor: 'úzká, jasně nažloutlá',
    heartwoodColor: 'sytě zlatohnědé až tmavohnědé se safírovým odleskem',
    ringsDesc: 'zřetelné, podobné akátu',
    pDesc: 'V letním dříví světlé mikropóry tvoří klubíčkovité shluky (tečky). Jarní cévy částečně s tyly.',
    rDesc: 'Dřeňové paprsky tvoří zřetelná lesklá zrcátka, barva sytě teplá hnědá.',
    tDesc: 'Výrazné zbarvení, fládr hustý a hladký.',
    specialFeatures: ['velmi vzácné dřevo u nás', 'vynikající na výrobu sudů pro zrání destilátů (barví nápoj do žluta)']
  },
  {
    id: 'jasan',
    name: 'Jasan ztepilý',
    latinName: 'Fraxinus excelsior',
    author: 'L.',
    class: 'listnate',
    porosity: 'kruhovite',
    hasHeartwood: true, // v key klasifikován "s jádrem a bělí (s pozvolným přechodem)"
    rayType: 'narrow',
    weight: 'středně těžké až těžké (cca 680-720 kg/m³)',
    hardness: 'tvrdé',
    sapwoodColor: 'velmi široká, smetanově nažloutlá, narůžovělá až nahnědlá',
    heartwoodColor: 'světle hnědé (u starých jasanů tmavé olivové nepravé jádro)',
    ringsDesc: 'velmi zřetelné, široké, přechod jarní/letní dříví je středně ostrý',
    pDesc: 'Jarní makropóry obrovské, dobře viditelné jako otevřené dírky. V letním dříví mikropóry nezřetelné.',
    rDesc: 'Dřeňové paprsky tvoří drobná, málo zřetelná matná zrcátka.',
    tDesc: 'Nádherný široký, jasný, grafický fládr. Cévy tvoří zřetelné otevřené rýhy v jarním dřevě.',
    specialFeatures: ['extrémní pružnost a rázová houževnatost (sportovní nářadí: hokejky, saně, tělocvičné nářadí)', 'nepravé olivové jádro se cení v nábytkářství']
  },
  {
    id: 'kastanovnik',
    name: 'Kaštanovník jedlý',
    latinName: 'Castanea sativa',
    author: 'Mill.',
    class: 'listnate',
    porosity: 'kruhovite',
    hasHeartwood: true,
    rayType: 'very_narrow',
    weight: 'středně těžké (cca 580 kg/m³)',
    hardness: 'středně tvrdé',
    sapwoodColor: 'velmi úzká, špinavě nažloutlá až krémová',
    heartwoodColor: 'světle hnědé až sytě tmavohnědé, vzhledem velmi podobné dubu',
    ringsDesc: 'zřetelné, kruhovité, často s úzkými letokruhy',
    pDesc: 'V letním dříví cévy tvoří světlé radiální páskování – žíhání (žíhaný vzor). Na rozdíl od dubu zcela chybí široké paprsky.',
    rDesc: 'Zrcátka paprsků jsou téměř neviditelná (rozlišovací znak od dubu!).',
    tDesc: 'Podobný fládr jako dub, ale bez svislých tmavých pásků paprsků.',
    specialFeatures: ['vůně mírně kyselá', 'často se zaměňuje s dubem, ale chybí mu zřetelná zrcadla a je lehčí']
  },
  {
    id: 'oresak',
    name: 'Ořešák královský (vlašský)',
    latinName: 'Juglans regia',
    author: 'L.',
    class: 'listnate',
    porosity: 'polokruhovite',
    hasHeartwood: true,
    rayType: 'narrow',
    weight: 'středně těžké (cca 640 kg/m³)',
    hardness: 'středně tvrdé',
    sapwoodColor: 'šedobílá až popelavě šedá, široká',
    heartwoodColor: 'šedohnědé až šedočerné, s tmavými pruhy a mramorovanými zónami',
    ringsDesc: 'středně zřetelné, přechod pozvolný',
    pDesc: 'Makropóry rozptýlené v celém letokruhu, průměr se plynule zmenšuje. Dřevo zónované.',
    rDesc: 'Dřeňové paprsky tvoří drobná matná zrcátka. Dřevo je podélně výrazně pruhované.',
    tDesc: 'Krásná mramorová, tmavě zbarvená kresba s hlubokými rýhami cév.',
    specialFeatures: ['nejluxusnější české řezbářské a pažbové dřevo (pažby loveckých zbraní)', 'specifická vůně po ořechách']
  },
  {
    id: 'tresen',
    name: 'Třešeň ptačí',
    latinName: 'Cerasus avium',
    author: '(L.) Moench',
    class: 'listnate',
    porosity: 'polokruhovite',
    hasHeartwood: true,
    rayType: 'narrow',
    weight: 'středně těžké (cca 600 kg/m³)',
    hardness: 'středně tvrdé',
    sapwoodColor: 'úzká, nažloutlá až jemně narůžovělá',
    heartwoodColor: 'žlutohnědé až teplé červenohnědé s jemným nazelenalým nádechem',
    ringsDesc: 'zřetelné, s jasnou jarní vrstvou drobných mikro/makropórů',
    pDesc: 'Zřetelná světlá vrstva jarního dřeva s větším zastoupením jarních mikropórů.',
    rDesc: 'Dřeňové paprsky tvoří úzká, lesklá, sytě zlatavá až červenavá zrcátka.',
    tDesc: 'Jemný dekorativní fládr se zlatavým a nazelenalým pruhováním.',
    specialFeatures: ['velmi ceněné dřevo v intarzii a nábytkářství stylu biedermeier', 'krásně teplý tón při nalakování']
  },
  {
    id: 'svestka',
    name: 'Švestka domácí',
    latinName: 'Prunus domestica',
    author: 'L.',
    class: 'listnate',
    porosity: 'polokruhovite',
    hasHeartwood: true,
    rayType: 'narrow',
    weight: 'těžké (cca 750-790 kg/m³)',
    hardness: 'tvrdé',
    sapwoodColor: 'velmi úzká, světle nažloutlá až narůžovělá',
    heartwoodColor: 'intenzivně červenohnědé, purpurové až fialové s tmavými čarami',
    ringsDesc: 'zřetelné, letokruhy zvlněné a těsné',
    pDesc: 'Husté dřevo, světlejší jarní zóna cév, letokruhy úzké a zvlněné.',
    rDesc: 'Dřeňové paprsky tvoří zřetelná do fialova zbarvená malá zrcátka (velmi dekorativní).',
    tDesc: 'Divoká, plamenná, fialovo-červená kresba s jemnými rýžkami.',
    specialFeatures: ['nejtvrdší ovocné dřevo u nás', 'velmi náchylné k praskání při sušení', 'oblíbené u uměleckých soustružníků']
  },
  {
    id: 'platan',
    name: 'Platan',
    latinName: 'Platanus',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: true,
    rayType: 'visible_all',
    weight: 'středně těžké (cca 620 kg/m³)',
    hardness: 'středně tvrdé',
    sapwoodColor: 'široká, narůžovělá až smetanová',
    heartwoodColor: 'světle červenohnědé až hnědé, pozvolný přechod do běli',
    ringsDesc: 'zřetelné letokruhy díky tmavší letní zóně',
    pDesc: 'Dřeňové paprsky tvoří velmi husté, široké světlé paprsky kolmé k letokruhům.',
    rDesc: 'Dřeňové paprsky tvoří velmi četná, hustá, velká a nápadně lesklá zrcadla (tzv. perleťové dřevo).',
    tDesc: 'Paprsky tvoří husté, tmavé, svislé čárky vysoké cca 1 mm, tvořící síťovanou kresbu.',
    specialFeatures: ['unikátní zrcadlová textura na radiálu', 'velmi ceněné pro intarzie a luxusní kazety']
  },
  {
    id: 'buk',
    name: 'Buk lesní',
    latinName: 'Fagus sylvatica',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: false, // dřevo bělové
    rayType: 'visible_all',
    weight: 'středně těžké až těžké (0.72 g/cm³ / cca 720 kg/m³)',
    hardness: 'středně tvrdé až tvrdé',
    sapwoodColor: 'celkově pleťově růžové až světle červenohnědé (po paření červené)',
    ringsDesc: 'zřetelné letokruhy, letní dřevo tvoří jasný tmavší proužek na hranici letokruhu',
    pDesc: 'Dřeňové paprsky široké, viditelné na příčném řezu jako světlé linky kolmé k letokruhům. Časté tmavé nepravé jádro v centru u starých stromů.',
    rDesc: 'Paprsky tvoří četná sytě červenohnědá lesklá zrcátka o výšce až 3 mm.',
    tDesc: 'Dřeňové paprsky tvoří husté, tmavé svislé čárky (vřetena) vysoké 1 až 5 mm.',
    specialFeatures: ['nejpoužívanější průmyslové listnaté dřevo u nás (ohnutý nábytek Tonet, hračky, parkety)', 'pařením získává sytě růžovou barvu']
  },
  {
    id: 'habr',
    name: 'Habr obecný',
    latinName: 'Carpinus betulus',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: false,
    rayType: 'visible_all',
    weight: 'těžké (cca 800 kg/m³)',
    hardness: 'tvrdé',
    sapwoodColor: 'jednotně šedobílá až špinavě žlutobílá',
    ringsDesc: 'málo zřetelné, ale velmi zvlněné (zvlněná hranice rings u kmene)',
    pDesc: 'Příčný řez ukazuje zvlněné letokruhy a nepravé sdružené (falešné) dřeňové paprsky.',
    rDesc: 'Paprsky tvoří nevýrazná, matná, křivolaká zrcadla. Dřevo je matné.',
    tDesc: 'Sdružené paprsky tvoří svislé šedavé pásy široké až několik mm a vysoké až 5 cm.',
    specialFeatures: ['mimořádně tvrdé a houževnaté dřevo ("železné dřevo")', 'používalo se na hoblíky, řeznické špalky, paličky, klíny', 'kmen má typickou svalovitost (není dokonale kulatý)']
  },
  {
    id: 'olse',
    name: 'Olše lepkavá',
    latinName: 'Alnus glutinosa',
    author: '(L.) Gaertn.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: false,
    rayType: 'visible_all',
    weight: 'lehké (cca 490 kg/m³)',
    hardness: 'měkké',
    sapwoodColor: 'čerstvě skácené sytě oranžovo-žluté, sušením bledne do světle růžovo-hnědé',
    ringsDesc: 'téměř nezřetelné, rozplývavé',
    pDesc: 'Struktura bez zřetelných letokruhů. Možnost nalézt dřeňové skvrny. Paprsky sdružené.',
    rDesc: 'Paprsky tvoří nevýrazná matná zrcátka, dřevo je barevně velmi homogenní.',
    tDesc: 'Sdružené paprsky tvoří svislé dlouhé pásy (až několik cm) tmavší barvy.',
    specialFeatures: ['vynikající trvanlivost pod vodou (Benátky stojí na olšových kůlech)', 'velmi snadno se opracovává (modelářství, řezbářství)', 'po narušení kůry dřevo "krvácí" do oranžova']
  },
  {
    id: 'javor',
    name: 'Javor klen / mleč',
    latinName: 'Acer pseudoplatanus / platanoides',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: false,
    rayType: 'radial_only',
    weight: 'středně těžké (cca 630-660 kg/m³)',
    hardness: 'středně tvrdé až tvrdé',
    sapwoodColor: 'krásně smetanově bílá až slonovinová',
    ringsDesc: 'zřetelné, oddělené úzkou tmavší linkou letního dříví',
    pDesc: 'Hladká, velmi čistá struktura bez barevného jádra. Letokruhy zřetelné.',
    rDesc: 'Dřeňové paprsky tvoří drobnější, hedvábně lesklá zrcátka. Častá svalovitost (vlnitost) a očka.',
    tDesc: 'Zcela jednolité bílé dřevo s jemným saténovým leskem.',
    specialFeatures: ['světlejší české dřevo s hedvábným leskem', 'vyhledávané na hudební nástroje (housle - javorová záda s vlnou)', 'očkový javor je vysoce ceněný']
  },
  {
    id: 'babyka',
    name: 'Babyka obecná (javor babyka)',
    latinName: 'Acer campestre',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: false,
    rayType: 'radial_only',
    weight: 'těžké (cca 720 kg/m³)',
    hardness: 'tvrdé',
    sapwoodColor: 'světle hnědá s narůžovělým až načervenalým nádechem',
    ringsDesc: 'méně zřetelné než u klenu',
    pDesc: 'Struktura homogenní, načervenalá, bez rozlišeného jádra. Letokruhy jemné.',
    rDesc: 'Dřeňové paprsky tvoří jemná, drobná zrcátka, dřevo je méně lesklé.',
    tDesc: 'Dřevo matné, jemnější kresba než javor klen.',
    specialFeatures: ['nejhustší a nejtvrdší z našich javorů', 'tradičně se používalo na kolářské osy a ozubení mlýnských kol']
  },
  {
    id: 'briza',
    name: 'Bříza bělokorá',
    latinName: 'Betula pendula',
    author: 'Roth',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: false,
    rayType: 'radial_only',
    weight: 'středně těžké (cca 650 kg/m³)',
    hardness: 'středně tvrdé',
    sapwoodColor: 'žlutobílá až šedobílá, občas s lehkým narůžovělým tónem',
    ringsDesc: 'méně zřetelné, nevýrazný přechod jarní/letní',
    pDesc: 'Cévy na příčném řezu tvoří světlé body (vypadají jako jemný moučný bílý prach). Časté hnědé dřeňové skvrny.',
    rDesc: 'Dřeňové paprsky tvoří drobná, dosti zřetelná zrcátka. Hnědé dřeňové skvrny jako svislé proužky.',
    tDesc: 'Matný, klidný a nevýrazný fládr.',
    specialFeatures: ['obsahuje hořlavé silice (březová kůra hoří i mokrá)', 'vynikající na překližky, v nábytkářství se snadno moří']
  },
  {
    id: 'lipa',
    name: 'Lípa srdčitá / velkolistá',
    latinName: 'Tilia cordata / platyphyllos',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: false,
    rayType: 'radial_only',
    weight: 'lehké (cca 490-530 kg/m³)',
    hardness: 'měkké',
    sapwoodColor: 'bělavá, nažloutlá, časem tmavne do šeda',
    ringsDesc: 'letokruhy málo zřetelné',
    pDesc: 'Velmi homogenní, jemná struktura bez pórů a širokých paprsků. Vlhkem šedne nebo zelená.',
    rDesc: 'Dřeňové paprsky tvoří méně zřetelná vyšší drobná zrcátka.',
    tDesc: 'Jednolitá, sametová textura bez zřetelné kresby.',
    specialFeatures: ['vůně charakteristicky kyselá u čerstvého dřeva', 'naprosto nejlepší české řezbářské dřevo (snadno se řeže všemi směry)', 'použita na oltář Mistra Pavla v Levoči']
  },
  {
    id: 'osika',
    name: 'Osika obecná',
    latinName: 'Populus tremula',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: false,
    rayType: 'invisible',
    weight: 'velmi lehké (cca 440 kg/m³)',
    hardness: 'velmi měkké',
    sapwoodColor: 'špinavě bílá až žlutobílá',
    ringsDesc: 'téměř nezřetelné, splývavé',
    pDesc: 'Struktura extrémně jemná, letokruhy nezřetelné, dosti časté hnědé dřeňové skvrny.',
    rDesc: 'Zrcátky zcela chybí. Hnědé dřeňové skvrny jako tenké proužky.',
    tDesc: 'Jednolitá šedo-bílá matná struktura.',
    specialFeatures: ['dřevo má velmi nízkou tepelnou vodivost (ideální na lavice do sauny - nepálí)', 'používá se na výrobu sirek (neprodukuje černý kouř)']
  },
  {
    id: 'hrusen',
    name: 'Hrušeň obecná',
    latinName: 'Pyrus communis',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: false, // někdy tvoří nepravé jádro
    rayType: 'invisible',
    weight: 'středně těžké až těžké (cca 700-740 kg/m³)',
    hardness: 'tvrdé',
    sapwoodColor: 'narůžovělá až jemně červenohnědá, na vzduchu výrazně tmavne',
    ringsDesc: 'velmi nevýrazné letokruhy',
    pDesc: 'Dřevo je mimořádně husté a homogenní. Žádné póry ani paprsky nejsou viditelné podél letokruhů.',
    rDesc: 'Dřeňové paprsky tvoří velmi jemná, téměř neznatelná matná zrcátka. Dřevo má sametový mat.',
    tDesc: 'Velmi elegantní klidná kresba s jemným načervenalým tónem.',
    specialFeatures: ['po napaření a obarvení načerno dokonale imituje ebenové dřevo ("ebonizovaná hrušeň")', 'používá se na dřevěné formy pro tisk, pravítka a hudební nástroje']
  },
  {
    id: 'jirovec',
    name: 'Jírovec maďal (koňský kaštan)',
    latinName: 'Aesculus hippocastanum',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: false,
    rayType: 'invisible',
    weight: 'lehké (cca 510 kg/m³)',
    hardness: 'měkké',
    sapwoodColor: 'čistě bělavé, nažloutlé, časem tmavne do šeda',
    ringsDesc: 'letokruhy málo zřetelné',
    pDesc: 'Homogenní nevýrazná struktura, bez barevného jádra, letokruhy splývají.',
    rDesc: 'Dřeňové paprsky zcela nezřetelné, ale dřevo je celkově výrazně lesklé.',
    tDesc: 'Lesklý, klidný a jednotný povrch.',
    specialFeatures: ['křehké, málo trvanlivé dřevo', 'používá se v řezbářství na drobnou hračkářskou integraci a dárkové krabičky']
  },
  {
    id: 'vrba',
    name: 'Vrba',
    latinName: 'Salix',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: true,
    rayType: 'invisible',
    weight: 'lehké (cca 450 kg/m³)',
    hardness: 'měkké',
    sapwoodColor: 'široká nažloutlá až nahnědlá',
    heartwoodColor: 'světle žlutočervené až žlutohnědé, špatně kontrastní vůči běli',
    ringsDesc: 'široké, ale velmi nevýrazné letokruhy',
    pDesc: 'Jemná struktura. Cévy tvoří mikroskopické trhlinky na čele vzorku.',
    rDesc: 'Paprsky neznatelné. Cévy tvoří drobné svislé trhlinky na radiálu.',
    tDesc: 'Dřevo má plstnatý povrch (obtížně se hladce brousí), velmi matné.',
    specialFeatures: ['velmi houževnaté vůči nárazu, neštípe se (tradičně na koryta, dlabané necky, rukojeti)', 'extrémně lehoučké']
  },
  {
    id: 'topol',
    name: 'Topol (černý / osika / bílý)',
    latinName: 'Populus',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: true,
    rayType: 'invisible',
    weight: 'velmi lehké (cca 400-450 kg/m³)',
    hardness: 'velmi měkké',
    sapwoodColor: 'světle žlutá až krémová',
    heartwoodColor: 'žlutohnědé s výrazným nádechem do zelena či červena, často tmavě žíhané',
    ringsDesc: 'široké, méně zřetelné',
    pDesc: 'Cévy tvoří drobné svislé rýhy na příčném řezu. Časté dřeňové skvrny.',
    rDesc: 'Dřevo je plstnaté, s hnědými skvrnami jako tenkými svislými čarami.',
    tDesc: 'Plstnatý hrubší povrch, vlnitá šedozelená kresba.',
    specialFeatures: ['rychle rostoucí dřevina, papírenský průmysl', 'vůně je mírně nahořklá']
  },
  {
    id: 'jerab',
    name: 'Jeřáb',
    latinName: 'Sorbus',
    author: 'L.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: true,
    rayType: 'invisible',
    weight: 'středně těžké až těžké (cca 700 kg/m³)',
    hardness: 'středně tvrdé až tvrdé',
    sapwoodColor: 'široká, narůžovělá až masově červená',
    heartwoodColor: 'světle hnědé až tmavohnědé',
    ringsDesc: 'poměrně zřetelné se zřetelnou zónou jarního a letního dříví',
    pDesc: 'Letokruhy zřetelné, hojné dřeňové skvrny, rozptýlené jemné mikropóry.',
    rDesc: 'Dřeňové paprsky tvoří drobná tmavě hnědá lesklá zrcátka.',
    tDesc: 'Celkově tmavší, narůžovělá klidná textura.',
    specialFeatures: ['dřevo je konstrukčně velmi stabilní, houževnaté a těžko se opotřebovává', 'používalo se na hřídele, ozuby a tkalcovské stavy']
  },
  {
    id: 'jablon',
    name: 'Jabloň lesní',
    latinName: 'Malus sylvestris',
    author: 'Mill.',
    class: 'listnate',
    porosity: 'roztrousene',
    hasHeartwood: true,
    rayType: 'invisible',
    weight: 'středně těžké až těžké (cca 730 kg/m³)',
    hardness: 'středně tvrdé až tvrdé',
    sapwoodColor: 'úzká, narůžovělá',
    heartwoodColor: 'červenohnědé až sytě hnědé se zlatým leskem',
    ringsDesc: 'středně zřetelné, s tmavší vrstvou letního dříví na obvodu',
    pDesc: 'Husté stejnorodé dřevo, zřetelný barevný kontrast běli a jádra.',
    rDesc: 'Cévy tvoří velmi jemné rýžky. Paprsky tvoří neostrá zrcátka.',
    tDesc: 'Dřevo matné, syté barvy, kresba jemně ohraničená letokruhy.',
    specialFeatures: ['jádrové dřevo mívá nádherné žíhané odstíny', 'vyhledávané pro luxusní drobný nábytek a dárky']
  }
];

export const KEY_NODES: KeyNode[] = [
  {
    id: 'start',
    title: 'Neznámý vzorek dřeva',
    subtitle: 'Porovnejte vzorek dřeva s popisem a zvolte základní skupinu:',
    description: 'Nejprve určíme, zda se jedná o dřevo jehličnatých nebo listnatých stromů na základě přítomnosti cév (pórů) a uspořádání dřeňových paprsků.',
    cutImage: 'PRT',
    choices: [
      {
        id: 'start_jehlicnate',
        text: 'Nezřetelné cévy, dřeňové paprsky nezřetelné, zřetelná hranice letokruhů. Pryskyřičné kanálky mohou a nemusí být přítomny.',
        targetNodeId: 'jehlicnate',
        cutHint: 'P',
        details: 'Dřevo jehličnatých dřevin'
      },
      {
        id: 'start_listnate',
        text: 'Zřetelné nebo nezřetelné cévy rozlišené na póry (makropóry či mikropóry). Dřeňové paprsky mohou být zřetelné i nezřetelné.',
        targetNodeId: 'listnate',
        cutHint: 'P',
        details: 'Dřevo listnatých dřevin'
      }
    ]
  },
  {
    id: 'jehlicnate',
    title: 'Dřevo jehličnatých dřevin',
    subtitle: 'Zkoumáme přítomnost barevného jádra (jádrového dřeva):',
    description: 'Podívejte se na příčný řez (P). Rozlišuje se barevný střed (jádro) od světlejšího okraje (běl)?',
    cutImage: 'P',
    choices: [
      {
        id: 'jehlic_bez_jadra',
        text: 'Dřevo nemá vylišenou zónu jádra a běli (je jednotně zbarvené).',
        targetNodeId: 'jehlicnate_bez_jadra',
        cutHint: 'P',
        details: 'Přejít na tabulku 3'
      },
      {
        id: 'jehlic_s_jadrem',
        text: 'Dřevo má vylišenou zónu jádra a běli (kontrastní barva středu).',
        targetNodeId: 'jehlicnate_s_jadrem',
        cutHint: 'P',
        details: 'Přejít na tabulku 4'
      }
    ]
  },
  {
    id: 'jehlicnate_bez_jadra',
    title: 'Jehličnaté dřeviny bez vylišeného jádra a běli',
    subtitle: 'Zkoumáme přítomnost pryskyřičných kanálků:',
    description: 'Pevné nebo měkké dřeviny s jednotnou světlou barvou. Zvolte popis odpovídající vašemu vzorku:',
    cutImage: 'P',
    choices: [
      {
        id: 'jehlic_bez_jad_jedle',
        text: 'Dřevo šedobílé až hnědošedé. Středně ostrý přechod jarní/letní. Bez pryskyřičných kanálků. Bez pryskyřičné vůně.',
        targetNodeId: 'SPECIES_jedle',
        cutHint: 'P',
        details: 'Jedle bělokorá – Abies alba'
      },
      {
        id: 'jehlic_bez_jad_smrk',
        text: 'Dřevo žlutobílé nebo světle žlutohnědé. Pozvolný přechod jarní/letní. Drobné, málo zřetelné pryskyřičné kanálky přítomny.',
        targetNodeId: 'SPECIES_smrk',
        cutHint: 'P',
        details: 'Smrk obecný – Picea abies'
      }
    ]
  },
  {
    id: 'jehlicnate_s_jadrem',
    title: 'Jehličnaté dřeviny s vylišeným jádrem a bělí',
    subtitle: 'Zkoumáme množství a zřetelnost pryskyřičných kanálků:',
    description: 'Sledujeme příčný (P) i podélné (R, T) řezy dřeva a hledáme pryskyřičné kanálky jako drobné tečky nebo podélné pásky.',
    cutImage: 'PRT',
    choices: [
      {
        id: 'jehlic_s_jad_bez_kanalku',
        text: 'Dřevo zcela bez pryskyřičných kanálků.',
        targetNodeId: 'jehlicnate_s_jadrem_bez_kanalku',
        cutHint: 'P',
        details: 'Přejít na tabulku 5'
      },
      {
        id: 'jehlic_s_jad_malo_kanalku',
        text: 'Dřevo s méně četnými, převážně nezřetelnými pryskyřičnými kanály.',
        targetNodeId: 'jehlicnate_s_jadrem_malo_kanalku',
        cutHint: 'P',
        details: 'Přejít na tabulku 6'
      },
      {
        id: 'jehlic_s_jad_hodne_kanalku',
        text: 'Dřevo s početnými, zřetelnými pryskyřičnými kanály.',
        targetNodeId: 'jehlicnate_s_jadrem_hodne_kanalku',
        cutHint: 'PRT',
        details: 'Přejít na tabulku 7'
      }
    ]
  },
  {
    id: 'jehlicnate_s_jadrem_bez_kanalku',
    title: 'Jehličnaté s jádrem bez pryskyřičných kanálků',
    subtitle: 'Porovnejte hmotnost, letokruhy a vůni vzorku:',
    cutImage: 'P',
    choices: [
      {
        id: 'tis_choice',
        text: 'Běl úzká nažloutlá; jádro žlutohnědé až červenohnědé. Úzké letokruhy; pozvolný přechod jarní/letní. Dřevo těžší, tvrdší, bez zápachu.',
        targetNodeId: 'SPECIES_tis',
        cutHint: 'P',
        details: 'Tis červený – Taxus baccata'
      },
      {
        id: 'jalovec_choice',
        text: 'Běl úzká nažloutlá; jádro žlutohnědé až fialověhnědé. Často zvlněné letokruhy; pozvolný přechod. Dřevo lehké, měkké, silně aromatické (kořenité).',
        targetNodeId: 'SPECIES_jalovec',
        cutHint: 'P',
        details: 'Jalovec obecný – Juniperus communis'
      }
    ]
  },
  {
    id: 'jehlicnate_s_jadrem_malo_kanalku',
    title: 'Jehličnaté s jádrem s málo pryskyřičnými kanálky',
    subtitle: 'Zkoumáme přechod jarní/letní a šířku letokruhů:',
    cutImage: 'PRT',
    choices: [
      {
        id: 'modrin_choice',
        text: 'Běl úzká nažloutlá; jádro červenohnědé až fialovočervené. Ostrý přechod jarní/letní, výrazně tmavé široké letní dříví. Kanálky tvoří tmavší jemné svislé rýžky.',
        targetNodeId: 'SPECIES_modrin',
        cutHint: 'PRT',
        details: 'Modřín opadavý – Larix decidua'
      },
      {
        id: 'douglaska_choice',
        text: 'Běl široká růžovobílá; jádro červenorůžové až oranžovo-červené. Často široké letokruhy, ostrý přechod. Dřevo lehké, nadýchané, s ovocnou vůní.',
        targetNodeId: 'SPECIES_douglaska',
        cutHint: 'PRT',
        details: 'Douglaska tisolistá – Pseudotsuga menziesii'
      }
    ]
  },
  {
    id: 'jehlicnate_s_jadrem_hodne_kanalku',
    title: 'Jehličnaté s jádrem s četnými pryskyřičnými kanálky',
    subtitle: 'Hodnotíme šířku a vzhled sapwoodu (běli) a přechody:',
    cutImage: 'PRT',
    choices: [
      {
        id: 'borovice_lesni_choice',
        text: 'Běl široká nažloutlá (často zamodralá); jádro zpočátku světlehnědé, později červenohnědé. Ostrý přechod jarní/letní. Výrazná borová vůně.',
        targetNodeId: 'SPECIES_borovice_lesni',
        cutHint: 'PRT',
        details: 'Borovice lesní – Pinus sylvestris'
      },
      {
        id: 'borovice_vejmutovka_choice',
        text: 'Běl široká žlutobílá; jádro velmi světlé, nevýrazné žlutavé. Pozvolný přechod jarní/letní dříví, letní dříví nevýrazné. Pryskyřičné kanály tvoří četné velké skvrny.',
        targetNodeId: 'SPECIES_borovice_vejmutovka',
        cutHint: 'PRT',
        details: 'Borovice vejmutovka – Pinus strobus'
      }
    ]
  },
  {
    id: 'listnate',
    title: 'Dřevo listnatých dřevin',
    subtitle: 'Zkoumáme strukturu rozmístění pórů (cév) na příčném řezu (P):',
    description: 'Použijte lupu a podívejte se na příčný řez (P). Jak jsou uspořádány nejširší jarní cévy (makropóry)?',
    cutImage: 'P',
    choices: [
      {
        id: 'listnate_kruh_choice',
        text: 'Celé letokruhy obsahují v jarním dřevě zřetelnou, souvislou řadu širokých makropórů (kruhovitá stavba).',
        targetNodeId: 'listnate_kruhovite',
        cutHint: 'P',
        details: 'Přejít na tabulku 9 (Kruhovitě pórovité)'
      },
      {
        id: 'listnate_polokruh_choice',
        text: 'Póry se plynule zmenšují plynulým přechodem směrem k letnímu dříví nebo je v jarním dřevě zřetelnější řada mikropórů.',
        targetNodeId: 'listnate_polokruhovite',
        cutHint: 'P',
        details: 'Přejít na tabulku 13 (Polokruhovitě pórovité)'
      },
      {
        id: 'listnate_roztrous_choice',
        text: 'Póry jsou extrémně malé, téměř nezřetelné, a jsou rovnoměrně rozptýlené napříč celým letokruhem.',
        targetNodeId: 'listnate_roztrousene',
        cutHint: 'P',
        details: 'Přejít na tabulku 14 (Roztroušeně pórovité)'
      }
    ]
  },
  {
    id: 'listnate_kruhovite',
    title: 'Listnaté dřeviny s kruhovitě pórovitou stavbou',
    subtitle: 'Zkoumáme vzhled a šířku dřeňových paprsků na všech řezech:',
    description: 'Dřeňové paprsky jsou linky vedoucí od středu kůry. Jak jsou zřetelné ve vašem vzorku?',
    cutImage: 'PRT',
    choices: [
      {
        id: 'kruh_siroke_papr',
        text: 'Dřeňové paprsky jsou velmi široké a výrazně zřetelné na všech třech řezech.',
        targetNodeId: 'listnate_kruhovite_siroke_paprsky',
        cutHint: 'PRT',
        details: 'Přejít na tabulku 10'
      },
      {
        id: 'kruh_uzke_papr',
        text: 'Dřeňové paprsky jsou zřetelné pouze na radiálním řezu (R), na ostatních ne.',
        targetNodeId: 'listnate_kruhovite_uzke_paprsky',
        cutHint: 'R',
        details: 'Přejít na tabulku 11'
      },
      {
        id: 'kruh_velmi_uzke',
        text: 'Dřeňové paprsky jsou velmi úzké a prakticky neznatelné na všech řezech.',
        targetNodeId: 'listnate_kruhovite_velmi_uzke',
        cutHint: 'PRT',
        details: 'Přejít na tabulku 12'
      }
    ]
  },
  {
    id: 'listnate_kruhovite_siroke_paprsky',
    title: 'Široké dřeňové paprsky u kruhovitě pórovitých',
    subtitle: 'Zkoumáme detaily uspořádání letního dříví a paprsků:',
    cutImage: 'PRT',
    choices: [
      {
        id: 'dub_choice',
        text: 'Běl světložlutá, jádro světle až tmavohnědé. V zóně letního dřeva mikropóry tvoří světlé radiální pásky. Paprsky tvoří lesklá křivolaká zrcadla a na T-řezu dlouhé pásy (cm).',
        targetNodeId: 'SPECIES_dub',
        cutHint: 'PRT',
        details: 'Dub letní / zimní – Quercus'
      },
      {
        id: 'pajasan_choice',
        text: 'Běl široká nažloutlá, jádro žlutošedé, olivově zelené. V letním dřívě světlé tečky nebo krátké tangenciální vlnky. Paprsky tvoří lesklá zřetelná rovná zrcadla.',
        targetNodeId: 'SPECIES_pajasan',
        cutHint: 'PRT',
        details: 'Pajasan žláznatý – Ailanthus altissima'
      }
    ]
  },
  {
    id: 'listnate_kruhovite_uzke_paprsky',
    title: 'Úzké dřeňové paprsky u kruhovitě pórovitých',
    subtitle: 'Zkoumáme krajkovou kresbu mikropórů v letním dříví:',
    cutImage: 'PRT',
    choices: [
      {
        id: 'jilm_choice',
        text: 'Jemné tangenciální vlnkování v letním dříví (krajkovitý vzorek). Běl žlutobílá, jádro čokoládově až tmavě hnědé. Paprsky tvoří jemná tmavohnědá zrcátka.',
        targetNodeId: 'SPECIES_jilm',
        cutHint: 'PRT',
        details: 'Jilm – Ulmus'
      },
      {
        id: 'akat_choice',
        text: 'Jarní makropóry jsou zcela ucpané krystalickými tyly (vypadají jako žlutavé ucpávky). Jádro zlatavě zelenohnědé. Velmi tvrdé, paprsky tvoří zřetelná zrcátka.',
        targetNodeId: 'SPECIES_akat',
        cutHint: 'P',
        details: 'Trnovník bílý (akát) – Robinia pseudoacacia'
      },
      {
        id: 'morusovnik_choice',
        text: 'Podobné akátu, ale jarní cévy jen částečně plné, dřevo středně těžké, jádro sytě zlatohnědé až tmavohnědé, letní mikropóry tvoří světlé tečky.',
        targetNodeId: 'SPECIES_morusovnik',
        cutHint: 'PRT',
        details: 'Morušovník – Morus'
      },
      {
        id: 'jasan_choice',
        text: 'Běl široká nažloutlá, jádro světlehnědé, postupný přechod. Makropóry jarního dříví dobře viditelné jako volné dutinky (otevřené žlábky). Paprsky tvoří pouze drobná nevýrazná zrcátka.',
        targetNodeId: 'SPECIES_jasan',
        cutHint: 'P',
        details: 'Jasan ztepilý – Fraxinus excelsior'
      }
    ]
  },
  {
    id: 'listnate_kruhovite_velmi_uzke',
    title: 'Velmi úzké dřeňové paprsky u kruhovitě pórovitých',
    subtitle: 'Vyhodnocujeme letní dříví:',
    cutImage: 'P',
    choices: [
      {
        id: 'kastanovnik_choice',
        text: 'Běl úzká nažloutlá, jádro tmavohnědé. V letním dříví světlé radiální páskování – žíhání (žíhaný vzor). Žádná široká zrcadla (odlišení od dubu!).',
        targetNodeId: 'SPECIES_kastanovnik',
        cutHint: 'P',
        details: 'Kaštanovník jedlý – Castanea sativa'
      }
    ]
  },
  {
    id: 'listnate_polokruhovite',
    title: 'Listnaté dřeviny s polokruhovitě pórovitou stavbou',
    subtitle: 'Zkoumáme barvu a doplňkové znaky na podélném řezu:',
    cutImage: 'PRT',
    choices: [
      {
        id: 'oresak_choice',
        text: 'Běl šedobílá, jádro tmavě a pestře šedočerné, čokoládové, zónované. Cévy tvoří zřetelné rýhy na všech řezech. Dřevo podélně výrazně mramorově pruhované.',
        targetNodeId: 'SPECIES_oresak',
        cutHint: 'PRT',
        details: 'Ořešák královský – Juglans regia'
      },
      {
        id: 'tresen_choice',
        text: 'Běl úzká narůžovělá, jádro teplé červenohnědé s jemným zelenavým nádechem. Zřetelná svetlá jarní vrstva letokruhu. Paprsky tvoří zřetelná úzká zlatavá zrcátka.',
        targetNodeId: 'SPECIES_tresen',
        cutHint: 'PRT',
        details: 'Třešeň ptačí – Cerasus avium'
      },
      {
        id: 'svestka_choice',
        text: 'Běl velmi úzká žlutavá, jádro pestře červenohnědé až fialovočervené s tmavými čarami. Úzké zvlněné letokruhy. Paprsky tvoří efektní do fialova zbarvená zrcátka.',
        targetNodeId: 'SPECIES_svestka',
        cutHint: 'PRT',
        details: 'Švestka domácí – Prunus domestica'
      }
    ]
  },
  {
    id: 'listnate_roztrousene',
    title: 'Listnaté dřeviny s roztroušeně pórovitou stavbou',
    subtitle: 'Zkoumáme zřetelnost dřeňových paprsků na jednotlivých řezech:',
    cutImage: 'PRT',
    choices: [
      {
        id: 'roztrous_vid_vse',
        text: 'Dřeňové paprsky jsou zřetelně viditelné na všech řezech (P, R, T).',
        targetNodeId: 'listnate_roztrousene_viditelne_vsude',
        cutHint: 'PRT',
        details: 'Přejít na tabulku 15'
      },
      {
        id: 'roztrous_vid_rad',
        text: 'Dřeňové paprsky jsou zřetelně viditelné pouze na radiálním řezu (R).',
        targetNodeId: 'listnate_roztrousene_radialni_pouze',
        cutHint: 'R',
        details: 'Přejít na tabulku 18'
      },
      {
        id: 'roztrous_nezretelne',
        text: 'Dřeňové paprsky na všech řezech téměř nezřetelné (prakticky neviditelné loupou).',
        targetNodeId: 'listnate_roztrousene_nezretelne',
        cutHint: 'PRT',
        details: 'Přejít na tabulku 19'
      }
    ]
  },
  {
    id: 'listnate_roztrousene_viditelne_vsude',
    title: 'Zřetelné dřeňové paprsky na všech řezech',
    subtitle: 'Zkoumáme rozlišení jádra a běli:',
    cutImage: 'P',
    choices: [
      {
        id: 'roztrous_vse_s_jadrem',
        text: 'Dřevo má vylišenou barevnou zónu jádra a běli (jádrové dřevo).',
        targetNodeId: 'listnate_roztrousene_viditelne_vsude_jadr',
        cutHint: 'P',
        details: 'Přejít na tabulku 16'
      },
      {
        id: 'roztrous_vse_bez_jadra',
        text: 'Dřevo nemá rozlišené zóny jádra a běli (dřeva stejnoměrně zbarvená – bílá až růžová).',
        targetNodeId: 'listnate_roztrousene_viditelne_vsude_bel',
        cutHint: 'P',
        details: 'Přejít na tabulku 17 (Dřeva bělová)'
      }
    ]
  },
  {
    id: 'listnate_roztrousene_viditelne_vsude_jadr',
    title: 'Roztroušeně pórovité s jádrem, viditelné paprsky',
    subtitle: 'Vyhodnocujeme hustotu a zrcátka:',
    cutImage: 'PRT',
    choices: [
      {
        id: 'platan_choice',
        text: 'Běl široká nažloutlá, jádro světlehnědé (pozvolný přechod). Nápadně lesklá, sytá, hustá zrcadla na radiálu. Na T-řezu vřetena vysoká cca 1 mm.',
        targetNodeId: 'SPECIES_platan',
        cutHint: 'PRT',
        details: 'Platan – Platanus'
      }
    ]
  },
  {
    id: 'listnate_roztrousene_viditelne_vsude_bel',
    title: 'Roztroušeně pórovitá bělová dřeva, viditelné paprsky',
    subtitle: 'Zkoumáme zřetelnost letokruhů, zvlnění a svislé vlnky paprsků:',
    cutImage: 'PRT',
    choices: [
      {
        id: 'buk_choice',
        text: 'Dřevo pleťově růžové až světle červenohnědé. Časné nepravé jádro. Zřetelné letokruhy. Paprsky tvoří četná jasná zrcátka, na T-řezu svislé čárky vysoké 1-5 mm.',
        targetNodeId: 'SPECIES_buk',
        cutHint: 'PRT',
        details: 'Buk lesní – Fagus sylvatica'
      },
      {
        id: 'habr_choice',
        text: 'Dřevo bílé až žlutobílé. Zvlněné letokruhy (kmínek tvoří svalovité útvary). Nepravé sdružené paprsky tvoří matná, šedavá zrcadla na radíálu, na T-řezu svislé šedavé pruhy (až 5 cm).',
        targetNodeId: 'SPECIES_habr',
        cutHint: 'PRT',
        details: 'Habr obecný – Carpinus betulus'
      },
      {
        id: 'olse_choice',
        text: 'Dřevo narůžovělé až oranžové (čerstvě kácené svítivě oranžové). Letokruhy velmi nevýrazné. Časté dřeňové skvrny. Sdružené paprsky tvoří dlouhé svislé linky (až několik cm).',
        targetNodeId: 'SPECIES_olse',
        cutHint: 'PRT',
        details: 'Olše lepkavá – Alnus glutinosa'
      }
    ]
  },
  {
    id: 'listnate_roztrousene_radialni_pouze',
    title: 'Paprsky viditelné pouze na radiálním řezu',
    subtitle: 'Sledujeme barevnost, přítomnost bílého prachu v cévách a vůni:',
    cutImage: 'PRT',
    choices: [
      {
        id: 'javor_choice',
        text: 'Dřevo smetanově až slonovinově čistě bílé, vysoce lesklé, letokruhy ohraničeny tenkou tmavou zónou. Paprsky tvoří drobnější hedvábně lesklá zrcátka. Častá očka a svalovitost.',
        targetNodeId: 'SPECIES_javor',
        cutHint: 'R',
        details: 'Javor klen / mleč – Acer'
      },
      {
        id: 'babyka_choice',
        text: 'Dřevo světlehnědé s narůžovělým nádechem, spíše matné. Paprsky tvoří drobná, velmi jemná, málo zřetelná zrcátka.',
        targetNodeId: 'SPECIES_babyka',
        cutHint: 'R',
        details: 'Babyka obecná – Acer campestre'
      },
      {
        id: 'briza_choice',
        text: 'Dřevo šedobílé nebo žlutobílé bez lesku. Cévy na P-řezu vyplňuje světlý obsah (vypadají jako jemný moučný bílý prach). Velmi časté hnědé dřeňové skvrny.',
        targetNodeId: 'SPECIES_briza',
        cutHint: 'P',
        details: 'Bříza bělokorá – Betula pendula'
      },
      {
        id: 'lipa_choice',
        text: 'Dřevo bělavé, nažloutlé, vlhkem šedne až zelená. Málo zřetelné letokruhy. Čerstvé kysele voní. Velmi jemné stejnorodé složení, paprsky tvoří nevýrazná drobná zrcátka.',
        targetNodeId: 'SPECIES_lipa',
        cutHint: 'R',
        details: 'Lípa srdčitá / velkolistá – Tilia'
      }
    ]
  },
  {
    id: 'listnate_roztrousene_nezretelne',
    title: 'Paprsky téměř nezřetelné na všech řezech',
    subtitle: 'Zkoumáme rozlišení jádra a běli:',
    cutImage: 'P',
    choices: [
      {
        id: 'roztrous_nez_bez_jadra',
        text: 'Dřevo nemá rozlišené zóny jádra a běli (stejnoměrně bílá, narůžovělá až šedobílá dřeva bělová).',
        targetNodeId: 'listnate_roztrousene_nezretelne_bel',
        cutHint: 'P',
        details: 'Přejít na tabulku 20'
      },
      {
        id: 'roztrous_nez_s_jadrem',
        text: 'Dřevo má jasně či slabě vylišenou zónu jádra a běli.',
        targetNodeId: 'listnate_roztrousene_nezretelne_jadr',
        cutHint: 'P',
        details: 'Přejít na tabulku 21'
      }
    ]
  },
  {
    id: 'listnate_roztrousene_nezretelne_bel',
    title: 'Bělová dřeva s téměř nezřetelnými paprsky',
    subtitle: 'Zkoumáme letokruhy, dřeňové skvrny a lesk:',
    cutImage: 'PRT',
    choices: [
      {
        id: 'osika_choice',
        text: 'Dřevo špinavě bílé až žlutobílé. Zcela matné, velmi lehké a měkké. Dosti časté hnědé dřeňové skvrny, letokruhy nezřetelné.',
        targetNodeId: 'SPECIES_osika',
        cutHint: 'PRT',
        details: 'Osika obecná – Populus tremula'
      },
      {
        id: 'hrusen_choice',
        text: 'Dřevo narůžovělé až červenohnědé (výrazně tmavne na vzduchu), velmi husté. Časté dřeňové skvrny a nepravé jádro. Velmi sametový mat, paprsky téměř neviditelné.',
        targetNodeId: 'SPECIES_hrusen',
        cutHint: 'PRT',
        details: 'Hrušeň obecná – Pyrus communis'
      },
      {
        id: 'jirovec_choice',
        text: 'Dřevo čistě bělavé, krémové, časem tmavne do šeda. Velmi čistý povrch s výrazným celkovým hedvábným leskem. Letokruhy velmi nevýrazné.',
        targetNodeId: 'SPECIES_jirovec',
        cutHint: 'PRT',
        details: 'Jírovec maďal – Aesculus hippocastanum'
      }
    ]
  },
  {
    id: 'listnate_roztrousene_nezretelne_jadr',
    title: 'Jádrová dřeva s téměř nezřetelnými paprsky',
    subtitle: 'Hodnotíme strukturu cév, dřeňové skvrny a vzhled:',
    cutImage: 'PRT',
    choices: [
      {
        id: 'vrba_choice',
        text: 'Běl široká nažloutlá/nahnědlá, jádro žlutočervené až žlutohnědé (špatně rozlišitelné). Cévy tvoří drobné svislé trhlinky na radíálu. Povrch dřeva působí plstnatě, drsně.',
        targetNodeId: 'SPECIES_vrba',
        cutHint: 'PRT',
        details: 'Vrba – Salix'
      },
      {
        id: 'topol_choice',
        text: 'Běl světložlutá, jádro žlutohnědé se zeleným či červeným odstínem (často tmavě žíhané). Časté dřeňové skvrny. Dřevo je měkké, plstnaté.',
        targetNodeId: 'SPECIES_topol',
        cutHint: 'PRT',
        details: 'Topol – Populus'
      },
      {
        id: 'jerab_choice',
        text: 'Běl široká narůžovělá až masově červená, jádro světlehnědé až tmavohnědé. Letokruhy zřetelné se zónou. Hojné dřeňové skvrny, paprsky tvoří drobná tmavá zrcátka.',
        targetNodeId: 'SPECIES_jerab',
        cutHint: 'PRT',
        details: 'Jeřáb – Sorbus'
      },
      {
        id: 'jablon_choice',
        text: 'Běl narůžovělá, jádro červenohnědé až hnědé. Letokruhy poměrně zřetelné se širokou tmavou letní vrstvou. Cévy tvoří jemné linkované rýžky, dřevo je matné.',
        targetNodeId: 'SPECIES_jablon',
        cutHint: 'PRT',
        details: 'Jabloň lesní – Malus sylvestris'
      }
    ]
  }
];

export const ACHIEVEMENTS = [
  { id: 'first_solve', title: 'První úspěch', description: 'Úspěšně urči svou první dřevinu podle klíče.', icon: 'Award' },
  { id: 'conifer_master', title: 'Jehličnatý král', description: 'Urči všechny 8 jehličnaté dřeviny.', icon: 'Trees' },
  { id: 'broadleaf_master', title: 'Listnatý detektiv', description: 'Úspěšně urči aspoň 5 listnatých dřevin.', icon: 'Search' },
  { id: 'perfect_run', title: 'Ostrý řez', description: 'Průchod klíčem bez jediného chybného kroku.', icon: 'CheckCircle2' },
  { id: 'streak_3', title: 'Série v lese', description: 'Dosáhni denní série (streak) 3 dny po sobě.', icon: 'Flame' },
  { id: 'xp_500', title: 'Botanický expert', description: 'Získej celkem 500 zkušenostních bodů (XP).', icon: 'Sparkles' }
];

export const DETECTIVE_CASES = [
  {
    id: 'case_1',
    title: 'Záhada těžkého kusu z lukostřelby',
    difficulty: 'začátečník' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'tis')!,
    clues: [
      'Je to jehličnatá dřevina.',
      'Dřevo je na omak velmi těžké a tvrdé.',
      'Běl je extrémně úzká nažloutlá a střed (jádro) hraje nádhernou cihlově až fialově červenou barvou.',
      'S lupou nevidíme vůbec žádné pryskyřičné kanálky.',
      'Letokruhy jsou velmi úzké a zvlněné.'
    ]
  },
  {
    id: 'case_2',
    title: 'Lehká vonná krabička z chalupy',
    difficulty: 'začátečník' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'jalovec')!,
    clues: [
      'Jedná se o jehličnan.',
      'Vzorek po mírném přebroušení extrémně silně voní – kořenitě, až lékárnicky (gáfrově).',
      'Pryskyřičné kanálky na příčném řezu úplně chybí.',
      'Běl je úzká pleťově bílá, jádro je žlutohnědé s jemně fialovými tóny.',
      'Dřevo je lehké, měkké, s hodně zakroucenými letokruhy.'
    ]
  },
  {
    id: 'case_3',
    title: 'Pevná voňavá krabička na doutníky',
    difficulty: 'pokročilý' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'akat')!,
    clues: [
      'Je to listnatý opadavý strom.',
      'Stavba dřeva je jasně kruhovitě pórovitá – na jaře jsou obrovské cévy.',
      'Lupou vidíme, že jarní cévy jsou kompletně ucpány zářivě žlutými lesklými tyly jako malá klubíčka.',
      'Jádro má zelenavě olivově žlutý odstín, běl je naprosto úzká krémově bílá.',
      'Dřevo je extrémně tvrdé a těžké, při laku má skelný lesk.'
    ]
  },
  {
    id: 'case_4',
    title: 'Benátský kůl z mokrého podzemí',
    difficulty: 'expert' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'olse')!,
    clues: [
      'Listnatá dřevina s roztroušeně pórovitou stavbou – póry jsou velmi rozptýlené a téměř nezřetelné.',
      'Zcela chybí rozlišené jádro a běl (všechno dřevo je jedné barvy), dřevo je mírně narůžovělé až oranžové.',
      'Dřeňové paprsky jsou sdružené (nepravé) – na tangenciálním řezu tvoří svislé dlouhé pásy dlouhé i several cm.',
      'Na příčném řezu letokruhy téměř splývají, občas narazíme na drobné hnědé dřeňové skvrny.',
      'Dřevo je lehoučké a měkké.'
    ]
  },
  {
    id: 'case_5',
    title: 'Vřetena v soustružnické dílně',
    difficulty: 'pokročilý' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'buk')!,
    clues: [
      'Rozstroušeně pórovitý listnáč.',
      'Nemá vylišenou zónu jádra a běli (velmi stejnoměrně pleťově narůžovělé), u některých starých vzorků uprostřed šedé nepravé jádro.',
      'Dřeňové paprsky jsou zřetelně viditelné úplně na všech řezech.',
      'Na tangenciálu tvoří vřetena (svislé čárky) vysoká přesně 1 až 5 milimetrů.',
      'Na radiálním řezu tvoří sytá lesklá rudohnědá zrcátka.'
    ]
  },
  {
    id: 'case_6',
    title: 'Zamodralé trámy ze staré půdy',
    difficulty: 'pokročilý' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'borovice_lesni')!,
    clues: [
      'Jedná se o jehličnatou dřevinu.',
      'Dřevo je poměrně lehké a měkké, s velmi intenzivní a sladkou pryskyřičnou vůní.',
      'Běl je mimořádně široká, nažloutlá a u mnoha starých trámů má typické šedomodré zbarvení způsobené neškodnými houbami (tzv. zamodrání).',
      'Pryskyřičné kanálky jsou velmi četné a velké, takže jsou na příčném řezu jasně patrné i bez lupy jako drobné tečky.',
      'Jádro je ostře ohraničené, mírně měděně až červenorůžově hnědé.'
    ]
  },
  {
    id: 'case_7',
    title: 'Tajemství rezonančních houslí',
    difficulty: 'pokročilý' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'smrk')!,
    clues: [
      'Jedná se o jehličnatou dřevinu.',
      'Dřevo je mimořádně lehké, světlé, žlutobílé bez pravého barevného jádra.',
      'Letokruhy jsou velmi úzké, pravidelné a rovnoměrné (cca 1–2 mm), což dodává dřevu skvělou pružnost.',
      'Na příčném řezu najdeme občasné, velmi drobné, pod lupou sotva viditelné pryskyřičné kanálky.',
      'Při poklepu má dřevo čistý, jasně zvonivý hudební tón (využívá se jako rezonanční deska smyčcových nástrojů).'
    ]
  },
  {
    id: 'case_8',
    title: 'Starožitná truhla z hradní kaple',
    difficulty: 'začátečník' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'dub')!,
    clues: [
      'Kruhovitě pórovitý listnáč s nápadnými ročními kruhy.',
      'Jádro je tmavě hnědé až šedohnědé, běl je světlá a velmi úzká.',
      'Má extrémně široké a masivní dřeňové paprsky, které jsou na příčném řezu jasně patrné jako světlé radiální linky.',
      'Na radiálním řezu tvoří tyto paprsky velké lesklé plošky (tzv. zrcátka).',
      'Dřevo voní kysele po tříslovinách a je mimořádně těžké, tvrdé a odolné.'
    ]
  },
  {
    id: 'case_9',
    title: 'Trvanlivý lodní stěžňový trám',
    difficulty: 'pokročilý' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'modrin')!,
    clues: [
      'Jehličnatá dřevina s velmi výrazným fládrem a úzkou nažloutlou bělí.',
      'Jádro je velmi tmavé, cihlově červené až červenohnědé a tvoří většinu průřezu.',
      'Přechod mezi jarním a letním dřevem v letokruhu je extrémně ostrý.',
      'Pryskyřičné kanálky jsou přítomné, ale velmi malé, roztroušeně viditelné jako ojedinělé tečky na příčném řezu.',
      'Dřevo má vysoký podíl pryskyřice, voní nakysle a má pověst „evropského teaku“ díky své voděodolnosti.'
    ]
  },
  {
    id: 'case_10',
    title: 'Zvonivá násada středověkého kopí',
    difficulty: 'začátečník' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'jasan')!,
    clues: [
      'Kruhovitě pórovitá listnatá dřevina s nápadnými letokruhy.',
      'Na rozdíl od dubu má velmi úzké, téměř neviditelné dřeňové paprsky.',
      'Jádro je nepravidelně hnědé (často s tmavšími olivovými zónami), běl je velmi široká, smetanově bílá.',
      'Dřevo je extrémně pružné, houževnaté a tvrdé, ideální pro rukojeť sekery, kopí nebo sportovní nářadí.',
      'Jarní cévy v letokruhu tvoří pouhým okem dobře viditelný prstenec pórů.'
    ]
  },
  {
    id: 'case_11',
    title: 'Ztracený barokní andělíček',
    difficulty: 'pokročilý' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'lipa')!,
    clues: [
      'Roztroušeně pórovitý listnáč s velmi jemnou, homogenní stavbou.',
      'Nemá rozlišené jádro a běl (dřevo je jednotně žlutobílé až narůžovělé).',
      'Letokruhy jsou velmi nezřetelné, dřeňové paprsky jsou tenké a sotva viditelné i pod lupou.',
      'Dřevo je mimořádně měkké, lehké, neštípe se a dá se snadno řezat ve všech směrech (ideální pro řezbáře).',
      'Má jemnou, nenápadnou sladkou vůni.'
    ]
  },
  {
    id: 'case_12',
    title: 'Tajemství intarzie šlechtické komody',
    difficulty: 'expert' as const,
    targetSpecies: ALL_SPECIES.find(s => s.id === 'oresak')!,
    clues: [
      'Jedná se o polokruhovitě pórovitý listnáč, kde velikost cév plynule klesá od jarního okraje k letnímu dříví.',
      'Jádro je nádherně čokoládově hnědé až tmavošedé s tmavými pruhy a fialovým nádechem, běl je úzká a šedavě bílá.',
      'Dřevo je středně tvrdé, těžké, výborně se leští a na řezu má matný hedvábný lesk.',
      'Dřeňové paprsky jsou viditelné jako velmi jemný řádkový vzor na radiálním řezu.',
      'Dřevo má velmi specifickou charakteristickou ořechovou vůni.'
    ]
  }
];


