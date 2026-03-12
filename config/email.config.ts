import type { EmailConfig } from '@/types/site';

export const emailConfig: EmailConfig = {
  smtp: {
    host: process.env.SMTP_HOST ?? 'smtp.example.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER ?? '',
      pass: process.env.SMTP_PASS ?? '',
    },
  },
  from: {
    name: process.env.EMAIL_FROM_NAME ?? 'Universal Web',
    email: process.env.EMAIL_FROM ?? 'noreply@example.com',
  },
  adminEmail: process.env.ADMIN_EMAIL ?? 'admin@example.com',
  clientEmails: (process.env.CLIENT_EMAILS ?? '').split(',').filter(Boolean),
};
