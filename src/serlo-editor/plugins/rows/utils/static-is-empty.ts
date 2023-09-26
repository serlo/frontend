// eslint-disable-next-line import/no-cycle
import { isEmptyTextPlugin } from '../../text/utils/static-is-empty'
import type { AnyEditorPlugin } from '@/serlo-editor/static-renderer/static-renderer'
import type { EditorRowsPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function isEmptyRowsPlugin(rows: AnyEditorPlugin) {
  if (rows.plugin !== 'rows') return false

  // only checks for initial empty state,
  // there could be other cases that are still displayed as empty
  const rowsState = rows.state as EditorRowsPlugin['state']
  if (rowsState.length === 0) return true

  return rowsState.every(isEmptyTextPlugin)
}
