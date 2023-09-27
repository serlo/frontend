import { all, call } from 'redux-saga/effects'

// eslint-disable-next-line import/no-cycle
import { documentsSaga } from './documents/saga'
import { historySaga } from './history/saga'
import { pluginSaga } from './plugin/saga'
import { rootSaga } from './root/saga'

export function* saga() {
  yield all([
    call(documentsSaga),
    call(historySaga),
    call(pluginSaga),
    call(rootSaga),
  ])
}
