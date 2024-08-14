import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Multimedia plugin')

Before(popupWarningFix)

const selectors = {
  addNewPluginButton: '$add-new-plugin-row-button',
}
export async function addMultimediaPlugin(I: CodeceptJS.I) {
  // Ensure that only the Multimedia plugin from article introduction is present
  I.seeNumberOfElements('$plugin-multimedia-wrapper', 1)

  I.say('Replace default Text plugin with a Multimedia plugin')
  I.click(locate('$plugin-text-editor').inside('.plugin-rows'))
  I.click(selectors.addNewPluginButton)
  I.type('Multimedia')
  I.pressKey('Tab')
  I.pressKey('Enter')
}

Scenario('Multimedia plugin toolbar controls', async ({ I }) => {
  I.amOnPage('/entity/create/Article/1377')

  addMultimediaPlugin(I)

  // When adding a new Multimedia plugin, the caption of its Image plugin is focused.
  // In order to focus the actual Multimedia plugin, click the parent indicator.
  I.click('$plugin-multimedia-parent-button')

  I.say('Change the size of the multimedia content')
  I.click('$plugin-multimedia-settings-button')
  I.seeAttributesOnElements('$plugin-multimedia-size-button-50', {
    'aria-selected': 'true',
  })
  I.seeAttributesOnElements('$plugin-multimedia-size-button-25', {
    'aria-selected': 'false',
  })
  I.click('$plugin-multimedia-size-button-25')
  I.seeAttributesOnElements('$plugin-multimedia-size-button-50', {
    'aria-selected': 'false',
  })
  I.seeAttributesOnElements('$plugin-multimedia-size-button-25', {
    'aria-selected': 'true',
  })
  I.click('$modal-close-button')
  I.seeElement('.media-wrapper.mobile\\:w-1\\/4')

  I.say('Change the type of the multimedia content to video')
  I.click('$plugin-multimedia-settings-button')
  I.selectOption('$plugin-multimedia-type-select', 'Video')
  I.click('$modal-close-button')
  I.seeElement(
    locate('$plugin-video-placeholder').inside('$plugin-multimedia-wrapper')
  )

  I.say('Change the type of the multimedia content to GeoGebra')
  I.click('$plugin-multimedia-settings-button')
  I.selectOption('$plugin-multimedia-type-select', 'GeoGebra Applet')
  I.click('$modal-close-button')
  I.seeElement(
    locate('$plugin-geogebra-placeholder').inside('$plugin-multimedia-wrapper')
  )
})
