import { isEmptyRowsDocument } from '@editor/plugins/rows/utils/static-is-empty'
import { isEmptyTextDocument } from '@editor/plugins/text/utils/static-is-empty'
import {
  EditorArticleDocument,
  EditorArticleIntroductionDocument,
} from '@editor/types/editor-plugins'

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
