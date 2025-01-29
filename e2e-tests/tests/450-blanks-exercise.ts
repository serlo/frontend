import assert from 'assert'
import { popupWarningFix } from './helpers/popup-warning-fix'
import { createNewEditorEntity } from './helpers/create-new-editor-entity'

Feature('Serlo Editor - Blank exercise')

Before(popupWarningFix)

const BlanksExerciseButton = '$add-exercise-blanksExercise'

const initialTextPluginCount = 1

function selectBlanksExercise(I: CodeceptJS.I) {
  I.click(BlanksExerciseButton)
  I.waitForElement('$plugin-blanks-child-text-button', 20)
}

Scenario('Create and remove fill in the blanks exercise', async ({ I }) => {
  createNewEditorEntity(I, 'exercise')

  selectBlanksExercise(I)
  I.see('Aufgabe: Lückentext')
  I.click('$plugin-blanks-child-text-button')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.click(locate('$plugin-text-editor').last())

  I.type('This is a test')

  I.click('$additional-toolbar-controls')
  I.click('$change-interactive-button')
  I.dontSee('Aufgabe: Lückentext')
})

Scenario(
  'Create and remove fill in the blank exercise via undo',
  async ({ I }) => {
    createNewEditorEntity(I, 'exercise')

    selectBlanksExercise(I)
    I.click('$plugin-blanks-child-text-button')
    I.see('Aufgabe: Lückentext')

    I.pressKey(['CommandOrControl', 'Z'])

    I.dontSee('Aufgabe: Lückentext')
  }
)

Scenario('Create and remove blanks through toolbar', async ({ I }) => {
  createNewEditorEntity(I, 'exercise')

  selectBlanksExercise(I)
  I.click('$plugin-blanks-child-text-button')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.click(locate('$plugin-text-editor').last())
  I.type('This is a test with one blank')

  I.say('Select last word with keyboard and create blank')
  I.pressKey(['CommandOrControl', 'Shift', 'ArrowLeft'])

  I.seeElement('$plugin-toolbar-button-lücke-erstellen')
  I.dontSeeElement('$plugin-toolbar-button-lücke-entfernen')
  I.click('$plugin-toolbar-button-lücke-erstellen')
  I.seeNumberOfElements('$blank-input', 1)
  I.click('$blank-input')
  I.seeElement('$plugin-toolbar-button-lücke-entfernen')
  I.dontSeeElement('$plugin-toolbar-button-lücke-erstellen')

  I.click('$plugin-toolbar-button-lücke-entfernen')
  I.dontSeeElement('$plugin-toolbar-button-lücke-entfernen')
  I.dontSeeElement('$blank-input')
})

Scenario('Create a blank blank and type in it', async ({ I }) => {
  createNewEditorEntity(I, 'exercise')

  selectBlanksExercise(I)
  I.click('$plugin-blanks-child-text-button')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.click(locate('$plugin-text-editor').last())
  I.say('Create an empty blank then type in it')

  I.type('No blank here ')
  I.click('$plugin-toolbar-button-lücke-erstellen')
  I.seeNumberOfElements('$blank-input', 1)
  I.click('$blank-input')
  const blankContent = 'blank content'
  I.type(blankContent)
  I.seeInField('$blank-input', blankContent)
})

Scenario('Create and delete blanks with backspace/del', async ({ I }) => {
  createNewEditorEntity(I, 'exercise')

  selectBlanksExercise(I)
  I.click('$plugin-blanks-child-text-button')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.click(locate('$plugin-text-editor').last())
  I.type('No blank here ')

  I.say('Create a blank, then delete it with backspace')
  I.click('$plugin-toolbar-button-lücke-erstellen')
  I.seeNumberOfElements('$blank-input', 1)
  I.click('$blank-input')
  I.pressKey('Backspace')
  I.dontSeeElement('$blank-input')

  I.say('Create a blank, then delete it with del')
  I.click('$plugin-toolbar-button-lücke-erstellen')
  I.seeNumberOfElements('$blank-input', 1)
  I.click('$blank-input')
  I.pressKey('Delete')
  I.dontSeeElement('$blank-input')
})

Scenario.todo(
  'Ensure an added blank before any text gets focused',
  async ({ I }) => {
    createNewEditorEntity(I, 'exercise')

    selectBlanksExercise(I)
    I.click('$plugin-blanks-child-text-button')
    I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

    I.click(locate('$plugin-text-editor').last())

    I.click('$plugin-toolbar-button-lücke-erstellen')
    I.seeNumberOfElements('$blank-input', 1)
    const isBlankInputFocused = await I.executeScript(() => {
      const blankInput = document.querySelector("[data-qa='blank-input']")
      return document.activeElement === blankInput
    })

    assert.strictEqual(
      isBlankInputFocused,
      true,
      'The blank input element is not focused'
    )
  }
)

Scenario(
  'Create a few blanks, go to preview mode and solve them!',
  async ({ I }) => {
    createNewEditorEntity(I, 'exercise')

    selectBlanksExercise(I)
    I.click('$plugin-blanks-child-text-button')
    I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

    I.click(locate('$plugin-text-editor').last())
    I.type('No blank here ')

    I.say('Create two blanks')
    I.click('$plugin-toolbar-button-lücke-erstellen')
    I.seeNumberOfElements('$blank-input', 1)
    I.click('$blank-input')
    I.type('first')

    // unfocus blank
    I.pressKey('ArrowRight')
    // add normal text with surrounding space
    I.type(' and ')

    I.click('$plugin-toolbar-button-lücke-erstellen')
    I.click(locate('$blank-input').at(2))
    I.type('second')
    I.seeNumberOfElements('$blank-input', 2)

    I.say('Change mode to preview and solve them incorrectly')

    I.click('$plugin-exercise-preview-button')
    I.seeNumberOfElements('$blank-input', 2)
    I.click(locate('$blank-input').first())
    // Adding the second blank solution to the first blank
    I.type('second')

    // The button to check answers should only be visible once all blanks have
    // inputs
    I.dontSeeElement('$plugin-exercise-check-answer-button')

    I.click(locate('$blank-input').last())
    // Adding the first blank solution to the second blank
    I.type('first')
    I.seeElement('$plugin-exercise-check-answer-button')
    I.click('$plugin-exercise-check-answer-button')
    I.seeElement('$plugin-exercise-feedback-incorrect')

    I.say('We now edit the blanks and solve them correctly')
    // Double click to highlight and overwrite the existing input
    I.doubleClick(locate('$blank-input').first())
    I.type('first')

    // Double click to highlight and overwrite the existing input
    I.doubleClick(locate('$blank-input').last())
    I.type('second')

    I.click('$plugin-exercise-check-answer-button')
    I.seeElement('$plugin-exercise-feedback-correct')
  }
)

Scenario.todo('Tests for drag & drop mode')
