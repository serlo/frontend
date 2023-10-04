import { faArrowCircleUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Fragment } from 'react'

import type { ArticleProps } from '..'
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
          <>
            <div className="[&_.plugin-toolbar]:!hidden">
              {editable ? (
                <nav className="flex justify-end">
                  {index === 0 ? null : (
                    <button
                      onClick={() => exercises.move(index, index - 1)}
                      className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                    >
                      <EditorTooltip text={articleStrings.moveUpLabel} />
                      <FaIcon icon={faArrowCircleUp} />
                    </button>
                  )}
                  <button
                    className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                    onClick={() => exercises.remove(index)}
                  >
                    <EditorTooltip text={articleStrings.removeLabel} />
                    <FaIcon icon={faTrashAlt} />
                  </button>
                </nav>
              ) : null}
              {exercise.render()}
            </div>
          </>
        </Fragment>
      ))}
    </>
  )
}
