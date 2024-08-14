const selectors = {
  textEditor: '$plugin-text-editor',
  addNewPluginButton: '$add-new-plugin-row-button',
  multimediaWrapper: '$plugin-multimedia-wrapper',
  toolbarUndoButton: '$editor-toolbar-undo',
  toolbarRedoButton: '$editor-toolbar-redo',
  numberedListButton: '$plugin-toolbar-button-nummerierte-liste',
}

export function addNewTextPlugin(I) {
  I.click(selectors.addNewPluginButton)
  I.type('Text')
  I.pressKey('Tab')
  I.pressKey('Enter')
}
