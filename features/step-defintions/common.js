const { Given, When, Then } = require('cucumber')

Given('I visit page {string}', function (path) {
  return this.browser.visit(path)
})

When('I fill in {string} with {string}', function (name, value) {
  return this.browser.fillInWith(name, value)
})

When('I click on the button {string}', function (text) {
  return this.browser.clickButton(text)
})

When('I click on {string}', function (text) {
  return this.browser.clickText(text)
})

Then('I should see the text {string}', function (text) {
  return this.browser.seeText(text)
})

Then('I should see {string} input', function (name) {
  return this.browser.seeInput(name)
})

Then('I should be on page {string}', function (path) {
  return this.browser.assertPath(path)
})
