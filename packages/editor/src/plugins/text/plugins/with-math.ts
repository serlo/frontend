import { Editor } from 'slate'

export const withMath = (editor: Editor) => {
  const { isInline, isVoid } = editor

  editor.isInline = (element) => {
    return element.type === 'math' ? element.inline : isInline(element)
  }

  editor.isVoid = (element) => {
    return element.type === 'math' ? true : isVoid(element)
  }

  return editor
}
