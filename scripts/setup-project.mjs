#!/usr/bin/env node

/**
 * Interactive Project Setup Script
 * Usage: pnpm setup
 *
 * Guides user through initial project configuration:
 * 1. Project name + URL
 * 2. Design preset selection
 * 3. Feature flags
 * 4. SMTP email setup
 * 5. Generates all config files + .env.local
 * 6. Runs token generation
 */

import { createInterface } from 'readline';
import { writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

// ============================================================================
// Colors + Helpers
// ============================================================================

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  bgGreen: '\x1b[42m',
  bgBlue: '\x1b[44m',
  bgRed: '\x1b[41m',
};

function print(msg) {
  console.log(msg);
}

function heading(msg) {
  print(`\n${c.bgBlue}${c.bold} ${msg} ${c.reset}\n`);
}

function success(msg) {
  print(`${c.green}✓${c.reset} ${msg}`);
}

function warn(msg) {
  print(`${c.yellow}⚠${c.reset} ${msg}`);
}

function error(msg) {
  print(`${c.red}✗${c.reset} ${msg}`);
}

function info(msg) {
  print(`${c.dim}  ${msg}${c.reset}`);
}

// ============================================================================
// Input helpers
// ============================================================================

const rl = createInterface({ input: process.stdin, output: process.stdout });

function ask(question, defaultVal) {
  const suffix = defaultVal ? ` ${c.dim}(${defaultVal})${c.reset}` : '';
  return new Promise((resolve) => {
    rl.question(`${c.cyan}?${c.reset} ${question}${suffix}: `, (answer) => {
      resolve(answer.trim() || defaultVal || '');
    });
  });
}

function askRequired(question) {
  return new Promise((resolve) => {
    const doAsk = () => {
      rl.question(`${c.cyan}?${c.reset} ${question} ${c.red}(povinné)${c.reset}: `, (answer) => {
        if (!answer.trim()) {
          error('Toto pole je povinné. Skús znova.');
          doAsk();
        } else {
          resolve(answer.trim());
        }
      });
    };
    doAsk();
  });
}

function askChoice(question, options) {
  return new Promise((resolve) => {
    print(`\n${c.cyan}?${c.reset} ${question}`);
    options.forEach((opt, i) => {
      print(`  ${c.bold}${i + 1}${c.reset}) ${opt.label} ${c.dim}— ${opt.description}${c.reset}`);
    });

    const doAsk = () => {
      rl.question(`${c.cyan}  Vyber (1-${options.length})${c.reset}: `, (answer) => {
        const num = parseInt(answer, 10);
        if (num >= 1 && num <= options.length) {
          resolve(options[num - 1].value);
        } else {
          error(`Zadaj číslo 1 až ${options.length}`);
          doAsk();
        }
      });
    };
    doAsk();
  });
}

function askYesNo(question, defaultYes = true) {
  const hint = defaultYes ? 'A/n' : 'a/N';
  return new Promise((resolve) => {
    rl.question(`${c.cyan}?${c.reset} ${question} ${c.dim}(${hint})${c.reset}: `, (answer) => {
      const a = answer.trim().toLowerCase();
      if (!a) return resolve(defaultYes);
      resolve(a === 'a' || a === 'y' || a === 'ano' || a === 'yes');
    });
  });
}

function askEmail(question, required = false) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return new Promise((resolve) => {
    const doAsk = () => {
      const suffix = required ? ` ${c.red}(povinné)${c.reset}` : '';
      rl.question(`${c.cyan}?${c.reset} ${question}${suffix}: `, (answer) => {
        const val = answer.trim();
        if (!val && !required) return resolve('');
        if (!val && required) {
          error('Toto pole je povinné.');
          return doAsk();
        }
        if (!emailRegex.test(val)) {
          error('Neplatný email. Formát: meno@domena.sk');
          return doAsk();
        }
        resolve(val);
      });
    };
    doAsk();
  });
}

