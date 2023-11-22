import { StaticRenderer } from '../../static-renderer/static-renderer'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'
import { Link } from '@/components/content/link'
import { ArticleRenderer } from '@/serlo-editor/plugins/article/renderer'
import {
  EditorArticleDocument,
  EditorMultimediaDocument,
} from '@/serlo-editor/types/editor-plugins'

interface ArticleNodeUuidLink {
  id: string
  title: string
}

export function ArticleStaticRenderer({ state }: EditorArticleDocument) {
  const {
    introduction,
    content,
    exercises,
    exerciseFolder,
    relatedContent,
    sources,
  } = state

  const filteredExercises = exercises?.filter(({ state }) => !!state)

  const hasMoreLink = exerciseFolder.id && exerciseFolder.title
  const hasExercises = filteredExercises && filteredExercises.length

  const introductionOrNull = isEmptyTextDocument(
    (introduction as EditorMultimediaDocument).state.explanation
  ) ? null : (
    <StaticRenderer document={{ ...introduction, plugin: 'multimedia' }} />
  )

  return (
    <ArticleRenderer
      introduction={introductionOrNull}
      content={<StaticRenderer document={content} />}
      exercises={
        hasExercises ? <StaticRenderer document={filteredExercises} /> : null
      }
      exercisesFolder={
        hasMoreLink ? (
          <Link className="font-bold" href={`/${exerciseFolder.id}`}>
            {exerciseFolder.title}
          </Link>
        ) : null
      }
      relatedContent={{
        articles: getRelatedContent('articles'),
        courses: getRelatedContent('courses'),
        videos: getRelatedContent('videos'),
      }}
      sources={renderSources()}
    />
  )

  function getRelatedContent(type: 'articles' | 'courses' | 'videos') {
    if (!relatedContent) return null

    const items = relatedContent[type]
    if (items.length === 0 || isEmpty(items)) return null

    return (
      <>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/${item.id}`}>{item.title}</Link>
          </li>
        ))}
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

  function renderSources() {
    if (sources.length === 0) return null
    return (
      <>
        <ul className="serlo-ul mb-4 mt-2 text-lg">
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
