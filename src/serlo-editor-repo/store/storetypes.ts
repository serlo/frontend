import { Store as ReduxStore, Unsubscribe } from 'redux'

import { EditorPlugin } from '../internal__plugin'
import { Action, InternalAction, ReversibleAction } from './actions'

/**
 * Store state
 */
export type State = Record<string, ScopedState>
export type InternalState = Record<string, InternalScopedState>
export type Store = ReduxStore<State, Action>
export type InternalStore = ReduxStore<InternalState, InternalAction>

export interface ScopedStore {
  dispatch: (scopedAction: (scope: string) => Action) => void
  getState: () => ScopedState
  subscribe: (listener: () => void) => Unsubscribe
}

export interface ScopedState {
  plugins: Record<string, EditorPlugin>
  documents: Record<string, DocumentState>
  focus: string | null
  root: string | null
  history: {
    undoStack: unknown[]
    redoStack: unknown[]
    pendingChanges: number
  }
}

export interface InternalScopedState extends ScopedState {
  history: HistoryState
}

export interface DocumentState {
  plugin: string
  state: unknown
}

export interface HistoryState {
  initialState?: {
    documents: ScopedState['documents']
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
  (): (scope: string) => {
    type: T
    scope: string
  }
  type: T
}
export interface ActionCreatorWithPayload<T = string, P = any> {
  (payload: P): (scope: string) => {
    type: T
    payload: P
    scope: string
  }
  type: T
}
export type ActionCreatorAction<T extends ActionCreator> = ReturnType<
  ReturnType<T>
>

/**
 * Selectors
 */
export type Selector<T = any, P extends any[] = []> = (
  ...args: P
) => (scopedState: ScopedState) => T
export type InternalSelector<T = any, P extends any[] = []> = (
  ...args: P
) => (scopedState: InternalScopedState) => T

export type SelectorReturnType<T extends Selector<any, any>> = ReturnType<
  ReturnType<T>
>
export type InternalSelectorReturnType<T extends InternalSelector<any, any>> =
  ReturnType<ReturnType<T>>
/* eslint-enable @typescript-eslint/no-explicit-any */
