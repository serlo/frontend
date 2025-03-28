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
  const nowrap = /\\begin *{(array|aligned)}/.test(cleanedSrc)
  const displayMode = /\\displaystyle[^a-z]/.test(cleanedSrc)

  if (inline) return renderFormula(cleanedSrc)

  return (
    <div
      className={cn(
        'serlo-math-wrapper text-center',
        nowrap && 'whitespace-nowrap'
      )}
    >
      {renderFormula(cleanedSrc)}
    </div>
  )

  function renderFormula(formula: string) {
    const mathML = temml.renderToString(formula, { displayMode })

    return (
      <span
        className={cn(
          'inline-block pb-1 [page-break-inside:avoid]',
          inline ? 'text-[1.1rem]' : 'text-[1.33rem]'
        )}
        dangerouslySetInnerHTML={{ __html: mathML }}
      />
    )
  }
}
