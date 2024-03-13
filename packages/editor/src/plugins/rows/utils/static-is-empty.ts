// eslint-disable-next-line import/no-cycle
import type { AnyEditorDocument } from '@editor/types/editor-plugins'
import { isRowsDocument } from '@editor/types/plugin-type-guards'

import { isEmptyTextDocument } from '../../text/utils/static-is-empty'

export function isEmptyRowsDocument(rows: AnyEditorDocument): boolean {
  if (!isRowsDocument(rows)) return false

  // only checks for initial empty state,
  // there could be other cases that are still displayed as empty
  if (rows.state.length === 0) return true

  return rows.state.every(isEmptyTextDocument)
}
