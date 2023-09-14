import { useCallback, useEffect, useMemo } from 'react'
import { Descendant, Editor, Transforms, withoutNormalizing } from 'slate'
import { ReactEditor } from 'slate-react'

import type { TextEditorProps } from '../components/text-editor'
import { intermediateStore } from '../utils/intermediate-store'

interface UseEditorChangeArgs {
  editor: Editor
  state: TextEditorProps['state']
  id: string
  focused: boolean
}

export const useEditorChange = (args: UseEditorChangeArgs) => {
  const { editor, state, id, focused } = args

  // setup store on first render
  if (!intermediateStore[id]) {
    intermediateStore[id] = {
      value: state.value.value,
      selection: state.value.selection,
      needRefocus: 1,
    }
  }

  useMemo(() => {
    const { selection, value } = state.value

    // we received a new (different) state from core
    if (intermediateStore[id].value !== value) {
      intermediateStore[id].value = value
      intermediateStore[id].selection = selection
      editor.children = value
      withoutNormalizing(editor, () => {
        Transforms.deselect(editor)
        Transforms.select(editor, selection ?? Editor.start(editor, []))
      })
    }
  }, [editor, state.value, id])

  const handleEditorChange = useCallback(
    (newValue: Descendant[]) => {
      const isAstChange = editor.operations.some(
        ({ type }) => type !== 'set_selection'
      )
      const storeEntry = intermediateStore[id]

      if (isAstChange) {
        storeEntry.value = newValue
        state.set(
          { value: newValue, selection: editor.selection },
          ({ value }) => ({ value, selection: storeEntry.selection })
        )
      }

      storeEntry.selection = editor.selection
    },
    [editor.operations, editor.selection, state, id]
  )

  useEffect(() => {
    const storeEntry = intermediateStore[id]
    if (focused && storeEntry.needRefocus > 0) {
      // Fix crash in fast refresh: if this component is updated, slate needs a moment
      // to sync with dom. Don't try accessing slate in these situations
      if (editor.children.length === 0) {
        return
      }

      const selection = storeEntry.selection ?? Editor.start(editor, [])

      withoutNormalizing(editor, () => {
        Transforms.deselect(editor)
        Transforms.select(editor, selection)
      })

      ReactEditor.focus(editor)
      storeEntry.needRefocus--
    }
  })

  useEffect(() => {
    if (focused) {
      intermediateStore[id].needRefocus = 2
    }
  }, [focused, id])

  return {
    previousSelection: intermediateStore[id].selection,
    handleEditorChange,
  }
}
