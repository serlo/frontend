import KaTeX from 'katex'

import { styled } from '../../ui'
import type { MathElement } from '../types'

const KaTeXSpan = styled.span<{ element: MathElement }>(({ element }) => {
  if (!element.inline) {
    return {
      display: 'block',
      margin: '1em 0',
      textAlign: 'center',
    }
  }
})

export function MathFormula({ element }: { element: MathElement }) {
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
}
