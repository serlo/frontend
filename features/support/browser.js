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
  async visit(path) {
    await this.driver.get(`http://localhost:3000${path}`)
  }

  async goTo(url) {
    await this.driver.get(url)
  }

  async fillInWith(name, value) {
    await this.driver.findElement({ name }).sendKeys(value)
  }

  async clickButton(text) {
    await this.driver
      .findElement({ xpath: `//button[text()='${text}']` })
      .click()
  }

  async clickText(text) {
    await this.driver.findElement({ xpath: `//*[text()='${text}']` }).click()
  }

  async clickLinkContaining(substring, position = 0) {
    const links = await this.driver.findElements({
      xpath: `//a[contains(., '${substring}')]`,
    })

    await links[position].click()
  }

  async seeText(text) {
    await this.driver.findElement({ xpath: `//*[text()='${text}']` })
  }

  async seeInput(name) {
    await this.driver.findElement({ name })
  }

  async close() {
    await this.driver.close()
  }

  async assertPath(path) {
    console.assert(
      this.driver.getCurrentUrl() === `http://localhost:3000${path}`
    )
  }

  async pause(seconds) {
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  }

  async hover(cssElement) {
    await this.driver
      .findElement(webdriver.By.css(cssElement))
      .then(async (element) => {
        await this.driver.actions().mouse({ origin: element, duration: 1000 })
      })
  }
}

const browser = new Browser()

module.exports = { browser }
