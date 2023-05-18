import * as R from 'ramda'
import { channel, Channel } from 'redux-saga'
// eslint-disable-next-line import/no-internal-modules
import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'

import { EditorPlugin } from '../../internal__plugin'
import { InternalAction } from '../actions'
import { change, ChangeAction, getDocument } from '../documents'
import { getFocusTree } from '../focus'
import { workaroundCurrySelectorArguments } from '../helpers'
import { getPlugin } from '../plugins'
import { SelectorReturnType } from '../types'
import {
  insertChildAfter,
  InsertChildAfterAction,
  insertChildBefore,
  InsertChildBeforeAction,
  removeChild,
  RemoveChildAction,
} from './actions'

export function* pluginSaga() {
  yield all([
    takeEvery(insertChildBefore.type, insertChildBeforeSaga),
    takeEvery(insertChildAfter.type, insertChildAfterSaga),
    takeEvery(removeChild.type, removeChildSaga),
  ])
}

function* insertChildBeforeSaga({ payload }: InsertChildBeforeAction) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parent: SelectorReturnType<typeof getFocusTree> = yield select(
    workaroundCurrySelectorArguments(getFocusTree),
    payload.parent
  )
  if (!parent || !parent.children) return
  const index = R.findIndex(
    (child) => child.id === payload.sibling,
    parent.children
  )
  if (index === -1) return
  yield call(insertChild, {
    parent: payload.parent,
    previousSibling: index === 0 ? undefined : parent.children[index - 1].id,
    document: payload.document,
  })
}

function* insertChildAfterSaga({ payload }: InsertChildAfterAction) {
  yield call(insertChild, {
    parent: payload.parent,
    previousSibling: payload.sibling,
    document: payload.document,
  })
}

function* removeChildSaga({ payload }: RemoveChildAction) {
  yield call(createPlugin, payload.parent, (plugin, state) => {
    if (typeof plugin.removeChild !== 'function') return
    plugin.removeChild(state, payload.child)
  })
}

function* insertChild(payload: {
  parent: string
  previousSibling?: string
  document?: { plugin: string; state?: unknown }
}) {
  yield call(createPlugin, payload.parent, (plugin, state) => {
    if (typeof plugin.insertChild !== 'function') return
    plugin.insertChild(state, {
      previousSibling: payload.previousSibling,
      document: payload.document,
    })
  })
}

function* createPlugin(
  id: string,
  f: (plugin: EditorPlugin, state: unknown) => void
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const document: SelectorReturnType<typeof getDocument> = yield select(
    workaroundCurrySelectorArguments(getDocument),
    id
  )
  if (!document) return
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const plugin: SelectorReturnType<typeof getPlugin> = yield select(
    workaroundCurrySelectorArguments(getPlugin),
    document.plugin
  )
  if (!plugin) return
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const chan: Channel<InternalAction> = yield call(channel)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const state = plugin.state.init(document.state, (initial, additional) => {
    const action = change({
      id,
      state: {
        initial,
        executor: additional?.executor,
      },
      reverse: additional?.reverse,
    })
    chan.put(action)
  })
  f(plugin, state)
  chan.close()
  yield call(channelSaga, chan)

  function* channelSaga(chan: Channel<InternalAction>) {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const action: ChangeAction = yield take(chan)
      yield put(action)
    }
  }
}
