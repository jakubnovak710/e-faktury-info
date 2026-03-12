import { describe, it, expect } from 'vitest';
import { isEnabled, withFeature } from '@/lib/features';

describe('isEnabled', () => {
  it('returns true for enabled features', () => {
    expect(isEnabled('email')).toBe(true);
    expect(isEnabled('monitoring')).toBe(true);
  });

  it('returns false for disabled features', () => {
    expect(isEnabled('auth')).toBe(false);
    expect(isEnabled('database')).toBe(false);
  });
});

describe('withFeature', () => {
  it('returns value when feature is enabled', () => {
    expect(withFeature('email', 'hello')).toBe('hello');
  });

  it('returns null when feature is disabled', () => {
    expect(withFeature('auth', 'hello')).toBeNull();
  });
});
