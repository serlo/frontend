// eslint-disable-next-line import/no-cycle
import type {
  AnyEditorDocument,
  EditorArticleDocument,
  EditorArticleIntroductionDocument,
} from '@editor/types/editor-plugins'
import { isRowsDocument } from '@editor/types/plugin-type-guards'

import { isEmptyTextDocument } from '../../text/utils/static-is-empty'

export function isEmptyArticle(article: EditorArticleDocument): boolean {
  const articleIntroduction = article.state
    .introduction as EditorArticleIntroductionDocument

  const introductionTextState = articleIntroduction?.state?.explanation
  if (!isEmptyTextDocument(introductionTextState)) {
    return false
  }

  // If no text content is found in the introduction, proceed to check if the
  // rows have content
  if (article.state.content) {
    return isEmptyRowsDocument(article.state.content)
  }

  // If there's no content to check or it's not a rows document, consider it empty
  return true
}

export function isEmptyRowsDocument(rows: AnyEditorDocument): boolean {
  if (!isRowsDocument(rows)) return false

  // only checks for initial empty state,
  // there could be other cases that are still displayed as empty
  if (rows.state.length === 0) return true

  return rows.state.every(isEmptyTextDocument)
}
