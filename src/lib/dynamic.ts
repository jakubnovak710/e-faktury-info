import dynamic from 'next/dynamic';

/**
 * Lazy-load a heavy component with SSR disabled.
 * Usage: const HeavyChart = lazyLoad(() => import('@/components/chart'));
 */
export function lazyLoad<T extends React.ComponentType>(
  loader: () => Promise<{ default: T }>,
) {
  return dynamic(loader, { ssr: false });
}
