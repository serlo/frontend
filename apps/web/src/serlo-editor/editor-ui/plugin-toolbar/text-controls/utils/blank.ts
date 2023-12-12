import { Editor as SlateEditor, Element, Transforms, Node, Editor } from 'slate'
import { v4 as uuid_v4 } from 'uuid'

import { selectionHasElement, trimSelection } from './selection'
import type { Blank } from '@/serlo-editor/plugins/text'

export function isBlankActive(editor: SlateEditor) {
  return selectionHasElement((e) => e.type === 'blank', editor)
}

export function toggleBlank(editor: SlateEditor) {
  if (isBlankActive(editor)) {
    removeBlanks(editor)
  } else {
    addBlank(editor)
  }
}

function removeBlanks(editor: SlateEditor) {
  Editor.withoutNormalizing(editor, () => {
    const allElementsInSelection = [...Node.elements(editor)]

    allElementsInSelection.forEach((element) => {
      if (element[0].type !== 'blank') return

      const path = element[1]
      const correctAnswer = element[0].correctAnswers.at(0)?.answer ?? ''

      // Inserts the correct answer under element.children.text
      Transforms.insertText(editor, correctAnswer, { at: path, voids: true })
    })

    // Removes the blank node and lifts the contained text node (now containing the correct answer) one level up
    Transforms.unwrapNodes(editor, {
      voids: true,
      match: (node) => {
        return Element.isElement(node) && node.type === 'blank'
      },
    })
  })
}

function addBlank(editor: SlateEditor) {
  const selection = trimSelection(editor)

  if (selection === null) return

  const newBlankNode: Blank = {
    type: 'blank',
    blankId: uuid_v4(),
    correctAnswers: [{ answer: SlateEditor.string(editor, selection).trim() }],
    children: [{ text: '' }],
  }

  Transforms.insertNodes(editor, newBlankNode, { at: selection })
}
