import { convertTextPluginState } from './convert-text-plugin-state'
import { sanitizeLatex } from './sanitize-latex'
import {
  FrontendContentNode,
  FrontendMathNode,
  FrontendNodeType,
  FrontendSerloTrNode,
  FrontendTextNode,
} from '@/frontend-node-types'
import { BoxType } from '@/serlo-editor/plugins/box/renderer'
import { Sign } from '@/serlo-editor/plugins/equations/sign'
import { CustomElement, CustomText } from '@/serlo-editor/plugins/text'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  SupportedEditorPlugin,
  UnknownEditorPlugin,
} from '@/serlo-editor-integration/types/editor-plugins'

type SlateElementOrText = CustomElement | CustomText

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
  // | FrontendContentNode
  | SlateElementOrText

export type ConvertNode = ConvertData | ConvertData[] | undefined

function isTextPluginState(node: ConvertData): node is SlateElementOrText {
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
  if (!isSupportedEditorPlugin(node)) return []

  if (node.plugin === EditorPluginType.Article) {
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
          plugin: EditorPluginType.Multimedia,
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
  if (node.plugin === EditorPluginType.Rows) {
    return convert(node.state)
  }
  if (node.plugin === EditorPluginType.Text) {
    return [
      {
        type: FrontendNodeType.SlateContainer,
        children: convert(node.state),
        pluginId: node.id,
      },
    ]
  }
  if (node.plugin === EditorPluginType.Image) {
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
              return textPlugin.type === FrontendNodeType.Text
                ? textPlugin.text
                : ''
            })
            .join('')
        : ''
      : ''

    return [
      {
        type: FrontendNodeType.Image,
        src: src as string,
        alt,
        maxWidth,
        href: link?.href,
        caption: convertedCaption,
        pluginId: node.id,
      },
    ]
  }
  if (node.plugin === EditorPluginType.Box) {
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
        pluginId: node.id,
      },
    ]
  }
  if (node.plugin === EditorPluginType.Spoiler) {
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
        pluginId: node.id,
      },
    ]
  }
  if (node.plugin === EditorPluginType.Multimedia) {
    const width = node.state.width ?? 50
    return [
      {
        type: FrontendNodeType.Multimedia,
        mediaWidth: width,
        media: convert(node.state.multimedia as SupportedEditorPlugin),
        children: convert(node.state.explanation as SupportedEditorPlugin),
        pluginId: node.id,
      },
    ]
  }
  if (node.plugin === EditorPluginType.Layout) {
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
  if (node.plugin === EditorPluginType.Injection) {
    return [{ ...node, type: FrontendNodeType.Injection, pluginId: node.id }]
  }
  if (node.plugin === EditorPluginType.Highlight) {
    if (Object.keys(node.state).length === 0) return [] // ignore empty highlight plugin
    return [{ ...node, type: FrontendNodeType.Code, pluginId: node.id }]
  }
  if (node.plugin === EditorPluginType.SerloTable) {
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
        pluginId: node.id,
      },
    ]
  }
  if (node.plugin === EditorPluginType.Video) {
    if (!node.state.src) return []
    return [
      {
        plugin: EditorPluginType.Video,
        type: FrontendNodeType.Video,
        state: node.state,
        pluginId: node.id,
      },
    ]
  }
  if (node.plugin === EditorPluginType.Anchor) {
    return [{ ...node, type: FrontendNodeType.Anchor }]
  }
  if (node.plugin === EditorPluginType.Geogebra) {
    // compat: full url given
    let id = node.state
    const match = /geogebra\.org\/m\/(.+)/.exec(id)
    if (match) id = match[1]
    return [
      {
        plugin: EditorPluginType.Geogebra,
        type: FrontendNodeType.Geogebra,
        state: id,
        pluginId: node.id,
      },
    ]
  }
  if (node.plugin === EditorPluginType.Equations) {
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
        pluginId: node.id,
      },
    ]
  }
  if (node.plugin === EditorPluginType.PageLayout) {
    if (node.state.widthPercent === 0) return []
    return [
      {
        type: FrontendNodeType.PageLayout,
        column1: convert(node.state.column1 as SupportedEditorPlugin),
        column2: convert(node.state.column2 as SupportedEditorPlugin),
        widthPercent: node.state.widthPercent,
        pluginId: node.id,
      },
    ]
  }
  if (node.plugin === EditorPluginType.PageTeam) {
    return [
      {
        type: FrontendNodeType.PageTeam,
        data: node.state.data,
        pluginId: node.id,
      },
    ]
  }
  if (node.plugin === EditorPluginType.PagePartners) {
    return [{ type: FrontendNodeType.PagePartners, pluginId: node.id }]
  }

  if (node.plugin === EditorPluginType.Audio) {
    if (!node.state.src) {
      // eslint-disable-next-line no-console
      console.warn('No src for audio plugin found. Remove it!')
      return []
    }

    return [
      {
        type: FrontendNodeType.Audio,
        src: node.state.src,
        pluginId: node.id,
        plugin: EditorPluginType.Audio,
        state: node.state,
      },
    ]
  }

  return []
}
