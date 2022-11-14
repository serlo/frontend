import { NewElement, NewNode, NewText } from '@edtr-io/plugin-text'
import { converter } from '@serlo/markdown'

import { convertLegacyState } from './convert-legacy-state'
import { convertTextPluginState } from './convert-text-plugin-state'
import { EdtrState, UnknownEdtrState } from './edtr-io-types'
import { sanitizeLatex } from './sanitize-latex'
import { BoxType } from '@/edtr-io/plugins/box/renderer'
import {
  FrontendContentNode,
  FrontendMathNode,
  FrontendNodeType,
  FrontendSerloTrNode,
  FrontendTextNode,
  Sign,
} from '@/frontend-node-types'

function isEdtrState(node: ConvertData): node is EdtrState {
  return (node as EdtrState).plugin !== undefined
}

export type ConvertData =
  | EdtrState
  | UnknownEdtrState
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
        type: FrontendNodeType.Article,
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
    return [
      { type: FrontendNodeType.SlateContainer, children: convert(node.state) },
    ]
  }
  if (node.plugin === 'image') {
    // remove images without source
    if (!node.state.src) return []

    const { caption, maxWidth, link, src } = node.state

    const convertedCaption = caption ? convert(caption as EdtrState) : undefined
    const captionTexts = convertedCaption?.[0].children?.[0].children

    // if alt is not set construct plain string from caption
    const alt = node.state.alt
      ? node.state.alt
      : caption
      ? captionTexts && captionTexts.length > 0
        ? captionTexts
            .map((textPlugin) => {
              return textPlugin.type === 'text' ? textPlugin.text : ''
            })
            .join('')
        : ''
      : ''

    return [
      {
        type: FrontendNodeType.Img,
        src: src as string,
        alt: alt,
        maxWidth: maxWidth,
        href: link?.href,
        caption: convertedCaption,
      },
    ]
  }
  if (node.plugin === 'important') {
    return [{ type: FrontendNodeType.Important, children: convert(node.state) }]
  }
  if (node.plugin === 'blockquote') {
    return [
      {
        type: FrontendNodeType.Blockquote,
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
      ? ((convertedTitle.type === FrontendNodeType.Math
          ? [{ ...convertedTitle, type: FrontendNodeType.InlineMath }]
          : convertedTitle.children) as unknown as FrontendContentNode[])
      : ([{ type: FrontendNodeType.Text, text: '' }] as FrontendTextNode[])

    return [
      {
        type: FrontendNodeType.Box,
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
        type: FrontendNodeType.SpoilerContainer,
        children: [
          {
            type: FrontendNodeType.SpoilerTitle,
            children: [
              {
                type: FrontendNodeType.Text,
                text:
                  node.state.title ||
                  ' ' /* if title is falsy, use space instead to avoid empty text node*/,
              },
            ],
          },
          {
            type: FrontendNodeType.SpoilerBody,
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
        type: FrontendNodeType.Multimedia,
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
        type: FrontendNodeType.Row,
        children: node.state.map((child) => {
          const children = convert(child.child)
          return {
            type: FrontendNodeType.Col,
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
        type: FrontendNodeType.Injection,
        href: node.state,
      },
    ]
  }
  if (node.plugin === 'highlight') {
    if (Object.keys(node.state).length == 0) return [] // ignore empty highlight plugin
    return [
      {
        type: FrontendNodeType.Code,
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
        type: FrontendNodeType.SerloTr,
        children: row.columns.map((cell) => {
          return {
            type: FrontendNodeType.SerloTd,
            children: convert(cell.content as EdtrState),
          }
        }),
      }
    }) as FrontendSerloTrNode[]

    return [
      {
        type: FrontendNodeType.SerloTable,
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
        type: FrontendNodeType.Video,
        src: node.state.src,
      },
    ]
  }
  if (node.plugin === 'anchor') {
    return [
      {
        type: FrontendNodeType.Anchor,
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
    return [{ type: FrontendNodeType.Geogebra, id }]
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
        type: FrontendNodeType.Equations,
        steps,
        firstExplanation: convert(firstExplanation),
        transformationTarget,
      },
    ]
  }

  if (node.plugin === 'pageTeam') {
    return [{ type: FrontendNodeType.PageTeam, data: node.state.data }]
  }

  if (node.plugin === 'pageLayout') {
    if (node.state.widthPercent === 0) return []
    return [
      {
        type: FrontendNodeType.PageLayout,
        column1: convert(node.state.column1 as EdtrState),
        column2: convert(node.state.column2 as EdtrState),
        widthPercent: node.state.widthPercent,
      },
    ]
  }
  return []
}
