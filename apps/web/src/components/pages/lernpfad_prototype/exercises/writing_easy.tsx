import type { ExerciseProps } from '../types'
import { ExerciseWrapper } from './exercise-wrapper'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

// TODO: How to structure?

export function WritingEasy(props: ExerciseProps) {
  return (
    <ExerciseWrapper {...props}>
      <>
        <EditorRenderer document={editorContent1} />
        <EditorRenderer document={editorContent2} />
      </>
    </ExerciseWrapper>
  )
}

const editorContent1 = {
  plugin: 'rows',
  state: [
    {
      plugin: 'text',
      state: [
        {
          type: 'p',
          children: [
            {
              text: 'Read the given opinion on whether students should grade their teachers and drag and drop the correct answer in each gap.',
              strong: true,
            },
          ],
        },
      ],
      id: '3f940b52-8672-4078-9e6d-f4b100ea2ace',
    },
    {
      plugin: 'exercise',
      state: {
        content: {
          plugin: 'rows',
          state: [
            {
              plugin: 'text',
              state: [{ type: 'p', children: [{ text: '' }] }],
              id: 'fd59edb4-e7fb-4b80-9025-9e7c9e3da59f',
            },
          ],
          id: 'ed2517bd-9f64-46cb-9265-d5e3613ce7c2',
        },
        interactive: {
          plugin: 'blanksExercise',
          state: {
            text: {
              plugin: 'text',
              state: [
                { type: 'p', children: [{ text: '', strong: true, em: true }] },
                {
                  type: 'p',
                  children: [
                    {
                      strong: true,
                      em: true,
                      text: 'Should students grade their teachers?',
                    },
                  ],
                },
                { type: 'p', children: [{ strong: true, text: '' }] },
                {
                  type: 'p',
                  children: [
                    { text: 'Many people say students should grade their ' },
                    {
                      type: 'textBlank',
                      blankId: 'd4df92cb-dff3-4ffe-a2b9-066c2ac01617',
                      correctAnswers: [{ answer: 'teachers' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: '. ' },
                    {
                      type: 'textBlank',
                      blankId: '6ff19043-85a8-4fc7-b21e-e79f53855a1b',
                      correctAnswers: [{ answer: 'On the one hand' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ', I think it is only fair ' },
                    {
                      type: 'textBlank',
                      blankId: '9933cf8a-e1e2-48bf-bf18-ec9f32091c22',
                      correctAnswers: [{ answer: 'because' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' teachers give grades to their students ' },
                    {
                      type: 'textBlank',
                      blankId: '5c8916b7-7dac-409c-8e57-d321935ed074',
                      correctAnswers: [{ answer: 'all the time' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    {
                      text: '. Students want to know what teachers think about them and their work, ',
                    },
                    {
                      type: 'textBlank',
                      blankId: 'e8509de7-2604-4464-b7ba-baa76eabaa1a',
                      correctAnswers: [{ answer: 'so' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    {
                      text: ' it is also useful for teachers if they know what ',
                    },
                    {
                      type: 'textBlank',
                      blankId: 'bd4ff816-3371-4812-8c7d-0cbe1084cb99',
                      correctAnswers: [{ answer: 'opinion' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' their students have of them. ' },
                    {
                      type: 'textBlank',
                      blankId: 'bb7a777c-4d59-4193-a2dc-31a9ca013801',
                      correctAnswers: [{ answer: 'Second' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ', teachers will try ' },
                    {
                      type: 'textBlank',
                      blankId: 'c0f00660-39dd-4b56-8790-4687e8adb467',
                      correctAnswers: [{ answer: 'harder' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' to get better grades and ' },
                    {
                      type: 'textBlank',
                      blankId: '814f69d1-6eb0-4824-b7b8-ec407330a4b6',
                      correctAnswers: [{ answer: 'lessons' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' might become better. ' },
                  ],
                },
                {
                  type: 'p',
                  children: [
                    { text: '' },
                    {
                      type: 'textBlank',
                      blankId: 'b98b8e7e-9ecd-4a0f-aa5c-59b81c3fe6f9',
                      correctAnswers: [{ answer: 'On the other hand' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    {
                      text: ', students don’t really know everything about a teacher’s job. ',
                    },
                    {
                      type: 'textBlank',
                      blankId: '779b18ad-211a-4841-8893-391fe7631af3',
                      correctAnswers: [{ answer: 'For example' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ', teachers spend a lot of time ' },
                    {
                      type: 'textBlank',
                      blankId: 'edf66b10-d1b2-4065-85ed-40f82b92b68c',
                      correctAnswers: [{ answer: 'planning' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    {
                      text: ' lessons and doing things students don’t see, so their grades might not be ',
                    },
                    {
                      type: 'textBlank',
                      blankId: '40e59047-a4e7-4fcb-947c-119ed4f6845a',
                      correctAnswers: [{ answer: 'fair' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: '.' },
                  ],
                },
                {
                  type: 'p',
                  children: [
                    { text: '' },
                    {
                      type: 'textBlank',
                      blankId: '9fb3be92-8be7-4662-ad56-4d23f21342b9',
                      correctAnswers: [{ answer: 'In conclusion' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ', students shouldn’t grade their teachers, ' },
                    {
                      type: 'textBlank',
                      blankId: 'eed9fa6c-38b2-4716-af42-2a8f8d7aca03',
                      correctAnswers: [{ answer: 'but' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    {
                      text: ' it would be a good idea for students to give them ',
                    },
                    {
                      type: 'textBlank',
                      blankId: 'bbf68c58-3b23-4aff-9737-06d3f57ee64f',
                      correctAnswers: [{ answer: 'feedback' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' instead.' },
                  ],
                },
              ],
              id: '37743844-a4ec-4186-aa83-9ff0cdf8ecc9',
            },
            mode: 'drag-and-drop',
          },
          id: '9636639a-60d2-45ef-b649-5cf7e4521893',
        },
        solution: {
          plugin: 'solution',
          state: {
            strategy: {
              plugin: 'text',
              state: [
                {
                  type: 'p',
                  children: [
                    {
                      text: '1. Read the text and try to understand the main message.',
                    },
                  ],
                },
                {
                  type: 'p',
                  children: [
                    {
                      text: '2. Read the possible answers and make sure you understand them.',
                    },
                  ],
                },
                {
                  type: 'p',
                  children: [
                    {
                      text: '3. Read the text again it again and fill each gap by dragging an answer in them.',
                    },
                  ],
                },
                { type: 'p', children: [{ text: '' }] },
              ],
              id: '6e306390-6888-459a-91e0-108501d66ea1',
            },
            steps: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [
                    {
                      type: 'p',
                      children: [
                        { text: 'Here is the solution. Gaps are written in ' },
                        { text: 'bold print:', strong: true },
                      ],
                    },
                    { type: 'p', children: [{ text: '' }] },
                    {
                      type: 'p',
                      children: [
                        { text: 'Should students grade their teachers?' },
                      ],
                    },
                    { type: 'p', children: [{ text: '' }] },
                    {
                      type: 'p',
                      children: [
                        {
                          text: 'Many people say students should grade their ',
                        },
                        { text: 'teachers', strong: true },
                        { text: '. ' },
                        { text: 'On the one hand', strong: true },
                        { text: ', I think it is only fair ' },
                        { text: 'because', strong: true },
                        { text: ' teachers give grades to their students ' },
                        { text: 'all the time', strong: true },
                        {
                          text: '. Students want to know what teachers think about them and their work, ',
                        },
                        { text: 'so', strong: true },
                        {
                          text: ' it is also useful for teachers if they know what ',
                        },
                        { text: 'opinion', strong: true },
                        { text: ' their students have of them. ' },
                      ],
                    },
                    {
                      type: 'p',
                      children: [
                        { text: 'Second', strong: true },
                        { text: ', teachers will try ' },
                        { text: 'harder', strong: true },
                        { text: ' to get better grades and ' },
                        { text: 'lessons', strong: true },
                        { text: ' might become better. ' },
                      ],
                    },
                    {
                      type: 'p',
                      children: [
                        { text: 'On the other hand', strong: true },
                        {
                          text: ', students don’t really know everything about a teacher’s job. ',
                        },
                        { text: 'For example', strong: true },
                        { text: ', teachers spend a lot of time ' },
                        { text: 'planning', strong: true },
                        {
                          text: ' lessons and doing things students don’t see, so their grades might not be ',
                        },
                        { text: 'fair', strong: true },
                        { text: '.' },
                      ],
                    },
                    {
                      type: 'p',
                      children: [
                        { text: 'In conclusion', strong: true },
                        { text: ', students shouldn’t grade their teachers, ' },
                        { text: 'but', strong: true },
                        {
                          text: ' it would be a good idea for students to give them ',
                        },
                        { text: 'feedback', strong: true },
                        { text: ' instead.' },
                      ],
                    },
                  ],
                  id: '3421858a-f771-4639-afe5-d33825953996',
                },
              ],
              id: 'f6362cdf-4538-488f-a472-c6d76309f573',
            },
          },
          id: 'd3ec4f91-3589-43f2-a6f0-e23441c3c2fb',
        },
      },
      id: 'bd9dfa12-2c88-4bf5-8c9d-a9fc98643c65',
    },
  ],
}

const editorContent2 = {
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
                  type: 'p',
                  children: [
                    {
                      strong: true,
                      text: 'Writing your opinion:',
                    },
                  ],
                },
                { type: 'p', children: [{ text: '' }] },
                {
                  type: 'p',
                  children: [
                    {
                      strong: true,
                      text: 'Should students have homework every day?',
                    },
                  ],
                },
              ],
              id: '1b689a64-81db-4754-9475-cda1ea01fd0a',
            },
            {
              plugin: 'text',
              state: [
                {
                  type: 'p',
                  children: [
                    {
                      text: 'You will write your opinion divided into three tasks:',
                    },
                  ],
                },
                { type: 'p', children: [{ text: '' }] },
                { type: 'p', children: [{ text: 'a) Writing the beginning' }] },
                { type: 'p', children: [{ text: 'b) Writing the middle' }] },
                { type: 'p', children: [{ text: 'c) Writing the end' }] },
                { type: 'p', children: [{ text: '' }] },
                { type: 'p', children: [{ text: 'Overall: ' }] },
                {
                  children: [
                    {
                      children: [
                        {
                          type: 'list-item-child',
                          children: [{ text: 'write between 50-75 words.' }],
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
                              text: 'use 3 useful phrases to structure your text.',
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
                          children: [{ text: 'use 3-5 linking words.' }],
                        },
                      ],
                      type: 'list-item',
                    },
                  ],
                  type: 'unordered-list',
                },
              ],
              id: 'fbcc7fe9-48c1-4f3c-bd04-ae0640627ca3',
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
                            text: '"Should students have homework every day?"',
                            em: true,
                          },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          {
                            text: 'Write the beginning of your opinion on the question above.',
                            strong: true,
                          },
                        ],
                      },
                    ],
                    id: '6530bb51-7a87-48a6-8858-69b48cbf9c7f',
                  },
                  {
                    plugin: 'box',
                    state: {
                      type: 'blank',
                      title: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'Remember' }] },
                        ],
                        id: '1f4d4bca-c662-4880-85d9-c3796b2ca558',
                      },
                      anchorId: '',
                      content: {
                        plugin: 'rows',
                        state: [
                          {
                            plugin: 'text',
                            state: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        type: 'list-item-child',
                                        children: [
                                          { text: 'to state your opinion' },
                                        ],
                                      },
                                    ],
                                    type: 'list-item',
                                  },
                                  {
                                    children: [
                                      {
                                        children: [
                                          {
                                            text: 'to use linking words and useful phrases',
                                          },
                                        ],
                                        type: 'list-item-child',
                                      },
                                    ],
                                    type: 'list-item',
                                  },
                                  {
                                    children: [
                                      {
                                        type: 'list-item-child',
                                        children: [
                                          { text: 'Write 1-3 sentences.' },
                                        ],
                                      },
                                    ],
                                    type: 'list-item',
                                  },
                                ],
                                type: 'unordered-list',
                              },
                            ],
                            id: 'b556931f-a0ff-4d55-9855-5c91c41cbef8',
                          },
                        ],
                        id: '330e806c-6e2e-445f-9f10-8eec98cfcf93',
                      },
                    },
                    id: '91055bca-f393-4097-aecf-dcef35b9eda2',
                  },
                ],
                id: 'b9ce0264-b8a7-43f3-8f71-b149f5dae52f',
              },
              interactive: {
                plugin: 'textAreaExercise',
                state: {},
                id: '9eddeca6-1029-48e4-b25d-4b399340a717',
              },
              solution: {
                plugin: 'solution',
                state: {
                  strategy: {
                    plugin: 'text',
                    state: [
                      {
                        type: 'p',
                        children: [
                          { text: '1. Clearly state ' },
                          { text: 'what you think', strong: true },
                          { text: ' about the topic.' },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          { text: '2. Add some ' },
                          {
                            text: 'general information about the topic',
                            strong: true,
                          },
                          { text: ' to make your beginning ' },
                          { text: 'more interesting', strong: true },
                          { text: '.' },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          { text: '3. Remember to use ' },
                          { text: 'useful phrases', strong: true },
                          { text: ', for example: "' },
                          { text: 'I think', strong: true },
                          { text: '", "' },
                          { text: 'I believe', strong: true },
                          { text: '", "' },
                          { text: 'I don’t think', strong: true },
                          { text: '", "' },
                          { text: 'In my opinion', strong: true },
                          { text: '"…' },
                        ],
                      },
                    ],
                    id: 'bbef998c-4015-42f8-b7db-d9ed24724daa',
                  },
                  steps: {
                    plugin: 'rows',
                    state: [
                      {
                        plugin: 'text',
                        state: [
                          {
                            type: 'p',
                            children: [
                              {
                                text: 'Here is a possible solution. Useful phrases and linking words are in bold print:',
                                strong: true,
                              },
                            ],
                          },
                          { type: 'p', children: [{ text: '' }] },
                          {
                            type: 'p',
                            children: [
                              {
                                text: 'Students often have homework every day, ',
                              },
                              { text: 'but', strong: true },
                              { text: ' ' },
                              { text: 'I believe', strong: true },
                              { text: ' that is too often.' },
                            ],
                          },
                        ],
                        id: '80295bd2-e3fd-41a0-b9e1-168a1a4df658',
                      },
                    ],
                    id: '2a5c6497-fdfc-4731-b754-4bae95d14a77',
                  },
                },
                id: 'f95d2511-c150-4c05-9842-8c69cd4b762d',
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
                            text: '"Should students have homework every day?"',
                            em: true,
                          },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          {
                            strong: true,
                            text: 'Write the middle of your opinion.',
                          },
                        ],
                      },
                    ],
                    id: '45374f9d-4188-4e41-b981-89ec0f11e881',
                  },
                  {
                    plugin: 'box',
                    state: {
                      type: 'blank',
                      title: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'Remember' }] },
                        ],
                        id: '72380058-79f2-485b-b170-10cea788f7a0',
                      },
                      anchorId: '',
                      content: {
                        plugin: 'rows',
                        state: [
                          {
                            plugin: 'text',
                            state: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        type: 'list-item-child',
                                        children: [
                                          {
                                            text: 'to give reasons for your opinion',
                                          },
                                        ],
                                      },
                                    ],
                                    type: 'list-item',
                                  },
                                  {
                                    children: [
                                      {
                                        children: [
                                          { text: 'to use linking words' },
                                        ],
                                        type: 'list-item-child',
                                      },
                                    ],
                                    type: 'list-item',
                                  },
                                  {
                                    children: [
                                      {
                                        children: [
                                          { text: 'write in paragraphs' },
                                        ],
                                        type: 'list-item-child',
                                      },
                                    ],
                                    type: 'list-item',
                                  },
                                ],
                                type: 'unordered-list',
                              },
                            ],
                            id: 'ac76c8b0-e078-490d-a0c5-55bc0c8e7ee7',
                          },
                        ],
                        id: 'db1de561-7e80-4d58-a784-4d0e3fa4894d',
                      },
                    },
                    id: '0ed772d3-b7ba-4bc5-8370-e353f24904b7',
                  },
                ],
                id: '71b148d7-4536-402e-80f1-28405a6bfa4a',
              },
              interactive: {
                plugin: 'textAreaExercise',
                state: {},
                id: '6bfb9e96-50b9-4bb0-8807-7797cd5b9cc9',
              },
              solution: {
                plugin: 'solution',
                state: {
                  strategy: {
                    plugin: 'text',
                    state: [
                      {
                        type: 'p',
                        children: [
                          { text: '1. ' },
                          { text: 'Explain your opinion', strong: true },
                          { text: ' you stated in task a) ' },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          { text: '2. Give at least ' },
                          {
                            text: 'two reasons for your opinion',
                            strong: true,
                          },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          {
                            text: '3. To make your text stronger, you can also ',
                          },
                          {
                            text: 'add an argument against your opinion',
                            strong: true,
                          },
                          { text: '.' },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          { text: '4. Structure your text in ' },
                          { text: 'paragraphs', strong: true },
                          { text: '.' },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          { text: '5. Use useful phrases like "' },
                          { text: 'first', strong: true },
                          { text: '," "' },
                          { text: 'second', strong: true },
                          { text: '," or linking words like "' },
                          { text: 'in addition', strong: true },
                          { text: '," "' },
                          { text: 'because', strong: true },
                          { text: '," "' },
                          { text: 'however', strong: true },
                          { text: '" to improve your text.' },
                        ],
                      },
                    ],
                    id: '8f89ad99-e124-4052-b7df-ee090ff891cb',
                  },
                  steps: {
                    plugin: 'rows',
                    state: [
                      {
                        plugin: 'text',
                        state: [
                          {
                            type: 'p',
                            children: [
                              {
                                text: 'Here is a possible solution. Linking words and useful phrases are in bold print:',
                                strong: true,
                              },
                            ],
                          },
                          { type: 'p', children: [{ strong: true, text: '' }] },
                          {
                            type: 'p',
                            children: [
                              { strong: true, text: 'First' },
                              {
                                text: ', students need time to relax after school ',
                              },
                              { text: 'because', strong: true },
                              { text: ' it helps them stay healthy. ' },
                              { text: 'In addition', strong: true },
                              { text: ', too much homework is stressful ' },
                              { text: 'and', strong: true },
                              {
                                text: ' takes away time for hobbies or family. ',
                              },
                              { text: 'However', strong: true },
                              {
                                text: ', a little homework is important to practice what we learn in class. ',
                              },
                            ],
                          },
                        ],
                        id: 'ae677576-a132-4bea-9e26-bea745ca22bb',
                      },
                    ],
                    id: 'c42d3fe6-bbf8-4697-8ee5-38d00594b86b',
                  },
                },
                id: 'aef9244d-4f9f-4fc5-8a35-c7cd0c0d52a1',
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
                            text: '"Should students have homework every day?"',
                            em: true,
                          },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          {
                            strong: true,
                            text: 'Write the end of your opinion.',
                          },
                        ],
                      },
                    ],
                    id: 'c1b5f2aa-4df6-4447-abc2-51d8e5a4a951',
                  },
                  {
                    plugin: 'box',
                    state: {
                      type: 'blank',
                      title: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'Remember' }] },
                        ],
                        id: '7c385223-d278-4364-b89c-7cb2b93f2840',
                      },
                      anchorId: '',
                      content: {
                        plugin: 'rows',
                        state: [
                          {
                            plugin: 'text',
                            state: [
                              {
                                children: [
                                  {
                                    children: [
                                      {
                                        type: 'list-item-child',
                                        children: [
                                          { text: 'to sum up your opinion' },
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
                                            text: 'use linking words and useful phrases',
                                          },
                                        ],
                                      },
                                    ],
                                    type: 'list-item',
                                  },
                                ],
                                type: 'unordered-list',
                              },
                            ],
                            id: '935dd16d-dd44-4349-98ed-a84ffc46b2a0',
                          },
                        ],
                        id: '83a3ef55-2ae3-48ac-b925-d7f421d909d1',
                      },
                    },
                    id: 'd71119e1-28ff-4141-81c5-0199893ab26b',
                  },
                ],
                id: '5947d357-00da-4ce9-8f22-41411b715c28',
              },
              interactive: {
                plugin: 'textAreaExercise',
                state: {},
                id: 'eafb687a-8a62-4c1a-ac7f-43376cd10d9e',
              },
              solution: {
                plugin: 'solution',
                state: {
                  strategy: {
                    plugin: 'text',
                    state: [
                      {
                        type: 'p',
                        children: [
                          { text: '1. Write ' },
                          { text: '1-3 sentences to sum up', strong: true },
                          { text: ' what you have written before.' },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          { text: '2. ' },
                          { text: 'Repeat your opinion', strong: true },
                          { text: '.' },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          { text: '3. Write a ' },
                          { text: 'short explanation', strong: true },
                          { text: ' for it.' },
                        ],
                      },
                      {
                        type: 'p',
                        children: [
                          { text: '4. Use ' },
                          { text: 'useful phrases', strong: true },
                          { text: ' like "' },
                          { text: 'to sum up', strong: true },
                          { text: '," "' },
                          { text: 'in conclusion', strong: true },
                          { text: '," "' },
                          { text: 'finally', strong: true },
                          { text: '" and ' },
                          { text: 'linking words', strong: true },
                          { text: ' like ' },
                          { text: '"because', strong: true },
                          { text: '," "' },
                          { text: 'because of', strong: true },
                          { text: '," "' },
                          { text: 'as', strong: true },
                          { text: '," "' },
                          { text: 'therefore', strong: true },
                          { text: '"' },
                        ],
                      },
                    ],
                    id: 'dbd247fd-a05d-403d-b948-1aa435b7b691',
                  },
                  steps: {
                    plugin: 'rows',
                    state: [
                      {
                        plugin: 'text',
                        state: [
                          {
                            type: 'p',
                            children: [
                              {
                                text: 'Here is a possible solution. USeful phrases and linking words are in bold print:',
                                strong: true,
                              },
                            ],
                          },
                          { type: 'p', children: [{ strong: true, text: '' }] },
                          {
                            type: 'p',
                            children: [
                              { strong: true, text: 'In conclusion' },
                              { text: ', homework is good, ' },
                              { text: 'but', strong: true },
                              { text: ' not every day. ' },
                              { text: 'I believe', strong: true },
                              { text: ' it should be balanced.' },
                            ],
                          },
                          { type: 'p', children: [{ text: '' }] },
                        ],
                        id: 'cd8e016f-30e4-4e97-b25a-8dc423341e6b',
                      },
                    ],
                    id: '7dadd7ce-a0cb-4c02-94d3-d21fe3c1dd8c',
                  },
                },
                id: '5c8d8b70-03b9-4eb9-a441-6541065f0107',
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
