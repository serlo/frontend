// From Editor renderer
import KaTeX from 'katex'
import React from 'react'

import KaTeXSpan from './katexstyles'

export interface MathProps {
  formula: string
  inline?: boolean
  innerRef?: React.Ref<HTMLElement>
}

const Math = (props: MathProps) => {
  const { inline, innerRef } = props
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
    throwOnError: false
  })

  if (inline) {
    return (
      <KaTeXSpan ref={innerRef} dangerouslySetInnerHTML={{ __html: html }} />
    )
  } else {
    return (
      <KaTeXSpan
        style={{ display: 'block', margin: '16px 0', textAlign: 'center' }}
        ref={props.innerRef}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }
}

export default Math
