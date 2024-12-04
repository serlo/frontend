export type ExerciseId = string

export interface Exercise {
  done: boolean
  title: string
  next: ExerciseId | null
  position: {
    x: number
    y: number
  }
}

export type ExercisesRecord = Record<ExerciseId, Exercise>
