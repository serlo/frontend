import { configInput } from './config'
import { loginAsAdmin } from './tests/helpers/login-as-admin'

const { isCI, browser, frontendUrl, adminUser, isChromium } = configInput

export { adminUser }

exports.config = {
  tests: 'tests/**.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: frontendUrl,
      restart: 'keep',
      keepBrowserState: true,
      keepCookies: true,
      show: !isCI,
      waitForTimeout: 30_000,
      ...(isCI && isChromium
        ? {
            // this is needed for github CI to work
            chromium: { args: ['--no-sandbox'] },
          }
        : { browser }),
    },
  },
  plugins: {
    // https://codecept.io/locators/#custom-locators
    customLocator: {
      enabled: true,
      // Allows data-qa attributes to be selected with $ prefix. E.g
      // `I.click({ css: '[data-qa=register_button]'})` becomes `I.click('$register_button')`
      attribute: 'data-qa',
    },
    autoLogin: {
      enabled: true,
      saveToFile: false,
      inject: 'login',
      users: {
        admin: {
          login: loginAsAdmin,
          check: (I: CodeceptJS.I) => {
            I.amOnPage('/')
            I.waitForElement(`header nav img[alt='Avatar']`, 15)
          },
          // see https://github.com/codeceptjs/CodeceptJS/issues/1591#issuecomment-480800333
          fetch: () => 'whatever',
          restore: () => {},
        },
      },
    },
    ...(isCI ? {} : { pauseOnFail: {} }),
    retryFailedStep: { enabled: true },
    tryTo: { enabled: true },
    screenshotOnFail: { enabled: true },
  },
}
