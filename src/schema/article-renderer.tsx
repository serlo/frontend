import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { CSSProperties, ReactNode, Fragment, createElement } from 'react'

import { ExtraRevisionViewInfo } from './extra-revision-view-info'
import { ExerciseGroup } from '../components/content/exercises/exercise-group'
import { LicenseNotice } from '../components/content/license/license-notice'
import { Link } from '../components/content/link'
import { Article } from '@/components/content/article'
import { Audio } from '@/components/content/audio'
import { Box } from '@/components/content/box'
import { EquationProps, Equations } from '@/components/content/equations'
import { Exercise } from '@/components/content/exercises/exercise'
import { Solution } from '@/components/content/exercises/solution'
import { Geogebra } from '@/components/content/geogebra'
import { Image } from '@/components/content/image'
import { Lazy } from '@/components/content/lazy'
import type { MathSpanProps } from '@/components/content/math-span'
import { Multimedia } from '@/components/content/multimedia'
import { SerloTable } from '@/components/content/serlo-table'
import { Spoiler } from '@/components/content/spoiler'
import { Video } from '@/components/content/video'
import { FrontendContentNode, FrontendNodeType } from '@/frontend-node-types'
import { articleColors } from '@/helper/colors'
import type { HighlightRendererProps } from '@/serlo-editor/plugins/highlight/renderer'
import { InjectionRenderer } from '@/serlo-editor/plugins/injection/renderer'
import { PageLayoutAdapter } from '@/serlo-editor/plugins/page-layout/frontend'
import { TextLeafRenderer } from '@/serlo-editor/plugins/text/components/text-leaf-renderer'

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

const HighlightRenderer = dynamic<HighlightRendererProps>(() =>
  import('@/serlo-editor/plugins/highlight/renderer').then(
    (mod) => mod.HighlightRenderer
  )
)

const PageTeamAdapter = dynamic(() =>
  import('@/serlo-editor/plugins/page-team/frontend').then(
    (mod) => mod.PageTeamAdapter
  )
)

