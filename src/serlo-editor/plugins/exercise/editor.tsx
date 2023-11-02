import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import type { ExerciseProps } from '.'
import { ExerciseToolbar } from './toolbar/toolbar'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { AddButton } from '@/serlo-editor/editor-ui'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const allInteractiveExerciseTypes = [
  EditorPluginType.ScMcExercise,
  EditorPluginType.InputExercise,
  EditorPluginType.H5p,
] as const

export type InteractiveExerciseType =
  (typeof allInteractiveExerciseTypes)[number]

export function ExerciseEditor(props: ExerciseProps) {
  const { editable, state, focused } = props
  const { content, interactive, solution } = state

  // only show supported interactive exercise types
  const interactiveExerciseTypes = allInteractiveExerciseTypes.filter((type) =>
    editorPlugins.getAllWithData().some((plugin) => plugin.type === type)
  )

  const exTemplateStrings = useEditorStrings().templatePlugins.exercise
  const exPluginStrings = useEditorStrings().plugins.exercise

  return (
    <div
      data-qa="plugin-exercise"
      className="group/exercise rounded-b-xl border-3 border-gray-100 pb-6"
    >
      {focused ? (
        <ExerciseToolbar
          {...props}
          interactiveExerciseTypes={interactiveExerciseTypes}
        />
      ) : (
        <button
          className={tw`
            absolute right-0 top-[-23px] z-[22] hidden h-6 rounded-t-md bg-gray-100
            px-2 pt-0.5 text-sm font-bold
            hover:bg-editor-primary-100 group-focus-within/exercise:block
          `}
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
        ) : editable ? (
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
                  >
                    {exTemplateStrings[type]}
                  </AddButton>
                )
              })}
            </div>
          </>
        ) : null}
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
          <div className="mt-20 max-w-[50%]">
            <AddButton onClick={() => solution.create()}>
              {exTemplateStrings.createSolution}
            </AddButton>
          </div>
        )}
      </div>
    </div>
  )
}
