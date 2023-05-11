import { useMemo, useEffect, ReactNode, useContext, ContextType } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { configure, GlobalHotKeys } from 'react-hotkeys'

import { createDefaultDocumentEditor } from '../default-document-editor'
import { createDefaultPluginToolbar } from '../default-plugin-toolbar'
import { EditorPlugin } from '../internal__plugin'
import {
  initRoot,
  undo,
  redo,
  getPendingChanges,
  getRoot,
  hasPendingChanges,
  serializeRootDocument,
  createStore,
  ChangeListener,
  StoreEnhancerFactory,
  getScope,
} from '../store'
import {
  DocumentEditorContext,
  PreferenceContextProvider,
  PluginToolbarContext,
} from './contexts'
import {
  Provider,
  EditorContext,
  ScopeContext,
  ErrorContext,
  useSelector,
  useDispatch,
  useStore,
} from './store'
import { SubDocument } from './sub-document'

configure({
  ignoreEventsCondition() {
    return false
  },
})

const DefaultDocumentEditor = createDefaultDocumentEditor()
const DefaultPluginToolbar = createDefaultPluginToolbar()

const MAIN_SCOPE = 'main'

let mountedProvider = false
const mountedScopes: Record<string, boolean> = {}

/**
 * Renders a single editor for an Edtr.io document
 *
 * @param props - The {@link EditorProps | props}
 * @public
 */
