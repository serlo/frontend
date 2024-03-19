import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Text plugin - formatting options')

Before(popupWarningFix)

Scenario(
  'Toggle text formatting options using keyboard shortcuts',
  async ({ I }) => {
    I.amOnPage('/entity/create/Article/1377')

    I.click('$add-new-plugin-row-button')
    I.pressKey('Backspace')
    I.type('Some text')
    I.see('Some text')

    I.pressKey(['CommandOrControl', 'A'])

    I.say('Toggle bold on')
    I.pressKey(['CommandOrControl', 'B'])
    I.see('Some text', 'b[data-slate-leaf="true"]')

    I.say('Toggle bold off')
    I.pressKey(['CommandOrControl', 'B'])
    I.dontSeeElement('b[data-slate-leaf="true"]')

    I.say('Toggle italic on')
    I.pressKey(['CommandOrControl', 'I'])
    I.see('Some text', 'i[data-slate-leaf="true"]')

    I.say('Toggle italic off')
    I.pressKey(['CommandOrControl', 'I'])
    I.dontSeeElement('i[data-slate-leaf="true"]')

    I.say('Toggle link on')
    I.pressKey(['CommandOrControl', 'K'])
    I.type('https://de.serlo.org/mathe/1541/hypotenuse')
    I.click('$link-suggestion-0')
    I.click('Some text')
    I.see('Hypotenuse')
    I.seeElement({ css: '.serlo-editor-hacks a' })

    I.say('Toggle link off')
    I.pressKey(['CommandOrControl', 'A'])
    I.pressKey(['CommandOrControl', 'K'])
    I.dontSeeElement({ css: '.serlo-editor-hacks a' })

    // Clear link
    I.pressKey(['CommandOrControl', 'A'])
    I.pressKey('Backspace')

    I.say('Toggle math on')
    I.pressKey(['CommandOrControl', 'M'])
    I.seeElement('$plugin-math-latex-editor')
    I.type('\\frac12 test42')
    I.pressKey('ArrowRight')
    I.dontSee('LaTeX')
    I.seeElement('span.katex')

    I.say('Remove math element')
    I.pressKey(['CommandOrControl', 'A'])
    I.pressKey('Backspace')
    I.dontSeeElement('span.katex')

    I.say('Toggle unordered list on')
    I.type('- Some text')
    I.see('Some text', 'ul')

    I.say('Toggle unordered list off by deleting hyphen')
    for (let i = 0; i < 9; i++) {
      I.pressKey('LeftArrow')
    }
    I.pressKey('Backspace')
    I.dontSee('Some text', 'ul')

    // Clear remnants of the list
    I.pressKey(['CommandOrControl', 'A'])
    I.pressKey('Backspace')

    I.say('Toggle H1 on')
    I.type('# Some text')
    I.see('Some text', 'h1')

    I.say('Toggle H1 off')
    for (let i = 0; i < 9; i++) {
      I.pressKey('LeftArrow')
    }
    I.type('# ')
    I.dontSee('Some text', 'h1')

    I.say('Toggle H2 on')
    I.type('## ')
    I.see('Some text', 'h2')

    I.say('Toggle H2 off')
    for (let i = 0; i < 9; i++) {
      I.pressKey('LeftArrow')
    }
    I.type('## ')
    I.dontSee('Some text', 'h2')

    I.say('Toggle H3 on')
    I.type('### ')
    I.see('Some text', 'h3')

    I.say('Toggle H3 off')
    for (let i = 0; i < 9; i++) {
      I.pressKey('LeftArrow')
    }
    I.type('### ')
    I.dontSee('Some text', 'h3')
  }
)

