import {
  Editor as SlateEditor,
  Element,
  Node,
  Range,
  Transforms,
  Location,
} from 'slate'
import { v4 as uuid_v4 } from 'uuid'

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
    Transforms.removeNodes(editor, {
      match: (n) => Element.isElement(n) && n.type === 'gap',
    })
    // TODO: Gap and also its content disappear. Instead gap content should be added back as text element (also not working in toggleMath)
    return
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  if (isCollapsed) {
    Transforms.insertNodes(editor, {
      type: 'gap',
      gapId: uuid_v4(),
      correctAnswer: '',
      alternativeSolutions: [],
      children: [{ text: '' }],
    })
    return
  }

  const trimmedSelection = trimSelection(editor)
  Transforms.insertNodes(
    editor,
    [
      {
        type: 'gap',
        gapId: uuid_v4(),
        correctAnswer:
          SlateEditor.string(editor, trimmedSelection as Location) || '',
        alternativeSolutions: [],
        children: [{ text: '' }],
      },
    ],
    { at: trimmedSelection as Location }
  )
}
