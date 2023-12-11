import { Editor as SlateEditor, Element, Range, Transforms } from 'slate'
import { v4 as uuid_v4 } from 'uuid'

import { selectionHasElement, trimSelection } from './selection'
import type { Blank } from '@/serlo-editor/plugins/text'

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

  const selection = trimSelection(editor)

  if (selection === null) return

  const isCollaped = Range.isCollapsed(selection)
  const answer = isCollaped ? '' : SlateEditor.string(editor, selection).trim()

  const newBlankNode: Blank = {
    type: 'blank',
    blankId: uuid_v4(),
    correctAnswers: [{ answer }],
    children: [{ text: '' }],
  }
  const at = isCollaped ? selection : undefined

  Transforms.insertNodes(editor, newBlankNode, { at })
}
