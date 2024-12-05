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
      x: 47,
      y: 8,
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
      x: 30,
      y: 3,
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
      y: 25,
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
      x: 58,
      y: 25,
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
      x: 35,
      y: 45,
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
      x: 58,
      y: 45,
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
      x: 35,
      y: 62,
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
      x: 58,
      y: 62,
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
      x: 50,
      y: 72,
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
      x: 70,
      y: 72,
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
      x: 50,
      y: 82,
    },
  },
}
