import { StateExecutor } from '../../internal__plugin-state'
import { ReversibleAction } from '../actions'
import { createActionCreator, createActionWithoutPayload } from '../helpers'
import {
  ActionCreatorAction,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '../types'

export const persist = createActionWithoutPayload<'Persist'>('Persist')
export type PersistAction = ActionCreatorAction<typeof persist>

export const reset = createActionWithoutPayload<'Reset'>('Reset')
export type ResetAction = ActionCreatorAction<typeof reset>
export const pureReset = createActionWithoutPayload<'PureReset'>('PureReset')
export type PureResetAction = ActionCreatorAction<typeof pureReset>

export const commit: ActionCreatorWithPayload<'Commit', ReversibleAction[]> =
  createActionCreator('Commit')
export interface CommitAction {
  type: 'Commit'
  payload: ReversibleAction[]
}

export const pureCommit: ActionCreatorWithPayload<
  'PureCommit',
  {
    combine: boolean
    actions: ReversibleAction[]
  }
> = createActionCreator('PureCommit')
export interface PureCommitAction {
  type: 'PureCommit'
  payload: {
    combine: boolean
    actions: ReversibleAction[]
  }
}

export const temporaryCommit: ActionCreatorWithPayload<
  'TemporaryCommit',
  {
    initial: ReversibleAction[]
    executor?: StateExecutor<ReversibleAction[]>
  }
> = createActionCreator('TemporaryCommit')
export interface TemporaryCommitAction {
  type: 'TemporaryCommit'
  payload: {
    initial: ReversibleAction[]
    executor?: StateExecutor<ReversibleAction[]>
  }
}

export const undo: ActionCreatorWithoutPayload<'Undo'> =
  createActionWithoutPayload('Undo')
export type UndoAction = ActionCreatorAction<typeof undo>
export const pureUndo: ActionCreatorWithoutPayload<'PureUndo'> =
  createActionWithoutPayload('PureUndo')
export type PureUndoAction = ActionCreatorAction<typeof pureUndo>

export const redo: ActionCreatorWithoutPayload<'Redo'> =
  createActionWithoutPayload('Redo')
export type RedoAction = ActionCreatorAction<typeof redo>
export const pureRedo: ActionCreatorWithoutPayload<'PureRedo'> =
  createActionWithoutPayload('PureRedo')
export type PureRedoAction = ActionCreatorAction<typeof pureRedo>

export type HistoryAction =
  | PersistAction
  | ResetAction
  | UndoAction
  | RedoAction
export type InternalHistoryAction =
  | PureResetAction
  | CommitAction
  | PureCommitAction
  | PureUndoAction
  | PureRedoAction
  | TemporaryCommitAction
