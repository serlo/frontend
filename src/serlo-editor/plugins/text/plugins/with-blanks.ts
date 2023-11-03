import { Editor } from 'slate'

export const withBlanks = (editor: Editor) => {
  const { isInline } = editor

  editor.isInline = (element) => {
    return element.type === 'blank' ? true : isInline(element)
  }

  editor.isVoid = (element) => {
    return element.type === 'blank' ? true : isVoid(element)
  }

  return editor
}
