import { createSelector } from '@reduxjs/toolkit'

import { State, selectDocument, selectIsDocumentEmpty } from '../../store'

export const selectIsEmptyRows = createSelector(
  [(state: State) => state, (_state, id: string) => id],
  (state, id: string) => {
    const rowsDocument = selectDocument(state, id)

    return (
      rowsDocument &&
      Array.isArray(rowsDocument.state) &&
      rowsDocument.state.every((entry) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const value = entry?.value
        return typeof value === 'string' && selectIsDocumentEmpty(state, value)
      })
    )
  }
)
