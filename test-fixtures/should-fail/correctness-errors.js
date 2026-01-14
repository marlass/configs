/**
 * File with intentional correctness errors.
 * These should trigger oxlint correctness category rules.
 *
 * Expected errors:
 * - no-const-assign
 * - no-unused-vars
 * - no-undef
 * - valid-typeof
 * - no-sparse-arrays
 * - unicorn/no-negation-in-equality-check
 */

// no-const-assign: Cannot reassign const
const value = 10;
value = 20;

// no-unused-vars: Variable declared but never used
const unusedVariable = "never used";

// no-undef: Using undefined variable
console.log(undefinedVariable);

// valid-typeof: Invalid typeof comparison
if (typeof x === "nunber") {
  console.log("typo in number");
}

// no-sparse-arrays: Sparse array with holes
const sparseArray = [1, , 3];

// no-unsafe-negation: Unsafe negation
const obj = { a: 1 };
if (!("a" in obj) === false) {
  console.log("unsafe");
}

export { sparseArray };
