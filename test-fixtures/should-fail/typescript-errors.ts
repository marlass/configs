/**
 * File with intentional TypeScript errors.
 * These should trigger oxlint typescript plugin rules.
 *
 * Expected errors:
 * - typescript/no-explicit-any
 * - typescript/no-non-null-assertion
 * - typescript/prefer-as-const
 * - typescript/no-unnecessary-type-assertion
 * - typescript/ban-ts-comment
 */

// typescript/no-explicit-any: Using any type
export function processAnything(data: any): any {
  return data;
}

// typescript/no-non-null-assertion: Non-null assertion
interface User {
  name?: string;
  email?: string;
}

export function getUserName(user: User): string {
  return user.name!;
}

// typescript/prefer-as-const: Should use as const
export const config = {
  mode: "production" as "production",
  debug: false as false,
};

// typescript/no-unnecessary-type-assertion: Unnecessary assertion
export function unnecessaryAssertion(value: string) {
  return (value as string).toUpperCase();
}

// typescript/ban-ts-comment: Using @ts-ignore without explanation
// @ts-ignore
export function ignoredFunction() {
  return undeclaredVariable;
}

// typescript/no-empty-interface: Empty interface
interface EmptyInterface {}

// typescript/no-inferrable-types: Inferrable type annotation
export const inferrableString: string = "hello";
export const inferrableNumber: number = 42;

export type { EmptyInterface };
