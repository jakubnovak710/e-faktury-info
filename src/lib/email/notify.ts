import { sendAdminEmail, sendClientEmail } from './send';
import { adminErrorTemplate } from './templates/admin-error';
import { adminFixTemplate } from './templates/admin-fix';
import { clientIssueTemplate } from './templates/client-issue';
import { siteConfig } from '@config/site.config';

/**
 * Notification orchestrator — maps events to the correct emails
 * for both admin and client recipients.
 */
export const notify = {
  /**
   * Error detected in production.
   * Admin: full technical details + Sentry link
   * Client: "We detected an issue, working on it"
   */
  async errorDetected(data: {
    errorMessage: string;
    errorStack?: string;
    url?: string;
    sentryUrl?: string;
  }) {
    const timestamp = new Date().toISOString();

    await Promise.all([
      sendAdminEmail(
        `[${siteConfig.name}] Error: ${data.errorMessage.slice(0, 60)}`,
        adminErrorTemplate({ ...data, timestamp })
      ),
      sendClientEmail(
        `[${siteConfig.name}] Zachytili sme problém`,
        clientIssueTemplate({ status: 'detected', timestamp })
      ),
    ]);
  },

  /**
   * Self-healing fix attempt started.
   * Admin: PR link + AI analysis
   * Client: nothing (don't spam)
   */
  async fixStarted(data: {
    errorMessage: string;
    prUrl?: string;
    analysis?: string;
  }) {
    await sendAdminEmail(
      `[${siteConfig.name}] Fix started: ${data.errorMessage.slice(0, 60)}`,
      adminFixTemplate({
        ...data,
        status: 'started',
        timestamp: new Date().toISOString(),
      })
    );
  },

  /**
   * Fix deployed successfully.
   * Admin: deploy status
   * Client: "Issue resolved"
   */
  async fixSucceeded(data: {
    errorMessage: string;
    prUrl?: string;
  }) {
    const timestamp = new Date().toISOString();

    await Promise.all([
      sendAdminEmail(
        `[${siteConfig.name}] Fix deployed: ${data.errorMessage.slice(0, 60)}`,
        adminFixTemplate({
          ...data,
          status: 'success',
          timestamp,
        })
      ),
      sendClientEmail(
        `[${siteConfig.name}] Problém vyriešený`,
        clientIssueTemplate({ status: 'resolved', timestamp })
      ),
    ]);
  },

  /**
   * Fix failed — manual intervention needed.
   * Admin: rollback info + action needed
   * Client: "Team has been notified"
   */
  async fixFailed(data: {
    errorMessage: string;
    prUrl?: string;
    analysis?: string;
  }) {
    const timestamp = new Date().toISOString();

    await Promise.all([
      sendAdminEmail(
        `[${siteConfig.name}] Fix FAILED: ${data.errorMessage.slice(0, 60)}`,
        adminFixTemplate({
          ...data,
          status: 'failed',
          timestamp,
        })
      ),
      sendClientEmail(
        `[${siteConfig.name}] Tím bol notifikovaný`,
        clientIssueTemplate({ status: 'team-notified', timestamp })
      ),
    ]);
  },
};
