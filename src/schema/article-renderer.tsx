import clsx from 'clsx'
import CSS from 'csstype'
import dynamic from 'next/dynamic'
import { ReactNode, Fragment, createElement } from 'react'

import { ExerciseGroup } from '../components/content/exercises/exercise-group'
import { LicenseNotice } from '../components/content/license-notice'
import { Link } from '../components/content/link'
import { theme } from '../theme'
import { Article } from '@/components/content/article'
import { Box } from '@/components/content/box'
import type { CodeProps } from '@/components/content/code'
import { Equations } from '@/components/content/equations'
import { Exercise } from '@/components/content/exercises/exercise'
import { Solution } from '@/components/content/exercises/solution'
import { Geogebra } from '@/components/content/geogebra'
import { Injection } from '@/components/content/injection'
import { Lazy } from '@/components/content/lazy'
import type { MathSpanProps } from '@/components/content/math-span'
import { Multimedia } from '@/components/content/multimedia'
import { SerloTable } from '@/components/content/serlo-table'
import { Snack } from '@/components/content/snack'
import { Spoiler } from '@/components/content/spoiler'
import { Video } from '@/components/content/video'
import type { FrontendContentNode } from '@/data-types'

export type NodePath = (number | string)[]

interface RenderElementProps {
  element: FrontendContentNode
  children: ReactNode | ReactNode[]
  value: FrontendContentNode
  path: NodePath
}

export type RenderNestedFunction = (
  value: FrontendContentNode[],
  ...pathPrefix: string[]
) => JSX.Element | null | ReactNode[]

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

