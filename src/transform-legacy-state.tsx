import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'
import Link from 'next/link'

import { converter } from './legacy-markdown-parser'
import KaTeXSpan from './katexstyles'

function transform(node, index) {
  if (node.type === 'tag' && node.name === 'a') {
    if (node.children.length === 1 && node.children[0].type === 'text') {
      if (/^\/[\d]+$/.test(node.attribs.href)) {
        return (
          <Link
            as={'/content' + node.attribs.href}
            href="/content/[id]"
            key={index}
          >
            <a>{node.children[0].data}</a>
          </Link>
        )
      }
    }
  }
}

export default function LegacyRenderer(props) {
  const { state } = props
  return state.map((entry, index) => (
    <KaTeXSpan as="div" key={index}>
      <Row>
        {entry.map((entry, index) => {
          const html = converter.makeHtml(entry.content)
          if (entry.col == 24) {
            return (
              <Col24 key={index}>{ReactHtmlParser(html, { transform })}</Col24>
            )
          }
          if (entry.col == 12) {
            return (
              <Col12 key={index}>{ReactHtmlParser(html, { transform })}</Col12>
            )
          }
        })}
      </Row>
    </KaTeXSpan>
  ))
}

const Row = styled.div`
  display: flex;
  margin-bottom: 24px;
`

const Col24 = styled.div`
  width: 100%;
`

const Col12 = styled.div`
  flex-basis: 50%;
  box-sizing: border-box;
  width: 50%;
  padding: 10px 32px;
`
