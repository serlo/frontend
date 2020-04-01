import React from 'react'
import { Node, Path, Element } from 'slate'
import dynamic from 'next/dynamic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExternalLinkAlt,
  faCaretDown,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons'

import { ImgCentered } from '../components/content/ImgCentered'
import { MathWrapper } from '../components/content/MathWrapper'
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
import { StyledTable } from '../components/tags/StyledTable'
import { StyledTR } from '../components/tags/StyledTR'
import { StyledTH } from '../components/tags/StyledTH'
import { StyledTD } from '../components/tags/StyledTD'
import { TableWrapper } from '../components/content/TableWrapper'

const Math = dynamic(import('../components/content/Math'))

export interface ArticleProps {
  value: Node[]
}

export const enclosingParents = ['li', 'important', 'spoiler', 'th', 'td']

export default function Article(props: ArticleProps) {
  const { value } = props
  const root = { children: value }
  return <>{value.map((_, index) => render(root, [index]))}</>
}

function render(value, path = []) {
  const currentNode = Node.get(value, path)
  const key = path[path.length - 1]
  if (Element.isElement(currentNode)) {
    const children = currentNode.children.map((_, index) =>
      render(value, path.concat(index))
    )
    return renderElement({
      element: currentNode,
      attributes: { key },
      children,
      value,
      path
    })
  }
  if (currentNode.text === '') {
    return null // avoid rendering empty spans
  }
  return renderLeaf({
    leaf: currentNode,
    attributes: { key },
    children: currentNode.text,
    readonly: true
  })
}

export const articleColors = {
  blue: '#1794c1',
  green: '#469a40',
  orange: '#ff6703'
}

export function renderLeaf({ leaf, attributes, children, readonly = false }) {
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
  'spoiler-title': ({ children }) => children,
  'spoiler-body': renderSpoilerBody,
  ul: renderUl,
  ol: renderOl,
  li: renderLi,
  row: renderRow,
  col: renderCol,
  important: renderImportant,
  anchor: renderAnchor,
  table: renderTable,
  tr: renderTR,
  th: renderTH,
  td: renderTD
}

function renderElement(props) {
  return renderer[props.element.type](props)
}

const nowrap = comp => comp

const externalIndicator = (
  <>
    {' '}
    <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
  </>
)

export function renderA({
  element,
  attributes = {},
  children = null,
  wrapExtInd = nowrap
}) {
  return (
    <StyledA href={element.href} {...attributes}>
      {children}
      {element.href.startsWith('http') && wrapExtInd(externalIndicator)}
    </StyledA>
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
  let mb = 'block'
  let full = false

  if (value) {
    const parent = Node.parent(value, path)
    const myIndex = path[path.length - 1]
    if (enclosingParents.includes(parent.type)) {
      if (myIndex === parent.children.length - 1) {
        mb = 'none'
      }
    }
    // opti: list ahead
    if (mb == 'block') {
      if (myIndex < parent.children.length - 1) {
        const next = parent.children[myIndex + 1]
        if (next.type == 'ul' || next.type == 'ol') {
          mb = 'slim'
        }
      }
    }
    if (parent.type === 'li') {
      full = true
    }
  }

  return (
    <StyledP {...attributes} mb={mb} full={full}>
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

export function renderImg({
  element,
  attributes = {},
  children = null,
  wrapImg = nowrap,
  value = null,
  path = []
}) {
  const img = (
    <StyledImg
      src={element.src}
      alt={element.alt || 'Bild'}
      maxWidth={element.maxWidth ? element.maxWidth : 0}
    ></StyledImg>
  )
  let mb = 'block'
  let full = false

  if (value) {
    const parent = Node.parent(value, path)
    const myIndex = path[path.length - 1]
    if (enclosingParents.includes(parent.type)) {
      if (myIndex === parent.children.length - 1) {
        mb = 'none'
      }
    }
    // opti: list ahead
    if (mb == 'block') {
      if (myIndex < parent.children.length - 1) {
        const next = parent.children[myIndex + 1]
        if (next.type == 'ul' || next.type == 'ol') {
          mb = 'slim'
        }
      }
    }
    if (parent.type === 'li') {
      full = true
    }
  }
  return (
    <ImgCentered {...attributes} mb={mb} full={full}>
      {wrapImg(
        element.href ? (
          <a href={element.href} style={{ maxWidth: '100%', display: 'block' }}>
            {img}
          </a>
        ) : (
          img
        )
      )}
      {children}
    </ImgCentered>
  )
}

export function renderMath({
  element,
  attributes = {},
  children = null,
  wrapFormula = nowrap,
  value = null,
  path = []
}) {
  let centered = true
  if (element.alignLeft) {
    centered = false
  }

  let mb = 'block'

  if (value) {
    const parent = Node.parent(value, path)
    const myIndex = path[path.length - 1]
    if (enclosingParents.includes(parent.type)) {
      if (myIndex === parent.children.length - 1) {
        mb = 'none'
      }
    }
  }
  let formula = element.formula
  let bigger = false
  if (
    element.formula.includes('\\int') ||
    element.formula.includes('frac') ||
    element.formula.includes('^')
  ) {
    bigger = true
  }
  if (
    formula.includes('\\begin{aligned}') ||
    formula.includes('\\begin{array}')
  ) {
    formula = '\\def\\arraystretch{1.6} ' + formula
  }

  return (
    <MathWrapper mb={mb} centered={centered} bigger={bigger} {...attributes}>
      {wrapFormula(<Math formula={formula} />)}
      {children}
    </MathWrapper>
  )
}

export function renderSpoiler({ attributes = {}, children }) {
  return <Spoiler {...attributes} body={children[1]} title={children[0]} />
}

function Spoiler(props) {
  const { body, title } = props
  const [open, setOpen] = React.useState(false)
  return (
    <SpoilerContainer>
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
      {open && body}
    </SpoilerContainer>
  )
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

export function renderTable({ attributes, children }) {
  return (
    <TableWrapper key={attributes.key}>
      <StyledTable>
        <tbody {...attributes}>{children}</tbody>
      </StyledTable>
    </TableWrapper>
  )
}

export function renderTR({ attributes, children }) {
  return <StyledTR {...attributes}>{children}</StyledTR>
}

export function renderTH({ attributes, children }) {
  return <StyledTH {...attributes}>{children}</StyledTH>
}

export function renderTD({ attributes, children }) {
  return <StyledTD {...attributes}>{children}</StyledTD>
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

export function renderAnchor({ element, attributes }) {
  return <a id={element.id} {...attributes} />
}