export function renderNested(
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

function render(value: FrontendContentNode, path: NodePath = []): ReactNode {
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
    const children: ReactNode[] = []
    if (currentNode.children) {
      currentNode.children.forEach((_child, index) => {
        children.push(render(value, path.concat(index)))
      })
    }
    return (
      <Fragment key={key}>
        {renderElement({
          element: currentNode,
          children: children.length === 0 ? null : children,
          value,
          path,
        })}
      </Fragment>
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
    code?: boolean
  }
  key: number
  children: ReactNode
}

export function renderLeaf({ leaf, key, children }: RenderLeafProps) {
  const styles: CSS.Properties = {}

  if (leaf.code) {
    return (
      <code
        key={key}
        className="bg-brand-100 text-brand p-1 rounded-sm text-base"
      >
        {children}
      </code>
    )
  }

  if (leaf.color) styles.color = articleColors[leaf.color]
  if (leaf.em) styles.fontStyle = 'italic'
  if (leaf.strong) styles.fontWeight = 'bold'

  if (Object.keys(styles).length === 0) return children

  const LeafTag = leaf.code
    ? 'code'
    : leaf.strong
    ? 'b'
    : leaf.em
    ? 'i'
    : 'span'
  const outputStyles = !(Object.keys(styles).length === 1 && LeafTag !== 'span')

  return (
    <LeafTag key={key} style={outputStyles ? styles : {}}>
      {children}
    </LeafTag>
  )
}

function renderElement({
  element,
  children,
  path,
}: RenderElementProps): ReactNode {
  const isRevisionView =
    typeof path[0] === 'string' && path[0].startsWith('revision')

  if (element.type === 'a') {
    const isOnProfile =
      path && typeof path[0] === 'string' && path[0].startsWith('profile')
    return (
      <>
        <Link href={element.href} path={path} unreviewed={isOnProfile}>
          {children}
        </Link>
        {renderRevisionExtra(isRevisionView, element)}
      </>
    )
  }

  if (element.type === 'article') {
    return (
      <Article
        {...element}
        renderNested={(value, ...prefix) => renderNested(value, path, prefix)}
      />
    )
  }

  if (element.type === 'inline-math') {
    return <Math formula={element.formula} />
  }
  if (element.type === 'math') {
    const nowrap = /\\begin *{(array|aligned)}/.test(element.formula)
    const addDisplaystile = !/\\displaystyle[^a-z]/.test(element.formula)
    return (
      <div
        className={clsx(
          'serlo-math-wrapper',
          { 'whitespace-nowrap': nowrap },
          element.alignCenter && 'text-center'
        )}
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
  if (element.type === 'slate-p') {
    return (
      <p className="serlo-p mb-0">
        {children}
        <br />
      </p>
    )
  }
  if (element.type === 'slate-container') {
    return <div className="mb-block">{children}</div>
  }
  if (element.type === 'h') {
    const classNames = {
      1: 'serlo-h1',
      2: 'serlo-h2',
      3: 'serlo-h3',
      4: 'serlo-h4',
      5: 'serlo-h5',
    }
    return createElement(
      `h${element.level}`,
      {
        className: classNames[element.level],
        id: element.id,
      },
      children
    )
  }
  if (element.type === 'img') {
    const wrapInA = (comp: ReactNode) => {
      if (element.href) {
        // needs investigation if this could be simplified
        return (
          <>
            <Link
              className="w-full block"
              href={element.href}
              path={path}
              noExternalIcon
            >
              {comp}
            </Link>
          </>
        )
      }
      return comp
    }

    /*

    export const ImgMaxWidthDiv = styled.div<{ maxWidth: number }>`
  ${(props) => (props.maxWidth > 0 ? `max-width: ${props.maxWidth}px` : '')}
`

*/
    return (
      <div
        className="serlo-image-centered"
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <div
          style={element.maxWidth ? { maxWidth: element.maxWidth } : {}}
          className="mx-auto"
        >
          {wrapInA(
            <Lazy>
              <img
                className="serlo-img"
                src={element.src}
                alt={element.alt || 'Bild'}
                itemProp="contentUrl"
              />
            </Lazy>
          )}
          {renderRevisionExtra(isRevisionView, element)}
        </div>
      </div>
    )
  }
  if (element.type === 'spoiler-container') {
    if (!Array.isArray(children)) return null
    return <Spoiler title={children[0]} body={children[1]} path={path} />
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
      <div className="mb-block max-w-[100vw] overflow-auto">
        <table className="serlo-table">
          <tbody>{children}</tbody>
        </table>
      </div>
    )
  }
  if (element.type === 'serlo-table') {
    return (
      <SerloTable
        {...element}
        renderNested={(value, ...prefix) => renderNested(value, path, prefix)}
      />
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
    return (
      <div style={{ flexGrow: element.size, flexBasis: 0, flexShrink: 1 }}>
        {children}
      </div>
    )
  }
  if (element.type === 'important') {
    return <div className="serlo-important">{children}</div>
  }
  if (element.type === 'blockquote') {
    return <blockquote className="serlo-blockquote">{children}</blockquote>
  }
  if (element.type === 'box') {
    return (
      <Box
        {...element}
        renderNested={(value, ...prefix) => renderNested(value, path, prefix)}
      />
    )
  }
  if (element.type === 'geogebra') {
    return (
      <Lazy noPrint>
        <Geogebra id={element.id} path={path} />
      </Lazy>
    )
  }
  if (element.type === 'anchor') {
    const match = /\{\{snack ([0-9]+)\}\}/.exec(element.id)

    if (match) {
      const id = match[1]
      return <Snack id={parseInt(id)} />
    }

    return (
      <>
        <a id={element.id} />
        {renderRevisionExtra(isRevisionView, element)}
      </>
    )
  }
  if (element.type === 'injection') {
    return (
      <>
        {element.href ? (
          <Injection
            href={element.href}
            renderNested={(value, ...prefix) =>
              renderNested(value, path, prefix)
            }
          />
        ) : null}
        {renderRevisionExtra(isRevisionView, element)}
      </>
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
        unrevisedRevisions={element.unrevisedRevisions}
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
      <Lazy noPrint>
        <Video src={element.src} path={path} license={element.license} />
      </Lazy>
    )
  }
  if (element.type === 'equations') {
    return (
      <Equations
        steps={element.steps}
        firstExplanation={element.firstExplanation}
        transformationTarget={element.transformationTarget}
        renderNested={(value, ...prefix) => renderNested(value, path, prefix)}
      />
    )
  }
  if (element.type === 'code') {
    return (
      <>
        <Code
          content={element.code}
          language={element.language}
          showLineNumbers={element.showLineNumbers}
        />
        {renderRevisionExtra(isRevisionView, element)}
      </>
    )
  }
  return null
}

function renderRevisionExtra(
  isRevisionView: boolean,
  element: FrontendContentNode
) {
  if (
    !isRevisionView &&
    ['a', 'img', 'anchor', 'injection', 'exercise', 'code'].includes(
      element.type
    )
  )
    return null

  return (
    <span className="text-sm px-1 bg-yellow-200">
      {(element.type === 'a' || element.type === 'injection') && element.href}
      {element.type === 'anchor' && element.id}
      {element.type === 'code' &&
        `${element.language || '(no language)'} ${
          element.showLineNumbers ? '(with line numbers)' : ''
        }`}
      {element.type === 'img' && (
        <>
          {element.alt}{' '}
          {element.href && (
            <>
              <b>href:</b> {element.href}
            </>
          )}
        </>
      )}
    </span>
  )
}
