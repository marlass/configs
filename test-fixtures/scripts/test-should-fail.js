#!/usr/bin/env node

/**
 * Test script that verifies oxlint correctly reports errors in should-fail fixtures.
 *
 * This script:
 * 1. Reads each fixture file and extracts expected rules from header comments
 * 2. Runs oxlint on each file
 * 3. Verifies that all expected rules are triggered
 * 4. Reports any missing rules
 */

import { spawn } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const shouldFailDir = join(rootDir, "should-fail");

/**
 * Extract expected rule names from file header comment.
 * Looks for lines like "* - rule-name" or "* - plugin/rule-name"
 */
function extractExpectedRules(filePath) {
  const content = readFileSync(filePath, "utf8");
  const rules = [];

  // Match lines like " * - rule-name" or " * - plugin/rule-name"
  const rulePattern = /^\s*\*\s*-\s*([\w-]+(?:\/[\w-]+)?)\s*$/gm;
  let match;

  while ((match = rulePattern.exec(content)) !== null) {
    rules.push(match[1]);
  }

  return rules;
}

/**
 * Normalize a triggered rule from oxlint output to match expected format.
 * oxlint outputs: eslint-plugin-react(jsx-key) -> we want: react/jsx-key
 */
function normalizeTriggeredRule(prefix, ruleName) {
  // Handle eslint-plugin-* format
  if (prefix.startsWith("eslint-plugin-")) {
    const pluginName = prefix.replace("eslint-plugin-", "");
    return `${pluginName}/${ruleName}`;
  }

  // Handle typescript-eslint format
  if (prefix === "typescript-eslint") {
    return `typescript/${ruleName}`;
  }

  // Handle react-hooks -> react for rules-of-hooks
  if (prefix === "eslint-plugin-react-hooks") {
    return `react/${ruleName}`;
  }

  // Core eslint rules
  if (prefix === "eslint") {
    return ruleName;
  }

  return `${prefix}/${ruleName}`;
}

/**
 * Normalize expected rule name for comparison.
 */
function normalizeExpectedRule(rule) {
  // Map expected prefixes to canonical forms
  const aliasMap = {
    "vitest/": ["jest/", "vitest/"],
    "jsx-a11y/": ["jsx-a11y/", "jsx_a11y/"],
  };

  for (const [expected, aliases] of Object.entries(aliasMap)) {
    if (rule.startsWith(expected)) {
      return aliases.map((alias) => rule.replace(expected, alias));
    }
  }

  return [rule];
}

/**
 * Extract triggered rules from oxlint output.
 * Parses lines like "eslint(rule-name):" or "eslint-plugin-unicorn(rule-name):"
 */
function extractTriggeredRules(output) {
  const rules = new Set();

  // Match patterns like "eslint(rule-name):" or "eslint-plugin-react(jsx-key):"
  // Format: plugin-name(rule-name): where plugin-name can contain hyphens
  const rulePattern = /([\w][\w-]*)\(([\w-]+)\):/g;
  let match;

  while ((match = rulePattern.exec(output)) !== null) {
    const prefix = match[1];
    const ruleName = match[2];
    const normalized = normalizeTriggeredRule(prefix, ruleName);
    rules.add(normalized);
  }

  return rules;
}

/**
 * Run oxlint on a single file and return the output.
 */
function runOxlint(filePath) {
  return new Promise((resolve, reject) => {
    const oxlint = spawn(
      "npx",
      ["oxlint", "-c", "oxlint.json", "--type-aware", filePath],
      {
        cwd: rootDir,
        stdio: "pipe",
      }
    );

    let stdout = "";
    let stderr = "";

    oxlint.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    oxlint.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    oxlint.on("close", (code) => {
      resolve({ code, stdout, stderr });
    });

    oxlint.on("error", (err) => {
      reject(err);
    });
  });
}

/**
 * Check if an expected rule was triggered.
 */
function isRuleTriggered(expectedRule, triggeredRules) {
  const variations = normalizeExpectedRule(expectedRule);
  return variations.some((variation) => triggeredRules.has(variation));
}

/**
 * Test a single fixture file.
 */
async function testFile(fileName) {
  const filePath = join(shouldFailDir, fileName);
  const relativePath = `should-fail/${fileName}`;

  const expectedRules = extractExpectedRules(filePath);
  if (expectedRules.length === 0) {
    return {
      file: fileName,
      status: "skip",
      message: "No expected rules defined in file header",
    };
  }

  const { code, stdout } = await runOxlint(relativePath);

  if (code === 0) {
    return {
      file: fileName,
      status: "fail",
      message: "oxlint reported no errors, but errors were expected",
      expectedRules,
      triggeredRules: [],
    };
  }

  const triggeredRules = extractTriggeredRules(stdout);

  // Check which expected rules were triggered
  const missingRules = [];
  const foundRules = [];

  for (const expectedRule of expectedRules) {
    if (isRuleTriggered(expectedRule, triggeredRules)) {
      foundRules.push(expectedRule);
    } else {
      missingRules.push(expectedRule);
    }
  }

  if (missingRules.length > 0) {
    return {
      file: fileName,
      status: "fail",
      message: `Missing expected rules: ${missingRules.join(", ")}`,
      expectedRules,
      triggeredRules: [...triggeredRules].sort(),
      missingRules,
      foundRules,
    };
  }

  return {
    file: fileName,
    status: "pass",
    message: `All ${expectedRules.length} expected rules triggered`,
    expectedRules,
    triggeredRules: [...triggeredRules].sort(),
    foundRules,
  };
}

async function main() {
  console.log("Testing should-fail fixtures...\n");

  const files = readdirSync(shouldFailDir).filter(
    (f) => f.endsWith(".js") || f.endsWith(".ts") || f.endsWith(".tsx")
  );

  const results = [];
  let hasFailures = false;

  for (const file of files) {
    const result = await testFile(file);
    results.push(result);

    if (result.status === "fail") {
      hasFailures = true;
    }
  }

  // Print results
  console.log("Results:\n");

  for (const result of results) {
    const icon =
      result.status === "pass"
        ? "✅"
        : result.status === "fail"
          ? "❌"
          : "⏭️";

    console.log(`${icon} ${result.file}`);
    console.log(`   ${result.message}`);

    if (result.status === "fail" && result.missingRules) {
      console.log(`   Expected: ${result.expectedRules.join(", ")}`);
      console.log(`   Found: ${result.foundRules?.join(", ") || "none"}`);
      console.log(`   Triggered: ${result.triggeredRules?.join(", ") || "none"}`);
    }

    console.log();
  }

  // Summary
  const passed = results.filter((r) => r.status === "pass").length;
  const failed = results.filter((r) => r.status === "fail").length;
  const skipped = results.filter((r) => r.status === "skip").length;

  console.log("─".repeat(50));
  console.log(`Summary: ${passed} passed, ${failed} failed, ${skipped} skipped`);

  if (hasFailures) {
    console.log("\n❌ FAIL: Some expected rules were not triggered");
    process.exit(1);
  } else {
    console.log("\n✅ PASS: All expected rules correctly triggered");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("❌ FAIL: Could not run tests:", err.message);
  process.exit(1);
});
