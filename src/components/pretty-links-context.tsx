import React from 'react'

export type PrettyLinksContextProps = Record<string, { alias: string }>

export const PrettyLinksContext = React.createContext<PrettyLinksContextProps>(
  {}
)
export const PrettyLinksProvider = PrettyLinksContext.Provider
