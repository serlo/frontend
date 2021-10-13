/* eslint-disable import/no-internal-modules */
import * as React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import c from 'react-syntax-highlighter/dist/cjs/languages/prism/c'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import latex from 'react-syntax-highlighter/dist/cjs/languages/prism/latex'
import markup from 'react-syntax-highlighter/dist/cjs/languages/prism/markup'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import sql from 'react-syntax-highlighter/dist/cjs/languages/prism/sql'
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/coy'

import { HighlightPluginConfig } from '.'

SyntaxHighlighter.registerLanguage('java', java)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('latex', latex)
SyntaxHighlighter.registerLanguage('markup', markup)
SyntaxHighlighter.registerLanguage('c', c)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('sql', sql)

export function HighlightRenderer(props: HighlightRendererProps) {
  return (
    <SyntaxHighlighter
      language={props.language}
      showLineNumbers={props.showLineNumbers}
      style={style as unknown}
      customStyle={{
        overflow: 'auto',
      }}
    >
      {props.code || props.config.i18n.code.label}
    </SyntaxHighlighter>
  )
}

/** @public */
export interface HighlightRendererProps {
  config: HighlightPluginConfig
  code: string
  language: string
  showLineNumbers: boolean
}
