import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const outPath = path.join(__dirname, 'dreviny.html');

if (!fs.existsSync(indexPath)) {
  console.error(`Error: ${indexPath} does not exist. Please run npm run build first.`);
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf-8');

// Replace favicon or standard titles/metadata if needed, but keeping original structure is best.

// Find script tags
// Example: <script type="module" crossorigin src="/assets/index-DMSxBNEZ.js"></script>
const scriptRegex = /<script\s+type="module"\s+crossorigin\s+src="\/assets\/([^"]+)"\s*><\/script>/i;
const scriptMatch = html.match(scriptRegex);

if (scriptMatch) {
  const scriptFileName = scriptMatch[1];
  const scriptPath = path.join(distPath, 'assets', scriptFileName);
  if (fs.existsSync(scriptPath)) {
    console.log(`Inlining script: ${scriptFileName}`);
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    // Replace script match with inlined version. 
    // We use a function replacement to avoid group references symbols issues like $$ or $& in scriptContent
    html = html.replace(scriptRegex, () => `<script type="module">\n${scriptContent}\n</script>`);
  } else {
    console.warn(`Warning: Script file ${scriptPath} not found`);
  }
}

// Find CSS link tags
// Example: <link rel="stylesheet" crossorigin href="/assets/index-tA0cqh-U.css">
const cssRegex = /<link\s+rel="stylesheet"\s+crossorigin\s+href="\/assets\/([^"]+)"\s*>/i;
const cssMatch = html.match(cssRegex);

if (cssMatch) {
  const cssFileName = cssMatch[1];
  const cssPath = path.join(distPath, 'assets', cssFileName);
  if (fs.existsSync(cssPath)) {
    console.log(`Inlining stylesheet: ${cssFileName}`);
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    html = html.replace(cssRegex, () => `<style>\n${cssContent}\n</style>`);
  } else {
    console.warn(`Warning: CSS file ${cssPath} not found`);
  }
}

// Also handle any potential absolute asset references in the CSS / HTML if necessary
// (the external urls like stawbadreva.ldf.mendelu.cz are absolute, which is perfect)

fs.writeFileSync(outPath, html, 'utf-8');
console.log(`Successfully generated single HTML file at: ${outPath}`);
