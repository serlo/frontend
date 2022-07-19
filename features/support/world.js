const { setWorldConstructor, AfterAll } = require('cucumber')
const { browser } = require('./browser')

class World {
  constructor() {
    this.browser = browser
  }
}

setWorldConstructor(World)

// hooks
AfterAll(async function () {
  browser.close()
})
