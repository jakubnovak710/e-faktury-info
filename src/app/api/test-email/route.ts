import { NextResponse } from 'next/server';
import { notify } from '@/lib/email';

/**
 * DEV ONLY — Test email notifications.
 * GET /api/test-email?type=error|fix-started|fix-success|fix-failed
 */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') ?? 'error';

  const testError = {
    errorMessage: 'TypeError: Cannot read properties of undefined (reading "map")',
    errorStack: `TypeError: Cannot read properties of undefined (reading "map")
    at ProductList (src/components/product-list.tsx:42:18)
    at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:16305:18)`,
    url: 'https://example.com/products',
    sentryUrl: 'https://sentry.io/issues/TEST-123',
  };

  try {
    switch (type) {
      case 'error':
        await notify.errorDetected(testError);
        break;
      case 'fix-started':
        await notify.fixStarted({
          errorMessage: testError.errorMessage,
          prUrl: 'https://github.com/user/repo/pull/42',
          analysis: 'The error occurs because the products array is undefined when the component mounts before data fetching completes. Fix: add optional chaining and loading state.',
        });
        break;
      case 'fix-success':
        await notify.fixSucceeded({
          errorMessage: testError.errorMessage,
          prUrl: 'https://github.com/user/repo/pull/42',
        });
        break;
      case 'fix-failed':
        await notify.fixFailed({
          errorMessage: testError.errorMessage,
          prUrl: 'https://github.com/user/repo/pull/42',
          analysis: 'The fix attempt addressed the wrong root cause. The actual issue is a missing API response validation.',
        });
        break;
      default:
        return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, type, message: `Test "${type}" emails sent` });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
