import { DocumentsAction, InternalDocumentsAction } from './documents/actions'
import { FocusAction } from './focus/actions'
import { createActionCreator } from './helpers'
import { HistoryAction, InternalHistoryAction } from './history/actions'
import { PluginAction } from './plugin/actions'
import { InternalRootAction, RootAction } from './root/actions'
import { ActionCreatorAction, ActionCreatorWithPayload, State } from './types'

export const setPartialState = createActionCreator<
  'SetPartialState',
  Partial<State>
>('SetPartialState')
export type SetPartialState = ActionCreatorAction<typeof setPartialState>

export const applyActions: ActionCreatorWithPayload<
  'ApplyActions',
  InternalAction[]
> = createActionCreator('ApplyActions')
export interface ApplyActionsAction {
  type: 'ApplyActions'
  payload: InternalAction[]
}

export type Action =
  | DocumentsAction
  | FocusAction
  | HistoryAction
  | PluginAction
  | RootAction
  | SetPartialState
export type InternalAction =
  | Action
  | ApplyActionsAction
  | InternalDocumentsAction
  | InternalHistoryAction
  | InternalRootAction

export interface ReversibleAction<
  A extends InternalAction = InternalAction,
  R extends InternalAction = InternalAction
> {
  action: A
  reverse: R
}
