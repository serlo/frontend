import { useCallback, useMemo, useRef } from 'react'
import { Descendant, Editor, Transforms } from 'slate'

import type { TextEditorProps } from '../components/text-editor'
import { CustomElement, ListElementType, Paragraph } from '../types/text-editor'

interface UseEditorChangeArgs {
  editor: Editor
  state: TextEditorProps['state']
}

export const useEditorChange = (args: UseEditorChangeArgs) => {
  const { editor, state } = args

  const previousValue = useRef(state.value.value)
  const previousSelection = useRef(state.value.selection)

  useMemo(() => {
    const { selection, value } = state.value
    // The selection can only be null when the text plugin is initialized
    // (In this case an update of the slate editor is not necessary)
    if (!selection) return

    Transforms.setSelection(editor, selection)

    if (previousValue.current !== value) {
      previousValue.current = value
      editor.children = value
    }
  }, [editor, state.value])

  const handleEditorChange = useCallback(
    (newValue: Descendant[]) => {
      let modifiedValue = []
      modifiedValue = newValue

      // Add an empty line in front of list elements at th start of the block
      // This way we avoid list related merging issues
      if (newValue.length > 0) {
        const first_child = newValue[0] as CustomElement
        if (
          first_child.type === ListElementType.ORDERED_LIST ||
          first_child.type === ListElementType.UNORDERED_LIST
        ) {
          const empty_text_node = {
            children: [{ text: '' }],
            type: 'p',
          } as Paragraph
          modifiedValue = [empty_text_node, ...modifiedValue]
          editor.insertNode(empty_text_node, { at: [0] })
        }
      }

      const isAstChange = editor.operations.some(
        ({ type }) => type !== 'set_selection'
      )
      if (isAstChange) {
        previousValue.current = modifiedValue
        state.set(
          { value: modifiedValue, selection: editor.selection },
          ({ value }) => ({ value, selection: previousSelection.current })
        )
      }
      previousSelection.current = editor.selection
    },
    [editor.operations, editor.selection, state]
  )

  return {
    previousSelection,
    handleEditorChange,
  }
}
