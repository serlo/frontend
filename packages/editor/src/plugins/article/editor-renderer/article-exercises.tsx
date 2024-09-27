import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { faArrowCircleUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Fragment } from 'react'

import type { ArticleProps } from '..'

interface ArticleExercisesProps {
  exercises: ArticleProps['state']['exercises']
}

export function ArticleExercises({ exercises }: ArticleExercisesProps) {
  const entityStrings = useEditorStrings().templatePlugins.entity
  const articleStrings = useEditorStrings().templatePlugins.article

  return (
    <>
      {exercises.map((exercise, index) => (
        <Fragment key={exercise.id}>
          <>
            <div className="[&_.plugin-toolbar]:!hidden">
              <nav className="flex justify-end">
                {index === 0 ? null : (
                  <button
                    onClick={() => exercises.move(index, index - 1)}
                    className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                  >
                    <EditorTooltip text={entityStrings.moveUpLabel} />
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

              {exercise.render()}
            </div>
          </>
        </Fragment>
      ))}
    </>
  )
}
