import { addNewTextPlugin } from './helpers/add-plugin'
import { createNewEditorEntity } from './helpers/create-new-editor-entity'
import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - save changes')

Before(popupWarningFix)

Scenario('Save changes', async ({ I }) => {
  createNewEditorEntity(I, 'article')

  I.click('h1')

  I.type('Test save changes')

  addNewTextPlugin(I)

  I.type('Some text')

  I.see('Some text')

  I.click('.editor-toolbar-right .serlo-button-green')

  I.see('Beschreibe deine Änderungen am Inhalt')

  // Use class instead of text because text is super long and not reliable
  I.click('.license-wrapper')

  I.fillField('label textarea', 'I wrote some Text')
  I.click('button.serlo-button.ml-2.serlo-button-green')
  I.dontSee('Bitte alle Pflichtfelder ausfüllen')
})
