import { createActionCreator } from '../helpers'
import { ActionCreatorAction, ActionCreatorWithPayload } from '../storetypes'

export const insertChildBefore = createActionCreator<
  'InsertChildBefore',
  {
    parent: string
    sibling: string
    document?: {
      plugin: string
      state?: unknown
    }
  }
>('InsertChildBefore')
export type InsertChildBeforeAction = ActionCreatorAction<
  typeof insertChildBefore
>
export const insertChildAfter: ActionCreatorWithPayload<
  'InsertChildAfter',
  {
    parent: string
    sibling?: string
    document?: {
      plugin: string
      state?: unknown
    }
  }
> = createActionCreator('InsertChildAfter')
export type InsertChildAfterAction = ActionCreatorAction<
  typeof insertChildAfter
>

export const removeChild: ActionCreatorWithPayload<
  'RemoveChild',
  {
    parent: string
    child: string
  }
> = createActionCreator('RemoveChild')
export type RemoveChildAction = ActionCreatorAction<typeof removeChild>

export type PluginAction =
  | InsertChildBeforeAction
  | InsertChildAfterAction
  | RemoveChildAction
