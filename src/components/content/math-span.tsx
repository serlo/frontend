import { KaTeXStyles } from '@/../external/katexstyles'
import KaTeX from 'katex'

/* eslint-disable import/no-unassigned-import */
import 'katex/contrib/mhchem'

export interface MathSpanProps {
  formula: string
}

export function MathSpan({ formula }: MathSpanProps) {
  // block formular use displaystyle

  const html = formula
    ? KaTeX.renderToString(formula, {
        displayMode: false,
        throwOnError: false,
        strict: false,
        macros: {
          '\\Q': '\\mathbb{Q}',
          '\\C': '\\mathbb{C}',
          '\\and': '\\wedge',
          '\\euro': '€',
          '\\or': '\\vee',
          '\\arccot': '\\operatorname{arccot}',
          '\\sgn': '\\operatorname{sgn}',
        },
      })
    : ''

  return (
    <>
      <KaTeXStyles />
      <span
        className="inline-block py-1 [page-break-inside:avoid]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}
