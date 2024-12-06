import { ExercisesRecord } from './types'

export const localStorageKey = 'lernpfad_prototype'

export const initialExercisesData: ExercisesRecord = {
  intro: {
    type: 'start',
    done: false,
    time: 5,
    title: 'Start',
    labels: ['group'],
    nextExercises: ['extra1', 'recap_easy', 'recap_hard'],
    dependsOnExercises: null,
    position: {
      x: 45.5,
      y: 23,
    },
  },
  recap_easy: {
    type: 'recap',
    done: false,
    time: 10,
    title: 'Cats or Dogs? 🐱 🐶',
    labels: ['solo'],
    nextExercises: ['writing_easy'],
    dependsOnExercises: ['intro'],
    position: {
      x: 34,
      y: 31.5,
    },
  },
  recap_hard: {
    type: 'recap',
    done: false,
    time: 10,
    title: 'Cats or Dogs? 🐱 🐶',
    labels: ['solo'],
    nextExercises: ['writing_hard'],
    dependsOnExercises: ['intro'],
    position: {
      x: 58,
      y: 27,
    },
  },
  writing_easy: {
    type: 'write',
    done: false,
    time: 20,
    title: 'Writing your opinion',
    labels: ['solo'],
    nextExercises: ['rewrite'],
    dependsOnExercises: ['recap_easy'],
    position: {
      x: 33.5,
      y: 51,
    },
  },
  writing_hard: {
    type: 'write',
    done: false,
    time: 20,
    title: 'Writing your opinion',
    labels: ['solo'],
    nextExercises: ['rewrite'],
    dependsOnExercises: ['recap_hard'],
    position: {
      x: 61.5,
      y: 46,
    },
  },
  rewrite: {
    type: 'feedback',
    done: false,
    time: 10,
    title: 'Feedback and Rewriting your opinion',
    labels: ['solo', 'ai'],
    nextExercises: ['reflection', 'extra2'],
    dependsOnExercises: ['writing_easy', 'writing_hard'],
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
    labels: ['solo', 'ai'],
    nextExercises: null,
    dependsOnExercises: ['rewrite'],
    position: {
      x: 47,
      y: 74.5,
    },
  },
  extra1: {
    type: 'excursion',
    done: false,
    time: 5,
    title: 'Useful phrases & vocabulary',
    labels: ['solo'],
    nextExercises: null,
    dependsOnExercises: ['intro'],
    position: {
      x: 33,
      y: 20,
    },
  },
  extra2: {
    type: 'excursion',
    done: false,
    time: 5,
    title: 'Knowing & recognising criteria for opinion writing',
    labels: ['solo'],
    nextExercises: null,
    dependsOnExercises: ['rewrite'],
    position: {
      x: 62,
      y: 62,
    },
  },
}
