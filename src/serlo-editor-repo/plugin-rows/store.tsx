import { createSelector, getDocument, isEmpty } from '../store'

/** @public */
export const isEmptyRows = createSelector((state, id: string) => {
  const rowsDocument = getDocument(id)(state)

  return (
    rowsDocument &&
    Array.isArray(rowsDocument.state) &&
    rowsDocument.state.every((entry) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const value = entry?.value
      return typeof value === 'string' && isEmpty(value)(state)
    })
  )
})
