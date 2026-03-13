import { NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { validateCsrf } from '@/lib/security/csrf';

const newsletterSchema = z.object({
  email: z.email().max(320),
});

export async function POST(request: Request) {
  if (!(await validateCsrf(request))) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const { email } = result.data;

    // Placeholder — integrate with your newsletter provider:
    // - Database: store in subscribers table
    // - Mailchimp/ConvertKit/Resend: API call
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Newsletter] New subscriber: ${email}`);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
