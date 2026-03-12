import { NextResponse } from 'next/server';
import { sendAdminEmail } from '@/lib/email';
import { sanitizeObject } from '@/lib/security/sanitize';
import { isEnabled } from '@/lib/features';
import { siteConfig } from '@config/site.config';

export async function POST(request: Request) {
  if (!isEnabled('email')) {
    return NextResponse.json({ error: 'Email module is disabled' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { name, email, message } = sanitizeObject(body as Record<string, string>);

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sendAdminEmail(
      `[${siteConfig.name}] Kontaktný formulár: ${name}`,
      `<p><strong>Meno:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Správa:</strong></p>
       <p>${message}</p>`
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
