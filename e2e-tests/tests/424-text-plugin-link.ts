import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Text plugin - link')

Before(popupWarningFix)

Scenario('Add a link using link suggestion menu', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')

  I.say('Create text of link and select it')
  I.type('Some text')
  I.pressKey(['CommandOrControl', 'A'])

  I.say('Toggle link on')
  I.click('$plugin-toolbar-button-link')

  // Should find a plentitude of link suggestions (most likely way more than 3)
  I.say('Search for math articles')
  I.type('Math')
  I.seeElement('$link-suggestion-0')
  I.seeElement('$link-suggestion-1')
  I.seeElement('$link-suggestion-2')

  I.say('Navigate through the link suggestion menu and assert the a11y')
  I.seeAttributesOnElements('$link-suggestion-0', { 'aria-selected': 'true' })
  I.seeAttributesOnElements('$link-suggestion-1', { 'aria-selected': 'false' })
  I.seeAttributesOnElements('$link-suggestion-2', { 'aria-selected': 'false' })

  I.pressKey('ArrowDown')
  I.seeAttributesOnElements('$link-suggestion-0', { 'aria-selected': 'false' })
  I.seeAttributesOnElements('$link-suggestion-1', { 'aria-selected': 'true' })
  I.seeAttributesOnElements('$link-suggestion-2', { 'aria-selected': 'false' })

  I.pressKey('ArrowDown')
  I.seeAttributesOnElements('$link-suggestion-0', { 'aria-selected': 'false' })
  I.seeAttributesOnElements('$link-suggestion-1', { 'aria-selected': 'false' })
  I.seeAttributesOnElements('$link-suggestion-2', { 'aria-selected': 'true' })

  I.pressKey('ArrowUp')
  I.seeAttributesOnElements('$link-suggestion-0', { 'aria-selected': 'false' })
  I.seeAttributesOnElements('$link-suggestion-1', { 'aria-selected': 'true' })
  I.seeAttributesOnElements('$link-suggestion-2', { 'aria-selected': 'false' })

  I.say(
    'Hovering on a different suggestion than the selected one should not change aria-selected'
  )
  I.moveCursorTo('$link-suggestion-0')
  I.seeAttributesOnElements('$link-suggestion-0', { 'aria-selected': 'false' })
  I.seeAttributesOnElements('$link-suggestion-1', { 'aria-selected': 'true' })
  I.seeAttributesOnElements('$link-suggestion-2', { 'aria-selected': 'false' })

  I.say('Select first suggestion')
  I.click('$link-suggestion-0')
  I.seeElement({ css: '.serlo-editor-hacks a' })
})

Scenario('Edit existing link', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')

  I.say('Create a link')
  I.type('Some text')
  I.pressKey(['CommandOrControl', 'A'])
  I.click('$plugin-toolbar-button-link')
  I.type('Math')
  I.seeElement('$link-suggestion-1')
  I.pressKey('ArrowDown')
  I.pressKey('Enter')
  I.seeElement(
    locate({ css: '.serlo-editor-hacks a' }).withAttr({ href: '/83249' })
  )

  I.say('Click edit button')
  I.click('Some text')
  I.click('$edit-link-button')

  I.say('Change the link href value')
  I.pressKey(['CommandOrControl', 'A'])
  I.type('Geo')
  I.seeElement('$link-suggestion-1')
  I.pressKey('ArrowDown')
  I.pressKey('Enter')
  I.seeElement(
    locate({ css: '.serlo-editor-hacks a' }).withAttr({ href: '/274643' })
  )
})

Scenario('Remove existing link', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')

  I.say('Create a link')
  I.type('Some text')
  I.pressKey(['CommandOrControl', 'A'])
  I.click('$plugin-toolbar-button-link')
  I.type('Math')
  I.click('$link-suggestion-0')
  I.seeElement({ css: '.serlo-editor-hacks a' })

  I.say('Remove link using the remove link button')
  I.click('Some text')
  I.click('$remove-link-button')
  I.dontSeeElement({ css: '.serlo-editor-hacks a' })
})
