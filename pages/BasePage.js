

export class BasePage{
    constructor(page){
        this.page = page
    }

    async click(locator, name){
        try{
            console.log(`clicking: ${name}`)
            await locator.click({timeout:5000})
        } catch(error){
            await this.page.screenshot({path: `error-findings+ss/error-${name}.png`})
            throw error
        }
    }
}