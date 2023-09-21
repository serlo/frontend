import * as t from 'io-ts'

export const InputScMcDecoder = t.strict({
  type: t.keyof({
    multiple_choice: null,
    single_choice: null,
  }),
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
  subtasks: t.array(t.union([InputScMcDecoder, InputShortAnswerDecoder])),
})
