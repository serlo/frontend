import {
  Editor as SlateEditor,
  Element,
  Transforms,
  Node,
  Editor,
  Path,
} from 'slate'
import { v4 as uuid_v4 } from 'uuid'

import { selectionHasElement, trimSelection } from './selection'
import type { Blank } from '@/serlo-editor/plugins/text'

export function isBlankActive(editor: SlateEditor) {
  return selectionHasElement((e) => e.type === 'textBlank', editor)
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
    if (!editor.selection) return

    const anchorPath = editor.selection.anchor.path
    const focusPath = editor.selection.focus.path

    // Node.elements(...) needs the "smaller" path in 'from'. Otherwise it will return nothing. Depending on how the user selects (expanding selection to the left or right) the anchor path might be "smaller" or "bigger" than the focus path. Here we figure out which path is the smaller/bigger one.
    const isAnchorLeftOfFocus = Path.compare(anchorPath, focusPath) === -1
    const range = isAnchorLeftOfFocus
      ? { from: anchorPath, to: focusPath }
      : { from: focusPath, to: anchorPath }
    const allElementsInSelection = [...Node.elements(editor, range)]

    allElementsInSelection.forEach((element) => {
      if (element[0].type !== 'textBlank') return

      const path = element[1]
      const correctAnswer = element[0].correctAnswers.at(0)?.answer ?? ''

      // Inserts the correct answer under element.children.text
      Transforms.insertText(editor, correctAnswer, { at: path, voids: true })
    })

    // Removes the blank node and lifts the contained text node (now containing the correct answer) one level up
    Transforms.unwrapNodes(editor, {
      voids: true,
      match: (node) => {
        return Element.isElement(node) && node.type === 'textBlank'
      },
    })
  })
}

function addBlank(editor: SlateEditor) {
  const selection = trimSelection(editor)

  if (selection === null) return

  const newBlankNode: Blank = {
    type: 'textBlank',
    blankId: uuid_v4(),
    correctAnswers: [{ answer: SlateEditor.string(editor, selection).trim() }],
    children: [{ text: '' }],
  }

  Transforms.insertNodes(editor, newBlankNode, { at: selection })
}
