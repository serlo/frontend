import KaTeX from 'katex'

import { KaTeXSpan } from '../../../external/katexstyles'

export interface MathSpanProps {
  formula: string
}

export function MathSpan({ formula }: MathSpanProps) {
  // block formular use displaystyle
  const html = KaTeX.renderToString(formula, {
    displayMode: false,
    throwOnError: false,
    strict: false,
  })

  return <KaTeXSpan dangerouslySetInnerHTML={{ __html: html }} />
}
