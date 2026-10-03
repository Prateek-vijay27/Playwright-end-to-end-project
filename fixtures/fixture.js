
import {test as base, expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
const test = base.extend({

    loginpage: async({page},use)=>{

        const Lp = new LoginPage(page)
        await use(Lp)
    }
})

export {test,expect}