import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Create dist directories
fs.mkdirSync(path.join(rootDir, 'dist/astro'), { recursive: true });
fs.mkdirSync(path.join(rootDir, 'dist/astro/core'), { recursive: true });

// Copy Astro component
const astroSource = fs.readFileSync(path.join(rootDir, 'src/astro/BudouX.astro'), 'utf8');
// Update the import path to use relative path within dist
const astroUpdated = astroSource.replace(
  "import { applyBudouX, getBudouXSegments } from '../core/apply-budoux.js';",
  "import { applyBudouX, getBudouXSegments } from './core/apply-budoux.js';"
);
fs.writeFileSync(path.join(rootDir, 'dist/astro/BudouX.astro'), astroUpdated);

// Copy core files
const coreFiles = ['apply-budoux.js', 'apply-budoux.d.ts'];
coreFiles.forEach(file => {
  const sourcePath = path.join(rootDir, `dist/react/core/${file}`);
  const destPath = path.join(rootDir, `dist/astro/core/${file}`);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
  }
});

// Create index.ts for Astro
const indexContent = `export { default } from './BudouX.astro';
`;
fs.writeFileSync(path.join(rootDir, 'dist/astro/index.ts'), indexContent);

console.log('Astro component built successfully!');