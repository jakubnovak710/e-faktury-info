import { describe, it, expect } from 'vitest';
import { escapeHtml, stripTags, sanitizeInput, sanitizeObject } from '@/lib/security/sanitize';

describe('escapeHtml', () => {
  it('escapes HTML special characters', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
    );
  });

  it('returns empty string for empty input', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('passes through safe strings unchanged', () => {
    expect(escapeHtml('Hello world 123')).toBe('Hello world 123');
  });
});

describe('stripTags', () => {
  it('removes HTML tags', () => {
    expect(stripTags('<p>Hello <b>world</b></p>')).toBe('Hello world');
  });

  it('handles self-closing tags', () => {
    expect(stripTags('Hello<br/>world')).toBe('Helloworld');
  });
});

describe('sanitizeInput', () => {
  it('trims, strips tags, and escapes', () => {
    expect(sanitizeInput('  <b>Hello</b> & "world"  ')).toBe(
      'Hello &amp; &quot;world&quot;'
    );
  });
});

describe('sanitizeObject', () => {
  it('sanitizes all string values', () => {
    const result = sanitizeObject({
      name: '<script>alert(1)</script>',
      count: 42,
      active: true,
    });
    expect(result.name).toBe('alert(1)');
    expect(result.count).toBe(42);
    expect(result.active).toBe(true);
  });
});
