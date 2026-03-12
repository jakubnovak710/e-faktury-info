import { siteConfig } from '@config/site.config';

/**
 * Base HTML email layout with Glass UI inspired styling.
 * All templates wrap their content with this layout.
 */
export function baseLayout(content: string, preheader?: string): string {
  return `<!DOCTYPE html>
<html lang="${siteConfig.locale}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${siteConfig.name}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0a0a12; color: #e2e2f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
    .header { text-align: center; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 24px; }
    .logo { font-size: 18px; font-weight: 900; background: linear-gradient(135deg, #6366f1, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .content { line-height: 1.6; font-size: 14px; }
    .content h2 { color: #f0f0ff; font-size: 20px; font-weight: 800; margin: 0 0 12px; }
    .content p { color: #a0a0c0; margin: 0 0 16px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .badge-error { background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
    .badge-success { background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
    .badge-warning { background: rgba(234,179,8,0.15); color: #eab308; border: 1px solid rgba(234,179,8,0.3); }
    .badge-info { background: rgba(99,102,241,0.15); color: #6366f1; border: 1px solid rgba(99,102,241,0.3); }
    .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; margin: 16px 0; }
    .mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 12px; color: #8080a0; }
    .btn { display: inline-block; padding: 10px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; color: #fff; background: linear-gradient(135deg, #6366f1, #a855f7); }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center; }
    .footer p { font-size: 11px; color: #606080; margin: 0; }
    .preheader { display: none; max-height: 0; overflow: hidden; }
  </style>
</head>
<body>
  ${preheader ? `<div class="preheader">${preheader}</div>` : ''}
  <div class="container">
    <div class="header">
      <div class="logo">${siteConfig.name}</div>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>${siteConfig.name} &middot; Automated notification</p>
    </div>
  </div>
</body>
</html>`;
}
