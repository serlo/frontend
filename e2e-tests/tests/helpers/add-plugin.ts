import { selectors } from './selectors'

export function addNewTextPlugin(I) {
  I.click(selectors.addNewPluginButton)
  I.type('Text')
  I.click('$plugin-suggestion-text')
}
