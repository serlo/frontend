import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Text plugin basic interactions')

Before(popupWarningFix)

// First Text plugin is the multimedia explanation,
// second is the default empty Text plugin.
const initialTextPluginCount = 2

Scenario('Add a new line using Enter', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.say('Press Enter to add a new line')
  I.pressKey('Enter')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)
})

Scenario('Add new line in plugin using Enter', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.click('$add-new-plugin-row-button')
  I.type('Text')

  I.pressKey('Tab')
  I.pressKey('Enter')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  const firstText = 'first'
  const secondText = 'second'

  I.say('Type some text and move the cursor in the middle of it')
  I.type(firstText + secondText)
  I.see(firstText + secondText)
  for (let i = 0; i < secondText.length; i++) {
    I.pressKey('ArrowLeft')
  }

  I.say('Add new line in plugin using Enter')
  I.pressKey('Enter')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)
  I.dontSee(firstText + secondText)
  I.see(firstText)
  I.see(secondText)
})

Scenario('Remove empty Text plugin using Backspace key', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.say('Focus the default Text plugin')
  I.pressKey('ArrowDown')

  I.say('Nothing happens when Backspace is pressed in the first plugin')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.say('Add a second Text plugin')
  I.click('$add-new-plugin-row-button')
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.say('Remove the forward slash')
  I.pressKey('Backspace')

  I.say('Remove the plugin using Backspace')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
})

Scenario('Remove empty Text plugin using Delete key', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.say('Focus the default Text plugin')
  I.pressKey('ArrowDown')

  I.say('Add a second Text plugin')
  I.click('$add-new-plugin-row-button')
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.say('Nothing happens when Delete is pressed in the last plugin')
  I.pressKey('Delete')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.say('Focus the first plugin')
  I.pressKey('ArrowUp')

  I.say('Remove the plugin using Delete')
  I.pressKey('Delete')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
})

Scenario('Merge with previous plugin using Backspace key', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.say('Create another text plugin')
  I.click('$add-new-plugin-row-button')
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)
  I.pressKey('Backspace')
  I.type('- Second text plugin')
  I.see('Second text plugin')

  I.say('Focus the first text plugin')
  I.pressKey('ArrowUp')
  I.pressKey('ArrowUp')

  I.say('Write text into the first text plugin')
  I.type('- First text plugin')
  I.see('First text plugin')

  I.say('Focus the second text plugin')
  I.pressKey('ArrowDown')

  I.say('Merge the 2 text plugins by pressing Backspace')
  // We need to duplicate the 'Backspace' command since only once doesn't have the expected effect
  I.pressKey('Backspace')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
})

// Test related to issue: https://github.com/serlo/backlog/issues/158
Scenario(
  'Merge with previous plugin containing list using Backspace key',
  async ({ I }) => {
    I.amOnPage('/entity/create/Article/1377')

    I.say('Create a text plugin')
    I.click('$add-new-plugin-row-button')
    I.type('Text')
    I.pressKey('Tab')
    I.pressKey('Enter')
    I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)
    I.pressKey('Backspace')
    I.type('- Plain text')
    I.see('Plain text')

    I.say('Focus the first text plugin')
    I.pressKey('ArrowUp')
    I.pressKey('ArrowUp')

    I.say('Create an ordered list')
    I.type('- Unordered list')
    I.click('$plugin-toolbar-button-nummerierte-liste')
    I.see('Unordered list', 'ol')

    I.say('Focus the second text plugin')
    I.pressKey('ArrowDown')

    I.say('Merge the 2 text plugins by pressing Backspace')
    // We need to duplicate the 'Backspace' command since only once doesn't have the expected effect
    I.pressKey('Backspace')
    I.pressKey('Backspace')
    I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
  }
)

Scenario.todo('Merge with next plugin using Delete key')

Scenario('Undo', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')
  I.pressKey('Backspace')

  I.type('Some text')
  I.see('Some text')

  I.click('$editor-toolbar-undo')

  I.dontSee('Some text')
})

Scenario('Undo using keyboard', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')
  I.pressKey('Backspace')

  I.type('Some text')
  I.see('Some text')

  I.pressKey(['CommandOrControl', 'Z'])

  I.dontSee('Some text')
})

Scenario('Redo', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')
  I.pressKey('Backspace')

  I.type('Some text')

  I.see('Some text')

  I.click('$editor-toolbar-undo')

  I.dontSee('Some text')

  I.click('$editor-toolbar-redo')

  I.see('Some text')
})

Scenario('Redo using keyboard', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')
  I.pressKey('Backspace')

  I.type('Some text')

  I.see('Some text')

  I.pressKey(['CommandOrControl', 'Z'])

  I.dontSee('Some text')

  // ! For some reason, the first redo does not work. The second one does. If
  // one puts a pause() here and runs the command only once through the
  // interactive shell , it works just as fine as clicking the button.
  // Therefore, I thought the Ctrl+Y was maybe happening too quickly after the
  // Ctrl+Z, but even with I.wait(1) inbetween, two executions were needed.
  I.pressKey(['CommandOrControl', 'Y'])
  I.pressKey(['CommandOrControl', 'Y'])

  I.see('Some text')
})

Scenario('Copy/cut/paste text', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')
  I.pressKey('Backspace')

  I.type('TESTTESTTEST')

  I.see('TESTTESTTEST')

  for (let i = 0; i < 12; i++) {
    I.pressKey(['Shift', 'LeftArrow'])
  }

  I.pressKey(['CommandOrControl', 'C'])

  I.pressKey('Backspace')

  I.dontSee('TESTTESTTEST')

  I.pressKey(['CommandOrControl', 'V'])

  I.see('TESTTESTTEST')

  for (let i = 0; i < 12; i++) {
    I.pressKey('Backspace')
  }

  I.type('CUTCUTCUT')

  I.see('CUTCUTCUT')

  for (let i = 0; i < 9; i++) {
    I.pressKey(['Shift', 'LeftArrow'])
  }

  I.pressKey(['CommandOrControl', 'X'])

  I.dontSee('CUTCUTCUT')

  I.pressKey(['CommandOrControl', 'V'])

  I.see('CUTCUTCUT')
})

Scenario('Empty line restrictions while typing', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click(locate('$plugin-text-editor').inside('.plugin-rows'))
  I.type('First line')
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element').inside('.plugin-rows'),
    1
  )
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element-with-placeholder').inside('.plugin-rows'),
    0
  )

  I.say('First Enter key press adds a new line with a placeholder')
  I.pressKey('Enter')
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element').inside('.plugin-rows'),
    2
  )
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element-with-placeholder').inside('.plugin-rows'),
    1
  )

  I.say('Second Enter key press adds another new line with a placeholder')
  I.pressKey('Enter')
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element').inside('.plugin-rows'),
    3
  )
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element-with-placeholder').inside('.plugin-rows'),
    1
  )

  I.say('Third Enter key press does not add a new line')
  I.pressKey('Enter')
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element').inside('.plugin-rows'),
    3
  )
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element-with-placeholder').inside('.plugin-rows'),
    1
  )

  I.say(
    'Text plugin blur removes one of the adjacent empty lines and hides the placeholder'
  )
  I.click('$plugin-multimedia-wrapper')
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element').inside('.plugin-rows'),
    2
  )
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element-with-placeholder').inside('.plugin-rows'),
    0
  )
})

// Couldn't find any info on testing paste behavior with Codecept.js
Scenario.todo('Empty line restrictions when pasting text')
