import { Editor, Path, Node, Element, Transforms } from 'slate'
import { v4 as uuid_v4 } from 'uuid'

export const withBlanks = (editor: Editor) => {
  const { isInline, isVoid, normalizeNode } = editor

  editor.isInline = (element) => {
    return element.type === 'textBlank' ? true : isInline(element)
  }

  editor.isVoid = (element) => {
    return element.type === 'textBlank' ? true : isVoid(element)
  }

  editor.normalizeNode = (entry) => {
    const [node, path] = entry

    if (!Element.isElement(node) || node.type !== 'textBlank') {
      normalizeNode(entry) // Do nothing here and call next handler
      return
    }

    const blankId = node.blankId
    const allElements = [...Node.elements(editor)]
    const otherBlanks = allElements.filter(
      (element) =>
        element[0].type === 'textBlank' && !Path.equals(element[1], path)
    )
    const foundBlankWithSameId = otherBlanks.some(
      (blank) => blank[0].type === 'textBlank' && blank[0].blankId === blankId
    )

    if (foundBlankWithSameId) {
      // Give this blank a new unique id
      Transforms.setNodes(editor, { blankId: uuid_v4() }, { at: path })
    }

    normalizeNode(entry)
  }

  return editor
}
