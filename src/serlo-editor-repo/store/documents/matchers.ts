import { AnyAction } from '@reduxjs/toolkit'

import { pureInsert, pureReplaceText } from './slice'
import type { PureInsertAction, PureReplaceTextAction } from './types'

export function isPureInsertAction(
  action: AnyAction
): action is PureInsertAction {
  return action.type === pureInsert.type
}

export function isPureReplaceTextAction(
  action: AnyAction
): action is PureReplaceTextAction {
  return action.type === pureReplaceText.type
}
