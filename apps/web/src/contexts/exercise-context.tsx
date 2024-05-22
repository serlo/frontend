import { extractStringFromAnyDocument } from '@editor/plugins/text/utils/static-extract-text'
import { AnyEditorDocument } from '@editor/types/editor-plugins'
import {
  isExerciseDocument,
  isSolutionDocument,
} from '@editor/types/plugin-type-guards'
import { createContext, ReactNode, useContext } from 'react'

interface ExerciseContextProps {
  question: string
  strategy: string
  steps: string
}

interface ExerciseProviderProps {
  children: ReactNode
  value: ExerciseContextProps
}

const ExerciseContext = createContext<ExerciseContextProps | undefined>(
  undefined
)

export function ExerciseProvider({ children, value }: ExerciseProviderProps) {
  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  )
}

export function useExerciseContext(): ExerciseContextProps {
  const context = useContext(ExerciseContext)
  if (!context) {
    throw new Error(
      'useExerciseContext must be used within an ExerciseProvider'
    )
  }
  return context
}

export function useBuildExerciseContext(
  document: AnyEditorDocument
): ExerciseContextProps {
  if (!isExerciseDocument(document)) {
    console.error('useBuildExerciseContext must be used with an exercise')
    return { question: '', strategy: '', steps: '' }
  }

  const question = extractStringFromAnyDocument(document.state.content)

  const solution = document.state.solution
  const strategy =
    solution && isSolutionDocument(solution)
      ? extractStringFromAnyDocument(solution?.state?.strategy)
      : ''

  const steps =
    solution && isSolutionDocument(solution)
      ? extractStringFromAnyDocument(solution?.state?.steps)
      : ''

  const exerciseContextValue = {
    question,
    strategy,
    steps,
  }

  return exerciseContextValue
}
