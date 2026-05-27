# 🌲 Interaktivní klíč k určování dřevin a stavba dřeva

Profesionální výukový portál a webová single-page aplikace (SPA) zaměřená na **makroskopickou a mikroskopickou stavbu dřeva jehličnatých a listnatých dřevin**. Aplikace byla vytvořena jako moderní digitální pomůcka splňující nejpřísnější kritéria pro výukový software, včetně světových standardů digitální bezbariérovosti.

Metodický obsah a určovací algoritmy vycházejí z **Klíče k makroskopickému určování vybraných dřev jehličnatých a listnatých dřevin** z Lesnické a dřevařské fakulty (Ústav nauky o dřevě) na **Mendelově univerzitě v Brně**.

---

## 🚀 Hlavní moduly aplikace

Aplikace sdružuje pět komplexních interaktivních modulů na jedné obrazovce:

1. **🔑 Interaktivní určovací klíč**:
   - Vede uživatele krok za krokem anatomickými dichotomickými znaky (např. přítomnost pryskyřičných kanálků, uspořádání cév, zřetelnost dřeně a dřeňových paprsků) až ke správnému botanickému určení druhu.
   - Obsahuje ukládání stavu určování v reálném čase do lokálního úložiště pro možnost pokračování při přerušení.

2. **🌳 Přehledný Atlas dřevin**:
   - Detailní karty pro české jehličnaté a listnaté dřeviny.
   - Každá dřevina obsahuje trojrozměrný náhled řezů: **P** (příčný), **R** (radiální) a **T** (tangenciální) s možností plynulého přepínání makroskopického (makro), mikroskopického (mikro) a schématického zobrazení.
   - Detailní taxonomické informace, botanické vlastnosti a přímé reference na vědecké zdroje.

3. **🔬 Interaktivní srovnávač (Komparátor)**:
   - Umožňuje zvolit dva libovolné druhy dřeva a porovnat jejich řezy bok po boku.
   - Synchronizuje aktuálně zvolenou rovinu řezu (**P / R / T**) a úroveň zobrazení (**makro / mikro**).
   - Podporuje detailní interaktivní lupu pro studium nejjemnějších mikroskopických struktur.

4. **🧬 Interaktivní mikroskopická schémata**:
   - Vektorové (SVG) interaktivní modely anatomií jehličnatého a listnatého dřeva.
   - Detekce najetí myši na jednotlivé anatomické prvky (jarní/letní tracheidy, pryskyřičné kanálky, cévy, dřeňové paprsky, transpirační tečky) s okamžitým zobrazením popisu a funkce dané buňky.
   - Možnost stažení čistého vektorového schématu ve formátu SVG jedním kliknutím.

5. **🏆 Znalostní kvíz & Generátor certifikátů**:
   - Herní režim prověřující nabyté znalosti formou testu s okamžitou zvukovou i grafickou zpětnou vazbou.
   - Po úspěšném zvládnutí testu (zisk stanoveného počtu bodů) se odemkne **Generátor certifikátů**, kde si uživatel může vygenerovat a stáhnout oficiální vektorový certifikát o absolvování ve formátu SVG se svým jménem a datem.

---

## ♿ Bezbariérovost & Přístupnost (Web Accessibility)

Portál byl navržen s maximálním důrazem na rovný přístup k informacím. Plně odpovídá mezinárodním standardům přístupnosti **WCAG 2.1 a WCAG 2.2 na úrovni AA** a splňuje požadavky evropské harmonizované normy **EN 301 549**:

