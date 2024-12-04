import type { ExercisesRecord } from './types'

export const localStorageKey = 'lernpfad_prototype'

export const initialExercisesData: ExercisesRecord = {
  '1': {
    done: false,
    title: 'Exercise 1',
    nextExercises: ['2', '4'],
    position: {
      x: 42,
      y: 28,
    },
  },
  '2': {
    done: false,
    title: 'Exercise 2',
    nextExercises: ['3'],
    position: {
      x: 35,
      y: 49,
    },
  },
  '3': {
    done: false,
    title: 'Exercise 3',
    nextExercises: null,
    position: {
      x: 43,
      y: 76,
    },
  },
  '4': {
    done: false,
    title: 'Exercise 4',
    nextExercises: null,
    position: {
      x: 60,
      y: 52,
    },
  },
}
