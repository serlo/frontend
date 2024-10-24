import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import {
  EditorArticleDocument,
  EditorMultimediaDocument,
} from '@editor/types/editor-plugins'

import { ArticleRenderer } from './renderer'
import { StaticRenderer } from '../../static-renderer/static-renderer'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'

interface ArticleNodeUuidLink {
  id: string
  title: string
}

export function ArticleStaticRenderer({
  state,
  serloContext,
}: EditorArticleDocument) {
  const {
    introduction,
    content,
    exercises,
    exerciseFolder,
    relatedContent,
    sources,
  } = state

  const title = serloContext?.articleTitle

  const filteredExercises = exercises?.filter(({ state }) => !!state)

  const hasMoreLink = exerciseFolder.id && exerciseFolder.title
  const hasExercises = filteredExercises && filteredExercises.length

  const introductionOrNull = isEmptyTextDocument(
    (introduction as EditorMultimediaDocument).state.explanation
  ) ? null : (
    <StaticRenderer document={{ ...introduction, plugin: 'multimedia' }} />
  )

  const LinkRenderer = editorRenderers.getLinkRenderer()

  return (
    <ArticleRenderer
      introduction={introductionOrNull}
      content={<StaticRenderer document={content} />}
      exercises={
        hasExercises ? <StaticRenderer document={filteredExercises} /> : null
      }
      exercisesFolder={
        hasMoreLink ? (
          <a className="serlo-link font-bold" href={`/${exerciseFolder.id}`}>
            {exerciseFolder.title}
          </a>
        ) : null
      }
      relatedContent={{
        articles: getRelatedContent('articles'),
        courses: getRelatedContent('courses'),
        videos: getRelatedContent('videos'),
      }}
      sources={renderSources()}
      title={title}
    />
  )

  function getRelatedContent(type: 'articles' | 'courses' | 'videos') {
    if (!relatedContent) return null

    const items = relatedContent[type]
    if (items.length === 0 || isEmpty(items)) return null

    return (
      <>
        {items.map(({ id, title }) => (
          <li key={id}>
            <LinkRenderer href={`/${id}`}>{title}</LinkRenderer>
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
                <LinkRenderer href={source.href}>{source.title}</LinkRenderer>
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
