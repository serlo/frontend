import { createActionCreator, createActionWithoutPayload } from '../helpers'
import {
  ActionCreatorAction,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '../storetypes'

export const blur: ActionCreatorWithoutPayload<'Blur'> =
  createActionWithoutPayload('Blur')
export type BlurAction = ActionCreatorAction<typeof blur>

export const focus: ActionCreatorWithPayload<'Focus', string> =
  createActionCreator('Focus')
export type FocusDocumentAction = ActionCreatorAction<typeof focus>

export const focusNext: ActionCreatorWithoutPayload<'FocusNext'> =
  createActionWithoutPayload('FocusNext')
export type FocusNextDocumentAction = ActionCreatorAction<typeof focusNext>

export const focusPrevious: ActionCreatorWithoutPayload<'FocusPrevious'> =
  createActionWithoutPayload('FocusPrevious')
export type FocusPreviousDocumentAction = ActionCreatorAction<
  typeof focusPrevious
>

export type FocusAction =
  | BlurAction
  | FocusDocumentAction
  | FocusNextDocumentAction
  | FocusPreviousDocumentAction
