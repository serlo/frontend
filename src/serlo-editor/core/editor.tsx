import * as t from 'io-ts'

// TODO: Remove
import { isEqual, get as getPath } from 'lodash'
import {
  useMemo,
  useEffect,
  ReactNode,
  useRef,
  useState,
  useCallback,
} from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { HotkeysProvider, useHotkeys } from 'react-hotkeys-hook'
import { Provider } from 'react-redux'

import {
  EditableContext,
  PreferenceContextProvider,
  FocusContext,
} from './contexts'
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
  selectDocument,
} from '../store'
import { ROOT } from '../store/root/constants'
import { FocusPath } from '@/serlo-editor/types'

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

function InnerDocument({
  children,
  editable = true,
  onChange,
  ...props
}: EditorProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const [focusPath, setFocusPath] = useState<FocusPath>([])

  // Function which is called for any change of focus via click or when Tab was
  // entered. It receives the information from the data-plugin-path which
  // property is focused now and saves it in the focus context.
  const onFocusinHandler = useCallback((event: FocusEvent) => {
    if (event.target instanceof HTMLElement) {
      let currentElement: HTMLElement | null = event.target

      const newFocusPath: typeof focusPath = []
      let pluginPath: Array<number | string> = []

      while (currentElement) {
        const pluginProperty = currentElement.getAttribute('data-plugin-path')

        if (pluginProperty && pluginPath.length === 0) {
          // TODO: security
          pluginPath = JSON.parse(pluginProperty) as Array<number | string>
        }

        const pluginId = currentElement.getAttribute('data-plugin-id')
        const pluginType = currentElement.getAttribute('data-plugin-type')

        if (pluginId !== null && pluginType !== null) {
          newFocusPath.unshift({
            id: pluginId,
            type: pluginType,
            path: pluginPath,
          })

          pluginPath = []
        }

        currentElement = currentElement.parentElement
      }

      const lastElement = newFocusPath.at(-1)

      if (lastElement !== undefined && lastElement.path.length > 0) {
        const document = selectSerializedDocument(
          store.getState(),
          lastElement.id
        )

        if (document !== null) {
          const targetedPlugin = getPath(
            document.state,
            lastElement.path
          ) as unknown

          if (t.type({ id: t.string, plugin: t.string }).is(targetedPlugin)) {
            newFocusPath.push({
              id: targetedPlugin.id,
              type: targetedPlugin.plugin,
              path: [],
            })
          }
        }
      }

      setFocusPath((oldFocusPath) => {
        if (isEqual(oldFocusPath, newFocusPath)) return oldFocusPath
        return newFocusPath
      })
    }
  }, [])

  // Attach focus management event listeners
  useEffect(() => {
    const wrapperElement = wrapperRef.current

    if (wrapperElement) {
      wrapperElement.addEventListener('focusin', onFocusinHandler)
    }

    return () => {
      wrapperElement?.removeEventListener('focusin', onFocusinHandler)
    }
  }, [onFocusinHandler, isInitialized])

  // Handle clicks outside of the editor (reset focus state)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedElement = event.target as Element
      if (
        document.body.contains(clickedElement) && // clicked element is present in the document
        wrapperRef.current && // provided wrapper is defined
        !wrapperRef.current.contains(clickedElement) && // clicked element is not a child of the provided wrapper
        !clickedElement.closest('.ReactModalPortal') // clicked element is not a part of a modal
      ) {
        dispatch(focus(null)) // reset the focus state in Redux store (blur the editor)
        setFocusPath([]) // reset the focus state in useState hook
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dispatch])

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
          <FocusContext.Provider value={focusPath}>
            {renderChildren(ROOT)}
          </FocusContext.Provider>
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
