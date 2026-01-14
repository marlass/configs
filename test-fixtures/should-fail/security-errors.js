/**
 * File with intentional security errors.
 * These should trigger oxlint security-related rules.
 *
 * Note: The security plugin is not enabled; these patterns are caught by other rules.
 *
 * Expected errors:
 * - no-eval
 */

import * as fs from "node:fs";

// security/detect-unsafe-regex: ReDoS vulnerable regex
export function validateInput(input) {
  const unsafeRegex = /^(a+)+$/;
  return unsafeRegex.test(input);
}

// security/detect-eval-with-expression: Dynamic eval
export function dangerousEval(userCode) {
  return eval(userCode);
}

// security/detect-non-literal-fs-filename: Dynamic file path
export function readUserFile(filename) {
  return fs.readFileSync(filename, "utf8");
}

// security/detect-object-injection: Bracket notation with variable
export function getProperty(obj, key) {
  return obj[key];
}

// Additional security issues
export function executeCommand(cmd) {
  return eval("(" + cmd + ")");
}
