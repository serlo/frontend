import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
// eslint-disable-next-line import/no-internal-modules
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/coy'

import { HighlightConfig } from '.'
import { useHighlightConfig } from './config'

export function HighlightRenderer(props: HighlightRendererProps) {
  const { i18n } = useHighlightConfig(props.config)

  return (
    <SyntaxHighlighter
      language={props.language}
      showLineNumbers={props.showLineNumbers}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      style={style}
      customStyle={{
        overflow: 'auto',
      }}
    >
      {props.code || i18n.code.label}
    </SyntaxHighlighter>
  )
}

export interface HighlightRendererProps {
  config: HighlightConfig
  code: string
  language: string
  showLineNumbers: boolean
}
