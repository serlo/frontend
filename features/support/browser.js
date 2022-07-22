const webdriver = require('selenium-webdriver')
const { Builder } = webdriver
/**
 * browser should be an abstraction over the driver tool we want to use
 * if we decide later to use another tool, we would have to change mainly this file
 */
class Browser {
  async start() {
    const driver = new Builder().forBrowser('chrome').build()
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

  goTo(url) {
    return this.driver.get(url)
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

  async clickLinkContaining(substring, position = 0) {
    const links = await this.driver.findElements({
      xpath: `//a[contains(., '${substring}')]`,
    })

    return links[position].click()
  }

  seeText(text) {
    return this.driver.findElement({ xpath: `//*[text()='${text}']` })
  }

  seeInput(name) {
    return this.driver.findElement({ name })
  }

  async close() {
    await this.driver.close()
  }

  assertPath(path) {
    console.assert(
      this.driver.getCurrentUrl() === `http://localhost:3000${path}`
    )
  }

  pause(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  }

  hover(cssElement) {
    return this.driver
      .findElement(webdriver.By.css(cssElement))
      .then((element) => {
        return this.driver.actions().mouse({ origin: element, duration: 1000 })
      })
  }
}

const browser = new Browser()

module.exports = { browser }
