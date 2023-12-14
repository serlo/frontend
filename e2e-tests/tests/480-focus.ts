Feature('Serlo Editor - focus behaviour')

Scenario('Autofocus', async ({ I }) => {
  I.amOnPage('/entity/create/Course/1377')
  I.say('focused on title on new course')
  I.seeElement('h1 > input:focus')

  I.amOnPage('/entity/repository/add-revision/277232')
  I.say('focused on title on existing article')
  I.seeElement('h1 > input:focus')

  I.amOnPage('/entity/create/Article/1377')
  I.say('focused on title on new article')
  I.seeElement('h1 > input:focus')

  I.click('Füge ein Element hinzu')
  I.type('Bild')
  I.pressKey('Enter')
  I.seeElement(locate('input[data-qa="plugin-image-src"]:focus'))
})

Scenario.todo('add test for exercises autofocus') // after exercise refactoring

Scenario('focus plugins by clicking', async ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/5')

  I.click('$plugin-text-editor')
  I.see('Text', '.plugin-toolbar div')
  I.type('/Bild')
  I.pressKey('Enter')
  I.see('Bild', '.plugin-toolbar div')
  // image url input is focused
  I.seeElement('label > input:focus')

  // caption
  I.click('$plugin-text-editor')
  I.see('Bild', '.plugin-toolbar div')

  I.click('Füge ein Element hinzu')
  I.dontSee('Bild', '.plugin-toolbar div')
  I.see('Text', '.plugin-toolbar div')
  I.see('Text', 'h5')
  // first click outside of editor should close suggestions menu
  I.click('header')
  I.dontSeeElement('h5')
  // second click outside of editor should unfocus plugin
  I.click('header')
  I.dontSeeElement('.plugin-toolbar')
})

Scenario('focus plugins with tab key', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  I.waitForElement('h1 > input:focus', 5)
  I.pressKey('Tab')
  // ! caption gets focus first (okay for now)
  I.see('Bild', '.plugin-toolbar div')
  I.see('Erklärung mit Multimedia-Inhalt', '$plugin-multimedia-parent-button')

  I.pressKey('Tab')
  I.see('Text', '.plugin-toolbar div')
  I.see('Erklärung mit Multimedia-Inhalt', '$plugin-multimedia-parent-button')

  I.pressKey('Tab')
  I.pressKey('Tab')
  I.see('Text', '.plugin-toolbar div')
  I.dontSee('Erklärung mit Multimedia-Inhalt')

  I.type('/injection')
  I.pressKey('Enter')
  // move focus back up to text plugin
  I.pressKey(['Shift', 'Tab'])
  I.pressKey(['Shift', 'Tab'])
  I.see('Text', '.plugin-toolbar div')
  I.see('Erklärung mit Multimedia-Inhalt', '$plugin-multimedia-parent-button')
})

Scenario.todo('focus plugins with arrow keys')

Scenario.todo('restores cursor positions')
