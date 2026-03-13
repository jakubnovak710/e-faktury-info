import { NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { notify } from '@/lib/email';

const GITHUB_REPO_REGEX = /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/;

const sentryPayloadSchema = z.object({
  data: z.object({
    issue: z.object({
      title: z.string().optional(),
      web_url: z.string().url().optional(),
    }).optional(),
    event: z.object({
      title: z.string().optional(),
      request: z.object({
        url: z.string().optional(),
      }).optional(),
    }).optional(),
  }).optional(),
  message: z.string().optional(),
  url: z.string().optional(),
});

/**
 * Constant-time string comparison to prevent timing attacks.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Sentry webhook endpoint.
 * Receives error events, sends notifications, and triggers self-healing.
 *
 * POST /api/webhooks/sentry
 */
export async function POST(request: Request) {
  // Validate webhook secret — MANDATORY
  const secret = process.env.SENTRY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[Sentry Webhook] SENTRY_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const signature = request.headers.get('sentry-hook-signature');
  if (!signature || !timingSafeEqual(signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  try {
    const raw = await request.json();
    const result = sentryPayloadSchema.safeParse(raw);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const payload = result.data;
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
    const githubRepo = process.env.GITHUB_REPO;

    if (githubToken && githubRepo && GITHUB_REPO_REGEX.test(githubRepo)) {
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
      { error: 'Processing failed' },
      { status: 500 }
    );
  }
}
