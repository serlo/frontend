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

      <h2 className="serlo-h2">{strings.content.exercisesTitle}</h2>
      {renderNested(exercises, 'article-content')}

      {renderMoreExLink()}
      {renderRelatedContent()}
      {renderSources()}
    </div>
  )

  function renderMoreExLink() {
    if (!exerciseFolder.id || !exerciseFolder.title) return null
    return (
      <p className="serlo-p">
        {strings.content.moreExercises}{' '}
        <Link className="font-bold" href={`/${exerciseFolder.id}`}>
          {exerciseFolder.title}
        </Link>
      </p>
    )
  }

  function renderRelatedContent() {
    if (
      !relatedContent?.articles &&
      !relatedContent?.courses &&
      !relatedContent?.videos
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
    if (!items || items.length < 1) return null
    return (
      <>
        <h3 className="serlo-h3 mb-0">{strings.categories[type]}</h3>
        <ul className="serlo-ul mt-2 mb-4 text-lg">
          {items.map((item) => (
            <li key={item.id} className="serlo-li !mb-0">
              <Link href={`/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

  function renderSources() {
    if (sources.length < 1) return null
    return (
      <>
        <h2 className="serlo-h2">{strings.content.sourcesTitle}</h2>
        <ul className="serlo-ul mt-2 mb-4 text-lg">
          {sources.map((source) => (
            <li key={source.href} className="serlo-li !mb-0">
              <Link href={source.href}>{source.title}</Link>
            </li>
          ))}
        </ul>
      </>
    )
  }
}
