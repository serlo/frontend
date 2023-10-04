import { extractStringFromTextPlugin } from '@/serlo-editor/plugins/text/utils/static-extract-text'
import { isEmptyTextPlugin } from '@/serlo-editor/plugins/text/utils/static-is-empty'
import { getChildrenOfSerializedDocument } from '@/serlo-editor/static-renderer/helper/get-children-of-serialized-document'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  EditorMultimediaPlugin,
  EditorTextPlugin,
  SupportedEditorPlugin,
} from '@/serlo-editor-integration/types/editor-plugins'

/**
 * special metaDescription for articles extracted from the introduction text
 */
export function getArticleMetaDescription(
  content?: SupportedEditorPlugin
): string | undefined {
  if (
    !content ||
    content.plugin !== EditorPluginType.Article ||
    !content.state.introduction ||
    content.state.introduction.plugin !==
      EditorPluginType.ArticleIntroduction ||
    !content.state.introduction.state
  ) {
    return undefined
  }

  const explanation = (content.state.introduction as EditorMultimediaPlugin)
    .state.explanation as EditorTextPlugin

  if (isEmptyTextPlugin(explanation)) return undefined
  return extractStringFromTextPlugin(explanation) ?? undefined
}

export function getMetaDescription(
  content?: SupportedEditorPlugin
): string | undefined {
  if (!content) return undefined

  let extracted = ''

  if (content.plugin === EditorPluginType.Text) {
    extracted = extractStringFromTextPlugin(content) ?? undefined
  }

  if (content.plugin === EditorPluginType.Rows) {
    // run row by row so we don't have to go through the whole content
    content.state.every((row) => {
      extracted += extractTextFromDocument(row as SupportedEditorPlugin)
      // continue if extract is shorter than 150
      return extracted.length < 150
    })
  }

  if (extracted.length < 50) return undefined

  const softLimit = 135
  const cutoff = softLimit + extracted.substring(softLimit).indexOf(' ')
  return extracted.substring(0, cutoff) + (extracted.length > 135 ? ' …' : '')
}

function extractTextFromDocument(document?: SupportedEditorPlugin): string {
  if (!document) return ''
  // call on children recursively
  getChildrenOfSerializedDocument(document).forEach(extractTextFromDocument)

  return extractStringFromTextPlugin(document)
}
