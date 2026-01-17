/**
 * Valid TypeScript file that should pass all oxlint rules.
 * Tests: typescript, eslint plugins with type-aware rules
 */

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

type UserRole = "admin" | "user" | "guest";

interface AuthenticatedUser extends User {
  role: UserRole;
  permissions: string[];
}

/**
 * Creates a new user object.
 * @param name - The user's name
 * @param email - The user's email
 * @returns A new user object
 */
export function createUser(name: string, email: string): User {
  return {
    // oxlint-disable-next-line no-magic-numbers
    id: Math.floor(Math.random() * 10_000),
    name,
    email,
    createdAt: new Date(),
  };
}

/**
 * Validates an email address.
 * @param email - Email to validate
 * @returns True if valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Gets full name with role.
 * @param user - The authenticated user
 * @returns Formatted string
 */
export function formatUserWithRole(user: AuthenticatedUser): string {
  return `${user.name} (${user.role})`;
}

/**
 * Filters users by role.
 * @param users - Array of users
 * @param role - Role to filter by
 * @returns Filtered users
 */
export function filterByRole(
  users: AuthenticatedUser[],
  role: UserRole,
): AuthenticatedUser[] {
  return users.filter((user) => {return user.role === role});
}

/**
 * Safely parses JSON with a type guard validator.
 * @param input - JSON string to parse
 * @param validator - Type guard validation function
 * @returns Parsed value or undefined
 */
export function safeJsonParse<T>(
  input: string,
  validator: (value: unknown) => value is T,
): T | undefined {
  try {
    const parsed: unknown = JSON.parse(input);
    return validator(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}
