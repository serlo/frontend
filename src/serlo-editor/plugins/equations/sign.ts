export enum Sign {
  AlmostEqualTo = 'almost-equal-to',
  Equals = 'equals',
  Estimates = 'estimates',
  GreaterThan = 'greater-than',
  GreaterThanOrEqual = 'greater-than-or-equal',
  LessThan = 'less-than',
  LessThanOrEqual = 'less-than-or-equal',
  NotEqualTo = 'not-equal-to',
}

export const signStrings: Record<Sign, string> = {
  [Sign.AlmostEqualTo]: '≈',
  [Sign.Equals]: '=',
  [Sign.Estimates]: '≙',
  [Sign.GreaterThan]: '>',
  [Sign.GreaterThanOrEqual]: '≥',
  [Sign.LessThan]: '<',
  [Sign.LessThanOrEqual]: '≤',
  [Sign.NotEqualTo]: '≠',
}
