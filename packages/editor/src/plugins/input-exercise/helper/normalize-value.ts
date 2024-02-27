import { InputExerciseType } from '../input-exercise-type'
import { type MathjsImport } from '../renderer'

export function normalizeValue(
  value: string,
  type: InputExerciseType,
  mathjsEvaluate: MathjsImport['evaluate']
) {
  const _value = collapseWhitespace(value)
  switch (type) {
    case InputExerciseType.NumberExact:
      return normalizeNumber(_value).replace(/\s/g, '')
    case InputExerciseType.ExpressionEqual:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return Number(mathjsEvaluate(normalizeNumber(_value)))
    case InputExerciseType.StringNormalized:
      return _value.toUpperCase()
  }
}

function collapseWhitespace(val: string): string {
  return val.replace(/[\s\xa0]+/g, ' ').trim()
}

function normalizeNumber(val: string) {
  return val.replace(/,/g, '.').replace(/^[+]/, '')
}
