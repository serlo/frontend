import { createContext, useContext } from 'react'

export interface SerloEntityContextData {
  entityId?: number
  revisionId?: number
}

export const SerloEntityContext = createContext<SerloEntityContextData | null>(
  null
)

SerloEntityContext['Provider']['propTypes']

export const SerloEntityProvider = SerloEntityContext.Provider

const errorMessage = 'attempted to use uuid data outside of provider!'

export function useEntityData() {
  const data = useContext(SerloEntityContext)
  if (data === null) throw new Error(errorMessage)
  return data
}
