/**
 * Source Citation Box
 *
 * Displays last updated date and source references.
 * Used on all content pages for E-E-A-T authority signals.
 *
 * Usage:
 *   <SourceBox
 *     lastUpdated="Marec 2026"
 *     sources={['Zákon 385/2025 Z.z.', 'Finančná správa SR']}
 *   />
 */

interface SourceBoxProps {
  lastUpdated: string;
  sources: string[];
}

export function SourceBox({ lastUpdated, sources }: SourceBoxProps) {
  return (
    <p className="rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-4 text-sm">
      <strong>Posledná aktualizácia:</strong> {lastUpdated}
      {sources.length > 0 && (
        <>
          {' | '}
          <strong>Zdroj:</strong> {sources.join(', ')}
        </>
      )}
    </p>
  );
}
