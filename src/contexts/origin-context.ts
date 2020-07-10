import React from 'react'

export const OriginContext = React.createContext<string | null>(null)

export const OriginProvider = OriginContext.Provider

export function useOrigin() {
  const data = React.useContext(OriginContext)
  if (!data) {
    throw 'Attempt to use origin outside of provider!'
  }
  console.log('use origin', data)
  return data
}
