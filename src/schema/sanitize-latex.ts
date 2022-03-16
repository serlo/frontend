const regexBeginAlign = /\\begin{align}/gm
const regexEndAlign = /\\end{align}/gm
const regexComma = /([\d]),([\d])/gm

const regexEmptyNewLine = /\\\\([\s]*\\end{)/gm

export function sanitizeLatex(formula: string): string {
  // ignore empty formulas
  if (!formula || !formula.trim()) return formula

  // replace align with aligned
  formula = formula.replace(regexBeginAlign, '\\begin{aligned}')
  formula = formula.replace(regexEndAlign, '\\end{aligned}')

  // remove trailing new line in environments
  formula = formula.replace(regexEmptyNewLine, (_str, g1: string) => g1)

  // fix comma style -> somebody is actully fixing this manually within content, so this is not used atm
  formula = formula.replace(
    regexComma,
    (_str, g1: string, g2: string) => `${g1}{,}${g2}`
  )

  // add more array stretch
  if (
    formula.includes('\\begin{aligned}') ||
    formula.includes('\\begin{array}')
  ) {
    if (
      (formula.includes('\\dfrac') || formula.includes('\\int')) &&
      !formula.includes('\\begin{pmatrix}') // opt-out if vectors are present, e.g. 13169
    ) {
      formula = `\\def\\arraystretch{2} ${formula}`
    } else {
      formula = `\\def\\arraystretch{1.25} ${formula}`
    }
  }

  return formula
}
