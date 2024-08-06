import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Text plugin basic interactions')

Before(popupWarningFix)

const initialTextPluginCount = 2
const pageUrl = '/entity/create/Article/1377'
const selectors = {
  textEditor: '$plugin-text-editor',
  addNewPluginButton: '$add-new-plugin-row-button',
  multimediaWrapper: '$plugin-multimedia-wrapper',
  toolbarUndoButton: '$editor-toolbar-undo',
  toolbarRedoButton: '$editor-toolbar-redo',
  numberedListButton: '$plugin-toolbar-button-nummerierte-liste',
}

function addNewTextPlugin(I) {
  I.click(selectors.addNewPluginButton)
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')
}

function focusTextPlugin(I, position = 'first') {
  if (position === 'first') {
    I.pressKey('ArrowUp')
    I.pressKey('ArrowUp')
  } else {
    I.pressKey('ArrowDown')
  }
}

Scenario('Add a new line using Enter', async ({ I }) => {
  I.amOnPage(pageUrl)
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount)

  I.click(selectors.addNewPluginButton)
  I.pressKey('Backspace')
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount + 1)

  I.say('Press Enter to add a new line')
  I.pressKey('Enter')
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount + 1)
})

Scenario('Add new line in plugin using Enter', async ({ I }) => {
  I.amOnPage(pageUrl)
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount)

  addNewTextPlugin(I)
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount + 1)

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
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount + 1)
  I.dontSee(firstText + secondText)
  I.see(firstText)
  I.see(secondText)
})

Scenario('Remove empty Text plugin using Backspace key', async ({ I }) => {
  I.amOnPage(pageUrl)
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount)

  I.say('Focus the default Text plugin')
  I.pressKey('ArrowDown')

  I.say('Nothing happens when Backspace is pressed in the first plugin')
  I.pressKey('Backspace')
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount)

  I.say('Add a second Text plugin')
  addNewTextPlugin(I)
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount + 1)

  I.say('Remove the forward slash')
  I.pressKey('Backspace')

  I.say('Remove the plugin using Backspace')
  I.pressKey('Backspace')
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount)
})

Scenario('Remove empty Text plugin using Delete key', async ({ I }) => {
  I.amOnPage(pageUrl)
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount)

  I.say('Focus the default Text plugin')
  I.pressKey('ArrowDown')

  I.say('Add a second Text plugin')
  addNewTextPlugin(I)
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount + 1)

  I.say('Nothing happens when Delete is pressed in the last plugin')
  I.pressKey('Delete')
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount + 1)

  I.say('Focus the first plugin')
  I.pressKey('ArrowUp')

  I.say('Remove the plugin using Delete')
  I.pressKey('Delete')
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount)
})

Scenario('Merge with previous plugin using Backspace key', async ({ I }) => {
  I.amOnPage(pageUrl)

  I.say('Create another text plugin')
  addNewTextPlugin(I)
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount + 1)

  I.pressKey('Backspace')
  I.type('- Second text plugin')
  I.see('Second text plugin')

  focusTextPlugin(I, 'first')
  I.type('- First text plugin')
  I.see('First text plugin')

  focusTextPlugin(I, 'second')
  I.say('Merge the 2 text plugins by pressing Backspace')
  I.pressKey('Backspace')
  I.pressKey('Backspace')
  I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount)
})

Scenario(
  'Merge with previous plugin containing list using Backspace key',
  async ({ I }) => {
    I.amOnPage(pageUrl)

    I.say('Create a text plugin')
    addNewTextPlugin(I)
    I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount + 1)
    I.pressKey('Backspace')
    I.type('- Plain text')
    I.see('Plain text')

    focusTextPlugin(I, 'first')
    I.say('Create an ordered list')
    I.type('- Unordered list')
    I.click(selectors.numberedListButton)
    I.see('Unordered list', 'ol')

    focusTextPlugin(I, 'second')
    I.say('Merge the 2 text plugins by pressing Backspace')
    I.pressKey('Backspace')
    I.pressKey('Backspace')
    I.seeNumberOfElements(selectors.textEditor, initialTextPluginCount)
  }
)

Scenario.todo('Merge with next plugin using Delete key')

Scenario('Undo', async ({ I }) => {
  I.amOnPage(pageUrl)

  addNewTextPlugin(I)
  I.pressKey('Backspace')

  I.type('Some text')
  I.see('Some text')

  I.click(selectors.toolbarUndoButton)
  I.dontSee('Some text')
})

Scenario('Undo using keyboard', async ({ I }) => {
  I.amOnPage(pageUrl)

  addNewTextPlugin(I)
  I.pressKey('Backspace')

  I.type('Some text')
  I.see('Some text')

  I.pressKey(['CommandOrControl', 'Z'])
  I.dontSee('Some text')
})

Scenario('Redo', async ({ I }) => {
  I.amOnPage(pageUrl)

  addNewTextPlugin(I)
  I.pressKey('Backspace')

  I.type('Some text')
  I.see('Some text')

  I.click(selectors.toolbarUndoButton)
  I.dontSee('Some text')

  I.click(selectors.toolbarRedoButton)
  I.see('Some text')
})

Scenario('Redo using keyboard', async ({ I }) => {
  I.amOnPage(pageUrl)

  addNewTextPlugin(I)
  I.pressKey('Backspace')

  I.type('Some text')
  I.see('Some text')

  I.pressKey(['CommandOrControl', 'Z'])
  I.dontSee('Some text')

  I.pressKey(['CommandOrControl', 'Y'])
  I.pressKey(['CommandOrControl', 'Y'])
  I.see('Some text')
})

Scenario('Copy/cut/paste text', async ({ I }) => {
  I.amOnPage(pageUrl)

  addNewTextPlugin(I)
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
  I.amOnPage(pageUrl)

  I.click(locate(selectors.textEditor).inside('.plugin-rows'))
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
  I.click(selectors.multimediaWrapper)
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element').inside('.plugin-rows'),
    2
  )
  I.seeNumberOfElements(
    locate('$plugin-text-leaf-element-with-placeholder').inside('.plugin-rows'),
    0
  )
})

Scenario.todo('Empty line restrictions when pasting text')
