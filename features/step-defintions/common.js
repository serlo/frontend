const { Given, Then } = require('cucumber')

Given('I visit page /', async function () {
  await this.driver.get('http://localhost:3000')
})

Then('I see the text Serlo', async function () {
  const page = await this.driver.getPageSource()
  page.includes('Serlo')
})
