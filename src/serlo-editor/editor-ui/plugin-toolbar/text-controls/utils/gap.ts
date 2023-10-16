import { Editor as SlateEditor, Element, Node, Range, Transforms } from 'slate'

import { selectionHasElement, trimSelection } from './selection'
import type { Gap } from '@/serlo-editor/plugins/text'

function matchGaps(node: Node) {
  return Element.isElement(node) && node.type === 'gap'
}

export function isGapActive(editor: SlateEditor) {
  return selectionHasElement((e) => e.type === 'gap', editor)
}

export function getGapElement(editor: SlateEditor): Gap | undefined {
  const [match] = Array.from(SlateEditor.nodes(editor, { match: matchGaps }))
  return match && (match[0] as Gap)
}

export function toggleGap(editor: SlateEditor) {
  if (isGapActive(editor)) {
    Transforms.unwrapNodes(editor, { match: matchGaps })
    return
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  if (isCollapsed) {
    Transforms.insertNodes(editor, {
      type: 'gap',
      children: [{ text: ' ' }],
    })
    return
  }

  trimSelection(editor)
  Transforms.wrapNodes(
    editor,
    {
      type: 'gap',
      children: [{ text: '' }],
    },
    { split: true }
  )
  Transforms.collapse(editor, { edge: 'end' })
}
