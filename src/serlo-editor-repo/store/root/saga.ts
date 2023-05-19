import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import { initRoot, pureInitRoot } from '.'
import type { ReversibleAction } from '..'
import { selectDocuments } from '../documents'
import { handleRecursiveInserts } from '../documents/saga'
import { persist } from '../history'
import { setPlugins } from '../plugins/slice'

export function* rootSaga() {
  yield takeEvery(initRoot, initRootSaga)
}

function* initRootSaga(action: ReturnType<typeof initRoot>) {
  yield put(setPlugins(action.payload.plugins))
  yield put(pureInitRoot())
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [actions]: [ReversibleAction[], unknown] = yield call(
    handleRecursiveInserts,
    () => {},
    [{ id: 'root', ...(action.payload.initialState || {}) }]
  )

  yield all(actions.map((reversible) => put(reversible.action)))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const documents: ReturnType<typeof selectDocuments> = yield select(
    selectDocuments
  )
  yield put(persist(documents))
}
