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
import { usePlugins } from '../contexts/plugins-context'
import { EditorPlugin } from '@/serlo-editor/plugin'

export const useEnableEditorHotkeys = (id: string, plugin: EditorPlugin) => {
  const dispatch = useAppDispatch()
  const plugins = usePlugins()
  const isDocumentEmpty = useAppSelector((state) =>
    selectIsDocumentEmpty(state, id)
  )
  const mayManipulateSiblings = useAppSelector((state) =>
    selectMayManipulateSiblings(state, id)
  )

  const { enableScope } = useHotkeysContext()
  useEffect(() => {
    console.log("Enable scope recomputes. Setting 'root-up-down-enter' scope")
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
      console.log('ArrowUp called in root')
      handleKeyDown(e, () => {
        dispatch(focusPrevious(selectFocusTree(store.getState())))
      })
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
      scopes: ['root-up-down-enter'],
    }
  )

  useHotkeys(
    Key.ArrowDown,
    (e) => {
      console.log('ArrowDown called in root')

      handleKeyDown(e, () => {
        dispatch(focusNext(selectFocusTree(store.getState())))
      })
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
      scopes: ['root-up-down-enter'],
    }
  )

  useHotkeys(
    Key.Enter,
    (e) =>
      handleKeyDown(e, () => {
        const parent = selectParent(store.getState(), id)
        if (!parent) return
        dispatch(
          insertPluginChildAfter({
            parent: parent.id,
            sibling: id,
            plugins,
          })
        )
      }),
    {
      enableOnContentEditable: true,
      enableOnFormTags: false,
      scopes: ['root-up-down-enter'],
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
          dispatch(removePluginChild({ parent: parent.id, child: id, plugins }))
        }
      })
    }
  }),
    {
      enableOnContentEditable: true,
      enableOnFormTags: false,
    }
}
