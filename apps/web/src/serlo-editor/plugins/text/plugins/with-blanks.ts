import { Editor } from 'slate'

export const withBlanks = (editor: Editor) => {
  const { isInline, isVoid } = editor

  editor.isInline = (element) => {
    return element.type === 'textBlank' ? true : isInline(element)
  }

  editor.isVoid = (element) => {
    return element.type === 'textBlank' ? true : isVoid(element)
  }

  return editor
}
