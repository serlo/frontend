import { useEffect } from 'react'
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook'
import { Key } from 'ts-key-enum'

import {
  focusNext,
  focusPrevious,
  selectDocumentTree,
  selectIsDocumentEmpty,
  selectMayManipulateSiblings,
  selectParent,
  removePluginChild,
  insertPluginChildAfter,
  store,
  useAppDispatch,
  useAppSelector,
} from '../../store'
import { usePlugins } from '../contexts/plugins-context'
import { EditorPlugin } from '@/serlo-editor/plugin'

export const useEnableEditorHotkeys = (
  id: string,
  plugin: EditorPlugin,
  isFocused: boolean
) => {
  const dispatch = useAppDispatch()
  const plugins = usePlugins()
  const isDocumentEmpty = useAppSelector((state) =>
    selectIsDocumentEmpty(state, id)
  )
  const mayManipulateSiblings = useAppSelector((state) =>
    selectMayManipulateSiblings(state, { plugins, id })
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
        dispatch(focusPrevious(selectDocumentTree(store.getState(), plugins)))
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
        dispatch(focusNext(selectDocumentTree(store.getState(), plugins)))
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
        const parent = selectParent(store.getState(), { plugins, id })
        if (!parent) return
        dispatch(
          insertPluginChildAfter({
            parent: parent.id,
            sibling: id,
            plugins,
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
          const parent = selectParent(store.getState(), { plugins, id })
          if (!parent) return

          if (e.key === 'Backspace') {
            dispatch(
              focusPrevious(selectDocumentTree(store.getState(), plugins))
            )
          } else if (e.key === 'Delete') {
            dispatch(focusNext(selectDocumentTree(store.getState(), plugins)))
          }
          dispatch(removePluginChild({ parent: parent.id, child: id, plugins }))
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
