import * as R from 'ramda'

import { EditorPlugin } from '../../internal__plugin'
import { DocumentState } from '../types'

export function isDocumentEmpty(
  doc: DocumentState | null,
  plugin: EditorPlugin | null
) {
  if (!doc || !plugin) return false

  if (typeof plugin.isEmpty === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const state = plugin.state.init(doc.state, () => {})
    return plugin.isEmpty(state)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const initialState = plugin.state.createInitialState({
    createDocument: () => {},
  })
  return R.equals(doc.state, initialState)
}
