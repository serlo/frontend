import ReactHtmlParser, { processNodes } from 'react-html-parser'

import { converter } from './legacy-markdown-parser'
import {
  Rows,
  Row,
  LayoutRow,
  Col,
  StyledP,
  ImgWrapper,
  Img,
  StyledH2,
  StyledA,
  StyledLi,
  StyledUl,
  StyledH3,
  StyledH4,
  StyledH5,
  StyledOl
} from './visuals'
import Math from './mathcomponent'

export default function LegacyRenderer(props) {
  const { state } = props
  return (
    <Rows>
      {state.map((entry, index) => (
        <Row key={index}>
          <LayoutRow>
            {entry.map((entry, index) => {
              const html = converter.makeHtml(entry.content)
              return (
                <Col size={entry.col} key={index}>
                  {ReactHtmlParser(html, { transform })}
                </Col>
              )
            })}
          </LayoutRow>
        </Row>
      ))}
    </Rows>
  )
}

function transform(node, index) {
  if (node.type === 'text') {
    return <span key={index}>{node.data}</span>
  }
  if (node.type === 'tag') {
    if (node.name === 'p') {
      if (
        node.children
          .reduce((acc, val) => acc + (val.data ? val.data : 'x'), '')
          .trim() == ''
      )
        return null
      return (
        <StyledP key={index}>{processNodes(node.children, transform)}</StyledP>
      )
    }
    if (node.name === 'strong') {
      return (
        <strong key={index}>{processNodes(node.children, transform)}</strong>
      )
    }
    if (node.name === 'em') {
      return <em key={index}>{processNodes(node.children, transform)}</em>
    }
    if (node.name === 'br') {
      return <br key={index} />
    }
    if (node.name === 'span') {
      if (node.attribs.class === 'mathInline') {
        //console.log(node.children[0].data)
        return <Math formula={node.children[0].data} inline key={index} />
      }
      if (node.attribs.class === 'math') {
        //console.log(node.children[0].data)
        return <Math formula={node.children[0].data} key={index} />
      }
    }
    if (node.name === 'img') {
      return (
        <Img key={index} src={node.attribs.src} alt={node.attribs.alt}></Img>
      )
    }
    if (node.name === 'h2') {
      return (
        <StyledH2 key={index}>
          {processNodes(node.children, transform)}
        </StyledH2>
      )
    }
    if (node.name === 'h3') {
      return (
        <StyledH3 key={index}>
          {processNodes(node.children, transform)}
        </StyledH3>
      )
    }
    if (node.name === 'h4') {
      return (
        <StyledH4 key={index}>
          {processNodes(node.children, transform)}
        </StyledH4>
      )
    }
    if (node.name === 'h5') {
      return (
        <StyledH5 key={index} style={{ marginBottom: '4px' }}>
          {processNodes(node.children, transform)}
        </StyledH5>
      )
    }
    if (node.name === 'a') {
      let href = node.attribs.href
      if (/^\/[\d]+$/.test(href)) {
        href = '/content' + href
      }
      return (
        <StyledA href={href} key={index}>
          {processNodes(node.children, transform)}
        </StyledA>
      )
    }
    if (node.name === 'div' && node.attribs && node.attribs.class) {
      if (node.attribs.class.includes('spoiler')) {
        return <StyledP key={index}>[Spoiler]</StyledP>
      }
      if (node.attribs.class.includes('injection')) {
        return <StyledP key={index}>[Injection]</StyledP>
      }
      if (node.attribs.class.includes('table')) {
        return <StyledP key={index}>[Table]</StyledP>
      }
    }
    if (node.name === 'ul') {
      return (
        <StyledUl key={index}>
          {processNodes(node.children, transform)}
        </StyledUl>
      )
    }
    if (node.name === 'ol') {
      return (
        <StyledOl key={index}>
          {processNodes(node.children, transform)}
        </StyledOl>
      )
    }
    if (node.name === 'li') {
      return (
        <StyledLi key={index}>
          {processNodes(node.children, transform)}
        </StyledLi>
      )
    }

    if (node.name === 'blockquote') {
      return (
        <blockquote key={index}>
          {processNodes(node.children, transform)}
        </blockquote>
      )
    }
  }
  console.log(node.type, node.name, node)
}
