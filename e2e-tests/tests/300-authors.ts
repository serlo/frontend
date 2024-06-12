Feature('Authors')

// expecting user to be logged out before start of tests

Before(({ login }) => {
  login('admin') // login as admin for now
})

// Articles only for now
Scenario('Saving without changes', ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/55437')
  I.click('Speichern')
  I.waitForText('Bisher hast du nichts geändert')
  I.dontSee('Beschreibe deine Änderungen am Inhalt')
})

Scenario('Open Editor from article', async ({ I }) => {
  I.amOnPage('/74888')

  // Make sure we see the latest version
  I.refreshPage()

  // only works for 1 level
  const hasRevisions = await tryTo(() => {
    // Menu takes time to load
    I.wait(3)
    I.see('Zeige neue Bearbeitungen')
  })
  if (hasRevisions) {
    I.click('Zeige neue Bearbeitungen')

    // Select first new revision by title value
    I.click('Diese Bearbeitung anzeigen')

    I.click('Nicht akzeptieren')
    I.click('Bestätigen')
    I.amOnPage('/74888')
  }

  I.click('Überarbeiten')
  I.waitForText('Speichern', 10)
  I.see('Treibhausgase')
})

// This test fails regulary due to sychronization issues
// Especially bad: it will leave staging in a undetermined state
// and break subsequent test runs
// I will disable this test for now
// In the future, try to break to behaviour into parts
/*
Scenario('Add Revision and reject', async ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')
  I.click("$entity-title-input")
  I.pressKey('-')
  I.pressKey('T')
  I.pressKey('e')
  I.pressKey('s')
  I.pressKey('t')
  I.pressKey('Space')

  // Randomize script so that revisions are not ignored
  I.type(Math.random().toString())

  I.click('Speichern')
  I.click('Speichern und reviewen lassen')
  I.waitForText('Bitte alle Pflichtfelder ausfüllen', 10)

  // Use class instead of text because text is super long and not reliable
  I.click('.license-wrapper')
  I.click('Speichern und reviewen lassen')
  I.waitForText('Bitte alle Pflichtfelder ausfüllen', 10)

  I.fillField('label textarea', 'automated-test')
  I.click('Speichern und reviewen lassen')
  I.dontSee('Bitte alle Pflichtfelder ausfüllen')

  I.waitForText('Danke für deine Bearbeitung', 60)
  I.see('Bearbeitungsverlauf')

  // updates are sometimes not fast enough
  I.refreshPage()

  // I can't predict if it's the one or the other string
  const seeVersion1 = await tryTo(() => {
    I.see('vor einer Weile')
  })
  if (!seeVersion1) {
    I.see('gerade eben')
  }

  I.click('automated-test')
  // For local testing, it's slow
  I.waitForText('Treibhausgase-Test', 30)

  // Reject revision
  I.click('Nicht akzeptieren')
  I.click('Bestätigen')
  I.waitForText('Bearbeitung wurde nicht akzeptiert', 15)
})
*/

/*Scenario('Reject Revision @current', ({ I }) => {
  // clean up revision
  pause()
})*/

// LocalStorage tests

// Logout in second Tab…

Scenario('Sort taxonomy entities', async ({ I }) => {
  I.amOnPage('/taxonomy/term/sort/entities/60730')
  I.see('Artikel')
  I.see('Zylinder')

  I.see('Aufgaben')
  I.see('Aufgaben zur Pyramide')

  I.see('Bereiche')
  I.see('Kugel')
})

Scenario('Sort exercise folder', async ({ I }) => {
  I.amOnPage('/taxonomy/term/sort/entities/23869')

  I.see('Aufgaben')

  const firstElement = locate('li').withText('(1) Aufgabe')
  const secondElement = locate('li').withText('(2) Aufgabe')

  // initial order
  I.seeElement(locate(firstElement).before(secondElement))

  I.focus(firstElement)
  I.pressKey('Space')
  I.pressKey('ArrowDown')
  I.pressKey('Space')

  //changed order
  I.seeElement(locate(secondElement).before(firstElement))
  I.see('(20)')
})

// removed by https://github.com/serlo/frontend/pull/3044
/*Scenario('Solution revision should be visible', async ({ I }) => {
  I.amOnPage('/entity/repository/compare/279738/279739')
  I.see('Der Zeiger ist alle 12 Stunden')
})*/

Scenario("Switching tabs shouldn't lose work", async ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')
  I.click('$entity-title-input')
  I.pressKey('-')
  I.pressKey('T')
  I.pressKey('e')
  I.pressKey('s')
  I.pressKey('t')

  I.seeInField('$entity-title-input', 'Treibhausgase-Test')

  I.openNewTab()
  I.wait(2)
  I.closeCurrentTab()

  I.wait(2)

  I.seeInField('$entity-title-input', 'Treibhausgase-Test')
})
