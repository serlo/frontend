import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Text plugin - list')

Before(popupWarningFix)

Scenario('Unordered list shortcuts (indentation missing)', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.say('Add a new text plugin and delete the backslash')
  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')

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

Scenario('Ordered list shortcuts', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.say('Add a new text plugin and delete the backslash')
  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')

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
