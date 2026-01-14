/**
 * File with intentional unicorn errors.
 * These should trigger oxlint unicorn plugin rules.
 *
 * Expected errors:
 * - unicorn/no-array-for-each
 * - unicorn/no-new-array
 * - unicorn/prefer-number-properties
 * - unicorn/new-for-builtins
 * - unicorn/no-instanceof-array
 * - unicorn/prefer-array-flat-map
 */

// unicorn/no-array-for-each: Prefer for...of
export function processItems(items) {
  const results = [];
  items.forEach((item) => {
    results.push(item.toUpperCase());
  });
  return results;
}

// unicorn/no-new-array: Prefer Array.from or literal
export function createArray(size) {
  return new Array(size);
}

// unicorn/prefer-number-properties: Use Number.isNaN
export function checkNaN(value) {
  return isNaN(value);
}

// unicorn/throw-new-error: Throw must use new
export function throwBadError() {
  throw Error("bad error");
}

// unicorn/no-instanceof-array: Use Array.isArray
export function checkArray(value) {
  return value instanceof Array;
}

// unicorn/prefer-array-flat-map: Prefer flatMap
export function flattenAndMap(items) {
  return items.map((x) => [x, x * 2]).flat();
}

// unicorn/prefer-string-slice: Prefer slice over substring
export function getSubstring(str) {
  return str.substring(0, 5);
}

// unicorn/no-lonely-if: Combine nested if
export function checkConditions(a, b) {
  if (a) {
    // nothing
  } else {
    if (b) {
      return true;
    }
  }
  return false;
}
