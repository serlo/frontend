import { createContext, useContext } from 'react'

export interface SerloEntityContextData {
  entityId?: number
  revisionId?: number
  title?: string // currently only used for course title
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
