// utils/credentials.js
export function getCredentials(role) {
  const prefix = role.toUpperCase();
  const username = process.env[`${prefix}_USERNAME`];
  const password = process.env[`${prefix}_PASSWORD`];

  if (!username || !password) {
    throw new Error(
      `Missing credentials for role "${role}". Expected ${prefix}_USERNAME and ${prefix}_PASSWORD.`
    );
  }
  return { username, password };
}