/**
 * File with intentional promise errors.
 * These should trigger oxlint promise plugin rules.
 *
 * Expected errors:
 * - promise/catch-or-return
 * - promise/always-return
 * - promise/no-callback-in-promise
 * - unicorn/no-useless-promise-resolve-reject
 */

// promise/no-return-wrap: Unnecessary Promise.resolve wrapper
export async function unnecessaryWrap() {
  return Promise.resolve("already in async");
}

// promise/no-nesting: Nested promises
export function nestedPromises() {
  return fetch("/api/users").then((response) => {
    return response.json().then((data) => {
      return data.map((user) => user.name);
    });
  });
}

// promise/catch-or-return: Promise without catch
export function noCatch() {
  fetch("/api/data").then((response) => {
    console.log(response);
  });
}

// promise/no-promise-in-callback: Promise inside callback
export function promiseInCallback(items, callback) {
  items.forEach((item) => {
    fetch(`/api/items/${item.id}`).then((response) => {
      callback(response);
    });
  });
}

// promise/no-return-wrap in reject
export function badReject(condition) {
  return new Promise((resolve, reject) => {
    if (condition) {
      return Promise.reject(new Error("bad"));
    }
    resolve("ok");
  });
}
