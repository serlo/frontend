// eslint-disable-next-line import/no-cycle
import { isEmptyTextPlugin } from '../../text/utils/static-is-empty'
import type { AnyEditorPlugin } from '@/serlo-editor-integration/types/editor-plugins'
import { isRowsDocument } from '@/serlo-editor-integration/types/plugin-type-guards'

export function isEmptyRowsPlugin(rows: AnyEditorPlugin) {
  if (!isRowsDocument(rows)) return false

  // only checks for initial empty state,
  // there could be other cases that are still displayed as empty
  if (rows.state.length === 0) return true

  return rows.state.every(isEmptyTextPlugin)
}
