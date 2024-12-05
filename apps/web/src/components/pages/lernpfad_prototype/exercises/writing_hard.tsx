import type { ExerciseProps } from '../types'
import { ExerciseWrapper } from './exercise-wrapper'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

// TODO: How to structure?

export function WritingHard(props: ExerciseProps) {
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
              text: 'Read the given opinion on whether students should grade their teachers and fill in the gaps.',
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
const editorContent2 = {
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
