import { BlankInterface as Blank } from '@editor/plugins/fill-in-the-blanks-exercise/types'
import {
  Editor as SlateEditor,
  Element,
  Transforms,
  Node,
  Editor,
  Path,
} from 'slate'
import { ReactEditor } from 'slate-react'
import { v4 as uuid_v4 } from 'uuid'

import { selectionHasElement, trimSelection } from './selection'

function matchBlanks(node: Node) {
  return Element.isElement(node) && node.type === 'textBlank'
}

export function isBlankActive(editor: SlateEditor) {
  return selectionHasElement((e) => e.type === 'textBlank', editor)
}

export function getBlankElement(editor: SlateEditor): Blank | undefined {
  const [match] = Array.from(SlateEditor.nodes(editor, { match: matchBlanks }))
  return match && (match[0] as Blank)
}

export function toggleBlank(editor: SlateEditor) {
  if (isBlankActive(editor)) {
    removeBlanks(editor)
  } else {
    addBlank(editor)
  }
}

export function removeBlanks(editor: SlateEditor) {
  Editor.withoutNormalizing(editor, () => {
    if (!editor.selection) return

    const from = editor.selection.anchor.path
    const to = editor.selection.focus.path
    const reverse = Path.compare(from, to) > -1
    const nodesInSelection = [...Node.elements(editor, { from, to, reverse })]

    nodesInSelection.forEach((element) => {
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
  // After the blank is removed, we must refocus the editor. Without the timeout
  // it blows up and moving this code to the unmounting of the blank-renderer
  // also blows up when changing from preview to edit mode.
  setTimeout(() => ReactEditor.focus(editor))
}

function addBlank(editor: SlateEditor) {
  const selection = trimSelection(editor)

  if (selection === null) return

  const newBlankNode: Blank = {
    type: 'textBlank',
    blankId: uuid_v4(),
    correctAnswers: [{ answer: SlateEditor.string(editor, selection).trim() }],
    acceptMathEquivalents: false,
    children: [{ text: '' }],
  }

  Transforms.insertNodes(editor, newBlankNode)
}
