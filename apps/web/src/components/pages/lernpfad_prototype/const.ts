import { ExercisesRecord } from './types'

export const localStorageKey = 'lernpfad_prototype'

export const initialExercisesData: ExercisesRecord = {
  intro: {
    done: false,
    time: 8,
    title: 'Start 🏁',
    type: 'start',
    nextExercises: ['extra1', 'recap_easy', 'recap_hard'],
    dependsOnExercises: null,
    position: {
      x: 45,
      y: 22.5,
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
      x: 32,
      y: 31.5,
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
      x: 59,
      y: 27,
    },
  },
  exercise_1_easy: {
    type: 'write',
    done: false,
    time: 8,
    title: 'Should students grade their teachers? 🎓',
    nextExercises: ['exercise_2_easy'],
    dependsOnExercises: ['recap_easy'],
    position: {
      x: 10,
      y: 0,
    },
  },
  exercise_1_hard: {
    type: 'write',
    done: false,
    time: 8,
    title: 'Should students grade their teachers? 🎓',
    nextExercises: ['exercise_2_hard'],
    dependsOnExercises: ['recap_hard'],
    position: {
      x: 20,
      y: 0,
    },
  },
  exercise_2_easy: {
    type: 'write',
    done: false,
    time: 8,
    title: 'Should students have homework every day? 💦',
    nextExercises: ['rewrite'],
    dependsOnExercises: ['exercise_1_easy'],
    position: {
      x: 31.5,
      y: 51,
    },
  },
  exercise_2_hard: {
    type: 'write',
    done: false,
    time: 8,
    title: 'Should students have homework every day? 💦',
    nextExercises: ['rewrite'],
    dependsOnExercises: ['exercise_1_hard'],
    position: {
      x: 63.5,
      y: 46,
    },
  },
  rewrite: {
    type: 'feedback',
    done: false,
    time: 8,
    title: 'Feedback and Rewriting your opinion',
    nextExercises: ['reflection', 'extra2'],
    dependsOnExercises: ['exercise_2_easy', 'exercise_2_hard'],
    position: {
      x: 48,
      y: 62,
    },
  },
  reflection: {
    type: 'reflection',
    done: false,
    time: 8,
    title: 'Reflection',
    nextExercises: null,
    dependsOnExercises: ['rewrite'],
    position: {
      x: 46.5,
      y: 74.5,
    },
  },
  extra1: {
    type: 'excursion',
    done: false,
    time: 8,
    title: 'Useful phrases & vocabulary',
    nextExercises: null,
    dependsOnExercises: ['intro'],
    position: {
      x: 30.5,
      y: 20,
    },
  },
  extra2: {
    type: 'excursion',
    done: false,
    time: 8,
    title: 'Knowing & recognising criteria for opinion writing',
    nextExercises: null,
    dependsOnExercises: ['rewrite'],
    position: {
      x: 64,
      y: 62,
    },
  },
}
