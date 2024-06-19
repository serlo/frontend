import assert from 'assert'

Feature('General')

Scenario('About Serlo', ({ I }) => {
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

  // Make sure it's the right page, wait longer to reduce flakiness
  I.waitForText("Was gibt's zu tun?", 20)
})

Scenario('Main Menu', async ({ I }) => {
  async function ensureMenuState(
    button: string,
    item: string,
    open: boolean,
    context = 'ul.bg-white'
  ) {
    let maxLoop = 20
    while (
      (await tryTo(() => {
        I.see(item, context)
      })) != open
    ) {
      await I.click(button, 'ul')
      await I.wait(0.2)
      maxLoop--
      if (maxLoop <= 0) throw 'endless loop'
    }
  }

  async function testMenu() {
    await ensureMenuState('Fächer', 'Angewandte Nachhaltigkeit', true)
    I.see('Mathe', 'ul.bg-white')
    await ensureMenuState('Fächer', 'Angewandte Nachhaltigkeit', false)

    await ensureMenuState('Über Uns', 'Transparenz', true)
    I.see('Wirkung', 'ul.bg-white')
    I.see('Transparenz', 'ul.bg-white')
    await ensureMenuState('Über Uns', 'Transparenz', false)

    // The li is clickable, therefore the context is ul
    await ensureMenuState('Mitmachen', 'Neu hier?', true, 'div.bg-white')
    I.see('Neu hier?')
    I.see('Teste den Editor', 'li')
    I.see('Hilfe', 'li')
  }

  // Test menu on landing and in content
  I.amOnPage('/')
  await testMenu()

  I.amOnPage('/mathe')
  await testMenu()
})

Scenario('Quickbar', ({ I }) => {
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

Scenario('Share modal', ({ I }) => {
  I.amOnPage('/1553')
  I.click('Teilen')
  I.see('Link kopieren')
  I.see('Als PDF herunterladen')

  // QR code
  I.seeElement('svg[width="128"][height="128"]')
})

// Language versions are testing production
// This is not intended
/*
Scenario('Languages', ({ I }) => {
  I.amOnPage('/')
  I.click('Serlo in anderen Sprachen')
  I.see('Serlo.org in other languages')

  I.click('English')
  I.see('personalized learning')
  I.click('Serlo in other languages')

  I.click('Français')
  I.see('Notre vision est de permettre un apprentissage')
  I.click("Serlo dans d'autres langues")

  I.click('Español')
  I.see('Somos una organización de base')
  I.click('Serlo en otros idiomas')

  I.click('हिंदी')
  I.see('हम नॉनप्रॉफिट आर्गेनाइजेशन संगठन')
  // Somehow this is the only way to go back
  I.usePlaywrightTo('go back', async ({ page }) => {
    await page.goBack()
  })

  I.click('தமிழ் (Tamil)')
  I.see('நாம் சமமான கல்வி வாய்ப்புகளை')
})
*/

Scenario('Donation', ({ I }) => {
  I.amOnPage('/spenden')
  I.see('Deine Spende macht einen Unterschied')
  I.see('Mit PayPal spenden')

  I.click('Spendenformular laden')
  I.switchTo('iframe')
  I.waitForText('Bitte gib einen Spendenbetrag ein', 30)
  I.click('Jetzt spenden')
  I.waitForText('Wähle eine Zahlungsart', 10)
  I.switchTo() // back from iframe

  I.amOnPage('/')
  I.click('Einwilligungen widerrufen')
  I.see('Einwilligungen für externe Inhalte', 'h1')
})

Scenario('Legal Pages', async ({ I }) => {
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

Scenario('Consent', async ({ I }) => {
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

Scenario('Special Pages', ({ I }) => {
  I.amOnPage('/')
  I.click('Kontakt')
  I.see('Kontakt und Standorte', 'h1')
  I.click('Jobs')
  I.see('Digitale Bildung braucht dich', 'h1')
  I.see('Unsere offenen Stellen')
  I.see('Weiterbildung')

  I.amOnPage('/')
  I.click('Kontakt')

  // Wait for next page to load before clicking team
  I.see('Kontakt und Standorte', 'h1')
  I.click('Team')

  // Needs to do external fetching, so wait a bit longer
  I.waitForText('Softwareentwicklung', 30)
})

Scenario('Meta robots tags', ({ I }) => {
  // should index
  I.amOnPage('/')
  I.dontSeeElementInDOM('meta[content=noindex]')

  I.amOnPage('/serlo')
  I.dontSeeElementInDOM('meta[content=noindex]')

  I.amOnPage('/1555')
  I.dontSeeElementInDOM('meta[content=noindex]')

  // hide test area
  I.amOnPage('/community/106082/testbereich')
  I.seeElementInDOM('meta[content=noindex]')

  I.amOnPage('/community/185201/kullas-testartikel-nicht-l%C3%B6schen')
  I.seeElementInDOM('meta[content=noindex]')

  // hide trashed
  I.amOnPage('/268814')
  I.seeElementInDOM('meta[content=noindex]')
})

Scenario('Link component should not rewrite assets.serlo.org', ({ I }) => {
  I.amOnPage('/transparenz')
  I.click('Serlo Education Jahresbericht 2010')
  I.wait(2)
  I.dontSee('Es tut uns leid')
})

Scenario('Link to community chat should work', ({ I }) => {
  I.amOnPage('/19880/mitmachen-in-mathematik')
  I.click('Chat für Mathe-AutorInnen')
  I.seeInTitle('Serlo Communitychat')
})
