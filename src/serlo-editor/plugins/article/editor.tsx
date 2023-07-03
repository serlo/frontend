import { useState } from 'react'

import { ArticleProps } from '.'
import { SerloAddButton } from '../../plugin/helpers/serlo-editor-button'
import { ArticleAddModal } from './add-modal/article-add-modal'
import { ArticleExercises } from './article-exercises'
import { ArticleRelatedContent } from './article-related-content'
import { ArticleSources } from './article-sources'
import { useInstanceData } from '@/contexts/instance-context'
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

  const { strings } = useInstanceData()
  const modalStrings = useEditorStrings().templatePlugins.article.addModal

  return (
    <>
      <div className="mt-5">{introduction.render()}</div>
      <div className="mt-5">{content.render()}</div>
      <div className="mt-5">
        <h2>{strings.categories.exercises}</h2>
        {renderButton(modalStrings.buttonEx)}
        <ArticleExercises
          exercises={exercises}
          exerciseFolder={exerciseFolder}
          editable={editable}
        />
        {renderButton(modalStrings.buttonExFolder, true)}
      </div>
      <div className="mt-5">
        <ArticleRelatedContent editable={editable} data={relatedContent} />
        {renderButton(modalStrings.buttonContent)}
      </div>
      <div className="mt-5">
        <ArticleSources editable={editable} sources={sources} />
      </div>
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
        className="my-3"
      />
    )
  }
}

export const buttonClass =
  'serlo-button text-editor-primary hover:bg-editor-primary hover:text-almost-black w-8'
