import { adminUser } from '../../codecept.config'

export function loginAsAdmin(I: CodeceptJS.I) {
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
}
