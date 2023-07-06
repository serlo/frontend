import { useState } from 'react'

import { ArticleProps } from '.'
import { SerloAddButton } from '../../plugin/helpers/serlo-editor-button'
import { ArticleAddModal } from './add-modal/article-add-modal'
import { ArticleExercises } from './editor-renderer/article-exercises'
import { ArticleRelatedContentSection } from './editor-renderer/article-related-content-section'
import { ArticleSources } from './editor-renderer/article-sources'
import { ArticleRenderer } from './renderer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function ArticleEditor({ editable, state }: ArticleProps) {
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
        introduction={introduction.render()}
        content={content.render()}
        exercises={
          <>
            <ArticleExercises exercises={exercises} editable={editable} />
            {renderButton(modalStrings.buttonEx)}
          </>
        }
        exercisesFolder={
          <>
            {editable || exerciseFolder.title.value ? (
              <a
                className="serlo-link font-bold"
                href={`/${exerciseFolder.id.value}`}
              >
                {exerciseFolder.title.value}
              </a>
            ) : null}{' '}
            <span className="-mt-3 -ml-1 inline-block">
              {renderButton(modalStrings.buttonExFolder, true)}
            </span>
          </>
        }
        relatedContent={{
          articles: relatedContent.articles.length ? (
            <ArticleRelatedContentSection
              data={relatedContent.articles}
              editable={editable}
            />
          ) : null,
          courses: relatedContent.courses.length ? (
            <ArticleRelatedContentSection
              data={relatedContent.courses}
              editable={editable}
            />
          ) : null,
          videos: relatedContent.videos.length ? (
            <ArticleRelatedContentSection
              data={relatedContent.videos}
              editable={editable}
            />
          ) : null,
        }}
        relatedContentExtra={renderButton(modalStrings.buttonContent)}
        sources={<ArticleSources editable={editable} sources={sources} />}
      />

      {/*  ?? {renderButton(modalStrings.buttonContent)} */}

      {editable && (
        <ArticleAddModal
          data={state}
          open={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  )

  function renderButton(text: string, noIcon?: boolean) {
    return (
      <SerloAddButton
        text={text}
        noIcon={noIcon}
        onClick={() => setModalOpen(true)}
        className="mt-4 mb-8"
      />
    )
  }
}

export const buttonClass =
  'serlo-button text-editor-primary hover:bg-editor-primary hover:text-almost-black w-8'
