import type { ExercisesRecord } from './types'

export const localStorageKey = 'lernpfad_prototype'

export const initialExercisesData: ExercisesRecord = {
  '1': {
    done: false,
    title: 'Exercise 1',
    state: {
      plugin: 'rows',
      state: [
        {
          plugin: 'exercise',
          state: {
            content: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [
                    {
                      type: 'p',
                      children: [
                        {
                          text: '',
                        },
                      ],
                    },
                  ],
                  id: '6d5e9849-33a3-4760-82a5-aeb6f526694f',
                },
              ],
              id: 'bfc19734-43c9-47d6-9afe-a4c6ce2f088b',
            },
            interactive: {
              plugin: 'scMcExercise',
              state: {
                isSingleChoice: true,
                answers: [
                  {
                    content: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: '',
                            },
                          ],
                        },
                      ],
                      id: 'd26d1ead-1516-4bf2-a2d0-69ed9c6e4fff',
                    },
                    isCorrect: true,
                    feedback: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: '',
                            },
                          ],
                        },
                      ],
                      id: '1cc0efbd-e0a6-467e-bc06-33bc1c91cc5b',
                    },
                  },
                  {
                    content: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: '',
                            },
                          ],
                        },
                      ],
                      id: '2c812de1-4c61-4ae6-b4b1-5d25784257b2',
                    },
                    isCorrect: false,
                    feedback: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: '',
                            },
                          ],
                        },
                      ],
                      id: 'bc77154a-4ee6-43a5-98d0-b1ca9c4e6508',
                    },
                  },
                ],
              },
              id: '2cc9d855-2e3d-423a-91ea-657782ba16be',
            },
          },
          id: '2329ff6c-cf60-4251-8958-4224295e48ea',
        },
      ],
    },
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
