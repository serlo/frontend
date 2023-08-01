import { createContext, useContext } from 'react'

export const EntityIdContext = createContext<number | undefined | null>(null)

export const EntityIdProvider = EntityIdContext.Provider

export function useEntityId() {
  const data = useContext(EntityIdContext)
  if (data === null) {
    throw new Error('Attempt to use entityId outside of provider!')
  }
  return data
}
