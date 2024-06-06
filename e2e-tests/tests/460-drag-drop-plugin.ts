import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Blank exercise')

Before(popupWarningFix)

Scenario('Create a drag drop exercise with two dropzones', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.say('Add drag drop plugin')

  I.click('Füge ein Element hinzu')
  I.click('$plugin-suggestion-dragDropBg')

  I.say('Select background type and shape')

  I.click('$plugin-drag-drop-bg-background-type-select-blank')
  I.click('$plugin-drag-drop-bg-background-shape-select-square')

  I.seeNumberOfElements('$plugin-drag-drop-editor-canvas', 1)

  I.say('Add an answer zone')

  I.click('$plugin-drag-drop-bg-add-answer-zone-button')
  I.seeNumberOfElements('$answer-zone-answerZone-0', 1)

  I.say('Add an image answer to first drop zone')
  I.click('$answer-zone-answerZone-0-add-answer-button')
  I.click('Bild')

  I.click('$plugin-image-src')
  I.type(
    'https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png'
  )
  I.click('$modal-close-button')
  I.seeNumberOfElements('$answer-zone-answerZone-0', 1)

  I.seeNumberOfElements('$plugin-drag-drop-bg-answer-content-image', 2)

  I.say('Add a text answer to first drop zone')

  I.click('$answer-zone-answerZone-0-add-another-answer-button')

  I.click('$plugin-drag-drop-bg-answer-zone-new-answer-type-text')
  I.click(locate('$plugin-text-editor').last())
  I.type('Bart')
  I.click('$modal-close-button')

  I.seeNumberOfElements('$plugin-drag-drop-bg-answer-content-text', 2)

  // Todo: Check if images and text are correctly renderered, rather than just checking the number of elements
})

Scenario.todo('Test for inserting image answer')

Scenario.todo('Tests for inserting text answer')

Scenario.todo('Tests for duplicating answer')
