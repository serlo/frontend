import { createContext } from 'react'

interface SerloExtraData {
  isSerlo: boolean
}

/** used to enable features only in a serlo context and not e.g. on edusharing */
export const SerloExtraContext = createContext<SerloExtraData>({
  isSerlo: false,
})
