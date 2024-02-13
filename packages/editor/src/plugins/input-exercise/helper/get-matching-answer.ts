import { normalizeValue } from './normalize-value'
import { InputExerciseType } from '../input-exercise-type'
import { type InputExerciseAnswer, type MathjsImport } from '../renderer'

export function getMatchingAnswer(
  answers: InputExerciseAnswer[],
  value: string,
  type: InputExerciseType,
  mathjs: MathjsImport
): InputExerciseAnswer | undefined {
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

  return filteredAnswers.length > 0 ? filteredAnswers[0] : undefined
}
