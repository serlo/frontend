import {
  LocalStorageNotice,
  debouncedStoreToLocalStorage,
  getStateFromLocalStorage,
} from '@editor/editor-ui/save/local-storage-notice'
import { IsSerloContext } from '@editor/utils/is-serlo-context'
import { useContext, useState } from 'react'
import { HotkeysProvider } from 'react-hotkeys-hook'
import { Provider } from 'react-redux'

import { DndWrapper } from './components/dnd-wrapper'
import { InnerDocument } from './inner-document'
import type { EditorProps } from './types'
import { store } from '../store'

/**
 * Renders a single editor for an Serlo Editor document
 */
export function Editor(props: EditorProps) {
  const isSerlo = useContext(IsSerloContext)
  const [useStored, setUseStored] = useState(false)

  const storedState = getStateFromLocalStorage()
  const initialState =
    useStored && storedState ? storedState : props.initialState

  return (
    <Provider store={store}>
      <DndWrapper>
        <HotkeysProvider initiallyActiveScopes={['global']}>
          {/* only on serlo for now */}
          {isSerlo ? (
            <>
              <div className="controls-portal pointer-events-none sticky top-0 z-[90] bg-white md:bg-transparent" />
              <LocalStorageNotice
                useStored={useStored}
                setUseStored={setUseStored}
              />
            </>
          ) : null}

          <div className="serlo-editor-hacks mb-24">
            <InnerDocument
              {...props}
              initialState={initialState}
              onChange={({ changed, getDocument }) => {
                props.onChange?.({ changed, getDocument })
                if (!changed || !isSerlo) return
                void debouncedStoreToLocalStorage(getDocument())
              }}
            />
          </div>
        </HotkeysProvider>
      </DndWrapper>
    </Provider>
  )
}
