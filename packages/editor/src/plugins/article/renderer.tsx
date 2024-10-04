import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'

export interface ArticleRendererProps {
  introduction: JSX.Element | null
  content: JSX.Element | null
  exercises: JSX.Element | null
  exercisesFolder: JSX.Element | null
  relatedContent: {
    articles: JSX.Element | null
    courses: JSX.Element | null
    videos: JSX.Element | null
  }
  relatedContentExtra?: JSX.Element | null
  sources: JSX.Element | null
  title?: string
}

export function ArticleRenderer({
  introduction,
  content,
  exercises,
  exercisesFolder,
  relatedContent,
  relatedContentExtra,
  sources,
  title,
}: ArticleRendererProps) {
  const articleStrings = useStaticStrings().plugins.article
  const { strings } = useInstanceData()

  return (
    <>
      <div className="[&>div]:mx-side [&>div]:rounded-xl [&>div]:border-3 [&>div]:border-brand-50 [&>div]:py-5 ">
        {introduction}
      </div>
      {content}
      {exercises || exercisesFolder ? (
        <>
          <h2 className="serlo-h2 mb-16">
            {articleStrings.exercisesTitle}
            {title ? `: ${title}` : null}
          </h2>

          {exercises}

          {exercisesFolder ? (
            <p className="serlo-p mt-8">
              {articleStrings.moreExercises}:<br />
              {exercisesFolder}
            </p>
          ) : null}
        </>
      ) : null}
      {renderRelatedContent()}
      {sources ? (
        <>
          <h2 className="serlo-h2">{articleStrings.sourcesTitle}</h2>
          <ul className="serlo-ul mb-4 mt-2 text-lg"></ul>
          {sources}
        </>
      ) : null}
    </>
  )

  function renderRelatedContent() {
    const { articles, courses, videos } = relatedContent
    if (!articles && !courses && !videos && !relatedContentExtra) return null

    return (
      <>
        <h2 className="serlo-h2">{articleStrings.relatedContentTitle}</h2>
        <p className="serlo-p">{articleStrings.relatedContentText}</p>

        {renderRelatedContentSubsection('articles')}
        {renderRelatedContentSubsection('courses')}
        {renderRelatedContentSubsection('videos')}
        {relatedContentExtra}
      </>
    )
  }

  function renderRelatedContentSubsection(
    type: 'articles' | 'courses' | 'videos'
  ) {
    if (!relatedContent[type]) return null

    return (
      <>
        <h3 className="serlo-h3 mb-0">{strings.categories[type]}</h3>
        <ul className="serlo-ul mb-4 mt-2 text-lg">{relatedContent[type]}</ul>
      </>
    )
  }
}
