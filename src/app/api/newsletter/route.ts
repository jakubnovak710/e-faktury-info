import { NextResponse } from 'next/server';
import { sanitizeInput } from '@/lib/security/sanitize';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = sanitizeInput(body.email ?? '');

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Placeholder — integrate with your newsletter provider:
    // - Database: store in subscribers table
    // - Mailchimp/ConvertKit/Resend: API call
    console.log(`[Newsletter] New subscriber: ${email}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
