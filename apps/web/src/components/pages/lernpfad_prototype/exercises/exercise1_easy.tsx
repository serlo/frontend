import type { ExerciseProps } from '../types'
import { BackLink } from './back-link'
import { DoneState } from './done'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

export function Exercise1Easy(props: ExerciseProps) {
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
