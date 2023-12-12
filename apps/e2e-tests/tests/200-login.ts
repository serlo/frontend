Feature('Login')

Scenario('Login', ({ I }) => {
  I.amOnPage('/')
  I.see('Anmelden')
  I.click('Anmelden')

  // Reduce flakiness
  I.waitForText('Benutzername oder E-Mailadresse', 10)

  I.fillField('Benutzername oder E-Mailadresse', 'dal')
  I.fillField('Passwort', '123456')

  // More robust selector
  I.click('Anmelden', "button[value='password']")

  I.waitForElement(locate('img').withAttr({ alt: 'Avatar' }), 10)
})

Scenario('Logout', ({ I }) => {
  I.amOnPage('/')

  // The asterix is mistaken as css selector sometimes, so remove it
  I.click('Benutzer')

  I.click('Abmelden')
  I.waitForText('Anmelden', 10)
})

// make sure user is logged out at the end of the tests
