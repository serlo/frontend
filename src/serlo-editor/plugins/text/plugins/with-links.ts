import { Editor } from 'slate'

export const withLinks = (editor: Editor) => {
  const { isInline } = editor

  editor.isInline = (element) => {
    return element.type === 'a' ? true : isInline(element)
  }

  return editor
}
