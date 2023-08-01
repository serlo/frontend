import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from 'react'
import { Descendant, Editor, Transforms } from 'slate'

import { TextEditorProps } from '../components/text-editor'

interface UseEditorChangeArgs {
  editor: Editor
  state: TextEditorProps['state']
  onChange: Dispatch<SetStateAction<number>>
}

export const useEditorChange = (args: UseEditorChangeArgs) => {
  const { editor, state, onChange } = args

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
      const isAstChange = editor.operations.some(
        ({ type }) => type !== 'set_selection'
      )
      if (isAstChange) {
        previousValue.current = newValue
        state.set(
          { value: newValue, selection: editor.selection },
          ({ value }) => ({ value, selection: previousSelection.current })
        )
      }
      onChange((count: number) => count + 1)
      previousSelection.current = editor.selection
    },
    [editor.operations, editor.selection, state, onChange]
  )

  return {
    previousSelection,
    handleEditorChange,
  }
}
