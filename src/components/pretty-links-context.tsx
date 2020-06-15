import React from 'react'

export type PrettyLinksContextProps =
  | Record<string, { alias: string }>
  | undefined

export const PrettyLinksContext = React.createContext<PrettyLinksContextProps>(
  {}
)
export const PrettyLinksProvider = PrettyLinksContext.Provider
