import { useMemo, useEffect, ReactNode, ContextType } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { configure, GlobalHotKeys } from 'react-hotkeys'
import { Provider } from 'react-redux'

import { createDefaultDocumentEditor } from '../default-document-editor'
import { createDefaultPluginToolbar } from '../default-plugin-toolbar'
import { EditorPlugin } from '../internal__plugin'
import {
  runInitRootSaga,
  undo,
  redo,
  selectPendingChanges,
  selectRoot,
  selectHasPendingChanges,
  selectSerializedRootDocument,
  store,
  useAppDispatch,
  useAppSelector,
  DocumentState,
} from '../store'
import {
  DocumentEditorContext,
  EditableContext,
  ErrorContext,
  PreferenceContextProvider,
  PluginToolbarContext,
} from './contexts'
import {
  PluginRegistryContext,
  Registry,
} from './contexts/plugin-registry-context'
import { PluginsContext } from './contexts/plugins-context'
import { SubDocument } from './sub-document'

configure({
  ignoreEventsCondition() {
    return false
  },
})

const DefaultDocumentEditor = createDefaultDocumentEditor()
const DefaultPluginToolbar = createDefaultPluginToolbar()

/**
 * Renders a single editor for an Serlo Editor document
 */
export function Editor(props: EditorProps) {
  return <Provider store={store}>{renderChildren()}</Provider>

  function renderChildren() {
    const children = (
      <InnerDocument
        {...props}
        editable={props.editable === undefined ? true : props.editable}
      />
    )
    if (props.omitDragDropContext) return children
    return <DndProvider backend={HTML5Backend}>{children}</DndProvider>
  }
}

const hotKeysKeyMap = {
  UNDO: ['ctrl+z', 'command+z'],
  REDO: ['ctrl+y', 'command+y', 'ctrl+shift+z', 'command+shift+z'],
}

export function InnerDocument({
  children,
  plugins,
  editable,
  onChange,
  onError,
  pluginRegistry,
  DocumentEditor = DefaultDocumentEditor,
  PluginToolbar = DefaultPluginToolbar,
  ...props
}: Omit<EditorProps, 'initialState'> &
  (
    | { mirror: true; initialState?: unknown }
    | { mirror?: false; initialState: EditorProps['initialState'] }
  )) {
  const id = useAppSelector(selectRoot)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (typeof onChange !== 'function') return
    let pendingChanges = selectPendingChanges(store.getState())
    return store.subscribe(() => {
      const currentPendingChanges = selectPendingChanges(store.getState())
      if (currentPendingChanges !== pendingChanges) {
        onChange({
          changed: selectHasPendingChanges(store.getState()),
          getDocument: () => selectSerializedRootDocument(store.getState()),
        })
        pendingChanges = currentPendingChanges
      }
    })
  }, [onChange])

  useEffect(() => {
    if (!props.mirror) {
      dispatch(runInitRootSaga({ initialState: props.initialState, plugins }))
    }
  }, [props.initialState, plugins, props.mirror, dispatch])
  const editableContextValue = useMemo(() => editable ?? true, [editable])
  const hotKeysHandlers = useMemo(
    () => ({
      UNDO: () => dispatch(undo()),
      REDO: () => dispatch(redo()),
    }),
    [dispatch]
  )

  if (!id) return null

  return (
    <GlobalHotKeys
      allowChanges
      keyMap={hotKeysKeyMap}
      handlers={hotKeysHandlers}
    >
      <div className="relative">
        <ErrorContext.Provider value={onError}>
          <PluginsContext.Provider value={plugins}>
            <DocumentEditorContext.Provider value={DocumentEditor}>
              <PluginRegistryContext.Provider value={pluginRegistry}>
                <PluginToolbarContext.Provider value={PluginToolbar}>
                  <PreferenceContextProvider>
                    <EditableContext.Provider value={editableContextValue}>
                      {renderChildren(id)}
                    </EditableContext.Provider>
                  </PreferenceContextProvider>
                </PluginToolbarContext.Provider>
              </PluginRegistryContext.Provider>
            </DocumentEditorContext.Provider>
          </PluginsContext.Provider>
        </ErrorContext.Provider>
      </div>
    </GlobalHotKeys>
  )

  function renderChildren(id: string) {
    const document = <SubDocument id={id} />

    if (typeof children === 'function') {
      return children(document)
    }

    return (
      <>
        {document}
        {children}
      </>
    )
  }
}

export type EditorPlugins = Record<string, EditorPlugin>

export interface EditorProps {
  omitDragDropContext?: boolean
  children?: ReactNode | ((document: ReactNode) => ReactNode)
  plugins: EditorPlugins
  pluginRegistry: Registry
  initialState: {
    plugin: string
    state?: unknown
  }
  onChange?: (payload: {
    changed: boolean
    getDocument: () => DocumentState | null
  }) => void
  editable?: boolean
  onError?: ContextType<typeof ErrorContext>
  DocumentEditor?: ContextType<typeof DocumentEditorContext>
  PluginToolbar?: ContextType<typeof PluginToolbarContext>
}
