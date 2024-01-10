import { ReactElement, createContext } from 'react'

type RowUuid = string

export type RowUuidToExerciseNumberRenderer = Record<
  RowUuid,
  () => ReactElement
>

// Contains a mapping between the RowUuid and the exerciseNumber so that the
// static renderer of the rowsPlugin can render the number in case the user is
// looking at an exercise group
export const ExerciseNumberContext =
  createContext<RowUuidToExerciseNumberRenderer>({})
