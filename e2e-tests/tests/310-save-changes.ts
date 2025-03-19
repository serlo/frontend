import { addNewTextPlugin } from './helpers/add-plugin'
import { createNewEditorEntity } from './helpers/create-new-editor-entity'
import { editExistingEntity } from './helpers/edit-existing-entity'
import { popupWarningFix } from './helpers/popup-warning-fix'
import { setWelcomeModalSeen } from './helpers/welcome-modal'

Feature('Serlo Editor - saving changes')

Before(popupWarningFix)
Before(setWelcomeModalSeen)

Scenario('Save Modal: Blocks saving if requirements are not met', ({ I }) => {
  editExistingEntity(I, 55437)

  I.say('Saving without changes')
  I.click('Speichern')
  I.waitForText('Bisher hast du nichts geändert')
  I.dontSee('Beschreibe deine Änderungen am Inhalt')

  I.click('h1')
  I.type('!!')

  I.click('Speichern')

  I.see('Beschreibe deine Änderungen am Inhalt')
  I.see('Mit dem Speichern dieser Seite versicherst du,')

  I.say('Saving without accepting license or adding changes text')
  I.click('Speichern und reviewen lassen')
  I.waitForText('Bitte alle Pflichtfelder ausfüllen')
  I.wait(5)

  I.say('Saving without adding change-text')
  I.click('.license-wrapper')
  I.click('Speichern und reviewen lassen')
  I.waitForText('Bitte alle Pflichtfelder ausfüllen')
  I.wait(5)

  I.say('Saving without accepting license')
  I.click('.license-wrapper') //unaccept
  I.fillField('label textarea', '[test-changes] more !!!')
  I.click('Speichern und reviewen lassen')
  I.waitForText('Bitte alle Pflichtfelder ausfüllen')
  I.wait(5)

  I.say('Saving with all requirements met')
  I.click('.license-wrapper')
  I.click('Speichern und reviewen lassen')
  I.dontSee('Bitte alle Pflichtfelder ausfüllen')
  // this tells us we actually tried to save
  I.waitForText('Für diese Funktion musst du dich einloggen!', 5)
})

Scenario('Save Modal: Shows custom license', ({ I }) => {
  I.amOnPage('/313399')
  I.see('Aufgabe 1')
  I.waitForElement('a[href="/license/detail/26"]')
  I.click('Überarbeiten')

  I.waitForElement('div.plugin-text')
  I.click('h2')
  I.type('$')

  I.click('Speichern')

  I.see('Beschreibe deine Änderungen am Inhalt')
  I.see(
    'Aufgabenstellung vom Land Niedersachsen nicht inhaltlich verändert hast'
  )
})

Scenario('Save Modal: Page has no extra requirements in modal', ({ I }) => {
  editExistingEntity(I, 21468)

  I.click('h1')
  I.type('$')

  I.click('Speichern')
  I.see('Bereit zum Speichern?')
  I.dontSee('Beschreibe deine Änderungen am Inhalt')
  I.dontSee('Mit dem Speichern dieser Seite versicherst')

  //shorter button text for pages
  I.seeTextEquals('Speichern', '.serlo-button-green.serlo-button-learner')
  I.click('.serlo-button-green.serlo-button-learner')

  // this tells us we actually tried to save
  I.waitForText('Für diese Funktion musst du dich einloggen!', 10)
})

Scenario('Save Modal: No addition requirements in taxonomy', async ({ I }) => {
  editExistingEntity(I, 1386)

  I.see('Grundrechenarten')
  I.see('Übungsaufgaben zu den vier Grundrechenarten')
  I.seeElement(
    'img[src="https://assets.serlo.org/legacy/56f10ea9514ea_4ba242201476d137c5cc4420c8e5021337eb8620.png"]'
  )

  I.click('h1')
  I.type('$')

  I.click('Speichern')
  I.see('Bereit zum Speichern?')
  I.dontSee('Beschreibe deine Änderungen am Inhalt')
  I.dontSee('Mit dem Speichern dieser Seite versicherst')

  //shorter button text for pages
  I.seeTextEquals('Speichern', '.serlo-button-green.serlo-button-learner')
  I.click('.serlo-button-green.serlo-button-learner')

  // this tells us we actually tried to save
  I.waitForText('Für diese Funktion musst du dich einloggen!', 10)
})

Scenario('Save Modal: New entity', async ({ I }) => {
  createNewEditorEntity(I, 'article')

  I.click('h1')

  I.type('Test Article')

  addNewTextPlugin(I)

  I.type('Test')
  I.see('Test')

  I.click('Speichern')

  I.see('Beschreibe deine Änderungen am Inhalt')

  I.see('Mit dem Speichern dieser Seite versicherst du,')
  // Use class instead of text because text is super long and not reliable
  I.click('.license-wrapper')

  I.fillField('label textarea', '[test-changes] new content')
  I.click('button.serlo-button-learner.serlo-button-green')
  I.dontSee('Bitte alle Pflichtfelder ausfüllen')

  // this tells us we actually tried to save
  I.waitForText('Für diese Funktion musst du dich einloggen!', 5)
})
