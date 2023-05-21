import * as R from 'ramda'
import { channel, Channel } from 'redux-saga'
import {
  all,
  call,
  delay,
  put,
  race,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects'

import { commit, pureCommit, temporaryCommit, selectUndoStack } from '.'
import type { ReversibleAction } from '..'

export function* historySaga() {
  yield all([call(commitSaga), takeEvery(temporaryCommit, temporaryCommitSaga)])
}

function* temporaryCommitSaga(action: ReturnType<typeof temporaryCommit>) {
  const actions = action.payload.initial
  yield all(actions.map((action) => put(action.action)))
  yield put(
    pureCommit({
      combine: false,
      actions,
    })
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const chan: Channel<ChannelAction> = yield call(channel)

  function createPutToChannel(type: 'resolve' | 'reject' | 'next') {
    return function (finalActions: ReversibleAction[]) {
      chan.put({
        [type]: finalActions,
        tempActions: actions,
      })
    }
  }
  if (action.payload.executor) {
    action.payload.executor(
      createPutToChannel('resolve'),
      createPutToChannel('reject'),
      createPutToChannel('next')
    )
    yield call(resolveSaga, chan)
  }
}

interface ChannelAction {
  resolve?: ReversibleAction[]
  next?: ReversibleAction[]
  reject?: ReversibleAction[]
  tempActions: ReversibleAction[]
}

function* resolveSaga(chan: Channel<ChannelAction>) {
  while (true) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload: ChannelAction = yield take(chan)
    const finalActions = payload.resolve || payload.next || payload.reject || []
    const tempActions = payload.tempActions

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const stack: ReturnType<typeof selectUndoStack> = yield select(
      selectUndoStack
    )

    const replays = R.takeWhile((replay) => replay !== tempActions, stack)
    // revert all actions until the temporary actions
    yield all(
      replays.map((replay) => {
        return all(replay.map((a) => put(a.reverse)))
      })
    )
    // then revert the temporary action
    yield all(tempActions.map((a) => put(a.reverse)))

    // apply final actions and all reverted actions
    yield all(finalActions.map((a) => put(a.action)))

    yield all(
      replays.map((replay) => {
        return all(replay.map((a) => put(a.action)))
      })
    )

    // replace in history
    // TODO: Create and link an issue to fix this mutation (issue #1)
    replaceInArray(tempActions, finalActions)
    if (payload.resolve || payload.reject) {
      break
    }
  }
  chan.close()
}

function replaceInArray<T>(arr: T[], arr2: T[]) {
  arr.splice(0, arr.length, ...arr2)
}

function* commitSaga() {
  while (true) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const action: ReturnType<typeof commit> = yield take(commit.type)
    yield call(executeCommit, action.payload, false)

    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {
        action,
        timeout,
      }: { action: ReturnType<typeof commit>; timeout: boolean } = yield race({
        action: take(commit.type),
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
    pureCommit({
      combine,
      actions,
    })
  )
}
