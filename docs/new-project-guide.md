# Ako vytvoriť nový projekt pre klienta

## 1. Klonovanie

```bash
gh repo create nazov-klienta --private --template jakubnovak710/universal-web
cd nazov-klienta
pnpm install
```

## 2. Základná konfigurácia

### Údaje stránky
Edituj `config/site.config.ts`:
- `name` — názov webu
- `description` — popis
- `url` — produkčná URL
- `locale` — jazyk (sk, cs, en)
- `socials` — sociálne siete

### Zapnutie modulov
Edituj `config/features.config.ts`:
```ts
auth: true,        // ak treba prihlasovanie
database: true,    // ak treba databázu
i18n: true,        // ak treba viac jazykov
analytics: true,   // Umami tracking
blog: true,        // blog sekcia
dashboard: true,   // admin dashboard
```

### Výber design presetu
Edituj `config/design.config.ts`:
```ts
// Zmeniť import na požadovaný preset:
import glassUi from '@presets/glass-ui';      // dark-first glassmorphism
// import cleanModern from '@presets/clean-modern'; // light-first, clean
// import corporate from '@presets/corporate';       // profesionálny, konzervatívny
```

### Úprava brand farieb
V `config/design.config.ts` override-ni farby:
```ts
const design: DesignPreset = {
  ...glassUi,
  colors: {
    dark: {
      ...glassUi.colors.dark,
      accent: '#ff6b35',           // brand farba
      accentGlow: 'rgba(255, 107, 53, 0.30)',
    },
    light: { ... },
  },
};
```

## 3. Generovanie tokenov

```bash
pnpm generate:tokens
```

## 4. Overenie

```bash
pnpm dev          # lokálny server
pnpm build        # build check
pnpm typecheck    # type check
```

## 5. Environment variables

Skopíruj `.env.example` do `.env.local` a vyplň:
```
NEXT_PUBLIC_SITE_URL=https://klient.sk
# Auth (ak zapnuté)
AUTH_SECRET=...
# DB (ak zapnuté)
DATABASE_URL=...
# Email
SMTP_HOST=...
SMTP_USER=...
SMTP_PASS=...
# Monitoring
SENTRY_DSN=...
# Analytics
NEXT_PUBLIC_UMAMI_URL=...
NEXT_PUBLIC_UMAMI_ID=...
```

## 6. Deploy na Vercel

1. Pripoj repo na Vercel (Import Git Repository)
2. Nastav env variables
3. Deploy

## 7. GitHub nastavenia

- Zapni Renovate Bot (auto-updaty dependencies)
- Nastav branch protection (require CI pass)
- Pridaj Sentry webhook (ak self-healing zapnutý)
