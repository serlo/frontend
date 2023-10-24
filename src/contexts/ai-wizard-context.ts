import { createContext, useContext } from 'react'

export const AiWizardContext = createContext<{
  showWizard: () => void
  closeWizard: () => void
} | null>(null)

export const AiWizardProvider = AiWizardContext.Provider

const errorMessage = 'attempted to use ai wizard context outside of provider!'

export function useAiWizard() {
  const data = useContext(AiWizardContext)
  if (data === null) {
    throw new Error(errorMessage)
  }
  return data
}
