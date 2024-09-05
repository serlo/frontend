import type { EditorPlugin } from '@editor/plugin'
import { useHotkeys } from 'react-hotkeys-hook'

import {
  focusNext,
  focusPrevious,
  selectChildTreeOfParent,
  removePluginChild,
  selectChildTree,
  useAppDispatch,
  store,
  selectMayManipulateSiblings,
  useAppSelector,
  selectIsDocumentEmpty,
} from '../../store'

export const useEnableEditorHotkeys = (
  id: string,
  plugin: EditorPlugin,
  isFocused: boolean
) => {
  const dispatch = useAppDispatch()
  const isDocumentEmpty = useAppSelector((state) =>
    selectIsDocumentEmpty(state, id)
  )

  const handleKeyDown = (event: KeyboardEvent, callback: () => void) => {
    if (
      event &&
      plugin &&
      typeof plugin.onKeyDown === 'function' &&
      !plugin.onKeyDown(event)
    ) {
      return
    }

    event && event.preventDefault()
    callback()
  }

  useHotkeys('backspace, del', (e) => {
    if (isDocumentEmpty) {
      handleKeyDown(e, () => {
        if (!e) return

        const mayManipulateSiblings = selectMayManipulateSiblings(
          store.getState(),
          id
        )
        if (!mayManipulateSiblings) return

        const parent = selectChildTreeOfParent(store.getState(), id)
        if (!parent) return

        if (e.key === 'Backspace') {
          dispatch(focusPrevious(selectChildTree(store.getState())))
        } else if (e.key === 'Delete') {
          dispatch(focusNext(selectChildTree(store.getState())))
        }
        dispatch(removePluginChild({ parent: parent.id, child: id }))
      })
    }
  }),
    {
      enableOnContentEditable: true,
      enableOnFormTags: false,
      scopes: ['global'],
      enabled: isFocused,
    }
}
