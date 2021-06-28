import * as React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// eslint-disable-next-line import/no-internal-modules
import coy from 'react-syntax-highlighter/dist/cjs/styles/prism/coy'

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
        language={language}
        showLineNumbers={showLineNumbers}
        style={coy as object}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  )
}
