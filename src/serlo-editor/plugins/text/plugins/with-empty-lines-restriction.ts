import { Editor, Element, Node, Path, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

// Slate normalization docs: https://docs.slatejs.org/concepts/11-normalizing
// While editing a Text plugin: Two adjacent empty lines are allowed for UX
// reasons.
// On Text plugin blur: Only one empty line is allowed.
export const withEmptyLinesRestriction = (editor: Editor) => {
  const { normalizeNode } = editor

  editor.normalizeNode = (entry, { operation } = { operation: undefined }) => {
    const [node, path] = entry
    // custom operation type
    const isBlur = (operation?.type as string) === 'blur_container'

    if (shouldNodeBeRemoved(editor, node, path, isBlur)) {
      Transforms.removeNodes(editor, { at: path })
      if (isBlur) ReactEditor.blur(editor)
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

function shouldNodeBeRemoved(
  editor: Editor,
  node: Node,
  path: Path,
  isBlur: boolean
) {
  // If the node is not an empty paragraph, it shouldn't be removed
  if (!isEmptyParagraph(editor, node)) return false

  // If the node has no previous sibling, it shouldn't be removed
  const previousSiblingPath = Path.hasPrevious(path) && Path.previous(path)
  if (!previousSiblingPath) return false
  if (!Node.has(editor, previousSiblingPath)) return false

  // On blur, remove this empty paragraph node if the paragraph above is also empty.
  const previousSibling = Node.get(editor, previousSiblingPath)
  const isPreviousSiblingEmptyParagraph = isEmptyParagraph(
    editor,
    previousSibling
  )
  if (isBlur) return isPreviousSiblingEmptyParagraph

  // Collect the amount of empty paragraph siblings. It should never be more than 1.
  let amountOfEmptyParagraphSiblings = isPreviousSiblingEmptyParagraph ? 1 : 0

  // If the next sibling is an empty paragraph, increment the amount
  // of empty paragraph siblings and check if they are more than 1.
  const nextSiblingPath = Path.next(path)
  let isNextSiblingEmptyParagraph = false
  if (Node.has(editor, nextSiblingPath)) {
    const nextSibling = Node.get(editor, nextSiblingPath)
    isNextSiblingEmptyParagraph = isEmptyParagraph(editor, nextSibling)
    if (isNextSiblingEmptyParagraph) amountOfEmptyParagraphSiblings += 1
  }
  if (amountOfEmptyParagraphSiblings > 1) return true

  // If the sibling before previous is an empty paragraph, increment the
  // amount of empty paragraph siblings and check if they are more than 1.
  const siblingBeforePreviousPath =
    Path.hasPrevious(previousSiblingPath) && Path.previous(previousSiblingPath)
  if (
    siblingBeforePreviousPath &&
    Node.has(editor, siblingBeforePreviousPath)
  ) {
    const siblingBeforePrevious = Node.get(editor, siblingBeforePreviousPath)
    if (
      isPreviousSiblingEmptyParagraph &&
      isEmptyParagraph(editor, siblingBeforePrevious)
    ) {
      amountOfEmptyParagraphSiblings += 1
    }
  }
  if (amountOfEmptyParagraphSiblings > 1) return true

  // If the sibling after next is an empty paragraph, increment the amount
  // of empty paragraph siblings and check if they are more than 1.
  const siblingAfterNextPath = Path.next(nextSiblingPath)
  if (Node.has(editor, siblingAfterNextPath)) {
    const siblingAfterNext = Node.get(editor, siblingAfterNextPath)
    if (
      isNextSiblingEmptyParagraph &&
      isEmptyParagraph(editor, siblingAfterNext)
    ) {
      amountOfEmptyParagraphSiblings += 1
    }
  }
  return amountOfEmptyParagraphSiblings > 1
}
