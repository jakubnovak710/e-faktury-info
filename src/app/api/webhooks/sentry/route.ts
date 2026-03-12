import { NextResponse } from 'next/server';
import { notify } from '@/lib/email';

/**
 * Sentry webhook endpoint.
 * Receives error events, sends notifications, and triggers self-healing.
 *
 * POST /api/webhooks/sentry
 */
export async function POST(request: Request) {
  // Validate webhook secret
  const secret = process.env.SENTRY_WEBHOOK_SECRET;
  if (secret) {
    const signature = request.headers.get('sentry-hook-signature');
    if (signature !== secret) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  try {
    const payload = await request.json();
    const resource = request.headers.get('sentry-hook-resource') ?? 'unknown';

    // Only process issue/error events
    if (resource !== 'issue' && resource !== 'event_alert') {
      return NextResponse.json({ ok: true, skipped: true });
    }

    // Extract error details from Sentry payload
    const errorMessage =
      payload.data?.issue?.title ??
      payload.data?.event?.title ??
      payload.message ??
      'Unknown error';

    const sentryUrl =
      payload.data?.issue?.web_url ??
      payload.url ??
      undefined;

    const errorData = {
      errorMessage,
      sentryUrl,
      url: payload.data?.event?.request?.url,
    };

    // 1. Send email notifications
    await notify.errorDetected(errorData);

    // 2. Trigger self-healing GitHub Action via repository_dispatch
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO; // format: owner/repo

    if (githubToken && githubRepo) {
      await fetch(`https://api.github.com/repos/${githubRepo}/dispatches`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'self-heal',
          client_payload: {
            error_message: errorMessage,
            sentry_url: sentryUrl,
            error_url: errorData.url,
          },
        }),
      });
    }

    return NextResponse.json({ ok: true, processed: true });
  } catch (error) {
    console.error('[Sentry Webhook] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Processing failed' },
      { status: 500 }
    );
  }
}
