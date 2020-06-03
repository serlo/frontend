import React from 'react'

export const PrettyLinksContext = React.createContext<
  Record<string, { alias: string }>
>({})
export const PrettyLinksProvider = PrettyLinksContext.Provider
