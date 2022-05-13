import { NewElement, NewNode, NewText } from '@edtr-io/plugin-text'
import { converter } from '@serlo/markdown'

import { convertLegacyState } from './convert-legacy-state'
import { convertTextPluginState } from './convert-text-plugin-state'
import { EdtrState, UnsupportedEdtrState } from './edtr-io-types'
import { sanitizeLatex } from './sanitize-latex'
import {
  FrontendContentNode,
  FrontendMathNode,
  FrontendSerloTrNode,
  FrontendTextNode,
  Sign,
} from '@/data-types'
import { BoxType } from '@/edtr-io/plugins/box/renderer'
import { convertState } from '@/fetcher/convert-state'

function isEdtrState(node: ConvertData): node is EdtrState {
  return (node as EdtrState).plugin !== undefined
}

export type ConvertData =
  | EdtrState
  | UnsupportedEdtrState
  | FrontendContentNode
  | NewNode

export type ConvertNode = ConvertData | ConvertData[] | undefined

export function isTextPluginState(node: ConvertData): node is NewNode {
  return (
    (node as NewElement).type !== undefined ||
    (node as NewText).text !== undefined
  )
}

export function convert(node?: ConvertNode): FrontendContentNode[] {
  // compat: no or empty node, we ignore
  if (!node || Object.keys(node).length === 0) return []
  if (Array.isArray(node)) return node.flatMap(convert)
  if (isEdtrState(node)) return convertPlugin(node)
  if (isTextPluginState(node)) return convertTextPluginState(node)
  return []
}

function convertPlugin(node: EdtrState): FrontendContentNode[] {
  if (node.plugin === 'article') {
    const {
      introduction,
      content,
      exercises,
      exerciseFolder,
      relatedContent,
      sources,
    } = node.state

    const hasRelatedContent = Object.values(relatedContent).some(
      (section) => section.length > 0
    )
    return [
      {
        type: 'article',
        introduction: convertPlugin({
          ...introduction,
          plugin: 'multimedia',
        }),
        content: convertPlugin(content),
        exercises: exercises
          .map((exercise) => {
            return convertPlugin(exercise)
          })
          .flat(),
        exerciseFolder,
        relatedContent: hasRelatedContent ? relatedContent : undefined,
        sources,
      },
    ]
  }
  if (node.plugin === 'rows') {
    return convert(node.state as unknown as EdtrState)
  }
  if (node.plugin === 'text') {
    return [{ type: 'slate-container', children: convert(node.state) }]
  }
  if (node.plugin === 'image') {
    // remove images without source
    if (!node.state.src) return []
    return [
      {
        type: 'img',
        src: node.state.src as string,
        alt: node.state.alt || '',
        maxWidth: node.state.maxWidth,
        href: node.state.link?.href,
      },
    ]
  }
  if (node.plugin === 'important') {
    return [{ type: 'important', children: convert(node.state) }]
  }
  if (node.plugin === 'blockquote') {
    return [
      {
        type: 'blockquote',
        children: convert(node.state as EdtrState),
      },
    ]
  }
  if (node.plugin === 'box') {
    // get rid of wrapping p and inline math in title
    const convertedTitle = convert(node.state.title as EdtrState)[0] as
      | FrontendTextNode
      | FrontendMathNode
      | undefined
    const title = convertedTitle
      ? ((convertedTitle.type === 'math'
          ? [{ ...convertedTitle, type: 'inline-math' }]
          : convertedTitle.children) as unknown as FrontendContentNode[])
      : ([{ type: 'text', text: '' }] as FrontendTextNode[])

    return [
      {
        type: 'box',
        boxType: node.state.type as BoxType,
        anchorId: node.state.anchorId,
        title,
        children: convert(node.state.content.state as EdtrState),
      },
    ]
  }
  if (node.plugin === 'spoiler') {
    return [
      {
        type: 'spoiler-container',
        children: [
          {
            type: 'spoiler-title',
            children: [
              {
                type: 'text',
                text:
                  node.state.title ||
                  ' ' /* if title is falsy, use space instead to avoid empty text node*/,
              },
            ],
          },
          {
            type: 'spoiler-body',
            children: convert(node.state.content as EdtrState),
          },
        ],
      },
    ]
  }
  if (node.plugin === 'multimedia') {
    const width = node.state.width ?? 50
    return [
      {
        type: 'multimedia',
        mediaWidth: width,
        float: 'right',
        media: convert(node.state.multimedia as EdtrState),
        children: convert(node.state.explanation as EdtrState),
      },
    ]
  }
  if (node.plugin === 'layout') {
    return [
      {
        type: 'row',
        children: node.state.map((child) => {
          const children = convert(child.child)
          return {
            type: 'col',
            size: child.width,
            children,
          }
        }),
      },
    ]
  }
  if (node.plugin === 'injection') {
    return [
      {
        type: 'injection',
        href: node.state,
      },
    ]
  }
  if (node.plugin === 'highlight') {
    if (Object.keys(node.state).length == 0) return [] // ignore empty highlight plugin
    return [
      {
        type: 'code',
        code: node.state.code,
        language: node.state.language,
        showLineNumbers: node.state.showLineNumbers,
      },
    ]
  }
  if (node.plugin === 'table') {
    const html = converter.makeHtml(node.state)
    // compat: the markdown converter could return all types of content, only use table nodes.
    const children = convertLegacyState(html).children.filter(
      (child) => child.type == 'table'
    )
    return children
  }
  if (node.plugin === 'serloTable') {
    const children = node.state.rows.map((row) => {
      return {
        type: 'serlo-tr',
        children: row.columns.map((cell) => {
          return {
            type: 'serlo-td',
            children: convert(cell.content as EdtrState),
          }
        }),
      }
    }) as FrontendSerloTrNode[]

    return [
      {
        type: 'serlo-table',
        tableType: node.state.tableType,
        children,
      },
    ]
  }
  if (node.plugin === 'video') {
    if (!node.state.src) {
      return []
    }
    return [
      {
        type: 'video',
        src: node.state.src,
      },
    ]
  }
  if (node.plugin === 'anchor') {
    return [
      {
        type: 'anchor',
        id: node.state,
      },
    ]
  }
  if (node.plugin === 'geogebra') {
    // compat: full url given
    let id = node.state
    const match = /geogebra\.org\/m\/(.+)/.exec(id)
    if (match) {
      id = match[1]
    }
    return [{ type: 'geogebra', id }]
  }
  if (node.plugin === 'equations') {
    const { firstExplanation, transformationTarget } = node.state
    const steps = node.state.steps.map((step) => {
      return {
        left: sanitizeLatex(step.left),
        leftSource: step.left,
        sign: step.sign as Sign,
        right: sanitizeLatex(step.right),
        rightSource: step.right,
        transform: sanitizeLatex(step.transform),
        transformSource: step.transform,
        explanation: convert(step.explanation),
      }
    })
    return [
      {
        type: 'equations',
        steps,
        firstExplanation: convert(firstExplanation),
        transformationTarget,
      },
    ]
  }
  // TODO: Add pageSpecialContent
  if (node.plugin === 'pageLayout') {
    return [
      {
        type: 'pageLayout',
        column1: convertState(node.state.column1),
        column2: convertState(node.state.column2),
        widthPercent: node.state.widthPercent,
      },
    ]
  }
  return []
}
