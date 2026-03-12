import { baseLayout } from './base-layout';

interface AdminErrorData {
  errorMessage: string;
  errorStack?: string;
  url?: string;
  sentryUrl?: string;
  timestamp: string;
}

export function adminErrorTemplate(data: AdminErrorData): string {
  return baseLayout(
    `
    <h2>Runtime Error Detected</h2>
    <span class="badge badge-error">Error</span>
    <div class="card">
      <p class="mono" style="color: #ef4444; margin-bottom: 8px;">${data.errorMessage}</p>
      ${data.errorStack ? `<pre class="mono" style="white-space: pre-wrap; margin: 0;">${data.errorStack.slice(0, 500)}</pre>` : ''}
    </div>
    ${data.url ? `<p><strong>URL:</strong> <span class="mono">${data.url}</span></p>` : ''}
    <p><strong>Timestamp:</strong> <span class="mono">${data.timestamp}</span></p>
    ${data.sentryUrl ? `<p><a href="${data.sentryUrl}" class="btn">View in Sentry</a></p>` : ''}
    <p style="color: #606080; font-size: 12px;">Self-healing pipeline has been triggered. You will receive a follow-up email with the fix status.</p>
    `,
    `Runtime error detected: ${data.errorMessage}`
  );
}
