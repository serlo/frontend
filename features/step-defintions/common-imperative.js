/**
 * These imperative steps do not correspond to cucumber best
 * practices (see https://cucumber.io/docs/bdd/better-gherkin/)
 * But they can be used as starting point for non-technical testers.
 */

const { Given, When, Then } = require('cucumber')

Given('I go to path {string}', function (path) {
  return this.browser.visit(path)
})

Given('I visit the site {string}', function (url) {
  return this.browser.goTo(url)
})

When('I fill in input name {string} with value {string}', function (name, value) {
  return this.browser.fillInWith(name, value)
})

When('I click on the button {string}', function (text) {
  return this.browser.clickButton(text)
})

When('I click on {string}', function (text) {
  return this.browser.clickText(text)
})

When('I click on link that contains {string}', function (substring) {
  return this.browser.clickLinkContaining(substring)
})

Then('I should see the text {string}', function (text) {
  return this.browser.seeText(text)
})

Then('I should see {string} input', function (name) {
  return this.browser.seeInput(name)
})

Then('I should be on path {string}', function (path) {
  return this.browser.assertPath(path)
})

Then('I wait {int} seconds', function (time) {
  return this.browser.pause(time)
})

When('I put mouse over {string}', function (element) {
  return this.browser.hover(element)
})
