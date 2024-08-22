import { selectors } from './selectors'

export function addNewTextPlugin(I) {
  I.click(selectors.addNewPluginButton)
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')
}
