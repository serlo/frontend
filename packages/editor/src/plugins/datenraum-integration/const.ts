export const hardcodedExerciseState = {
  content: {
    plugin: 'rows',
    state: [
      {
        plugin: 'text',
        state: [
          {
            type: 'p',
            children: [{ text: 'Trage die fehlenden Wörter ein!' }],
          },
        ],
      },
    ],
  },
  interactive: {
    plugin: 'blanksExercise',
    state: {
      text: {
        plugin: 'text',
        state: [
          {
            type: 'p',
            children: [
              { text: 'Ein ' },
              {
                type: 'textBlank',
                blankId: 'ae9a2036-c58e-4bc8-89fd-54beb4222fa1',
                correctAnswers: [{ answer: 'Riesenrad' }],
                acceptMathEquivalents: true,
                children: [{ text: '' }],
              },
              {
                text: ' ist groß und rund, man findet es häufig auf großen Volksfesten. Es hat viele Gondeln.',
              },
            ],
          },
          { type: 'p', children: [{ text: '' }] },
          {
            type: 'p',
            children: [
              { text: 'Ein ' },
              {
                type: 'textBlank',
                blankId: '573872fa-9332-4d5f-9cce-28962d050025',
                correctAnswers: [{ answer: 'Zug' }],
                acceptMathEquivalents: true,
                children: [{ text: '' }],
              },
              { text: ' fährt auf Schienen.' },
            ],
          },
          { type: 'p', children: [{ text: '' }] },
          {
            type: 'p',
            children: [
              { text: 'Mit einem ' },
              {
                type: 'textBlank',
                blankId: '6b1cb8b7-e61a-4f05-9bb3-9339aa523cf0',
                correctAnswers: [
                  { answer: 'Computer' },
                  { answer: 'PC' },
                  { answer: 'Laptop' },
                ],
                acceptMathEquivalents: true,
                children: [{ text: '' }],
              },
              { text: ' arbeiten EntwicklerInnen.' },
            ],
          },
        ],
      },
      mode: 'typing',
    },
  },
}
