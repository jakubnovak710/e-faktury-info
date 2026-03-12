import { writeFileSync } from 'fs';
import { resolve } from 'path';
import type { ThemeColors } from '../src/types/design';

// Dynamic import workaround for tsx
async function main() {
  const { default: design } = await import('../config/design.config');

  function colorsToCssVars(colors: ThemeColors): string {
    return Object.entries(colors)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  --${cssKey}: ${value};`;
      })
      .join('\n');
  }

  const css = `/* ============================================================================
 * GENERATED FILE — DO NOT EDIT MANUALLY
 * Generated from: config/design.config.ts
 * Regenerate with: pnpm generate:tokens
 * ============================================================================ */

:root {
  /* Colors (Dark Theme — Default) */
${colorsToCssVars(design.colors.dark)}

  /* Typography */
  --font-display: '${design.typography.displayFont}', system-ui, sans-serif;
  --font-body: '${design.typography.bodyFont}', system-ui, sans-serif;
  --font-mono: '${design.typography.monoFont}', ui-monospace, monospace;

  /* Spacing */
  --padding-compact: ${design.spacing.padding.compact};
  --padding-standard: ${design.spacing.padding.standard};
  --padding-spacious: ${design.spacing.padding.spacious};
  --content-max-width: ${design.spacing.contentMaxWidth};
  --sidebar-width: ${design.spacing.sidebarWidth};

  /* Border Radius */
  --radius-sm: ${design.effects.borderRadius.sm};
  --radius-md: ${design.effects.borderRadius.md};
  --radius-lg: ${design.effects.borderRadius.lg};
  --radius-xl: ${design.effects.borderRadius.xl};
  --radius-2xl: ${design.effects.borderRadius['2xl']};
  --radius-full: ${design.effects.borderRadius.full};
}

[data-theme="light"] {
${colorsToCssVars(design.colors.light)}
}
`;

  const outPath = resolve(new URL('.', import.meta.url).pathname, '../src/styles/design-tokens.css');
  writeFileSync(outPath, css, 'utf-8');
  console.log(`✓ Design tokens generated: ${outPath}`);
  console.log(`  Preset: ${design.name}`);
  console.log(`  Dark colors: ${Object.keys(design.colors.dark).length} tokens`);
  console.log(`  Light colors: ${Object.keys(design.colors.light).length} tokens`);
}

main().catch(console.error);
