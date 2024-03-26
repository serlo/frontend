import { exercisesGrade5 } from './grade-5'
import { middleSchoolFinalExam } from './middle-school-final-exam'

export type SupportedExercisesId = keyof typeof allExercises

export const allExercises = {
  ...exercisesGrade5,
  ...middleSchoolFinalExam,
} as const
