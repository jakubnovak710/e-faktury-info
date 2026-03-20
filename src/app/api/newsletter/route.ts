import { NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { validateCsrf } from '@jakubnovak710/universal-web-core/lib/security/csrf';

const newsletterSchema = z.object({
  email: z.email().max(320),
  consentNewsletter: z.literal(true),
  consentVersion: z.string().min(1).max(50),
});

export async function POST(request: Request) {
  if (!(await validateCsrf(request))) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { email, consentVersion } = result.data;

    // Consent record for GDPR compliance (čl. 7 ods. 1 GDPR)
    const consentRecord = {
      email,
      consentNewsletter: true,
      consentVersion,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown',
      userAgent: request.headers.get('user-agent') ?? 'unknown',
    };

    // Placeholder — integrate with your newsletter provider:
    // - Database: store in subscribers table with consent record
    // - Mailchimp/ConvertKit/Resend: API call + metadata
    if (process.env.NODE_ENV === 'development') {
      console.log('[Newsletter] Consent record:', JSON.stringify(consentRecord));
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
