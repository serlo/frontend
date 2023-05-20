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
