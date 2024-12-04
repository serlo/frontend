import type { ExercisesRecord } from './types'

export const localStorageKey = 'lernpfad_prototype'

export const initialExercisesData: ExercisesRecord = {
  '1': {
    done: false,
    title: 'Exercise 1',
    next: '2',
  },
  '2': {
    done: false,
    title: 'Exercise 2',
    next: null,
  },
}
