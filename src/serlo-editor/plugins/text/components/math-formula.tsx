import KaTeX from 'katex'
import React from 'react'

import type { MathElement } from '../types'

const MathFormula = React.memo(function MathFormula({
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
      className={element.inline ? 'my-4 mx-0 block text-center' : undefined}
    />
  )
})

export { MathFormula }
