export function setWelcomeModalSeen({ I }) {
  I.amOnPage('/')
  I.executeScript(() => {
    if (localStorage.getItem('serlo-editor::hasUserSeenWelcomeModal')) return
    localStorage.setItem('serlo-editor::hasUserSeenWelcomeModal', 'true')
  })
}
