import { createSelector } from '@reduxjs/toolkit'

import { PluginsContextPlugins } from '@/serlo-editor/core/contexts/plugins-context'
import {
  State,
  selectDocument,
  selectIsDocumentEmpty,
} from '@/serlo-editor/store'

interface RowsSelectorArgs {
  plugins: PluginsContextPlugins
  id: string
}

export const selectIsEmptyRows = createSelector(
  [(state: State) => state, (_state, args: RowsSelectorArgs) => args],
  (state, { plugins, id }) => {
    const rowsDocument = selectDocument(state, id)

    return (
      rowsDocument &&
      Array.isArray(rowsDocument.state) &&
      rowsDocument.state.every((entry) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const value = entry?.value
        return (
          typeof value === 'string' &&
          selectIsDocumentEmpty(state, { plugins, id: value })
        )
      })
    )
  }
)
