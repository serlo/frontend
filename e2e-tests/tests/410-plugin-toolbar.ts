import { addNewTextPlugin } from './helpers/add-plugin'
import { createNewEditorEntity } from './helpers/create-new-editor-entity'
import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - plugin toolbar')

Before(popupWarningFix)

// First Text plugin is the multimedia explanation,
// second is the default empty Text plugin.
const initialTextPluginCount = 2

Scenario('Duplicate plugin', async ({ I }) => {
  createNewEditorEntity(I, 'article')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.click(locate('$plugin-text-editor').inside('.plugin-rows'))

  I.moveCursorTo(
    locate('[data-radix-collection-item]').inside('.plugin-toolbar')
  )
  I.click('$duplicate-plugin-button')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount + 1)
})

Scenario('Delete plugin', async ({ I }) => {
  createNewEditorEntity(I, 'article')

  I.seeNumberOfElements('$plugin-text-editor', initialTextPluginCount)

  I.click(locate('$plugin-text-editor').inside('.plugin-rows'))
  I.type('Test')
  addNewTextPlugin(I)

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
