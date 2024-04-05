import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useState } from 'react'

import type { ArticleProps } from '.'
import { buttonClass } from './const/button-class'
import { ArticleExercises } from './editor-renderer/article-exercises'
import { ArticleRelatedContentSection } from './editor-renderer/article-related-content-section'
import { ArticleSources } from './editor-renderer/article-sources'
import { ArticleRenderer } from './renderer'
import { SerloAddButton } from '../../plugin/helpers/serlo-editor-button'
import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'
import { ArticleAddModal } from '@/serlo-editor-integration/components/article-add-modal/article-add-modal'

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

  const articleStrings = useEditorStrings().templatePlugins.article
  const modalStrings = articleStrings.addModal

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
            {exerciseFolder.id.value ? (
              <>
                <a
                  className="serlo-link mr-side font-bold"
                  href={`/${exerciseFolder.id.value}`}
                >
                  {exerciseFolder.title.value}
                </a>{' '}
              </>
            ) : null}
            <span className="-ml-side -mt-3 inline-block">
              {renderExerciseFolderButton()}
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

  function renderExerciseFolderButton() {
    return exerciseFolder.id.value ? (
      <button
        onClick={() => {
          exerciseFolder.id.set('')
          exerciseFolder.title.set('')
        }}
        className={cn(buttonClass, 'serlo-tooltip-trigger')}
      >
        <EditorTooltip text={articleStrings.removeLabel} />
        <FaIcon icon={faTrashAlt} aria-hidden="true" />
      </button>
    ) : (
      renderButton(modalStrings.buttonExFolder, true)
    )
  }
}
