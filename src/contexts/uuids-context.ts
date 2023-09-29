import { createContext, useContext } from 'react'

export const UuidsContext = createContext<{
  entityId?: number
  revisionId?: number
} | null>(null)

export const UuidsProvider = UuidsContext.Provider

const errorMessage = 'attempted to use uuid data outside of provider!'

export function useEntityId() {
  const data = useContext(UuidsContext)
  if (data === null) {
    throw new Error(errorMessage)
  }
  return data.entityId
}

export function useRevisionId() {
  const data = useContext(UuidsContext)
  if (data === null) {
    throw new Error(errorMessage)
  }
  return data.revisionId
}
