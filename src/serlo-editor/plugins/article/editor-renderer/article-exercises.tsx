import { faArrowCircleUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Fragment } from 'react'

import { ArticleProps } from '..'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'

interface ArticleExercisesProps {
  exercises: ArticleProps['state']['exercises']
  editable: boolean
}

export function ArticleExercises({
  exercises,
  editable,
}: ArticleExercisesProps) {
  const articleStrings = useEditorStrings().templatePlugins.article

  if (!editable && exercises.length === 0) return null

  return (
    <>
      {exercises.map((exercise, index) => (
        <Fragment key={exercise.id}>
          {exercise.render({
            renderToolbar: editable ? () => renderToolbar(index) : undefined,
          })}
        </Fragment>
      ))}
    </>
  )

  function renderToolbar(index: number) {
    const buttonClass = 'serlo-button-editor-secondary mb-2 mr-2 w-8'
    return (
      <>
        {index === 0 ? null : (
          <button
            onClick={() => exercises.move(index, index - 1)}
            className={buttonClass}
          >
            <EditorTooltip text={articleStrings.moveUpLabel} />
            <FaIcon icon={faArrowCircleUp} />
          </button>
        )}

        <button className={buttonClass} onClick={() => exercises.remove(index)}>
          <EditorTooltip text={articleStrings.removeLabel} />
          <FaIcon icon={faTrashAlt} />
        </button>
      </>
    )
  }
}
