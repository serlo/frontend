import * as R from 'ramda'
import { createSelectorCreator, lruMemoize } from 'reselect'

export const createDeepEqualSelector = createSelectorCreator(lruMemoize, {
  resultEqualityCheck: R.equals,
  maxSize: 50,
})

export const createJsonStringifySelector = createSelectorCreator(lruMemoize, {
  resultEqualityCheck: (a, b) => JSON.stringify(a) === JSON.stringify(b),
  maxSize: 50,
})
