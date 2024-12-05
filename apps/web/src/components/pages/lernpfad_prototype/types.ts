export type ExerciseId = string

export interface Exercise {
  done: boolean
  title: string
  nextExercises: ExerciseId[] | null
  position: {
    x: number
    y: number
  }
  type: 'start' | 'extra' | 'recap' | 'exercise' | 'end'
  time?: number
}

export type ExercisesRecord = Record<ExerciseId, Exercise>

export interface ExerciseProps {
  id: ExerciseId | null
  data: Exercise
  onBackToMapClick: () => void
  onSubmitClick: (id: ExerciseId) => void
  onNextExerciseClick: (id: ExerciseId) => void
}
