import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const exampleDir = join(rootDir, 'example');

console.log('🔧 Setting up E2E test environment...');

// Check if example/node_modules exists
const exampleNodeModules = join(exampleDir, 'node_modules');
if (!existsSync(exampleNodeModules)) {
  console.log('📦 Installing example dependencies...');
  execSync('npm install', { 
    cwd: exampleDir, 
    stdio: 'inherit' 
  });
} else {
  console.log('✓ Example dependencies already installed');
}

// Check if dist directory exists
const distDir = join(rootDir, 'dist');
if (!existsSync(distDir)) {
  console.log('🏗️  Building components...');
  execSync('npm run build', { 
    cwd: rootDir, 
    stdio: 'inherit' 
  });
} else {
  console.log('✓ Components already built');
}

// Check if Playwright browsers are installed
try {
  execSync('npx playwright --version', { stdio: 'ignore' });
  console.log('✓ Playwright browsers installed');
} catch (error) {
  console.log('📥 Installing Playwright browsers...');
  console.log('   This may take a few minutes on first run...');
  execSync('npx playwright install chromium', { 
    cwd: rootDir, 
    stdio: 'inherit' 
  });
}

console.log('✅ E2E test environment ready!');