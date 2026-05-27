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
const scriptRegex = /<script\s+type="module"\s+crossorigin\s+src="\/assets\/([^"]+)"\s*><\/script>/gi;
html = html.replace(scriptRegex, (match, scriptFileName) => {
  const scriptPath = path.join(distPath, 'assets', scriptFileName);
  if (fs.existsSync(scriptPath)) {
    console.log(`Inlining script matching: ${scriptFileName}`);
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    return `<script type="module">\n${scriptContent}\n</script>`;
  } else {
    console.warn(`Warning: Script file ${scriptPath} not found for inlining`);
    return match;
  }
});

// Remove any modulepreload tags to avoid offline network fetch errors
html = html.replace(/<link\s+rel="modulepreload"[^>]*>/gi, '');

// Find CSS link tags
// Example: <link rel="stylesheet" crossorigin href="/assets/index-tA0cqh-U.css">
const cssRegex = /<link\s+rel="stylesheet"\s+crossorigin\s+href="\/assets\/([^"]+)"\s*>/gi;
html = html.replace(cssRegex, (match, cssFileName) => {
  const cssPath = path.join(distPath, 'assets', cssFileName);
  if (fs.existsSync(cssPath)) {
    console.log(`Inlining stylesheet matching: ${cssFileName}`);
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    return `<style>\n${cssContent}\n</style>`;
  } else {
    console.warn(`Warning: CSS file ${cssPath} not found for inlining`);
    return match;
  }
});

// Also handle any potential absolute asset references in the CSS / HTML if necessary
// (the external urls like stawbadreva.ldf.mendelu.cz are absolute, which is perfect)

fs.writeFileSync(outPath, html, 'utf-8');
console.log(`Successfully generated single HTML file at: ${outPath}`);
