import { AddButton } from '@editor/editor-ui'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import {
  selectHasFocusedChild,
  focus,
  useAppDispatch,
  useAppSelector,
} from '@editor/store'
import { cn } from '@editor/utils/cn'
import { SerloOnlyFeaturesContext } from '@editor/utils/serlo-extra-context'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { lazy, useContext, useEffect, useState } from 'react'

import { type ExerciseProps } from '.'
import { InteractiveExercisesSelection } from './components/interactive-exercises-selection'
import { PreviewProvider } from './context/preview-context'
import { ExerciseToolbar } from './toolbar/toolbar'

const SerloLicenseChooser = lazy(() =>
  import('../solution/serlo-license-chooser').then((module) => ({
    default: module.SerloLicenseChooser,
  }))
)

export function ExerciseEditor(props: ExerciseProps) {
  const { state, focused, id } = props
  const {
    content,
    interactive,
    solution,
    licenseId,
    hideInteractiveInitially,
  } = state
  const { isSerlo } = useContext(SerloOnlyFeaturesContext)
  const editorStrings = useEditStrings()
  const exStrings = editorStrings.plugins.exercise

  const [previewActive, setPreviewActive] = useState(false)

  const isFocusedInside = useAppSelector((state) => {
    return selectHasFocusedChild(state, id)
  })

  const isFocused = focused || isFocusedInside

  const dispatch = useAppDispatch()

  // make sure interactive toolbar content rerenders when interactive changes
  useEffect(() => {
    if (!interactive.defined) return
    dispatch(focus(interactive.id))
    // only rerender once after interactive is created
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.interactive.defined])

  return (
    <PreviewProvider value={previewActive}>
      <div
        data-qa="plugin-exercise"
        className={cn(
          'plugin-exercise group/exercise rounded-b-xl border-3 border-transparent pb-6',
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
            'group-focus-within/exercise:block',
            isFocused ? 'block' : 'hidden'
          )}
        >
          <ExerciseToolbar
            {...props}
            previewActive={previewActive}
            setPreviewActive={setPreviewActive}
          />
        </div>
        <div className="h-10"></div>
        {/* Special case for the blanks exercise: Until the child plugin is selected we hide the task to avoid confusion */}
        {/* Background: Users often add their blanks-text to the task */}
        <div className="group-has-[.blanks-child-plugin-selection]/exercise:hidden">
          {content.render({
            config: {
              textPluginPlaceholder: exStrings.placeholder,
            },
          })}
        </div>
        <div className="mx-side">
          {interactive.defined ? (
            <>
              {interactive.render()}
              {hideInteractiveInitially.defined ? (
                <small className="bg-editor-primary-200 p-1">
                  [{exStrings.hideInteractiveInitially.info}]
                </small>
              ) : null}
            </>
          ) : (
            <InteractiveExercisesSelection interactive={interactive} />
          )}
          {solution.defined ? (
            <div className="-ml-side mt-block">
              <nav className="flex justify-end">
                <button
                  className="serlo-button-editor-secondary serlo-tooltip-trigger relative top-7 z-20 mr-side"
                  onClick={() => solution.remove()}
                >
                  <EditorTooltip text={exStrings.removeSolution} />
                  <FaIcon icon={faTrashAlt} />
                </button>
              </nav>
              {solution.render()}
            </div>
          ) : (
            <div
              className={cn(
                'mt-12 hidden max-w-[50%] group-focus-within/exercise:block',
                isFocused ? 'block' : 'hidden'
              )}
            >
              <AddButton onClick={() => solution.create()}>
                {exStrings.createSolution}
              </AddButton>
            </div>
          )}
        </div>
      </div>
    </PreviewProvider>
  )
}
