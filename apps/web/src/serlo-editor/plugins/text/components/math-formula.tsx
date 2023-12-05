import KaTeX from 'katex'
import { memo } from 'react'

import type { MathElement } from '../types/text-editor'

export const MathFormula = memo(function MathFormula({
  element,
}: {
  element: MathElement
}) {
  const html = KaTeX.renderToString(
    `${element.inline ? '' : '\\displaystyle '}${element.src}`,
    {
      displayMode: false,
      throwOnError: false,
    }
  )

  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className={element.inline ? undefined : 'mx-0 block text-center'}
    />
  )
})
