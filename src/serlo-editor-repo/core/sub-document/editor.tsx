import * as R from 'ramda'
import {
  useState,
  useRef,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import { createPortal } from 'react-dom'
import { HotKeys, IgnoreKeys } from 'react-hotkeys'

import { SubDocumentProps } from '.'
import { StateUpdater } from '../../internal__plugin-state'
import {
  store,
  change,
  focus,
  focusNext,
  focusPrevious,
  selectDocument,
  selectMayRemoveChild,
  selectParent,
  selectPlugin,
  insertChildAfter,
  selectIsDocumentEmpty,
  selectIsFocused,
  redo,
  removeChild,
  undo,
  useAppSelector,
} from '../../store'
import { styled } from '../../ui'
import { DocumentEditorContext, PluginToolbarContext } from '../contexts'

const StyledDocument = styled.div({
  outline: 'none',
})

const hotKeysKeyMap = {
  FOCUS_PREVIOUS: 'up',
  FOCUS_NEXT: 'down',
  INSERT_DEFAULT_PLUGIN: 'enter',
  DELETE_EMPTY: ['backspace', 'del'],
  UNDO: ['ctrl+z', 'command+z'],
  REDO: ['ctrl+y', 'command+y', 'ctrl+shift+z', 'command+shift+z'],
}
type HotKeysHandlers = {
  [K in keyof typeof hotKeysKeyMap]: (keyEvent?: KeyboardEvent) => void
}

export function SubDocumentEditor({ id, pluginProps }: SubDocumentProps) {
  const [hasSettings, setHasSettings] = useState(false)
  const [hasToolbar, setHasToolbar] = useState(false)
  const document = useAppSelector((state) => selectDocument(state, id))
  const focused = useAppSelector((state) => selectIsFocused(state, id))
  const plugin = useAppSelector(
    (state) => document && selectPlugin(state, document.plugin)
  )

  const container = useRef<HTMLDivElement>(null)
  const settingsRef = useRef<HTMLDivElement>(
    window.document.createElement('div')
  )
  const toolbarRef = useRef<HTMLDivElement>(
    window.document.createElement('div')
  )
  const DocumentEditor = useContext(DocumentEditorContext)
  const PluginToolbar = useContext(PluginToolbarContext)
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

  const hotKeysHandlers = useMemo((): HotKeysHandlers => {
    return {
      FOCUS_PREVIOUS: (e) => {
        handleKeyDown(e, () => {
          store.dispatch(focusPrevious)
        })
      },
      FOCUS_NEXT: (e) => {
        handleKeyDown(e, () => {
          store.dispatch(focusNext)
        })
      },
      INSERT_DEFAULT_PLUGIN: (e) => {
        handleKeyDown(e, () => {
          const parent = selectParent(store.getState(), id)
          if (!parent) return
          store.dispatch(
            insertChildAfter({
              parent: parent.id,
              sibling: id,
            })
          )
        })
      },
      DELETE_EMPTY: (e) => {
        if (selectIsDocumentEmpty(store.getState(), id)) {
          handleKeyDown(e, () => {
            if (!e) return
            if (selectMayRemoveChild(store.getState(), id)) {
              const parent = selectParent(store.getState(), id)
              if (!parent) return

              if (e.key === 'Backspace') {
                store.dispatch(focusPrevious)
              } else if (e.key === 'Delete') {
                store.dispatch(focusNext)
              }
              store.dispatch(removeChild({ parent: parent.id, child: id }))
            }
          })
        }
      },
      // TODO: workaround for https://github.com/edtr-io/edtr-io/issues/272
      UNDO: () => {
        void store.dispatch(undo())
      },
      REDO: () => {
        void store.dispatch(redo())
      },
    }

    function handleKeyDown(e: KeyboardEvent | undefined, next: () => void) {
      if (
        e &&
        plugin &&
        typeof plugin.onKeyDown === 'function' &&
        !plugin.onKeyDown(e)
      ) {
        return
      }
      e && e.preventDefault()
      next()
    }
  }, [id, plugin])

  const handleFocus = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Find closest document
      const target = (e.target as HTMLDivElement).closest('[data-document]')

      if (!focused && target === container.current) {
        store.dispatch(focus(id))
      }
    },
    [focused, id]
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
      console.log('Plugin does not exist')
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
        executor?: ReturnType<typeof change>['payload']['state']['executor']
        reverse?: ReturnType<typeof change>['payload']['reverse']
      } = {}
    ) => {
      store.dispatch(
        change({
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
      <HotKeys keyMap={hotKeysKeyMap} handlers={hotKeysHandlers} allowChanges>
        <StyledDocument
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
            PluginToolbar={PluginToolbar}
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
        </StyledDocument>
      </HotKeys>
    )
  }, [
    DocumentEditor,
    document,
    plugin,
    pluginProps,
    handleFocus,
    hasSettings,
    hasToolbar,
    focused,
    PluginToolbar,
    renderIntoSettings,
    renderIntoToolbar,
    id,
    hotKeysHandlers,
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
  return createPortal(<IgnoreKeys>{children}</IgnoreKeys>, settingsRef.current)
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
