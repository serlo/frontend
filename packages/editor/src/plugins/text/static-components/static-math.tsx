import { sanitizeLatex } from '@editor/plugins/text/utils/sanitize-latex'
import { cn } from '@editor/utils/cn'
import temml from 'temml'

import type { MathElement } from '../types/text-editor'

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
        nowrap && 'whitespace-nowrap',
        addDisplayStyle && 'text-xl'
      )}
    >
      {renderFormula(cleanedSrc, addDisplayStyle)}
    </div>
  )

  function renderFormula(formula: string, displayMode?: boolean) {
    const mathML = temml.renderToString(formula, { displayMode })

    return (
      <span
        className="inline-block py-1 [page-break-inside:avoid]"
        dangerouslySetInnerHTML={{ __html: mathML }}
      />
    )
  }
}
