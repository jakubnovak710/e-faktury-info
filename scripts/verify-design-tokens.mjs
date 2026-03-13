/**
 * CI script: verify no hardcoded colors in component files.
 * Fails if hex colors (#xxx, #xxxxxx) or rgb/hsl values are found
 * in src/components/ or src/app/ files (outside of comments).
 *
 * Allowed exceptions:
 * - design-tokens.css (generated file)
 * - effects.css (keyframe definitions)
 * - opengraph-image.tsx (OG images need inline colors)
 * - email templates (HTML emails need inline colors)
 */

import { execSync } from 'child_process';

const FORBIDDEN_PATTERN = '#[0-9a-fA-F]{3,8}\\b|rgb\\(|rgba\\(|hsl\\(|hsla\\(';

const EXCLUDED = [
  'design-tokens.css',
  'effects.css',
  'globals.css',
  'opengraph-image.tsx',
  'src/lib/email/',
  'tailwind',
  '.config.',
  'presets/',
];

try {
  const result = execSync(
    `grep -rn -E "${FORBIDDEN_PATTERN}" src/components/ src/app/ --include="*.tsx" --include="*.ts" --include="*.css" 2>/dev/null || true`,
    { encoding: 'utf-8' }
  );

  const violations = result
    .split('\n')
    .filter(Boolean)
    .filter((line) => !EXCLUDED.some((ex) => line.includes(ex)))
    // Allow CSS variable definitions and comments
    .filter((line) => !line.includes('var(--') || line.match(/#[0-9a-fA-F]{3,8}/))
    .filter((line) => !line.trim().startsWith('//') && !line.trim().startsWith('*'))
    // Allow inline ignore: // design-tokens-ignore
    .filter((line) => !line.includes('design-tokens-ignore'));

  if (violations.length > 0) {
    console.error('❌ Hardcoded colors found! Use design tokens (CSS variables) instead:\n');
    violations.forEach((v) => console.error(`  ${v}`));
    console.error(`\n${violations.length} violation(s) found.`);
    console.error('Fix: Replace hardcoded colors with var(--token-name) from design-tokens.css');
    process.exit(1);
  }

  console.log('✅ No hardcoded colors found. All components use design tokens.');
} catch (error) {
  console.error('Script error:', error.message);
  process.exit(1);
}
