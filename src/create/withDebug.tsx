export default function withDebug(editor) {
  const {
    addMark,
    apply,
    deleteBackward,
    deleteForward,
    deleteFragment,
    insertBreak,
    insertFragment,
    insertNode,
    insertText,
    removeMark,
    insertData
  } = editor

  editor.addMark = (key, value) => {
    console.log('addMark', key, value)
    addMark(key, value)
  }

  editor.apply = operation => {
    //console.log('apply', operation)
    apply(operation)
  }

  editor.deleteBackward = unit => {
    console.log('deleteBackward', unit)
    deleteBackward(unit)
  }

  editor.deleteForward = unit => {
    console.log('deleteForward', unit)
    deleteForward(unit)
  }

  editor.deleteFragment = () => {
    console.log('deleteFragment')
    deleteFragment()
  }

  editor.insertBreak = () => {
    console.log('insertBreak')
    insertBreak()
  }

  editor.insertFragment = fragment => {
    console.log('insertFragment', fragment)
    insertFragment(fragment)
  }

  editor.insertNode = node => {
    console.log('insertNode', node)
    insertNode(node)
  }

  editor.insertText = text => {
    console.log('insertText', text)
    insertText(text)
  }

  editor.removeMark = key => {
    console.log('removeMark', key)
    removeMark(key)
  }

  editor.insertData = data => {
    const fragment = data.getData('application/x-slate-fragment')

    if (fragment) {
      const decoded = decodeURIComponent(window.atob(fragment))
      const parsed = JSON.parse(decoded) as Node[]
      console.log('insertData (decoded)', decoded)
    } else {
      const text = data.getData('text/plain')

      if (text) {
        const lines = text.split(/\r\n|\r|\n/)

        console.log('insertData (lines)', lines)
      }
    }
    insertData(data)
  }

  return editor
}
