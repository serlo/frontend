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

function getExpressionEqualAnswer(value: string) {
  return getMatchingAnswer(
    answers,
    value,
    InputExerciseType.ExpressionEqual,
    evaluate
  )
}

describe('input-exercise-plugin: getMatchingAnswer (ExpressionEqual)', () => {
  test('correct value matching answer', () => {
    const answer = getExpressionEqualAnswer('1')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('1')
  })

  test('value matching incorrect but existing answer', () => {
    const answer = getExpressionEqualAnswer('2')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('2')
  })

  test('incorrect value not matching existing answer', () => {
    const answer = getExpressionEqualAnswer('333')
    expect(answer).toBe(undefined)
  })

  test('correct value matching answer with dot', () => {
    const answer = getExpressionEqualAnswer('4.0')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('4.0')
  })

  test('correct value with comma still matches answer with dot', () => {
    const answer = getExpressionEqualAnswer('4,0')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('4.0')
  })

  test('correct value without decimal place does not match answer with decimal place', () => {
    const answer = getExpressionEqualAnswer('4')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('4.0')
  })

  test('correct value matching answer with comma', () => {
    const answer = getExpressionEqualAnswer('4,1')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('4,1')
  })

  test('correct value with dot still matches answer with comma', () => {
    const answer = getExpressionEqualAnswer('4.1')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('4,1')
  })

  test('formulas get parsed to match correct answer', () => {
    const answer = getExpressionEqualAnswer('10 / 10')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('1')
  })

  test('formulas get parsed to match correct answer', () => {
    const answer = getExpressionEqualAnswer('10/10')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('1')
  })

  test('formulas get parsed to match correct answer', () => {
    const answer = getExpressionEqualAnswer('10 - 9')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('1')
  })

  test('formulas get parsed to match correct answer', () => {
    const answer = getExpressionEqualAnswer('0.5*2')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('1')
  })

  test('formulas get parsed to match correct answer', () => {
    const answer = getExpressionEqualAnswer('0,5*2')
    expect(!!answer).toBe(true)
    expect(answer?.value).toBe('1')
  })

  // … just curious
  test('value with string', () => {
    const answer = getExpressionEqualAnswer('answer')
    expect(answer).toBe(undefined)
  })
  test('dot as value', () => {
    const answer = getExpressionEqualAnswer('.')
    expect(answer).toBe(undefined)
  })
})
