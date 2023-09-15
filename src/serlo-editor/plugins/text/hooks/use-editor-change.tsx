import { useEffect, useMemo } from 'react'
import { Descendant, Editor, Transforms, withoutNormalizing } from 'slate'
import { ReactEditor } from 'slate-react'

import type { TextEditorProps } from '../components/text-editor'
import { instanceStateStore } from '../utils/instance-state-store'

interface UseEditorChangeArgs {
  editor: Editor
  state: TextEditorProps['state']
  id: string
  focused: boolean
}

export const useEditorChange = (args: UseEditorChangeArgs) => {
  const { editor, state, id, focused } = args

  // Setup store on first render
  if (!instanceStateStore[id]) {
    instanceStateStore[id] = {
      value: state.value.value,
      selection: state.value.selection,
    }
  }

  useMemo(() => {
    const { selection, value } = state.value

    // we received a new (different) state from core
    if (instanceStateStore[id].value !== value) {
      instanceStateStore[id].value = value
      instanceStateStore[id].selection = selection
      editor.children = value
      withoutNormalizing(editor, () => {
        Transforms.deselect(editor)
        Transforms.select(editor, selection ?? Editor.start(editor, []))
      })
    }
  }, [editor, state.value, id])

  const handleEditorChange = (newValue: Descendant[]) => {
    const isAstChange = editor.operations.some(
      ({ type }) => type !== 'set_selection'
    )
    const storeEntry = instanceStateStore[id]

    if (isAstChange) {
      storeEntry.value = newValue
      state.set(
        { value: newValue, selection: editor.selection },
        ({ value }) => ({ value, selection: storeEntry.selection })
      )
    }

    storeEntry.selection = editor.selection
  }

  useEffect(() => {
    if (focused) {
      setTimeout(() => {
        ReactEditor.focus(editor)
      })
    }
  }, [focused, id, editor])

  return {
    previousSelection: instanceStateStore[id].selection,
    handleEditorChange,
  }
}
