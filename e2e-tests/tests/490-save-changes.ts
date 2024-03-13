import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - save changes')

Before(popupWarningFix)

Scenario('Save changes', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('h1')

  I.type('Test save changes')

  I.click('$add-new-plugin-row-button')

  I.pressKey('Backspace')

  I.type('Some text')

  I.see('Some text')

  I.click('button.serlo-button-green.ml-2')

  I.see('Beschreibe deine Änderungen am Inhalt')

  // Use class instead of text because text is super long and not reliable
  I.click('.license-wrapper')

  I.fillField('label textarea', 'I wrote some Text')
  I.click('button.serlo-button.ml-2.serlo-button-green')
  I.dontSee('Bitte alle Pflichtfelder ausfüllen')
})
