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

    if (Element.isElement(node) && node.type === 'textBlank') {
      const otherNodeHasSameId = [...Node.elements(editor)].some(
        ([element, elementPath]) =>
          element.type === 'textBlank' &&
          !Path.equals(elementPath, nodePath) &&
          element.blankId === node.blankId
      )

      if (otherNodeHasSameId) {
        // Give this blank a new unique id
        Transforms.setNodes(editor, { blankId: uuid_v4() }, { at: nodePath })
      }
    }

    normalizeNode(entry)
  }

  return editor
}
