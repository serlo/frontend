import { createContext, useContext } from 'react'

const PreviewContext = createContext<boolean>(false)

export const PreviewProvider = PreviewContext.Provider

export function useIsPreviewActive() {
  return useContext(PreviewContext)
}
