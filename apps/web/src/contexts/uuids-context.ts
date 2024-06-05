import { createContext, useContext } from 'react'

export interface UuidsContextData {
  entityId?: number
  revisionId?: number
}

export const UuidsContext = createContext<UuidsContextData | null>(null)

UuidsContext['Provider']['propTypes']

export const UuidsProvider = UuidsContext.Provider

const errorMessage = 'attempted to use uuid data outside of provider!'

export function useEntityData() {
  const data = useContext(UuidsContext)
  if (data === null) throw new Error(errorMessage)
  return data
}
