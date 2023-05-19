import { AnyAction } from '@reduxjs/toolkit'

import { pureInsert, pureReplaceText } from './slice'
import type {
  PureInsertActionPayload,
  PureReplaceTextActionPayload,
} from './types'

export function isPureInsertAction(
  action: AnyAction
): action is PureInsertActionPayload {
  return action.type === pureInsert.type
}

export function isPureReplaceTextAction(
  action: AnyAction
): action is PureReplaceTextActionPayload {
  return action.type === pureReplaceText.type
}
