import { channel, Channel } from 'redux-saga'
import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'

import {
  selectDocument,
  change,
  pureChange,
  pureInsert,
  pureRemove,
  pureReplace,
  replace,
} from '.'
import type { ReversibleAction } from '..'
import {
  StateUpdater,
  StoreDeserializeHelpers,
} from '../../internal__plugin-state'
import { commit, temporaryCommit } from '../history'
import { selectPlugin } from '../plugins'

export function* documentsSaga() {
  yield all([takeEvery(change, changeSaga), takeEvery(replace, replaceSaga)])
}

function* changeSaga(action: ReturnType<typeof change>) {
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
    (helpers: StoreDeserializeHelpers) => {
      return stateHandler.initial(document.state, helpers)
    }
  )

  const createChange = (state: unknown): ReversibleAction => {
    return {
      action: pureChange({ id, state }),
      reverse: pureChange({
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
    yield put(commit(actions))
  } else {
    // async change, handle with stateHandler.resolver

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const chan: Channel<ChannelAction> = yield call(channel)
    yield put(
      temporaryCommit({
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
          (helpers: StoreDeserializeHelpers) => {
            return updater(currentDocument.state, helpers)
          }
        )
      payload.callback(resolveActions, pureResolveState)
      if (payload.resolve || payload.reject) {
        break
      }
    }
  }
}

function* replaceSaga(action: ReturnType<typeof replace>) {
  const { id } = action.payload
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const currentDocument: ReturnType<typeof selectDocument> = yield select(
    selectDocument,
    id
  )
  if (!currentDocument) return
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const plugin: ReturnType<typeof selectPlugin> = yield select(
    selectPlugin,
    action.payload.plugin
  )
  if (!plugin) return
  const pendingDocs: {
    id: string
    plugin: string
    state?: unknown
  }[] = []
  const helpers: StoreDeserializeHelpers = {
    createDocument(doc) {
      pendingDocs.push(doc)
    },
  }
  let pluginState: unknown
  if (action.payload.state === undefined) {
    pluginState = plugin.state.createInitialState(helpers)
  } else {
    pluginState = plugin.state.deserialize(action.payload.state, helpers)
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [actions]: [ReversibleAction[], unknown] = yield call(
    handleRecursiveInserts,
    () => {},
    pendingDocs
  )

  const reversibleAction: ReversibleAction = {
    action: pureReplace({
      id,
      plugin: action.payload.plugin,
      state: pluginState,
    }),
    reverse: pureReplace({
      id,
      plugin: currentDocument.plugin,
      state: currentDocument.state,
    }),
  }
  yield put(commit([...actions, reversibleAction]))
}

interface ChannelAction {
  resolve?: StateUpdater<unknown>
  next?: StateUpdater<unknown>
  reject?: StateUpdater<unknown>
  callback: (actions: ReversibleAction[], pureState: unknown) => void
}

export function* handleRecursiveInserts(
  act: (helpers: StoreDeserializeHelpers) => unknown,
  initialDocuments: { id: string; plugin: string; state?: unknown }[] = []
) {
  const actions: ReversibleAction[] = []
  const pendingDocs: {
    id: string
    plugin: string
    state?: unknown
  }[] = initialDocuments
  const helpers: StoreDeserializeHelpers = {
    createDocument(doc) {
      pendingDocs.push(doc)
    },
  }
  const result = act(helpers)
  for (let doc; (doc = pendingDocs.pop()); ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const plugin: ReturnType<typeof selectPlugin> = yield select(
      selectPlugin,
      doc.plugin
    )
    if (!plugin) {
      // eslint-disable-next-line no-console
      console.warn(`Invalid plugin '${doc.plugin}'`)
      continue
    }
    let state: unknown
    if (doc.state === undefined) {
      state = plugin.state.createInitialState(helpers)
    } else {
      state = plugin.state.deserialize(doc.state, helpers)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentDocument: ReturnType<typeof selectDocument> = yield select(
      selectDocument,
      doc.id
    )
    if (currentDocument) {
      actions.push({
        action: pureReplace({
          id: doc.id,
          plugin: doc.plugin,
          state,
        }),
        reverse: pureReplace({
          id: doc.id,
          plugin: currentDocument.plugin,
          state: currentDocument.state,
        }),
      })
    } else {
      actions.push({
        action: pureInsert({
          id: doc.id,
          plugin: doc.plugin,
          state,
        }),
        reverse: pureRemove(doc.id),
      })
    }
  }
  return [actions, result] as [ReversibleAction[], unknown]
}
