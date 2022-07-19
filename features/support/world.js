const { setWorldConstructor, Before, After } = require('cucumber')
const { browser } = require('./browser')

class World {
  constructor() {
    this.browser = browser
  }
}

setWorldConstructor(World)

// hooks

Before(async function () {
  await browser.start()
})

After(async function () {
  browser.close()
})
