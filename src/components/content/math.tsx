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
  const formula = props.formula || '\\,'

  const regex = /\\mathrm([ {])/gm
  const nonserif = '\\sf ' + formula.replace(regex, '$1')

  // block formular use displaystyle
  const html = KaTeX.renderToString(
    inline ? nonserif : '\\displaystyle' + nonserif,
    {
      displayMode: false,
      throwOnError: false,
      strict: false,
    }
  )

  return <KaTeXSpan dangerouslySetInnerHTML={{ __html: html }} />
}
