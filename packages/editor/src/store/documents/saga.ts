import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { channel, Channel } from 'redux-saga'
import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'

import {
  selectDocument,
  runChangeDocumentSaga,
  pureChangeDocument,
  pureInsertDocument,
  pureRemoveDocument,
  pureReplaceDocument,
  runReplaceDocumentSaga,
  insertAndFocusDocument,
} from '.'
import type { ReversibleAction } from '..'
import {
  StateUpdater,
  ToStoreHelpers,
} from '../../types/internal__plugin-state'
import {
  runCommitActionToHistorySaga,
  runCommitTemporaryActionToHistorySaga,
} from '../history'

export function* documentsSaga() {
  yield all([
    takeEvery(runChangeDocumentSaga, changeDocumentSaga),
    takeEvery(runReplaceDocumentSaga, replaceDocumentSaga),
  ])
}

function* changeDocumentSaga(action: ReturnType<typeof runChangeDocumentSaga>) {
  const { id, state: stateHandler, reverse } = action.payload
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const document: ReturnType<typeof selectDocument> = yield select(
    selectDocument,
    id
  )
  if (!document) return

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [actions, state]: [ReversibleAction[], unknown] = yield call(
    handleRecursiveInserts,
    (helpers: ToStoreHelpers) => {
      return stateHandler.initial(document.state, helpers)
    },
    [],
    true // shouldFocusInsertedDocument
  )

  const createChange = (state: unknown): ReversibleAction => {
    return {
      action: pureChangeDocument({ id, state }),
      reverse: pureChangeDocument({
        id,
        state:
          typeof reverse === 'function'
            ? reverse(document.state)
            : document.state,
      }),
    }
  }

  actions.push(createChange(state))

  if (!stateHandler.executor) {
    yield put(runCommitActionToHistorySaga(actions))
  } else {
    // async change, handle with stateHandler.resolver

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const chan: Channel<ChannelAction> = yield call(channel)
    yield put(
      runCommitTemporaryActionToHistorySaga({
        initial: actions,
        executor: (resolve, reject) => {
          if (!stateHandler.executor) {
            resolve(actions)
            return
          }

          stateHandler.executor(
            function stateResolve(updater) {
              chan.put({
                resolve: updater,
                callback: (resolveActions, state) => {
                  resolve([...resolveActions, createChange(state)])
                },
              })
            },
            function stateReject(updater) {
              chan.put({
                reject: updater,
                callback: (resolveActions, state) => {
                  reject([...resolveActions, createChange(state)])
                },
              })
            }
          )
        },
      })
    )

    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload: ChannelAction = yield take(chan)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const currentDocument: ReturnType<typeof selectDocument> = yield select(
        selectDocument,
        id
      )
      if (!currentDocument) continue

      const updater =
        payload.resolve || payload.next || payload.reject || ((s) => s)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const [resolveActions, pureResolveState]: [ReversibleAction[], unknown] =
        yield call(
          handleRecursiveInserts,
          (helpers: ToStoreHelpers) => {
            return updater(currentDocument.state, helpers)
          },
          [],
          true // shouldFocusInsertedDocument
        )
      payload.callback(resolveActions, pureResolveState)
      if (payload.resolve || payload.reject) {
        break
      }
    }
  }
}

function* replaceDocumentSaga(
  action: ReturnType<typeof runReplaceDocumentSaga>
) {
  const { id, pluginType } = action.payload
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const currentDocument: ReturnType<typeof selectDocument> = yield select(
    selectDocument,
    id
  )
  if (!currentDocument) return
  const plugin = editorPlugins.getByType(pluginType)
  if (!plugin) {
    // eslint-disable-next-line no-console
    console.warn(`Invalid plugin '${pluginType}'`)
    return
  }
  const pendingDocs: {
    id: string
    plugin: string
    state?: unknown
  }[] = []
  const helpers: ToStoreHelpers = {
    createDocument(doc) {
      pendingDocs.push(doc)
    },
  }
  let pluginState: unknown
  if (action.payload.state === undefined) {
    pluginState = plugin.state.createInitialState(helpers)
  } else {
    pluginState = plugin.state.toStoreState(action.payload.state, helpers)
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [actions]: [ReversibleAction[], unknown] = yield call(
    handleRecursiveInserts,
    () => {},
    pendingDocs,
    true // shouldFocusInsertedDocument
  )

  const reversibleAction: ReversibleAction = {
    action: pureReplaceDocument({
      id,
      plugin: pluginType,
      state: pluginState,
    }),
    reverse: pureReplaceDocument({
      id,
      plugin: currentDocument.plugin,
      state: currentDocument.state,
    }),
  }
  yield put(runCommitActionToHistorySaga([...actions, reversibleAction]))
}

interface ChannelAction {
  resolve?: StateUpdater<unknown>
  next?: StateUpdater<unknown>
  reject?: StateUpdater<unknown>
  callback: (actions: ReversibleAction[], pureState: unknown) => void
}

export function* handleRecursiveInserts(
  act: (helpers: ToStoreHelpers) => unknown,
  initialDocuments: { id: string; plugin: string; state?: unknown }[] = [],
  shouldFocusInsertedDocument: boolean = false
) {
  const actions: ReversibleAction[] = []
  const pendingDocs: {
    id: string
    plugin: string
    state?: unknown
  }[] = initialDocuments
  const helpers: ToStoreHelpers = {
    createDocument(doc) {
      pendingDocs.push(doc)
    },
  }
  const result = act(helpers)

  for (let doc; (doc = pendingDocs.pop()); ) {
    const plugin = editorPlugins.getByType(doc.plugin)
    if (!plugin) {
      // eslint-disable-next-line no-console
      console.warn(`Invalid plugin '${doc.plugin}'`)
      continue
    }

    const state: unknown =
      doc.state === undefined
        ? plugin.state.createInitialState(helpers)
        : plugin.state.toStoreState(doc.state, helpers)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentDocument: ReturnType<typeof selectDocument> = yield select(
      selectDocument,
      doc.id
    )
    if (currentDocument) {
      actions.push({
        action: pureReplaceDocument({
          id: doc.id,
          plugin: doc.plugin,
          state,
        }),
        reverse: pureReplaceDocument({
          id: doc.id,
          plugin: currentDocument.plugin,
          state: currentDocument.state,
        }),
      })
    } else {
      const action = shouldFocusInsertedDocument
        ? insertAndFocusDocument
        : pureInsertDocument
      actions.push({
        action: action({
          id: doc.id,
          plugin: doc.plugin,
          state,
        }),
        reverse: pureRemoveDocument(doc.id),
      })
    }
  }
  return [actions, result] as [ReversibleAction[], unknown]
}
