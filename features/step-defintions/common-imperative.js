/**
 * These imperative steps do not correspond to cucumber best
 * practices (see https://cucumber.io/docs/bdd/better-gherkin/)
 * But they can be used as starting point for non-technical testers.
 */

const { Given, When, Then } = require('cucumber')

Given('I go to path {string}', async function (path) {
  await this.browser.visit(path)
})

Given('I visit the site {string}', async function (url) {
  await this.browser.goTo(url)
})

When(
  'I fill in input name {string} with value {string}',
  async function (name, value) {
    await this.browser.fillInWith(name, value)
  }
)

When('I click on the button {string}', async function (text) {
  await this.browser.clickButton(text)
})

When('I click on {string}', async function (text) {
  await this.browser.clickText(text)
})

When('I click on link that contains {string}', async function (substring) {
  await this.browser.clickLinkContaining(substring)
})

Then('I should see the text {string}', async function (text) {
  await this.browser.seeText(text)
})

Then('I should see {string} input', async function (name) {
  await this.browser.seeInput(name)
})

Then('I should be on path {string}', async function (path) {
  await this.browser.assertPath(path)
})

Then('I wait {int} seconds', async function (time) {
  await this.browser.pause(time)
})

When('I put mouse over {string}', async function (element) {
  await this.browser.hover(element)
})
