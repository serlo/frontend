import dynamic from 'next/dynamic'
import React from 'react'

import { Col } from '../components/content/col'
import { ExerciseGroup } from '../components/content/exercise-group'
import { GeogebraWrapper } from '../components/content/geogebra-wrapper'
import { ImageLink } from '../components/content/image-link'
import { ImgCentered } from '../components/content/img-centered'
import { Important } from '../components/content/important'
import { LayoutRow } from '../components/content/layout-row'
import { LicenseNotice } from '../components/content/license-notice'
import { Link } from '../components/content/link'
import { MathWrapper } from '../components/content/math-wrapper'
import { MaxWidthDiv } from '../components/content/max-width-div'
import { SpecialCss } from '../components/content/special-css'
import { SpoilerBody } from '../components/content/spoiler-body'
import { SpoilerContainer } from '../components/content/spoiler-container'
import { SpoilerTitle } from '../components/content/spoiler-title'
import { SpoilerToggle } from '../components/content/spoiler-toggle'
import { TableWrapper } from '../components/content/table-wrapper'
import { StyledH1 } from '../components/tags/styled-h1'
import { StyledH2 } from '../components/tags/styled-h2'
import { StyledH3 } from '../components/tags/styled-h3'
import { StyledH4 } from '../components/tags/styled-h4'
import { StyledH5 } from '../components/tags/styled-h5'
import { StyledImg } from '../components/tags/styled-img'
import { StyledLi } from '../components/tags/styled-li'
import { StyledOl } from '../components/tags/styled-ol'
import { StyledP } from '../components/tags/styled-p'
import { StyledTable } from '../components/tags/styled-table'
import { StyledTd } from '../components/tags/styled-td'
import { StyledTh } from '../components/tags/styled-th'
import { StyledTr } from '../components/tags/styled-tr'
import { StyledUl } from '../components/tags/styled-ul'
import { theme } from '../theme'
import type { CodeProps } from '@/components/content/code'
import type { EquationProps } from '@/components/content/equations'
import type { ExerciseProps } from '@/components/content/exercise'
import type { GeogebraProps } from '@/components/content/geogebra'
import type { InjectionProps } from '@/components/content/injection'
import type { MathProps } from '@/components/content/math'
import type { VideoProps } from '@/components/content/video'

const Math = dynamic<MathProps>(() =>
  import('../components/content/math').then((mod) => mod.Math)
)
const Geogebra = dynamic<GeogebraProps>(() =>
  import('../components/content/geogebra').then((mod) => mod.Geogebra)
)
const Injection = dynamic<InjectionProps>(() =>
  import('../components/content/injection').then((mod) => mod.Injection)
)
const Exercise = dynamic<ExerciseProps>(() =>
  import('../components/content/exercise').then((mod) => mod.Exercise)
)
const Video = dynamic<VideoProps>(() =>
  import('../components/content/video').then((mod) => mod.Video)
)
const Equations = dynamic<EquationProps>(() =>
  import('../components/content/equations').then((mod) => mod.Equations)
)
const Code = dynamic<CodeProps>(() =>
  import('../components/content/code').then((mod) => mod.Code)
)

// TODO: this is probably not the correct type.
export function renderArticle(value: React.ReactNodeArray, addCSS = true) {
  if (!value) return null
  const root = { children: value }
  const content = value.map((_, index) => render(root, [index]))
  if (addCSS) {
    return <SpecialCss>{content}</SpecialCss>
  } else return content
}

// TODO: needs type declaration
function getNode(value: any, path: any): any {
  if (path.length === 0) {
    return value
  } else {
    return getNode(value.children[path[0]], path.slice(1))
  }
}

// TODO: needs type declaration
function render(value: any, path: any[] = []) {
  const currentNode = getNode(value, path)
  const key = path[path.length - 1]
  if (currentNode && Array.isArray(currentNode.children)) {
    // TODO: needs type declaration
    const children = currentNode.children.map((_: any, index: any) =>
      render(value, path.concat(index))
    )
    return renderElement({
      element: currentNode,
      attributes: {
        key,
      },
      children,
      value,
      path,
    })
  }
  if (!currentNode) return null
  if (currentNode?.text === '') {
    return null // avoid rendering empty spans
  }
  return renderLeaf({
    leaf: currentNode,
    attributes: { key },
    children: currentNode?.text,
    readonly: true,
  })
}

export const articleColors = {
  blue: theme.colors.blue,
  green: theme.colors.green,
  orange: theme.colors.orange,
}

// TODO: needs type declaration

interface RenderLeafProps {
  leaf: {
    color?: 'blue' | 'green' | 'orange'
    em?: boolean
    strong?: boolean
  }
  attributes: any
  children: React.ReactNode
  readonly?: boolean
}

export function renderLeaf({
  leaf,
  attributes,
  children,
  readonly = false,
}: RenderLeafProps) {
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
  // TODO: needs type declaration
  'spoiler-title': ({ children }: any) => children,
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
  video: renderVideo,
  equations: renderEquations,
  code: renderCode,
}

// TODO: needs type declaration
function renderElement(props: any) {
  const type = props.element.type as keyof typeof renderer
  return renderer[type](props)
}

// TODO: needs type declaration
const nowrap = (comp: any) => comp

// TODO: needs type declaration
export function renderA({ element, attributes = {}, children = null }: any) {
  return (
    <Link element={element} {...attributes}>
      {children}
    </Link>
  )
}

