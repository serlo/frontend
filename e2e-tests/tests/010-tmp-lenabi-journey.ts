Feature('Lenabi User Journey')

Scenario('Welcome Page', ({ I }) => {
  I.amOnPage('https://de.serlo-staging.dev/willkommen')

  I.see('bitte einloggen')
})

Scenario('Course Page Mockup', ({ I }) => {
  I.amOnPage('https://de.serlo-staging.dev/244386')

  I.see('Logistisches Wachstum')
  I.see('Teste dein Wissen')
  I.see('Wendepunkt')
})
