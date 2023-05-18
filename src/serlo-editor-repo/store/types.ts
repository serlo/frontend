import { Store as ReduxStore } from 'redux'

import { EditorPlugin } from '../internal__plugin'
import { Action, ReversibleAction } from './actions'

/**
 * Store state
 */
export type Store = ReduxStore<State, Action>

export interface State {
  plugins: Record<string, EditorPlugin>
  documents: Record<string, DocumentState>
  focus: string | null
  root: string | null
  history: HistoryState
}

export interface DocumentState {
  plugin: string
  state: unknown
}

export interface HistoryState {
  initialState?: {
    documents: State['documents']
  }
  undoStack: ReversibleAction[][]
  redoStack: ReversibleAction[][]
  pendingChanges: number
}

/**
 * Action creators
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ActionCreator<T = string, P = any> =
  | ActionCreatorWithoutPayload<T>
  | ActionCreatorWithPayload<T, P>
export interface ActionCreatorWithoutPayload<T = string> {
  (): {
    type: T
  }
  type: T
}
export interface ActionCreatorWithPayload<T = string, P = any> {
  (payload: P): {
    type: T
    payload: P
  }
  type: T
}
export type ActionCreatorAction<T extends ActionCreator> = ReturnType<T>

/**
 * Selectors
 */
export type Selector<T = any, P extends any[] = []> = (
  ...args: P
) => (State: State) => T

export type SelectorReturnType<T extends Selector<any, any>> = ReturnType<
  ReturnType<T>
>
