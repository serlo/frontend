import { Node, Path } from 'slate'
import dynamic from 'next/dynamic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExternalLinkAlt,
  faCaretDown,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons'

import { ImgCentered } from '../components/content/ImgCentered'
import { MathCentered } from '../components/content/MathCentered'
import { LayoutRow } from '../components/content/LayoutRow'
import { Col } from '../components/content/Col'
import { Important } from '../components/content/Important'
import { StyledA } from '../components/tags/StyledA'
import { StyledH1 } from '../components/tags/StyledH1'
import { StyledH2 } from '../components/tags/StyledH2'
import { StyledH3 } from '../components/tags/StyledH3'
import { StyledH4 } from '../components/tags/StyledH4'
import { StyledH5 } from '../components/tags/StyledH5'
import { StyledUl } from '../components/tags/StyledUl'
import { StyledOl } from '../components/tags/StyledOl'
import { StyledLi } from '../components/tags/StyledLi'
import { StyledP } from '../components/tags/StyledP'
import { StyledImg } from '../components/tags/StyledImg'
import { SpoilerTitle } from '../components/content/SpoilerTitle'
import { SpoilerBody } from '../components/content/SpoilerBody'
import { SpoilerContainer } from '../components/content/SpoilerContainer'
import React from 'react'

const Math = dynamic(import('../components/content/Math'))

interface ArticleProps {
  value: Node[]
}

function Article(props: ArticleProps) {
  const { value } = props
  const root = { children: value }
  return <>{value.map((_, index) => render(root, [index]))}</>
}

function render(value, path = []) {
  const currentNode = Node.get(value, path)
  if (Array.isArray(currentNode.children)) {
    const children = currentNode.children.map((_child, index) =>
      render(value, path.concat(index))
    )
    return renderElement({
      element: currentNode,
      attributes: { key: path[path.length - 1] },
      children,
      value,
      path
    })
  }
  return renderLeaf({
    leaf: Node.get(value, path),
    attributes: { key: path[path.length - 1] },
    children: Node.get(value, path).text
  })
}

export const articleColors = {
  blue: '#1794c1',
  green: '#469a40',
  orange: '#ff6703'
}

export function renderLeaf({ leaf, attributes, children }) {
  const styles: any = {}
  if (leaf.color) {
    styles.color = articleColors[leaf.color]
  }
  if (leaf.strong) {
    styles.fontWeight = 'bold'
  }
  if (leaf.em) {
    styles.fontStyle = 'italic'
  }
  return (
    <span {...attributes} style={styles}>
      {children}
    </span>
  )
}

const renderer = {
  a: renderA,
  'inline-math': renderInlineMath,
  p: renderP,
  h: renderH,
  img: renderImg,
  math: renderMath,
  'spoiler-container': renderSpoiler,
  'spoiler-title': () => null,
  'spoiler-body': ({ children }) => children,
  ul: renderUl,
  ol: renderOl,
  li: renderLi,
  row: renderRow,
  col: renderCol,
  important: renderImportant
}

function renderElement(props) {
  return renderer[props.element.type](props)
}

export function renderA({ element, attributes = {}, children = null }) {
  return renderAOuter({
    element,
    attributes,
    children: (
      <>
        {children}
        {renderAExtInd({ element })}
      </>
    )
  })
}

export function renderAOuter({ element, attributes = {}, children = null }) {
  return (
    <StyledA href={element.href} {...attributes}>
      {children}
    </StyledA>
  )
}

export function renderAExtInd({ element }) {
  return (
    element.href.startsWith('http') && (
      <>
        {' '}
        <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
      </>
    )
  )
}

export function renderInlineMath({ element, attributes = {} }) {
  return <Math formula={element.formula} inline {...attributes} />
}

