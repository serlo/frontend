import clsx from 'clsx'
import KaTeX from 'katex'
import React, { forwardRef } from 'react'

import type { MathEditorProps } from './editor'

type MathRendererProps = Pick<
  MathEditorProps,
  'state' | 'inline' | 'additionalContainerProps'
>

export const MathRenderer = React.memo(
  forwardRef<HTMLSpanElement, MathRendererProps>(function MathRenderer(
    { state, inline, additionalContainerProps },
    ref
  ) {
    const html = KaTeX.renderToString(getFormula(), {
      displayMode: false,
      throwOnError: false,
    })

    return (
      <span
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html }}
        className={clsx(inline ? '' : 'my-6 block text-center')}
        {...additionalContainerProps}
        data-qa="plugin-math-renderer"
      />
    )

    function getFormula(): string {
      if (state === '') return '\\,'
      if (!inline) return `\\displaystyle ${state}`
      return state
    }
  })
)
