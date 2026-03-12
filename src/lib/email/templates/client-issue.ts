import { baseLayout } from './base-layout';
import { siteConfig } from '@config/site.config';

interface ClientIssueData {
  status: 'detected' | 'resolved' | 'team-notified';
  timestamp: string;
}

const messages = {
  detected: {
    heading: 'Zachytili sme problém',
    body: `Náš monitorovací systém zachytil neočakávanú chybu na stránke. Aktívne pracujeme na jej odstránení. O vyriešení vás budeme informovať.`,
    badge: 'badge-warning',
    label: 'Investigating',
  },
  resolved: {
    heading: 'Problém vyriešený',
    body: `Chyba bola úspešne identifikovaná a opravená. Všetko funguje normálne. Ďakujeme za trpezlivosť.`,
    badge: 'badge-success',
    label: 'Resolved',
  },
  'team-notified': {
    heading: 'Tím bol notifikovaný',
    body: `Automatická oprava nebola úspešná a náš tím bol notifikovaný. Problém riešime manuálne a budeme vás informovať o ďalšom postupe.`,
    badge: 'badge-info',
    label: 'Team Notified',
  },
};

export function clientIssueTemplate(data: ClientIssueData): string {
  const msg = messages[data.status];

  return baseLayout(
    `
    <h2>${msg.heading}</h2>
    <span class="badge ${msg.badge}">${msg.label}</span>
    <div class="card">
      <p>${msg.body}</p>
    </div>
    <p class="mono" style="font-size: 11px; color: #606080;">
      ${data.timestamp} &middot; ${siteConfig.name}
    </p>
    `,
    msg.heading
  );
}
