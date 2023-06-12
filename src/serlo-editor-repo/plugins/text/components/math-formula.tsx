import KaTeX from 'katex'
import React from 'react'

import type { MathElement } from '../types'
import { styled } from '@/serlo-editor-repo/ui'

const KaTeXSpan = styled.span<{ element: MathElement }>(({ element }) => {
  if (!element.inline) {
    return {
      display: 'block',
      margin: '1em 0',
      textAlign: 'center',
    }
  }
})

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
    <KaTeXSpan dangerouslySetInnerHTML={{ __html: html }} element={element} />
  )
})

export { MathFormula }