Scenario(
  'Toggle text formatting options using plugin toolbar',
  async ({ I }) => {
    I.amOnPage('/entity/create/Article/1377')

    I.click('$add-new-plugin-row-button')

    I.pressKey('Backspace')

    I.type('Some text')

    I.say('Toggle bold on')
    I.pressKey(['CommandOrControl', 'A'])
    I.click('$plugin-toolbar-button-fett')
    I.see('Some text', 'b[data-slate-leaf="true"]')

    I.say('Toggle bold off')
    I.click('$plugin-toolbar-button-fett')
    I.dontSeeElement('b[data-slate-leaf="true"]')

    I.say('Toggle italic on')
    I.click('$plugin-toolbar-button-kursiv')
    I.see('Some text', 'i[data-slate-leaf="true"]')

    I.say('Toggle italic off')
    I.click('$plugin-toolbar-button-kursiv')
    I.dontSeeElement('i[data-slate-leaf="true"]')

    I.say('Toggle code on')
    I.click('$plugin-toolbar-button-code')
    I.see('Some text', 'code')
    I.seeElement({ css: '.serlo-editor-hacks code' })

    I.say('Toggle code off')
    I.click('$plugin-toolbar-button-code')
    I.dontSeeElement({ css: '.serlo-editor-hacks code' })

    I.say('Toggle link on')
    I.click('$plugin-toolbar-button-link')
    I.type('https://de.serlo.org/mathe/1541/hypotenuse')
    // select the very first suggestion (index 0)
    I.click('$link-suggestion-0')
    I.seeElement({ css: '.serlo-editor-hacks a' })

    I.say('Refocus link')
    I.click('Some text')
    I.see('Hypotenuse')

    I.say('Toggle link off via plugin bar')
    I.click('Some text')
    I.click('$plugin-toolbar-button-link')
    I.dontSeeElement({ css: '.serlo-editor-hacks a' })

    I.say('Toggle unordered list on')
    I.pressKey(['CommandOrControl', 'A'])
    I.click('$plugin-toolbar-button-aufzählung')
    I.see('Some text', 'ul')

    I.say('Toggle unordered list off')
    I.click('$plugin-toolbar-button-aufzählung')
    I.dontSee('Some text', 'ul')

    I.say('Toggle ordered list on')
    I.click('$plugin-toolbar-button-nummerierte-liste')
    I.see('Some text', 'ol')

    I.say('Toggle ordered list off')
    I.click('$plugin-toolbar-button-nummerierte-liste')
    I.dontSeeElement({ css: '.serlo-editor-hacks ol' })

    I.say('Toggle H1 on')
    I.click('$plugin-toolbar-button-überschriften')
    I.click('$plugin-toolbar-heading-1')
    I.see('Some text', 'h1')

    I.say('Toggle H1 off')
    I.click('$plugin-toolbar-button-überschriften')
    I.click('$plugin-toolbar-heading-1')
    I.dontSee('Some text', 'h1')

    I.say('Toggle H2 on')
    I.click('$plugin-toolbar-button-überschriften')
    I.click('$plugin-toolbar-heading-2')
    I.see('Some text', 'h2')

    I.say('Toggle H2 off')
    I.click('$plugin-toolbar-button-überschriften')
    I.click('$plugin-toolbar-heading-2')
    I.dontSee('Some text', 'h2')

    I.say('Toggle H3 on')
    I.click('$plugin-toolbar-button-überschriften')
    I.click('$plugin-toolbar-heading-3')
    I.see('Some text', 'h3')

    I.say('Toggle H3 off')
    I.click('$plugin-toolbar-button-überschriften')
    I.click('$plugin-toolbar-heading-3')
    I.dontSee('Some text', 'h3')

    I.say('Change text color to orange')
    I.click('$plugin-toolbar-button-textfarben')
    I.click('$plugin-toolbar-button-orange')
    I.seeElement('span[style="color: rgb(255, 102, 0);"]')

    I.say('Reset color')
    I.pressKey(['CommandOrControl', 'A'])
    I.click('$plugin-toolbar-button-textfarben')
    I.click('$plugin-toolbar-button-farbe-zurücksetzen')
    I.dontSeeElement('span[style="color: rgb(255, 102, 0);"]')

    I.say('Toggle math on')
    I.pressKey(['CommandOrControl', 'A'])
    I.pressKey('Backspace')
    I.click('$plugin-toolbar-button-matheformel')
    I.seeElement('$plugin-math-latex-editor')

    I.type('\\frac12')
    I.pressKey('ArrowRight')
    I.dontSee('LaTeX')
    I.seeElement('span.katex')

    I.say('Toggle math off')
    // show LaTeX editor again to remove it upon clicking into the toolbar
    I.pressKey('ArrowLeft')
    I.see('LaTeX')
    I.click('$plugin-toolbar-button-matheformel')
    I.dontSeeElement('span.katex')
  }
)
