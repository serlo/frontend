import { StateExecutor, StateUpdater } from '../../internal__plugin-state'
import { createActionCreator } from '../helpers'
import {
  ActionCreatorAction,
  ActionCreatorWithPayload,
  DocumentState,
} from '../types'

export const insert = createActionCreator<
  'Insert',
  {
    id: string
    plugin: string
    state?: unknown
  }
>('Insert')
export type InsertAction = ActionCreatorAction<typeof insert>
export const pureInsert = createActionCreator<
  'PureInsert',
  {
    id: string
  } & DocumentState
>('PureInsert')
export type PureInsertAction = ActionCreatorAction<typeof pureInsert>

export const remove = createActionCreator<'Remove', string>('Remove')
export type RemoveAction = ActionCreatorAction<typeof remove>
export const pureRemove = createActionCreator<'PureRemove', string>(
  'PureRemove'
)
export type PureRemoveAction = ActionCreatorAction<typeof pureRemove>

export const change: ActionCreatorWithPayload<
  'Change',
  {
    id: string
    state: {
      initial: StateUpdater<unknown>
      executor?: StateExecutor<StateUpdater<unknown>>
    }
    reverse?: (previousState: unknown) => unknown
  }
> = createActionCreator('Change')
export type ChangeAction = ActionCreatorAction<typeof change>
export const pureChange: ActionCreatorWithPayload<
  'PureChange',
  { id: string; state: unknown }
> = createActionCreator('PureChange')
export type PureChangeAction = ActionCreatorAction<typeof pureChange>

export const wrap: ActionCreatorWithPayload<
  'Wrap',
  {
    id: string
    document: (id: string) => DocumentState
  }
> = createActionCreator('Wrap')
export type WrapAction = ActionCreatorAction<typeof wrap>
export const pureWrap: ActionCreatorWithPayload<
  'PureWrap',
  {
    id: string
    newId: string
    document: DocumentState
  }
> = createActionCreator('PureWrap')
export type PureWrapAction = ActionCreatorAction<typeof pureWrap>

export const unwrap: ActionCreatorWithPayload<
  'Unwrap',
  {
    id: string
    oldId: string
  }
> = createActionCreator('Unwrap')
export type UnwrapAction = ActionCreatorAction<typeof unwrap>
export const pureUnwrap: ActionCreatorWithPayload<
  'PureUnwrap',
  {
    id: string
    oldId: string
  }
> = createActionCreator('PureUnwrap')
export type PureUnwrapAction = ActionCreatorAction<typeof pureUnwrap>

export const replace: ActionCreatorWithPayload<
  'Replace',
  {
    id: string
    plugin: string
    state?: unknown
  }
> = createActionCreator('Replace')
export type ReplaceAction = ActionCreatorAction<typeof replace>
export const pureReplace: ActionCreatorWithPayload<
  'PureReplace',
  {
    id: string
    plugin: string
    state?: unknown
  }
> = createActionCreator('PureReplace')
export type PureReplaceAction = ActionCreatorAction<typeof pureReplace>

export const replaceText: ActionCreatorWithPayload<
  'ReplaceText',
  {
    id: string
    document: (id: string) => DocumentState
  }
> = createActionCreator('ReplaceText')
export type ReplaceTextAction = ActionCreatorAction<typeof replaceText>
export const pureReplaceText: ActionCreatorWithPayload<
  'PureReplaceText',
  {
    id: string
    newId: string
    document: DocumentState
  }
> = createActionCreator('PureReplaceText')
export type PureReplaceTextAction = ActionCreatorAction<typeof pureReplaceText>

export type DocumentsAction =
  | InsertAction
  | RemoveAction
  | ChangeAction
  | WrapAction
  | UnwrapAction
  | ReplaceAction
  | ReplaceTextAction
export type InternalDocumentsAction =
  | PureInsertAction
  | PureRemoveAction
  | PureChangeAction
  | PureWrapAction
  | PureUnwrapAction
  | PureReplaceAction
  | PureReplaceTextAction
