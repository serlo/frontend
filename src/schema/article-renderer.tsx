import dynamic from 'next/dynamic'
import React from 'react'
import { CSSProperties } from 'styled-components'

import { Col } from '../components/content/col'
import { ExerciseGroup } from '../components/content/exercise-group'
import { GeogebraWrapper } from '../components/content/geogebra-wrapper'
import { ImageLink } from '../components/content/image-link'
import { ImgCentered } from '../components/content/img-centered'
import { Important } from '../components/content/important'
import { LayoutRow } from '../components/content/layout-row'
import {
  LicenseNotice,
  LicenseData,
} from '../components/content/license-notice'
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
import { Lazy } from '@/components/content/lazy'
import type { MathProps } from '@/components/content/math'
import type { VideoProps } from '@/components/content/video'

const renderer = {
  root: () => null,
  a: renderA,
  'inline-math': renderInlineMath,
  p: renderP,
  h: renderH,
  img: renderImg,
  math: renderMath,
  'spoiler-container': renderSpoilerForEndUser,
  'spoiler-title': ({ children }: ReactChildrenData) => children,
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

type renderElementData = keyof typeof renderer

interface ReactChildrenData {
  children: React.ReactNode
}

interface RenderElementProps {
  element: EditorChild
  children: React.ReactNode
  value: EditorChild
  path: number[]
}
// TODO: The quest for the correct type continues here
export interface EditorState {
  children?: EditorChild[]
  type: renderElementData
}

export interface EditorChild {
  type?: string
  state?: unknown
  children?: EditorChild[]
  text?: string
}

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

export function renderArticle(value: EditorState['children'], addCSS = true) {
  if (!value || !Array.isArray(value)) return null
  const root = { children: value, type: 'root' as renderElementData }
  const content = value.map((_, index) => render(root, [index]))
  if (addCSS) {
    return <SpecialCss>{content}</SpecialCss>
  } else return content
}

function getNode(value: EditorChild, path: number[]): EditorChild {
  if (path.length === 0 || value.children === undefined) {
    return value
  } else {
    return getNode(value.children[path[0]], path.slice(1))
  }
}

function render(value: EditorChild, path: number[] = []) {
  const currentNode = getNode(value, path)
  const key = path[path.length - 1]

  if (currentNode && currentNode.type) {
    const children = Array.isArray(currentNode.children)
      ? currentNode.children.map((_: EditorChild, index: number) =>
          render(value, path.concat(index))
        )
      : null
    return (
      <React.Fragment key={key}>
        {renderElement({
          element: currentNode,
          children: children,
          value,
          path,
        })}
      </React.Fragment>
    )
  }
  if (!currentNode) return null
  if (currentNode?.text === '') {
    return null // avoid rendering empty spans
  }
  return renderLeaf({
    leaf: currentNode,
    key,
    children: currentNode?.text,
    readonly: true,
  })
}

export const articleColors = {
  blue: theme.colors.blue,
  green: theme.colors.green,
  orange: theme.colors.orange,
}

interface RenderLeafProps {
  leaf: EditorChild & {
    color?: 'blue' | 'green' | 'orange'
    em?: boolean
    strong?: boolean
  }
  key: number
  children: React.ReactNode
  readonly?: boolean
}

export function renderLeaf({
  leaf,
  key,
  children,
  readonly = false,
}: RenderLeafProps) {
  const styles: CSSProperties = {}
  if (leaf.color) styles.color = articleColors[leaf.color]
  if (leaf.em) styles.fontStyle = 'italic'
  if (leaf.strong) styles.fontWeight = 'bold'

  if (readonly && Object.keys(styles).length === 0) return children

  const LeafTag = leaf.strong ? 'b' : leaf.em ? 'i' : 'span'
  const outputStyles = !(Object.keys(styles).length === 1 && LeafTag !== 'span')

  return (
    <LeafTag key={key} style={outputStyles ? styles : {}}>
      {children}
    </LeafTag>
  )
}

function renderElement(props: RenderElementProps) {
  //TODO: Check with Jonas
  // @ts-expect-error
  return renderer[props.element.type](props)
}

interface RenderAData {
  element: { href: string }
  children: React.ReactNode
}

// TODO: needs type declaration
export function renderA({ element, children = null }: any) {
  return <Link href={element.href}>{children}</Link>
}

interface RenderInlineMathData {
  element: MathProps
  children: React.ReactNode
}
export function renderInlineMath({ element }: RenderInlineMathData) {
  return <Math formula={element.formula} inline />
}

export function renderMath({ element }: RenderInlineMathData) {
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
    <Lazy slim>
      <MathWrapper centered={!element.alignLeft} bigger={bigger}>
        <Math formula={formula} />
      </MathWrapper>
    </Lazy>
  )
}

export function renderP({ children = null }) {
  return <StyledP>{children}</StyledP>
}

const StyledHx = {
  1: StyledH1,
  2: StyledH2,
  3: StyledH3,
  4: StyledH4,
  5: StyledH5,
}

interface RenderHData {
  element: {
    level: 1 | 2 | 3 | 4 | 5
    id: string
  }
  key: string
  children: any
}

