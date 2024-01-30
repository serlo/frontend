/* eslint-disable import/no-internal-modules */
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

SyntaxHighlighter.registerLanguage('java', java)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('latex', latex)
SyntaxHighlighter.registerLanguage('markup', markup)
SyntaxHighlighter.registerLanguage('c', c)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('sql', sql)

export interface HighlightRendererProps {
  code: string
  language: string
  showLineNumbers: boolean
  optionalElement?: JSX.Element | null
}

export function HighlightRenderer({
  language,
  showLineNumbers,
  code,
  optionalElement,
}: HighlightRendererProps) {
  // SyntaxHighlighter has own styles on pre, so wrap in div to use own classes
  return (
    <div className="mb-block mr-side mt-1 overflow-auto rounded-xl border-3 border-brand-150 pt-[0.8rem]">
      <SyntaxHighlighter
        language={language.toLowerCase()}
        showLineNumbers={showLineNumbers}
        style={style}
        customStyle={{
          backgroundColor: 'transparent',
        }}
      >
        {code}
      </SyntaxHighlighter>
      {optionalElement}
    </div>
  )
}