* **Optimalizace pro asistenční čtečky (Screen Readers)**: Všechny interaktivní obrazy mikroskopických a makroskopických řezů jsou dynamicky popsány sémantickými atributy `alt` a `aria-label`, aby nevidomým a slabozrakým popsaly vnitřní stavbu (např. přítomnost cév u listnáčů či tracheid u jehličnanů).
* **Kompletní klávesnicová navigace**: Každé tlačítko, interaktivní větev určovacího klíče, přepínač i kvízová odpověď jsou sémanticky správně implementovány jako fokusovatelné prvky. Celou aplikaci lze pohodlně ovládat klávesami `Tab`, `Space` a `Enter`.
* **Podpora pro sluchově znevýhodněné**: Akustická zpětná vazba (např. kliknutí na tlačítko, zvuk úspěchu v kvízu) je vždy doprovázena zřetelnými, vysoce kontrastními vizuálními efekty na obrazovce.
* **Vysoký kontrast & Responzivita**: Texty a ovládací prvky splňují přísné kontrastní poměry vůči pozadí, aplikace se plynule přizpůsobuje i zařízením s nestandardním zobrazením, zvětšením systémového písma či mobilním navigacím.

---

## 📦 Stažení plné offline verze (`dreviny.html`)

Jednou z největších předností aplikace je možnost stažení celé platformy jako **jediného autonomního souboru `.html`**.
* Soubor **obsahuje v sobě integrované kompletní styly, aplikační logiku i pomocné ikony**.
* Funguje na jakémkoliv zařízení (počítač, tablet, telefon, interaktivní tabule v lese) **zcela bez internetového připojení** a bez nutnosti instalovat lokální servery či databáze.
* Odkaz na stažení offline verze naleznete přímo v aplikaci v záhlaví (Ikona stáhnutí) nebo v informačním okně v sekci **"📥 STÁHNOUT OFFLINE VERZI APP"**. Stažený soubor obchází cache prohlížeče a stahuje se vždy v nejnovější aktuální verzi přímo ze serveru.

---

## 🛠️ Instalace a lokální vývoj (Kopírování z GitHubu nebo ZIP)

Chcete-li spustit projekt lokálně nebo jej importovat do vlastního prostředí z GitHubu, postupujte podle následujících kroků:

### 1. Požadavky na systém
* **Node.js** ve verzi 18.x nebo novější
* **npm** (případně yarn, pnpm)

### 2. Klonování a instalace závislostí
Naklonujte repozitář ze svého GitHubu a nainstalujte potřebné balíčky z `package.json`:
```bash
# Klonování repozitáře
git clone <url-vaseho-repozitari>
cd <slozka-projektu>

# Instalace závislostí
npm install
```

### 3. Spuštění vývojového serveru
Spustí lokální vývojový server s podporou rychlého načítání změn (pomocí Vite):
```bash
npm run dev
```
Aplikace se otevře ve vašem prohlížeči na adrese [http://localhost:3000](http://localhost:3000) (nebo jiné volné adrese vypsané v terminálu).

### 4. Sestavení a kompilace pro produkci
Pro zkompilování aplikace do optimalizovaných produkčních statických souborů (do složky `/dist`):
```bash
npm run build
```

### 5. Sestavení autonomního offline HTML souboru
Sestaví celou webovou aplikaci do jednoho nezávislého souboru `dreviny.html`:
```bash
# Nejprve sestavte běžnou produkční verzi
npm run build

# Spusťte přiložený inlining skript
node inline-assets.js
```
Tento skript analyzuje vytvořený build, vyjme zkompilovaný JavaScript a CSS styly a vloží je přímo do hlavního tagu `<script>` a `<style>` šablony, čímž vygeneruje plně funkční soubor `dreviny.html` v kořenovém adresáři.

---

## 📝 Licence a autorská práva

Tento software je licencován pod svobodnou licencí **GNU GPLv3** (General Public License verze 3). Kompletní znění licenčních podmínek naleznete v přiloženém souboru `LICENSE.md`.

* **Copyright © 2026 Luděk Sušický**
* **Autor**: Bc. Luděk Sušický (SŠ a VŠ učitel Informatiky zabývající se AI ve vzdělávání a vibecodingu)
* **Kontakt**: [ludek.susicky@gmail.com](mailto:ludek.susicky@gmail.com)
* **LinkedIn**: [ludek-susicky](https://www.linkedin.com/in/ludek-susicky/)
* **X (Twitter)**: [@ludeksusicky](https://x.com/ludeksusicky)

*Všechny anatomické snímky řezů v aplikaci jsou použity se svolením a v souladu s výukovými materiály Mendelovy univerzity v Brně.*
