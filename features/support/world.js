const { setWorldConstructor, AfterAll } = require('cucumber')
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder().forBrowser('chrome').build()
const TIMEOUT = 10000
driver
  .manage()
  .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT })
  .then()

class AppWorld {
  constructor() {
    this.driver = driver
  }
}

setWorldConstructor(AppWorld)

// hooks
AfterAll(async function () {
  driver.close()
})
