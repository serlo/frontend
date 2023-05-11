import * as R from 'ramda'

import { EditorPlugin } from '../../internal__plugin'
import { StoreSerializeHelpers } from '../../internal__plugin-state'
import {
  createDeepEqualSelector,
  createSelector,
  createSubReducer,
  SubReducer,
} from '../helpers'
import { getPlugin } from '../plugins/reducer'
import { DocumentState, ScopedState, Selector } from '../storetypes'
import {
  pureInsert,
  PureInsertAction,
  pureChange,
  PureChangeAction,
  pureRemove,
  PureRemoveAction,
  pureWrap,
  PureWrapAction,
  pureUnwrap,
  PureUnwrapAction,
  pureReplace,
  PureReplaceAction,
  pureReplaceText,
  PureReplaceTextAction,
} from './actions'

export const documentsReducer: SubReducer<Record<string, DocumentState>> =
  createSubReducer(
    'documents',
    {},
    {
      [pureInsert.type](documentState, action: PureInsertAction, state) {
        const { id, plugin: type, state: pluginState } = action.payload
        const plugin = getPlugin(type)(state)
        if (!plugin) return documentState

        return {
          ...documentState,
          [id]: {
            plugin: type,
            state: pluginState,
          },
        }
      },
      [pureRemove.type](documentState, action: PureRemoveAction) {
        return R.omit([action.payload], documentState)
      },
      [pureChange.type](documentState, action: PureChangeAction) {
        const { id, state: pluginState } = action.payload
        if (!documentState[id]) return documentState

        return {
          ...documentState,
          [id]: {
            ...documentState[id],
            state: pluginState,
          },
        }
      },
      [pureWrap.type](documentState, action: PureWrapAction, state) {
        const { id, newId, document } = action.payload
        if (!documentState[id]) return documentState
        const plugin = getPlugin(document.plugin)(state)
        if (!plugin) return documentState

        return {
          ...documentState,
          [newId]: documentState[id],
          [id]: document,
        }
      },
      [pureUnwrap.type](documentState, action: PureUnwrapAction) {
        const { id, oldId } = action.payload
        if (!documentState[oldId]) return documentState

        return R.dissoc(oldId, {
          ...documentState,
          [id]: documentState[oldId],
        })
      },
      [pureReplace.type](documentState, action: PureReplaceAction, state) {
        const { id, plugin: type, state: pluginState } = action.payload
        const plugin = getPlugin(type)(state)
        if (!plugin) return documentState

        return {
          ...documentState,
          [id]: {
            plugin: type,
            state: pluginState,
          },
        }
      },
      [pureReplaceText.type](documentState, action: PureReplaceTextAction) {
        const { id, newId, document } = action.payload
        if (!documentState[id]) return documentState

        return {
          ...documentState,
          [newId]: documentState[id],
          [id]: document,
        }
      },
    }
  )

export const getDocuments: Selector<Record<string, DocumentState>> =
  createSelector((state) => state.documents)

/**
 * Creates a selector that gets the document with the given id.
 *
 * @param id The id of the document that should be selected
 * @returns A selector `(ScopedState) => DocumentState`. The returned DocumentState object reference will only change when this document was modified by a redux action.
 * @example const document = useScopedSelector(getDocument(id)) // Gets the document with the given id and trigger component re-render when this document was modified by a redux action.
 */
export function getDocument(id: string | null) {
  return (scopedState: ScopedState) => {
    if (!id) return null
    return getDocuments()(scopedState)[id] || null
  }
}

/**
 * Serializes the document with the given `id`
 *
 * @param id - The id of the document
 * @returns The serialization
 */
export const serializeDocument: Selector<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { plugin: string; state: any } | null,
  [string | null]
> = createDeepEqualSelector((state: ScopedState, id) => {
  const doc = getDocument(id)(state)
  if (!doc) return null
  const plugin = getPlugin(doc.plugin)(state)
  if (!plugin) return null
  const serializeHelpers: StoreSerializeHelpers = {
    getDocument: (id: string) => serializeDocument(id)(state),
  }
  return {
    plugin: doc.plugin,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    state: plugin.state.serialize(doc.state, serializeHelpers),
  }
})

export const isEmpty = createSelector((state, id: string) => {
  const doc = getDocument(id)(state)
  if (!doc) return false
  const plugin = getPlugin(doc.plugin)(state)
  return isDocumentEmpty(doc, plugin)
})

/**
 * Checks whether the given document is empty
 * @returns `True` if the specified document is empty
 */
export function isDocumentEmpty(
  doc: DocumentState | null,
  plugin: EditorPlugin | null
) {
  if (!doc || !plugin) return false

  if (typeof plugin.isEmpty === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const state = plugin.state.init(doc.state, () => {})
    return plugin.isEmpty(state)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const initialState = plugin.state.createInitialState({
    createDocument: () => {},
  })
  return R.equals(doc.state, initialState)
}
