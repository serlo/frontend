import {
  Editor as SlateEditor,
  Element,
  Node,
  Range,
  Transforms,
  Editor,
} from 'slate'
import { v4 } from 'uuid'

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
      id: v4(),
      correctAnswer: '',
      alternativeSolutions: ['Banana'],
      userEntry: 'Apple',
    })
    return
  }

  trimSelection(editor)

  const selectedText = editor.selection
    ? Editor.string(editor, editor.selection)
    : ''
  Transforms.wrapNodes(
    editor,
    {
      type: 'gap',
      children: [{ text: '' }],
      id: v4(),
      correctAnswer: selectedText,
      alternativeSolutions: ['Banana'],
      userEntry: 'Apple',
    },
    { split: true }
  )
  Transforms.collapse(editor, { edge: 'end' })
}
