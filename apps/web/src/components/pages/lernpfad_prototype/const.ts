import { ExercisesRecord } from './types'

export const localStorageKey = 'lernpfad_prototype'

export const initialExercisesData: ExercisesRecord = {
  intro: {
    done: false,
    time: 8,
    title: 'Start 🏁',
    type: 'start',
    nextExercises: ['extra', 'recap_easy', 'recap_hard'],
    dependsOnExercises: null,
    position: {
      x: 42,
      y: 28,
    },
  },
  extra1: {
    type: 'extra',
    done: false,
    time: 8,
    title: 'Useful phrases & vocabulary',
    nextExercises: null,
    dependsOnExercises: ['intro'],
    position: {
      x: 52,
      y: 32,
    },
  },
  recap_easy: {
    type: 'recap',
    done: false,
    time: 8,
    title: 'Cats or Dogs? 🐱 🐶',
    nextExercises: ['exercise_1_easy'],
    dependsOnExercises: ['intro'],
    position: {
      x: 35,
      y: 49,
    },
  },
  recap_hard: {
    type: 'recap',
    done: false,
    time: 8,
    title: 'Cats or Dogs? 🐱 🐶',
    nextExercises: ['exercise_1_hard'],
    dependsOnExercises: ['intro'],
    position: {
      x: 43,
      y: 76,
    },
  },
  exercise_1_easy: {
    type: 'exercise',
    done: false,
    time: 8,
    title: 'Should students grade their teachers? 🎓',
    nextExercises: ['exercise_2_easy'],
    dependsOnExercises: ['recap_easy'],
    position: {
      x: 60,
      y: 52,
    },
  },
  exercise_1_hard: {
    type: 'exercise',
    done: false,
    time: 8,
    title: 'Should students grade their teachers? 🎓',
    nextExercises: ['exercise_2_hard'],
    dependsOnExercises: ['recap_hard'],
    position: {
      x: 60,
      y: 52,
    },
  },
  exercise_2_easy: {
    type: 'exercise',
    done: false,
    time: 8,
    title: 'Should students have homework every day? 💦',
    nextExercises: ['rewrite'],
    dependsOnExercises: ['exercise_1_easy'],
    position: {
      x: 60,
      y: 72,
    },
  },
  exercise_2_hard: {
    type: 'exercise',
    done: false,
    time: 8,
    title: 'Should students have homework every day? 💦',
    nextExercises: ['rewrite'],
    dependsOnExercises: ['exercise_1_hard'],
    position: {
      x: 60,
      y: 72,
    },
  },
  rewrite: {
    type: 'exercise', // ?
    done: false,
    time: 8,
    title: 'Feedback and Rewriting your opinion',
    nextExercises: ['reflection', 'extra2'],
    dependsOnExercises: ['exercise_2_easy', 'exercise_2_hard'],
    position: {
      x: 50,
      y: 82,
    },
  },
  extra2: {
    type: 'exercise', // ?
    done: false,
    time: 8,
    title: 'Feedback and Rewriting your opinion',
    nextExercises: null,
    dependsOnExercises: ['rewrite'],
    position: {
      x: 60,
      y: 92,
    },
  },
  reflection: {
    type: 'end',
    done: false,
    time: 8,
    title: 'Feedback and Rewriting your opinion',
    nextExercises: null,
    dependsOnExercises: ['rewrite'],
    position: {
      x: 50,
      y: 92,
    },
  },
}
