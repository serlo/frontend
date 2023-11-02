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
import type { Blank } from '@/serlo-editor/plugins/text'

function matchBlanks(node: Node) {
  return Element.isElement(node) && node.type === 'blank'
}

export function isBlankActive(editor: SlateEditor) {
  return selectionHasElement((e) => e.type === 'blank', editor)
}

export function getBlankElement(editor: SlateEditor): Blank | undefined {
  const [match] = Array.from(SlateEditor.nodes(editor, { match: matchBlanks }))
  return match && (match[0] as Blank)
}

export function toggleBlank(editor: SlateEditor) {
  if (isBlankActive(editor)) {
    Transforms.removeNodes(editor, {
      match: (n) => Element.isElement(n) && n.type === 'blank',
    })
    // TODO: Blank and also its content disappear. Instead blank content should be added back as text element (also not working in toggleMath)
    return
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  if (isCollapsed) {
    Transforms.insertNodes(editor, {
      type: 'blank',
      blankId: uuid_v4(),
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
        type: 'blank',
        blankId: uuid_v4(),
        correctAnswer:
          SlateEditor.string(editor, trimmedSelection as Location) || '',
        alternativeSolutions: [],
        children: [{ text: '' }],
      },
    ],
    { at: trimmedSelection as Location }
  )
}
