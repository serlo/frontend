import { version } from '../../package.json'

export function getEditorVersion() {
  if (!version) throw new Error('Could not retrieve version from package.json')
  return version
}
