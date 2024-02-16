import { getMatchingAnswer } from '@editor/plugins/input-exercise/helper/get-matching-answer'
import { InputExerciseType } from '@editor/plugins/input-exercise/input-exercise-type'
import { evaluate } from 'mathjs'

const answers = [
  {
    value: '1',
    isCorrect: true,
    feedback: null,
  },
  {
    value: '2',
    isCorrect: false,
    feedback: null,
  },
  {
    value: '4.0',
    isCorrect: true,
    feedback: null,
  },
  {
    value: '4,1',
    isCorrect: true,
    feedback: null,
  },
  {
    value: '123',
    isCorrect: true,
    feedback: null,
  },
  {
    value: 'answer',
    isCorrect: true,
    feedback: null,
  },
  {
    value: '.',
    isCorrect: true,
    feedback: null,
  },
]

function getNumberExactAnswer(value: string) {
  return getMatchingAnswer(
    answers,
    value,
    InputExerciseType.NumberExact,
    evaluate
  )
}

describe('input-exercise-plugin: getMatchingAnswer (NumberExact)', () => {
  test('correct value matching answer', () => {
    const answer = getNumberExactAnswer('1')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('1')
  })

  test('value matching incorrect but existing answer', () => {
    const answer = getNumberExactAnswer('2')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('2')
  })

  test('incorrect value not matching existing answer', () => {
    const answer = getNumberExactAnswer('333')
    expect(answer).toBe(undefined)
  })

  test('correct value matching answer with dot', () => {
    const answer = getNumberExactAnswer('4.0')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('4.0')
  })

  test('correct value with comma still matches answer with dot', () => {
    const answer = getNumberExactAnswer('4,0')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('4.0')
  })

  test('correct value without decimal place does not match answer with decimal place', () => {
    const answer = getNumberExactAnswer('4')
    expect(answer).toBe(undefined)
  })

  test('correct value matching answer with comma', () => {
    const answer = getNumberExactAnswer('4,1')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('4,1')
  })

  test('correct value with dot still matches answer with comma', () => {
    const answer = getNumberExactAnswer('4.1')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('4,1')
  })

  // … curious but probably okay
  test('value with string', () => {
    const answer = getNumberExactAnswer('answer')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('answer')
  })
  test('dot as value', () => {
    const answer = getNumberExactAnswer('.')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('.')
  })
})
