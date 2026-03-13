import { baseLayout } from './base-layout';
import { escapeHtml } from '@/lib/security/sanitize';

interface AdminErrorData {
  errorMessage: string;
  errorStack?: string;
  url?: string;
  sentryUrl?: string;
  timestamp: string;
}

export function adminErrorTemplate(data: AdminErrorData): string {
  const msg = escapeHtml(data.errorMessage);
  const stack = data.errorStack ? escapeHtml(data.errorStack.slice(0, 500)) : '';
  const url = data.url ? escapeHtml(data.url) : '';
  const sentry = data.sentryUrl ? escapeHtml(data.sentryUrl) : '';

  return baseLayout(
    `
    <h2>Runtime Error Detected</h2>
    <span class="badge badge-error">Error</span>
    <div class="card">
      <p class="mono" style="color: #ef4444; margin-bottom: 8px;">${msg}</p>
      ${stack ? `<pre class="mono" style="white-space: pre-wrap; margin: 0;">${stack}</pre>` : ''}
    </div>
    ${url ? `<p><strong>URL:</strong> <span class="mono">${url}</span></p>` : ''}
    <p><strong>Timestamp:</strong> <span class="mono">${escapeHtml(data.timestamp)}</span></p>
    ${sentry ? `<p><a href="${sentry}" class="btn">View in Sentry</a></p>` : ''}
    <p style="color: #606080; font-size: 12px;">Self-healing pipeline has been triggered. You will receive a follow-up email with the fix status.</p>
    `,
    `Runtime error detected: ${msg}`
  );
}
