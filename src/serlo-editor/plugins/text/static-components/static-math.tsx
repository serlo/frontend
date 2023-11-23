import { KaTeXStyles } from '@/../external/katexstyles'
import KaTeX from 'katex'

/* eslint-disable import/no-unassigned-import */
import 'katex/contrib/mhchem'
import type { MathElement } from '../types/text-editor'
import { cn } from '@/helper/cn'
import { sanitizeLatex } from '@/serlo-editor/plugins/text/utils/sanitize-latex'

export type StaticMathProps = Omit<MathElement, 'children'>

/** 🐘 This component is quite big. 🐘
 *  Load it dynamically if you can. */
export function StaticMath({ src, inline }: StaticMathProps) {
  if (!src) return null

  const cleanedSrc = sanitizeLatex(src)

  if (inline) return renderFormula(cleanedSrc)

  const nowrap = /\\begin *{(array|aligned)}/.test(cleanedSrc)
  const addDisplayStyle = !/\\displaystyle[^a-z]/.test(cleanedSrc)

  return (
    <div
      className={cn(
        'serlo-math-wrapper text-center',
        nowrap && 'whitespace-nowrap'
      )}
    >
      {renderFormula(
        addDisplayStyle ? '\\displaystyle ' + cleanedSrc : cleanedSrc
      )}
    </div>
  )

  function renderFormula(formula: string) {
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
}
