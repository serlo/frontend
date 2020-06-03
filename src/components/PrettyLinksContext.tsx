import React from 'react'

const PrettyLinksContext = React.createContext<
  Record<string, { alias: string }>
>({})
export const PrettyLinksProvider = PrettyLinksContext.Provider
export default PrettyLinksContext
