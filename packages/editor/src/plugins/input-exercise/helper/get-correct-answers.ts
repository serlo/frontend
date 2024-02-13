import { normalizeValue } from './normalize-value.js'
import { InputExerciseType } from '../input-exercise-type.js'
import { type InputExerciseAnswer, type MathjsImport } from '../renderer.jsx'

export function getCorrectAnswers(
  answers: InputExerciseAnswer[],
  value: string,
  type: InputExerciseType,
  mathjs: MathjsImport
): InputExerciseAnswer[] {
  const filteredAnswers = answers.filter((answer) => {
    try {
      const solution = normalizeValue(answer.value, type, mathjs)
      const submission = normalizeValue(value, type, mathjs)
      if (!solution || !submission) return false

      if (
        type === 'input-expression-equal-match-challenge' &&
        typeof solution === 'number' &&
        typeof submission === 'number'
      ) {
        return solution - submission === 0
      }
      return solution === submission
    } catch (e) {
      return false
    }
  })

  return filteredAnswers
}
