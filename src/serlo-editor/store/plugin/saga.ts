import { channel, Channel } from 'redux-saga'
import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'

import {
  insertPluginChildAfter,
  insertPluginChildBefore,
  removePluginChild,
} from './saga-actions'
import { EditorPlugin } from '../../types/internal__plugin'
import { runChangeDocumentSaga, selectDocument } from '../documents'
import { selectDocumentTree } from '../focus'
import {
  getPluginByType,
  PluginsContextPlugins,
} from '@/serlo-editor/core/contexts/plugins-context'
import { StateType } from '@/serlo-editor/plugin'

export function* pluginSaga() {
  yield all([
    takeEvery(insertPluginChildBefore, insertChildBeforeSaga),
    takeEvery(insertPluginChildAfter, insertChildAfterSaga),
    takeEvery(removePluginChild, removeChildSaga),
  ])
}

function* insertChildBeforeSaga({
  payload,
}: ReturnType<typeof insertPluginChildBefore>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parent: ReturnType<typeof selectDocumentTree> = yield select(
    selectDocumentTree,
    payload.plugins,
    payload.parent
  )
  if (!parent || !parent.children) return
  const index = parent.children.findIndex(({ id }) => id === payload.sibling)
  if (index === -1) return
  yield call(insertChild, {
    parent: payload.parent,
    previousSibling: index === 0 ? undefined : parent.children[index - 1].id,
    document: payload.document,
    plugins: payload.plugins,
  })
}

function* insertChildAfterSaga({
  payload,
}: ReturnType<typeof insertPluginChildAfter>) {
  yield call(insertChild, {
    parent: payload.parent,
    previousSibling: payload.sibling,
    document: payload.document,
    plugins: payload.plugins,
  })
}

function* removeChildSaga({ payload }: ReturnType<typeof removePluginChild>) {
  yield call(createPlugin, payload.parent, payload.plugins, (plugin, state) => {
    if (typeof plugin.removeChild !== 'function') return
    plugin.removeChild(state, payload.child)
  })
}

function* insertChild(payload: {
  parent: string
  previousSibling?: string
  document?: { plugin: string; state?: unknown }
  plugins: PluginsContextPlugins
}) {
  yield call(createPlugin, payload.parent, payload.plugins, (plugin, state) => {
    if (typeof plugin.insertChild !== 'function') return
    plugin.insertChild(state, {
      previousSibling: payload.previousSibling,
      document: payload.document,
    })
  })
}

function* createPlugin(
  id: string,
  plugins: PluginsContextPlugins,
  f: (plugin: EditorPlugin, state: unknown) => void
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const document: ReturnType<typeof selectDocument> = yield select(
    selectDocument,
    id
  )
  if (!document) return
  const contextPlugin = getPluginByType(plugins, document.plugin)
  if (!contextPlugin) {
    // eslint-disable-next-line no-console
    console.warn(`Invalid plugin '${document.plugin}'`)
    return
  }
  const plugin: EditorPlugin<
    StateType<any, any, any>,
    {}
  > = contextPlugin.plugin
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const chan: Channel<{ payload: unknown; type: string }> = yield call(channel)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const state = plugin.state.init(document.state, (initial, additional) => {
    const action = runChangeDocumentSaga({
      id,
      plugins,
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

  function* channelSaga(chan: Channel<{ payload: unknown; type: string }>) {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const action: ReturnType<typeof runChangeDocumentSaga> = yield take(chan)
      yield put(action)
    }
  }
}
