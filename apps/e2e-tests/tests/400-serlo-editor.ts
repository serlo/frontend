import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor')

Before(popupWarningFix)

Scenario('Basic text interactions', async ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/74888')

  I.click('$plugin-text-editor')

  const testString = 'TESTTESTTEST'
  I.type(testString)
  I.see(testString)
  for (let i = 0; i < testString.length; i++) {
    I.pressKey('Backspace')
  }
  I.dontSee(testString)
})

Scenario('Add new plugins', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  I.click('$add-new-plugin-row-button')
  I.pressKey('Enter')

  // Only one text plugin visible
  I.see('Schreib etwas oder füge')

  // workaround: plugin toolbar is hiding add-new-plugin-row-button
  // unfocus to make it visible
  I.click('input[placeholder="Titel"]')
  I.click('$add-new-plugin-row-button')

  for (let i = 0; i < 3; i++) {
    I.pressKey('ArrowDown')
  }
  // Spoiler
  I.pressKey('Enter')

  I.seeElement('input[placeholder="Titel eingeben"]')

  I.pressKey('/')
  for (let i = 0; i < 4; i++) {
    I.pressKey('ArrowDown')
  }
  // Box
  I.pressKey('Enter')

  I.see('Art der Box')
  I.click('Merke')

  I.see('(optionaler Titel)')
})

Scenario('Close plugin selection modal', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  I.click('Füge ein Element hinzu')
  const textPluginDescription =
    'Schreibe Text und Matheformeln, und formatiere sie.'
  I.see(textPluginDescription)

  I.pressKey('Escape')
  // Modal should be closed
  I.dontSee(textPluginDescription)

  // Open modal again
  I.type('/')
  I.see(textPluginDescription)

  // focus something different by clicking outside of the modal, in this
  // instance into the quickbar
  I.click('$quickbar-input')
  // Modal should now be closed
  I.dontSee(textPluginDescription)
})

Scenario('Add plugin via slash command', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  // ensure there is no table yet
  I.dontSeeElement('.serlo-table')
  I.click('$add-new-plugin-row-button')
  I.type('Tabelle')
  I.pressKey('Enter')

  I.seeElement('.serlo-table')
})

/**
 * Most of the input of the editor happens within the editor contenteditable
 * div. However, there are some input fields whose undo/redo behavior could
 * function differently because we have one global undo/redo handler and the
 * browser also natively handles it unless we specifically overwrite the behavior.
 * Therefore, we want to ensure that we never do 2 undos when ctrl+z is pressed.
 */
Scenario(
  'Undo via keyboard in input field for article heading',
  async ({ I }) => {
    const keyCombos = {
      windowsAndLinux: ['control', 'z'],
      mac: ['command', 'z'],
    }

    for (const [platform, keys] of Object.entries(keyCombos)) {
      I.say(`Checking undo keyboard shortcut for '${platform}'`)

      I.amOnPage('/entity/create/Article/1377')

      const articleHeadingInput = 'input[placeholder="Titel"]'
      I.click(articleHeadingInput)

      const firstWord = 'Some '
      I.type(firstWord)
      I.wait(2)

      const secondWord = 'Text'
      I.type(secondWord)

      I.seeInField(articleHeadingInput, `${firstWord}${secondWord}`)

      I.pressKey(keys)
      I.dontSeeInField(articleHeadingInput, `${firstWord}${secondWord}`)
      I.dontSeeInField(articleHeadingInput, `${secondWord}`)
      I.seeInField(articleHeadingInput, firstWord)

      I.pressKey(keys)
      I.dontSeeInField(articleHeadingInput, `${firstWord}${secondWord}`)
      I.dontSeeInField(articleHeadingInput, firstWord)
    }
  }
)

Scenario(
  'Undo via keyboard in input field of picture plugin',
  async ({ I }) => {
    const keyCombos = {
      windowsAndLinux: ['control', 'z'],
      mac: ['command', 'z'],
    }

    for (const [platform, keys] of Object.entries(keyCombos)) {
      I.say(`Checking undo keyboard shortcut for '${platform}'`)

      // make sure autofocus logic after opening is done
      I.wait(0.5)
      // No need to create the image plugin first as the multimedia plugin at the
      // beginning of each page already contains one. But, we do need to focus it,
      // in order to make the src input visible
      I.click('$plugin-image-editor')
      const imagePluginUrlInput =
        'input[placeholder="https://example.com/image.png"]'

      I.click(imagePluginUrlInput)

      const firstWord = 'Some '
      I.type(firstWord)
      I.wait(2)

      const secondWord = 'Text'
      I.type(secondWord)

      I.seeInField(imagePluginUrlInput, `${firstWord}${secondWord}`)

      I.pressKey(keys)
      I.dontSeeInField(imagePluginUrlInput, `${firstWord}${secondWord}`)
      I.dontSeeInField(imagePluginUrlInput, `${secondWord}`)
      I.seeInField(imagePluginUrlInput, firstWord)

      I.pressKey(keys)
      I.dontSeeInField(imagePluginUrlInput, `${firstWord}${secondWord}`)
      I.dontSeeInField(imagePluginUrlInput, firstWord)
    }
  }
)

Scenario(
  'Redo in input field for article heading via keyboard',
  async ({ I }) => {
    const keyCombos = {
      windowsAndLinux: {
        UNDO: ['control', 'z'],
        REDO: ['control', 'y'],
      },
      mac: {
        UNDO: ['command', 'z'],
        REDO: ['command', 'y'],
      },
    }

    for (const [platform, keys] of Object.entries(keyCombos)) {
      I.say(`Checking redo keyboard shortcut for '${platform}'`)

      I.amOnPage('/entity/create/Article/1377')

      const articleHeadingInput = { xpath: '//input[@placeholder="Titel"]' }
      I.click(articleHeadingInput)

      const firstWord = 'Some '
      I.type(firstWord)
      I.wait(2)

      const secondWord = 'Text'
      I.type(secondWord)
      I.seeInField(articleHeadingInput, `${firstWord}${secondWord}`)

      I.pressKey(keys.UNDO)
      I.dontSeeInField(articleHeadingInput, `${firstWord}${secondWord}`)
      I.dontSeeInField(articleHeadingInput, `${secondWord}`)
      I.seeInField(articleHeadingInput, firstWord)

      I.pressKey(keys.REDO)
      I.seeInField(articleHeadingInput, `${firstWord}${secondWord}`)
    }
  }
)
