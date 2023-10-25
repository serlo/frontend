import { Ai } from '@serlo/authorization'
import { useState, useCallback, createContext, useContext } from 'react'

import { useCanDo } from '@/auth/use-can-do'

export const AiWizardContext = createContext<{
  showWizard: () => void
  closeWizard: () => void
  canUseAiFeatures: boolean
  isShowingAiWizard: boolean
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

export function AiWizardService({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  const [isShowingAiWizard, setIsShowingAiWizard] = useState(false)

  const showWizard = useCallback(() => {
    setIsShowingAiWizard(true)
  }, [])

  const closeWizard = useCallback(() => {
    setIsShowingAiWizard(false)
  }, [])

  const canDo = useCanDo()
  const canUseAiFeatures = canDo(Ai.executePrompt)

  return (
    <AiWizardContext.Provider
      value={{ showWizard, closeWizard, canUseAiFeatures, isShowingAiWizard }}
    >
      {children}
    </AiWizardContext.Provider>
  )
}
