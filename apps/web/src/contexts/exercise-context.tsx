import { extractStringFromAnyDocument } from '@editor/plugins/text/utils/static-extract-text'
import { AnyEditorDocument } from '@editor/types/editor-plugins'
import {
  isExerciseDocument,
  isSolutionDocument,
} from '@editor/types/plugin-type-guards'
import { createContext, useContext } from 'react'

interface ExerciseContextProps {
  question: string
  strategy: string
  steps: string
}

export const ExerciseContext = createContext<ExerciseContextProps | undefined>(
  undefined
)

export function useExerciseContext(): ExerciseContextProps {
  const context = useContext(ExerciseContext)
  // if (!context) {
  //   throw new Error(
  //     'useExerciseContext must be used within an ExerciseProvider'
  //   )
  // }

  return context as ExerciseContextProps
}

export function useBuildExerciseContext(
  document: AnyEditorDocument
): ExerciseContextProps {
  if (!isExerciseDocument(document)) {
    // eslint-disable-next-line no-console
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
