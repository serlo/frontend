import { AnyAction } from '@reduxjs/toolkit'

import { insertAndFocusDocument } from './slice'
import type { InsertAndFocusDocumentAction } from './types'

export function isInsertAndFocusDocumentAction(
  action: AnyAction
): action is InsertAndFocusDocumentAction {
  return action.type === insertAndFocusDocument.type
}
