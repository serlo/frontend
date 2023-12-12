import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - plugin toolbar')

Before(popupWarningFix)

// First Text plugin is the multimedia explanation,
// second is multimedia image caption,
// third is default empty text plugin
const initialTextPluginCount = 3

Scenario('Duplicate plugin', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.moveCursorTo(
    locate('[data-radix-collection-item]').inside('.plugin-toolbar')
  )
  I.click('$duplicate-plugin-button')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 2)
})

Scenario('Delete plugin', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')
  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)

  I.moveCursorTo(
    locate('[data-radix-collection-item]').inside('.plugin-toolbar')
  )
  I.click('$remove-plugin-button')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)
})

// The anchor link copy tool is currently not rendered in Codecept.
// If this feature passes experimental stage, it's worth finding a way
// to render it in Codecept. Otherwise, this todo can be removed.
// (https://trello.com/c/W6ZXhNpv/95-anchor-sprungmarke)
Scenario.todo('Copy link to plugin')
