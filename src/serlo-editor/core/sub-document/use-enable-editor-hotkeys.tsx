import { useEffect } from 'react'
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook'
import { Key } from 'ts-key-enum'

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
import type { EditorPlugin } from '@/serlo-editor/plugin'

export const useEnableEditorHotkeys = (
  id: string,
  plugin: EditorPlugin,
  isFocused: boolean
) => {
  const dispatch = useAppDispatch()
  const isDocumentEmpty = useAppSelector((state) =>
    selectIsDocumentEmpty(state, id)
  )
  const mayManipulateSiblings = useAppSelector((state) =>
    selectMayManipulateSiblings(state, id)
  )

  const { enableScope } = useHotkeysContext()
  useEffect(() => {
    enableScope('root-up-down-enter')
  }, [enableScope])

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
    Key.ArrowUp,
    (e) => {
      handleKeyDown(e, () => {
        dispatch(focusPrevious(selectFocusTree(store.getState())))
      })
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
      scopes: ['root-up-down-enter'],
      enabled: isFocused,
    }
  )

  useHotkeys(
    Key.ArrowDown,
    (e) => {
      handleKeyDown(e, () => {
        dispatch(focusNext(selectFocusTree(store.getState())))
      })
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
      scopes: ['root-up-down-enter'],
      enabled: isFocused,
    }
  )

  useHotkeys(
    Key.Enter,
    (e) => {
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
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: false,
      scopes: ['root-up-down-enter'],
      enabled: isFocused,
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
      scopes: ['global'],
      enabled: isFocused,
    }
}
