import { sanitizeLatex } from '@editor/plugins/text/utils/sanitize-latex'
import { cn } from '@editor/utils/cn'
import { useEffect, useRef } from 'react'
import temml from 'temml'

import type { MathElement } from '../types/text-editor'

export type StaticMathProps = Omit<MathElement, 'children'>

/** 🐘 This component is quite big. 🐘
 *  Load it dynamically if you can. */
export function StaticMath({ src, inline }: StaticMathProps) {
  const spanRef = useRef<HTMLSpanElement | null>(null)

  const cleanedSrc = sanitizeLatex(src)
  const addDisplayStyle = !/\\displaystyle[^a-z]/.test(cleanedSrc)
  const nowrap = /\\begin *{(array|aligned)}/.test(cleanedSrc)

  useEffect(() => {
    if (!spanRef.current) return

    temml.render(cleanedSrc, spanRef.current, {
      displayMode: addDisplayStyle,
    })
  })

  if (!src) return null

  if (inline) return renderFormula()

  return (
    <div
      className={cn(
        'serlo-math-wrapper text-center',
        nowrap && 'whitespace-nowrap',
        addDisplayStyle && 'text-xl'
      )}
    >
      {renderFormula()}
    </div>
  )

  function renderFormula() {
    try {
      return (
        <span
          ref={spanRef}
          className="inline-block py-1 [page-break-inside:avoid]"
        />
      )
    } catch {
      // eslint-disable-next-line no-console
      console.error('formula could not be rendered')
      return <span></span>
    }
  }
}
