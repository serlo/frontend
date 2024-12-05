import type { ExerciseProps } from '../types'
import { BackLink } from './back-link'
import { DoneState } from './done'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

export function Extra2(props: ExerciseProps) {
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
              text: 'Extra: Knowing and recognising criteria for opinion writing in texts',
            },
          ],
          level: 3,
        },
        { type: 'p', children: [{ text: '' }] },
        {
          type: 'p',
          children: [
            {
              strong: true,
              text: 'First read the evaluation criteria for opinion writing:',
            },
          ],
        },
        {
          children: [
            {
              children: [
                {
                  type: 'list-item-child',
                  children: [
                    {
                      text: 'The text has a title that fits the content and is interesting.',
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
                      text: 'The text is structured in beginning, middle, end.',
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
                  children: [{ text: 'The opinion is clearly stated.' }],
                },
              ],
              type: 'list-item',
            },
            {
              children: [
                {
                  type: 'list-item-child',
                  children: [{ text: 'Reasons are given for the opinion.' }],
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
                      text: 'Bonus: The text includes another argument that does not support the opinion.',
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
                      text: 'A variety of linking words (for example: because, but, and, when, as, although etc.) is used.',
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
                      text: "The text is understandable and doesn't contain many spelling or grammatical mistakes.",
                    },
                  ],
                },
              ],
              type: 'list-item',
            },
          ],
          type: 'unordered-list',
        },
        { type: 'p', children: [{ strong: true, text: '' }] },
      ],
      id: 'cb944ce5-6225-47fa-8281-c022a7497509',
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
                      text: 'Read the opinion below and judge whether it fulfills each criteria for opinion.',
                      strong: true,
                    },
                  ],
                },
              ],
              id: '6b2cd55e-4366-4103-a8e0-cc2a61faf466',
            },
            {
              plugin: 'box',
              state: {
                type: 'blank',
                title: {
                  plugin: 'text',
                  state: [
                    {
                      type: 'h',
                      children: [{ text: 'Mobile Phones in School?' }],
                      level: 3,
                    },
                  ],
                  id: '10c06204-82de-4575-b93e-56f4e7bc7fe4',
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
                              text: 'Handys can be very helpfull for learning, but they also disturbed the teaching.',
                            },
                          ],
                        },
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'We can use them to gogle informations or do research for projects and we can use them to call our parents. Phones can also make problems. Many students use them to play games or send whatsapps with friends. They don’t pay attention in class. This can disturb the lessons and make it harder to learn. Some students might feel bad. They doesn’t have the newest phone.',
                            },
                          ],
                        },
                        {
                          type: 'p',
                          children: [
                            {
                              text: 'In my opinion, mobile phones should only be allowed during breaks or for schoolworks when the teacher say it’s okay. This way, we can use them for god things.',
                            },
                          ],
                        },
                      ],
                      id: '58d311bd-df6a-4fba-a8b4-c22ff548e9b7',
                    },
                  ],
                  id: '28e1feed-48a3-4971-b712-38d34341865d',
                },
              },
              id: '4333a8ba-c16c-4ed9-905a-e238ec334791',
            },
            {
              plugin: 'text',
              state: [
                {
                  type: 'p',
                  children: [
                    { text: 'Tick the fulfilled criteria:', strong: true },
                  ],
                },
              ],
              id: 'd42de916-f104-4380-9869-5fa8f58252d3',
            },
          ],
          id: '4cf5e76b-c175-46f2-b4eb-b00fb119edf1',
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
                      children: [
                        {
                          text: 'The text has a title that is interesting and fits the content.',
                        },
                      ],
                    },
                  ],
                  id: '1f0d24b9-5687-4be8-b2d5-16ee1d258112',
                },
                isCorrect: false,
                feedback: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                  id: '15ba4375-a9a4-43a0-a652-9399f9746f05',
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
                          text: 'The text is structured in beginning, middle, end.',
                        },
                      ],
                    },
                  ],
                  id: '604eb2ff-33ee-4fb5-b538-a80ded79a799',
                },
                isCorrect: true,
                feedback: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                  id: '0de1219b-8165-49b1-8ad7-9045dd90730c',
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
                          text: 'The opinion is clearly stated in the beginning.',
                        },
                      ],
                    },
                  ],
                  id: '61510b71-bf8a-4bd1-bd69-46989ec90f41',
                },
                isCorrect: false,
                feedback: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                  id: '9440d732-390a-464f-9606-3e9006a6fa37',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [
                    {
                      type: 'p',
                      children: [
                        { text: 'Reasons are given for the opinion.' },
                      ],
                    },
                  ],
                  id: 'b4f6a2d5-7cda-4b9a-81fa-9e6fd620cafc',
                },
                isCorrect: true,
                feedback: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                  id: '50f43a56-79ec-4f21-a619-229725e37f5f',
                },
              },
              {
                content: {
                  plugin: 'text',
                  state: [
                    {
                      type: 'p',
                      children: [
                        { text: 'The text finishes with a conclusion.' },
                      ],
                    },
                  ],
                  id: '7e75c680-bd7e-4055-b4ca-ebd8a12017e5',
                },
                isCorrect: true,
                feedback: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                  id: '771702b9-7611-4cec-8266-34b5a93850c3',
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
                          text: 'Bonus: Your text includes another argument that does not support your opinion.',
                        },
                      ],
                    },
                  ],
                  id: 'eb6c5581-3e50-48aa-bfc2-0da7eb50d5c8',
                },
                isCorrect: true,
                feedback: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                  id: '5f1b4b16-feda-495a-80dd-af1a729c556e',
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
                          text: 'A variety of linking words is used (for example: because, but, and, when, as, although etc.)',
                        },
                      ],
                    },
                  ],
                  id: 'd9197e2e-015a-45c0-823d-9c8f03632faf',
                },
                isCorrect: false,
                feedback: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                  id: 'bd1dc79e-375b-40ea-8877-4c2e86c8c85a',
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
                          text: 'The text is understandable and doesn’t contain spelling or grammatical mistakes.',
                        },
                      ],
                    },
                  ],
                  id: '2826b502-1414-4297-a4b9-6d3b946487ed',
                },
                isCorrect: false,
                feedback: {
                  plugin: 'text',
                  state: [{ type: 'p', children: [{ text: '' }] }],
                  id: '814683b7-f0be-40de-91a7-e2a37b539f7d',
                },
              },
            ],
          },
          id: '35700d95-27ac-4b08-82d8-1c4e76625749',
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
                          children: [
                            {
                              text: 'Read the evaluation criteria and familiarise yourself with it.',
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
                              text: 'Read the text on “Should mobile phones be allowed in school?” and check for each evaluation criteria.',
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
                              text: 'Decide if the criteria is fulfilled, partly fulfilled but could be improved, or isn’t fulfilled.',
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
              id: '5a04c758-71bf-4c28-981b-cf5893d5240e',
            },
            steps: {
              plugin: 'rows',
              state: [
                {
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
                                  children: [{ text: 'Evaluation Criteria' }],
                                },
                              ],
                              id: '6e32329b-0a42-47df-9123-8976f94bd18a',
                            },
                          },
                          {
                            content: {
                              plugin: 'text',
                              state: [
                                {
                                  type: 'p',
                                  children: [{ text: 'fulfilled' }],
                                },
                              ],
                              id: 'b3844dfa-1420-4cfe-904b-950f573cbc46',
                            },
                          },
                          {
                            content: {
                              plugin: 'text',
                              state: [
                                {
                                  type: 'p',
                                  children: [{ text: 'Explanation' }],
                                },
                              ],
                              id: '3cbc9445-05b9-45df-b06b-a072c341a7e4',
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
                                    {
                                      text: 'The text has a title that is interesting and fits the content.',
                                    },
                                  ],
                                },
                              ],
                              id: '29f39bd5-bde9-4aef-9e03-5aa558ad74d4',
                            },
                          },
                          {
                            content: {
                              plugin: 'text',
                              state: [
                                { type: 'p', children: [{ text: '❌' }] },
                              ],
                              id: '7f5e0046-45eb-4ae7-a647-210542f76764',
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
                                      text: 'The title fits, but isn’t that interesting.',
                                    },
                                  ],
                                },
                              ],
                              id: 'f355bf31-0156-4d7d-9e4a-eceeec109a1b',
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
                                    {
                                      text: 'The text is structured in beginning, middle, end.',
                                    },
                                  ],
                                },
                              ],
                              id: 'd11e6914-808a-42e0-b431-fe576a36888e',
                            },
                          },
                          {
                            content: {
                              plugin: 'text',
                              state: [
                                { type: 'p', children: [{ text: '✅' }] },
                              ],
                              id: '8b7ccf97-9493-49dc-8085-89798be9cb51',
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
                                      text: 'There is sort of an introduction, a middle and an end. By using more useful phrases the structure could be made clearer.',
                                    },
                                  ],
                                },
                              ],
                              id: 'bc3727a7-d395-42b8-bb64-a88350717863',
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
                                    {
                                      text: 'The opinion is clearly stated in the beginning.',
                                    },
                                  ],
                                },
                              ],
                              id: 'f2327402-8432-45cd-97d8-15f1c886237e',
                            },
                          },
                          {
                            content: {
                              plugin: 'text',
                              state: [
                                { type: 'p', children: [{ text: '❌' }] },
                              ],
                              id: '15984163-36a7-4012-992f-7e1d21481d1d',
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
                                      text: 'Only one positive and one negative aspect about phones in schools are mentioned, but not the opinion.',
                                    },
                                  ],
                                },
                              ],
                              id: '6ed4d896-e276-49ad-af8b-3f423b25ee64',
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
                                    {
                                      text: 'Reasons are given for the opinion.',
                                    },
                                  ],
                                },
                              ],
                              id: '1bc0bf83-a28f-4d1c-9439-fdb5251044b2',
                            },
                          },
                          {
                            content: {
                              plugin: 'text',
                              state: [
                                { type: 'p', children: [{ text: '✅' }] },
                              ],
                              id: '2bed65ba-6a95-405a-8ae2-674f96bdabff',
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
                                      text: 'For example: Mobile phones can be helpful for learning. They can be used to google information for projects.',
                                    },
                                  ],
                                },
                              ],
                              id: '7aebcce5-5224-4503-b0c2-94ef9001a059',
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
                                    {
                                      text: 'The text finishes with a conclusion.',
                                    },
                                  ],
                                },
                              ],
                              id: '4c6948d3-58f2-44f5-b606-faddc4691021',
                            },
                          },
                          {
                            content: {
                              plugin: 'text',
                              state: [
                                { type: 'p', children: [{ text: '✅' }] },
                              ],
                              id: '2763d1f1-d353-4d5c-81ae-915a0b194d09',
                            },
                          },
                          {
                            content: {
                              plugin: 'text',
                              state: [
                                {
                                  type: 'p',
                                  children: [{ text: 'The last paragraph.' }],
                                },
                              ],
                              id: 'dc58c281-16d9-44aa-aad0-58e709ba7801',
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
                                    {
                                      text: 'Bonus: Your text includes another argument that does not support your opinion.',
                                    },
                                  ],
                                },
                              ],
                              id: '5b2526be-ae60-4c9d-939d-4902ddec476a',
                            },
                          },
                          {
                            content: {
                              plugin: 'text',
                              state: [
                                { type: 'p', children: [{ text: '✅' }] },
                              ],
                              id: '1a318d87-cbc0-4dd2-a757-f3dcdca7bbeb',
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
                                      text: 'Arguments for and against phones in school are listed.',
                                    },
                                  ],
                                },
                              ],
                              id: '587448d8-32c0-47be-8132-476825761597',
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
                                    {
                                      text: 'A variety of linking words is used (for example: because, but, and, when, as, although etc.)',
                                    },
                                  ],
                                },
                              ],
                              id: '14af732e-f586-4868-91ec-c1ee24f0a71f',
                            },
                          },
                          {
                            content: {
                              plugin: 'text',
                              state: [
                                { type: 'p', children: [{ text: '❌' }] },
                              ],
                              id: '6b04dc66-a0be-400c-bef1-c5c529114a0b',
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
                                      text: 'Some linking words like “but, or, and” are used. Longer and more difficult ones are not.',
                                    },
                                  ],
                                },
                              ],
                              id: '23b0a7bf-acc3-4cde-a479-9c8104ea72d2',
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
                                    {
                                      text: 'The text is understandable and doesn’t contain spelling or grammatical mistakes.',
                                    },
                                  ],
                                },
                              ],
                              id: '4262fcc8-5473-4198-9d6b-ace78167fd82',
                            },
                          },
                          {
                            content: {
                              plugin: 'text',
                              state: [
                                { type: 'p', children: [{ text: '❌' }] },
                              ],
                              id: 'ae93ea71-60da-4df1-9740-6bd10ca3d18d',
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
                                      text: 'There are some mistakes. Check below for a marked version.',
                                    },
                                  ],
                                },
                              ],
                              id: '68b4e569-dbcc-4475-8396-30fda7d3c36a',
                            },
                          },
                        ],
                      },
                    ],
                    tableType: 'OnlyColumnHeader',
                  },
                  id: '1198fc74-b3e1-48eb-84d4-183e20767297',
                },
                {
                  plugin: 'text',
                  state: [
                    {
                      type: 'p',
                      children: [{ text: 'Marked version:', strong: true }],
                    },
                    { type: 'p', children: [{ text: '' }] },
                  ],
                  id: '6b588707-916d-4dbe-9a79-c6a0b4fa086a',
                },
                {
                  plugin: 'box',
                  state: {
                    type: 'blank',
                    title: {
                      plugin: 'text',
                      state: [
                        {
                          type: 'p',
                          children: [{ text: 'Mobile Phones in School?' }],
                        },
                      ],
                      id: '7aea2c82-49f8-4755-b747-90802f957c51',
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
                                  text: 'I think mobile phones should be allowed in school, but only sometimes. Mobile phones can be very helpful for learning. For example, we can use them to look up information or do research for projects. Also, we can use them to call our parents if there is a problem.',
                                },
                              ],
                            },
                            { type: 'p', children: [{ text: '' }] },
                            {
                              type: 'p',
                              children: [
                                {
                                  text: 'However, phones can also cause problems. Many students use them to play games or chat with friends instead of paying attention in class. This can disturb the lessons and make it harder to learn. Also, some students might feel left out if they don’t have the newest phone.',
                                },
                              ],
                            },
                            { type: 'p', children: [{ text: '' }] },
                            {
                              type: 'p',
                              children: [
                                {
                                  text: 'In my opinion, mobile phones should only be allowed during breaks or for schoolwork when the teacher says it’s okay. This way, we can use them for good reasons but not get distracted.',
                                },
                              ],
                            },
                          ],
                          id: 'cbf324af-39ed-4b8e-b269-bb3f0b4ead82',
                        },
                      ],
                      id: 'cbe8a4b7-5e26-48ef-a3ee-dc2213973b0b',
                    },
                  },
                  id: '8eb5a2fa-cae8-4cc6-b196-78da3d40372a',
                },
              ],
              id: '6074400a-9083-4286-8c64-538b0b50769c',
            },
          },
          id: '55828150-454e-42a4-8c9d-cd0b5a48fba4',
        },
      },
      id: 'df42d6b7-0fc1-41dd-a081-2c83aa9357d7',
    },
    {
      plugin: 'exerciseGroup',
      state: {
        content: {
          plugin: 'rows',
          state: [
            {
              plugin: 'text',
              state: [{ type: 'p', children: [{ strong: true, text: '' }] }],
              id: '4fb43b9d-2b17-4b67-9202-128e7e93cf0d',
            },
          ],
          id: '2175ea47-e379-4e81-8f4e-2c65dc2d0e08',
        },
        exercises: [],
      },
      id: '51b56cdd-6c6f-46e5-9d97-9f5f3f1e2a80',
    },
  ],
}