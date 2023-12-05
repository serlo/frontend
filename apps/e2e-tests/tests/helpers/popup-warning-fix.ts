// Fixes warning "Popup already exists and was not closed. Popups must always be
// closed by calling either I.acceptPopup() or I.cancelPopup()"
export const popupWarningFix = async ({ I }) => {
  I.executeScript(() => {
    window.onbeforeunload = null
  })
  I.refreshPage()
}
