import React from 'react'
import dynamic from 'next/dynamic'

import ImgCentered from '../components/content/ImgCentered'
import MathWrapper from '../components/content/MathWrapper'
import LayoutRow from '../components/content/LayoutRow'
import Col from '../components/content/Col'
import Important from '../components/content/Important'
import StyledH1 from '../components/tags/StyledH1'
import StyledH2 from '../components/tags/StyledH2'
import StyledH3 from '../components/tags/StyledH3'
import StyledH4 from '../components/tags/StyledH4'
import StyledH5 from '../components/tags/StyledH5'
import StyledUl from '../components/tags/StyledUl'
import StyledOl from '../components/tags/StyledOl'
import StyledLi from '../components/tags/StyledLi'
import StyledP from '../components/tags/StyledP'
import StyledImg from '../components/tags/StyledImg'
import SpoilerTitle from '../components/content/SpoilerTitle'
import SpoilerBody from '../components/content/SpoilerBody'
import SpoilerContainer from '../components/content/SpoilerContainer'
import StyledTable from '../components/tags/StyledTable'
import StyledTR from '../components/tags/StyledTR'
import StyledTH from '../components/tags/StyledTH'
import StyledTD from '../components/tags/StyledTD'
import TableWrapper from '../components/content/TableWrapper'
import SpoilerToggle from '../components/content/SpoilerToggle'
import GeogebraWrapper from '../components/content/GeogebraWrapper'
import ExerciseGroup from '../components/content/ExerciseGroup'
import Link from '../components/content/Link'

import SpecialCSS from '../components/content/SpecialCSS'
import { theme } from '../theme'
import ImageLink from '../components/content/ImageLink'
import MaxWidthDiv from '../components/content/MaxWidthDiv'
import LicenseNotice from '../components/content/LicenseNotice'

const Math = dynamic(() => import('../components/content/Math'))
const Geogebra = dynamic(() => import('../components/content/Geogebra'))
const Injection = dynamic(() => import('../components/content/Injection'))
const Exercise = dynamic(() => import('../components/content/Exercise'))
const Video = dynamic(() => import('../components/content/Video'))

export function renderArticle(value: Node[], addCSS = true) {
  if (!value) return null
  const root = { children: value }
  const content = value.map((_, index) => render(root, [index]))
  if (addCSS) {
    return <SpecialCSS>{content}</SpecialCSS>
  } else return content
}

function getNode(value, path) {
  if (path.length === 0) {
    return value
  } else {
    return getNode(value.children[path[0]], path.slice(1))
  }
}

function render(value, path = []) {
  const currentNode = getNode(value, path)
  const key = path[path.length - 1]
  if (currentNode && Array.isArray(currentNode.children)) {
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
  blue: theme.colors.blue,
  green: theme.colors.green,
  orange: theme.colors.orange
}

export function renderLeaf({ leaf, attributes, children, readonly = false }) {
  const styles: any = {}

  if (leaf.color) styles.color = articleColors[leaf.color]
  if (leaf.em) styles.fontStyle = 'italic'
  if (leaf.strong) styles.fontWeight = 'bold'

  if (readonly && Object.keys(styles).length === 0) return children

  const LeafTag = leaf.strong ? 'b' : leaf.em ? 'i' : 'span'
  const outputStyles = !(Object.keys(styles).length === 1 && LeafTag !== 'span')

  return (
    <LeafTag {...attributes} style={outputStyles ? styles : {}}>
      {children}
    </LeafTag>
  )
}

const renderer = {
  a: renderA,
  'inline-math': renderInlineMath,
  p: renderP,
  h: renderH,
  img: renderImg,
  math: renderMath,
  'spoiler-container': renderSpoilerForEndUser,
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
  td: renderTD,
  geogebra: renderGeogebra,
  injection: renderInjection,
  exercise: renderExercise,
  'exercise-group': renderExerciseGroup,
  video: renderVideo
}

function renderElement(props) {
  return renderer[props.element.type](props)
}

const nowrap = comp => comp

export function renderA({
  element,
  attributes = {},
  children = null
}) {
  return (
    <Link element={element} {...attributes}>
      {children}
    </Link>
  )
}

export function renderInlineMath({ element, attributes = {} }) {
  return <Math formula={element.formula} inline {...attributes} />
}

export function renderP({ attributes = {}, children = null }) {
  return <StyledP {...attributes}>{children}</StyledP>
}

const StyledHx = {
  1: StyledH1,
  2: StyledH2,
  3: StyledH3,
  4: StyledH4,
  5: StyledH5
}

export function renderH({ element, attributes = {}, children = null }) {
  const Comp = StyledHx[element.level] ?? StyledH5
  return (
    <Comp {...attributes} id={element.id}>
      {children}
    </Comp>
  )
}

export function renderImg({
  element,
  attributes = {},
  children = null,
  wrapImg = nowrap
}) {
  function wrapInA(comp) {
    if (element.href) {
      // needs investigation if this could be simplified
      return <ImageLink href={element.href}>{comp}</ImageLink>
    }
    return comp
  }
  return (
    <ImgCentered {...attributes}>
      {wrapImg(
        <MaxWidthDiv maxWidth={element.maxWidth ? element.maxWidth : 0}>
          {wrapInA(
            <StyledImg
              src={element.src}
              alt={element.alt || 'Bild'}
            ></StyledImg>
          )}
        </MaxWidthDiv>
      )}

      {children}
    </ImgCentered>
  )
}

export function renderMath({
  element,
  attributes = {},
  children = null,
  wrapFormula = nowrap
}) {
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
    <MathWrapper centered={!element.alignLeft} bigger={bigger} {...attributes}>
      {wrapFormula(<Math formula={formula} />)}
      {children}
    </MathWrapper>
  )
}

