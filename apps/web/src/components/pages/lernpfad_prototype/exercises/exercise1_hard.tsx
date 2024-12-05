import type { ExerciseProps } from '../types'
import { BackLink } from './back-link'
import { DoneState } from './done'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

// TODO: Structure somehow

export function Exercise1Hard(props: ExerciseProps) {
  const { id, data, onSubmitClick } = props

  if (id === null) return null

  return (
    <div className="mx-auto max-w-2xl">
      <BackLink {...props} />

      <div className="flex h-full flex-col items-center justify-center">
        <h1>{data.title}</h1>
        <EditorRenderer document={editorContent1} />
        <EditorRenderer document={editorContent2} />
        <EditorRenderer document={editorContent3} />
        <EditorRenderer document={editorContent4} />
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

const editorContent1 = {
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
                      text: 'Which animal is better, cats or dogs?',
                      strong: true,
                    },
                  ],
                },
                { type: 'p', children: [{ strong: true, text: '' }] },
                {
                  type: 'p',
                  children: [
                    {
                      text: 'Read the sentences and decide if they are the beginning, the middle or an end of an opinion on the topic above.',
                    },
                  ],
                },
              ],
              id: '1ff50dfa-f529-4acd-8666-4ea7b3830d6d',
            },
          ],
          id: '223c1400-f367-49d7-b275-456135317a10',
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
                            text: '"They are like a true friend. My dog knows when I am sad and is always there for me."',
                            em: true,
                          },
                        ],
                      },
                    ],
                    id: '8134c5e0-cedb-4800-b4c9-e5cabfa62bb3',
                  },
                ],
                id: 'a2e14d51-8138-4001-b4ef-322764e236c4',
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
                          { type: 'p', children: [{ text: 'beginning' }] },
                        ],
                        id: '36e34ba3-5180-4252-936c-aa3f9ed4917c',
                      },
                      isCorrect: false,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: 'd71f622a-63c8-4819-a0c8-22feff923dd8',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: 'middle' }] }],
                        id: 'e1968600-49b8-4eeb-9e88-0f84d1798ba4',
                      },
                      isCorrect: true,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: 'f0566899-be70-4ffb-a39e-08a84bad0d55',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: 'end' }] }],
                        id: '30a6c429-5b6c-4c44-8476-c1083eee4eaa',
                      },
                      isCorrect: false,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: 'a768a8e8-510d-4e67-942d-6068a2fdb92c',
                      },
                    },
                  ],
                },
                id: '7443c9e1-cf40-4f93-bea3-cc8f696ba3f8',
              },
              solution: {
                plugin: 'solution',
                state: {
                  strategy: {
                    plugin: 'text',
                    state: [
                      {
                        children: [
                          {
                            children: [
                              {
                                type: 'list-item-child',
                                children: [{ text: 'Read each sentence.' }],
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
                                    text: 'Identify vocabulary or useful phrases that are typical for beginning, middle or end.',
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
                                children: [{ text: 'Decide on your answer.' }],
                              },
                            ],
                            type: 'list-item',
                          },
                        ],
                        type: 'ordered-list',
                      },
                    ],
                    id: 'b57bb295-f5eb-4ee0-a710-f50a7f1da9aa',
                  },
                  steps: {
                    plugin: 'rows',
                    state: [
                      {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: '3edaca1b-3261-46d1-8cdb-dabbb01288d3',
                      },
                    ],
                    id: '152fdd8e-9cf1-4787-820e-5ce64bf6a063',
                  },
                },
                id: 'b56320c9-c693-4ef7-b90f-134a5a87b69d',
              },
            },
            id: 'a2cfeba6-1fdf-439c-bb5e-06cc0ee71d75',
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
                            text: '"In my opinion dogs are better than cats."',
                            em: true,
                          },
                        ],
                      },
                    ],
                    id: '59952101-0b20-43e2-b9e4-513ad4a7d83c',
                  },
                ],
                id: '2e9e13b1-a54b-4ae0-9c3a-8b15ed750fd6',
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
                          { type: 'p', children: [{ text: 'beginning' }] },
                        ],
                        id: 'a01d317f-ea95-4c1e-ac0d-17107bbbe1f6',
                      },
                      isCorrect: true,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: '1885a384-af19-4a34-9815-e53865357f57',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: 'middle' }] }],
                        id: '2fe5be9b-7c4b-4f2c-bc16-5646637093d3',
                      },
                      isCorrect: false,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: '093157e0-f49a-4f80-a4d0-be9a4347ffa5',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: 'end' }] }],
                        id: '8da8fba3-a97b-4002-87e0-aafb86106f38',
                      },
                      isCorrect: false,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: 'ef78b9f5-eb6a-4713-a317-600a16313999',
                      },
                    },
                  ],
                },
                id: 'e1762e6a-98c4-4047-804a-6e7adcd9d5a4',
              },
            },
            id: 'd098df78-526f-4eed-8081-e08cb14aae98',
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
                            text: '"To sum up, dogs are more loyal than cats."',
                            em: true,
                          },
                        ],
                      },
                    ],
                    id: '1627e080-f3e6-4059-a178-52e9e02c4c95',
                  },
                ],
                id: '1f1fde62-11ae-483c-9acd-d6586a593eca',
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
                          { type: 'p', children: [{ text: 'beginning' }] },
                        ],
                        id: '453edd32-8d51-425b-9e38-2270cabb85ee',
                      },
                      isCorrect: false,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: 'bee8df14-b2ef-44fa-918c-2cd50d767f0c',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: 'middle' }] }],
                        id: '8f012311-8bc7-4e43-b650-ab68aa992774',
                      },
                      isCorrect: false,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: '833a5270-84fb-415d-bbab-6a91f256af72',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: 'end' }] }],
                        id: '41f35f5c-747c-4e07-856b-26f858374fa3',
                      },
                      isCorrect: true,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: '6eea7348-7dc7-494b-84b7-3bd9f2a020cf',
                      },
                    },
                  ],
                },
                id: 'de20f769-0925-4fd9-8c31-f5f0af569757',
              },
            },
            id: 'b100af2a-3f9c-4b25-9e5f-8c0ee32408ab',
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
                            text: '"Cats on the other hand are only nice when they want to be nice. They often scratch you."',
                            em: true,
                          },
                        ],
                      },
                    ],
                    id: 'd211bc3f-b56b-44a4-b970-bb2a8f36d655',
                  },
                ],
                id: 'ec74c72d-cc1a-4f3e-aa5c-07478ce4225b',
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
                          { type: 'p', children: [{ text: 'beginning' }] },
                        ],
                        id: '7a0a357c-cbf6-4df7-9444-b8f44a00dd52',
                      },
                      isCorrect: false,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: 'e3458fbe-bc7d-42ef-af1c-1e8768aca313',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: 'middle' }] }],
                        id: '4c73340f-73e7-41b5-a772-7f6daf68afe6',
                      },
                      isCorrect: true,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: '49501c29-41b3-4bd6-a2e0-4fe0a19c7312',
                      },
                    },
                    {
                      content: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: 'end' }] }],
                        id: '7d8abb83-5288-46ef-94fb-27a3ae1ad4ee',
                      },
                      isCorrect: false,
                      feedback: {
                        plugin: 'text',
                        state: [{ type: 'p', children: [{ text: '' }] }],
                        id: '57e2cac3-c034-41ec-95b3-c90b1bb9133a',
                      },
                    },
                  ],
                },
                id: 'e3e61cdb-2419-4350-8b42-2f05b1a249a1',
              },
            },
            id: '59b96f43-d2b6-4695-af40-991cb926b7c7',
          },
        ],
      },
      id: 'b74c2c23-a516-48e5-a3d2-aca378d567c4',
    },
  ],
}
const editorContent2 = {
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
                      text: 'Read the following opinion on “Fast food is the best type of food.” ',
                      strong: true,
                    },
                  ],
                },
                {
                  type: 'p',
                  children: [
                    {
                      text: 'and drag and drop the different sentences in the right category:',
                      strong: true,
                    },
                  ],
                },
                {
                  children: [
                    {
                      children: [
                        {
                          type: 'list-item-child',
                          children: [{ text: 'the beginning ' }],
                        },
                      ],
                      type: 'list-item',
                    },
                    {
                      children: [
                        {
                          type: 'list-item-child',
                          children: [{ text: 'the middle ' }],
                        },
                      ],
                      type: 'list-item',
                    },
                    {
                      children: [
                        {
                          type: 'list-item-child',
                          children: [{ text: 'the ending' }],
                        },
                      ],
                      type: 'list-item',
                    },
                  ],
                  type: 'unordered-list',
                },
              ],
              id: '8e7472b7-174d-4776-9ddb-ff4e04bbc5f5',
            },
          ],
          id: 'd3a0c8e5-b294-4c81-84b1-675401894bc8',
        },
        interactive: {
          plugin: 'dropzoneImage',
          state: {
            answerZones: [
              {
                id: 'answerZone-0',
                name: 'Beginning',
                position: { top: 0.01, left: 0.01 },
                layout: { width: 0.9783, height: 0.24 },
                answers: [
                  {
                    id: 'f573812c-cc6a-45ed-a01a-9a6f83385753',
                    image: {
                      plugin: 'image',
                      state: { src: '' },
                      id: 'f31e3bc6-1a85-4156-a4ab-8ddabc552af9',
                    },
                    text: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'I disagree that fast food is the best type of food.',
                            },
                          ],
                        },
                      ],
                      id: '2eec9787-6c4e-4735-af9a-dbdad265c5af',
                    },
                  },
                ],
              },
              {
                id: 'answerZone-3',
                name: 'Middle',
                position: { top: 0.265, left: 0.0083 },
                layout: { width: 0.9766, height: 0.425 },
                answers: [
                  {
                    id: 'b6645086-5773-41b7-90ac-3c72b25c1539',
                    image: {
                      plugin: 'image',
                      state: { src: '' },
                      id: '86254cb3-2ffb-42d9-8649-4df8ff11a257',
                    },
                    text: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'Sure, it’s tasty and easy to get, but it’s not very healthy.',
                            },
                          ],
                        },
                      ],
                      id: '39b7550b-cd77-436b-a5c2-a0c78540da6c',
                    },
                  },
                  {
                    id: '382c075f-789e-4ad6-8018-63eb4bc1cc5e',
                    image: {
                      plugin: 'image',
                      state: { src: '' },
                      id: '709806de-ddd3-495d-9a6a-4d8a702b4bee',
                    },
                    text: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'Eating too much fast food can make you feel tired and sick because it has a lot of fat and sugar. ',
                            },
                          ],
                        },
                      ],
                      id: 'b7523576-00c8-4462-b20a-ab5653308b42',
                    },
                  },
                  {
                    id: '718a8355-dd71-4846-ae0a-eba764ede164',
                    image: {
                      plugin: 'image',
                      state: { src: '' },
                      id: '00604459-89f2-41f3-9808-a8ee03e89c33',
                    },
                    text: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'I believe fresh food is better because it’s healthier and you can make it exactly how you like.',
                            },
                          ],
                        },
                      ],
                      id: 'ca6ac498-2e74-4a76-9bbd-c10fd3f267a2',
                    },
                  },
                ],
              },
              {
                id: 'answerZone-2',
                name: 'End',
                position: { top: 0.7025, left: 0.01 },
                layout: { width: 0.9783, height: 0.2675 },
                answers: [
                  {
                    id: '95db220e-e1b9-496c-af0d-597ff1856679',
                    image: {
                      plugin: 'image',
                      state: { src: '' },
                      id: '648bbfd4-0ae9-4816-9af6-73e7a1553f6f',
                    },
                    text: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'In conclusion, fast food is okay sometimes, but it’s not the best.',
                            },
                          ],
                        },
                      ],
                      id: '55f8344d-ab02-4675-a09c-683611a7444f',
                    },
                  },
                ],
              },
            ],
            canvasShape: 'landscape',
            canvasDimensions: { height: 400, width: 600 },
            backgroundType: 'blank',
            dropzoneVisibility: 'full',
            extraDraggableAnswers: [],
          },
          id: '30082f98-3309-40fd-8375-b9eb30b7798d',
        },
        solution: {
          plugin: 'solution',
          state: {
            strategy: {
              plugin: 'text',
              state: [
                {
                  children: [
                    {
                      children: [
                        {
                          type: 'list-item-child',
                          children: [{ text: 'Read each sentence.' }],
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
                              text: 'Identify vocabulary or useful phrases that are typical for beginning, middle or end.',
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
                          children: [{ text: 'Decide on your answer.' }],
                        },
                      ],
                      type: 'list-item',
                    },
                  ],
                  type: 'ordered-list',
                },
              ],
              id: 'f12589a8-e16e-4a5a-8d04-692ceeba9648',
            },
            steps: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                  id: '106dd678-2311-4fd7-a7ad-69062e8f4de6',
                },
              ],
              id: 'a74219cb-82a4-4c9b-926b-c917c3c7bbd4',
            },
          },
          id: 'c726d65d-cec0-4227-9191-ebc52e0ebf03',
        },
      },
      id: '2301260e-018d-41f6-983a-e21397950f79',
    },
  ],
}
const editorContent3 = {
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
                      text: 'Put the following opinion in the correct order.',
                      strong: true,
                    },
                  ],
                },
                {
                  type: 'p',
                  children: [
                    {
                      strong: true,
                      text: 'Remember to follow the structure beginning, middle and end.',
                    },
                  ],
                },
                { type: 'p', children: [{ strong: true, text: '' }] },
                {
                  type: 'p',
                  children: [
                    { text: '"Should school start later in the morning?"' },
                  ],
                },
              ],
              id: 'd422cb9b-8987-4182-8c42-0928da19a3e0',
            },
          ],
          id: 'afa72aa2-a9e8-40c3-be21-8fd004f76005',
        },
        interactive: {
          plugin: 'dropzoneImage',
          state: {
            answerZones: [
              {
                id: 'answerZone-0',
                name: '1.',
                position: { top: 0.02, left: 0.0167 },
                layout: { width: 0.96, height: 0.17 },
                answers: [
                  {
                    id: '220f33a0-a7a4-4813-96f4-3b4d6b2f69ff',
                    image: {
                      plugin: 'image',
                      state: { src: '' },
                      id: 'd49ececd-8e32-4d63-92c6-12bcb7622b18',
                    },
                    text: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'I think school should start later in the morning because many students are very tired when lessons begin.',
                            },
                          ],
                        },
                      ],
                      id: 'b7cc09b3-adef-4ccf-9194-4824ccffe1b5',
                    },
                  },
                ],
              },
              {
                id: 'answerZone-1',
                name: '2.',
                position: { top: 0.205, left: 0.0167 },
                layout: { width: 0.9599, height: 0.1725 },
                answers: [
                  {
                    id: '074c185f-4b42-4f38-ba26-42133f10d914',
                    image: {
                      plugin: 'image',
                      state: { src: '' },
                      id: '6516e1ac-e13b-4d73-b182-427de1e46614',
                    },
                    text: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'To begin with if school started at 9 instead of 8, students would get more sleep.',
                            },
                          ],
                        },
                      ],
                      id: '7020ff98-572a-45af-a937-9c472e64dc3a',
                    },
                  },
                ],
              },
              {
                id: 'answerZone-2',
                name: '3.',
                position: { top: 0.39, left: 0.015 },
                layout: { width: 0.9583, height: 0.17 },
                answers: [
                  {
                    id: 'fc67b941-ec91-4bfe-87fd-471db02ddf41',
                    image: {
                      plugin: 'image',
                      state: { src: '' },
                      id: '354a5027-73c6-4570-bfe1-bb6e0ec9b204',
                    },
                    text: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'Second in addition they would be able to focus better.',
                            },
                          ],
                        },
                      ],
                      id: 'b604c4ea-8151-4eb3-84d8-411ad9143892',
                    },
                  },
                ],
              },
              {
                id: 'answerZone-3',
                name: '4.',
                position: { top: 0.575, left: 0.015 },
                layout: { width: 0.9617, height: 0.17 },
                answers: [
                  {
                    id: 'c4c23b6f-9360-42c9-a428-0d05e2426076',
                    image: {
                      plugin: 'image',
                      state: { src: '' },
                      id: '900df518-2d85-4ae5-b8e7-7fb8c0649564',
                    },
                    text: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'Third mornings would feel less rushed, which could reduce stress.',
                            },
                          ],
                        },
                      ],
                      id: '876ab059-ef84-4845-a948-ce9d415b54ff',
                    },
                  },
                ],
              },
              {
                id: 'answerZone-4',
                name: '5.',
                position: { top: 0.7625, left: 0.015 },
                layout: { width: 0.9617, height: 0.17 },
                answers: [
                  {
                    id: 'f9dc4a66-ec60-4bd8-b00f-6cc430e5787f',
                    image: {
                      plugin: 'image',
                      state: { src: '' },
                      id: '275da57b-063c-47e6-a10b-b083f932643e',
                    },
                    text: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'To sum up, starting school later would help students learn better and feel healthier. It’s a simple change that could make a big difference for everyone.',
                            },
                          ],
                        },
                      ],
                      id: 'a3a8d14c-4cdd-4028-af23-204587fde60d',
                    },
                  },
                ],
              },
            ],
            canvasShape: 'landscape',
            canvasDimensions: { height: 400, width: 600 },
            backgroundType: 'blank',
            dropzoneVisibility: 'full',
            extraDraggableAnswers: [],
          },
          id: 'f3fd52d1-1543-45d9-819f-953b78024ea2',
        },
        solution: {
          plugin: 'solution',
          state: {
            strategy: {
              plugin: 'text',
              state: [{ type: 'p', children: [{ text: '' }] }],
              id: '80c63f42-62ab-4930-8957-a011b20b6346',
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
                        { text: 'Should school start later in the morning?' },
                      ],
                    },
                    { type: 'p', children: [{ text: '' }] },
                    {
                      children: [
                        {
                          children: [
                            {
                              type: 'list-item-child',
                              children: [
                                {
                                  text: 'I think school should start later in the morning because many students are very tired when lessons begin.',
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
                                {
                                  text: 'To begin with if school started at 9 instead of 8, students would get more sleep.',
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
                                {
                                  text: 'Second in addition they would be able to focus better. ',
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
                                {
                                  text: 'Third mornings would feel less rushed, which could reduce stress.',
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
                                {
                                  text: 'To sum up, starting school later would help students learn better and feel healthier. It’s a simple change that could make a big difference for everyone.',
                                },
                              ],
                            },
                          ],
                          type: 'list-item',
                        },
                      ],
                      type: 'ordered-list',
                    },
                  ],
                  id: '45be4132-26a6-44b9-abea-5534c5e3c552',
                },
              ],
              id: 'db40496f-b16c-4f56-b9f6-0ab8a8212917',
            },
          },
          id: '01ef821b-ed1a-4caf-8f1b-81477e77b86f',
        },
      },
      id: '7c9496e0-e11f-4d70-84cc-3de025169620',
    },
  ],
}
const editorContent4 = {
  plugin: 'rows',
  state: [
    {
      plugin: 'text',
      state: [
        {
          type: 'p',
          children: [
            {
              text: 'Task 2: Read the given opinion on whether students should grade their teachers and fill in the gaps.',
              strong: true,
            },
          ],
        },
      ],
      id: '6597b7e6-fd04-4b33-b79d-bca850284056',
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
              id: 'b292d5d1-513f-4f55-a47c-ca1a021f451f',
            },
          ],
          id: '17e12ea3-2790-4cea-88a7-2a576b41c69f',
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
                { type: 'p', children: [{ text: '' }] },
                {
                  type: 'p',
                  children: [
                    { text: 'Many people say students should grade their ' },
                    {
                      type: 'textBlank',
                      blankId: '3ba4124a-772e-41bd-9456-6670ed7eefab',
                      correctAnswers: [{ answer: 'teachers' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: '. ' },
                    {
                      type: 'textBlank',
                      blankId: 'bb3634e2-3cb5-494c-8bb1-d66b57b2765a',
                      correctAnswers: [
                        { answer: 'On the one hand' },
                        { answer: 'To begin with' },
                        { answer: 'First' },
                      ],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ', I think it is only fair ' },
                    {
                      type: 'textBlank',
                      blankId: '119dd1ac-3a2a-4c4d-b04a-758d8d2984c2',
                      correctAnswers: [
                        { answer: 'because' },
                        { answer: 'as' },
                        { answer: 'due to the fact that' },
                      ],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' teachers give ' },
                    {
                      type: 'textBlank',
                      blankId: '9375736c-8a10-4769-a336-c5164a410ed5',
                      correctAnswers: [{ answer: 'grades' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    {
                      text: ' to their students all the time. Students want to know what teachers think about them and their work, ',
                    },
                    {
                      type: 'textBlank',
                      blankId: 'c2c68e57-46e7-49d2-a278-508342e3acfa',
                      correctAnswers: [
                        { answer: 'so' },
                        { answer: 'which means' },
                        { answer: 'hence' },
                        { answer: 'therefore' },
                      ],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    {
                      text: ' it is also useful for teachers if they know what ',
                    },
                    {
                      type: 'textBlank',
                      blankId: 'b669d6f6-b235-4607-bd1f-868f8e251d99',
                      correctAnswers: [{ answer: 'opinion' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' their students have of them. ' },
                    {
                      type: 'textBlank',
                      blankId: '9d636cdd-68f5-4cf4-aa92-7fc2358e54a7',
                      correctAnswers: [
                        { answer: 'Second' },
                        { answer: 'Next' },
                        { answer: 'In addition' },
                        { answer: 'Also' },
                        { answer: 'Besides' },
                      ],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ', teachers will try harder to get ' },
                    {
                      type: 'textBlank',
                      blankId: '973f5014-da93-4329-837f-94de53d4f89d',
                      correctAnswers: [
                        { answer: 'better' },
                        { answer: 'higher' },
                      ],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' grades ' },
                    {
                      type: 'textBlank',
                      blankId: 'e287008d-147b-49b3-ae49-e6236ee11a0e',
                      correctAnswers: [
                        { answer: 'and' },
                        { answer: 'so' },
                        { answer: 'therefore' },
                        { answer: 'hence' },
                      ],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' ' },
                    {
                      type: 'textBlank',
                      blankId: '089051e6-af3c-4f3a-89ca-caee0cf21291',
                      correctAnswers: [
                        { answer: 'lessons' },
                        { answer: 'school' },
                        { answer: 'teaching' },
                      ],
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
                      blankId: 'e4823416-f67d-4815-b308-798a8c13c0f9',
                      correctAnswers: [
                        { answer: 'On the other hand' },
                        { answer: 'However' },
                        { answer: 'That said' },
                        { answer: 'But' },
                        { answer: 'Despite that' },
                      ],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    {
                      text: ', students don’t really know everything about a teacher’s job. ',
                    },
                    {
                      type: 'textBlank',
                      blankId: '04308061-1118-4d7f-af17-dbd6fd77d0b5',
                      correctAnswers: [{ answer: 'For example' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ', teachers spend a lot of time ' },
                    {
                      type: 'textBlank',
                      blankId: '5991e39e-b934-4e1f-9e65-93f5aa2458e5',
                      correctAnswers: [{ answer: 'planning' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' lessons and doing things students don’t see, ' },
                    {
                      type: 'textBlank',
                      blankId: '30990618-7226-4f00-a5ee-f3ee40f429cd',
                      correctAnswers: [
                        { answer: 'so' },
                        { answer: 'therefore' },
                        { answer: 'consequently' },
                      ],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' their grades ' },
                    {
                      type: 'textBlank',
                      blankId: '2efb43d5-c538-42ab-8c1f-1b22b78f8927',
                      correctAnswers: [{ answer: 'might' }],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' not be fair.' },
                  ],
                },
                {
                  type: 'p',
                  children: [
                    { text: '' },
                    {
                      type: 'textBlank',
                      blankId: 'a0c34999-262c-4c3b-925d-0e8eba92e9a4',
                      correctAnswers: [
                        { answer: 'In conclusion' },
                        { answer: 'To sum up' },
                        { answer: 'To conclude' },
                        { answer: 'On a final note' },
                        { answer: 'Finally' },
                      ],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    {
                      text: ', students shouldn’t grade their teachers, but it would be a good idea for students to give them ',
                    },
                    {
                      type: 'textBlank',
                      blankId: '380c1983-1532-4fd0-a769-f0906050a55d',
                      correctAnswers: [
                        { answer: 'feedback' },
                        { answer: 'input' },
                      ],
                      acceptMathEquivalents: true,
                      children: [{ text: '' }],
                    },
                    { text: ' instead.' },
                  ],
                },
              ],
              id: '73c95bc4-df05-40bf-af84-d491e437f06a',
            },
            mode: 'typing',
          },
          id: '1ee17567-81ac-4eda-9477-65719816443e',
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
                      text: '2. Read it again and try to come up with vocabulary for each gap. ',
                    },
                  ],
                },
                {
                  type: 'p',
                  children: [
                    {
                      text: '3. Sometimes you need just one word and sometimes a whole phrase.',
                    },
                  ],
                },
                {
                  type: 'p',
                  children: [
                    {
                      text: '4. The vocabulary you choose needs to fit the content, but also the sentence structure.',
                    },
                  ],
                },
              ],
              id: '30736429-e348-4f92-a8ac-ce578ec2e253',
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
                          text: 'Here is a possible solution. Gaps are written in ',
                        },
                        { text: 'bold print', strong: true },
                        {
                          text: '. Of course in some gaps you can use several other words that make sense:',
                        },
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
                        { text: ' teachers give ' },
                        { text: 'grades', strong: true },
                        {
                          text: ' to their students all the time. Students want to know what teachers think about them and their work, ',
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
                        { text: ', teachers will try harder to get ' },
                        { text: 'better', strong: true },
                        { text: ' grades and ' },
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
                          text: ' lessons and doing things students don’t see, ',
                        },
                        { text: 'so', strong: true },
                        { text: ' their grades ' },
                        { text: 'might', strong: true },
                        { text: ' not be fair.' },
                      ],
                    },
                    {
                      type: 'p',
                      children: [
                        { text: 'In conclusion', strong: true },
                        {
                          text: ', students shouldn’t grade their teachers, but it would be a good idea for students to give them ',
                        },
                        { text: 'feedback', strong: true },
                        { text: ' instead.' },
                      ],
                    },
                    { type: 'p', children: [{ text: '' }] },
                  ],
                  id: '6c38e420-61b0-45e0-afc2-feea5c1e640f',
                },
              ],
              id: 'f3b8ad7e-0920-45fd-9c6b-20ce2e7331cb',
            },
          },
          id: '6fa45589-2a23-49cd-a556-010d0087f035',
        },
      },
      id: 'b164f189-dea4-48c9-b0fd-5e3b7b921146',
    },
  ],
}
