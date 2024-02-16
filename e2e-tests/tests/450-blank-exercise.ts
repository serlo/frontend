import assert from 'assert'
import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Blank exercise')

Before(popupWarningFix)

const FillInTheBlanksExerciseButton = '$add-exercise-blanksExercise'

const initialTextPluginCount = 1

Scenario('Create and remove fill in the gap exercise', async ({ I }) => {
  I.amOnPage('/entity/create/Exercise/23869')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
  I.click(FillInTheBlanksExerciseButton)
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.click(locate('$plugin-text-editor').last())

  I.type('This is a test')

  I.click('$plugin-blanks-exercise-parent-button')
  I.click('$additional-toolbar-controls')
  I.click('$remove-plugin-button')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
})

Scenario(
  'Create and remove fill in the gap exercise via undo',
  async ({ I }) => {
    I.amOnPage('/entity/create/Exercise/23869')

    I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
    I.click(FillInTheBlanksExerciseButton)
    I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

    I.pressKey(['CommandOrControl', 'Z'])

    I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
  }
)

Scenario('Create and remove gaps through toolbar', async ({ I }) => {
  I.amOnPage('/entity/create/Exercise/23869')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
  I.click(FillInTheBlanksExerciseButton)
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.click(locate('$plugin-text-editor').last())
  I.type('This is a test with one gap')

  I.say('Select last word with keyboard and create gap')
  I.pressKey(['CommandOrControl', 'Shift', 'ArrowLeft'])

  I.seeElement('$plugin-toolbar-button-lücke-erstellen')
  I.dontSeeElement('$plugin-toolbar-button-lücke-entfernen')
  I.click('$plugin-toolbar-button-lücke-erstellen')
  I.seeElement('$plugin-toolbar-button-lücke-entfernen')
  I.dontSeeElement('$plugin-toolbar-button-lücke-erstellen')

  I.seeNumberOfElements('$blank-input', 1)
  I.click('$plugin-toolbar-button-lücke-entfernen')
  I.dontSeeElement('$plugin-toolbar-button-lücke-entfernen')
  I.dontSeeElement('$blank-input')
})

Scenario('Create a blank gap and type in it', async ({ I }) => {
  I.amOnPage('/entity/create/Exercise/23869')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
  I.click(FillInTheBlanksExerciseButton)
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.click(locate('$plugin-text-editor').last())
  I.say('Create an empty gap then type in it')

  I.type('No gap here ')
  I.click('$plugin-toolbar-button-lücke-erstellen')
  I.seeNumberOfElements('$blank-input', 1)
  const GapContent = 'gap content'
  I.type(GapContent)
  I.seeInField('$blank-input', GapContent)
})

Scenario('Create and delete gaps with backspace/del', async ({ I }) => {
  I.amOnPage('/entity/create/Exercise/23869')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
  I.click(FillInTheBlanksExerciseButton)
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.click(locate('$plugin-text-editor').last())
  I.type('No gap here ')

  I.say('Create a gap, then delete it with backspace')
  I.click('$plugin-toolbar-button-lücke-erstellen')
  I.seeNumberOfElements('$blank-input', 1)
  I.pressKey('Backspace')
  I.dontSeeElement('$blank-input')

  I.say('Create a gap, then delete it with del')
  I.click('$plugin-toolbar-button-lücke-erstellen')
  I.seeNumberOfElements('$blank-input', 1)
  I.pressKey('Delete')
  I.dontSeeElement('$blank-input')
})

Scenario.todo(
  'Ensure an added gap before any text gets focused',
  async ({ I }) => {
    I.amOnPage('/entity/create/Exercise/23869')

    I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
    I.click(FillInTheBlanksExerciseButton)
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
  'Create a few gaps, go to preview mode and solve them!',
  async ({ I }) => {
    I.amOnPage('/entity/create/Exercise/23869')

    I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
    I.click(FillInTheBlanksExerciseButton)
    I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

    I.click(locate('$plugin-text-editor').last())
    I.type('No gap here ')

    I.say('Create two gaps')
    I.click('$plugin-toolbar-button-lücke-erstellen')
    I.seeNumberOfElements('$blank-input', 1)
    I.type('first')

    // unfocus gap
    I.pressKey('ArrowRight')
    // add normal text with surrounding space
    I.type(' and ')

    I.click('$plugin-toolbar-button-lücke-erstellen')
    I.type('second')
    I.seeNumberOfElements('$blank-input', 2)

    I.say('Change mode to preview and solve them incorrectly')
    I.click('$plugin-blanks-exercise-parent-button')
    I.click('$plugin-blanks-exercise-preview-button')
    I.seeNumberOfElements('$blank-input', 2)
    I.click(locate('$blank-input').first())
    // Adding the second gap solution to the first gap
    I.type('second')

    // The button to check answers should only be visible once all gaps have
    // inputs
    I.dontSeeElement('$plugin-exercise-check-answer-button')

    I.click(locate('$blank-input').last())
    // Adding the first gap solution to the second gap
    I.type('first')
    I.seeElement('$plugin-exercise-check-answer-button')
    I.click('$plugin-exercise-check-answer-button')
    I.seeElement('$plugin-exercise-feedback-incorrect')

    I.say('We now edit the gaps and solve them correctly')
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
