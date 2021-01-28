import React from 'react'

export const EntityIdContext = React.createContext<number | null>(null)

export const EntityIdProvider = EntityIdContext.Provider

export function useEntityId() {
  const data = React.useContext(EntityIdContext)
  if (!data) {
    throw 'Attempt to use entityId outside of provider!'
  }
  return data
}
