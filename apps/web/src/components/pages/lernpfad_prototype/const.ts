import type { ExercisesRecord } from './types'

export const localStorageKey = 'lernpfad_prototype'

export const initialExercisesData: ExercisesRecord = {
  '1': {
    done: false,
    title: 'Exercise 1',
    next: '2',
    position: {
      x: 42,
      y: 28,
    },
  },
  '2': {
    done: false,
    title: 'Exercise 2',
    next: '3',
    position: {
      x: 35,
      y: 49,
    },
  },
  '3': {
    done: false,
    title: 'Exercise 3',
    next: null,
    position: {
      x: 60,
      y: 52,
    },
  },
}
