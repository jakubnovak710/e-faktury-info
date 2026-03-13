import { NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { sendAdminEmail } from '@/lib/email';
import { escapeHtml } from '@/lib/security/sanitize';
import { validateCsrf } from '@/lib/security/csrf';
import { isEnabled } from '@/lib/features';
import { siteConfig } from '@config/site.config';

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.email().max(320),
  message: z.string().min(1).max(5000),
});

export async function POST(request: Request) {
  if (!isEnabled('email')) {
    return NextResponse.json({ error: 'Email module is disabled' }, { status: 503 });
  }

  if (!(await validateCsrf(request))) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { name, email, message } = result.data;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    await sendAdminEmail(
      `[${siteConfig.name}] Kontaktný formulár: ${safeName}`,
      `<p><strong>Meno:</strong> ${safeName}</p>
       <p><strong>Email:</strong> ${safeEmail}</p>
       <p><strong>Správa:</strong></p>
       <p>${safeMessage}</p>`
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
