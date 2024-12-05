import type { ExerciseProps } from '../types'
import { BackLink } from './back-link'
import { DoneState } from './done'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

export function Extra1(props: ExerciseProps) {
  const { id, data, onSubmitClick } = props

  if (id === null) return null

  return (
    <div className="mx-auto max-w-2xl">
      <BackLink {...props} />

      <div className="flex h-full flex-col items-center justify-center">
        <h1>{data.title}</h1>
        <EditorRenderer document={editorContent} />
        {data.done ? (
          <DoneState {...props} />
        ) : (
          <button
            className="serlo-button-edit-primary"
            onClick={() => onSubmitClick(id)}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

const editorContent = {
  plugin: 'rows',
  state: [
    {
      plugin: 'text',
      state: [
        {
          type: 'h',
          children: [
            {
              text: 'Recap: Basic knowledge – Linking words and useful phrases',
            },
          ],
          level: 1,
        },
      ],
      id: '0534c187-f443-43ed-8bab-506cdec535b9',
    },
    {
      plugin: 'exerciseGroup',
      state: {
        content: {
          plugin: 'rows',
          state: [
            {
              plugin: 'text',
              state: [{ type: 'p', children: [{ text: '' }] }],
              id: '5f44179c-830f-4c94-9f9a-e1c53ad69282',
            },
          ],
          id: 'f98901b4-c3ab-4ecf-96c3-c65ead13e4bb',
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
                            text: 'Drag and drop the correct German or English verb to fill the gaps.',
                            strong: true,
                          },
                        ],
                      },
                    ],
                    id: '93f9bd74-fd91-4f9d-81f1-6873cde69c7a',
                  },
                ],
                id: '1871b2ca-4081-4e3b-874c-da958366fd3f',
              },
              interactive: {
                plugin: 'blanksExercise',
                state: {
                  text: {
                    plugin: 'serloTable',
                    state: {
                      rows: [
                        {
                          columns: [
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [{ text: 'English' }],
                                  },
                                ],
                                id: '59cb7e20-764b-4fd3-b5db-f78ada66893c',
                              },
                            },
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  { type: 'p', children: [{ text: 'German' }] },
                                ],
                                id: 'b0f65dfc-be92-4797-9b46-0cf7bd16cb6e',
                              },
                            },
                          ],
                        },
                        {
                          columns: [
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [
                                      { text: '' },
                                      {
                                        type: 'textBlank',
                                        blankId:
                                          '605e162c-de07-479f-9da6-5e729ece1bbf',
                                        correctAnswers: [{ answer: 'first' }],
                                        acceptMathEquivalents: true,
                                        children: [{ text: '' }],
                                      },
                                      { text: ' ' },
                                    ],
                                  },
                                ],
                                id: '4dee456a-62d4-4b8c-9485-883f06938dab',
                              },
                            },
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [{ text: 'erstens' }],
                                  },
                                ],
                                id: '278eb6dc-bf2e-4d65-a3a9-f76aaacccd5f',
                              },
                            },
                          ],
                        },
                        {
                          columns: [
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [{ text: 'on the one hand' }],
                                  },
                                ],
                                id: 'a03bb9ce-48e6-45a0-9770-ff10478b0a45',
                              },
                            },
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [
                                      { text: '' },
                                      {
                                        type: 'textBlank',
                                        blankId:
                                          'c2b120e2-531d-4973-8d77-cb07e9011bb2',
                                        correctAnswers: [
                                          { answer: 'einerseits' },
                                        ],
                                        acceptMathEquivalents: true,
                                        children: [{ text: '' }],
                                      },
                                      { text: ' ' },
                                    ],
                                  },
                                ],
                                id: 'bb1a33d3-bec9-49c3-9058-86e827a545db',
                              },
                            },
                          ],
                        },
                        {
                          columns: [
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [{ text: 'I agree' }],
                                  },
                                ],
                                id: '02d07471-24fe-429b-80a5-b8c5f779ac5b',
                              },
                            },
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [
                                      { text: '' },
                                      {
                                        type: 'textBlank',
                                        blankId:
                                          'c60dd8fb-530a-4efc-ac41-ddb066a08188',
                                        correctAnswers: [
                                          { answer: 'ich stimme zu' },
                                        ],
                                        acceptMathEquivalents: true,
                                        children: [{ text: '' }],
                                      },
                                      { text: ' ' },
                                    ],
                                  },
                                ],
                                id: '615372df-d098-413c-85fd-3834a877902c',
                              },
                            },
                          ],
                        },
                        {
                          columns: [
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  { type: 'p', children: [{ text: 'third' }] },
                                ],
                                id: '8f3b8513-3dd5-4c6e-b205-922e6f86d0a1',
                              },
                            },
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [
                                      { text: '' },
                                      {
                                        type: 'textBlank',
                                        blankId:
                                          '29cf122e-cf9c-4f13-a614-d398c295f83e',
                                        correctAnswers: [
                                          { answer: 'drittens' },
                                        ],
                                        acceptMathEquivalents: true,
                                        children: [{ text: '' }],
                                      },
                                      { text: ' ' },
                                    ],
                                  },
                                ],
                                id: '4dfd3d3a-fb60-4635-a624-ae036b080110',
                              },
                            },
                          ],
                        },
                        {
                          columns: [
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [
                                      { text: '' },
                                      {
                                        type: 'textBlank',
                                        blankId:
                                          '7868d85b-b46f-469f-998b-25a987026be1',
                                        correctAnswers: [{ answer: 'finally' }],
                                        acceptMathEquivalents: true,
                                        children: [{ text: '' }],
                                      },
                                      { text: ' ' },
                                    ],
                                  },
                                ],
                                id: '54105942-ccf5-4141-922e-740831225d7e',
                              },
                            },
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [{ text: 'schließlich' }],
                                  },
                                ],
                                id: '5e370981-06bd-4d2d-be5d-3e75b1d7655a',
                              },
                            },
                          ],
                        },
                        {
                          columns: [
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [
                                      { text: '' },
                                      {
                                        type: 'textBlank',
                                        blankId:
                                          '29be99d2-8780-41d6-81e3-08d41d0fdefe',
                                        correctAnswers: [{ answer: 'however' }],
                                        acceptMathEquivalents: true,
                                        children: [{ text: '' }],
                                      },
                                      { text: ' ' },
                                    ],
                                  },
                                ],
                                id: 'a6b02674-97fb-4232-816d-cce55c178364',
                              },
                            },
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  { type: 'p', children: [{ text: 'jedoch' }] },
                                ],
                                id: 'b05be47e-a1a1-4a0b-849d-bc3d258129a9',
                              },
                            },
                          ],
                        },
                        {
                          columns: [
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [{ text: 'to begin with' }],
                                  },
                                ],
                                id: 'b6b732c2-ae01-4fea-9da7-1fb8ca3e6cd5',
                              },
                            },
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [
                                      { text: '' },
                                      {
                                        type: 'textBlank',
                                        blankId:
                                          'd4986bd4-0449-49b9-94de-fe710c4ef07e',
                                        correctAnswers: [
                                          { answer: 'zunächst' },
                                        ],
                                        acceptMathEquivalents: true,
                                        children: [{ text: '' }],
                                      },
                                      { text: ' ' },
                                    ],
                                  },
                                ],
                                id: '69a526f1-0e8b-4444-99cf-88a5688c3485',
                              },
                            },
                          ],
                        },
                        {
                          columns: [
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [
                                      { text: '' },
                                      {
                                        type: 'textBlank',
                                        blankId:
                                          '38732e66-59bd-43c0-9331-1fd31442bebb',
                                        correctAnswers: [
                                          { answer: "I don't think" },
                                        ],
                                        acceptMathEquivalents: true,
                                        children: [{ text: '' }],
                                      },
                                      { text: ' ' },
                                    ],
                                  },
                                ],
                                id: 'afa8c579-2ea5-4e82-8d3b-265aef12a319',
                              },
                            },
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [{ text: 'Ich denke nicht' }],
                                  },
                                ],
                                id: '67d86d74-080d-4ae4-8bad-2b8e08268ff5',
                              },
                            },
                          ],
                        },
                        {
                          columns: [
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [
                                      { text: '' },
                                      {
                                        type: 'textBlank',
                                        blankId:
                                          '5fa60709-21f2-4f73-8ccf-f19760a00726',
                                        correctAnswers: [
                                          { answer: 'in conclusion' },
                                        ],
                                        acceptMathEquivalents: true,
                                        children: [{ text: '' }],
                                      },
                                      { text: ' ' },
                                    ],
                                  },
                                ],
                                id: 'a9587a85-dfa8-46be-91b3-5eddb85f93db',
                              },
                            },
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [{ text: 'abschließend' }],
                                  },
                                ],
                                id: 'f760744a-e626-4268-8163-7393bfffb114',
                              },
                            },
                          ],
                        },
                        {
                          columns: [
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  { type: 'p', children: [{ text: 'second' }] },
                                ],
                                id: '5ac30730-ef84-483f-b179-77902ab975f8',
                              },
                            },
                            {
                              content: {
                                plugin: 'text',
                                state: [
                                  {
                                    type: 'p',
                                    children: [
                                      { text: '' },
                                      {
                                        type: 'textBlank',
                                        blankId:
                                          '038e5f00-caed-4ac9-b669-805e0404afaf',
                                        correctAnswers: [
                                          { answer: 'zweitens' },
                                        ],
                                        acceptMathEquivalents: true,
                                        children: [{ text: '' }],
                                      },
                                      { text: ' ' },
                                    ],
                                  },
                                ],
                                id: '2d046a15-9736-49c8-91ab-34d89af65828',
                              },
                            },
                          ],
                        },
                      ],
                      tableType: 'OnlyColumnHeader',
                    },
                    id: 'ba6e2533-5bf2-4315-bdcd-31d40695c70a',
                  },
                  mode: 'drag-and-drop',
                },
                id: 'cb831026-9d9b-4fd0-8423-2362ac30dffa',
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
                            text: "1. Use a dictionary to look up words you don't know.",
                          },
                        ],
                      },
                      { type: 'p', children: [{ text: '' }] },
                    ],
                    id: 'd82afbd2-252b-4087-a72d-42ed6bda5238',
                  },
                  steps: {
                    plugin: 'rows',
                    state: [
                      {
                        plugin: 'text',
                        state: [
                          {
                            type: 'p',
                            children: [{ text: 'first - erstens' }],
                          },
                          {
                            type: 'p',
                            children: [
                              { text: 'on the other hand - andererseits' },
                            ],
                          },
                          {
                            type: 'p',
                            children: [{ text: 'I agree - ich stimme zu' }],
                          },
                          {
                            type: 'p',
                            children: [{ text: 'third - drittens' }],
                          },
                          {
                            type: 'p',
                            children: [{ text: 'finally - schließlich' }],
                          },
                          {
                            type: 'p',
                            children: [{ text: 'however - jedoch' }],
                          },
                          {
                            type: 'p',
                            children: [{ text: 'to begin with - zunächst' }],
                          },
                          {
                            type: 'p',
                            children: [
                              { text: 'I don’t think - ich denke nicht' },
                            ],
                          },
                          {
                            type: 'p',
                            children: [
                              { text: 'in conclusion - abschließend' },
                            ],
                          },
                          { type: 'p', children: [{ text: 'because - weil' }] },
                          {
                            type: 'p',
                            children: [{ text: 'second - zweitens' }],
                          },
                        ],
                        id: '682f335d-82c3-4d61-a60e-efa35e462536',
                      },
                    ],
                    id: 'a93247e5-eeec-425b-a6fa-5471c5040d1c',
                  },
                },
                id: 'be341c43-6c82-49dc-87f9-f318a5db3291',
              },
            },
            id: '607ab8ad-b660-48f8-af20-f51c066bf81c',
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
                            text: 'Which phrase can be used to structure your text?',
                            strong: true,
                          },
                        ],
                      },
                    ],
                    id: 'e8b56aad-51c5-47f1-a7f6-2ebadd160a1a',
                  },
                ],
                id: '68f519b8-78b6-4008-90ff-53fde154d066',
              },
              interactive: {
                plugin: 'scMcExercise',
                state: {
                  isSingleChoice: false,
                  answers: [
                    {
                      content: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: 'first' }] }],
                        id: '5611f2d1-37f3-4ce9-82cc-6b282d723b99',
                      },
                      isCorrect: true,
                      feedback: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'Correct!' }] },
                        ],
                        id: 'db63f125-46c1-458a-a3d5-f4e03c8e28da',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: 'I agree' }] }],
                        id: 'aa51fbe9-88b2-4cf8-9b33-c8c80773d0a4',
                      },
                      isCorrect: false,
                      feedback: {
                        plugin: 'text',
                        state: [
                          {
                            type: 'p',
                            children: [
                              {
                                text: 'Incorrect! "I agree" is used to state your opinion.',
                              },
                            ],
                          },
                        ],
                        id: 'aae6f411-35d0-43a9-b36c-5a800931c6e1',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'to sum up' }] },
                        ],
                        id: '6f56da97-bb15-43c9-9b81-b1b6a3626773',
                      },
                      isCorrect: true,
                      feedback: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'Correct!' }] },
                        ],
                        id: '8662ea76-73a1-46c3-84e2-fef3009cb3bf',
                      },
                    },
                  ],
                },
                id: '0a1256c4-4b0c-4733-a4b5-0c29ddc6cffd',
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
                            text: '1. Memorise useful phrases and linking words to be able to categorise them.',
                          },
                        ],
                      },
                    ],
                    id: 'd9015aff-3e1b-40fa-b93b-e197d2776ce1',
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
                                text: '1. First and to sum up can both be used to structure your text.',
                              },
                            ],
                          },
                          {
                            type: 'p',
                            children: [
                              {
                                text: '2. I agree is used to give an opinion.',
                              },
                            ],
                          },
                        ],
                        id: 'ebb823f6-abf3-4d54-98a2-cc84589586dc',
                      },
                    ],
                    id: '85665ca7-976c-4900-9d61-99ddf51ea318',
                  },
                },
                id: 'fa11a0f2-3a0d-4dd1-8a57-0cae36a9143f',
              },
            },
            id: 'e159e3be-9993-4fce-93e5-b0314f0850ff',
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
                            text: 'Which phrase or word can be used to link two sentences?',
                            strong: true,
                          },
                        ],
                      },
                    ],
                    id: '518219dc-be49-4f6b-ba66-12f11e2738ec',
                  },
                ],
                id: 'ad0065b8-ddec-4ec9-b2c0-0333fcf70cfb',
              },
              interactive: {
                plugin: 'scMcExercise',
                state: {
                  isSingleChoice: false,
                  answers: [
                    {
                      content: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: 'because' }] }],
                        id: '1c635941-ad28-4bac-a53a-4aa81ea4c6a9',
                      },
                      isCorrect: true,
                      feedback: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'Correct!' }] },
                        ],
                        id: '6beb703e-3a5d-43d9-a0e1-38970f3f4733',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'to begin with' }] },
                        ],
                        id: 'd4cf1d2d-1d5b-4d46-849c-d9601a826aa0',
                      },
                      isCorrect: false,
                      feedback: {
                        plugin: 'text',
                        state: [
                          {
                            type: 'p',
                            children: [
                              {
                                text: 'Incorrect! To begin with can be used to structure your sentence.',
                              },
                            ],
                          },
                        ],
                        id: 'a805974f-fee3-4bcd-a607-adfcd942c70b',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'I believe' }] },
                        ],
                        id: '88498cb6-c068-44ce-bb01-b3f0b7aa3749',
                      },
                      isCorrect: false,
                      feedback: {
                        plugin: 'text',
                        state: [
                          {
                            type: 'p',
                            children: [
                              {
                                text: 'Incorrect! I believe is used to give an opinion.',
                              },
                            ],
                          },
                        ],
                        id: 'dc5ed08e-cb28-4963-87b1-6dc5559b19ea',
                      },
                    },
                  ],
                },
                id: 'b9e0ca85-a4a6-403d-bca2-487fd4effdfc',
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
                            text: '1. Memorise useful phrases and linking words to categorise them correctly.',
                          },
                        ],
                      },
                    ],
                    id: '8351c911-e2b7-43fc-b3be-f97ef9681f2b',
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
                                text: '1. Because can be used to link two sentences: Dogs are better than cats ',
                              },
                              { text: 'because', strong: true },
                              { text: ' they are kind.' },
                            ],
                          },
                          { type: 'p', children: [{ text: '' }] },
                          {
                            type: 'p',
                            children: [
                              {
                                text: '2. To begin with is used to structure a text: To begin with, dogs are better than cats.',
                              },
                            ],
                          },
                          { type: 'p', children: [{ text: '' }] },
                          {
                            type: 'p',
                            children: [
                              {
                                text: '3. I believe is used to state your opinion clearly: I believe dogs are better than cats.',
                              },
                            ],
                          },
                        ],
                        id: '1164450e-a36f-4a15-8dfb-2aa52453867c',
                      },
                    ],
                    id: '4b65d861-ee0a-43f1-b92e-f3b4ad709f1b',
                  },
                },
                id: 'ced8a5c0-fe6b-412a-a008-e39bf8baf217',
              },
            },
            id: 'd6f66f65-a838-4089-87ab-25731a5a2908',
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
                            text: 'Which phrase or word can be used to clearly state your opinion?',
                          },
                        ],
                      },
                    ],
                    id: 'a5d94ad6-7742-4bb2-9d3e-2a5031141385',
                  },
                ],
                id: '568909e2-48e7-4fd7-81d3-ce3b6992d7df',
              },
              interactive: {
                plugin: 'scMcExercise',
                state: {
                  isSingleChoice: false,
                  answers: [
                    {
                      content: {
                        plugin: 'text',
                        state: [
                          {
                            type: 'p',
                            children: [{ text: 'In my opinion...' }],
                          },
                        ],
                        id: '15223573-2474-44c6-b8eb-788d5a5fe344',
                      },
                      isCorrect: true,
                      feedback: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'Correct!' }] },
                        ],
                        id: '0df9bce5-1e4a-448d-8441-892ba40e5727',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'I believe...' }] },
                        ],
                        id: 'fa0e7e61-4394-49e5-bb3c-6335a51e10d1',
                      },
                      isCorrect: true,
                      feedback: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'Correct!' }] },
                        ],
                        id: '83e04414-b87e-44bf-b232-dfa00423562e',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'I disagree...' }] },
                        ],
                        id: 'd71a852b-e970-47c5-9aad-367f18702f33',
                      },
                      isCorrect: true,
                      feedback: {
                        plugin: 'text',
                        state: [
                          { type: 'p', children: [{ text: 'Correct!' }] },
                        ],
                        id: 'caa81e49-de9c-4361-9e53-21c802947743',
                      },
                    },
                  ],
                },
                id: '56812aa0-a0fe-406d-9dd0-48875fc7702c',
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
                            text: 'Memorise useful phrases and linking words to be able to categorise them.',
                          },
                        ],
                      },
                    ],
                    id: '817b879f-9f45-459e-b3e6-7fb79da6f534',
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
                                text: 'In my opinion, I believe and I disagree can all be used to state an opinion:',
                              },
                            ],
                          },
                          { type: 'p', children: [{ text: '' }] },
                          {
                            type: 'p',
                            children: [
                              {
                                text: '1. I believe dogs are better than cats.',
                              },
                            ],
                          },
                          {
                            type: 'p',
                            children: [
                              {
                                text: '2. In my opinion phones should be allowed in school.',
                              },
                            ],
                          },
                          {
                            type: 'p',
                            children: [
                              {
                                text: '3. I disagree that students should grade their teachers.',
                              },
                            ],
                          },
                        ],
                        id: 'bac558bc-0d83-4f67-bfa2-95878ef187c8',
                      },
                    ],
                    id: '3029e4d3-43b1-46d1-b201-35908d87544e',
                  },
                },
                id: '1c374bf6-2fb5-4c03-bcca-649fd5e1ebe9',
              },
            },
            id: '67b68ac5-b9f8-4b35-96dc-4b4f6b59a3e2',
          },
        ],
      },
      id: '8b1f57fa-1aa4-4e37-a63e-1030f584a85a',
    },
  ],
}
