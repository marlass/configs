/**
 * Valid test file that should pass all oxlint rules.
 * Tests: vitest plugin
 */

import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

function createCalculator(): Calculator {
  return {
    add: (a, b) => {return a + b},
    subtract: (a, b) => {return a - b},
  };
}

describe("calculator", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = createCalculator();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("add", () => {
    it("should add two positive numbers", () => {
      // oxlint-disable-next-line no-magic-numbers
      expect(calculator.add(2, 3)).toBe(5);
    });

    it("should add negative numbers", () => {
      // oxlint-disable-next-line no-magic-numbers
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    it("should handle zero", () => {
      // oxlint-disable-next-line no-magic-numbers
      expect(calculator.add(0, 5)).toBe(5);
    });
  });

  describe("subtract", () => {
    it("should subtract two numbers", () => {
      // oxlint-disable-next-line no-magic-numbers
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    it("should return negative when second is larger", () => {
      // oxlint-disable-next-line no-magic-numbers
      expect(calculator.subtract(3, 5)).toBe(-2);
    });
  });
});

async function mockFetch(): Promise<{ data: string }> {
  const response = await Promise.resolve({ data: "test" });
  return response;
}

async function mockFailingFetch(): Promise<never> {
  const error = await Promise.resolve(new Error("Failed"));
  throw error;
}

describe("async operations", () => {
  it("should handle async functions", async () => {
    const fetchData = vi.fn(mockFetch);
    const result = await fetchData();
    expect(result).toStrictEqual({ data: "test" });
    expect(fetchData).toHaveBeenCalledTimes(1);
  });

  it("should handle rejected promises", async () => {
    const failingFn = vi.fn(mockFailingFetch);
    await expect(failingFn()).rejects.toThrow("Failed");
  });
});
