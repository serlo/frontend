import React from 'react'

export type PrettyLinksContextValue = Record<string, { alias: string }>

export const PrettyLinksContext = React.createContext<PrettyLinksContextValue>(
  {}
)
export const PrettyLinksProvider = PrettyLinksContext.Provider
