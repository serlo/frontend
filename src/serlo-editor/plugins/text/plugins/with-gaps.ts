import { Editor } from 'slate'

export const withGaps = (editor: Editor) => {
  const { isInline } = editor

  editor.isInline = (element) => {
    return element.type === 'gap' ? true : isInline(element)
  }

  editor.isVoid = (element) => {
    return element.type === 'gap' ? true : isInline(element)
  }

  return editor
}
