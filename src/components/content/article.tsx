import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { ArticleNodeUuidLink, FrontendArticleNode } from '@/data-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'

export function Article({
  renderNested,
  introduction,
  content,
  exercises,
  exerciseFolder,
  relatedContent,
  sources,
}: FrontendArticleNode & { renderNested: RenderNestedFunction }) {
  const { strings } = useInstanceData()

  return (
    <div>
      {renderNested(introduction, 'article-intro')}
      {renderNested(content, 'article-content')}

      {renderExercises()}

      {renderRelatedContent()}
      {renderSources()}
    </div>
  )

  function renderExercises() {
    const hasMoreLink = exerciseFolder.id && exerciseFolder.title
    const hasExercises = exercises && exercises.length
    if (!hasMoreLink && !hasExercises) return null

    return (
      <>
        <h2 className="serlo-h2">{strings.content.exercisesTitle}</h2>
        {hasExercises ? renderNested(exercises, 'article-exercises') : null}
        {hasMoreLink ? (
          <p className="serlo-p">
            {strings.content.moreExercises}:<br />
            <Link className="font-bold" href={`/${exerciseFolder.id}`}>
              {exerciseFolder.title}
            </Link>
          </p>
        ) : null}
      </>
    )
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

  function renderRelatedContent() {
    if (
      !relatedContent ||
      (isEmpty(relatedContent?.articles) &&
        isEmpty(relatedContent?.courses) &&
        isEmpty(relatedContent?.videos))
    )
      return null

    return (
      <>
        <h2 className="serlo-h2">{strings.content.relatedContentTitle}</h2>
        <p className="serlo-p">{strings.content.relatedContentText}</p>
        {renderSubsection('articles', relatedContent.articles)}
        {renderSubsection('courses', relatedContent.courses)}
        {renderSubsection('videos', relatedContent.videos)}
      </>
    )
  }

  function renderSubsection(
    type: 'articles' | 'courses' | 'videos',
    items: ArticleNodeUuidLink[]
  ) {
    if (items.length === 0) return null
    return (
      <>
        <h3 className="serlo-h3 mb-0">{strings.categories[type]}</h3>
        <ul className="serlo-ul mt-2 mb-4 text-lg">
          {items.map((item) => (
            <li key={item.id} className="!mb-0">
              <Link href={`/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

  function renderSources() {
    if (sources.length === 0) return null
    return (
      <>
        <h2 className="serlo-h2">{strings.content.sourcesTitle}</h2>
        <ul className="serlo-ul mt-2 mb-4 text-lg">
          {sources.map((source) =>
            source.href === '' ? null : (
              <li key={source.href} className="!mb-0">
                <Link href={source.href}>{source.title}</Link>
              </li>
            )
          )}
        </ul>
      </>
    )
  }
}
