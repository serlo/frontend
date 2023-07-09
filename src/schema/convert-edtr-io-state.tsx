import { converter } from '@serlo/markdown'

import { convertLegacyState } from './convert-legacy-state'
import { convertTextPluginState } from './convert-text-plugin-state'
import { sanitizeLatex } from './sanitize-latex'
import {
  FrontendContentNode,
  FrontendMathNode,
  FrontendNodeType,
  FrontendSerloTrNode,
  FrontendTextNode,
  Sign,
} from '@/frontend-node-types'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  SupportedEditorPlugin,
  UnknownEditorPlugin,
} from '@/serlo-editor-integration/types/editor-plugins'
import { BoxType } from '@/serlo-editor/plugins/box/renderer'
import { CustomElement, CustomText } from '@/serlo-editor/plugins/text'

type CustomNode = CustomElement | CustomText

function isSupportedEditorPlugin(
  node: ConvertData
): node is SupportedEditorPlugin {
  return Object.values(EditorPluginType).includes(
    (node as SupportedEditorPlugin).plugin
  )
}

export type ConvertData =
  | SupportedEditorPlugin
  | UnknownEditorPlugin
  | FrontendContentNode
  | CustomNode

export type ConvertNode = ConvertData | ConvertData[] | undefined

export function isTextPluginState(node: ConvertData): node is CustomNode {
  return (
    (node as CustomElement).type !== undefined ||
    (node as CustomText).text !== undefined
  )
}

export function convert(node?: ConvertNode): FrontendContentNode[] {
  // compat: no or empty node, we ignore
  if (!node || Object.keys(node).length === 0) return []
  if (Array.isArray(node)) return node.flatMap(convert)
  if (isSupportedEditorPlugin(node)) return convertPlugin(node)
  if (isTextPluginState(node)) return convertTextPluginState(node)
  return []
}

function convertPlugin(
  node: SupportedEditorPlugin | UnknownEditorPlugin
): FrontendContentNode[] {
  if (!isSupportedEditorPlugin(node)) {
    return []
  }
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
    return convert(node.state)
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

    const convertedCaption = caption
      ? convert(caption as SupportedEditorPlugin)
      : undefined

    const captionTexts = convertedCaption?.[0]?.children?.[0]?.children

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
        alt,
        maxWidth,
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
        children: convert(node.state as SupportedEditorPlugin),
      },
    ]
  }
  if (node.plugin === 'box') {
    // get rid of wrapping p and inline math in title
    const convertedTitle = convert(
      node.state.title as SupportedEditorPlugin
    )[0] as FrontendTextNode | FrontendMathNode | undefined
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
        children: convert(node.state.content.state as SupportedEditorPlugin),
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
            children: convert(node.state.content as SupportedEditorPlugin),
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
        media: convert(node.state.multimedia as SupportedEditorPlugin),
        children: convert(node.state.explanation as SupportedEditorPlugin),
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
    if (Object.keys(node.state).length === 0) return [] // ignore empty highlight plugin
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
      (child) => child.type === 'table'
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
            children: convert(cell.content as SupportedEditorPlugin),
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
  if (node.plugin === 'pageLayout') {
    if (node.state.widthPercent === 0) return []
    return [
      {
        type: FrontendNodeType.PageLayout,
        column1: convert(node.state.column1 as SupportedEditorPlugin),
        column2: convert(node.state.column2 as SupportedEditorPlugin),
        widthPercent: node.state.widthPercent,
      },
    ]
  }
  if (node.plugin === 'pageTeam') {
    return [{ type: FrontendNodeType.PageTeam, data: node.state.data }]
  }
  if (node.plugin === 'pagePartners') {
    return [{ type: FrontendNodeType.PagePartners }]
  }

  return []
}
