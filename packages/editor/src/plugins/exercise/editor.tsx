import { AddButton } from '@editor/editor-ui'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useContext } from 'react'

import type { ExerciseProps } from '.'
import { ExerciseToolbar } from './toolbar/toolbar'
import { SerloLicenseChooser } from '../solution/serlo-license-chooser'
import { IsSerloContext } from '@/serlo-editor-integration/context/is-serlo-context'

const allInteractiveExerciseTypes = [
  EditorPluginType.ScMcExercise,
  EditorPluginType.InputExercise,
  EditorPluginType.H5p,
  EditorPluginType.TextAreaExercise,
  EditorPluginType.FillInTheBlanksExercise,
] as const

export type InteractiveExerciseType =
  (typeof allInteractiveExerciseTypes)[number]

export function ExerciseEditor(props: ExerciseProps) {
  const { state, focused } = props
  const { content, interactive, solution, licenseId } = state
  const isSerlo = useContext(IsSerloContext) // only on serlo

  const interactiveExerciseTypes = allInteractiveExerciseTypes.filter((type) =>
    editorPlugins.getAllWithData().some((plugin) => plugin.type === type)
  )

  const exTemplateStrings = useEditorStrings().templatePlugins.exercise
  const exPluginStrings = useEditorStrings().plugins.exercise

  return (
    <div
      data-qa="plugin-exercise"
      className={cn(
        'group/exercise rounded-b-xl border-3 border-transparent pb-6 focus-within:rounded-tl-xl focus-within:border-gray-100',
        focused && '!border-gray-100'
      )}
    >
      {isSerlo ? (
        <SerloLicenseChooser
          licenseId={licenseId}
          className="!-top-[30px] !right-10"
        />
      ) : null}
      {focused ? (
        <ExerciseToolbar
          {...props}
          interactiveExerciseTypes={interactiveExerciseTypes}
        />
      ) : (
        <button
          className={cn(`
            absolute right-0 top-[-23px] z-[22] hidden h-6 rounded-t-md bg-gray-100
            px-2 pt-0.5 text-sm font-bold
            hover:bg-editor-primary-100 group-focus-within/exercise:block
          `)}
          data-qa="plugin-exercise-parent-button"
        >
          {exPluginStrings.title}
        </button>
      )}
      <div className="h-10"></div>
      {content.render()}
      <div className="mx-side">
        {interactive.defined ? (
          interactive.render()
        ) : (
          <>
            <p className="mb-2 text-gray-400">
              {exTemplateStrings.addOptionalInteractiveEx}
            </p>
            <div className="-ml-1.5 flex">
              {interactiveExerciseTypes.map((type) => {
                return (
                  <AddButton
                    key={type}
                    onClick={() => interactive.create({ plugin: type })}
                    secondary
                    dataQa={`add-exercise-${type}`}
                  >
                    {exTemplateStrings[type]}
                  </AddButton>
                )
              })}
            </div>
          </>
        )}
        {solution.defined ? (
          <div className="-ml-side mt-block">
            <nav className="flex justify-end">
              <button
                className="serlo-button-editor-secondary serlo-tooltip-trigger relative top-7 z-20 mr-side"
                onClick={() => solution.remove()}
              >
                <EditorTooltip text={exTemplateStrings.removeSolution} />
                <FaIcon icon={faTrashAlt} />
              </button>
            </nav>
            {solution.render()}
          </div>
        ) : (
          <div
            className={cn(
              'mt-20 hidden max-w-[50%] group-focus-within/exercise:block',
              focused && '!block'
            )}
          >
            <AddButton onClick={() => solution.create()}>
              {exTemplateStrings.createSolution}
            </AddButton>
          </div>
        )}
      </div>
    </div>
  )
}
