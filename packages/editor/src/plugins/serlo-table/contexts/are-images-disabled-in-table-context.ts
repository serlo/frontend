import { createContext, useContext } from 'react'

export const AreImagesDisabledInTableContext = createContext<boolean>(false)

export function useAreImagesDisabledInTable() {
  return useContext(AreImagesDisabledInTableContext)
}
