import {BasePage} from '../pages/BasePage.js'
export class LoginPage extends BasePage{
    constructor(page){
        super(page)
        this.page = page
        this.userName = page.getByPlaceholder("Enter Email")
        this.password = page.getByPlaceholder("Enter Password")
        this.signIn = page.getByRole("button", {name: 'Sign in'})
    }

    async loginToApplication({username, password}){
        await this.userName.fill(username)
        await this.password.fill(password)
        await this.click(this.signIn, "Sign in button")
    }
}