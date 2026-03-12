/**
 * Sanitize user input to prevent XSS and injection attacks.
 * For use at system boundaries (form inputs, query params, API bodies).
 */

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#96;',
};

const ENTITY_REGEX = /[&<>"'`/]/g;

/**
 * Escape HTML special characters in a string.
 */
export function escapeHtml(str: string): string {
  return str.replace(ENTITY_REGEX, (char) => HTML_ENTITIES[char] ?? char);
}

/**
 * Strip HTML tags from a string.
 */
export function stripTags(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Sanitize a string input: trim, strip tags, escape remaining HTML entities.
 */
export function sanitizeInput(input: string): string {
  return escapeHtml(stripTags(input.trim()));
}

/**
 * Sanitize all string values in an object (shallow).
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result = { ...obj };
  for (const key of Object.keys(result)) {
    const value = result[key];
    if (typeof value === 'string') {
      (result as Record<string, unknown>)[key] = sanitizeInput(value);
    }
  }
  return result;
}
