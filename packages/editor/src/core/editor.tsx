import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HotkeysProvider } from 'react-hotkeys-hook'
import { Provider } from 'react-redux'

import { DndWrapper } from './components/dnd-wrapper'
import { InnerDocument } from './inner-document'
import type { EditorProps } from './types'
import { store } from '../store'

const queryClient = new QueryClient()

/**
 * Renders a single editor for an Serlo Editor document
 */
export function Editor(props: EditorProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <DndWrapper>
          <HotkeysProvider initiallyActiveScopes={['global']}>
            <InnerDocument {...props} />
          </HotkeysProvider>
        </DndWrapper>
      </Provider>
    </QueryClientProvider>
  )
}
