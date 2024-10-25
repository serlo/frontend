import { EditorToolbar } from '@editor/editor-ui/editor-toolbar/editor-toolbar'
import {
  LocalStorageNotice,
  debouncedStoreToLocalStorage,
  getStateFromLocalStorage,
} from '@editor/editor-ui/save/local-storage-notice'
import { getEditorVersion } from '@editor/package/editor-version'
import { cn } from '@editor/utils/cn'
import { SerloOnlyFeaturesContext } from '@editor/utils/serlo-extra-context'
import { useContext, useState, useMemo } from 'react'
import { HotkeysProvider } from 'react-hotkeys-hook'
import { Provider } from 'react-redux'

import { DndWrapper } from './components/dnd-wrapper'
import { InnerDocument } from './inner-document'
import type { EditorProps } from './types'
import { createStore } from '../store'

/**
 * Renders a single editor for an Serlo Editor document
 */
export function Editor(props: EditorProps) {
  const { isSerlo } = useContext(SerloOnlyFeaturesContext)
  const [useStored, setUseStored] = useState(false)

  const storedState = getStateFromLocalStorage()
  const initialState =
    useStored && storedState ? storedState : props.initialState

  // New store for every editor instance
  const store = useMemo(() => createStore(), [])

  return (
    <Provider store={store}>
      <DndWrapper>
        <HotkeysProvider initiallyActiveScopes={['global']}>
          {/* only on serlo for now */}
          {isSerlo ? (
            <>
              <EditorToolbar />
              <LocalStorageNotice
                useStored={useStored}
                setUseStored={setUseStored}
              />
            </>
          ) : null}
          <div
            className={cn(
              'editor-core mb-24 text-lg leading-cozy',
              // some undocumented style hacks
              '[&_h1]:hyphens-auto',
              '[&_a[data-key]]:hyphens-auto',
              '[&_div[contenteditable]_.serlo-h3]:mt-0',
              '[&_select]:border-2',
              '[&_button>div>svg]:mx-1.5 [&_button>div>svg]:mb-1 [&_button>div>svg]:mt-2'
            )}
            data-editor-version={getEditorVersion()}
          >
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
