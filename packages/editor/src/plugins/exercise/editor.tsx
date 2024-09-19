import { AddButton } from '@editor/editor-ui'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { selectIsFocused, useAppSelector } from '@editor/store'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useContext } from 'react'

import { type ExerciseProps } from '.'
import { InteractiveExercisesSelection } from './components/interactive-exercises-selection'
import { interactivePluginTypes } from './interactive-plugin-types'
import { ExerciseToolbar } from './toolbar/toolbar'
import { createOption } from '../rows/utils/plugin-menu'
import { SerloLicenseChooser } from '../solution/serlo-license-chooser'
import { IsSerloContext } from '@/serlo-editor-integration/context/is-serlo-context'

export function ExerciseEditor(props: ExerciseProps) {
  const { state, focused } = props
  const {
    content,
    interactive,
    solution,
    licenseId,
    hideInteractiveInitially,
  } = state
  const isSerlo = useContext(IsSerloContext) // only on serlo
  const editorStrings = useEditorStrings()
  const exTemplateStrings = editorStrings.templatePlugins.exercise
  const exPluginStrings = editorStrings.plugins.exercise

  const interactivePluginOptions = interactivePluginTypes
    .filter((type) => editorPlugins.isSupported(type))
    .map((type) => createOption(type, editorStrings.plugins))

  const isFocusedInside = useAppSelector((state) => {
    const interactiveId = interactive.defined ? interactive.id : null
    if (interactiveId && selectIsFocused(state, interactiveId)) return true
    const solutionId = solution.defined ? solution.id : null
    if (solutionId && selectIsFocused(state, solutionId)) return true
  })

  const isFocused = focused || isFocusedInside

  return (
    <div
      data-qa="plugin-exercise"
      className={cn(
        'group/exercise rounded-b-xl border-3 border-transparent pb-6',
        'focus-within:rounded-tl-xl focus-within:!border-gray-100 focus-within:border-gray-100',
        isFocused && '!rounded-tl-xl !border-gray-100'
      )}
    >
      {isSerlo ? (
        <SerloLicenseChooser
          licenseId={licenseId}
          className="!right-[84px] !top-[-30px]"
        />
      ) : null}
      <div
        className={cn(
          'hidden group-focus-within/exercise:block',
          isFocused && '!block'
        )}
      >
        <ExerciseToolbar
          {...props}
          interactivePluginOptions={interactivePluginOptions}
        />
      </div>
      <div className="h-10"></div>
      {content.render({
        config: {
          textPluginPlaceholder: exPluginStrings.placeholder,
        },
      })}
      <div className="mx-side">
        {interactive.defined ? (
          <>
            {interactive.render()}
            {hideInteractiveInitially.defined ? (
              <small className="bg-editor-primary-200 p-1">
                [{exPluginStrings.hideInteractiveInitially.info}]
              </small>
            ) : null}
          </>
        ) : (
          <InteractiveExercisesSelection
            interactivePluginOptions={interactivePluginOptions}
            interactive={interactive}
          />
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
              'mt-12 hidden max-w-[50%] group-focus-within/exercise:block',
              isFocused && '!block'
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
