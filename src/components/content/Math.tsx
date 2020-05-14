import KaTeX from 'katex'
import React from 'react'

import KaTeXSpan from '../../../external/katexstyles'

interface MathProps {
  formula: string
  inline?: boolean
}

export default function Math(props: MathProps) {
  const { inline = false } = props
  let formula = props.formula

  // make empty formulas clickable
  if (!formula) {
    formula = '\\,'
  }
  // use displaystyle for block formulas
  if (!inline) {
    formula = '\\displaystyle ' + formula
  }

  const html = KaTeX.renderToString(formula, {
    displayMode: false,
    throwOnError: false,
    strict: false
  })

  return <KaTeXSpan dangerouslySetInnerHTML={{ __html: html }} />
}