function askUrl(question, defaultVal) {
  return new Promise((resolve) => {
    const suffix = defaultVal ? ` ${c.dim}(${defaultVal})${c.reset}` : '';
    const doAsk = () => {
      rl.question(`${c.cyan}?${c.reset} ${question}${suffix}: `, (answer) => {
        const val = answer.trim() || defaultVal || '';
        if (!val) {
          error('URL je povinná.');
          return doAsk();
        }
        if (!val.startsWith('http://') && !val.startsWith('https://')) {
          error('URL musí začínať http:// alebo https://');
          return doAsk();
        }
        resolve(val.replace(/\/$/, '')); // remove trailing slash
      });
    };
    doAsk();
  });
}

// ============================================================================
// Main Setup Flow
// ============================================================================

async function main() {
  print(`\n${c.bgGreen}${c.bold} 🚀 Universal Web — Setup ${c.reset}`);
  print(`${c.dim}Interaktívny sprievodca nastavením projektu${c.reset}`);
  print(`${c.dim}Stlač Ctrl+C kedykoľvek pre zrušenie${c.reset}\n`);

  // Check if already configured
  if (existsSync(resolve(ROOT, '.env.local'))) {
    const overwrite = await askYesNo('Projekt už má .env.local. Chceš ho prepísať?', false);
    if (!overwrite) {
      print(`\n${c.dim}Setup zrušený. Existujúca konfigurácia zostáva.${c.reset}`);
      rl.close();
      return;
    }
  }

  // ── Step 1: Basic Info ──────────────────────────────────────────────────
  heading('1/5 — Základné informácie');

  const projectName = await askRequired('Názov projektu (napr. "Klient Portfolio")');
  const projectDescription = await ask('Krátky popis', `${projectName} — moderný web`);
  const projectUrl = await askUrl('Produkčná URL', 'https://example.com');
  const locale = await ask('Jazyk stránky', 'sk');
  const creator = await ask('Autor / firma', 'Jakub Novak');

  success(`Projekt: ${projectName}`);

  // ── Step 2: Design Preset ──────────────────────────────────────────────
  heading('2/5 — Design preset');

  const preset = await askChoice('Vyber vizuálny štýl:', [
    { label: 'Glass UI', value: 'glass-ui', description: 'Tmavý, glassmorphism, premium feel, glows' },
    { label: 'Clean Modern', value: 'clean-modern', description: 'Svetlý, čistý, minimálne dekorácie' },
    { label: 'Corporate', value: 'corporate', description: 'Profesionálny, konzervatívny, serif nadpisy' },
  ]);

  success(`Preset: ${preset}`);

  // ── Step 3: Feature Flags ──────────────────────────────────────────────
  heading('3/5 — Moduly');
  info('Zapni len to, čo projekt reálne potrebuje.');

  const featureEmail = await askYesNo('Email notifikácie (kontaktný formulár, self-healing)?', true);
  const featureAuth = await askYesNo('Autentifikácia (login/register)?', false);
  const featureDb = await askYesNo('Databáza (Drizzle + Neon Postgres)?', false);
  const featureI18n = await askYesNo('Viacjazyčnosť (i18n)?', false);
  const featureAnalytics = await askYesNo('Analytika (Umami)?', false);
  const featureMonitoring = await askYesNo('Monitoring (Sentry)?', true);
  const featureSelfHealing = featureMonitoring ? await askYesNo('Self-healing (automatické opravy cez AI)?', true) : false;
  const featureBlog = await askYesNo('Blog sekcia?', false);
  const featureDashboard = await askYesNo('Dashboard (chránená zóna)?', false);

  success('Moduly nakonfigurované');

  // ── Step 4: Email Setup ────────────────────────────────────────────────
  let smtp = { host: '', port: '465', secure: 'true', user: '', pass: '' };
  let emailFrom = '';
  let emailFromName = '';
  let adminEmail = '';
  let clientEmails = '';

  if (featureEmail) {
    heading('4/5 — Email (SMTP)');
    info('Tieto údaje dostaneš od hosting providera (Websupport, Forpsi, atď.)');

    smtp.host = await askRequired('SMTP server (napr. smtp.m1.websupport.sk)');

    const smtpPort = await ask('SMTP port', '465');
    smtp.port = smtpPort;
    smtp.secure = smtpPort === '465' ? 'true' : 'false';

    smtp.user = await askRequired('SMTP používateľ (email)');
    smtp.pass = await askRequired('SMTP heslo');

    emailFrom = await ask('Odosielateľ (email)', smtp.user);
    emailFromName = await ask('Meno odosielateľa', projectName);
    adminEmail = await askEmail('Admin email (technické notifikácie)', true);
    clientEmails = await ask('Klientské emaily (oddelené čiarkou, alebo nechaj prázdne)', '');

    success('Email nakonfigurovaný');
  } else {
    heading('4/5 — Email');
    info('Email je vypnutý — preskakujem.');
  }

  // ── Step 5: Optional Services ──────────────────────────────────────────
  heading('5/5 — Externé služby (voliteľné)');
  info('Tieto môžeš doplniť neskôr v .env.local');

  let sentryDsn = '';
  let sentryAuthToken = '';
  let sentryWebhookSecret = '';
  if (featureMonitoring) {
    sentryDsn = await ask('Sentry DSN (alebo nechaj prázdne a doplň neskôr)', '');
    if (sentryDsn) {
      sentryAuthToken = await ask('Sentry Auth Token', '');
    }
    if (featureSelfHealing) {
      sentryWebhookSecret = await ask('Sentry Webhook Secret', '');
    }
  }

  let anthropicKey = '';
  if (featureSelfHealing) {
    anthropicKey = await ask('Anthropic API Key (pre self-healing, alebo doplň v GitHub Secrets)', '');
  }

  let dbUrl = '';
  if (featureDb) {
    dbUrl = await ask('Database URL (Neon Postgres)', '');
  }

  let authSecret = '';
  if (featureAuth) {
    authSecret = await ask('Auth Secret (alebo vygeneruj: openssl rand -base64 32)', '');
  }

  let umamiUrl = '';
  let umamiId = '';
  if (featureAnalytics) {
    umamiUrl = await ask('Umami URL', '');
    umamiId = await ask('Umami Website ID', '');
  }

  success('Konfigurácia kompletná!');
  rl.close();

  // ── Generate Files ─────────────────────────────────────────────────────
  heading('Generujem súbory...');

  // .env.local
  const envLines = [
    '# === Vygenerované pomocou: pnpm setup ===',
    `# Projekt: ${projectName}`,
    `# Dátum: ${new Date().toISOString().split('T')[0]}`,
    '',
    '# === SMTP ===',
    `SMTP_HOST=${smtp.host}`,
    `SMTP_PORT=${smtp.port}`,
    `SMTP_SECURE=${smtp.secure}`,
    `SMTP_USER=${smtp.user}`,
    `SMTP_PASS=${smtp.pass}`,
    '',
    '# === Email ===',
    `EMAIL_FROM=${emailFrom}`,
    `EMAIL_FROM_NAME=${emailFromName}`,
    `ADMIN_EMAIL=${adminEmail}`,
    `CLIENT_EMAILS=${clientEmails}`,
    '',
    '# === Site ===',
    `NEXT_PUBLIC_SITE_URL=${projectUrl}`,
    '',
    '# === Sentry ===',
    `SENTRY_DSN=${sentryDsn}`,
    `SENTRY_AUTH_TOKEN=${sentryAuthToken}`,
    `SENTRY_WEBHOOK_SECRET=${sentryWebhookSecret}`,
    '',
    '# === Self-Healing ===',
    `ANTHROPIC_API_KEY=${anthropicKey}`,
    '',
    '# === Analytics ===',
    `NEXT_PUBLIC_UMAMI_URL=${umamiUrl}`,
    `NEXT_PUBLIC_UMAMI_ID=${umamiId}`,
    '',
    '# === Database ===',
    `DATABASE_URL=${dbUrl}`,
    '',
    '# === Auth ===',
    `AUTH_SECRET=${authSecret}`,
  ];

  writeFileSync(resolve(ROOT, '.env.local'), envLines.join('\n') + '\n');
  success('.env.local vytvorený');

  // site.config.ts
  const siteConfig = `import type { SiteConfig } from '@/types/site';

export const siteConfig: SiteConfig = {
  name: '${projectName.replace(/'/g, "\\'")}',
  description: '${projectDescription.replace(/'/g, "\\'")}',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: '${locale}',
  ogImage: '/og-default.png',
  creator: '${creator.replace(/'/g, "\\'")}',
  socials: {
    twitter: '',
    github: '',
    linkedin: '',
    instagram: '',
  },
};
`;
  writeFileSync(resolve(ROOT, 'config/site.config.ts'), siteConfig);
  success('config/site.config.ts aktualizovaný');

  // features.config.ts
  const featuresConfig = `import type { FeatureFlags } from '@/types/features';

export const features: FeatureFlags = {
  auth: ${featureAuth},
  database: ${featureDb},
  i18n: ${featureI18n},
  analytics: ${featureAnalytics},
  email: ${featureEmail},
  monitoring: ${featureMonitoring},
  selfHealing: ${featureSelfHealing},
  blog: ${featureBlog},
  dashboard: ${featureDashboard},
  cms: false,
};
`;
  writeFileSync(resolve(ROOT, 'config/features.config.ts'), featuresConfig);
  success('config/features.config.ts aktualizovaný');

  // design.config.ts
  const presetImportMap = {
    'glass-ui': 'glassUi',
    'clean-modern': 'cleanModern',
    'corporate': 'corporate',
  };
  const presetVar = presetImportMap[preset];
  const designConfig = `import ${presetVar} from '@presets/${preset}';
import type { DesignPreset } from '@/types/design';

// ============================================================================
// DESIGN CONFIG — Single Source of Truth
// ============================================================================
// Preset: ${preset}
// To customize: override specific values below (brand colors, fonts, etc.)
// After changes run: pnpm generate:tokens
// ============================================================================

const design: DesignPreset = {
  ...${presetVar},
  colors: {
    dark: {
      ...${presetVar}.colors.dark,
      // Override brand colors here:
      // accent: '#your-color',
    },
    light: {
      ...${presetVar}.colors.light,
      // accent: '#your-color',
    },
  },
};

export default design;
`;
  writeFileSync(resolve(ROOT, 'config/design.config.ts'), designConfig);
  success('config/design.config.ts aktualizovaný');

  // Generate tokens
  print('');
  info('Generujem design tokeny...');
  try {
    execSync('pnpm generate:tokens', { cwd: ROOT, stdio: 'pipe' });
    success('Design tokeny vygenerované');
  } catch {
    warn('Token generovanie zlyhalo — spusti manuálne: pnpm generate:tokens');
  }

  // ── Summary ────────────────────────────────────────────────────────────
  print(`\n${c.bgGreen}${c.bold} ✅ Setup dokončený! ${c.reset}\n`);
  print(`  ${c.bold}Projekt:${c.reset}  ${projectName}`);
  print(`  ${c.bold}URL:${c.reset}      ${projectUrl}`);
  print(`  ${c.bold}Preset:${c.reset}   ${preset}`);
  print(`  ${c.bold}Email:${c.reset}    ${featureEmail ? `${emailFrom} → admin: ${adminEmail}` : 'vypnutý'}`);
  print(`  ${c.bold}Sentry:${c.reset}   ${sentryDsn ? 'nakonfigurovaný' : featureMonitoring ? 'doplň DSN do .env.local' : 'vypnutý'}`);

  print(`\n${c.bold}Ďalšie kroky:${c.reset}`);
  print(`  ${c.cyan}1.${c.reset} pnpm dev          ${c.dim}— spusti dev server${c.reset}`);
  print(`  ${c.cyan}2.${c.reset} Uprav stránky v   ${c.dim}src/app/${c.reset}`);
  print(`  ${c.cyan}3.${c.reset} Pridaj logo do    ${c.dim}public/logo.png${c.reset}`);
  print(`  ${c.cyan}4.${c.reset} Uprav navigáciu v  ${c.dim}config/navigation.config.ts${c.reset}`);
  if (featureEmail) {
    print(`  ${c.cyan}5.${c.reset} Otestuj email:    ${c.dim}curl localhost:3000/api/test-email?type=error${c.reset}`);
  }
  print(`\n${c.dim}Konfigurácia je v .env.local (nikdy sa necommituje).${c.reset}`);
  print(`${c.dim}Pre zmenu presetu zmeň import v config/design.config.ts a spusti pnpm generate:tokens${c.reset}\n`);
}

main().catch((err) => {
  error(`Setup zlyhal: ${err.message}`);
  process.exit(1);
});
