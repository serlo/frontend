import { extractStringFromTextDocument } from '@serlo/editor/src/plugins/text/utils/static-extract-text'
import { isEmptyTextDocument } from '@serlo/editor/src/plugins/text/utils/static-is-empty'
import { AnyEditorDocument } from '@serlo/editor/src/types/editor-plugins'
import {
  isArticleIntroductionDocument,
  isArticleDocument,
} from '@serlo/editor/src/types/plugin-type-guards'

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