// output only
function renderSpoilerForEndUser({ attributes = {}, children }) {
  return (
    <SpoilerForEndUser {...attributes} title={children[0]} body={children[1]} />
  )
}

function SpoilerForEndUser(props) {
  const { body, title } = props
  const [open, setOpen] = React.useState(false)
  return renderSpoilerContainer({
    children: (
      <>
        <SpoilerTitle onClick={() => setOpen(!open)} open={open}>
          <SpoilerToggle open={open} />
          {title}
        </SpoilerTitle>
        {open && body}
      </>
    )
  })
}

export function renderSpoilerContainer({ attributes = {}, children = null }) {
  return <SpoilerContainer {...attributes}>{children}</SpoilerContainer>
}

export function renderSpoilerBody({ attributes = {}, children = null }) {
  return <SpoilerBody {...attributes}>{children}</SpoilerBody>
}

export function renderUl({ attributes = {}, children = null }) {
  return <StyledUl {...attributes}>{children}</StyledUl>
}

export function renderOl({ attributes = {}, children = null }) {
  return <StyledOl {...attributes}>{children}</StyledOl>
}

export function renderLi({ attributes = {}, children = null }) {
  return <StyledLi {...attributes}>{children}</StyledLi>
}

export function renderTable({ attributes = {}, children = null }) {
  const { key, ...otherAttribs } = attributes as any
  return (
    <TableWrapper key={key}>
      <StyledTable>
        <tbody {...otherAttribs}>{children}</tbody>
      </StyledTable>
    </TableWrapper>
  )
}

export function renderTR({ attributes = {}, children = null }) {
  return <StyledTR {...attributes}>{children}</StyledTR>
}

export function renderTH({ attributes = {}, children = null }) {
  return <StyledTH {...attributes}>{children}</StyledTH>
}

export function renderTD({ attributes = {}, children = null }) {
  return <StyledTD {...attributes}>{children}</StyledTD>
}

export function renderRow({ attributes = {}, children = null }) {
  return <LayoutRow {...attributes}>{children}</LayoutRow>
}

export function renderCol({ element, attributes = {}, children = null }) {
  return (
    <Col {...attributes} cSize={element.size}>
      {children}
    </Col>
  )
}

export function renderImportant({ attributes = {}, children = null }) {
  return <Important {...attributes}>{children}</Important>
}

export function renderGeogebra({ element, attributes = {}, children = null }) {
  return (
    <GeogebraWrapper {...attributes}>
      <Geogebra id={element.id} />
      {children}
    </GeogebraWrapper>
  )
}

// output only
function renderAnchor({ element, attributes = {} }) {
  return <a id={element.id} {...attributes} />
}

export function renderInjection({ attributes = {}, children = null, element }) {
  return (
    <Injection {...attributes} href={element.href}>
      {children}
    </Injection>
  )
}

export function renderExercise({ attributes = {}, children = null, element }) {
  return (
    <Exercise
      {...attributes}
      task={element.task}
      grouped={element.grouped}
      positionInGroup={element.positionInGroup}
      positionOnPage={element.positionOnPage}
      solution={element.solution}
      taskLicense={element.taskLicense}
      solutionLicense={element.solutionLicense}
    >
      {children}
    </Exercise>
  )
}

export function renderExerciseGroup({ attributes, children = null, element }) {
  return (
    <React.Fragment key={attributes.key}>
      <ExerciseGroup
        {...attributes}
        license={
          element.license && <LicenseNotice minimal data={element.license} />
        }
        groupIntro={renderArticle(element.content, false)}
        positionOnPage={element.positionOnPage}
      >
        {children}
      </ExerciseGroup>
    </React.Fragment>
  )
}

export function renderVideo({ attributes = {}, children = null, element }) {
  return (
    <Video {...attributes} url={element.src}>
      {children}
    </Video>
  )
}
