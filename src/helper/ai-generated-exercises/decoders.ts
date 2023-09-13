import * as t from 'io-ts'

export const InputScMcDecoder = t.strict({
  type: t.union([t.literal('multiple_choice'), t.literal('single_choice')]),
  question: t.string,
  options: t.array(t.string),
  correct_options: t.array(t.number),
})

export const InputShortAnswerDecoder = t.strict({
  type: t.literal('short_answer'),
  question: t.string,
})
