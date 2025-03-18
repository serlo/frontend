export function setWelcomeModalSeen({ I }) {
  I.amOnPage('/')
  I.executeScript(() => {
    localStorage.setItem('serlo-editor::hasUserSeenWelcomeModal', 'true')
  })
}
