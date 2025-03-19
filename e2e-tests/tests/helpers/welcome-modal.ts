export async function setWelcomeModalSeen({ I }) {
  I.amOnPage('/entity/create/Article/1377')
  const hasWelcomeModalButton = await tryTo(() => {
    I.seeElement('$welcome-modal-button')
  })
  if (hasWelcomeModalButton) {
    I.click('$welcome-modal-button')
  }
}
