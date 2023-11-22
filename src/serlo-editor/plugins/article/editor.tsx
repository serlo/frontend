import { useEditorStrings } from '@serlo/serlo-editor'
import { useState } from 'react'

import type { ArticleProps } from '.'
import { ArticleAddModal } from './add-modal/article-add-modal'
import { ArticleExercises } from './editor-renderer/article-exercises'
import { ArticleRelatedContentSection } from './editor-renderer/article-related-content-section'
import { ArticleSources } from './editor-renderer/article-sources'
import { ArticleRenderer } from './renderer'
import { SerloAddButton } from '../../plugin/helpers/serlo-editor-button'

export function ArticleEditor({ state }: ArticleProps) {
  const {
    introduction,
    content,
    exercises,
    exerciseFolder,
    relatedContent,
    sources,
  } = state
  const [modalOpen, setModalOpen] = useState(false)

  const modalStrings = useEditorStrings().templatePlugins.article.addModal

  return (
    <>
      <ArticleRenderer
        introduction={<div>{introduction.render()}</div>}
        content={<div data-qa="plugin-article-content">{content.render()}</div>}
        exercises={
          <>
            <ArticleExercises exercises={exercises} />
            {renderButton(modalStrings.buttonEx)}
          </>
        }
        exercisesFolder={
          <>
            <a
              className="serlo-link font-bold"
              href={`/${exerciseFolder.id.value}`}
            >
              {exerciseFolder.title.value}
            </a>{' '}
            <span className="-ml-1 -mt-3 inline-block">
              {renderButton(modalStrings.buttonExFolder, true)}
            </span>
          </>
        }
        relatedContent={{
          articles: relatedContent.articles.length ? (
            <ArticleRelatedContentSection data={relatedContent.articles} />
          ) : null,
          courses: relatedContent.courses.length ? (
            <ArticleRelatedContentSection data={relatedContent.courses} />
          ) : null,
          videos: relatedContent.videos.length ? (
            <ArticleRelatedContentSection data={relatedContent.videos} />
          ) : null,
        }}
        relatedContentExtra={renderButton(modalStrings.buttonContent)}
        sources={<ArticleSources sources={sources} />}
      />
      <ArticleAddModal
        data={state}
        open={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  )

  function renderButton(text: string, noIcon?: boolean) {
    return (
      <SerloAddButton
        text={text}
        noIcon={noIcon}
        onClick={() => setModalOpen(true)}
        className="mb-8 mt-4"
      />
    )
  }
}
