// i am created in feature branch.

import { test, expect } from "../fixtures/fixture"
import { getCredentials } from "../utils/credentials.js"

test("login", async ({page, loginpage})=>{

await page.goto("/login")

await loginpage.loginToApplication(getCredentials("admin"))

await expect(page.getByRole("heading", {name: "Learn Automation Courses"})).toBeVisible()

})



// where to keep the credentials?