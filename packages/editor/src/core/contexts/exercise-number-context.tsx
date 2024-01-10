import { ReactElement, createContext } from 'react'

type ExerciseOrGroupUuid = string

export type ExerciseOrGroupUuidToExerciseNumberRenderer = Record<
  ExerciseOrGroupUuid,
  () => ReactElement
>

// Contains a mapping between the ExerciseOrGroupUuid and the exerciseNumber so
// that the static renderer of the exercise/exercise group can render the number
// whenever the user is looking at an exercise folder
export const ExerciseNumberContext =
  createContext<ExerciseOrGroupUuidToExerciseNumberRenderer>({})
