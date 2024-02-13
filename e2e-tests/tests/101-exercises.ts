Feature('Learners: Exercises')

Scenario('Exercise folder', ({ I }) => {
  I.amOnPage('/23869')

  // Check numbering
  for (let i = 1; i <= 20; i++) {
    I.see(i.toString(), 'a.rounded-full')
  }

  // Some random text
  I.see('Berlin nach München')

  // License
  I.see('Dieses Werk steht unter der freien Lizenz')

  // Guest invites
  I.click('Aufgaben überarbeiten')
  I.see('Erstelle mit uns Lerninhalte')

  // This line takes some time?
  I.click('$modal-close-button')

  I.click('Aufgabe hinzufügen')
  I.see('Erstelle mit uns Lerninhalte')
})

Scenario('Interact with single choice', ({ I }) => {
  // Feedback from content
  I.amOnPage('/3383')
  I.see('Klicke auf eine der Optionen')
  I.click('15')
  I.click("Stimmt's?")
  I.see('Diese Antwort passt leider nicht')
  I.click('120')
  I.dontSee('Diese Antwort passt leider nicht')
  I.click("Stimmt's?")
  I.see('Diese Antwort passt leider nicht')
  I.click('495')
  I.click("Stimmt's?")
  I.see('Super!')

  // Fallback feedback
  I.amOnPage('/145139')
  I.click('mit dem Graphen')
  I.click("Stimmt's?")
  I.see('Leider nicht richtig')
  I.click('gestreckt')
  I.click("Stimmt's?")
  I.see('Richtig')
  I.dontSee('Leider nicht')
  I.click('gestaucht')
  I.click("Stimmt's?")
  I.see('Leider nicht richtig')
})

Scenario('Interact with multiple choice', ({ I }) => {
  I.amOnPage('/131435')
  I.see('Welche beiden Aufgaben')
  I.click("Stimmt's")
  I.see('Leider nicht richtig')
  I.click('15% von 400€')
  I.click("Stimmt's")
  I.see('Fast! Dir fehlt noch mindestens eine richtige Antwort.')

  // Deselect
  I.click('15% von 400€')
  I.dontSee('Fast! Dir fehlt noch mindestens eine richtige Antwort.')

  I.click('30% von 200€')
  I.click('15% von 400€')
  I.click("Stimmt's")
  I.see('Richtig')
})

Scenario('Check picture in scmc exercise', ({ I }) => {
  I.amOnPage('/mathe/54749/54749')

  I.see('Aufgaben zu Kreisen und Kreisteilen')

  I.seeInSource(
    'https://assets.serlo.org/legacy/56ebffb3bb393_1fe5b83b4ff8aae9bbc0026f127423c166e1ce93.png'
  )
})

Scenario('Interact with input exercise', ({ I }) => {
  I.amOnPage('/286551')
  I.see('exact number match')
  I.see('Unit')

  I.see("Stimmt's", 'button.opacity-0') // button is hidden

  I.click('$plugin-input-exercise-input')
  I.type('1')
  I.click("Stimmt's")
  I.see('🎉')
  I.see('Superb feedback')

  I.click('$plugin-input-exercise-input')
  I.pressKey('Backspace')
  I.dontSee('feedback')
  I.see("Stimmt's", 'button.opacity-0') // button is hidden
  I.type('2')
  I.pressKey('Enter')
  I.see('✋')
  I.see('Handy feedback')

  // generic feedback
  I.pressKey('Backspace')
  I.type('something')
  I.pressKey('Enter')
  I.see('✋')
  I.see('Leider nicht richtig')
})
