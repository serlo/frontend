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
import coy from 'react-syntax-highlighter/dist/cjs/styles/prism/coy'

SyntaxHighlighter.registerLanguage('java', java)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('latex', latex)
SyntaxHighlighter.registerLanguage('markup', markup)
SyntaxHighlighter.registerLanguage('c', c)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('sql', sql)

export interface CodeProps {
  content: React.ReactNode
  language: string
  showLineNumbers: boolean
}

export function Code({ content, language, showLineNumbers }: CodeProps) {
  // SyntaxHighlighter has own styles on pre, so wrap in div to use own classes
  return (
    <div className="mb-block mt-1 border-l-8 border-brand-lighter mx-side">
      <SyntaxHighlighter
        language={language.toLowerCase()}
        showLineNumbers={showLineNumbers}
        style={coy as object}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  )
}
