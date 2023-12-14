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

Scenario('Focus Toolbar', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  I.wait(3)
  // click below the text
  I.click('Fasse das Thema des Artikels kurz zusammen', null, {
    position: { x: 10, y: 100 },
  })

  I.see('Erklärung mit Multimedia-Inhalt', '.plugin-toolbar')

  // I.see('Text', '.plugin-toolbar div')
  // I.see('Erklärung mit Multimedia-Inhalt', '$plugin-multimedia-parent-button')
})
