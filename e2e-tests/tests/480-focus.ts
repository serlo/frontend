Feature('Serlo Editor - focus behaviour')

Scenario('Autofocus', async ({ I }) => {
  I.amOnPage('/entity/create/Course/1377')
  I.say('focused on title in new course')
  I.seeElement('h1 > input:focus')

  I.amOnPage('/entity/repository/add-revision/277232')
  I.say('focused on title in existing article')
  I.seeElement('h1 > input:focus')

  I.amOnPage('/entity/create/Article/1377')
  I.say('focused on title in new article')
  I.seeElement('h1 > input:focus')

  I.click('Füge ein Element hinzu')
  I.type('Bild')
  I.pressKey('Enter')
  I.say('focused on src input field of newly added image plugin')
  I.seeElement(locate('input[data-qa="plugin-image-src"]:focus'))
})

Scenario.todo('add test for exercises autofocus') // after exercise refactoring

Scenario('focus plugins by clicking', async ({ I }) => {
  I.amOnPage('/entity/repository/add-revision/5')

  I.say('focus the existing text plugin and change it to an image plugin')
  I.click('$plugin-text-editor')
  I.see('Text', '.plugin-toolbar div')
  I.type('/Bild')
  I.pressKey('Enter')
  I.see('Bild', '.plugin-toolbar div')
  I.say('focused on src input field of new image plugin')
  I.seeElement('label > input:focus')

  I.say('image plugin still focused after clicking on its caption')
  I.click('$plugin-text-editor')
  I.see('Bild', '.plugin-toolbar div')

  I.say('add a new plugin')
  I.click('Füge ein Element hinzu')
  I.say('not focused on the image plugin anymore')
  I.dontSee('Bild', '.plugin-toolbar div')
  I.say('focused on the new text plugin instead')
  I.see('Text', '.plugin-toolbar div')
  I.say('suggestions menu open in the new text plugin')
  I.see('Text', 'h5')

  I.say('click outside of editor to close the suggestions menu')
  I.click('header')
  I.dontSeeElement('h5')

  I.say('click outside of editor again to unfocus the plugin')
  I.click('header')
  I.dontSeeElement('.plugin-toolbar')
})

Scenario('focus plugins with tab key', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')
  I.waitForElement('h1 > input:focus', 5)

  I.say('focus on image plugin inside of introduction multimedia plugin')
  I.pressKey('Tab')
  // ! caption gets focus first (okay for now)
  I.see('Bild', '.plugin-toolbar div')
  I.see('Erklärung mit Multimedia-Inhalt', '$plugin-multimedia-parent-button')

  I.say('focus on text plugin inside of introduction multimedia plugin')
  I.pressKey('Tab')
  I.see('Text', '.plugin-toolbar div')
  I.see('Erklärung mit Multimedia-Inhalt', '$plugin-multimedia-parent-button')

  I.say('focus on text plugin under introduction multimedia plugin')
  I.pressKey('Tab')
  I.pressKey('Tab')
  I.see('Text', '.plugin-toolbar div')
  I.dontSee('Erklärung mit Multimedia-Inhalt')

  I.type('/injection')
  I.pressKey('Enter')
  I.say('focus back on text plugin inside of introduction multimedia plugin')
  I.pressKey(['Shift', 'Tab'])
  I.pressKey(['Shift', 'Tab'])
  I.see('Text', '.plugin-toolbar div')
  I.see('Erklärung mit Multimedia-Inhalt', '$plugin-multimedia-parent-button')
})

Scenario.todo('focus plugins with arrow keys', ({ I }) => {})

Scenario.todo('restores cursor positions')
