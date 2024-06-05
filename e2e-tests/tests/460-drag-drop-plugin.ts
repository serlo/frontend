import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Blank exercise')

Before(popupWarningFix)

Scenario('Create a drag drop exercise with two dropzones', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  I.click('Füge ein Element hinzu')
  I.click('$plugin-suggestion-dragDropBg')

  I.click('$plugin-drag-drop-bg-background-type-select-blank')
  I.click('$plugin-drag-drop-bg-background-shape-select-square')

  I.seeNumberOfElements('$plugin-drag-drop-editor-canvas', 1)

  I.click('$plugin-drag-drop-bg-add-answer-zone-button')
  I.seeNumberOfElements('$answer-zone-answerZone-0', 1)

  I.click('$plugin-drag-drop-bg-add-answer-zone-button')
  I.seeNumberOfElements('$answer-zone-answerZone-1', 1)
})

Scenario.todo('Test for inserting image answer')

Scenario.todo('Tests for inserting text answer')

Scenario.todo('Tests for duplicating answer')
