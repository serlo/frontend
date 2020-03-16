import * as htmlparser2 from 'htmlparser2'

import {
  Row,
  LayoutRow,
  Col,
  StyledP,
  Img,
  StyledH2,
  StyledA,
  StyledLi,
  StyledUl,
  StyledH3,
  StyledH4,
  StyledH5,
  StyledOl,
  InlineImg,
  MathCentered,
  Important
} from '../visuals'

import Math from '../math'
import Spoiler from '../spoiler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

export default function LegacyRenderer(props) {
  const { state } = props
  console.log('legacy')
  const dom = htmlparser2.parseDOM(state)
  return transform(dom)
}

function transform(node, path = [], index = 0) {
  if (!node) {
    console.log('transform hat leeren Knoten erhalten')
    return null
  }

  if (Array.isArray(node)) {
    return node.map((child, index, arr) => transform(child, path, index))
  }

  // console.log('>', path, index, node)

  if (node.type === 'tag') {
    if (node.name === 'div' && node.attribs && node.attribs.class) {
      const className = node.attribs.class
      if (className === 'r') {
        return (
          <LayoutRow key={index}>
            {transform(node.children, [...path, 'r'])}
          </LayoutRow>
        )
      }
      if (/^c[\d]+$/.test(className)) {
        return (
          <Col key={index} size={parseInt(className.substring(1))}>
            {transform(node.children, [...path, className])}
          </Col>
        )
      }
      if (className.includes('spoiler')) {
        // tricky ...
        const title = node.children[0].children[1].data
        const content = node.children[1].children
        return (
          <Spoiler key={index} title={title} defaultOpen={false}>
            {transform(content, [...path, 'spoiler'])}
          </Spoiler>
        )
      }
      if (className === 'injection') {
        return (
          <StyledP key={index}>
            [Injection: {transform(node.children, [...path, 'injection'])}]
          </StyledP>
        )
      }
    }
    if (node.name == 'div') {
      if (node.children[3]) {
        const warning = node.children[3]
        if (warning.attribs.class === 'legacy-injection') {
          return <StyledP key={index}>[Injection Error]</StyledP>
        }
      }
    }
    if (node.name === 'span') {
      const className = node.attribs.class
      if (className === 'mathInline') {
        let formula = node.children[0].data
        formula = formula.substring(2, formula.length - 2)
        // console.log('formula', formula)
        return <Math formula={formula} key={index} inline />
      }
      if (className === 'math') {
        // we can not center this block line formula
        let formula = node.children[0].data
        formula = formula.substring(2, formula.length - 2)
        return (
          <span style={{ display: 'inline-block' }} key={index}>
            <Math formula={formula} />
          </span>
        )
      }
    }
    if (node.name === 'p') {
      if (node.children.length == 1) {
        const child = node.children[0]
        if (child.type === 'tag') {
          if (child.name === 'span' && child.attribs.class === 'math') {
            let formula = child.children[0].data
            formula = formula.substring(2, formula.length - 2)
            // console.log('formula block', formula)
            return (
              <MathCentered key={index}>
                <Math formula={formula} />
              </MathCentered>
            )
          }
        }
      }
      const full = path.includes('li')
      return (
        <StyledP key={index} full={full} slim={full}>
          {transform(node.children, [...path, 'p'])}
        </StyledP>
      )
    }
    if (node.name === 'strong') {
      return (
        <strong key={index}>
          {transform(node.children, [...path, 'strong'])}
        </strong>
      )
    }
    if (node.name === 'em') {
      return <em key={index}>{transform(node.children, [...path, 'em'])}</em>
    }
    if (node.name === 'img') {
      if (path.includes('p')) {
        return (
          <InlineImg
            src={node.attribs.src}
            alt={node.attribs.alt}
            key={index}
          ></InlineImg>
        )
      }
    }
    if (node.name === 'h2') {
      return (
        <StyledH2 key={index} id={node.attribs.id}>
          {transform(node.children, [...path, 'h2'])}
        </StyledH2>
      )
    }
    if (node.name === 'h3') {
      return (
        <StyledH3 key={index} id={node.attribs.id}>
          {transform(node.children, [...path, 'h3'])}
        </StyledH3>
      )
    }
    if (node.name === 'h4') {
      return (
        <StyledH4 key={index} id={node.attribs.id}>
          {transform(node.children, [...path, 'h4'])}
        </StyledH4>
      )
    }
    if (node.name === 'h5') {
      return (
        <StyledH5 key={index} id={node.attribs.id}>
          {transform(node.children, [...path, 'h5'])}
        </StyledH5>
      )
    }
    if (node.name === 'ul') {
      return (
        <StyledUl key={index}>
          {transform(node.children, [...path, 'ul'])}
        </StyledUl>
      )
    }
    if (node.name === 'ol') {
      return (
        <StyledOl key={index}>
          {transform(node.children, [...path, 'ol'])}
        </StyledOl>
      )
    }
    if (node.name === 'li') {
      return (
        <StyledLi key={index}>
          {transform(node.children, [...path, 'li'])}
        </StyledLi>
      )
    }
    if (node.name === 'a') {
      if (node.children.length > 0) {
        if (node.attribs.href.startsWith('http')) {
          return (
            <StyledA href={node.attribs.href} key={index}>
              {transform(node.children, [...path, 'a'])}{' '}
              <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
            </StyledA>
          )
        }
        return (
          <StyledA href={node.attribs.href} key={index}>
            {transform(node.children, [...path, 'a'])}
          </StyledA>
        )
      } else {
        return (
          <StyledA href={node.attribs.href} key={index}>
            {node.attribs.href}
          </StyledA>
        )
      }
    }
    if (node.name === 'hr') {
      return <hr key={index} style={{ marginBottom: '38px' }} />
    }
    if (node.name === 'br') {
      return <br key={index} />
    }
    if (node.name === 'blockquote') {
      return (
        <Important key={index}>
          {transform(node.children, [...path, 'blockquote'])}
        </Important>
      )
    }
  }
  if (node.type === 'text') {
    const text = node.data.replace('&nbsp;', '')
    return text
  }

  console.log('missing', node, path)
  return null
}
