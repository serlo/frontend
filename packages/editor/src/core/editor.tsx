import { LanguageData } from '@editor/types/language-data'
import { useEffect, ReactNode, useRef, useState } from 'react'
import { HotkeysProvider, useHotkeys } from 'react-hotkeys-hook'
import { Provider } from 'react-redux'

import { DndWrapper } from './components/dnd-wrapper'
import { PreferenceContextProvider } from './contexts'
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
  selectStaticDocument,
} from '../store'
import { ROOT } from '../store/root/constants'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

/**
 * Renders a single editor for an Serlo Editor document
 */
export function Editor(props: EditorProps) {
  return (
    <Provider store={store}>
      <DndWrapper>
        <HotkeysProvider
          initiallyActiveScopes={['global', 'root-up-down-enter']}
        >
          <InnerDocument {...props} />
        </HotkeysProvider>
      </DndWrapper>
    </Provider>
  )
}

function InnerDocument({ children, onChange, ...props }: EditorProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()
  const instanceData = useInstanceData()
  const loggedInData = useLoggedInData()

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
          getDocument: () => selectStaticDocument(store.getState(), ROOT),
        })
        pendingChanges = currentPendingChanges
      }
    })
  }, [onChange])

  useEffect(() => {
    dispatch(runInitRootSaga({ initialState: props.initialState }))
    setIsInitialized(true)
  }, [props.initialState, dispatch])

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
        {renderChildren(ROOT)}
      </PreferenceContextProvider>
    </div>
  )

  function renderChildren(id: string) {
    const document = <SubDocument id={id} />

    if (typeof children === 'function' && loggedInData) {
      return children(document, { instanceData, loggedInData })
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
  children?:
    | ReactNode
    | ((document: ReactNode, languageData: LanguageData) => ReactNode)
  initialState: {
    plugin: string
    state?: unknown
  }
  onChange?: OnEditorChange
}

export type OnEditorChange = (payload: {
  changed: boolean
  getDocument: () => DocumentState | null
}) => void
