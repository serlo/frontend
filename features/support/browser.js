const webdriver = require('selenium-webdriver')

/**
 * browser should be an abstraction over the driver tool we want to use
 * if we decide later to use another tool, we would have to change mainly this file
 */
class Browser {
  async start() {
    const driver = new webdriver.Builder().forBrowser('chrome').build()
    await driver.manage().window().maximize()

    const TIMEOUT = 10000
    await driver
      .manage()
      .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT })

    this.driver = driver
  }
  visit(path) {
    return this.driver.get(`http://localhost:3000${path}`)
  }

  fillInWith(name, value) {
    return this.driver.findElement({ name }).sendKeys(value)
  }

  clickButton(text) {
    return this.driver
      .findElement({ xpath: `//button[text()='${text}']` })
      .click()
  }

  clickText(text) {
    return this.driver.findElement({ xpath: `//*[text()='${text}']` }).click()
  }

  seeText(text) {
    return this.driver.findElement({ xpath: `//*[text()='${text}']` })
  }

  seeInput(name) {
    return this.driver.findElement({ name })
  }

  close() {
    this.driver.close()
  }

  assertPath(path) {
    console.assert(
      this.driver.getCurrentUrl() === `http://localhost:3000${path}`
    )
  }
}

const browser = new Browser()

module.exports = { browser }
