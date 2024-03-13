import config from './config'

const { isCI, browser, frontendUrl } = config

const useLocalAPI = process.env.FRONTEND_API == 'local'
export const adminUser = useLocalAPI ? 'admin' : 'Kulla'

const isChromium = browser === 'chromium'

exports.config = {
  tests: 'tests/**.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: frontendUrl,
      restart: 'keep',
      keepBrowserState: true,
      keepCookies: true,
      show: isCI ? false : true,
      ...(isCI && isChromium
        ? {
            chromium: {
              args: ['--no-sandbox'], // this is needed for github CI to work
            },
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
          login: (I) => {
            I.amOnPage('/')
            I.see('Anmelden')
            I.click('Anmelden')
            I.waitForText('Benutzername oder E-Mailadresse', 10)
            I.fillField('Benutzername oder E-Mailadresse', adminUser)
            I.fillField('Passwort', '123456')
            I.click('Anmelden', "button[value='password']")
            I.waitForText(`Willkommen ${adminUser}!`, 30)
            // Wait as a fix for: https://github.com/microsoft/playwright/issues/20749
            I.wait(1)
          },
          check: (I) => {
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
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
}
