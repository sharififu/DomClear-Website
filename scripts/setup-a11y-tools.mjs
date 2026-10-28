/**
 * Keep Playwright/axe dependencies isolated from the site's locked HeroUI beta
 * dependencies. Running npm install at the repo root would re-resolve @heroui/react@beta.
 * This setup modifies ignored node_modules only; package.json and lockfile stay untouched.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, symlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const toolRoot = join(root, 'node_modules', '.domiclear-a11y-tools');
mkdirSync(toolRoot, { recursive: true });
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

execFileSync(npm, [
  'install',
  '--prefix', toolRoot,
  '--no-save',
  '--package-lock=false',
  '--ignore-scripts',
  '@playwright/test@1.56.1',
  '@axe-core/playwright@4.11.0',
], { stdio: 'inherit' });

for (const name of ['@playwright/test', '@axe-core/playwright']) {
  const source = join(toolRoot, 'node_modules', ...name.split('/'));
  const target = join(root, 'node_modules', ...name.split('/'));
  if (!existsSync(source)) throw new Error(`Accessibility package missing: ${name}`);
  mkdirSync(dirname(target), { recursive: true });
  if (!existsSync(target)) {
    symlinkSync(source, target, process.platform === 'win32' ? 'junction' : 'dir');
  }
}

console.log('Accessibility test tooling installed in ignored node_modules, without changing the application lockfile.');