export function renderP({
  attributes = {},
  children = null,
  value = null,
  path = []
}) {
  let full = false
  let halfslim = false

  if (value) {
    const parent = Node.parent(value, path)
    full = parent.type === 'li'

    const myIndex = path[path.length - 1]
    halfslim = false
    if (myIndex < parent.children.length - 1) {
      const next = parent.children[myIndex + 1]
      if (next.type == 'ul' || next.type == 'ol') {
        halfslim = true
      }
    }
  }

  return (
    <StyledP {...attributes} full={full} slim={full} halfslim={halfslim}>
      {children}
    </StyledP>
  )
}

const StyledHx = {
  1: StyledH1,
  2: StyledH2,
  3: StyledH3,
  4: StyledH4,
  5: StyledH5
}

export function renderH({ element, attributes = {}, children = null }) {
  const Comp = StyledHx[element.level]
  return <Comp {...attributes}>{children}</Comp>
}

export function renderImg({ element, attributes = {} }) {
  return renderImgOuter({
    attributes,
    children: renderImgInner({ element })
  })
}

export function renderImgOuter({ attributes = {}, children = null }) {
  return <ImgCentered {...attributes}>{children}</ImgCentered>
}

export function renderImgInner({ element, attributes = {} }) {
  return (
    <StyledImg
      src={element.src}
      alt={element.alt || 'leeres Bild'}
      maxWidth={element.maxWidth ? element.maxWidth : 0}
      {...attributes}
    ></StyledImg>
  )
}

export function renderMath({ element, attributes = {} }) {
  return renderMathOuter({ attributes, children: renderMathInner({ element }) })
}

export function renderMathOuter({ attributes = {}, children = null }) {
  return <MathCentered {...attributes}>{children}</MathCentered>
}

export function renderMathInner({ element, attributes = {} }) {
  return <Math formula={element.formula} {...attributes} />
}

export function renderSpoiler({ element, attributes = {} }) {
  const title = element.children[0].children[0].text
  const children = render(element.children[1]) // escape hatch
  return (
    <Spoiler {...attributes} defaultOpen={false} title={title}>
      {children}
    </Spoiler>
  )
}

export function Spoiler(props) {
  const { defaultOpen, title, children } = props
  const [open, setOpen] = React.useState(defaultOpen)
  return renderSpoilerContainer({
    children: (
      <>
        {renderSpoilerTitle({
          attributes: {
            onClick: () => setOpen(!open),
            role: 'button'
          },
          children: (
            <>
              {renderSpoilerToggle(open)}
              {title}
            </>
          )
        })}
        {open && renderSpoilerBody({ children })}
      </>
    )
  })
}

export function renderSpoilerContainer({ attributes = {}, children = null }) {
  return <SpoilerContainer {...attributes}>{children}</SpoilerContainer>
}

export function renderSpoilerToggle(open) {
  return (
    <>
      {open ? (
        <FontAwesomeIcon icon={faCaretDown} />
      ) : (
        <FontAwesomeIcon icon={faCaretRight} />
      )}{' '}
    </>
  )
}

export function renderSpoilerTitle({ attributes = {}, children = null }) {
  return <SpoilerTitle {...attributes}>{children}</SpoilerTitle>
}

export function renderSpoilerBody({ attributes = {}, children = null }) {
  return <SpoilerBody {...attributes}>{children}</SpoilerBody>
}

export function renderUl({ attributes, children }) {
  return <StyledUl {...attributes}>{children}</StyledUl>
}

export function renderOl({ attributes, children }) {
  return <StyledOl {...attributes}>{children}</StyledOl>
}

export function renderLi({ attributes, children }) {
  return <StyledLi {...attributes}>{children}</StyledLi>
}

export function renderRow({ attributes = {}, children = null }) {
  return <LayoutRow {...attributes}>{children}</LayoutRow>
}

export function renderCol({
  element,
  attributes = {},
  children = null,
  value,
  path
}) {
  const parent = Path.parent(path)
  let sizeSum = 0
  for (const [child] of Node.children(value, parent)) {
    sizeSum += child.size
  }
  return (
    <Col {...attributes} cSize={(element.size / sizeSum) * 24}>
      {children}
    </Col>
  )
}

export function renderImportant({ attributes, children }) {
  return <Important {...attributes}>{children}</Important>
}
export default Article
