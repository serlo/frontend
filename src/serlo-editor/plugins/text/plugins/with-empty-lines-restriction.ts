import { BaseOperation, Editor, Element, Node, Path, Transforms } from 'slate'

// Docs: https://docs.slatejs.org/concepts/11-normalizing
export const withEmptyLinesRestriction = (editor: Editor) => {
  const { normalizeNode } = editor

  editor.normalizeNode = (entry, { operation } = { operation: undefined }) => {
    const [node, path] = entry

    if (shouldNodeBeRemoved(editor, node, path, operation)) {
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

// A node should be removed if it is an empty paragraph,
//  and it has a sibling that is an empty paragraph.
function shouldNodeBeRemoved(
  editor: Editor,
  node: Node,
  path: Path,
  operation?: BaseOperation
) {
  // If the node is not an empty paragraph, it shouldn't be removed
  if (!isEmptyParagraph(editor, node)) return false

  // If the node has no previous sibling, it shouldn't be removed
  const previousSiblingPath = Path.hasPrevious(path) && Path.previous(path)
  if (!previousSiblingPath) return false
  if (!Node.has(editor, previousSiblingPath)) return false

  // On blur, every empty paragraph node with a previous sibling,
  // that is also an empty paragraph, should be removed.
  const previousSibling = Node.get(editor, previousSiblingPath)
  const isPreviousSiblingEmptyParagraph = isEmptyParagraph(
    editor,
    previousSibling
  )
  // @ts-expect-error `operation` can only be `BaseOperation`, but we use
  //                  this 'blur' hack to do special normalization on blur.
  if (operation === 'blur') return isPreviousSiblingEmptyParagraph

  // Collect the amount of empty paragraph siblings. It should never be more than 1.
  let amountOfEmptyParagraphSiblings = isPreviousSiblingEmptyParagraph ? 1 : 0

  // If the next sibling is an empty paragraph,
  // increment the amount of empty paragraph siblings.
  const nextSiblingPath = Path.next(path)
  if (Node.has(editor, nextSiblingPath)) {
    const nextSibling = Node.get(editor, nextSiblingPath)
    if (isEmptyParagraph(editor, nextSibling))
      amountOfEmptyParagraphSiblings += 1
  }
  // Early return if the amount of empty paragraph siblings is already more than 1.
  if (amountOfEmptyParagraphSiblings > 1) return true

  // If the sibling before previous is an empty paragraph,
  // increment the amount of empty paragraph siblings.
  const siblingBeforePreviousPath =
    Path.hasPrevious(previousSiblingPath) && Path.previous(previousSiblingPath)
  if (
    siblingBeforePreviousPath &&
    Node.has(editor, siblingBeforePreviousPath)
  ) {
    const siblingBeforePrevious = Node.get(editor, siblingBeforePreviousPath)
    if (isEmptyParagraph(editor, siblingBeforePrevious)) {
      amountOfEmptyParagraphSiblings += 1
    }
  }
  // Early return if the amount of empty paragraph siblings is already more than 1.
  if (amountOfEmptyParagraphSiblings > 1) return true

  // If the sibling after next is an empty paragraph,
  // increment the amount of empty paragraph siblings.
  const siblingAfterNextPath = Path.next(nextSiblingPath)
  if (Node.has(editor, siblingAfterNextPath)) {
    const siblingAfterNext = Node.get(editor, siblingAfterNextPath)
    if (isEmptyParagraph(editor, siblingAfterNext)) {
      amountOfEmptyParagraphSiblings += 1
    }
  }
  // Return true if the amount of empty paragraph siblings is already more than 1.
  return amountOfEmptyParagraphSiblings > 1
}
