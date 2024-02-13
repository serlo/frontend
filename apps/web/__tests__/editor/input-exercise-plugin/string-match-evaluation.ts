import { getMatchingAnswer } from '@editor/plugins/input-exercise/helper/get-matching-answer'
import { InputExerciseType } from '@editor/plugins/input-exercise/input-exercise-type'
import mathjs from 'mathjs'

const answers = [
  {
    value: 'answeralso',
    isCorrect: false,
    feedback: null,
  },
  {
    value: 'answer',
    isCorrect: true,
    feedback: null,
  },
  {
    value: 'wrong',
    isCorrect: false,
    feedback: null,
  },
  {
    value: 'UPPERCASE',
    isCorrect: true,
    feedback: null,
  },
  {
    value: '123',
    isCorrect: true,
    feedback: null,
  },
  {
    value: '€$%&/(()=?``',
    isCorrect: true,
    feedback: null,
  },
]

function getStringNormalizedAnswer(value: string) {
  return getMatchingAnswer(
    answers,
    value,
    InputExerciseType.StringNormalized,
    mathjs.evaluate
  )
}

describe('input-exercise-plugin: getMatchingAnswer (StringMatch)', () => {
  test('correct value matching answer', () => {
    const answer = getStringNormalizedAnswer('answer')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('answer')
  })

  test('value matching incorrect but existing answer', () => {
    const answer = getStringNormalizedAnswer('wrong')
    expect(answer?.isCorrect).toBe(false)
    expect(answer?.value).toBe('wrong')
  })

  test('incorrect value not matching existing answer', () => {
    const answer = getStringNormalizedAnswer('somewrongstring')
    expect(answer).toBe(undefined)
  })

  test('correct value matching answer with uppercase', () => {
    const answer = getStringNormalizedAnswer('UPPERCASE')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('UPPERCASE')
  })

  test('value with differing case still matches answer', () => {
    const answer = getStringNormalizedAnswer('uppercase')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('UPPERCASE')
  })

  test('value with special characters', () => {
    const answer = getStringNormalizedAnswer('€$%&/(()=?``')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('€$%&/(()=?``')
  })

  test('value does not match other string that starts with the same characters', () => {
    const answer = getStringNormalizedAnswer('answeralso')
    expect(answer?.isCorrect).toBe(false)
    expect(answer?.value).toBe('answeralso')
  })
})
