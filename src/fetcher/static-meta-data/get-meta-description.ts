import { extractStringFromTextDocument } from '@/serlo-editor/plugins/text/utils/static-extract-text'
import { isEmptyTextDocument } from '@/serlo-editor/plugins/text/utils/static-is-empty'
import { getChildrenOfSerializedDocument } from '@/serlo-editor/static-renderer/helper/get-children-of-serialized-document'
import { AnyEditorDocument } from '@/serlo-editor-integration/types/editor-plugins'
import {
  isArticleIntroductionDocument,
  isArticleDocument,
  isRowsDocument,
  isTextDocument,
} from '@/serlo-editor-integration/types/plugin-type-guards'

/**
 * special metaDescription for articles extracted from the introduction text
 */
export function getArticleMetaDescription(
  content?: AnyEditorDocument
): string | undefined {
  if (
    !content ||
    !isArticleDocument(content) ||
    !content.state.introduction ||
    !isArticleIntroductionDocument(content.state.introduction) ||
    !content.state.introduction.state
  ) {
    return undefined
  }

  const explanation = content.state.introduction.state.explanation

  if (isEmptyTextDocument(explanation)) return undefined
  return extractStringFromTextDocument(explanation) ?? undefined
}

export function getMetaDescription(
  content?: AnyEditorDocument
): string | undefined {
  if (!content) return undefined
  let extracted = ''

  if (isTextDocument(content)) {
    extracted = extractStringFromTextDocument(content) ?? undefined
  }

  if (isRowsDocument(content)) {
    // run row by row so we don't have to go through the whole content
    content.state.every((row) => {
      extracted += extractTextFromDocument(row)
      // continue if extract is shorter than 150
      return extracted.length < 150
    })
  }

  if (extracted.length < 50) return undefined

  const softLimit = 145
  const cutoff = softLimit + extracted.substring(softLimit).indexOf(' ')

  return (
    extracted.substring(0, cutoff) + (extracted.length > softLimit ? ' …' : '')
  )
}

function extractTextFromDocument(
  document?: AnyEditorDocument,
  collected: string = ''
): string {
  if (!document) return ''

  // call on children recursively
  collected += getChildrenOfSerializedDocument(document)
    .map((child) => extractTextFromDocument(child, collected))
    .join()

  if (!isTextDocument(document)) return collected
  const documentText = extractStringFromTextDocument(document)

  return collected ? `${collected} ${documentText}` : documentText
}
