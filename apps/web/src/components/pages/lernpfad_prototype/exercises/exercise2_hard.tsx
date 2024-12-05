import type { ExerciseProps } from '../types'
import { BackLink } from './back-link'
import { DoneState } from './done'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

export function Exercise2Hard(props: ExerciseProps) {
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
        { type: 'p', children: [{ text: 'Task: ', strong: true }] },
        { type: 'p', children: [{ strong: true, text: '' }] },
        {
          type: 'p',
          children: [
            {
              strong: true,
              text: 'Write an opinion on the following topic: Should students have homework every day?',
            },
          ],
        },
        { type: 'p', children: [{ text: '' }] },
      ],
      id: '1b689a64-81db-4754-9475-cda1ea01fd0a',
    },
    {
      plugin: 'box',
      state: {
        type: 'blank',
        title: {
          plugin: 'text',
          state: [{ type: 'p', children: [{ text: 'Remember' }] }],
          id: '67adc3ab-4708-4d73-aa76-ef09322fe576',
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
                              text: 'structure your text in beginning, middle and end',
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
                              text: 'use at least 6 useful phrases and 8 linking words ',
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
                              text: 'check your text for mistakes when you are finished',
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
                            { text: 'Write at least 100-150 words.\t' },
                          ],
                        },
                      ],
                      type: 'list-item',
                    },
                  ],
                  type: 'unordered-list',
                },
              ],
              id: '08bf43c5-e222-4a54-ad1b-dd1793063723',
            },
          ],
          id: '59dd3318-5f80-4ffb-b3da-153ad846e9f0',
        },
      },
      id: 'a33333e2-4313-4220-aa49-46971ac988b0',
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
              id: '3857996f-f71f-4f15-9959-bbda6d2b513c',
            },
          ],
          id: 'c7578a7d-d803-4c78-a1c9-bfad488c4d34',
        },
        interactive: {
          plugin: 'textAreaExercise',
          state: {},
          id: '364eb3a8-4fd0-47ff-bfa6-3c88c4edc0a5',
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
                      text: 'Use the evaluation criteria to plan and write your text:',
                      strong: true,
                    },
                  ],
                },
                { type: 'p', children: [{ text: '' }] },
                {
                  type: 'p',
                  children: [
                    { text: 'Evaluation Criteria', strong: true, em: true },
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
                              text: 'Your text has a title that fits the content.',
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
                              text: 'Your text is structured in beginning, middle, end.',
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
                            { text: 'You clearly state your opinion.' },
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
                            { text: 'You give reasons for your opinion.' },
                          ],
                        },
                      ],
                      type: 'list-item',
                    },
                    {
                      children: [
                        {
                          type: 'list-item-child',
                          children: [{ text: 'You finish with a conclusion.' }],
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
                              text: 'Bonus: Your text includes another argument that does not support your opinion.',
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
                              text: 'You use linking words (for example: because, but, and, when, as, although etc.)',
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
                              text: "Your text is understandable and doesn't contain many spelling or grammatical mistakes.",
                            },
                          ],
                        },
                      ],
                      type: 'list-item',
                    },
                  ],
                  type: 'unordered-list',
                },
                { type: 'p', children: [{ text: '' }] },
              ],
              id: '222bd1a2-0df3-41b8-bf9f-d66993c9eb38',
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
                          text: 'Here is a possible solution. Linking words and useful phrases are marked in bold print:',
                          strong: true,
                        },
                      ],
                    },
                    { type: 'p', children: [{ strong: true, text: '' }] },
                    {
                      type: 'p',
                      children: [
                        { text: 'I believe', strong: true },
                        {
                          text: ' students should not have homework every day. ',
                        },
                      ],
                    },
                    { type: 'p', children: [{ text: '' }] },
                    {
                      type: 'p',
                      children: [
                        { text: 'On the one hand,', strong: true },
                        {
                          text: ' homework helps students practice what they learn in school and improve. It is ',
                        },
                        { text: 'also', strong: true },
                        {
                          text: ' important for studying for exams. However, too much homework can be stressful ',
                        },
                        { text: 'and', strong: true },
                        {
                          text: ' take away time for other activities like sports, hobbies, ',
                        },
                        { text: 'or', strong: true },
                        { text: ' spending time with family and friends.' },
                      ],
                    },
                    { type: 'p', children: [{ text: '' }] },
                    {
                      type: 'p',
                      children: [
                        { text: 'In my opinion', strong: true },
                        {
                          text: ', students should have homework three to four times a week ',
                        },
                        { text: 'instead of', strong: true },
                        {
                          text: ' every day. This way, they can focus on learning without feeling overwhelmed. It ',
                        },
                        { text: 'also', strong: true },
                        { text: ' gives them more free time to relax ' },
                        { text: 'so ', strong: true },
                        { text: 'they can develop outside of school.' },
                      ],
                    },
                    { type: 'p', children: [{ text: '' }] },
                    {
                      type: 'p',
                      children: [
                        { text: 'In conclusion', strong: true },
                        { text: ', homework is important, ' },
                        { text: 'but', strong: true },
                        {
                          text: ' having it every day can be too much. A good balance between schoolwork ',
                        },
                        { text: 'and', strong: true },
                        { text: ' free time is better for students’ health ' },
                        { text: 'and', strong: true },
                        { text: ' learning success.' },
                      ],
                    },
                  ],
                  id: 'ae41363e-42f7-429e-ab3c-3f0923816f57',
                },
              ],
              id: 'c2cf2f6c-dbb7-4619-a5b0-594304cbe808',
            },
          },
          id: 'b3c67250-4dfd-4f7c-b429-6c7c8fefa6f3',
        },
      },
      id: '04044f46-8f53-4806-ad19-9d1c7355c8e4',
    },
  ],
}
