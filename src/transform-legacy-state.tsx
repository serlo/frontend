import styled from 'styled-components'

import { converter } from './legacy-markdown-parser'
import KaTeXSpan from './katexstyles'

export default function LegacyRenderer(props) {
  const { state } = props
  return state.map((entry, index) => (
    <KaTeXSpan as="div" key={index}>
      <Row>
        {entry.map((entry, index) => {
          const html = converter.makeHtml(entry.content)
          if (entry.col == 24) {
            return (
              <Col24
                key={index}
                dangerouslySetInnerHTML={{ __html: html }}
              ></Col24>
            )
          }
          if (entry.col == 12) {
            return (
              <Col12
                key={index}
                dangerouslySetInnerHTML={{ __html: html }}
              ></Col12>
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
