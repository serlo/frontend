import assert from 'assert'

Feature('General (mobile screen size)')

// most tests duplicated from 000-general.ts

Before(({ I }) => {
  // once would be enough but this way we don't care about the order the tests are run in
  I.resizeWindow(415, 800)
})
After(({ I }) => {
  // back to default
  I.resizeWindow(1280, 720)
})

Scenario('About Serlo @mobile', ({ I }) => {
  I.amOnPage('/')

  // Make sure it's the landing page
  I.see('einfache Erklärungen')
  I.see('Biologie')
  I.see('werbefrei')

  // Rounded corners are probably causing problems, move cursor a bit
  I.click('Mehr über uns', null, { position: { x: 10, y: 10 } })

  // Try to reduce flakyness
  I.waitForText('Über Serlo', 10, 'h1')

  // I am on the about page
  I.seeInTitle('Über Serlo')
  I.see('mehr als 10 Jahren')

  // Navigating around
  I.click('Pädagogisches Konzept')
  I.click('Anleitung für die Lernplattform serlo.org')
  I.scrollPageToBottom()
  I.click('Community')

  I.pressKey('Escape') // close newsletter modal in case it popped up

  // Make sure it's the right page, wait longer to reduce flakiness
  I.waitForText("Was gibt's zu tun?", 20)
})

Scenario('Main Menu @mobile', async ({ I }) => {
  I.amOnPage('/')

  // closed on load
  I.dontSeeElement('nav[aria-label="Main"]')

  // opens
  I.click('button[aria-label="Menu"]')
  I.seeElement('nav[aria-label="Main"]')
  I.see('Fächer', 'nav[aria-label="Main"]')
  I.see('Anmelden', 'nav[aria-label="Main"]')

  // sub menus open
  I.click('Mitmachen', 'nav[aria-label="Main"]')
  I.see('Überprüfe Bearbeitungen', 'nav[aria-label="Main"]')
  I.see('Zusammenarbeit', 'nav[aria-label="Main"]')

  // and close
  I.wait(1) // entry can't be closed immediately after it's been opened
  I.click('Mitmachen', 'nav[aria-label="Main"]')
  I.dontSee('Überprüfe Bearbeitungen', 'nav[aria-label="Main"]')

  // menu closes
  I.click('button[aria-label="Menu"]')
  I.dontSeeElement('nav[aria-label="Main"]')

  // auto closes after navigation
  I.click('button[aria-label="Menu"]')
  I.click('Über Uns', 'nav[aria-label="Main"]')
  I.click('Über Serlo', 'nav[aria-label="Main"]')
  I.dontSeeElement('nav[aria-label="Main"]')

  // opens on content page
  I.amOnPage('/1555')
  I.dontSeeElement('nav[aria-label="Main"]')
  I.click('button[aria-label="Menu"]')
  I.seeElement('nav[aria-label="Main"]')
  I.see('Fächer', 'nav[aria-label="Main"]')
  I.see('Anmelden', 'nav[aria-label="Main"]')
})

Scenario('Quickbar @mobile', ({ I }) => {
  I.amOnPage('/')

  I.say('Open quickbar')
  I.click('$quickbar-input')
  I.type('Vektor')

  // Check dropdown
  I.seeElement('$quickbar-combobox-overlay')
  I.see('Kreuzprodukt')
  I.see('Vektorbegriff')
  I.see('Auf Serlo nach')

  I.say('Assert aria attributes and navigate options using keyboard')
  I.seeAttributesOnElements('$quickbar-combobox-overlay', { role: 'listbox' })
  I.seeAttributesOnElements('$quickbar-input', { role: 'combobox' })

  I.seeAttributesOnElements('$quickbar-option-0', { 'aria-selected': 'true' })
  I.seeAttributesOnElements('$quickbar-option-1', { 'aria-selected': 'false' })
  I.seeAttributesOnElements('$quickbar-option-2', { 'aria-selected': 'false' })

  I.pressKey('ArrowDown')
  I.seeAttributesOnElements('$quickbar-option-0', { 'aria-selected': 'false' })
  I.seeAttributesOnElements('$quickbar-option-1', { 'aria-selected': 'true' })
  I.seeAttributesOnElements('$quickbar-option-2', { 'aria-selected': 'false' })

  I.pressKey('ArrowUp')
  I.seeAttributesOnElements('$quickbar-option-0', { 'aria-selected': 'true' })
  I.seeAttributesOnElements('$quickbar-option-1', { 'aria-selected': 'false' })
  I.seeAttributesOnElements('$quickbar-option-2', { 'aria-selected': 'false' })

  I.pressKey('Enter')
  I.seeInTitle('Vektor')

  I.say('Perform another search')
  I.amOnPage('/')
  I.click('$quickbar-input')
  I.type('Aufgaben Baumdiagramm ')

  I.click('Aufgaben zum Baumdiagramm ')
  I.seeInTitle('Aufgaben zum Baumdiagramm')
  I.see('Daten und Zufallsexperimente')
})

Scenario('Share modal @mobile', ({ I }) => {
  I.amOnPage('/1553')
  I.click('Teilen')
  I.see('Link kopieren')
  I.see('Als PDF herunterladen')

  // QR code
  I.seeElement('svg[width="128"][height="128"]')
})
Scenario('Legal Pages @mobile', async ({ I }) => {
  I.amOnPage('/')
  I.click('Impressum')
  I.see('Amtsgericht München')
  I.see('Haftung für Inhalte')
  I.seeInCurrentUrl('/legal')

  I.amOnPage('/')
  I.click('Datenschutz')
  I.see('personenbezogene Daten')
  I.see('Verarbeitung der Nutzerdaten')
  I.see('Einwilligungen für externe Inhalte')
  const date = await I.grabTextFrom('time')
  assert.equal(true, date && date.length !== 0)
  I.seeInCurrentUrl('/privacy')

  I.amOnPage('/')
  I.click('Nutzungsbedingungen und Urheberrecht')
  I.see('Änderungsvorbehalt')
  I.see('CC-BY-SA-Lizenz')

  I.amOnPage('/hi/privacy')
  I.see('Privacy Policy')
  I.see('en@serlo.org')
})
Scenario('Consent @mobile', async ({ I }) => {
  I.amOnPage('/spenden')

  // Make sure that twingle is activated
  const needConfirmation = await tryTo(() => {
    I.see('Spendenformular laden')
  })
  if (needConfirmation) {
    I.click('Spendenformular laden')
  }

  I.amOnPage('/')
  I.click('Einwilligungen widerrufen')
  I.see('Twingle')
  I.click('Nicht mehr erlauben')
  I.see('Keine Einwilligungen gespeichert')

  // Go back and check
  I.amOnPage('/spenden')
  I.see('Spendenformular laden')
})
