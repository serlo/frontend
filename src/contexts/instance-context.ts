import { createContext, useContext } from 'react'

import { InstanceData } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

export const InstanceDataContext = createContext<InstanceData | null>(null)

export const InstanceDataProvider = InstanceDataContext.Provider

export function useInstanceData() {
  const data = useContext(InstanceDataContext)
  if (!data) {
    return getInstanceDataByLang(Instance.De)
    throw new Error('Attempt to use instance data outside of provider!')
  }
  return data
}
