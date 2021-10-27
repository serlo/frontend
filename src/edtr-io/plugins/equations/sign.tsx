export enum Sign {
  Equals = 'equals',
  GreaterThan = 'greater-than',
  GreaterThanOrEqual = 'greater-than-or-equal',
  LessThan = 'less-than',
  LessThanOrEqual = 'less-than-or-equal',
  AlmostEqualTo = 'almost-equal-to',
  Estimates = 'estimates',
}

export function renderSignToString(sign: Sign): string {
  switch (sign) {
    case Sign.Equals:
      return '='
    case Sign.GreaterThan:
      return '>'
    case Sign.GreaterThanOrEqual:
      return '≥'
    case Sign.LessThan:
      return '<'
    case Sign.LessThanOrEqual:
      return '≤'
    case Sign.AlmostEqualTo:
      return '≈'
    case Sign.Estimates:
      return '≙'
  }
}
