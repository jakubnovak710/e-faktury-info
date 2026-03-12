import { getTransporter } from './transport';
import { emailConfig } from '@config/email.config';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Send an email with automatic retry on failure.
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const transporter = getTransporter();
  const recipients = Array.isArray(options.to) ? options.to.join(', ') : options.to;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await transporter.sendMail({
        from: `"${emailConfig.from.name}" <${emailConfig.from.email}>`,
        to: recipients,
        subject: options.subject,
        html: options.html,
        ...(options.replyTo && { replyTo: options.replyTo }),
      });
      return true;
    } catch (error) {
      console.error(`[Email] Attempt ${attempt}/${MAX_RETRIES} failed:`, error);
      if (attempt < MAX_RETRIES) {
        await delay(RETRY_DELAY_MS * attempt);
      }
    }
  }

  console.error(`[Email] All ${MAX_RETRIES} attempts failed for: ${options.subject}`);
  return false;
}

/**
 * Send email to admin.
 */
export async function sendAdminEmail(subject: string, html: string): Promise<boolean> {
  return sendEmail({ to: emailConfig.adminEmail, subject, html });
}

/**
 * Send email to all configured client emails.
 */
export async function sendClientEmail(subject: string, html: string): Promise<boolean> {
  if (emailConfig.clientEmails.length === 0) return true;
  return sendEmail({ to: emailConfig.clientEmails, subject, html });
}
