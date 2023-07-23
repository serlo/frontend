import { useHotkeys } from 'react-hotkeys-hook'

import {
  focusNext,
  focusPrevious,
  selectParent,
  insertPluginChildAfter,
  removePluginChild,
  selectFocusTree,
  useAppDispatch,
  store,
  selectMayManipulateSiblings,
  useAppSelector,
  selectIsDocumentEmpty,
} from '../../store'
import { EditorPlugin } from '@/serlo-editor/plugin'

export const useEnableEditorHotkeys = (id: string, plugin: EditorPlugin) => {
  const dispatch = useAppDispatch()
  const isDocumentEmpty = useAppSelector((state) =>
    selectIsDocumentEmpty(state, id)
  )
  const mayManipulateSiblings = useAppSelector((state) =>
    selectMayManipulateSiblings(state, id)
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

  useHotkeys(
    'up',
    (e) =>
      handleKeyDown(e, () => {
        dispatch(focusPrevious(selectFocusTree(store.getState())))
      }),
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
    }
  )

  useHotkeys(
    'down',
    (e) =>
      handleKeyDown(e, () => {
        dispatch(focusNext(selectFocusTree(store.getState())))
      }),
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
    }
  )

  useHotkeys(
    'enter',
    (e) =>
      handleKeyDown(e, () => {
        const parent = selectParent(store.getState(), id)
        if (!parent) return
        dispatch(
          insertPluginChildAfter({
            parent: parent.id,
            sibling: id,
          })
        )
      }),
    {
      enableOnContentEditable: true,
      enableOnFormTags: false,
    }
  )

  useHotkeys('backspace, del', (e) => {
    if (isDocumentEmpty) {
      handleKeyDown(e, () => {
        if (!e) return
        if (mayManipulateSiblings) {
          const parent = selectParent(store.getState(), id)
          if (!parent) return

          if (e.key === 'Backspace') {
            dispatch(focusPrevious(selectFocusTree(store.getState())))
          } else if (e.key === 'Delete') {
            dispatch(focusNext(selectFocusTree(store.getState())))
          }
          dispatch(removePluginChild({ parent: parent.id, child: id }))
        }
      })
    }
  }),
    {
      enableOnContentEditable: true,
      enableOnFormTags: false,
    }
}