export function Editor<K extends string = string>(props: EditorProps<K>) {
  const {
    createStoreEnhancer = (defaultEnhancer) => defaultEnhancer,
    ...rest
  }: EditorProps<K> = props
  const store = useMemo(() => {
    return createStore({
      scopes: {
        [MAIN_SCOPE]: rest.plugins,
      },
      createEnhancer: createStoreEnhancer,
    }).store
    // We want to create the store only once
    // TODO: add effects that handle changes to plugins and defaultPlugin (by dispatching an action)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Provider store={store}>{renderChildren()}</Provider>

  function renderChildren() {
    const children = (
      <InnerDocument
        {...rest}
        scope={MAIN_SCOPE}
        editable={rest.editable === undefined ? true : rest.editable}
      />
    )
    if (rest.omitDragDropContext) return children
    return <DndProvider backend={HTML5Backend}>{children}</DndProvider>
  }
}

/**
 * Hydrates the required contexts
 *
 * @param props - The props
 * @beta
 */
export function EditorProvider(props: EditorProviderProps) {
  const {
    createStoreEnhancer = (defaultEnhancer) => defaultEnhancer,
    omitDragDropContext,
    children,
  }: EditorProviderProps = props
  useEffect(() => {
    if (mountedProvider) {
      // eslint-disable-next-line no-console
      console.error('You may only render one <EditorProvider />.')
    }
    mountedProvider = true
    return () => {
      mountedProvider = false
    }
  }, [])
  const store = useMemo(() => {
    return createStore({
      scopes: {},
      createEnhancer: createStoreEnhancer,
    }).store
    // We want to create the store only once
    // TODO: add effects that handle changes to plugins and defaultPlugin (by dispatching an action)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const child = <Provider store={store}>{children}</Provider>
  if (omitDragDropContext) return child
  return <DndProvider backend={HTML5Backend}>{child}</DndProvider>
}
/** @public */
export interface EditorProviderProps {
  omitDragDropContext?: boolean
  createStoreEnhancer?: StoreEnhancerFactory
  children: ReactNode
}

/**
 * Renders an editor for an Edtr.io document
 *
 * @param props - The {@link EditorProps | props} for the document
 * @beta
 */
export function Document<K extends string = string>(
  props: Omit<EditorProps<K>, 'initialState'> & {
    scope: string
  } & (
      | { mirror: true; initialState?: unknown }
      | { mirror?: false; initialState: EditorProps<K>['initialState'] }
    )
) {
  const { scope = MAIN_SCOPE, ...rest } = props
  const storeContext = useContext(EditorContext)
  useEffect(() => {
    const isMainInstance = !rest.mirror
    if (isMainInstance) {
      if (mountedScopes[scope]) {
        // eslint-disable-next-line no-console
        console.error(
          `There are multiple main instances for scope ${scope}. Please set the mirror prop to true to all but one instance.`
        )
        mountedScopes[scope] = true
        return () => {
          mountedScopes[scope] = false
        }
      }
    }
  }, [rest.mirror, scope])

  if (!storeContext) {
    // eslint-disable-next-line no-console
    console.error(
      'Could not connect to Redux Store. Please make sure to wrap all instances of Document in an EditorProvider'
    )
    return null
  }

  return <InnerDocument scope={scope} {...rest} />
}

const hotKeysKeyMap = {
  UNDO: ['ctrl+z', 'command+z'],
  REDO: ['ctrl+y', 'command+y', 'ctrl+shift+z', 'command+shift+z'],
}

export function InnerDocument<K extends string = string>({
  children,
  plugins,
  scope,
  editable,
  onChange,
  onError,
  DocumentEditor = DefaultDocumentEditor,
  PluginToolbar = DefaultPluginToolbar,
  ...props
}: Omit<EditorProps<K>, 'initialState'> & {
  scope: string
} & (
    | { mirror: true; initialState?: unknown }
    | { mirror?: false; initialState: EditorProps<K>['initialState'] }
  )) {
  // Can't use `useScopedSelector` here since `InnerDocument` initializes the scoped state and `ScopeContext`
  const id = useSelector((state) => {
    const scopedState = state[scope]
    if (!scopedState) return null
    return getRoot()(scopedState)
  })
  const dispatch = useDispatch()
  // Can't use `useScopedStore` here since `InnerDocument` initializes the scoped state and `ScopeContext`
  const fullStore = useStore()
  useEffect(() => {
    if (typeof onChange !== 'function') return
    let pendingChanges = getPendingChanges()(
      getScope(fullStore.getState(), scope)
    )
    return fullStore.subscribe(() => {
      const currentPendingChanges = getPendingChanges()(
        getScope(fullStore.getState(), scope)
      )
      if (currentPendingChanges !== pendingChanges) {
        onChange({
          changed: hasPendingChanges()(getScope(fullStore.getState(), scope)),
          getDocument: () =>
            serializeRootDocument()(getScope(fullStore.getState(), scope)),
        })
        pendingChanges = currentPendingChanges
      }
    })
  }, [onChange, fullStore, scope])

  useEffect(() => {
    if (!props.mirror) {
      dispatch(initRoot({ initialState: props.initialState, plugins })(scope))
    }
    // TODO: initRoot changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialState, plugins, props.mirror])
  const scopeContextValue = useMemo(() => {
    return {
      scope,
      editable,
    }
  }, [scope, editable])
  const hotKeysHandlers = useMemo(() => {
    return {
      UNDO: () => dispatch(undo()(scope)),
      REDO: () => dispatch(redo()(scope)),
    }
  }, [dispatch, scope])

  if (!id) return null

  return (
    <GlobalHotKeys
      allowChanges
      keyMap={hotKeysKeyMap}
      handlers={hotKeysHandlers}
    >
      <div style={{ position: 'relative' }}>
        <ErrorContext.Provider value={onError}>
          <DocumentEditorContext.Provider value={DocumentEditor}>
            <PluginToolbarContext.Provider value={PluginToolbar}>
              <PreferenceContextProvider>
                <ScopeContext.Provider value={scopeContextValue}>
                  {renderChildren(id)}
                </ScopeContext.Provider>
              </PreferenceContextProvider>
            </PluginToolbarContext.Provider>
          </DocumentEditorContext.Provider>
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

/** @public */
export interface EditorProps<K extends string = string> {
  omitDragDropContext?: boolean
  children?: ReactNode | ((document: ReactNode) => ReactNode)
  plugins: Record<K, EditorPlugin>
  initialState: {
    plugin: string
    state?: unknown
  }
  onChange?: ChangeListener
  editable?: boolean
  createStoreEnhancer?: StoreEnhancerFactory
  onError?: ContextType<typeof ErrorContext>
  DocumentEditor?: ContextType<typeof DocumentEditorContext>
  PluginToolbar?: ContextType<typeof PluginToolbarContext>
}
