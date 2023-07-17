import * as R from 'ramda'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useHotkeys } from 'react-hotkeys-hook'

import { SubDocumentProps } from '.'
import {
  runChangeDocumentSaga,
  focus,
  focusNext,
  focusPrevious,
  selectDocument,
  selectMayManipulateSiblings,
  selectParent,
  insertPluginChildAfter,
  selectIsDocumentEmpty,
  selectIsFocused,
  redo,
  removePluginChild,
  undo,
  useAppSelector,
  selectFocusTree,
  useAppDispatch,
  store,
} from '../../store'
import { StateUpdater } from '../../types/internal__plugin-state'
import { usePlugin } from '../contexts/plugins-context'
import { DocumentEditor } from '@/serlo-editor/editor-ui/document-editor'
import { EditorPlugin } from '@/serlo-editor/types/internal__plugin'

const useEnableEditorHotKeys = ({
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

  useHotkeys('ctrl+z, command+z', () => {
    void dispatch(undo())
  })

  useHotkeys('ctrl+y, command+y, ctrl+shift+z, command+shift+z', () => {
    void dispatch(redo())
  })
}

export function SubDocumentEditor({ id, pluginProps }: SubDocumentProps) {
  const [hasSettings, setHasSettings] = useState(false)
  const [hasToolbar, setHasToolbar] = useState(false)
  const dispatch = useAppDispatch()
  const document = useAppSelector((state) => selectDocument(state, id))
  const isDocumentEmpty = useAppSelector((state) =>
    selectIsDocumentEmpty(state, id)
  )
  const mayManipulateSiblings = useAppSelector((state) =>
    selectMayManipulateSiblings(state, id)
  )
  const focused = useAppSelector((state) => selectIsFocused(state, id))
  const plugin = usePlugin(document?.plugin)?.plugin as EditorPlugin
  useEnableEditorHotKeys({
    dispatch,
    id,
    plugin,
    mayManipulateSiblings,
    isDocumentEmpty,
  })

  const container = useRef<HTMLDivElement>(null)
  const settingsRef = useRef<HTMLDivElement>(
    window.document.createElement('div')
  )
  const toolbarRef = useRef<HTMLDivElement>(
    window.document.createElement('div')
  )
  const autofocusRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  useEffect(() => {
    if (focused) {
      setTimeout(() => {
        if (autofocusRef.current) {
          autofocusRef.current.focus()
        }
      })
    }
  }, [focused])

  useEffect(() => {
    if (
      focused &&
      container.current &&
      document &&
      plugin &&
      !plugin.state.getFocusableChildren(document.state).length
    ) {
      container.current.focus()
    }
    // `document` should not be part of the dependencies because we only want to call this once when the document gets focused
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused, plugin])

  const handleFocus = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Find closest document
      const target = (e.target as HTMLDivElement).closest('[data-document]')

      if (!focused && target === container.current) {
        dispatch(focus(id))
      }
    },
    [focused, id, dispatch]
  )

  const renderIntoSettings = useCallback(
    (children: React.ReactNode) => {
      return (
        <RenderIntoSettings
          setHasSettings={setHasSettings}
          settingsRef={settingsRef}
        >
          {children}
        </RenderIntoSettings>
      )
    },
    [settingsRef]
  )

  const renderIntoToolbar = useCallback(
    (children: React.ReactNode) => {
      return (
        <RenderIntoToolbar
          setHasToolbar={setHasToolbar}
          toolbarRef={toolbarRef}
        >
          {children}
        </RenderIntoToolbar>
      )
    },
    [toolbarRef]
  )

  return useMemo(() => {
    if (!document) return null
    if (!plugin) {
      // eslint-disable-next-line no-console
      console.warn('Plugin does not exist')
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const defaultConfig =
      typeof plugin.config === 'function' ? plugin.config() : plugin.config
    const overrideConfig = (pluginProps && pluginProps.config) || {}
    const config = R.mergeDeepRight(defaultConfig, overrideConfig)

    const onChange = (
      initial: StateUpdater<unknown>,
      additional: {
        executor?: ReturnType<
          typeof runChangeDocumentSaga
        >['payload']['state']['executor']
        reverse?: ReturnType<typeof runChangeDocumentSaga>['payload']['reverse']
      } = {}
    ) => {
      dispatch(
        runChangeDocumentSaga({
          id,
          state: {
            initial,
            executor: additional.executor,
          },
          reverse: additional.reverse,
        })
      )
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const state = plugin.state.init(document.state, onChange)

    return (
      <div
        className="outline-none"
        onMouseDown={handleFocus}
        ref={container}
        data-document
        tabIndex={-1}
      >
        <DocumentEditor
          hasSettings={hasSettings}
          hasToolbar={hasToolbar}
          focused={focused}
          renderSettings={pluginProps && pluginProps.renderSettings}
          renderToolbar={pluginProps && pluginProps.renderToolbar}
          settingsRef={settingsRef}
          toolbarRef={toolbarRef}
        >
          <plugin.Component
            renderIntoSettings={renderIntoSettings}
            renderIntoToolbar={renderIntoToolbar}
            id={id}
            editable
            focused={focused}
            config={config}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            state={state}
            autofocusRef={autofocusRef}
          />
        </DocumentEditor>
      </div>
    )
  }, [
    document,
    plugin,
    pluginProps,
    handleFocus,
    hasSettings,
    hasToolbar,
    focused,
    renderIntoSettings,
    renderIntoToolbar,
    id,
    dispatch,
  ])
}

function RenderIntoSettings({
  children,
  setHasSettings,
  settingsRef,
}: {
  children: React.ReactNode
  setHasSettings: (value: boolean) => void
  settingsRef: React.MutableRefObject<HTMLDivElement>
}) {
  useEffect(() => {
    setHasSettings(true)
  })
  if (!settingsRef.current) return null
  return createPortal(<>{children}</>, settingsRef.current)
}

function RenderIntoToolbar({
  children,
  setHasToolbar,
  toolbarRef,
}: {
  children: React.ReactNode
  setHasToolbar: (value: boolean) => void
  toolbarRef: React.MutableRefObject<HTMLDivElement>
}) {
  useEffect(() => {
    setHasToolbar(true)
  })
  if (!toolbarRef.current) return null
  return createPortal(children, toolbarRef.current)
}
