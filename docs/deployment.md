# Deployment Guide

## Vercel (Primary)

### Setup

1. Import repository at [vercel.com/new](https://vercel.com/new)
2. Framework: Next.js (auto-detected)
3. Set environment variables (copy from `.env.example`)
4. Deploy

### Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

**Required:**
- `NEXT_PUBLIC_SITE_URL` — production URL (e.g., `https://client.com`)

**Email (if enabled):**
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- `EMAIL_FROM`, `EMAIL_FROM_NAME`
- `ADMIN_EMAIL`, `CLIENT_EMAILS`

**Self-Healing (if enabled):**
- `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_WEBHOOK_SECRET`
- `ANTHROPIC_API_KEY` (set in GitHub Secrets, not Vercel)

**Optional modules:**
- `DATABASE_URL` — Neon Postgres connection string
- `AUTH_SECRET` — Auth.js secret (generate: `openssl rand -base64 32`)
- `NEXT_PUBLIC_UMAMI_URL`, `NEXT_PUBLIC_UMAMI_ID` — Umami analytics

### Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add domain → follow DNS instructions
3. SSL is automatic

## Hetzner VPS (Alternative)

### Prerequisites
- Ubuntu 22.04+ VPS
- Node.js 20+ (via nvm)
- pnpm installed globally
- Nginx as reverse proxy

### Setup

```bash
# Clone and install
git clone https://github.com/your-org/project.git /var/www/project
cd /var/www/project
pnpm install
pnpm build

# Create .env.local with production values
cp .env.example .env.local
nano .env.local

# Start with PM2
npm install -g pm2
pm2 start npm --name "project" -- start
pm2 save
pm2 startup
```

### Nginx Config

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Auto-Deploy via GitHub Actions

Add to `.github/workflows/deploy-hetzner.yml`:
- SSH key in GitHub Secrets (`HETZNER_SSH_KEY`)
- Server IP in GitHub Secrets (`HETZNER_HOST`)
- Workflow: ssh → git pull → pnpm install → pnpm build → pm2 restart

## Post-Deploy Checklist

- [ ] Site loads correctly at production URL
- [ ] Dark/light theme toggle works
- [ ] Contact form sends emails
- [ ] `/api/health` returns 200
- [ ] `/sitemap.xml` is accessible
- [ ] `/robots.txt` is accessible
- [ ] `/llms.txt` is accessible
- [ ] OG images generate correctly
- [ ] Security headers present (check securityheaders.com)
- [ ] Sentry receives test error (if enabled)