// TODO: needs type declaration
export function renderInlineMath({ element, attributes = {} }: any) {
  return <Math formula={element.formula} inline {...attributes} />
}

// TODO: needs type declaration
export function renderP({ attributes = {}, children = null }: any) {
  return <StyledP {...attributes}>{children}</StyledP>
}

const StyledHx = {
  1: StyledH1,
  2: StyledH2,
  3: StyledH3,
  4: StyledH4,
  5: StyledH5,
}

interface RenderHProps {
  element: {
    level: 1 | 2 | 3 | 4 | 5
    id: number
  }
  attributes: any
  children: any
}

// TODO: needs type declaration
export function renderH({
  element,
  attributes = {},
  children = null,
}: RenderHProps) {
  const Comp = StyledHx[element.level] ?? StyledH5
  return (
    <Comp {...attributes} id={element.id}>
      {children}
    </Comp>
  )
}

// TODO: needs type declaration
export function renderImg({
  element,
  attributes = {},
  children = null,
  wrapImg = nowrap,
}: any) {
  // TODO: needs type declaration
  function wrapInA(comp: any) {
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

// TODO: needs type declaration
export function renderMath({
  element,
  attributes = {},
  children = null,
  wrapFormula = nowrap,
}: any) {
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
    formula = `\\def\\arraystretch{1.6} ${formula}`
  }

  return (
    <MathWrapper centered={!element.alignLeft} bigger={bigger} {...attributes}>
      {wrapFormula(<Math formula={formula} />)}
      {children}
    </MathWrapper>
  )
}

// output only
// TODO: needs type declaration
function renderSpoilerForEndUser({ attributes = {}, children }: any) {
  return (
    <SpoilerForEndUser {...attributes} title={children[0]} body={children[1]} />
  )
}

// TODO: needs type declaration
function SpoilerForEndUser(props: any) {
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
    ),
  })
}

// TODO: needs type declaration
export function renderSpoilerContainer({
  attributes = {},
  children = null,
}: any) {
  return <SpoilerContainer {...attributes}>{children}</SpoilerContainer>
}

// TODO: needs type declaration
export function renderSpoilerBody({ attributes = {}, children = null }: any) {
  return <SpoilerBody {...attributes}>{children}</SpoilerBody>
}

// TODO: needs type declaration
export function renderUl({ attributes = {}, children = null }: any) {
  return <StyledUl {...attributes}>{children}</StyledUl>
}

// TODO: needs type declaration
export function renderOl({ attributes = {}, children = null }: any) {
  return <StyledOl {...attributes}>{children}</StyledOl>
}

// TODO: needs type declaration
export function renderLi({ attributes = {}, children = null }: any) {
  return <StyledLi {...attributes}>{children}</StyledLi>
}

// TODO: needs type declaration
export function renderTable({ attributes = {}, children = null }: any) {
  const { key, ...otherAttribs } = attributes
  return (
    <TableWrapper key={key}>
      <StyledTable>
        <tbody {...otherAttribs}>{children}</tbody>
      </StyledTable>
    </TableWrapper>
  )
}

// TODO: needs type declaration
export function renderTR({ attributes = {}, children = null }: any) {
  return <StyledTr {...attributes}>{children}</StyledTr>
}

// TODO: needs type declaration
export function renderTH({ attributes = {}, children = null }: any) {
  return <StyledTh {...attributes}>{children}</StyledTh>
}

// TODO: needs type declaration
export function renderTD({ attributes = {}, children = null }: any) {
  return <StyledTd {...attributes}>{children}</StyledTd>
}

// TODO: needs type declaration
export function renderRow({ attributes = {}, children = null }: any) {
  return <LayoutRow {...attributes}>{children}</LayoutRow>
}

// TODO: needs type declaration
export function renderCol({ element, attributes = {}, children = null }: any) {
  return (
    <Col {...attributes} cSize={element.size}>
      {children}
    </Col>
  )
}

// TODO: needs type declaration
export function renderImportant({ attributes = {}, children = null }: any) {
  return <Important {...attributes}>{children}</Important>
}

// TODO: needs type declaration
export function renderGeogebra({
  element,
  attributes = {},
  children = null,
}: any) {
  return (
    <GeogebraWrapper {...attributes}>
      <Geogebra id={element.id} />
      {children}
    </GeogebraWrapper>
  )
}

// output only
// TODO: needs type declaration
function renderAnchor({ element, attributes = {} }: any) {
  return <a id={element.id} {...attributes} />
}

// TODO: needs type declaration
export function renderInjection({
  attributes = {},
  children = null,
  element,
}: any) {
  return (
    <Injection {...attributes} href={element.href}>
      {children}
    </Injection>
  )
}

// TODO: needs type declaration
export function renderExercise({
  attributes = {},
  children = null,
  element,
}: any) {
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

// TODO: needs type declaration
export function renderExerciseGroup({
  attributes,
  children = null,
  element,
}: any) {
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

// TODO: needs type declaration
export function renderVideo({
  attributes = {},
  children = null,
  element,
}: any) {
  return (
    <Video {...attributes} url={element.src}>
      {children}
    </Video>
  )
}

// TODO: needs type declaration
export function renderEquations({ attributes = {}, element }: any) {
  return <Equations {...attributes} steps={element.steps} />
}

// TODO: needs type declaration
export function renderCode({ attributes = {}, element }: any) {
  return <Code content={element.content} {...attributes} />
}
