import { describe, it, expect } from 'vitest';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';

describe('createMetadata', () => {
  it('returns default metadata when no options provided', () => {
    const meta = createMetadata();
    expect(meta.title).toBe('Universal Web');
    expect(meta.description).toBeDefined();
  });

  it('applies title template', () => {
    const meta = createMetadata({ title: 'About' });
    expect(meta.title).toBe('About | Universal Web');
  });

  it('sets noIndex robots', () => {
    const meta = createMetadata({ noIndex: true });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it('includes keywords when provided', () => {
    const meta = createMetadata({ keywords: ['next.js', 'framework'] });
    expect(meta.keywords).toEqual(['next.js', 'framework']);
  });

  it('generates article type openGraph', () => {
    const meta = createMetadata({
      title: 'Blog Post',
      type: 'article',
      publishedTime: '2026-01-01',
    });
    expect(meta.openGraph).toHaveProperty('type', 'article');
  });
});
