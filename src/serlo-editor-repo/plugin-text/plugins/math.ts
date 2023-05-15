import { Editor as SlateEditor } from 'slate'

export const withMath = (editor: SlateEditor) => {
  const { isInline, isVoid } = editor

  editor.isInline = (element) => {
    if (element.type !== 'math') {
      return isInline(element)
    }

    return element.inline
  }

  editor.isVoid = (element) => {
    return element.type === 'math' ? true : isVoid(element)
  }

  return editor
}
