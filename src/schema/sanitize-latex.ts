const regexMathRm = /\\mathrm(?=[^a-z])/gm
const regexBeginAlign = /\\begin{align}/gm
const regexEndAlign = /\\end{align}/gm
const regexComma = /(?<=[\d]),(?=[\d])/gm

const regexEmptyNewLine = /\\\\(?=[\s]*\\end{)/gm

export function sanitizeLatex(formula: string): string {
  // ignore empty formulas
  if (!formula || !formula.trim()) return formula

  // mathrm is not necessary anymore
  formula = formula.replace(regexMathRm, '')

  // replace align with aligned
  formula = formula.replace(regexBeginAlign, '\\begin{aligned}')
  formula = formula.replace(regexEndAlign, '\\end{aligned}')

  // handle text style
  //formula = formula.replace(regexText, '\\text{\\sf $1}')

  // remove text command
  //formula = formula.replace(regexTextSimple, '')

  // remove empty new line in environments
  formula = formula.replace(regexEmptyNewLine, '')

  // handle environments
  /*formula = formula
    .split(regexNewLine)
    .map((line, index) => {
      if (index == 0) return line
      if (line.includes('\\hline'))
        return '\\\\ ' + line.replace('\\hline', '\\hline \\sf ')
      return ' \\\\ \\sf ' + line
    })
    .join('')*/

  //formula = formula.replace(regexAmpersand, ' & \\sf ')
  //formula = formula.replace(envStart, (str) => `${str} \\sf `)

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

  // add nonserif globally
  //formula = '\\sf ' + formula

  return formula
}
