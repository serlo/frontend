import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'

export interface ArticleRendererUuidLink {
  id: string
  title: string
}

interface ArticleRendererProps {
  introduction: JSX.Element | null
  content: JSX.Element | null
  exerciseFolder?: ArticleRendererUuidLink
  exercises: JSX.Element | null
  relatedContent?: {
    articles: ArticleRendererUuidLink[]
    courses: ArticleRendererUuidLink[]
    videos: ArticleRendererUuidLink[]
  }
  sources: {
    href: string
    title: string
  }[]
}
export function ArticleRenderer({
  introduction,
  content,
  exercises,
  exerciseFolder,
  relatedContent,
  sources,
}: ArticleRendererProps) {
  const { strings } = useInstanceData()
  return (
    <>
      {introduction}
      {content}
      {renderExercises()}
      {renderRelatedContent()}
      {renderSources()}
    </>
  )

  function renderExercises() {
    if (!exerciseFolder && !exercises) return null

    return (
      <>
        <h2 className="serlo-h2">{strings.content.exercisesTitle}</h2>
        {exercises}
        {exerciseFolder ? (
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

  function renderRelatedContent() {
    if (!relatedContent) return null
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
    items: ArticleRendererUuidLink[]
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
          {sources.map((source) => (
            <li key={source.href} className="!mb-0">
              {source.href ? (
                <Link href={source.href}>{source.title}</Link>
              ) : (
                source.title
              )}
            </li>
          ))}
        </ul>
      </>
    )
  }
}
