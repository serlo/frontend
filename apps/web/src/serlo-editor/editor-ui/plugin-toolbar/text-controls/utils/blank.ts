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

export function isBlankActive(editor: SlateEditor) {
  return selectionHasElement((e) => e.type === 'blank', editor)
}

export function toggleBlank(editor: SlateEditor) {
  if (isBlankActive(editor)) {
    const deletedAnswers: string[] = []

    Transforms.removeNodes(editor, {
      match: (node) => {
        if (Element.isElement(node) && node.type === 'blank') {
          deletedAnswers.push(node.correctAnswers.at(0)?.answer ?? '')
          return true
        }
        return false
      },
    })

    const collectedAnswers = deletedAnswers.join('')

    if (collectedAnswers.length > 0) {
      Transforms.insertNodes(editor, { text: collectedAnswers })
    }

    return
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  if (isCollapsed) {
    Transforms.insertNodes(editor, {
      type: 'blank',
      blankId: uuid_v4(),
      correctAnswers: [{ answer: '' }],
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
        correctAnswers: [
          {
            answer: SlateEditor.string(
              editor,
              trimmedSelection as Location
            ).trim(),
          },
        ],
        children: [{ text: '' }],
      },
    ],
    { at: trimmedSelection as Location }
  )
}
