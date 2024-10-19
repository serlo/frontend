import { createContext } from 'react'

interface LicenseData {
  id: number // id of the license
  title: string
  url: string // to the license
  isDefault?: boolean
  shortTitle?: string // show this if not default
  agreement: string
}

interface SerloExtraData {
  isSerlo?: boolean
  licenses?: LicenseData[]
}

/** used to enable features only in a serlo context and not e.g. on edusharing */
export const SerloExtraContext = createContext<SerloExtraData>({})
