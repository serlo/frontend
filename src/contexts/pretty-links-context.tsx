import React from 'react'

export interface PrettyLinksContextValue {
  [key: string]: {
    alias: string
    instance: string
  }
}

export const PrettyLinksContext = React.createContext<PrettyLinksContextValue>(
  {}
)
export const PrettyLinksProvider = PrettyLinksContext.Provider
