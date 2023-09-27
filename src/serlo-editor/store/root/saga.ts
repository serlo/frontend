import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import { runInitRootSaga } from '.'
import { ROOT } from './constants'
import type { ReversibleAction } from '..'
import { selectDocuments } from '../documents'
// eslint-disable-next-line import/no-cycle
import { handleRecursiveInserts } from '../documents/saga'
import { persistHistory } from '../history'

// TODO: Move initRootSaga to documents slice and remove root slice completely

export function* rootSaga() {
  yield takeEvery(runInitRootSaga, initRootSaga)
}

function* initRootSaga(action: ReturnType<typeof runInitRootSaga>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [actions]: [ReversibleAction[], unknown] = yield call(
    handleRecursiveInserts,
    () => {},
    [{ id: ROOT, ...(action.payload.initialState || {}) }]
  )

  yield all(actions.map((reversible) => put(reversible.action)))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const documents: ReturnType<typeof selectDocuments> = yield select(
    selectDocuments
  )
  yield put(persistHistory(documents))
}
