import { EditorToolbar } from '@editor/editor-ui/editor-toolbar/editor-toolbar'
import {
  LocalStorageNotice,
  debouncedStoreToLocalStorage,
  getStateFromLocalStorage,
} from '@editor/editor-ui/save/local-storage-notice'
import { getEditorVersion } from '@editor/package/editor-version'
import { StickyHeader } from '@editor/prototype-microadaptivity/sticky-header'
import { cn } from '@editor/utils/cn'
import { useState, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import { HotkeysProvider } from 'react-hotkeys-hook'
import { Provider } from 'react-redux'

import { DndWrapper } from './components/dnd-wrapper'
import { InnerDocument } from './inner-document'
import type { EditorProps } from './types'
import { createStore } from '../store'
import { useIsSerlo } from './hooks/use-is-serlo'

/**
 * Renders a single editor for an Serlo Editor document
 */
export function Editor(props: EditorProps) {
  const isSerlo = useIsSerlo()
  const [useStored, setUseStored] = useState(false)

  const storedState = getStateFromLocalStorage()
  const initialState =
    useStored && storedState ? storedState : props.initialState

  // New store for every editor instance
  const store = useMemo(() => createStore(), [])

  const isSerloEditorPreviewPage =
    (window?.location?.href &&
      window?.location?.href.includes('___editor_preview')) ||
    window?.location?.href.includes('___microadaptivity')

  return (
    <>
      <StickyHeader allowEdit />
      <Provider store={store}>
        <DndWrapper>
          <HotkeysProvider initiallyActiveScopes={['global']}>
            {/* only on serlo for now */}
            {isSerlo && !isSerloEditorPreviewPage ? (
              <>
                <EditorToolbar />
                <LocalStorageNotice
                  useStored={useStored}
                  setUseStored={setUseStored}
                />
              </>
            ) : null}
            {/* For non serlo environments, we need to render the toaster
          (already gets rendered in the web project) */}
            {!isSerlo ? <Toaster /> : null}
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
    </>
  )
}
