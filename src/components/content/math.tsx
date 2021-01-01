import KaTeX from 'katex'
import React from 'react'

import KaTeXSpan from '../../../external/katexstyles'

export interface MathProps {
  formula: string
  inline?: boolean
  alignLeft?: boolean
}

export function Math(props: MathProps) {
  const { inline = false } = props

  // make empty formulas clickable
  let formula = props.formula || '\\,'

  // render block formula with displaystyle
  if (!inline) {
    formula = '\\displaystyle ' + formula
  }

  // block formular use displaystyle
  const html = KaTeX.renderToString(formula, {
    displayMode: false,
    throwOnError: false,
    strict: false,
  })

  return <KaTeXSpan dangerouslySetInnerHTML={{ __html: html }} />
}
