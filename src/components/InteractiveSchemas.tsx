import React, { useState, useRef } from 'react';
import { Trees, ChevronRight, HelpCircle, GitCommit, Search, Crosshair, Download } from 'lucide-react';

interface InteractiveSchemasProps {
  onSelectSpecies?: (speciesId: string) => void;
}

export const InteractiveSchemas: React.FC<InteractiveSchemasProps> = ({ onSelectSpecies }) => {
  const [activeSchemaTab, setActiveSchemaTab] = useState<'conifers' | 'ringPorous' | 'diffusePorous'>('conifers');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const [isDraggingState, setIsDraggingState] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0, isDragging: false });

  const downloadSchemaAsSvg = () => {
    let title = "";
    let svgContent = "";
    
    // Help markers
    const defs = `
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#78716c" />
        </marker>
      </defs>
    `;

    if (activeSchemaTab === 'conifers') {
      title = "urcovaci-klic-jehlicnany";
      svgContent = `
        <rect width="820" height="520" fill="#faf9f6" rx="16" />
        <rect x="20" y="20" width="780" height="50" fill="#065f46" rx="8" />
        <text x="420" y="52" fill="white" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">URČOVACÍ KLÍČ: JEHLIČNANY (MENDELU)</text>
        
        <!-- Legend -->
        <circle cx="65" cy="490" r="6" fill="#047857" />
        <text x="80" y="494" fill="#44403c" font-family="sans-serif" font-size="11" font-weight="bold">Výsledná dřevina</text>
        <rect x="220" y="482" width="14" height="14" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" />
        <text x="245" y="494" fill="#44403c" font-family="sans-serif" font-size="11" font-weight="bold">Určující znak / Vlastnost</text>
        
        <!-- Root node -->
        <rect x="200" y="90" width="440" height="70" fill="#065f46" rx="8" stroke="#022c22" stroke-width="2" />
        <text x="420" y="112" fill="#a7f3d0" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle" letter-spacing="1">ROD: JEHLIČNAN</text>
        <text x="420" y="132" fill="white" font-family="sans-serif" font-size="11" text-anchor="middle">Výrazná kresba letokruhů; dobře odlišitelné jarní a letní dřevo;</text>
        <text x="420" y="146" fill="white" font-family="sans-serif" font-size="11" text-anchor="middle">dřeňové paprsky okem neviditelné; možný výskyt pryskyřičných kanálků.</text>

        <!-- Connectors Level 1 -->
        <path d="M 420,160 L 420,180" stroke="#78716c" stroke-width="1.5" fill="none" />
        <path d="M 420,180 L 220,180 L 220,195" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        <path d="M 420,180 L 620,180 L 620,195" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />

        <!-- Decision 1 -->
        <rect x="140" y="195" width="160" height="30" fill="white" stroke="#f59e0b" stroke-width="2" rx="6" />
        <text x="220" y="214" fill="#78350f" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">s jádrem</text>

        <rect x="540" y="195" width="160" height="30" fill="white" stroke="#f59e0b" stroke-width="2" rx="6" />
        <text x="620" y="214" fill="#78350f" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">bez jádra</text>

        <!-- Connectors Level 2 -->
        <path d="M 220,225 L 220,240 L 120,240 L 120,255" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        <path d="M 220,225 L 220,240 L 320,240 L 320,255" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />

        <path d="M 620,225 L 620,240 L 540,240 L 540,255" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        <path d="M 620,225 L 620,240 L 700,240 L 700,255" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />

        <!-- Intermediate Decisions -->
        <rect x="40" y="255" width="160" height="30" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2" rx="6" />
        <text x="120" y="274" fill="#78350f" font-family="sans-serif" font-size="10" font-weight="medium" text-anchor="middle">s pryskyřičnými kanálky</text>

        <rect x="240" y="255" width="160" height="30" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2" rx="6" />
        <text x="320" y="274" fill="#78350f" font-family="sans-serif" font-size="10" font-weight="medium" text-anchor="middle">bez pryskyřičných kanálků</text>

        <rect x="460" y="255" width="160" height="30" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2" rx="6" />
        <text x="540" y="274" fill="#78350f" font-family="sans-serif" font-size="10" font-weight="medium" text-anchor="middle">s pryskyřičnými kanálky</text>

        <rect x="620" y="255" width="160" height="30" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2" rx="6" />
        <text x="700" y="274" fill="#78350f" font-family="sans-serif" font-size="10" font-weight="medium" text-anchor="middle">bez pryskyřičných kanálků</text>

        <!-- Final Connectors -->
        <path d="M 120,285 L 120,310" stroke="#78716c" stroke-width="1.2" fill="none" />
        <path d="M 120,310 L 65,310 L 65,330" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />
        <path d="M 120,310 L 155,310 L 155,330" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />
        <path d="M 120,310 L 245,310 L 245,330" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />
        <path d="M 120,310 L 335,310 L 335,330" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />

        <path d="M 320,285 L 320,310 L 425,310 L 425,330" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />
        <path d="M 540,285 L 540,310 L 530,310 L 530,330" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />
        <path d="M 700,285 L 700,310 L 630,310 L 630,330" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />

        <!-- Final Boxes -->
        <rect x="25" y="330" width="80" height="110" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="65" y="352" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">BOROVICE</text>
        <text x="65" y="364" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">P. sylvestris</text>
        <rect x="30" y="375" width="70" height="55" fill="#047857" rx="4" />
        <text x="65" y="388" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Široká běl,</text>
        <text x="65" y="399" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">jádro hnědo-</text>
        <text x="65" y="410" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">červené.</text>

        <rect x="115" y="330" width="80" height="110" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="155" y="352" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">VEJMUTOVKA</text>
        <text x="155" y="364" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">Pinus strobus</text>
        <rect x="120" y="375" width="70" height="55" fill="#047857" rx="4" />
        <text x="155" y="388" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Žlutohnědé</text>
        <text x="155" y="399" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">jádro, lehké</text>
        <text x="155" y="410" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">dřevo.</text>

        <rect x="205" y="330" width="80" height="110" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="245" y="352" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">MODŘÍN</text>
        <text x="245" y="364" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">Larix decidua</text>
        <rect x="210" y="375" width="70" height="55" fill="#047857" rx="4" />
        <text x="245" y="388" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Úzká běl,</text>
        <text x="245" y="399" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">jádro tmavo-</text>
        <text x="245" y="410" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">červené.</text>

        <rect x="295" y="330" width="80" height="110" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="335" y="352" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">DOUGLASKA</text>
        <text x="335" y="364" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">P. menziesii</text>
        <rect x="300" y="375" width="70" height="55" fill="#047857" rx="4" />
        <text x="335" y="388" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Hnědočervené</text>
        <text x="335" y="399" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">jádro, široké</text>
        <text x="335" y="410" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">letní dřevo.</text>

        <rect x="385" y="330" width="80" height="110" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="425" y="352" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">TIS</text>
        <text x="425" y="364" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">Taxus baccata</text>
        <rect x="390" y="375" width="70" height="55" fill="#047857" rx="4" />
        <text x="425" y="388" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Červenohnědé</text>
        <text x="425" y="399" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">jádro, bez</text>
        <text x="425" y="410" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">kanálků, těžké.</text>

        <rect x="490" y="330" width="80" height="110" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="530" y="352" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">SMRK</text>
        <text x="530" y="364" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">Picea abies</text>
        <rect x="495" y="375" width="70" height="55" fill="#047857" rx="4" />
        <text x="530" y="388" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Žlutobílé</text>
        <text x="530" y="399" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">dřevo, jemné</text>
        <text x="530" y="410" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">kanálky.</text>

        <rect x="590" y="330" width="80" height="110" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="630" y="352" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">JEDLE</text>
        <text x="630" y="364" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">Abies alba</text>
        <rect x="595" y="375" width="70" height="55" fill="#047857" rx="4" />
        <text x="630" y="388" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Bez jádra a</text>
        <text x="630" y="399" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">zcela bez</text>
        <text x="630" y="410" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">kanálků.</text>
      `;
    } else if (activeSchemaTab === 'ringPorous') {
      title = "urcovaci-klic-kruhovite-porovite";
      svgContent = `
        <rect width="900" height="530" fill="#faf9f6" rx="16" />
        <rect x="20" y="20" width="860" height="50" fill="#92400e" rx="8" />
        <text x="450" y="52" fill="white" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">URČOVACÍ KLÍČ: KRUHOVITĚ PÓROVITÉ LISTNÁČE</text>
        
        <!-- Legend -->
        <circle cx="45" cy="495" r="6" fill="#047857" />
        <text x="60" y="499" fill="#44403c" font-family="sans-serif" font-size="11" font-weight="bold">Výsledná dřevina</text>
        <rect x="200" y="487" width="14" height="14" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" />
        <text x="225" y="499" fill="#44403c" font-family="sans-serif" font-size="11" font-weight="bold">Určující znak / Vlastnost</text>

        <!-- Root node -->
        <rect x="200" y="90" width="500" height="70" fill="#92400e" rx="8" stroke="#78350f" stroke-width="2" />
        <text x="450" y="112" fill="#fef3c7" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle" letter-spacing="1">ROD: KRUHOVITĚ PÓROVITÝ LISTNÁČ</text>
        <text x="450" y="132" fill="white" font-family="sans-serif" font-size="11" text-anchor="middle">Složitější textura; výrazná kresba letokruhů; póry viditelné okem;</text>
        <text x="450" y="146" fill="white" font-family="sans-serif" font-size="11" text-anchor="middle">na příčném řezu póry uspořádané v řadě podél hranice letokruhu.</text>

        <!-- Connectors -->
        <path d="M 450,160 L 450,180" stroke="#78716c" stroke-width="1.5" fill="none" />
        <path d="M 450,180 L 110,180 L 110,195" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        <path d="M 450,180 L 440,180 L 440,195" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        <path d="M 450,180 L 760,180 L 760,195" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />

        <!-- Decision Boxes -->
        <rect x="20" y="195" width="180" height="35" fill="white" stroke="#f59e0b" stroke-width="2" rx="6" />
        <text x="110" y="212" fill="#78350f" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Paprsky viditelné</text>
        <text x="110" y="224" fill="#78350f" font-family="sans-serif" font-size="9" text-anchor="middle">na všech řezech</text>

        <rect x="340" y="195" width="200" height="35" fill="white" stroke="#f59e0b" stroke-width="2" rx="6" />
        <text x="440" y="212" fill="#78350f" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Paprsky patrné pouze</text>
        <text x="440" y="224" fill="#78350f" font-family="sans-serif" font-size="9" text-anchor="middle">na radiálním řezu</text>

        <rect x="670" y="195" width="180" height="35" fill="white" stroke="#f59e0b" stroke-width="2" rx="6" />
        <text x="760" y="212" fill="#78350f" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Paprsky okem</text>
        <text x="760" y="224" fill="#78350f" font-family="sans-serif" font-size="9" text-anchor="middle">nerozlišitelné</text>

        <!-- Final Connectors & Species -->
        <path d="M 110,230 L 110,250" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        
        <rect x="20" y="250" width="180" height="85" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="110" y="270" fill="white" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">DUB</text>
        <text x="110" y="282" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">Quercus robur/petraea</text>
        <text x="110" y="298" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">V letním dřevě plaménky.</text>
        <text x="110" y="310" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">Jádro hnědé, velmi tvrdé.</text>

        <path d="M 110,335 L 110,355" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />

        <rect x="20" y="355" width="180" height="75" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="110" y="375" fill="white" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">DUB ČERVENÝ</text>
        <text x="110" y="387" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">Quercus rubra</text>
        <text x="110" y="403" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">Jádro načervenalé.</text>
        <text x="110" y="415" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">Méně kontrastní letokruhy.</text>

        <path d="M 440,230 L 440,245" stroke="#78716c" stroke-width="1.5" fill="none" />
        <path d="M 440,245 L 290,245 L 290,265" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        <path d="M 440,245 L 440,265" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        <path d="M 440,245 L 590,245 L 590,265" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />

        <rect x="225" y="265" width="130" height="100" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="290" y="285" fill="white" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">AKÁT</text>
        <text x="290" y="297" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">Robinia pseudoacacia</text>
        <text x="290" y="315" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">Světlé tečky v letním dříví,</text>
        <text x="290" y="327" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">jádro žlutozelené,</text>
        <text x="290" y="339" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">velmi těžké.</text>

        <rect x="375" y="265" width="130" height="100" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="440" y="285" fill="white" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">JILM</text>
        <text x="440" y="297" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">Ulmus</text>
        <text x="440" y="315" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">Tvrdé zvlněné vlnky,</text>
        <text x="440" y="327" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">jádro temně hnědé,</text>
        <text x="440" y="339" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">středně těžké.</text>

        <rect x="525" y="265" width="130" height="100" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="590" y="285" fill="white" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">JASAN</text>
        <text x="590" y="297" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">Fraxinus excelsior</text>
        <text x="590" y="315" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">Barva bělavá do šeda,</text>
        <text x="590" y="327" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">výrazné letokruhy,</text>
        <text x="590" y="339" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">pružné houževnaté.</text>

        <path d="M 760,230 L 760,265" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />

        <rect x="670" y="265" width="180" height="100" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="760" y="285" fill="white" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">KAŠTANOVNÍK</text>
        <text x="760" y="297" fill="#a7f3d0" font-family="sans-serif" font-size="8" font-style="italic" text-anchor="middle">Castanea sativa</text>
        <text x="760" y="315" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">Paprsky nerozlišitelné,</text>
        <text x="760" y="327" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">letní světlé plaménky.</text>
        <text x="760" y="339" fill="#e6fbf3" font-family="sans-serif" font-size="9" text-anchor="middle">Jádro hnědé.</text>
      `;
    } else {
      title = "urcovaci-klic-roztrousene-porovite";
      svgContent = `
        <rect width="1020" height="540" fill="#faf9f6" rx="16" />
        <rect x="20" y="20" width="980" height="50" fill="#292524" rx="8" />
        <text x="510" y="52" fill="white" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">URČOVACÍ KLÍČ: ROZTROUŠENĚ PÓROVITÉ LISTNÁČE</text>
        
        <!-- Legend -->
        <circle cx="45" cy="505" r="6" fill="#047857" />
        <text x="60" y="509" fill="#44403c" font-family="sans-serif" font-size="11" font-weight="bold">Výsledná dřevina</text>
        <rect x="200" y="497" width="14" height="14" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" />
        <text x="225" y="509" fill="#44403c" font-family="sans-serif" font-size="11" font-weight="bold">Určující znak / Vlastnost</text>

        <!-- Root node -->
        <rect x="260" y="90" width="500" height="70" fill="#292524" rx="8" stroke="#1c1917" stroke-width="2" />
        <text x="510" y="112" fill="#d6d3d1" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle" letter-spacing="1">ROD: ROZTROUŠENĚ PÓROVITÝ LISTNÁČ</text>
        <text x="510" y="132" fill="white" font-family="sans-serif" font-size="11" text-anchor="middle">Málo výrazná kresba letokruhů; nelze odlišit jarní/letní dřevo;</text>
        <text x="510" y="146" fill="white" font-family="sans-serif" font-size="11" text-anchor="middle">cévy nejsou zpravidla viditelné pouhým okem.</text>

        <!-- Connectors Level 1 -->
        <path d="M 510,160 L 510,180" stroke="#78716c" stroke-width="1.5" fill="none" />
        <path d="M 510,180 L 160,180 L 160,195" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        <path d="M 510,180 L 620,180 L 620,195" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />

        <!-- Decision Boxes -->
        <rect x="50" y="195" width="220" height="30" fill="white" stroke="#f59e0b" stroke-width="2" rx="6" />
        <text x="160" y="214" fill="#78350f" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">jádro dobře rozlišitelné</text>

        <rect x="490" y="195" width="260" height="30" fill="white" stroke="#f59e0b" stroke-width="2" rx="6" />
        <text x="620" y="214" fill="#78350f" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">bez jádra (či špatně rozlišitelné)</text>

        <!-- Jádroví -->
        <path d="M 160,225 L 160,240 L 70,240 L 70,255" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        <path d="M 160,225 L 160,240 L 175,240 L 175,255" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        <path d="M 160,225 L 160,240 L 280,240 L 280,255" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />

        <rect x="20" y="255" width="100" height="70" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="70" y="275" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">OŘECH</text>
        <text x="70" y="285" fill="#a7f3d0" font-family="sans-serif" font-size="7" font-style="italic" text-anchor="middle">Juglans regia</text>
        <text x="70" y="302" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Jádro šedočerné,</text>
        <text x="70" y="312" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">cévy viditelné.</text>

        <rect x="125" y="255" width="100" height="70" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="175" y="275" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">ŠVESTKA</text>
        <text x="175" y="285" fill="#a7f3d0" font-family="sans-serif" font-size="7" font-style="italic" text-anchor="middle">P. domestica</text>
        <text x="175" y="302" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Hnědočervené,</text>
        <text x="175" y="312" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">fialový tón.</text>

        <rect x="230" y="255" width="100" height="70" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="280" y="275" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">TŘEŠEŇ</text>
        <text x="280" y="285" fill="#a7f3d0" font-family="sans-serif" font-size="7" font-style="italic" text-anchor="middle">Prunus avium</text>
        <text x="280" y="302" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Jádro červenohnědé,</text>
        <text x="280" y="312" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">pruhované dříví.</text>

        <path d="M 620,225 L 620,240 L 460,240 L 460,255" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />
        <path d="M 620,225 L 620,240 L 760,240 L 760,255" stroke="#78716c" stroke-width="1.5" fill="none" marker-end="url(#arrow)" />

        <rect x="370" y="255" width="180" height="30" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2" rx="6" />
        <text x="460" y="274" fill="#78350f" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">paprsky viditelné všude</text>

        <rect x="650" y="255" width="220" height="30" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.2" rx="6" />
        <text x="760" y="274" fill="#78350f" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">paprsky pouze na radiálu/nerozlišitelné</text>

        <!-- Paprsky všude -->
        <path d="M 460,285 L 460,300 M 460,300 L 390,300 L 390,315" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />
        <path d="M 460,300 L 460,315" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />
        <path d="M 460,300 L 530,300 L 530,315" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />

        <rect x="350" y="315" width="80" height="65" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="390" y="333" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">BUK</text>
        <text x="390" y="343" fill="#a7f3d0" font-family="sans-serif" font-size="7" font-style="italic" text-anchor="middle">F. sylvatica</text>
        <text x="390" y="358" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Čárky na T-řezu.</text>

        <rect x="420" y="315" width="80" height="65" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="460" y="333" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">HABR</text>
        <text x="460" y="343" fill="#a7f3d0" font-family="sans-serif" font-size="7" font-style="italic" text-anchor="middle">C. betulus</text>
        <text x="460" y="358" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Zvlněné letokruhy.</text>

        <rect x="510" y="315" width="80" height="65" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="550" y="333" fill="white" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">OLŠE</text>
        <text x="550" y="343" fill="#a7f3d0" font-family="sans-serif" font-size="7" font-style="italic" text-anchor="middle">Alnus</text>
        <text x="550" y="358" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Oranžové dřevo.</text>

        <!-- Paprsky pouze radiálu -->
        <path d="M 760,285 L 760,300 M 760,300 L 675,300 L 675,315" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />
        <path d="M 760,300 L 845,300 L 845,315" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />

        <rect x="620" y="315" width="110" height="25" fill="#f5f5f4" stroke="#d6d3d1" stroke-width="1.2" rx="4" />
        <text x="675" y="331" fill="#57534e" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle">okem nerozlišitelné</text>

        <rect x="790" y="315" width="110" height="25" fill="#f5f5f4" stroke="#d6d3d1" stroke-width="1.2" rx="4" />
        <text x="845" y="331" fill="#57534e" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle">pouze na radiálním řezu</text>

        <path d="M 675,340 L 675,370" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />

        <rect x="615" y="370" width="120" height="65" fill="#059669" rx="8" stroke="#047857" stroke-width="1" />
        <text x="675" y="388" fill="white" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">TOPOL / VRBA</text>
        <text x="675" y="398" fill="#a7f3d0" font-family="sans-serif" font-size="6" font-style="italic" text-anchor="middle">Populus / Salix</text>
        <text x="675" y="413" fill="#e6fbf3" font-family="sans-serif" font-size="8" text-anchor="middle">Bělošedé dřevo, lehké.</text>

        <path d="M 845,340 L 845,360" stroke="#78716c" stroke-width="1.2" fill="none" />
        <path d="M 845,360 L 760,360 L 760,375" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />
        <path d="M 845,360 L 820,360 L 820,375" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />
        <path d="M 845,360 L 880,360 L 880,375" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />
        <path d="M 845,360 L 940,360 L 940,375" stroke="#78716c" stroke-width="1.2" fill="none" marker-end="url(#arrow)" />

        <rect x="730" y="375" width="55" height="60" fill="#059669" rx="6" stroke="#047857" stroke-width="1" />
        <text x="757.5" y="393" fill="white" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle">LÍPA</text>
        <text x="757.5" y="413" fill="#e6fbf3" font-family="sans-serif" font-size="7" text-anchor="middle">Matné, lehké.</text>

        <rect x="790" y="375" width="55" height="60" fill="#059669" rx="6" stroke="#047857" stroke-width="1" />
        <text x="817.5" y="393" fill="white" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle">HRUŠKA</text>
        <text x="817.5" y="413" fill="#e6fbf3" font-family="sans-serif" font-size="7" text-anchor="middle">Narůžovělé.</text>

        <rect x="850" y="375" width="55" height="60" fill="#059669" rx="6" stroke="#047857" stroke-width="1" />
        <text x="877.5" y="393" fill="white" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle">BŘÍZA</text>
        <text x="877.5" y="413" fill="#e6fbf3" font-family="sans-serif" font-size="7" text-anchor="middle">Tečky na čele.</text>

        <rect x="910" y="375" width="55" height="60" fill="#059669" rx="6" stroke="#047857" stroke-width="1" />
        <text x="937.5" y="393" fill="white" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle">JAVOR</text>
        <text x="937.5" y="413" fill="#e6fbf3" font-family="sans-serif" font-size="7" text-anchor="middle">Bílé, lesklé.</text>
      `;
    }

    const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${activeSchemaTab === 'conifers' ? 800 : activeSchemaTab === 'ringPorous' ? 900 : 1020}" height="${activeSchemaTab === 'conifers' ? 520 : activeSchemaTab === 'ringPorous' ? 530 : 540}">${defs}${svgContent}</svg>`;
    const blob = new Blob([fullSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    dragStartRef.current = {
      x: e.pageX,
      y: e.pageY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop,
      isDragging: false
    };
    setIsDraggingState(false);
    containerRef.current.style.cursor = 'grabbing';
    containerRef.current.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || containerRef.current.style.cursor !== 'grabbing') return;
    const dx = e.pageX - dragStartRef.current.x;
    const dy = e.pageY - dragStartRef.current.y;

    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
      dragStartRef.current.isDragging = true;
      setIsDraggingState(true);
    }

    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
    containerRef.current.scrollTop = dragStartRef.current.scrollTop - dy;
  };

  const handleMouseUpOrLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.cursor = 'grab';
    containerRef.current.style.removeProperty('user-select');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    dragStartRef.current = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop,
      isDragging: false
    };
    setIsDraggingState(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const dx = e.touches[0].pageX - dragStartRef.current.x;
    const dy = e.touches[0].pageY - dragStartRef.current.y;

    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
      dragStartRef.current.isDragging = true;
      setIsDraggingState(true);
    }

    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
    containerRef.current.scrollTop = dragStartRef.current.scrollTop - dy;
  };

  const handleTouchEnd = () => {
    // Touch complete
  };

  const handleSpeciesClick = (speciesId: string) => {
    if (dragStartRef.current.isDragging || isDraggingState) {
      return;
    }
    if (onSelectSpecies) {
      onSelectSpecies(speciesId);
    }
  };

  return (
    <div id="interactive-schemas-container" className="bg-white border border-stone-200 rounded-2xl shadow-xs p-6 space-y-6">
      {/* Description Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-100 pb-5 gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
            <Trees className="w-5 h-5 text-emerald-600" />
            Interaktivní schémata určovacího klíče
          </h3>
          <p className="text-xs text-stone-500 max-w-2xl leading-relaxed">
            Kompletní transformace papírového <strong>Klíče k určování dřeva LDF MENDELU</strong> do digitálních schémat.
            Kliknutím na finální dřevinu můžete okamžitě zobrazit její detailní vlastnosti v atlasu.
          </p>
        </div>

        {/* Legend & Download Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono font-medium text-stone-500 bg-stone-50 p-2 rounded-xl border border-stone-150 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-500/10 border border-amber-500" />
              <span>Vlastnosti / Mezistupně</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-600 text-white" />
              <span>Výsledná dřevina</span>
            </div>
          </div>

          <button
            onClick={downloadSchemaAsSvg}
            id="download-schema-svg-btn"
            className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl transition-all cursor-pointer font-bold font-sans text-xs shadow-3xs hover:shadow-2xs active:scale-98"
            title="Stáhnout toto schéma jako vektorové SVG"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Stáhnout schéma (SVG)</span>
          </button>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="flex overflow-x-auto pb-1 gap-1 border-b border-stone-100 font-mono text-xs">
        <button
          onClick={() => setActiveSchemaTab('conifers')}
          className={`px-4 py-2.5 rounded-t-xl font-bold transition-all shrink-0 border-b-2 cursor-pointer ${
            activeSchemaTab === 'conifers'
              ? 'border-emerald-600 text-emerald-800 bg-emerald-50/20'
              : 'border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          🌲 Jehličnany
        </button>
        <button
          onClick={() => setActiveSchemaTab('ringPorous')}
          className={`px-4 py-2.5 rounded-t-xl font-bold transition-all shrink-0 border-b-2 cursor-pointer ${
            activeSchemaTab === 'ringPorous'
              ? 'border-emerald-600 text-emerald-800 bg-emerald-50/20'
              : 'border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          🍂 Kruhovitě pórovité listnáče
        </button>
        <button
          onClick={() => setActiveSchemaTab('diffusePorous')}
          className={`px-4 py-2.5 rounded-t-xl font-bold transition-all shrink-0 border-b-2 cursor-pointer ${
            activeSchemaTab === 'diffusePorous'
              ? 'border-emerald-600 text-emerald-800 bg-emerald-50/20'
              : 'border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          🍃 Roztroušeně pórovité listnáče
        </button>
      </div>

      {/* View area representing the flowcharts */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="overflow-auto w-full pt-4 min-h-[500px] cursor-grab select-none active:cursor-grabbing"
      >
        
        {/* TAB 1: CONIFERS (JEHLIČNANY) */}
        {activeSchemaTab === 'conifers' && (
          <div className="min-w-[780px] pb-6 relative text-stone-800 font-sans">
            {/* SVG connectors layer underneath the boxes */}
            <svg 
              className="absolute inset-0 pointer-events-none" 
              width="100%" 
              height="100%" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connectors for Tree structure */}
              {/* Center Root down into branches */}
              <path d="M 400,82 L 400,105" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 400,105 L 200,105 L 200,125" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 400,105 L 600,105 L 600,125" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />

              {/* Arrowheads */}
              <polygon points="200,125 197,120 203,120" fill="#a3a3a3" />
              <polygon points="600,125 597,120 603,120" fill="#a3a3a3" />

              {/* Branch s jádrem to leaves */}
              <path d="M 200,165 L 200,185 L 120,185 L 120,205" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 200,165 L 200,185 L 280,185 L 280,205" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <polygon points="120,205 117,200 123,200" fill="#a3a3a3" />
              <polygon points="280,205 277,200 283,200" fill="#a3a3a3" />

              {/* s pryskyřičnými kanálky (x:120, y:245) to 4 final trees */}
              <path d="M 120,245 L 120,270" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 120,270 L 60,270 L 60,290" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 120,270 L 162,270 L 162,290" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 120,270 L 260,270 L 260,290" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 120,270 L 358,270 L 358,290" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />

              <polygon points="60,290 57,285 63,285" fill="#a3a3a3" />
              <polygon points="162,290 159,285 165,285" fill="#a3a3a3" />
              <polygon points="260,290 257,285 263,285" fill="#a3a3a3" />
              <polygon points="358,290 355,285 361,285" fill="#a3a3a3" />

              {/* bez pryskyřičných kanálků (x:280) to Tis */}
              <path d="M 280,245 L 280,270 L 465,270 L 465,290" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <polygon points="465,290 462,285 468,285" fill="#a3a3a3" />

              {/* Branch bez jádra to Smrk and Jedle */}
              <path d="M 600,165 L 600,185 L 520,185 L 520,205" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 600,165 L 600,185 L 680,185 L 680,205" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <polygon points="520,205 517,200 523,200" fill="#a3a3a3" />
              <polygon points="680,205 677,200 683,200" fill="#a3a3a3" />

              {/* s pryskyřičnými (x:520, y:245) to SMRK */}
              <path d="M 520,245 L 520,270 L 575,270 L 575,290" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <polygon points="575,290 572,285 578,285" fill="#a3a3a3" />

              {/* bez pryskyřičných (x:680, y:245) to JEDLE */}
              <path d="M 680,245 L 680,290" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <polygon points="680,290 677,285 683,285" fill="#a3a3a3" />
            </svg>

            {/* Hierarchical elements floating over the SVG connectors */}
            <div className="relative z-10">
              {/* Root Node */}
              <div className="absolute left-[180px] top-0 w-[440px] bg-emerald-800 text-white rounded-xl shadow-xs p-3 text-center border-2 border-emerald-950">
                <h4 className="font-extrabold text-[11px] font-mono tracking-widest text-emerald-200">ROD: JEHLIČNAN</h4>
                <p className="text-[10px] opacity-90 leading-tight mt-1">
                  Výrazná kresba letokruhů; dobře odlišitelné jarní a letní dřevo; zpravidla rovnovlákná textura; dřeňové paprsky nejsou okem viditelné; možný výskyt pryskyřičných kanálků.
                </p>
              </div>

              {/* Level 1: s jádrem, bez jádra */}
              <div className="absolute left-[120px] top-[125px] w-[160px] bg-white border-2 border-amber-500 rounded-lg p-1.5 shadow-2xs text-center font-bold text-xs">
                s jádrem
              </div>
              <div className="absolute left-[520px] top-[125px] w-[160px] bg-white border-2 border-amber-500 rounded-lg p-1.5 shadow-2xs text-center font-bold text-xs">
                bez jádra
              </div>

              {/* Level 2: s pryskyřičnými kanálky, bez pryskyřičných kanálků */}
              <div className="absolute left-[40px] top-[205px] w-[160px] bg-amber-50 border border-amber-300 rounded-lg p-1.5 text-center text-[11px] font-medium text-amber-900">
                s pryskyřičnými kanálky
              </div>
              <div className="absolute left-[200px] top-[205px] w-[160px] bg-amber-50 border border-amber-300 rounded-lg p-1.5 text-center text-[11px] font-medium text-amber-900">
                bez pryskyřičných kanálků
              </div>

              <div className="absolute left-[440px] top-[205px] w-[160px] bg-amber-50 border border-amber-300 rounded-lg p-1.5 text-center text-[11px] font-medium text-amber-900">
                s pryskyřičnými kanálky
              </div>
              <div className="absolute left-[600px] top-[205px] w-[160px] bg-amber-50 border border-amber-300 rounded-lg p-1.5 text-center text-[11px] font-medium text-amber-900">
                bez pryskyřičných kanálků
              </div>

              {/* Bottom Layer: Outputs / Final Species */}
              {/* Borovice */}
              <div 
                onClick={() => handleSpeciesClick('borovice_lesni')}
                className="absolute left-[15px] top-[290px] w-[90px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1.5 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">BOROVICE</div>
                <div className="text-[7px] text-emerald-100 font-mono italic mt-0.5">P. sylvestris</div>
                <div className="text-[8px] bg-emerald-700/60 rounded px-1 py-0.5 mt-1 text-left select-none text-emerald-100 leading-3 scale-95 origin-center">
                  Široká běl, jádro hnědočervené, kanálky viditelné.
                </div>
              </div>

              {/* Vejmutovka */}
              <div 
                onClick={() => handleSpeciesClick('borovice_vejmutovka')}
                className="absolute left-[115px] top-[290px] w-[95px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1.5 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">VEJMUTOVKA</div>
                <div className="text-[7px] text-emerald-100 font-mono italic mt-0.5">Pinus strobus</div>
                <div className="text-[8px] bg-emerald-700/60 rounded px-1 py-0.5 mt-1 text-left select-none text-emerald-100 leading-3 scale-95 origin-center">
                  Žlutohnědé jádro, špatně odlišitelné běl, lehké.
                </div>
              </div>

              {/* Modřín */}
              <div 
                onClick={() => handleSpeciesClick('modrin')}
                className="absolute left-[215px] top-[290px] w-[90px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1.5 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">MODŘÍN</div>
                <div className="text-[7px] text-emerald-100 font-mono italic mt-0.5">Larix decidua</div>
                <div className="text-[8px] bg-emerald-700/60 rounded px-1 py-0.5 mt-1 text-left select-none text-emerald-100 leading-3 scale-95 origin-center">
                  Úzká běl, jádro hnědočervené. Kanálky v podélných řezích.
                </div>
              </div>

              {/* Douglaska */}
              <div 
                onClick={() => handleSpeciesClick('douglaska')}
                className="absolute left-[310px] top-[290px] w-[95px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1.5 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">DOUGLASKA</div>
                <div className="text-[7px] text-emerald-100 font-mono italic mt-0.5">P. menziesii</div>
                <div className="text-[8px] bg-emerald-700/60 rounded px-1 py-0.5 mt-1 text-left select-none text-emerald-100 leading-3 scale-95 origin-center">
                  Úzká běl, jádro červenohnědé. Široké letní dřevo.
                </div>
              </div>

              {/* Tis */}
              <div 
                onClick={() => handleSpeciesClick('tis')}
                className="absolute left-[420px] top-[290px] w-[90px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1.5 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">TIS</div>
                <div className="text-[7px] text-emerald-100 font-mono italic mt-0.5">Taxus baccata</div>
                <div className="text-[8px] bg-emerald-700/60 rounded px-1 py-0.5 mt-1 text-left select-none text-emerald-100 leading-3 scale-95 origin-center">
                  Úzká běl, tmavé těžké pevné dřevo bez kanálků.
                </div>
              </div>

              {/* Smrk */}
              <div 
                onClick={() => handleSpeciesClick('smrk')}
                className="absolute left-[530px] top-[290px] w-[90px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1.5 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">SMRK</div>
                <div className="text-[7px] text-emerald-100 font-mono italic mt-0.5">Picea abies</div>
                <div className="text-[8px] bg-emerald-700/60 rounded px-1 py-0.5 mt-1 text-left select-none text-emerald-100 leading-3 scale-95 origin-center">
                  Bez jádra. Žlutobílé, málo zřetelné pryskyřičné kanálky.
                </div>
              </div>

              {/* Jedle */}
              <div 
                onClick={() => handleSpeciesClick('jedle')}
                className="absolute left-[635px] top-[290px] w-[90px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1.5 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">JEDLE</div>
                <div className="text-[7px] text-emerald-100 font-mono italic mt-0.5">Abies alba</div>
                <div className="text-[8px] bg-emerald-700/60 rounded px-1 py-0.5 mt-1 text-left select-none text-emerald-100 leading-3 scale-95 origin-center">
                  Bez jádra a zcela bez pryskyřičných kanálků.
                </div>
              </div>
            </div>
            
            <div className="h-[430px]" /> {/* Spacer container to preserve absolute children */}
          </div>
        )}

        {/* TAB 2: RING POROUS HARDWOODS (KRUHOVITĚ PÓROVITÉ LISTNÁČE) */}
        {activeSchemaTab === 'ringPorous' && (
          <div className="min-w-[880px] pb-6 relative text-stone-800 font-sans">
            <svg 
              className="absolute inset-0 pointer-events-none" 
              width="100%" 
              height="100%" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Center Root down to 3 main branches */}
              <path d="M 440,82 L 440,105" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 440,105 L 110,105 L 110,125" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 440,105 L 440,125" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 440,105 L 762.5,105 L 762.5,125" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />

              <polygon points="110,125 107,120 113,120" fill="#a3a3a3" />
              <polygon points="440,125 437,120 443,120" fill="#a3a3a3" />
              <polygon points="762.5,125 759.5,120 765.5,120" fill="#a3a3a3" />

              {/* dřeňové paprsky viditelné na všech řezech to Dub */}
              <path d="M 110,175 L 110,230" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <polygon points="110,230 107,225 113,225" fill="#a3a3a3" />

              {/* Connecting Dub to Dub Červený under same branch */}
              <path d="M 110,320 L 110,360" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <polygon points="110,360 107,355 113,355" fill="#a3a3a3" />

              {/* dřeňové paprsky pouze na radiálním řezu to 3 options (Akát, Jilm, Jasan) */}
              <path d="M 440,175 L 440,195" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 440,195 L 292.5,195 L 292.5,260" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 440,195 L 440,260" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 440,195 L 587.5,195 L 587.5,260" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />

              <polygon points="292.5,260 289.5,255 295.5,255" fill="#a3a3a3" />
              <polygon points="440,260 437,255 443,255" fill="#a3a3a3" />
              <polygon points="587.5,260 584.5,255 590.5,255" fill="#a3a3a3" />

              {/* dřeňové paprsky okem nerozlišitelné (x:762.5) to Kastanovnik */}
              <path d="M 762.5,175 L 762.5,230" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />

              <polygon points="762.5,230 759.5,225 765.5,225" fill="#a3a3a3" />
            </svg>

            {/* Float container boxes */}
            <div className="relative z-10">
              {/* Root Node */}
              <div className="absolute left-[190px] top-0 w-[500px] bg-amber-800 text-white rounded-xl shadow-xs p-3 text-center border-2 border-amber-950">
                <h4 className="font-extrabold text-[11px] font-mono tracking-widest text-amber-200">ROD: KRUHOVITĚ PÓROVITÝ LISTNÁČ</h4>
                <p className="text-[10px] opacity-90 leading-tight mt-1">
                  Složitější textura; výrazná kresba letokruhů; póry viditelné pouhým okem; na příčném řezu póry uspořádané v řadě podél hranice letokruhu; dřeňové paprsky většinou zřetné na některém z řezů.
                </p>
              </div>

              {/* Level 1 Decisions */}
              <div className="absolute left-[20px] top-[125px] w-[180px] bg-white border-2 border-amber-500 rounded-lg p-2 shadow-2xs text-[11px] text-center font-bold">
                dřeňové paprsky viditelné na všech řezech
              </div>
              <div className="absolute left-[340px] top-[125px] w-[200px] bg-white border-2 border-amber-500 rounded-lg p-2 shadow-2xs text-[11px] text-center font-bold">
                dřeňové paprsky pouze na radiálním řezu
              </div>
              <div className="absolute left-[675px] top-[125px] w-[175px] bg-white border-2 border-amber-500 rounded-lg p-2 shadow-2xs text-[11px] text-center font-bold">
                dřeňové paprsky okem nerozlišitelné
              </div>

              {/* Dub */}
              <div 
                onClick={() => handleSpeciesClick('dub')}
                className="absolute left-[20px] top-[230px] w-[180px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-xl p-3 shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-sm tracking-tight flex items-center justify-between">
                  <span>DUB</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-700 font-mono">Quercus</span>
                </div>
                <p className="text-[10px] text-emerald-100 mt-1.5 leading-relaxed bg-emerald-700/30 p-1.5 rounded">
                  V letním dřevě světlé plaménky, jádro hnědé, tvrdé, excelentní odolné dřevo.
                </p>
              </div>

              {/* Akát */}
              <div 
                onClick={() => handleSpeciesClick('akat')}
                className="absolute left-[225px] top-[260px] w-[135px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-xl p-2.5 shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-xs tracking-tight">AKÁT</div>
                <div className="text-[8px] text-emerald-100 font-mono italic mt-0.5">Robinia pseudoacacia</div>
                <p className="text-[9px] text-emerald-100 mt-1 hover:text-white">
                  Světlé tečky v letním dřevě, jádro žlutozelené, extrémně těžké a velmi tvrdé dřevo.
                </p>
              </div>

              {/* Jilm */}
              <div 
                onClick={() => handleSpeciesClick('jilm')}
                className="absolute left-[372.5px] top-[260px] w-[135px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-xl p-2.5 shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-xs tracking-tight">JILM</div>
                <div className="text-[8px] text-emerald-100 font-mono italic mt-0.5">Ulmus</div>
                <p className="text-[9px] text-emerald-100 mt-1 hover:text-white">
                  Světlé vlnkování v letním dřevě, jádro čokoládově hnědé.
                </p>
              </div>

              {/* Jasan */}
              <div 
                onClick={() => handleSpeciesClick('jasan_ztepily')}
                className="absolute left-[520px] top-[260px] w-[135px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-xl p-2.5 shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-xs tracking-tight">JASAN</div>
                <div className="text-[8px] text-emerald-100 font-mono italic mt-0.5">Fraxinus excelsior</div>
                <p className="text-[9px] text-emerald-100 mt-1 hover:text-white">
                  Barva bělavá, výrazné letokruhy. Jádro hnědé jen u velmi starých stromů.
                </p>
              </div>

              {/* Kastanovnik */}
              <div 
                onClick={() => handleSpeciesClick('kastanovnik')}
                className="absolute left-[680px] top-[230px] w-[165px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-xl p-2.5 shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-xs tracking-tight">KAŠTANOVNÍK</div>
                <div className="text-[8px] text-emerald-100 font-mono italic mt-0.5">Castanea sativa</div>
                <p className="text-[9px] text-emerald-100 mt-1 hover:text-white">
                  Dřeňové paprsky nerozlišitelné. V letním dřevě světlé plaménky, jádro hnědé.
                </p>
              </div>

              {/* Dub Cerveny */}
              <div 
                onClick={() => handleSpeciesClick('dub_cerveny')}
                className="absolute left-[20px] top-[360px] w-[180px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-xl p-3 shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-xs tracking-tight">DUB ČERVENÝ</div>
                <div className="text-[8px] text-emerald-100 font-mono italic mt-0.5">Quercus rubra</div>
                <p className="text-[9px] text-emerald-100 mt-1 hover:text-white">
                  Letní dřevo: světlé plaménky, jádro načervenalé / červenohnědé. Méně kontrastní přechod jarního a letního dřeva než u dubu zimního/letního.
                </p>
              </div>
            </div>

            <div className="h-[500px]" /> {/* Spacer container to preserve absolute children */}
          </div>
        )}

        {/* TAB 3: DIFFUSE POROUS HARDWOODS (ROZTROUŠENĚ PÓROVITÉ LISTNÁČE) */}
        {activeSchemaTab === 'diffusePorous' && (
          <div className="min-w-[1020px] pb-6 relative text-stone-800 font-sans">
            <svg 
              className="absolute inset-0 pointer-events-none" 
              width="100%" 
              height="100%" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Center Root down to 2 branches */}
              <path d="M 440,82 L 440,105" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 440,105 L 150,105 L 150,125" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 440,105 L 610,105 L 610,125" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />

              <polygon points="150,125 147,120 153,120" fill="#a3a3a3" />
              <polygon points="610,125 607,120 613,120" fill="#a3a3a3" />

              {/* jádro dobře rozlišitelné splits into Orech, Svestka, Tresen */}
              <path d="M 150,165 L 150,185 L 70,185 L 70,205" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 150,165 L 150,185 L 185,185 L 185,205" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 150,165 L 150,185 L 300,185 L 300,205" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />

              <polygon points="70,205 67,200 73,200" fill="#a3a3a3" />
              <polygon points="185,205 182,200 188,200" fill="#a3a3a3" />
              <polygon points="300,205 297,200 303,200" fill="#a3a3a3" />

              {/* bez jádra splits into 'dřeňové paprsky viditelné všude' vs 'pouze radiální/nerozlišitelné' */}
              <path d="M 610,165 L 610,185 L 460,185 L 460,205" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 610,165 L 610,185 L 725,185 L 725,205" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />

              <polygon points="460,205 457,200 463,200" fill="#a3a3a3" />
              <polygon points="725,205 722,200 728,200" fill="#a3a3a3" />

              {/* dřeňové paprsky viditelné na všech řezech (x:460) splits -> Buk, Habr, Olse */}
              <path d="M 460,245 L 460,265" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 460,265 L 370,265 L 370,290" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 460,265 L 460,290" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 460,265 L 550,265 L 550,290" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />

              <polygon points="370,290 367,285 373,285" fill="#a3a3a3" />
              <polygon points="460,290 457,285 463,285" fill="#a3a3a3" />
              <polygon points="550,290 547,285 553,285" fill="#a3a3a3" />

              {/* 'paprsky pouze na radialu nebo nerozlisitelne' (x:725) splits -> Topol/Vrba vs 4 others */}
              <path d="M 725,245 L 725,260" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 725,260 L 655,260 L 655,280" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 725,260 L 800,260 L 800,280" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />

              <polygon points="655,280 652,275 658,275" fill="#a3a3a3" />
              <polygon points="800,280 797,275 803,275" fill="#a3a3a3" />

              {/* Arrow from Nerozlišitelné to Topol/Vrba */}
              <path d="M 655,315 L 655,355" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <polygon points="655,355 652,350 658,350" fill="#a3a3a3" />

              {/* under 'dřeňové paprsky na radiálním řezu' (x:800) splits to 4 trees at bottom: Lípa, Hruška, Bříza, Javor */}
              <path d="M 800,315 L 800,335" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 800,335 L 760,335 L 760,355" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 800,335 L 825,335 L 825,355" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 800,335 L 890,335 L 890,355" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />
              <path d="M 800,335 L 955,335 L 955,355" stroke="#a3a3a3" strokeWidth="1.5" fill="none" />

              <polygon points="760,355 757,350 763,350" fill="#a3a3a3" />
              <polygon points="825,355 822,350 828,350" fill="#a3a3a3" />
              <polygon points="890,355 887,350 893,350" fill="#a3a3a3" />
              <polygon points="955,355 952,350 958,350" fill="#a3a3a3" />
            </svg>

            {/* Float container boxes */}
            <div className="relative z-10">
              {/* Root */}
              <div className="absolute left-[190px] top-0 w-[500px] bg-stone-800 text-white rounded-xl shadow-xs p-3 text-center border-2 border-stone-950">
                <h4 className="font-extrabold text-[11px] font-mono tracking-widest text-stone-200">ROD: ROZTROUŠENĚ PÓROVITÝ LISTNÁČ</h4>
                <p className="text-[10px] opacity-90 leading-tight mt-1">
                  Málo výrazná kresba letokruhů; nelze odlišit jarní dřevo od letního; cévy nejsou zpravidla viditelné pouhým okem; pokud ano, pak chybí uspořádání pórů podél hranice letokruhů.
                </p>
              </div>

              {/* Level 1 branches */}
              <div className="absolute left-[40px] top-[125px] w-[220px] bg-white border-2 border-amber-500 rounded-lg p-1.5 shadow-2xs text-[11px] text-center font-bold">
                jádro dobře rozlišitelné
              </div>
              <div className="absolute left-[480px] top-[125px] w-[260px] bg-white border-2 border-amber-500 rounded-lg p-1.5 shadow-2xs text-[11px] text-center font-bold">
                bez jádra (nebo špatně rozlišitelné)
              </div>

              {/* Jádroví: Orech, Svestka, Tresen */}
              <div 
                onClick={() => handleSpeciesClick('orech')}
                className="absolute left-[20px] top-[205px] w-[100px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-2 shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">OŘECH</div>
                <div className="text-[7px] text-emerald-100 font-mono italic">Juglans regia</div>
                <div className="text-[8px] opacity-95 text-emerald-100 mt-1 leading-tight select-none">
                  Jádro šedočerné, cévy viditelné okem.
                </div>
              </div>

              <div 
                onClick={() => handleSpeciesClick('svestka')}
                className="absolute left-[135px] top-[205px] w-[100px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-2 shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">ŠVESTKA</div>
                <div className="text-[7px] text-emerald-100 font-mono italic">Prunus domestica</div>
                <div className="text-[8px] opacity-95 text-emerald-100 mt-1 leading-tight select-none">
                  Jádro tmavě hnědočervené, fialový tón.
                </div>
              </div>

              <div 
                onClick={() => handleSpeciesClick('tresen')}
                className="absolute left-[250px] top-[205px] w-[100px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-2 shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">TŘEŠEŇ</div>
                <div className="text-[7px] text-emerald-100 font-mono italic">Prunus avium</div>
                <div className="text-[8px] opacity-95 text-emerald-100 mt-1 leading-tight select-none">
                  Jádro červenohnědé, pruhované.
                </div>
              </div>

              {/* Bez jádra branch splits */}
              <div className="absolute left-[370px] top-[205px] w-[180px] bg-amber-50 border border-amber-300 rounded-lg p-1.5 text-center text-[10px] font-bold text-amber-900 leading-tight">
                dřeňové paprsky viditelné na všech řezech
              </div>
              <div className="absolute left-[600px] top-[205px] w-[250px] bg-amber-50 border border-amber-300 rounded-lg p-1.5 text-center text-[10px] font-bold text-amber-900 leading-tight">
                paprsky pouze na radiálu / okem nerozlišitelné
              </div>

              {/* Viditelné na všech řezech: Buk, Habr, Olše */}
              <div 
                onClick={() => handleSpeciesClick('buk')}
                className="absolute left-[330px] top-[290px] w-[80px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1.5 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">BUK</div>
                <div className="text-[7px] text-emerald-100 font-mono">F. sylvatica</div>
                <div className="text-[8px] opacity-90 text-emerald-100 leading-none mt-1 select-none">Vřetenovité čárky na T-řezu.</div>
              </div>

              <div 
                onClick={() => handleSpeciesClick('habr')}
                className="absolute left-[420px] top-[290px] w-[80px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1.5 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">HABR</div>
                <div className="text-[7px] text-emerald-100 font-mono">C. betulus</div>
                <div className="text-[8px] opacity-90 text-emerald-100 leading-none mt-1 select-none">Zvlněné letokruhy, šedobílé.</div>
              </div>

              <div 
                onClick={() => handleSpeciesClick('olse')}
                className="absolute left-[510px] top-[290px] w-[80px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1.5 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">OLŠE</div>
                <div className="text-[7px] text-emerald-100 font-mono">Alnus</div>
                <div className="text-[8px] opacity-90 text-emerald-100 leading-none mt-1 select-none">Oranžové zbarvení, měkké, lehké.</div>
              </div>

              {/* Nerozlišitelné vs Pouze na radiálu */}
              <div className="absolute left-[600px] top-[280px] w-[110px] bg-stone-100 border border-stone-300 rounded p-1 text-center text-[9px] font-bold text-stone-600">
                paprsky okem nerozlišitelné
              </div>
              <div className="absolute left-[730px] top-[280px] w-[140px] bg-stone-100 border border-stone-300 rounded p-1 text-center text-[9px] font-bold text-stone-600">
                paprsky viditelné pouze na radiálním řezu
              </div>

              {/* Topol/Vrba */}
              <div 
                onClick={() => handleSpeciesClick('topol')}
                className="absolute left-[595px] top-[355px] w-[120px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-2 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[10px] tracking-tight">TOPOL / VRBA</div>
                <div className="text-[7px] text-emerald-100 font-mono">Populus / Salix</div>
                <div className="text-[8px] text-emerald-50 mt-1 leading-tight select-none">Žlutohnědé s červeným nádechem, lehké.</div>
              </div>

              {/* Lípa */}
              <div 
                onClick={() => handleSpeciesClick('lipa')}
                className="absolute left-[730px] top-[355px] w-[60px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[9px] tracking-tight">LÍPA</div>
                <div className="text-[6px] text-emerald-100 font-mono">Tilia</div>
                <div className="text-[7px] text-emerald-50 leading-none mt-1 select-none">Bělavé, matné, lehké.</div>
              </div>

              {/* Hruška */}
              <div 
                onClick={() => handleSpeciesClick('hruska')}
                className="absolute left-[795px] top-[355px] w-[60px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[9px] tracking-tight">HRUŠKA</div>
                <div className="text-[6px] text-emerald-100 font-mono">Pyrus</div>
                <div className="text-[7px] text-emerald-50 leading-none mt-1 select-none">Narůžovělé dříví, skvrny.</div>
              </div>

              {/* Bříza */}
              <div 
                onClick={() => handleSpeciesClick('briza')}
                className="absolute left-[860px] top-[355px] w-[60px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[9px] tracking-tight">BŘÍZA</div>
                <div className="text-[6px] text-emerald-100 font-mono">Betula</div>
                <div className="text-[7px] text-emerald-50 leading-none mt-1 select-none">Tečky na příčném řezu.</div>
              </div>

              {/* Javor */}
              <div 
                onClick={() => handleSpeciesClick('javor')}
                className="absolute left-[925px] top-[355px] w-[60px] bg-emerald-600 hover:bg-emerald-700 hover:scale-105 border border-emerald-700 text-white rounded-lg p-1 text-center shadow-xs cursor-pointer transition-all"
              >
                <div className="font-extrabold text-[9px] tracking-tight">JAVOR</div>
                <div className="text-[6px] text-emerald-100 font-mono">Acer</div>
                <div className="text-[7px] text-emerald-50 leading-none mt-1 select-none">Bíložluté, lesklé, tvrdé.</div>
              </div>

            </div>

            <div className="h-[450px]" /> {/* Spacer container to preserve absolute children */}
          </div>
        )}
      </div>

      {/* Info notice */}
      <div className="text-[11px] text-stone-500 bg-stone-50 border border-stone-200/50 p-3 rounded-xl leading-relaxed flex items-start gap-2">
        <GitCommit className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
        <span>
          <strong>Užitečný tip:</strong> Kliknutím na jakoukoliv zelenou kartu se zástupcem dřeviny se v aplikaci otevře její plný detail. Schémata odpovídají přesnému logickému dělení v dendrologických cvičeních.
        </span>
      </div>
    </div>
  );
};
