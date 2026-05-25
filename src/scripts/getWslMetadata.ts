import https from 'https';
import fs from 'fs';
import path from 'path';

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
  pajasan: 'AIAL', // Mock or find elsewhere
  jilm: 'ULSC',
  akat: 'RBPS',
  morusovnik: 'MOAL', // Mock or find elsewhere
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

function fetchHtml(url: string): Promise<string> {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', () => {
      resolve('');
    });
  });
}

function extractImages(html: string, code: string) {
  // We want to extract img tags like images/wood/ABAL/ABAL1k.jpg
  // Or in popups schnitt.php?code=ABAL&image=1
  const matches: string[] = [];
  const regex = new RegExp(`images/wood/${code}/${code}\\d+k\\.jpg`, 'gi');
  let match;
  while ((match = regex.exec(html)) !== null) {
    if (!matches.includes(match[0])) {
      matches.push(match[0]);
    }
  }
  return matches;
}

async function run() {
  const finalMapping: Record<string, { transversal: string[]; radial: string[]; tangential: string[] }> = {};

  console.log('Fetching woodanatomy metadata...');
  
  for (const [speciesId, code] of Object.entries(mapping)) {
    // If it's a mocked code, skip fetch
    if (code === 'AIAL' || code === 'MOAL') {
      finalMapping[speciesId] = {
        transversal: [],
        radial: [],
        tangential: []
      };
      continue;
    }

    const url = `https://www.wsl.ch/land/products/dendro/species.php?code=${code}`;
    const html = await fetchHtml(url);
    if (!html) {
      console.log(`Failed to fetch for ${speciesId} (${code})`);
      continue;
    }

    // Wood anatomy html partitions images under sections.
    // Let's divide the html by section headers: Transversal section, Radial section, Tangential section
    const transIndex = html.toLowerCase().indexOf('transversal section');
    const radialIndex = html.toLowerCase().indexOf('radial section');
    const tangIndex = html.toLowerCase().indexOf('tangential section');
    const keyIndex = html.toLowerCase().indexOf('key characters');

    let transHtml = '';
    let radialHtml = '';
    let tangHtml = '';

    if (transIndex !== -1 && radialIndex !== -1) {
      transHtml = html.substring(transIndex, radialIndex);
    }
    if (radialIndex !== -1 && tangIndex !== -1) {
      radialHtml = html.substring(radialIndex, tangIndex);
    }
    if (tangIndex !== -1) {
      tangHtml = html.substring(tangIndex, keyIndex !== -1 ? keyIndex : html.length);
    }

    const transversal = extractImages(transHtml || html, code);
    const radial = extractImages(radialHtml || html, code);
    const tangential = extractImages(tangHtml || html, code);

    // Filter out radial/tangential if they were mixed up due to missing sections
    finalMapping[speciesId] = {
      transversal: transversal.map(img => `https://www.wsl.ch/land/products/dendro/${img}`),
      radial: radial.map(img => `https://www.wsl.ch/land/products/dendro/${img}`),
      tangential: tangential.map(img => `https://www.wsl.ch/land/products/dendro/${img}`)
    };

    console.log(`Synced ${speciesId} (${code}): P:${transversal.length}, R:${radial.length}, T:${tangential.length}`);
  }

  // Write file out
  const outputPath = path.resolve(process.cwd(), 'src/data/wslImageMapping.ts');
  const fileContent = `// Auto-generated WSL/WoodAnatomy species microscopic image mapping
export interface WslSpeciesImages {
  transversal: string[];
  radial: string[];
  tangential: string[];
}

export const WSL_IMAGE_MAPPING: Record<string, WslSpeciesImages> = ${JSON.stringify(finalMapping, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`Mapping successfully written to ${outputPath}`);
}

run();
