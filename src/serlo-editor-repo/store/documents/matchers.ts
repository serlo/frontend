import { AnyAction } from '@reduxjs/toolkit'

import { pureInsertDocument } from './slice'
import type { PureInsertDocumentAction } from './types'

export function isPureInsertDocumentAction(
  action: AnyAction
): action is PureInsertDocumentAction {
  return action.type === pureInsertDocument.type
}
