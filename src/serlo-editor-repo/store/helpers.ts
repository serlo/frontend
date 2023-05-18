import * as R from 'ramda'
import { createSelectorCreator, defaultMemoize } from 'reselect'

import { Action, InternalAction } from './actions'
import {
  State,
  Selector,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from './types'

export function createActionCreator<T, P>(
  type: T
): ActionCreatorWithPayload<T, P> {
  const actionCreator = (payload: P) => {
    return {
      type,
      payload,
    }
  }
  actionCreator.type = type

  return actionCreator
}

export function createActionWithoutPayload<T>(
  type: T
): ActionCreatorWithoutPayload<T> {
  const actionCreator = () => {
    return { type }
  }
  actionCreator.type = type

  return actionCreator
}

export function createSubReducer<K extends keyof State>(
  key: K,
  initialState: State[K],
  actionsMap: CaseReducersMapObject<State[K]>
): SubReducer<State[K]> {
  return (action, state) => {
    const subState = (state && state[key]) || initialState
    if (!state) return subState

    const caseReducer = actionsMap[action.type]
    return typeof caseReducer === 'function'
      ? caseReducer(subState, action, state)
      : subState
  }
}

export function createSelector<T, P extends any[]>(
  f: (state: State, ...args: P) => T
): Selector<T, P> {
  return (...args: P) =>
    (state: State) =>
      f(state, ...args)
}

const createDeepEqualSelectorCreator = createSelectorCreator(
  defaultMemoize,
  R.equals
)

export function createDeepEqualSelector<T, P extends any[]>(
  f: (state: State, ...args: P) => T
): Selector<T, P> {
  return (...args: P) => {
    return createDeepEqualSelectorCreator(
      (state: State) => {
        return f(state, ...args)
      },
      (s) => s
    )
  }
}

const createJsonStringifySelectorCreator = createSelectorCreator(
  defaultMemoize,
  (a, b) => JSON.stringify(a) === JSON.stringify(b)
)

export function createJsonStringifySelector<T, P extends any[]>(
  f: (state: State, ...args: P) => T
): Selector<T, P> {
  return (...args: P) => {
    return createJsonStringifySelectorCreator(
      (state: State) => {
        return f(state, ...args)
      },
      (s) => s
    )
  }
}

// TODO: Remove this
export function workaroundCurrySelectorArguments<T, P extends any[]>(
  selector: Selector<T, P>
) {
  return (storeState: State, ...args: P) => selector(...args)(storeState)
}

export type SubReducer<S = unknown> = (
  action: InternalAction,
  state: State | undefined
) => S

export interface CaseReducersMapObject<S = unknown> {
  [actionType: string]: CaseReducer<S, any>
}

export type CaseReducer<S = unknown, A extends Action = Action> = (
  subState: S,
  action: A,
  state: State
) => S
