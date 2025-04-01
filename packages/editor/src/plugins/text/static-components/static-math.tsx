import { sanitizeLatex } from '@editor/plugins/text/utils/sanitize-latex'
import { cn } from '@editor/utils/cn'
import temml from 'temml'

import type { MathElement } from '../types/text-editor'
// eslint-disable-next-line import/no-unassigned-import
import '@editor/assets/math/temml-fira.css'

export type StaticMathProps = Omit<MathElement, 'children'>

/** 🐘 This component is quite big. 🐘
 *  Load it dynamically if you can. */
export function StaticMath({ src, inline }: StaticMathProps) {
  if (!src) return null

  const cleanedSrc = sanitizeLatex(src)
  const nowrap = /\\begin *{(array|aligned)}/.test(cleanedSrc)
  const displayMode = /\\displaystyle[^a-z]/.test(cleanedSrc)

  const macros = temml.definePreamble(`
    \\def\\Q{\\mathbb{Q}}
    \\def\\C{\\mathbb{C}}
    \\def\\and{\\wedge}
    \\def\\or{\\vee}
    \\def\\arccot{\\operatorname{arccot}}
    \\def\\m{\\text{ m}}
    \\def\\cm{\\text{ cm}}
    \\def\\mm{\\text{ mm}}
    \\def\\km{\\text{ km}}
    \\def\\dm{\\text{ dm}}
    \\def\\l{\\text{ l}}
    \\def\\dl{\\text{ dl}}
    \\def\\cl{\\text{ cl}}
    \\def\\ml{\\text{ ml}}
    \\def\\s{\\text{ s}}
    \\def\\h{\\text{ h}}
    \\def\\D{\\mathbb{D}}
    \\def\\W{\\mathbb{W}}
    \\def\\L{\\mathbb{L}}
    `) as Record<string, string>

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
    if (!formula.length) return <span />

    try {
      const mathML = temml.renderToString(formula, {
        displayMode,
        macros,
        throwOnError: false,
        strict: false,
        trust: false,
      })

      return (
        <span
          className={cn(
            'inline-block pb-1 [page-break-inside:avoid]',
            inline ? 'text-[1.1rem]' : 'text-[1.33rem]'
          )}
          dangerouslySetInnerHTML={{ __html: mathML }}
        />
      )
    } catch {
      // eslint-disable-next-line no-console
      console.error('formula could not be rendered')
      return <span />
    }
  }
}
