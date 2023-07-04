export enum TransformationTarget {
  Equation = 'equation',
  Term = 'term',
}

export function toTransformationTarget(text: string): TransformationTarget {
  return isTransformationTarget(text) ? text : TransformationTarget.Equation
}

function isTransformationTarget(text: string): text is TransformationTarget {
  return Object.values<string>(TransformationTarget).includes(text)
}
