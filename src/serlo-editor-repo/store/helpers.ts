import { AnyAction, Slice } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { createSelectorCreator, defaultMemoize } from 'reselect'

export const createDeepEqualSelector = createSelectorCreator(defaultMemoize, {
  resultEqualityCheck: R.equals,
  maxSize: 50,
})

export const createJsonStringifySelector = createSelectorCreator(
  defaultMemoize,
  {
    resultEqualityCheck: (a, b) => JSON.stringify(a) === JSON.stringify(b),
    maxSize: 50,
  }
)

/**
 * It's not possible to disable Immer.js in Redux Toolkit configuration.
 * Immer.js freezes the actions. This needs to be disabled because:
 *   1. legacy edtr-io store relies on action mutations during async operations.
 *   2. Redux Saga doesn't allow frozen actions in `put` calls.
 */
// TODO: Create and link an issue to fix mutations and remove this helper (issue #1)
export function addRawReducers<S>(
  slice: Slice<S>,
  reducers: Record<string, (state: S, action: AnyAction) => S>
) {
  const originalReducer = slice.reducer
  const actionMap = Object.fromEntries(
    Object.entries(reducers).map(([name, fn]) => [`${slice.name}/${name}`, fn])
  )

  slice.reducer = (state: S | undefined, action: AnyAction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const fn = actionMap[action.type]
    if (fn) return fn(state!, action)
    return originalReducer(state, action)
  }

  const actionCreators = Object.fromEntries(
    Object.entries(reducers).map(([name]) => [
      name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      (payload: any) => ({ type: `${slice.name}/${name}`, payload }),
    ])
  )

  return actionCreators
}
