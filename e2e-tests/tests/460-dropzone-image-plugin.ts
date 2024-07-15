import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Dropzone Image plugin')

Before(popupWarningFix)

Scenario('Create a drag drop exercise with two dropzones', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.say('Add drag drop plugin')

  I.click('Füge ein Element hinzu')
  I.click('$plugin-suggestion-dropzoneImage')

  I.say('Select background type and shape')

  I.click('$plugin-dropzone-image-background-type-select-blank')
  I.click('$plugin-dropzone-image-background-shape-select-square')

  I.seeNumberOfElements('$plugin-dropzone-image-editor-canvas', 1)

  I.say('Add an answer zone')

  I.click('$plugin-dropzone-image-add-answer-zone-button')
  I.seeNumberOfElements('$answer-zone-answerZone-0', 1)

  I.say('Add an image answer to first drop zone')
  I.click('$answer-zone-answerZone-0-add-answer-button')
  I.click('Bild')

  I.click(locate('$plugin-image-src').last())
  I.type(
    'https://assets.serlo.org/5ab7c782ad7f7_f4111037d697776c337e7bffd142cedd01324bc9.png'
  )
  I.seeNumberOfElements('$answer-zone-answerZone-0', 1)

  I.seeNumberOfElements('$plugin-dropzone-image-answer-content-image', 2)

  I.say('Click settings button of first answer zone')
  I.click('$modal-close-button')
  I.moveCursorTo('$answer-zone-answerZone-0')
  I.click('$answer-zone-answerZone-0-settings-button')
  I.seeNumberOfElements('$answer-zone-settings-form-duplicate-button', 1)
  I.seeNumberOfElements('$answer-zone-settings-form-delete-button', 1)

  I.say('Change name (beschriftung) of first answer zone')
  I.click('$answer-zone-settings-form-name-input')
  I.type('Skateboard')
  I.click('$modal-close-button')
  I.see('Skateboard')

  I.say('Add a text answer to first drop zone')

  I.click('$answer-zone-answerZone-0-add-another-answer-button')

  I.click('$plugin-dropzone-image-answer-zone-new-answer-type-text')
  I.click(locate('$plugin-text-editor').last())
  I.type('Bart')
  I.click('$modal-close-button')

  I.seeNumberOfElements('$plugin-dropzone-image-answer-content-text', 2)

  I.say('Duplicate first answer zone')
  I.moveCursorTo('$answer-zone-answerZone-0')
  I.click('$answer-zone-answerZone-0-settings-button')
  I.click('$answer-zone-settings-form-duplicate-button')
  I.click('$modal-close-button')

  I.seeNumberOfElements('$answer-zone-answerZone-1', 1)
  I.seeNumberOfElements('$plugin-dropzone-image-answer-content-text', 4)

  // I.say('Delete delete text answer from second drop zone')
  // I.moveCursorTo(
  //   locate('$plugin-dropzone-image-answer-content-text').inside(
  //     '$answer-zone-answerZone-1'
  //   )
  // )
  // I.click('$answer-zone-answerZone-1-remove-answer-button')

  // I.seeNumberOfElements('$plugin-dropzone-image-answer-content-text', 2)

  // I.seeNumberOfElements('$plugin-dropzone-image-add-wrong-answer-button', 1)

  // Todo: Check if images and text are correctly renderered, rather than just checking the number of elements
})

Scenario(
  'Create a drag drop exercise with two dropzones and wrong answers',
  async ({ I }) => {
    I.amOnPage('/entity/create/Article/1377')

    I.say('Add drag drop plugin')

    I.click('Füge ein Element hinzu')
    I.click('$plugin-suggestion-dropzoneImage')

    I.say('Select background type and shape')

    I.click('$plugin-dropzone-image-background-type-select-blank')
    I.click('$plugin-dropzone-image-background-shape-select-square')

    I.seeNumberOfElements('$plugin-dropzone-image-editor-canvas', 1)

    I.say('Add an answer zone')

    I.click('$plugin-dropzone-image-add-answer-zone-button')
    I.seeNumberOfElements('$answer-zone-answerZone-0', 1)

    I.say('Add an image answer to first drop zone')
    I.click('$answer-zone-answerZone-0-add-answer-button')
    I.click('Bild')

    I.click(locate('$plugin-image-src').last())
    I.type(
      'https://assets.serlo.org/5ab7c782ad7f7_f4111037d697776c337e7bffd142cedd01324bc9.png'
    )
    I.click('$modal-close-button')
    I.seeNumberOfElements('$answer-zone-answerZone-0', 1)

    I.say('Add wrong answer')
    I.click('$plugin-dropzone-image-add-wrong-answer-button')
    I.click('$plugin-dropzone-image-answer-zone-new-answer-type-text')
    I.click(locate('$plugin-text-editor').last())
    I.type('Incorrect')
    I.click('$modal-close-button')

    I.seeNumberOfElements('$plugin-dropzone-image-answer-content-text', 1)
  }
)
