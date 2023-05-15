import { useMemo } from 'react'
import { createStore } from 'redux'

import { Provider, ScopeContext, SubDocument } from '../core'
import { invariant } from '../internal__dev-expression'
import { EditorPlugin, StoreDeserializeHelpers } from '../plugin'
import { Action, ScopedState, State } from '../store'

export function Renderer<K extends string = string>({
  plugins,
  state,
}: RendererProps<K>) {
  const store = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createStore<any, Action, unknown, unknown>(
      (state: State | undefined) => {
        if (!state) {
          return {
            main: {
              plugins,
              documents: getDocuments(),
              focus: null,
              root: 'root',
              history: {
                undoStack: [],
                redoStack: [],
                pendingChanges: 0,
              },
            },
          }
        }
        return state
      }
    )

    function getDocuments(): ScopedState['documents'] {
      const documents: ScopedState['documents'] = {}
      const pendingDocs: {
        id: string
        plugin: K
        state?: unknown
      }[] = [
        {
          id: 'root',
          ...(state || {}),
        },
      ]
      const helpers: StoreDeserializeHelpers = {
        createDocument(doc: typeof pendingDocs[0]) {
          pendingDocs.push(doc)
        },
      }

      for (let doc; (doc = pendingDocs.pop()); ) {
        const plugin = plugins[doc.plugin]
        if (!plugin) {
          invariant(false, `Invalid plugin '${doc.plugin}'`)
          continue
        }
        let state: unknown
        if (doc.state === undefined) {
          state = plugin.state.createInitialState(helpers)
        } else {
          state = plugin.state.deserialize(doc.state, helpers)
        }
        documents[doc.id] = {
          plugin: doc.plugin,
          state,
        }
      }
      return documents
    }
  }, [state, plugins])

  return (
    <Provider store={store}>
      <ScopeContext.Provider value={{ scope: 'main' }}>
        <SubDocument id="root" />
      </ScopeContext.Provider>
    </Provider>
  )
}

export interface RendererProps<K extends string = string> {
  plugins: Record<K, EditorPlugin>
  state: {
    plugin: K
    state?: unknown
  }
}
