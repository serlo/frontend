import * as R from 'ramda'

import {
  Action,
  applyActions,
  InternalAction,
  setPartialState,
} from './actions'
import { documentsReducer } from './documents/reducer'
import { focusReducer } from './focus/reducer'
import { createActionWithoutPayload } from './helpers'
import { historyReducer } from './history/reducer'
import { pluginsReducer } from './plugins/reducer'
import { rootReducer } from './root/reducer'
import {
  State,
  ScopedState,
  InternalScopedState,
  InternalState,
} from './storetypes'

/**
 * The Edtr.io root reducer
 *
 * @param state - The current {@link State | state} or `undefined`
 * @param action - The {@link Action | action} to dispatch
 * @returns The new {@link State | state}
 */
export function reducer(
  state: InternalState = {},
  action: InternalAction
): InternalState {
  if (action.scope === undefined) {
    return R.map((state) => scopedReducer(state, action), state)
  }

  if (action.type === applyActions.type) {
    return R.reduce(reducer, state, action.payload)
  }

  if (action.type === setPartialState.type) {
    return {
      ...state,
      [action.scope]: {
        ...state[action.scope],
        ...action.payload,
      },
    } as InternalState
  }

  return {
    ...state,
    [action.scope]: scopedReducer(state[action.scope], action),
  }
}

function scopedReducer(
  scopeState: InternalScopedState | undefined,
  action: InternalAction
) {
  return {
    documents: documentsReducer(action, scopeState),
    focus: focusReducer(action, scopeState),
    history: historyReducer(action, scopeState),
    plugins: pluginsReducer(action, scopeState),
    root: rootReducer(action, scopeState),
  }
}

/**
 * Gets the {@link ScopedState | state} of a scope
 *
 * @param state - The current {@link State | state}
 * @param scope - The scope
 * @returns The {@link ScopedState | state} of the specified scope
 */
export function getScope(state: State, scope: string): ScopedState {
  const scopedState = state[scope]
  if (!scopedState) {
    const fakeInitAction = createActionWithoutPayload('InitSubScope')()(scope)
    return reducer(state as InternalState, fakeInitAction as unknown as Action)[
      scope
    ]
  }
  return scopedState
}
