import * as R from 'ramda'
import { channel, Channel } from 'redux-saga'
import {
  all,
  call,
  delay,
  put,
  race,
  take,
  takeEvery,
} from 'redux-saga/effects'

import {
  runCommitActionToHistorySaga,
  pureCommitActionToHistory,
  runCommitTemporaryActionToHistorySaga,
} from '.'
import type { ReversibleAction } from '..'

export function* historySaga() {
  yield all([
    call(commitSaga),
    takeEvery(runCommitTemporaryActionToHistorySaga, temporaryCommitSaga),
  ])
}

function* temporaryCommitSaga(
  action: ReturnType<typeof runCommitTemporaryActionToHistorySaga>
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const chan: Channel<ChannelAction> = yield call(channel)

  function createPutToChannel(type: 'resolve' | 'reject') {
    return function (finalActions: ReversibleAction[]) {
      chan.put({
        [type]: finalActions,
        tempActions: action.payload.initial,
      })
    }
  }

  if (action.payload.executor) {
    action.payload.executor(
      createPutToChannel('resolve'),
      createPutToChannel('reject')
    )
    yield call(resolveSaga, chan)
  }
}

interface ChannelAction {
  resolve?: ReversibleAction[]
  reject?: ReversibleAction[]
  tempActions: ReversibleAction[]
}

function* resolveSaga(chan: Channel<ChannelAction>) {
  while (true) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload: ChannelAction = yield take(chan)
    const actions = payload.resolve || payload.reject || []

    yield put(pureCommitActionToHistory({ combine: false, actions }))

    // Saga will silently fail if a frozen action is passed to `put`.
    // Therefore, we first clone the action.
    // More info: https://github.com/redux-saga/redux-saga/issues/1254
    yield all(actions.map((a) => put(R.clone(a.action))))

    if (payload.resolve || payload.reject) {
      break
    }
  }
  chan.close()
}

function* commitSaga() {
  while (true) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const action: ReturnType<typeof runCommitActionToHistorySaga> = yield take(
      runCommitActionToHistorySaga.type
    )
    yield call(executeCommit, action.payload, false)

    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {
        action,
        timeout,
      }: {
        action: ReturnType<typeof runCommitActionToHistorySaga>
        timeout: boolean
      } = yield race({
        action: take(runCommitActionToHistorySaga.type),
        timeout: delay(1000),
      })

      if (timeout) {
        break
      }

      if (action) {
        yield call(executeCommit, action.payload, true)
      }
    }
  }
}

function* executeCommit(actions: ReversibleAction[], combine: boolean) {
  yield all(actions.map((action) => put(action.action)))
  yield put(
    pureCommitActionToHistory({
      combine,
      actions,
    })
  )
}
