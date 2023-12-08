import type { Blank } from '@editor/plugins/text'
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
    let text = undefined
    Transforms.removeNodes(editor, {
      match: (node) => {
        const isHit = Element.isElement(node) && node.type === 'blank'
        if (isHit) text = node
        return isHit
      },
    })
    if (text) {
      Transforms.insertNodes(editor, { text: (text as Blank).correctAnswer })
    }
    return
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  if (isCollapsed) {
    Transforms.insertNodes(editor, {
      type: 'blank',
      blankId: uuid_v4(),
      correctAnswer: '',
      // Disabled alternative correct solutions for now
      // alternativeSolutions: [],
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
        // Disabled alternative correct solutions for now
        // alternativeSolutions: [],
        children: [{ text: '' }],
      },
    ],
    { at: trimmedSelection as Location }
  )
}
