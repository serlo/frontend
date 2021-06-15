import clsx from 'clsx'
import CSS from 'csstype'
import dynamic from 'next/dynamic'
import * as React from 'react'

import { Col } from '../components/content/col'
import { ExerciseGroup } from '../components/content/exercises/exercise-group'
import { ImgMaxWidthDiv } from '../components/content/img-max-width-div'
import { LicenseNotice } from '../components/content/license-notice'
import { Link } from '../components/content/link'
import { SpoilerTitle } from '../components/content/spoiler-title'
import { SpoilerToggle } from '../components/content/spoiler-toggle'
import { TableWrapper } from '../components/content/table-wrapper'
import { theme } from '../theme'
import { Blockquote } from '@/components/content/blockquote'
import type { CodeProps } from '@/components/content/code'
import { Equations } from '@/components/content/equations'
import { Exercise } from '@/components/content/exercises/exercise'
import { Solution } from '@/components/content/exercises/solution'
import { Geogebra } from '@/components/content/geogebra'
import { Injection } from '@/components/content/injection'
import { Lazy } from '@/components/content/lazy'
import { MathSpanProps } from '@/components/content/math-span'
import { Multimedia } from '@/components/content/multimedia'
import { Video } from '@/components/content/video'
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

const Code = dynamic<CodeProps>(() =>
  import('../components/content/code').then((mod) => mod.Code)
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
  return <div className="serlo-content-with-spacing-fixes">{content}</div>
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
  const styles: CSS.Properties = {}
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
    return (
      <Link href={element.href} path={path}>
        {children}
      </Link>
    )
  }
  if (element.type === 'inline-math') {
    return <Math formula={element.formula} />
  }
  if (element.type === 'math') {
    const nowrap = /\\begin *{(array|aligned)}/.test(element.formula)
    const addDisplaystile = !/\\displaystyle[^a-z]/.test(element.formula)
    // alignLeft is assumed to be always true
    return (
      <div
        className={clsx('serlo-math-wrapper', { 'whitespace-nowrap': nowrap })}
      >
        <Lazy slim>
          <Math
            formula={
              addDisplaystile
                ? '\\displaystyle ' + element.formula
                : element.formula
            }
          />
        </Lazy>
      </div>
    )
  }
  if (element.type === 'p') {
    return <p className="serlo-p">{children}</p>
  }
  if (element.type === 'h') {
    const classNames = {
      1: 'serlo-h1',
      2: 'serlo-h2',
      3: 'serlo-h3',
      4: 'serlo-h4',
      5: 'serlo-h5',
    }
    return React.createElement(
      `h${element.level}`,
      {
        className: classNames[element.level],
        id: element.id,
      },
      children
    )
  }
  if (element.type === 'img') {
    const wrapInA = (comp: React.ReactNode) => {
      if (element.href) {
        // needs investigation if this could be simplified
        return (
          <Link
            className="w-full block"
            href={element.href}
            path={path}
            noExternalIcon
          >
            {comp}
          </Link>
        )
      }
      return comp
    }
    return (
      <div
        className="serlo-image-centered"
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <ImgMaxWidthDiv maxWidth={element.maxWidth ? element.maxWidth : 0}>
          {wrapInA(
            <Lazy>
              <img
                className="serlo-img"
                src={element.src}
                alt={element.alt || 'Bild'}
                itemProp="contentUrl"
              ></img>
            </Lazy>
          )}
        </ImgMaxWidthDiv>
      </div>
    )
  }
  if (element.type === 'spoiler-container') {
    if (!Array.isArray(children)) return null
    return (
      <SpoilerForEndUser title={children[0]} body={children[1]} path={path} />
    )
  }
  if (element.type === 'spoiler-body') {
    return <div className="serlo-spoiler-body">{children}</div>
  }
  if (element.type === 'spoiler-title') {
    return children
  }
  if (element.type === 'ul') {
    return <ul className="serlo-ul">{children}</ul>
  }
  if (element.type === 'ol') {
    return <ol className="serlo-ol">{children}</ol>
  }
  if (element.type === 'li') {
    return <li>{children}</li>
  }
  if (element.type === 'table') {
    return (
      <TableWrapper>
        <table className="serlo-table">
          <tbody>{children}</tbody>
        </table>
      </TableWrapper>
    )
  }
  if (element.type === 'tr') {
    return <tr>{children}</tr>
  }
  if (element.type === 'th') {
    return <th className="serlo-th">{children}</th>
  }
  if (element.type === 'td') {
    return <td className="serlo-td">{children}</td>
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
    return <div className="flex flex-col mobile:flex-row">{children}</div>
  }
  if (element.type === 'col') {
    return <Col cSize={element.size}>{children}</Col>
  }
  if (element.type === 'important') {
    return <div className="serlo-important">{children}</div>
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
    const match = /\{\{snack ([0-9]+)\}\}/.exec(element.id)

    if (match) {
      const id = match[1]

      return (
        <div
          className="bg-white my-20"
          style={{ height: '70vh', width: '100%' }}
        >
          <iframe
            src={`https://www.learningsnacks.de/embed/${id}`}
            style={{ width: '100%', height: '100%' }}
          ></iframe>
          <a
            href={`https://www.learningsnacks.de/share/${id}`}
            className="relative my-4 h-5 text-center float-right"
          >
            © siehe Snack
          </a>
        </div>
      )
    }

    return <a id={element.id} />
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
        <Video src={element.src} path={path} license={element.license} />
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
    return (
      <Code
        content={element.code}
        language={element.language}
        showLineNumbers={element.showLineNumbers}
      />
    )
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
    <div className="flex flex-col mb-block mobile:mx-side">
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
      </SpoilerTitle>
      {open && body}
    </div>
  )
}
