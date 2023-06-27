import { ArticleNodeUuidLink, FrontendArticleNode } from '@/frontend-node-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'
import { ArticleRenderer } from '@/serlo-editor/plugins/article/renderer'

export function Article({
  renderNested,
  introduction,
  content,
  exercises,
  exerciseFolder,
  relatedContent,
  sources,
}: FrontendArticleNode & {
  renderNested: RenderNestedFunction
}) {
  return (
    <ArticleRenderer
      introduction={<>{renderNested(introduction)}</>}
      content={<>{renderNested(content)}</>}
      exercises={
        exercises.length ? (
          <>{renderNested(exercises, 'article-exercises')}</>
        ) : null
      }
      relatedContent={filteredRelatedContent() ?? undefined}
      exerciseFolder={exerciseFolder.title ? exerciseFolder : undefined}
      sources={sources}
    />
  )

  function filteredRelatedContent() {
    const emptyRelated =
      !relatedContent ||
      (isEmpty(relatedContent?.articles) &&
        isEmpty(relatedContent?.courses) &&
        isEmpty(relatedContent?.videos))

    return emptyRelated ? null : relatedContent
  }

  // should be done in editor before saving imo
  function isEmpty(idArray: ArticleNodeUuidLink[]) {
    if (!idArray) return true
    const filtered = idArray.filter((obj) => {
      return obj.id !== ''
    })
    if (filtered.length) return false
    return true
  }
}
