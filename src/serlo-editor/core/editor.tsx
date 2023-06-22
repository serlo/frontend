import { useMemo, useEffect, ReactNode } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { configure, GlobalHotKeys } from 'react-hotkeys'
import { Provider } from 'react-redux'

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
import { EditableContext, PreferenceContextProvider } from './contexts'
import {
  PluginsContext,
  PluginsContextPlugins,
} from './contexts/plugins-context'
import { SubDocument } from './sub-document'

configure({
  ignoreEventsCondition() {
    return false
  },
})

/**
 * Renders a single editor for an Serlo Editor document
 */
export function Editor(props: EditorProps) {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <InnerDocument {...props} />
      </DndProvider>
    </Provider>
  )
}

const hotKeysKeyMap = {
  UNDO: ['ctrl+z', 'command+z'],
  REDO: ['ctrl+y', 'command+y', 'ctrl+shift+z', 'command+shift+z'],
}

export function InnerDocument({
  children,
  plugins,
  editable = true,
  onChange,
  ...props
}: EditorProps) {
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

  const strippedPlugins = plugins

  useEffect(() => {
    dispatch(
      runInitRootSaga({
        initialState: props.initialState,
        plugins: strippedPlugins,
      })
    )
  }, [props.initialState, strippedPlugins, dispatch])
  const editableContextValue = useMemo(() => editable, [editable])
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
        <PluginsContext.Provider value={plugins}>
          <PreferenceContextProvider>
            <EditableContext.Provider value={editableContextValue}>
              {renderChildren(id)}
            </EditableContext.Provider>
          </PreferenceContextProvider>
        </PluginsContext.Provider>
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

export interface EditorProps {
  children?: ReactNode | ((document: ReactNode) => ReactNode)
  plugins: PluginsContextPlugins
  initialState: {
    plugin: string
    state?: unknown
  }
  onChange?: (payload: {
    changed: boolean
    getDocument: () => DocumentState | null
  }) => void
  editable?: boolean
}
