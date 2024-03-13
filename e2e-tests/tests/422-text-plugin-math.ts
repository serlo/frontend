import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Text plugin - math formula')

Before(popupWarningFix)

Scenario('Add a math formula', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')

  I.type('Some text ')
  I.pressKey(['CommandOrControl', 'M'])

  I.seeElement('$plugin-math-latex-editor')
  I.type('\\frac12')
})

Scenario('Close math formula using arrow keys', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')

  I.type('Some text ')
  I.pressKey(['CommandOrControl', 'M'])
  I.type('\\frac12')

  I.say('Close math editor with cursor at the end and ArrowRight')
  I.pressKey('ArrowRight')
  I.dontSee('LaTeX')
  I.seeElement('span.katex')

  I.say('Refocus math editor')

  // Codecept tries to scroll into view, but this causes sticky header to hide element
  I.forceClick('span.katex')
  I.seeElement('$plugin-math-latex-editor')

  I.say('Close math editor with cursor at the start and ArrowLeft')
  I.pressKey('Home')
  I.pressKey('ArrowLeft')
  I.dontSee('LaTeX')
  I.seeElement('span.katex')
})

Scenario('Close math formula using Escape', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')

  I.type('Some text ')
  I.pressKey(['CommandOrControl', 'M'])
  I.type('\\frac12')

  I.say('Close math editor with ESC key')
  I.pressKey('Escape')
  I.dontSee('LaTeX')
  I.seeElement('span.katex')
})

Scenario('Close math formula using close button', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.click('$add-new-plugin-row-button')
  I.pressKey('Backspace')

  I.type('Some text ')
  I.pressKey(['CommandOrControl', 'M'])
  I.type('\\frac12')

  I.say('Close math editor with close button')
  I.click('$plugin-math-close-formula-editor')
  I.dontSeeElement('$plugin-math-latex-editor')
  I.seeElement('span.katex')
})
