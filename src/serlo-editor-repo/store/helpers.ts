import * as R from 'ramda'
import { createSelectorCreator, defaultMemoize } from 'reselect'

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  R.equals
)

export const createJsonStringifySelector = createSelectorCreator(
  defaultMemoize,
  (a, b) => JSON.stringify(a) === JSON.stringify(b)
)
