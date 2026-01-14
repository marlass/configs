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
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
  };
}

describe("Calculator", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = createCalculator();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("add", () => {
    it("should add two positive numbers", () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it("should add negative numbers", () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    it("should handle zero", () => {
      expect(calculator.add(0, 5)).toBe(5);
    });
  });

  describe("subtract", () => {
    it("should subtract two numbers", () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    it("should return negative when second is larger", () => {
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

describe("Async operations", () => {
  it("should handle async functions", async () => {
    const fetchData = vi.fn(mockFetch);
    const result = await fetchData();
    expect(result).toEqual({ data: "test" });
    expect(fetchData).toHaveBeenCalledOnce();
  });

  it("should handle rejected promises", async () => {
    const failingFn = vi.fn(mockFailingFetch);
    await expect(failingFn()).rejects.toThrow("Failed");
  });
});
