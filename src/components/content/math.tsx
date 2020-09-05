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
  const formula = '\\sf ' + props.formula || '\\,'

  // block formular use displaystyle
  const html = KaTeX.renderToString(
    inline ? formula : '\\displaystyle' + formula,
    {
      displayMode: false,
      throwOnError: false,
      strict: false,
    }
  )

  return <KaTeXSpan dangerouslySetInnerHTML={{ __html: html }} />
}