export function renderH({ element, children = null }: RenderHData) {
  const Comp = StyledHx[element.level] ?? StyledH5
  return <Comp id={element.id}>{children}</Comp>
}

interface RenderImgData {
  element: {
    href: string
    maxWidth?: number
    src: string
    alt: string
  }
  children: React.ReactNode
}

export function renderImg({ element }: RenderImgData) {
  function wrapInA(comp: React.ReactNode) {
    if (element.href) {
      // needs investigation if this could be simplified
      return <ImageLink href={element.href}>{comp}</ImageLink>
    }
    return comp
  }
  return (
    <ImgCentered itemScope itemType="http://schema.org/ImageObject">
      <MaxWidthDiv maxWidth={element.maxWidth ? element.maxWidth : 0}>
        {wrapInA(
          <Lazy>
            <StyledImg
              src={element.src}
              alt={element.alt || 'Bild'}
              itemProp="contentUrl"
            ></StyledImg>
          </Lazy>
        )}
      </MaxWidthDiv>
    </ImgCentered>
  )
}

interface RenderSpoilerForEndUserData {
  children: React.ReactNode
  body: React.ReactNode
}

function renderSpoilerForEndUser({ children }: RenderSpoilerForEndUserData) {
  if (!Array.isArray(children)) return null
  return <SpoilerForEndUser title={children[0]} body={children[1]} />
}

interface SpoilerForEndUserProps {
  body: React.ReactNode
  title: React.ReactNode
}

function SpoilerForEndUser({ body, title }: SpoilerForEndUserProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <SpoilerContainer>
      <SpoilerTitle onClick={() => setOpen(!open)} open={open}>
        <SpoilerToggle open={open} />
        {title}
      </SpoilerTitle>
      {open && body}
    </SpoilerContainer>
  )
}

export function renderSpoilerBody({ children = null }) {
  return <SpoilerBody>{children}</SpoilerBody>
}

export function renderUl({ children = null }) {
  return <StyledUl>{children}</StyledUl>
}

export function renderOl({ children = null }) {
  return <StyledOl>{children}</StyledOl>
}

export function renderLi({ children = null }) {
  return <StyledLi>{children}</StyledLi>
}

export function renderTable({ children = null }) {
  return (
    <TableWrapper>
      <StyledTable>
        <tbody>{children}</tbody>
      </StyledTable>
    </TableWrapper>
  )
}

export function renderTR({ children = null }) {
  return <StyledTr>{children}</StyledTr>
}

export function renderTH({ children = null }) {
  return <StyledTh>{children}</StyledTh>
}

export function renderTD({ children = null }) {
  return <StyledTd>{children}</StyledTd>
}

export function renderRow({ children = null }) {
  return <LayoutRow>{children}</LayoutRow>
}

interface RenderColData {
  children: React.ReactNode
  element: {
    size: number
  }
}

export function renderCol({ element, children = null }: RenderColData) {
  return <Col cSize={element.size}>{children}</Col>
}

export function renderImportant({ children = null }) {
  return <Important>{children}</Important>
}

interface RenderGeogebraData {
  children: React.ReactNode
  element: {
    id: string
  }
}
export function renderGeogebra({ element }: RenderGeogebraData) {
  return (
    <Lazy>
      <GeogebraWrapper>
        <Geogebra id={element.id} />
      </GeogebraWrapper>
    </Lazy>
  )
}

interface RenderAnchorData {
  children: React.ReactNode
  element: {
    id: number
  }
}
function renderAnchor({ element }: RenderAnchorData) {
  return <a id={element.id.toString()} />
}

interface RenderInjectionData {
  children: React.ReactNode
  element: InjectionProps
}

export function renderInjection({ element }: RenderInjectionData) {
  return <Injection href={element.href} />
}

interface RenderExerciseData {
  element: ExerciseProps
}

export function renderExercise({ element }: RenderExerciseData) {
  return (
    <Exercise
      task={element.task}
      grouped={element.grouped}
      positionInGroup={element.positionInGroup}
      positionOnPage={element.positionOnPage}
      solution={element.solution}
      taskLicense={element.taskLicense}
      solutionLicense={element.solutionLicense}
    />
  )
}

interface RenderExerciseGroupData {
  element: {
    content: EditorChild[]
    license: LicenseData
    positionOnPage: number
  }
  children: React.ReactNode
}

export function renderExerciseGroup({
  children = null,
  element,
}: RenderExerciseGroupData) {
  return (
    <ExerciseGroup
      license={
        element.license && <LicenseNotice minimal data={element.license} />
      }
      groupIntro={renderArticle(element.content, false)}
      positionOnPage={element.positionOnPage}
    >
      {children}
    </ExerciseGroup>
  )
}

interface RenderVideoData {
  element: {
    src: string
  }
}

export function renderVideo({ element }: RenderVideoData) {
  return (
    <Lazy>
      <Video url={element.src} />
    </Lazy>
  )
}

interface RenderEquationsData {
  element: EquationProps
}
export function renderEquations({ element }: RenderEquationsData) {
  return <Equations steps={element.steps} />
}

interface RenderCodeData {
  element: {
    content: EditorChild[]
  }
}

export function renderCode({ element }: RenderCodeData) {
  return <Code content={element.content} />
}
