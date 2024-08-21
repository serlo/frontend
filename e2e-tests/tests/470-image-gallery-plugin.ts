import { popupWarningFix } from './helpers/popup-warning-fix'

Feature('Serlo Editor - Image Gallery plugin')

Before(popupWarningFix)

async function addImageGalleryPlugin(I: CodeceptJS.I) {
  I.say('Create image gallery plugin')
  I.click('$add-new-plugin-row-button')
  I.type('Gallery')
  I.pressKey('Tab')
  I.pressKey('Enter')
}

// Enable when plugin is on production
Scenario.skip(
  'Create Image Gallery Plugin, see initial screen',
  async ({ I }) => {
    I.amOnPage('/entity/create/Article/1377')

    addImageGalleryPlugin(I)

    I.seeElement('$plugin-image-gallery-wrapper')
  }
)
