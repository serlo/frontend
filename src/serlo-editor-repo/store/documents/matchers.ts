import { AnyAction } from '@reduxjs/toolkit'

import { pureInsert } from './slice'
import type { PureInsertAction } from './types'

export function isPureInsertAction(
  action: AnyAction
): action is PureInsertAction {
  return action.type === pureInsert.type
}
