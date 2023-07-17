import { useHotkeys } from 'react-hotkeys-hook'

import {
  focusNext,
  focusPrevious,
  selectParent,
  insertPluginChildAfter,
  redo,
  removePluginChild,
  undo,
  selectFocusTree,
  useAppDispatch,
  store,
} from '../../store'
import { EditorPlugin } from '@/serlo-editor/plugin'

export const useEnableEditorHotkeys = ({
  dispatch,
  id,
  plugin,
  mayManipulateSiblings,
  isDocumentEmpty,
}: {
  dispatch: ReturnType<typeof useAppDispatch>
  id: string
  plugin: EditorPlugin
  mayManipulateSiblings: boolean
  isDocumentEmpty: boolean
}) => {
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

  useHotkeys('up', (e) =>
    handleKeyDown(e, () => {
      dispatch(focusPrevious(selectFocusTree(store.getState())))
    })
  )

  useHotkeys('down', (e) =>
    handleKeyDown(e, () => {
      dispatch(focusNext(selectFocusTree(store.getState())))
    })
  )

  useHotkeys('enter', (e) =>
    handleKeyDown(e, () => {
      const parent = selectParent(store.getState(), id)
      if (!parent) return
      dispatch(
        insertPluginChildAfter({
          parent: parent.id,
          sibling: id,
        })
      )
    })
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
  })

  useHotkeys('ctrl+z, command+z', () => void dispatch(undo()))

  useHotkeys(
    'ctrl+y, command+y, ctrl+shift+z, command+shift+z',
    () => void dispatch(redo())
  )
}
