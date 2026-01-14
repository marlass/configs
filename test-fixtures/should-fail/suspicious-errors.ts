/**
 * File with intentional suspicious code patterns.
 * These should trigger oxlint suspicious category rules.
 *
 * Expected errors:
 * - no-debugger
 * - no-duplicate-case
 * - no-fallthrough
 * - no-shadow-restricted-names
 * - no-empty
 * - no-async-promise-executor
 */

// no-debugger: Debugger statement in code
export function processValue(x: number) {
  debugger;
  return x * 2;
}

// no-duplicate-case: Duplicate case in switch
export function getLabel(code: string): string {
  switch (code) {
    case "A":
      return "Alpha";
    case "B":
      return "Beta";
    case "A": // duplicate case
      return "Also Alpha";
    default:
      return "Unknown";
  }
}

// no-fallthrough: Fallthrough in switch without break or comment
export function getRisk(level: number): string {
  let result = "";
  switch (level) {
    case 1:
      result = "low";
    case 2:
      result = "medium";
      break;
    case 3:
      result = "high";
      break;
    default:
      result = "unknown";
  }
  return result;
}

// no-shadow-restricted-names: Shadowing undefined
export function badShadow() {
  const undefined = "oops";
  return undefined;
}

// no-empty: Empty block statement
export function emptyTryCatch() {
  try {
    throw new Error("test");
  } catch (e) {}
}

// no-async-promise-executor: Async executor in Promise
export const badPromise = new Promise(async (resolve, reject) => {
  const data = await fetch("/api");
  resolve(data);
});
