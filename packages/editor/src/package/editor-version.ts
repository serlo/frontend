export function getEditorVersion() {
  const editorVersion = __EDITOR_VERSION__
  if (!editorVersion) throw new Error('__EDITOR_VERSION__ was not provided!')
  return editorVersion
}
