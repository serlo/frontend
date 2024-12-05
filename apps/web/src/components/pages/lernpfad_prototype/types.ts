import { AnyEditorDocument } from '@editor/types/editor-plugins'

export type ExerciseId = string

export interface Exercise {
  done: boolean
  title: string
  state?: AnyEditorDocument
  nextExercises: ExerciseId[] | null
  position: {
    x: number
    y: number
  }
}

export type ExercisesRecord = Record<ExerciseId, Exercise>

export interface ExerciseProps {
  id: ExerciseId | null
  data: Exercise
  onBackToMapClick: () => void
  onSubmitClick: (id: ExerciseId) => void
  onNextExerciseClick: (id: ExerciseId) => void
}
