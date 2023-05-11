import KaTeX from 'katex'
import { forwardRef } from 'react'

import { MathEditorProps } from './editor-props'

export type MathRendererProps = Pick<
  MathEditorProps,
  'state' | 'inline' | 'additionalContainerProps'
>

export const MathRenderer = forwardRef<HTMLSpanElement, MathRendererProps>(
  function MathRenderer({ state, inline, additionalContainerProps }, ref) {
    const html = KaTeX.renderToString(getFormula(), {
      displayMode: false,
      throwOnError: false,
    })

    return (
      <span
        ref={ref}
        dangerouslySetInnerHTML={{ __html: html }}
        style={
          inline
            ? undefined
            : {
                display: 'block',
                margin: '1em 0',
                textAlign: 'center',
              }
        }
        {...additionalContainerProps}
      />
    )

    function getFormula(): string {
      if (state === '') return '\\,'
      if (!inline) return `\\displaystyle ${state}`
      return state
    }
  }
)
