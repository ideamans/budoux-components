import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Function to fix import paths in JavaScript files
function fixImportPaths(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Change '../core/apply-budoux.js' to './core/apply-budoux.js'
  const updatedContent = content.replace(
    /from ['"]\.\.\/core\/apply-budoux\.js['"]/g,
    "from './core/apply-budoux.js'"
  );
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
  }
}

// Function to move files up one directory
function restructureOutput(framework) {
  const frameworkDir = path.join(rootDir, `dist/${framework}`);
  const innerDir = path.join(frameworkDir, framework);
  
  if (fs.existsSync(innerDir)) {
    // Move all files from inner directory to parent
    const files = fs.readdirSync(innerDir);
    files.forEach(file => {
      const source = path.join(innerDir, file);
      const dest = path.join(frameworkDir, file);
      fs.renameSync(source, dest);
    });
    
    // Remove the now-empty inner directory
    fs.rmdirSync(innerDir);
  }
  
  // Fix import paths in the moved index.js file
  const indexPath = path.join(frameworkDir, 'index.js');
  if (fs.existsSync(indexPath)) {
    fixImportPaths(indexPath);
  }
}

// Restructure React and Vue outputs
restructureOutput('react');
restructureOutput('vue');

console.log('Build output restructured successfully!');