import { baseLayout } from './base-layout';

interface AdminFixData {
  errorMessage: string;
  prUrl?: string;
  status: 'started' | 'success' | 'failed';
  analysis?: string;
  timestamp: string;
}

const statusConfig = {
  started: { badge: 'badge-warning', label: 'Fix In Progress', icon: '🔧' },
  success: { badge: 'badge-success', label: 'Fix Deployed', icon: '✅' },
  failed: { badge: 'badge-error', label: 'Fix Failed', icon: '❌' },
};

export function adminFixTemplate(data: AdminFixData): string {
  const cfg = statusConfig[data.status];

  return baseLayout(
    `
    <h2>${cfg.icon} ${cfg.label}</h2>
    <span class="badge ${cfg.badge}">${cfg.label}</span>
    <div class="card">
      <p><strong>Original error:</strong></p>
      <p class="mono" style="color: #ef4444;">${data.errorMessage}</p>
    </div>
    ${data.analysis ? `<div class="card"><p><strong>AI Analysis:</strong></p><p>${data.analysis}</p></div>` : ''}
    ${data.prUrl ? `<p><a href="${data.prUrl}" class="btn">View Pull Request</a></p>` : ''}
    <p><strong>Timestamp:</strong> <span class="mono">${data.timestamp}</span></p>
    ${data.status === 'failed' ? '<p style="color: #ef4444; font-weight: 700;">Manual intervention required. Rollback has been initiated.</p>' : ''}
    `,
    `Self-healing ${data.status}: ${data.errorMessage}`
  );
}
