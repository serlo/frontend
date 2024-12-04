export type ExerciseId = string

export interface Exercise {
  done: boolean
  title: string
  next: ExerciseId | null
}

export type ExercisesRecord = Record<ExerciseId, Exercise>
