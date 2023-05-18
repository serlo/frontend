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
  // eslint-disable-next-line import/no-internal-modules
} from 'redux-saga/effects'

import { applyActions, ReversibleAction } from '../actions'
import { workaroundCurrySelectorArguments } from '../helpers'
import { SelectorReturnType } from '../types'
import {
  undo,
  redo,
  pureUndo,
  pureRedo,
  commit,
  pureCommit,
  reset,
  pureReset,
  temporaryCommit,
  TemporaryCommitAction,
  CommitAction,
} from './actions'
import { getPendingChanges, getRedoStack, getUndoStack } from './reducer'

export function* historySaga() {
  yield all([
    call(commitSaga),
    takeEvery(temporaryCommit.type, temporaryCommitSaga),
    takeEvery(undo.type, undoSaga),
    takeEvery(redo.type, redoSaga),
    takeEvery(reset.type, resetSaga),
  ])
}

function* temporaryCommitSaga(action: TemporaryCommitAction) {
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
    const stack: SelectorReturnType<typeof getUndoStack> = yield select(
      workaroundCurrySelectorArguments(getUndoStack)
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
    const action: CommitAction = yield take(commit.type)
    yield call(executeCommit, action.payload, false)

    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { action, timeout }: { action: CommitAction; timeout: boolean } =
        yield race({
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

function* undoSaga() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const undoStack: SelectorReturnType<typeof getUndoStack> = yield select(
    workaroundCurrySelectorArguments(getUndoStack)
  )
  const toUndo = R.head(undoStack)
  if (!toUndo) return

  const actions = R.reverse(toUndo).map(
    (reversibleAction) => reversibleAction.reverse
  )
  yield put(applyActions(actions))
  yield put(pureUndo())
}

function* redoSaga() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const redoStack: SelectorReturnType<typeof getRedoStack> = yield select(
    workaroundCurrySelectorArguments(getRedoStack)
  )
  const replay = R.head(redoStack)
  if (!replay) return
  const actions = replay.map((reversibleAction) => reversibleAction.action)
  yield put(applyActions(actions))
  yield put(pureRedo())
}

function* resetSaga() {
  while (true) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pendingChanges: SelectorReturnType<typeof getPendingChanges> =
      yield select(workaroundCurrySelectorArguments(getPendingChanges))
    if (pendingChanges === 0) break
    else if (pendingChanges < 0) {
      yield call(redoSaga)
    } else {
      yield call(undoSaga)
    }
  }
  yield put(pureReset())
}
