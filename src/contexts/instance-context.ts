import React from 'react'

import { InstanceData } from '@/data-types'

export const InstanceDataContext = React.createContext<InstanceData | null>(
  null
)

export const InstanceDataProvider = InstanceDataContext.Provider

export function useInstanceData() {
  const data = React.useContext(InstanceDataContext)
  if (!data) {
    throw 'Attempt to use instance data outside of provider!'
  }
  return data
}
