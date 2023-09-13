import { useMemo, useEffect, ReactNode, useRef, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {
  HotkeysProvider,
  useHotkeys,
  useHotkeysContext,
} from 'react-hotkeys-hook'
import { Provider } from 'react-redux'

import { EditableContext, PreferenceContextProvider } from './contexts'
import { useBlurOnOutsideClick } from './hooks/use-blur-on-outside-click'
import { SubDocument } from './sub-document'
import {
  runInitRootSaga,
  undo,
  redo,
  selectPendingChanges,
  selectHasPendingChanges,
  store,
  useAppDispatch,
  DocumentState,
  selectSerializedDocument,
  focus,
} from '../store'
import { ROOT } from '../store/root/constants'

/**
 * Renders a single editor for an Serlo Editor document
 */
export function Editor(props: EditorProps) {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <HotkeysProvider
          initiallyActiveScopes={['global', 'root-up-down-enter']}
        >
          <InnerDocument {...props} />
        </HotkeysProvider>
      </DndProvider>
    </Provider>
  )
}

const pluginIds = [
  '2866db2d-6210-4579-a6cf-6e01b282bbbf',
  '7d59264e-b2e5-45a9-92a7-dc0a123949a6',
  '649d16bc-6189-43c1-a7c0-ba2effc6fca7',
  '44cf6a69-d925-420a-8b0e-998b152b7200',
  'c6b1f38f-40b6-4aa2-bb75-571945d6fa25',
  'bc070871-4e7c-41a9-91d8-8546a4a130a5',
  '3db8191b-9954-4ce2-b1d2-fb2cf2ee83af',
]

function InnerDocument({
  children,
  editable = true,
  onChange,
  ...props
}: EditorProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()

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
          getDocument: () => selectSerializedDocument(store.getState(), ROOT),
        })
        pendingChanges = currentPendingChanges
      }
    })
  }, [onChange])

  const hotkeysContext = useHotkeysContext()

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setTimeout(() => setCounter(counter + 1), 2000)
    if (counter > 0) {
      const toFocus = pluginIds[counter % pluginIds.length]
      dispatch(focus(toFocus))

      console.log('toggle scope')
      hotkeysContext.enableScope('test')
      hotkeysContext.disableScope('test')
    }
  }, [counter, dispatch])

  useEffect(() => {
    dispatch(runInitRootSaga({ initialState: props.initialState }))
    setIsInitialized(true)
  }, [props.initialState, dispatch])
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

  if (!isInitialized) return null

  return (
    <div className="relative" ref={wrapperRef}>
      <PreferenceContextProvider>
        <EditableContext.Provider value={editableContextValue}>
          {renderChildren(ROOT)}
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
