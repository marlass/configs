/**
 * File with intentional vitest errors.
 * These should trigger oxlint vitest/jest plugin rules.
 *
 * Expected errors:
 * - jest/no-focused-tests
 * - jest/no-disabled-tests
 * - jest/expect-expect
 * - jest/no-conditional-expect
 */

import { describe, expect, it, test } from "vitest";

// vitest/no-identical-title: Duplicate test titles
describe("Calculator", () => {
  it("should add numbers", () => {
    expect(1 + 1).toBe(2);
  });

  it("should add numbers", () => {
    expect(2 + 2).toBe(4);
  });
});

// vitest/no-focused-tests: Focused test
describe.only("Focused suite", () => {
  it("this will skip other tests", () => {
    expect(true).toBe(true);
  });
});

// vitest/no-disabled-tests: Disabled test
describe("Disabled tests", () => {
  it.skip("this test is skipped", () => {
    expect(1).toBe(1);
  });

  test.todo("this test is not implemented");
});

// vitest/expect-expect: Test without assertion
describe("Missing assertions", () => {
  it("should have an assertion", () => {
    const result = 1 + 1;
    console.log(result);
  });
});

// vitest/no-conditional-expect: Conditional expect
describe("Conditional assertions", () => {
  it("conditionally asserts", () => {
    const value = Math.random();
    if (value > 0.5) {
      expect(value).toBeGreaterThan(0.5);
    }
  });
});
