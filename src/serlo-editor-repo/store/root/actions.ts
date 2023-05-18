import { EditorPlugin } from '../../internal__plugin'
import { createActionCreator, createActionWithoutPayload } from '../helpers'
import {
  ActionCreatorAction,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '../types'

export const initRoot: ActionCreatorWithPayload<
  'InitRoot',
  {
    initialState: {
      plugin: string
      state?: unknown
    }
    plugins: Record<string, EditorPlugin>
  }
> = createActionCreator('InitRoot')
export type InitRootAction = ActionCreatorAction<typeof initRoot>
export const pureInitRoot: ActionCreatorWithoutPayload<'PureInitRoot'> =
  createActionWithoutPayload('PureInitRoot')
export type PureInitRootAction = ActionCreatorAction<typeof pureInitRoot>

export type RootAction = InitRootAction
export type InternalRootAction = PureInitRootAction
