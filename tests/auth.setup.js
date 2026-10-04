// tests/auth.setup.js
import { test as setup } from "../fixtures/fixture";
import { getCredentials } from '../utils/credentials.js';


const authFile = '.auth/agent.json';

setup('authenticate as agent', async ({ page,loginpage}) => {
//   const { username, password } = getCredentials('agent');

  await page.goto('/login');
//   await page.getByLabel('Username').fill(username);
//   await page.getByLabel('Password').fill(password);
//   await page.getByRole('button', { name: 'Sign in' }).click();
  await loginpage.loginToApplication(getCredentials("admin"))

  // Wait until the app has actually written the token
  await page.waitForFunction(() => localStorage.getItem('jwt') !== null);

  // Save cookies + localStorage into the file
  await page.context().storageState({ path: authFile });
});



/*

Step 1: Create the setup file tests/auth.setup.js
Step 2: Add the projects and dependencies in playwright.config.js
Step 3: Write and run tests without any login code ( as login is handled by setup file)
Step 4: check that a .auth folder is created and agent.json is created inside it and contain the token data

Flow -> auth.setup.js (logs in) → saves agent.json → the config makes every browser project load that file → tests start logged in.
*/