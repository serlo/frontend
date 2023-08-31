import { BaseOperation, Editor, Element, Node, Path, Transforms } from 'slate'

// Docs: https://docs.slatejs.org/concepts/11-normalizing
export const withEmptyLines = (editor: Editor) => {
  const { normalizeNode } = editor

  editor.normalizeNode = (entry, { operation } = { operation: undefined }) => {
    const [node, path] = entry

    if (
      isEmptyParagraph(editor, node) &&
      areTwoPreviousSiblingsEmptyParagraphs(editor, path, operation)
    ) {
      Transforms.removeNodes(editor, { at: path })
      // TODO: Show warning?
      return
    }

    normalizeNode(entry)
  }

  return editor
}

function isEmptyParagraph(editor: Editor, node: Node) {
  return (
    Element.isElement(node) && node.type === 'p' && Editor.isEmpty(editor, node)
  )
}

function areTwoPreviousSiblingsEmptyParagraphs(
  editor: Editor,
  path: Path,
  operation?: BaseOperation
) {
  const previousSiblingPath = Path.hasPrevious(path) && Path.previous(path)
  if (!previousSiblingPath) return false
  if (!Node.has(editor, previousSiblingPath)) return false

  // @ts-expect-error TODO: Explain the hack here
  if (operation === 'blur') {
    return isEmptyParagraph(editor, Node.get(editor, previousSiblingPath))
  }

  const siblingBeforePreviousPath =
    Path.hasPrevious(previousSiblingPath) && Path.previous(previousSiblingPath)
  if (!siblingBeforePreviousPath) return false
  if (!Node.has(editor, siblingBeforePreviousPath)) return false

  return (
    isEmptyParagraph(editor, Node.get(editor, previousSiblingPath)) &&
    isEmptyParagraph(editor, Node.get(editor, siblingBeforePreviousPath))
  )
}
