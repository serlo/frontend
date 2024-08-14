import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Text plugin - list')

Before(popupWarningFix)

function addNewTextPlugin(I) {
  I.click('$add-new-plugin-row-button')
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')
}

Scenario('Unordered list shortcuts', ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.say('Add a new text plugin and delete the backslash')
  addNewTextPlugin(I)

  I.say('Create an unordered list')
  I.type('- Some text')
  I.see('Some text', 'ul')

  I.say('Add new list item on Enter')
  I.pressKey('Enter')
  I.type('Some more text')
  I.see('Some more text', 'ul')

  I.say('Indent list item on Tab')
  I.dontSee('ul > li > ul > li')
  I.pressKey('Tab')
  I.seeElement({ css: 'ul > li > ul > li' })

  I.say('Unindent list item on Shift+Tab')
  I.pressKey(['Shift', 'Tab'])
  I.dontSeeElement({ css: 'ul > li > ul > li' })

  I.say('Exit the list on double Enter')
  I.pressKey('Enter')
  I.pressKey('Enter')
  I.type('Exit the list')
  I.dontSee('Exit the list', 'ul')

  I.say('Clear Text in list')
  I.pressKey(['CommandOrControl', 'A'])
  I.pressKey('Backspace')
  I.seeElement({
    css: '.serlo-editor-hacks div[data-slate-editor="true"] ul:not(.unstyled-list)',
  })

  I.say('Remove empty list item on backspace')
  I.pressKey('Backspace')
  I.dontSeeElement({
    css: '.serlo-editor-hacks div[data-slate-editor="true"] ul:not(.unstyled-list)',
  })
})

Scenario('Ordered list shortcuts', ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.say('Add a new text plugin and delete the backslash')
  addNewTextPlugin(I)

  I.say('Create an ordered list')
  I.type('First list item')
  I.click('$plugin-toolbar-button-nummerierte-liste')
  I.see('First list item', 'ol')

  I.say('Add new list item on Enter')
  I.pressKey('Enter')
  I.type('Second list item')
  I.see('Second list item', 'ol')

  I.say('Indent list item on Tab')
  I.dontSee('ol > li > ul > li')
  I.pressKey('Tab')
  I.seeElement({ css: 'ol > li > ul > li' })

  I.say('Unindent list item on Shift+Tab')
  I.pressKey(['Shift', 'Tab'])
  I.dontSeeElement({ css: 'ol > li > ul > li' })

  I.say('Exit the list on double Enter')
  I.pressKey('Enter')
  I.pressKey('Enter')
  I.type('Exit the list')
  I.dontSee('Exit the list', 'ol')

  I.say('Clear Text in list')
  I.pressKey(['CommandOrControl', 'A'])
  I.pressKey('Backspace')
  I.seeElement({
    css: '.serlo-editor-hacks div[data-slate-editor="true"] ol:not(.unstyled-list)',
  })

  I.say('Remove empty list item on backspace')
  I.pressKey('Backspace')
  I.dontSeeElement({
    css: '.serlo-editor-hacks div[data-slate-editor="true"] ol:not(.unstyled-list)',
  })
})

// TODO: Investigate how to not open modal inside list
Scenario.skip(
  "Don't show suggestions when '/' is inside of a list",
  ({ I }) => {
    I.amOnPage('/entity/create/Article/1377')

    I.say('Add a new text plugin, check for suggestions, delete the backslash')
    addNewTextPlugin(I)

    I.say(
      'Create an unordered list, type in a backslash, check that suggestions are not showing'
    )
    I.type('- Some text')
    I.see('Some text', 'ul')
    I.pressKey('Enter')
    I.type('/')
    I.dontSee('Schreibe Text und Matheformeln, und formatiere sie.')
  }
)

// TODO: Check why text plugin replaced
Scenario.skip(
  'Inserting a plugin right after a list using suggestions',
  ({ I }) => {
    I.amOnPage('/entity/create/Article/1377')

    I.say('Add a new text plugin and delete the backslash')
    addNewTextPlugin(I)

    I.say('Create an unordered list and add multiple list items')
    I.type('- Some text')
    I.see('Some text', 'ul')
    I.pressKey('Enter')
    I.type('Some more text')
    I.see('Some more text', 'ul')
    I.pressKey('Enter')
    I.type('Some more extra text')
    I.see('Some more extra text', 'ul')

    I.say('Exit the list using double Enter')
    I.pressKey('Enter')
    I.pressKey('Enter')

    I.say('Add a Spoiler plugin using plugin modal')
    I.type('/')
    I.type('Spoiler')
    I.pressKey('Tab')
    I.pressKey('Enter')
    I.click('Titel eingeben')
    I.see('Spoiler')

    I.say('Check that the list still exists')
    I.see('Some text', 'ul')
    I.see('Some more text', 'ul')
    I.see('Some more extra text', 'ul')
  }
)
