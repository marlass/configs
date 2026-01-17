/**
 * Valid JavaScript file that should pass all oxlint rules.
 * Tests: eslint, unicorn, jsdoc, promise, node, security plugins
 */

/**
 * Adds two numbers together.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 */
export function add(a, b) {
  return a + b;
}

/**
 * Fetches data from an API endpoint.
 * @param {string} url - The URL to fetch
 * @returns {Promise<unknown>} The fetched data
 */
export async function fetchData(url) {
  const response = await globalThis.fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
}

/**
 * Processes an array of items.
 * @param {string[]} items - Array of items to process
 * @returns {string[]} Processed items
 */
export function processItems(items) {
  /** @type {string[]} */
  const result = [];
  for (const item of items) {
    if (item.length > 0) {
      result.push(item.toUpperCase());
    }
  }
  return result;
}

/**
 * Creates a safe regex pattern.
 * @param {string} input - Input to escape
 * @returns {string} Escaped regex pattern
 */
export function escapeRegex(input) {
  return input.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

export const CONFIG = Object.freeze({
  maxRetries: 3,
  timeout: 5000,
});
