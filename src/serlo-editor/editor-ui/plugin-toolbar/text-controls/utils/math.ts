import {
  Editor as SlateEditor,
  Range,
  Transforms,
  Element,
  Location,
} from 'slate'

import { selectionHasElement, trimSelection } from './selection'

export function isMathActive(editor: SlateEditor) {
  return selectionHasElement((e) => e.type === 'math', editor)
}

export function toggleMath(editor: SlateEditor) {
  if (isMathActive(editor)) {
    Transforms.removeNodes(editor, {
      match: (n) => Element.isElement(n) && n.type === 'math',
    })
    return
  }

  const { selection } = editor
  if (!selection) return

  const isCollapsed = Range.isCollapsed(selection)
  if (isCollapsed) {
    Transforms.insertNodes(editor, {
      type: 'math',
      src: '',
      inline: true,
      children: [{ text: '' }],
    })
    return
  }

  const trimmedSelection = trimSelection(editor)
  Transforms.insertNodes(
    editor,
    [
      {
        type: 'math',
        src: SlateEditor.string(editor, trimmedSelection as Location) || '',
        inline: true,
        children: [{ text: '' }],
      },
    ],
    { at: trimmedSelection as Location }
  )
  // Use the previous selection to set the selection at the beginning of the math formula,
  // and then move it into the math formula to show the editor
  Transforms.setSelection(editor, {
    anchor: selection.anchor,
    focus: selection.anchor,
  })
  Transforms.move(editor, { distance: 1 })
}
