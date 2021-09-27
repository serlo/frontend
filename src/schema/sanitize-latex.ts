const regexBeginAlign = /\\begin{align}/gm
const regexEndAlign = /\\end{align}/gm
const regexComma = /(?<=[\d]),(?=[\d])/gm

const regexEmptyNewLine = /\\\\(?=[\s]*\\end{)/gm

export function sanitizeLatex(formula: string): string {
  // ignore empty formulas
  if (!formula || !formula.trim()) return formula

  // replace align with aligned
  formula = formula.replace(regexBeginAlign, '\\begin{aligned}')
  formula = formula.replace(regexEndAlign, '\\end{aligned}')

  // remove empty new line in environments
  formula = formula.replace(regexEmptyNewLine, '')

  // fix comma style
  formula = formula.replace(regexComma, '{,}')

  // add more array stretch
  if (
    formula.includes('\\begin{aligned}') ||
    formula.includes('\\begin{array}')
  ) {
    if (formula.includes('\\dfrac') || formula.includes('\\int')) {
      formula = `\\def\\arraystretch{2} ${formula}`
    } else {
      formula = `\\def\\arraystretch{1.25} ${formula}`
    }
  }

  return formula
}
