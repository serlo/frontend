import * as t from 'io-ts'

// export const InputScMcDecoder = t.strict({
//   type: t.keyof({
//     multiple_choice: null,
//     single_choice: null,
//   }),
//   question: t.string,
//   options: t.array(t.string),
//   correct_options: t.array(t.number),
// })

export const InputSingleChoiceDecoder = t.strict({
  heading: t.string,
  type: t.literal('single_choice'),
  question: t.string,
  options: t.array(t.string),
  correct_option: t.number,
  steps: t.array(t.string),
})

type ExpectedSingleChoiceType = t.TypeOf<typeof InputSingleChoiceDecoder>

export const humanReadableSingleChoiceExample: ExpectedSingleChoiceType = {
  heading: 'Exercise heading',
  steps: ['First of possibly many steps'],
  type: 'single_choice',
  question: 'Question of the exercise',
  options: ['The first of a few options', 'The second option'],
  correct_option: 0,
}

export const InputMultipleChoiceDecoder = t.strict({
  type: t.literal('multiple_choice'),
  question: t.string,
  options: t.array(t.string),
  correct_options: t.array(t.number),
})

export const InputShortAnswerDecoder = t.strict({
  type: t.literal('short_answer'),
  question: t.string,
  correct_answer: t.string,
})

export const InputDecoder = t.strict({
  heading: t.string,
  subtasks: t.array(
    t.union([
      InputSingleChoiceDecoder,
      InputMultipleChoiceDecoder,
      InputShortAnswerDecoder,
    ])
  ),
})
