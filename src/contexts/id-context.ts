import React from 'react'

export const IdContext = React.createContext<number>(-1)

export const IdContextProvider = IdContext.Provider

export function useId() {
  return React.useContext(IdContext)
}
