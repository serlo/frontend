import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import { runInitRootSaga } from '.'
import type { ReversibleAction, State } from '..'
import { ROOT } from './constants'
import { handleRecursiveInserts } from '../documents/saga'
import { persistHistory } from '../history'

// Consider moving initRootSaga to documents slice and remove root slice completely

export function* rootSaga() {
  yield takeEvery(runInitRootSaga, initRootSaga)
}

function* initRootSaga(action: ReturnType<typeof runInitRootSaga>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [actions]: [ReversibleAction[], unknown] = yield call(
    handleRecursiveInserts,
    () => {},
    [{ id: ROOT, ...(action.payload.initialState || {}) }],
    false // shouldFocusInsertedDocument
  )

  yield all(actions.map((reversible) => put(reversible.action)))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const documents: State['documents'] = yield select(
    (state: State) => state.documents
  )
  yield put(persistHistory(documents))
}
