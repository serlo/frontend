export type ExerciseId = string

export type ExerciseLabel = 'solo' | 'group' | 'ai'

export interface Exercise {
  type: 'excursion' | 'recap' | 'feedback' | 'reflection' | 'start' | 'write'
  done: boolean
  time?: number
  title: string
  labels: Array<ExerciseLabel>
  nextExercises: ExerciseId[] | null
  dependsOnExercises: ExerciseId[] | null
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
}