const PartnerList = dynamic(() =>
  import('../components/landing/rework/partner-list').then(
    (mod) => mod.PartnerList
  )
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
  return _renderArticle(
    value,
    false,
    previousPath.concat(pathPrefix.length === 0 ? ['nested'] : pathPrefix)
  )
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

  if (currentNode.type !== FrontendNodeType.Text) {
    const children: ReactNode[] = []
    if (currentNode.children) {
      currentNode.children.forEach((_child, index) => {
        children.push(render(value, path.concat(index)))
      })
    }

    const renderedElement = renderElement({
      element: currentNode,
      children: children.length === 0 ? null : children,
      value,
      path,
    })

    const shortId =
      Object.hasOwn(currentNode, 'pluginId') &&
      currentNode.pluginId?.split('-')[0]

    if (shortId)
      return (
        <div key={key} id={shortId}>
          {renderedElement}
        </div>
      )

    return <Fragment key={key}>{renderedElement}</Fragment>
  }

  if (currentNode.text === '') return null // avoid rendering empty spans

  return (
    <Fragment key={key}>
      <TextLeafRenderer leaf={currentNode}>
        {currentNode?.text}
      </TextLeafRenderer>
    </Fragment>
  )
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
  const styles: CSSProperties = {}

  if (leaf.code) {
    return (
      <code
        key={key}
        className="rounded-sm bg-brand-100 p-1 text-base text-brand"
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

  const nestedRenderer = (value: FrontendContentNode[], ...prefix: string[]) =>
    renderNested(value, path, prefix)

  if (element.type === FrontendNodeType.A) {
    const isOnProfile =
      path && typeof path[0] === 'string' && path[0].startsWith('profile')
    return (
      <>
        <Link href={element.href} unreviewed={isOnProfile}>
          {children}
        </Link>
        {isRevisionView && <ExtraRevisionViewInfo element={element} />}
      </>
    )
  }
  if (element.type === FrontendNodeType.Article) {
    return <Article {...element} renderNested={nestedRenderer} />
  }
  if (element.type === FrontendNodeType.InlineMath) {
    return <Math formula={element.formula} />
  }
  if (element.type === FrontendNodeType.Math) {
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
  if (element.type === FrontendNodeType.P) {
    return <p className="serlo-p">{children}</p>
  }
  if (element.type === FrontendNodeType.SlateP) {
    return <p className="slate-p serlo-p mb-0 min-h-[1.33em]">{children}</p>
  }
  if (element.type === FrontendNodeType.SlateContainer) {
    // formulas can overflow the slate container.
    // the y-overflow is caused by super high elements like integrals
    // we already add enoough safety-margins, so nothing should be clipped
    // tested with http://localhost:3000/mathe/1595/das-integral
    // we can't use overflow-y-visible and overflow-x-auto at the same time, visible defaults to auto
    // to hide the scrollbars, hidden is necessary
    return (
      <div className="slate-container mb-block max-w-full overflow-x-auto overflow-y-hidden">
        {children}
      </div>
    )
  }
  if (element.type === FrontendNodeType.H) {
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
  if (element.type === FrontendNodeType.Image) {
    return (
      <Image
        element={element}
        extraInfo={
          isRevisionView ? (
            <ExtraRevisionViewInfo element={element} />
          ) : undefined
        }
        renderNested={nestedRenderer}
      />
    )
  }
  if (element.type === FrontendNodeType.SpoilerContainer) {
    if (!Array.isArray(children)) return null
    return <Spoiler title={children[0]} body={children[1]} />
  }
  if (element.type === FrontendNodeType.SpoilerBody) {
    return (
      <div className="serlo-spoiler-body motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-8">
        {children}
      </div>
    )
  }
  if (element.type === FrontendNodeType.SpoilerTitle) {
    return children
  }
  if (element.type === FrontendNodeType.Ul) {
    return <ul className="serlo-ul">{children}</ul>
  }
  if (element.type === FrontendNodeType.Ol) {
    return <ol className="serlo-ol">{children}</ol>
  }
  if (element.type === FrontendNodeType.Li) {
    return <li>{children}</li>
  }
  if (element.type === FrontendNodeType.Table) {
    return (
      <div className="mb-block max-w-[100vw] overflow-auto">
        <table className="serlo-table">
          <tbody>{children}</tbody>
        </table>
      </div>
    )
  }
  if (element.type === FrontendNodeType.SerloTable) {
    return <SerloTable {...element} renderNested={nestedRenderer} />
  }
  if (element.type === FrontendNodeType.Tr) {
    return <tr>{children}</tr>
  }
  if (element.type === FrontendNodeType.Th) {
    return <th className="serlo-th">{children}</th>
  }
  if (element.type === FrontendNodeType.Td) {
    return <td className="serlo-td">{children}</td>
  }
  if (element.type === FrontendNodeType.Multimedia) {
    return <Multimedia {...element} renderNested={nestedRenderer} />
  }
  if (element.type === FrontendNodeType.Row) {
    return <div className="flex flex-col mobile:flex-row">{children}</div>
  }
  if (element.type === FrontendNodeType.Col) {
    return (
      <div style={{ flexGrow: element.size, flexBasis: 0, flexShrink: 1 }}>
        {children}
      </div>
    )
  }
  if (element.type === FrontendNodeType.Important) {
    return <div className="serlo-important">{children}</div>
  }
  if (element.type === FrontendNodeType.Blockquote) {
    return <blockquote className="serlo-blockquote">{children}</blockquote>
  }
  if (element.type === FrontendNodeType.Box) {
    return <Box {...element} renderNested={nestedRenderer} />
  }
  if (element.type === FrontendNodeType.Geogebra) {
    return (
      <Lazy noPrint>
        <Geogebra id={element.state} />
      </Lazy>
    )
  }
  if (element.type === FrontendNodeType.Anchor) {
    return (
      <>
        <a id={element.state} />
        {isRevisionView && <ExtraRevisionViewInfo element={element} />}
      </>
    )
  }
  if (element.type === FrontendNodeType.Injection) {
    return (
      <>
        {element.state ? (
          <InjectionRenderer
            href={element.state}
            renderNested={(value, ...prefix) =>
              renderNested(value, path, prefix)
            }
          />
        ) : null}
        {isRevisionView && <ExtraRevisionViewInfo element={element} />}
      </>
    )
  }
  if (element.type === FrontendNodeType.Exercise) {
    return <Exercise node={element} renderNested={nestedRenderer} path={path} />
  }
  if (element.type === FrontendNodeType.ExerciseGroup) {
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
  if (element.type === FrontendNodeType.Solution) {
    // This is only used for revisions now so rest can be mocked data
    return (
      <Solution
        node={{
          type: FrontendNodeType.Exercise,
          task: {},
          solution: element.solution,
          context: {
            id: 0,
            revisionId: 0,
          },
        }}
        forceVisible={isRevisionView}
        loaded={false}
        renderNested={nestedRenderer}
      />
    )
  }
  if (element.type === FrontendNodeType.Video) {
    return (
      <Lazy noPrint>
        <Video src={element.state.src} license={element.license} />
      </Lazy>
    )
  }
  if (element.type === FrontendNodeType.Audio) {
    return (
      <Lazy noPrint>
        <Audio
          srcOrBase64={element.state.src || element.state.base64AudioRecording}
        />
      </Lazy>
    )
  }
  if (element.type === FrontendNodeType.Equations) {
    return (
      <Equations
        {...(element as Omit<EquationProps, 'renderNested'>)}
        renderNested={nestedRenderer}
      />
    )
  }
  if (element.type === FrontendNodeType.Code) {
    return (
      <>
        <HighlightRenderer {...element.state} />
        {isRevisionView && <ExtraRevisionViewInfo element={element} />}
      </>
    )
  }
  if (element.type === FrontendNodeType.PageLayout) {
    return <PageLayoutAdapter {...element} renderNested={nestedRenderer} />
  }
  if (element.type === FrontendNodeType.PageTeam)
    return <PageTeamAdapter {...element} />
  if (element.type === FrontendNodeType.PagePartners)
    return <PartnerList inContent />
  return null
}
