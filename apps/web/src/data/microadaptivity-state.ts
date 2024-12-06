export const microadaptivityState = {
  plugin: 'rows',
  state: [
    {
      plugin: 'exerciseGroup',
      state: {
        content: {
          plugin: 'rows',
          state: [
            {
              plugin: 'text',
              state: [
                {
                  type: 'h',
                  children: [
                    {
                      text: 'Writing your opinion: Should students have homework every day?',
                    },
                  ],
                  level: 3,
                },
              ],
              id: '571bab2d-877c-4395-8102-9cea3477cd37',
            },
            {
              plugin: 'box',
              state: {
                type: 'blank',
                title: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                },
                anchorId: '',
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
                              text: 'You will write your opinion divided into three tasks: A ',
                            },
                            { text: 'beginning', strong: true },
                            { text: ', a ' },
                            { text: 'middle', strong: true },
                            { text: ' and an ' },
                            { text: 'end.', strong: true },
                          ],
                        },
                        {
                          children: [
                            {
                              children: [
                                {
                                  type: 'list-item-child',
                                  children: [
                                    { text: 'Write between 50-75 words.' },
                                  ],
                                },
                              ],
                              type: 'list-item',
                            },
                            {
                              children: [
                                {
                                  type: 'list-item-child',
                                  children: [
                                    {
                                      text: 'Use 3 useful phrases to structure your text.',
                                    },
                                  ],
                                },
                              ],
                              type: 'list-item',
                            },
                            {
                              children: [
                                {
                                  type: 'list-item-child',
                                  children: [
                                    { text: 'Use 3-5 linking words.' },
                                  ],
                                },
                              ],
                              type: 'list-item',
                            },
                          ],
                          type: 'unordered-list',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
          id: '1929a754-da62-45fa-ab49-2279596d3bba',
        },
        exercises: [
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
                            text: 'Write the ',
                          },
                          {
                            text: 'beginning',
                            strong: true,
                          },
                          {
                            text: ' of your opinion.',
                          },
                        ],
                      },
                    ],
                    id: '6530bb51-7a87-48a6-8858-69b48cbf9c7f',
                  },
                ],
                id: 'b9ce0264-b8a7-43f3-8f71-b149f5dae52f',
              },
              interactive: {
                plugin: 'textAreaExercise',
                state: {
                  solution:
                    'Students often have homework every day, but I believe that is too often.',
                  allowShowSolution: false,
                  solutionStrategy:
                    'Clearly state what you think about the topic. \nAdd some general information about the topic to make your beginning more interesting.\nRemember to use useful phrases, for example: "I think", "I believe", "I don’t think", "In my opinion"…',
                  allowShowSolutionStrategy: true,
                  evaluationCriteria:
                    'Contains general information and your opinion.\nDoes not give reasons for your stated opinion.\nContains no errors in sentence structure.',
                  allowParagraphFeedback: true,
                  allowSubmitFeedback: true,
                  allowAiFeedback: true,
                  additionalInfoForAi:
                    'Achte auf typische Übersetzungsfehler aus dem Deutschen zum Beispiel "I find that ...".\n\nAchte auf Fehler in der Reihenfolge von Subjekt, Verb, Objekt.',
                  allowShowEvaluationCriteria: true,
                },
                id: '9eddeca6-1029-48e4-b25d-4b399340a717',
              },
            },
            id: '2bb336bd-f7df-489d-a3d7-432607402e48',
          },
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
                            text: 'Write the ',
                          },
                          {
                            text: 'middle',
                            strong: true,
                          },
                          {
                            text: ' of your opinion.',
                          },
                        ],
                      },
                    ],
                    id: '45374f9d-4188-4e41-b981-89ec0f11e881',
                  },
                ],
                id: '71b148d7-4536-402e-80f1-28405a6bfa4a',
              },
              interactive: {
                plugin: 'textAreaExercise',
                state: {
                  solution:
                    'First, students need time to relax after school because it helps them stay healthy. In addition, too much homework is stressful and takes away time for hobbies or family. However, a little homework is important to practice what we learn in class.',
                  solutionStrategy:
                    '1. Explain your opinion you stated in task a)\n\n2. Give at least two reasons for your opinion\n\n3. To make your text stronger, you can also add an argument against your opinion.\n\n4. Structure your text in paragraphs.\n\n5. Use useful phrases like "first," "second," or linking words like "in addition," "because," "however" to improve your text.',
                  allowShowSolutionStrategy: true,
                  evaluationCriteria:
                    'Give reasons for your opinion\nUse linking words\nWrite in paragraphs',
                  allowParagraphFeedback: true,
                  allowSubmitFeedback: true,
                  allowAiFeedback: true,
                  allowShowEvaluationCriteria: true,
                },
                id: '6bfb9e96-50b9-4bb0-8807-7797cd5b9cc9',
              },
            },
            id: '28acf8f6-abe8-4f87-9b95-5e89c32c189b',
          },
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
                            text: 'Write the ',
                          },
                          {
                            text: 'end',
                            strong: true,
                          },
                          {
                            text: ' of your opinion.',
                          },
                        ],
                      },
                    ],
                    id: 'c1b5f2aa-4df6-4447-abc2-51d8e5a4a951',
                  },
                ],
                id: '5947d357-00da-4ce9-8f22-41411b715c28',
              },
              interactive: {
                plugin: 'textAreaExercise',
                state: {
                  solution:
                    'In conclusion, homework is good, but not every day. I believe it should be balanced.',
                  solutionStrategy:
                    '1. Write 1-3 sentences to sum up what you have written before.\n\n2. Repeat your opinion.\n\n3. Write a short explanation for it.\n\n4. Use useful phrases like "to sum up," "in conclusion," "finally" and linking words like "because," "because of," "as," "therefore"',
                  allowShowSolutionStrategy: true,
                  allowParagraphFeedback: true,
                  allowSubmitFeedback: true,
                  allowAiFeedback: true,
                  allowShowEvaluationCriteria: true,
                  evaluationCriteria:
                    'Sum up your opinion\nUse linking words and useful phrases',
                },
                id: 'eafb687a-8a62-4c1a-ac7f-43376cd10d9e',
              },
            },
            id: '15157d38-afb1-41f0-9656-c8cb5721482b',
          },
        ],
      },
      id: 'cce46646-b3a1-4f1f-a462-af8c41fdc9fa',
    },
    {
      plugin: 'text',
      state: [
        { type: 'p', children: [{ text: '', strong: true }] },
        { type: 'p', children: [{ strong: true, text: ' ' }] },
      ],
      id: '95685386-63d5-4e41-9933-f055f4ccd445',
    },
  ],
}
