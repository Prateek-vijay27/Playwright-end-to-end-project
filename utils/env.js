// utils/env.js
import { existsSync } from 'node:fs';
import path from 'node:path';

export function loadEnv(envName) {
  const file = path.resolve(import.meta.dirname, '..', 'env', `.env.${envName}`);
  // In CI the file doesn't exist; variables come from the pipeline.
  // loadEnvFile never overrides variables that are already set, so CI always wins.
  if (existsSync(file)) process.loadEnvFile(file);
}


/*
Short notes
1. Credentials
Never hardcode credentials in test scripts or commit them to Git.
Tests read only process.env.
Local runs: gitignored env/.env.dev, .env.qa and .env.staging hold the real values.
CI runs: the pipeline's secret store (GitHub Actions secrets, Azure DevOps variable groups, Vault) supplies the same keys.
.env.example is committed with keys only, no values.
Use dedicated test accounts, never personal or production ones.

2. Why loadEnv is needed
Node doesn't read .env files automatically, so a file in env/ is just text.
loadEnv(envName) picks env/.env.<name> and copies its KEY=VALUE lines into process.env.
It skips quietly in CI, where the file doesn't exist, and never overrides variables already set.
You can't import a .env file, and reading the file directly breaks in CI.

3. Execution flow
TEST_ENV is set → playwright.config.js loads → loadEnv runs → process.env is filled → 
workers start and inherit it → tests call getCredentials() → login.

The config runs once at startup and again in each worker, so keep side effects out of it.


4. Running tests
package.json
"scripts": {
  "test:qa": "cross-env TEST_ENV=qa playwright test"
}
cross-env makes the TEST_ENV=... prefix work on Windows too.
Inside package.json scripts, npx isn't needed. In a raw terminal it is.
Pass extra arguments with npm run test:qa -- --headed.



*/ 