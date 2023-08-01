import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import { runInitRootSaga, pureInitRoot } from '.'
import type { ReversibleAction } from '..'
import { selectDocuments } from '../documents'
import { handleRecursiveInserts } from '../documents/saga'
import { persistHistory } from '../history'

export function* rootSaga() {
  yield takeEvery(runInitRootSaga, initRootSaga)
}

function* initRootSaga(action: ReturnType<typeof runInitRootSaga>) {
  yield put(pureInitRoot())
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [actions]: [ReversibleAction[], unknown] = yield call(
    handleRecursiveInserts,
    () => {},
    action.payload.plugins,
    [{ id: 'root', ...(action.payload.initialState || {}) }]
  )

  yield all(actions.map((reversible) => put(reversible.action)))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const documents: ReturnType<typeof selectDocuments> = yield select(
    selectDocuments
  )

  yield put(persistHistory(documents))
}
