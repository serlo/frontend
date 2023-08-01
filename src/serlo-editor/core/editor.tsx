import { useMemo, useEffect, ReactNode, useRef } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { HotkeysProvider, useHotkeys } from 'react-hotkeys-hook'
import { Provider } from 'react-redux'

import { EditableContext, PreferenceContextProvider } from './contexts'
import {
  PluginsContext,
  PluginsContextPlugins,
  usePlugins,
} from './contexts/plugins-context'
import { useBlurOnOutsideClick } from './hooks/use-blur-on-outside-click'
import { SubDocument } from './sub-document'
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

/**
 * Renders a single editor for an Serlo Editor document
 */
export function Editor(props: EditorProps) {
  const { plugins, ...propsWithoutPlugins } = props
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <HotkeysProvider
          initiallyActiveScopes={['global', 'root-up-down-enter']}
        >
          <PluginsContext.Provider value={plugins}>
            <InnerDocument {...propsWithoutPlugins} />
          </PluginsContext.Provider>
        </HotkeysProvider>
      </DndProvider>
    </Provider>
  )
}

export function InnerDocument({
  children,
  editable = true,
  onChange,
  ...props
}: Omit<EditorProps, 'plugins'>) {
  const id = useAppSelector(selectRoot)
  const dispatch = useAppDispatch()
  const plugins = usePlugins()

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useBlurOnOutsideClick(wrapperRef)

  useEffect(() => {
    if (typeof onChange !== 'function') return
    let pendingChanges = selectPendingChanges(store.getState())
    return store.subscribe(() => {
      const currentPendingChanges = selectPendingChanges(store.getState())
      if (currentPendingChanges !== pendingChanges) {
        onChange({
          changed: selectHasPendingChanges(store.getState()),
          getDocument: () =>
            selectSerializedRootDocument(store.getState(), plugins),
        })
        pendingChanges = currentPendingChanges
      }
    })
  }, [onChange, plugins])

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

  useHotkeys(
    ['ctrl+z, meta+z'],
    (event, handler) => {
      // There is a bug that when ctrl+y keys are pressed, this ctrl+z event
      // handler gets fired resulting in a undo & redo => no state changes
      // whatsoever. The bug is described here
      // https://github.com/JohannesKlauss/react-hotkeys-hook/issues/1040
      if (handler.shift || event.key === 'y') {
        // if shift is clicked, don't do anything as it means that
        // ctrl|cmd+shift+z was pressed and it should result in a redo as
        // handled below
        return
      }

      event.preventDefault()

      void dispatch(undo())
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
      scopes: ['global'],
    }
  )

  useHotkeys(
    ['ctrl+y, meta+y'],
    (event) => {
      // There is a bug that when ctrl+z keys are pressed, this ctrl+y event
      // handler gets fired resulting in a undo & redo => no state changes
      // whatsoever. The bug is described here
      // https://github.com/JohannesKlauss/react-hotkeys-hook/issues/1040
      if (event.key === 'z') {
        return
      }

      event.preventDefault()
      void dispatch(redo())
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
      scopes: ['global'],
    }
  )

  useHotkeys(
    'ctrl+shift+z, meta+shift+z',
    (event) => {
      event.preventDefault()
      void dispatch(redo())
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
      scopes: ['global'],
    }
  )

  if (!id) return null

  return (
    <div className="relative" ref={wrapperRef}>
      <PreferenceContextProvider>
        <EditableContext.Provider value={editableContextValue}>
          {renderChildren(id)}
        </EditableContext.Provider>
      </PreferenceContextProvider>
    </div>
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
  onChange?: OnEditorChange
  editable?: boolean
}

export type OnEditorChange = (payload: {
  changed: boolean
  getDocument: () => DocumentState | null
}) => void
