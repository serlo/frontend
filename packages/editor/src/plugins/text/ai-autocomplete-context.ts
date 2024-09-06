import { createContext } from 'react'

export const AiAutocompleteContext = createContext<{
  enabled: boolean
  setEnabled: (enabled: boolean) => void
}>({
  enabled: true,
  setEnabled: () => void 0,
})
