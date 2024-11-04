import packageInfo from '../../package.json'

export function getEditorVersion() {
  if (!packageInfo.version)
    throw new Error('Could not retrieve version from package.json')
  return packageInfo.version
}
