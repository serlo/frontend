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
import { Lazy } from '@/components/content/lazy'
import type { MathProps } from '@/components/content/math'
import type { VideoProps } from '@/components/content/video'
import { FrontendContentNode } from '@/data-types'

interface ReactChildrenData {
  children: React.ReactNode
}

interface RenderElementProps {
  element: FrontendContentNode
  children: React.ReactNode
  value: FrontendContentNode
  path: number[]
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

export function renderArticle(value: FrontendContentNode[], addCSS = true) {
  if (!value || !Array.isArray(value)) return null
  const root = { children: value } as FrontendContentNode
  const content = value.map((_, index) => render(root, [index]))
  if (addCSS) {
    return <SpecialCss>{content}</SpecialCss>
  } else return content
}

function getNode(
  value: FrontendContentNode,
  path: number[]
): FrontendContentNode {
  if (path.length === 0 || value.children === undefined) {
    return value
  } else {
    return getNode(value.children[path[0]], path.slice(1))
  }
}

function render(
  value: FrontendContentNode,
  path: number[] = []
): React.ReactNode {
  const currentNode = getNode(value, path)
  const key = path[path.length - 1]

  if (currentNode.type !== 'text') {
    const children: React.ReactNode[] = []
    if (currentNode.children) {
      currentNode.children.forEach((child, index) => {
        children.push(render(child, path.concat(index)))
      })
    }
    return (
      <React.Fragment key={key}>
        {renderElement({
          element: currentNode,
          children: children.length === 0 ? null : children,
          value,
          path,
        })}
      </React.Fragment>
    )
  }
  //if (!currentNode) return null
  if (currentNode.text === '') {
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

const StyledHx = {
  1: StyledH1,
  2: StyledH2,
  3: StyledH3,
  4: StyledH4,
  5: StyledH5,
}

interface RenderLeafProps {
  leaf: FrontendContentNode & {
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

function renderElement(props: RenderElementProps): React.ReactNode {
  const { element, children } = props
  if (element.type === 'a') {
    return <Link href={element.href}>{children}</Link>
  }
  if (element.type === 'inline-math') {
    return <Math formula={element.formula} inline />
  }
  if (element.type === 'math') {
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
  if (element.type === 'p') {
    return <StyledP>{children}</StyledP>
  }
  if (element.type === 'h') {
    const Comp = StyledHx[element.level]
    return <Comp id={element.id}>{children}</Comp>
  }
  if (element.type === 'img') {
    const wrapInA = (comp: React.ReactNode) => {
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
  if (element.type === 'spoiler-container') {
    if (!Array.isArray(children)) return null
    return <SpoilerForEndUser title={children[0]} body={children[1]} />
  }
  if (element.type === 'spoiler-body') {
    return <SpoilerBody>{children}</SpoilerBody>
  }
  if (element.type === 'spoiler-title') {
    return children
  }
  if (element.type === 'ul') {
    return <StyledUl>{children}</StyledUl>
  }
  if (element.type === 'ol') {
    return <StyledOl>{children}</StyledOl>
  }
  if (element.type === 'li') {
    return <StyledLi>{children}</StyledLi>
  }
  if (element.type === 'table') {
    return (
      <TableWrapper>
        <StyledTable>
          <tbody>{children}</tbody>
        </StyledTable>
      </TableWrapper>
    )
  }
  if (element.type === 'tr') {
    return <StyledTr>{children}</StyledTr>
  }
  if (element.type === 'th') {
    return <StyledTh>{children}</StyledTh>
  }
  if (element.type === 'td') {
    return <StyledTd>{children}</StyledTd>
  }
  if (element.type === 'row') {
    return <LayoutRow>{children}</LayoutRow>
  }
  if (element.type === 'col') {
    return <Col cSize={element.size}>{children}</Col>
  }
  if (element.type === 'important') {
    return <Important>{children}</Important>
  }
  if (element.type === 'geogebra') {
    return (
      <Lazy>
        <GeogebraWrapper>
          <Geogebra id={element.id} />
        </GeogebraWrapper>
      </Lazy>
    )
  }
  if (element.type === 'anchor') {
    return <a id={element.id.toString()} />
  }
  if (element.type === 'injection') {
    return <Injection href={element.href} />
  }
  if (element.type === 'exercise') {
    return <Exercise node={element} />
  }
  if (element.type === 'exercise-group') {
    return (
      <ExerciseGroup
        license={
          element.license && <LicenseNotice minimal data={element.license} />
        }
        groupIntro={renderArticle(element.content, false)}
        positionOnPage={element.positionOnPage ?? 0}
      >
        {children}
      </ExerciseGroup>
    )
  }
  if (element.type === 'video') {
    return (
      <Lazy>
        <Video src={element.src} />
      </Lazy>
    )
  }
  if (element.type === 'equations') {
    return <Equations steps={element.steps} />
  }
  if (element.type === 'code') {
    return <Code content={element.code} />
  }
  return null
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
