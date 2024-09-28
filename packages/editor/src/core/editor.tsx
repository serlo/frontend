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
  return (
    <Provider store={store}>
      <DndWrapper>
        <HotkeysProvider initiallyActiveScopes={['global']}>
          {props.showDefaultMenu ? (
            <div className="controls-portal pointer-events-none sticky top-0 z-[90] bg-white md:bg-transparent" />
          ) : null}

          <div className="serlo-editor-hacks mb-24">
            <InnerDocument {...props} />
          </div>
        </HotkeysProvider>
      </DndWrapper>
    </Provider>
  )
}
