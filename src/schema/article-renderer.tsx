import dynamic from 'next/dynamic'
import * as React from 'react'
import { CSSProperties } from 'styled-components'

import { Col } from '../components/content/col'
import { ExerciseGroup } from '../components/content/exercises/exercise-group'
import { ImageLink } from '../components/content/image-link'
import { ImgCentered } from '../components/content/img-centered'
import { ImgMaxWidthDiv } from '../components/content/img-max-width-div'
import { Important } from '../components/content/important'
import { LayoutRow } from '../components/content/layout-row'
import { LicenseNotice } from '../components/content/license-notice'
import { Link } from '../components/content/link'
import { MathWrapper } from '../components/content/math-wrapper'
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
import { Blockquote } from '@/components/content/blockquote'
import { Code } from '@/components/content/code'
import { Equations } from '@/components/content/equations'
import { Exercise } from '@/components/content/exercises/exercise'
import { Solution } from '@/components/content/exercises/solution'
import { Geogebra } from '@/components/content/geogebra'
import { Injection } from '@/components/content/injection'
import { Lazy } from '@/components/content/lazy'
import { MathSpanProps } from '@/components/content/math-span'
import { Multimedia } from '@/components/content/multimedia'
import { Video } from '@/components/content/video'
import { EventCounter } from '@/components/event-counter'
import { FrontendContentNode } from '@/data-types'
import { submitEventWithPath } from '@/helper/submit-event'

export type NodePath = (number | string)[]

interface RenderElementProps {
  element: FrontendContentNode
  children: React.ReactNode
  value: FrontendContentNode
  path: NodePath
}

export type RenderNestedFunction = (
  value: FrontendContentNode[],
  ...pathPrefix: string[]
) => JSX.Element | null | React.ReactNode[]

const Math = dynamic<MathSpanProps>(() =>
  import('../components/content/math-span').then((mod) => mod.MathSpan)
)

export function renderArticle(
  value: FrontendContentNode[],
  ...pathPrefix: string[]
) {
  return _renderArticle(value, true, pathPrefix)
}

function renderNested(
  value: FrontendContentNode[],
  previousPath: NodePath,
  pathPrefix: NodePath
) {
  return _renderArticle(value, false, previousPath.concat(pathPrefix))
}

function _renderArticle(
  value: FrontendContentNode[],
  addCSS: boolean,
  pathPrefix: NodePath
) {
  if (!value || !Array.isArray(value)) return null
  const root = { children: value } as FrontendContentNode
  const content = value.map((_, index) =>
    render(root, pathPrefix.concat(index))
  )
  if (!addCSS) return content
  return <SpecialCss>{content}</SpecialCss>
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
  path: NodePath = []
): React.ReactNode {
  const currentPath: number[] = []
  for (let i = path.length - 1; i >= 0; i--) {
    const index = path[i]
    if (typeof index === 'number') {
      currentPath.unshift(index)
    } else {
      break
    }
  }
  const currentNode = getNode(value, currentPath)
  const key = currentPath[currentPath.length - 1]

  if (currentNode.type !== 'text') {
    const children: React.ReactNode[] = []
    if (currentNode.children) {
      currentNode.children.forEach((_child, index) => {
        children.push(render(value, path.concat(index)))
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
}

export function renderLeaf({ leaf, key, children }: RenderLeafProps) {
  const styles: CSSProperties = {}
  if (leaf.color) styles.color = articleColors[leaf.color]
  if (leaf.em) styles.fontStyle = 'italic'
  if (leaf.strong) styles.fontWeight = 'bold'

  if (Object.keys(styles).length === 0) return children

  const LeafTag = leaf.strong ? 'b' : leaf.em ? 'i' : 'span'
  const outputStyles = !(Object.keys(styles).length === 1 && LeafTag !== 'span')

  return (
    <LeafTag key={key} style={outputStyles ? styles : {}}>
      {children}
    </LeafTag>
  )
}

function renderElement(props: RenderElementProps): React.ReactNode {
  const { element, children, path } = props

  if (element.type === 'a') {
    return <Link href={element.href}>{children}</Link>
  }
  if (element.type === 'inline-math') {
    return <Math formula={element.formula} />
  }
  if (element.type === 'math') {
    const nowrap = /\\begin *{(array|aligned)}/.test(element.formula)
    // alignLeft is assumed to be always true
    return (
      <MathWrapper nowrap={nowrap}>
        <Lazy slim>
          <Math formula={'\\displaystyle ' + element.formula} />
        </Lazy>
      </MathWrapper>
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
        <ImgMaxWidthDiv maxWidth={element.maxWidth ? element.maxWidth : 0}>
          {wrapInA(
            <Lazy>
              <StyledImg
                src={element.src}
                alt={element.alt || 'Bild'}
                itemProp="contentUrl"
              ></StyledImg>
            </Lazy>
          )}
        </ImgMaxWidthDiv>
      </ImgCentered>
    )
  }
  if (element.type === 'spoiler-container') {
    if (!Array.isArray(children)) return null
    return (
      <SpoilerForEndUser title={children[0]} body={children[1]} path={path} />
    )
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
  if (element.type === 'multimedia') {
    return (
      <Multimedia
        {...element}
        renderNested={(value, ...prefix) => renderNested(value, path, prefix)}
      />
    )
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
  if (element.type === 'blockquote') {
    return <Blockquote>{children}</Blockquote>
  }
  if (element.type === 'geogebra') {
    return (
      <Lazy>
        <Geogebra id={element.id} path={path} />
      </Lazy>
    )
  }
  if (element.type === 'anchor') {
    return <a id={element.id.toString()} />
  }
  if (element.type === 'injection') {
    return (
      <Injection
        href={element.href}
        renderNested={(value, ...prefix) => renderNested(value, path, prefix)}
      />
    )
  }
  if (element.type === 'exercise') {
    return (
      <Exercise
        node={element}
        renderNested={(value, ...prefix) => renderNested(value, path, prefix)}
        path={path}
      />
    )
  }
  if (element.type === 'exercise-group') {
    return (
      <ExerciseGroup
        license={
          element.license && (
            <LicenseNotice minimal data={element.license} type={element.type} />
          )
        }
        groupIntro={renderNested(element.content, path, ['group-intro'])}
        positionOnPage={element.positionOnPage}
        id={element.context.id}
        href={element.href}
      >
        {children}
      </ExerciseGroup>
    )
  }
  if (element.type === 'solution') {
    return (
      <Solution
        node={element.solution}
        renderNested={(value, ...prefix) => renderNested(value, path, prefix)}
      />
    )
  }
  if (element.type === 'video') {
    return (
      <Lazy>
        <Video src={element.src} path={path} />
      </Lazy>
    )
  }
  if (element.type === 'equations') {
    return (
      <Equations
        steps={element.steps}
        renderNested={(value, ...prefix) => renderNested(value, path, prefix)}
      />
    )
  }
  if (element.type === 'code') {
    return <Code content={element.code} />
  }
  return null
}

interface SpoilerForEndUserProps {
  body: React.ReactNode
  title: React.ReactNode
  path: NodePath
}

function SpoilerForEndUser({ body, title, path }: SpoilerForEndUserProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <SpoilerContainer>
      <SpoilerTitle
        onClick={() => {
          setOpen(!open)
          if (!open) {
            submitEventWithPath('openspoiler', path)
          }
        }}
        open={open}
      >
        <SpoilerToggle open={open} />
        {title}
        <EventCounter prefix="openspoiler" path={path} />
      </SpoilerTitle>
      {open && body}
    </SpoilerContainer>
  )
}
