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
    const [node, nodePath] = entry

    if (!Element.isElement(node) || node.type !== 'textBlank') {
      normalizeNode(entry) // Do nothing here and call next handler
      return
    }

    const blankId = node.blankId
    const allElements = [...Node.elements(editor)]
    const otherBlanks = allElements.filter(
      ([element, elementPath]) =>
        element.type === 'textBlank' && !Path.equals(elementPath, nodePath)
    )
    const foundBlankWithSameId = otherBlanks.some(
      ([element]) => element.type === 'textBlank' && element.blankId === blankId
    )

    if (foundBlankWithSameId) {
      // Give this blank a new unique id
      Transforms.setNodes(editor, { blankId: uuid_v4() }, { at: nodePath })
    }

    normalizeNode(entry)
  }

  return editor
}
