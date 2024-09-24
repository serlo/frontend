import { AddButton } from '@editor/editor-ui'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import {
  getPluginMenuItems,
  type PluginMenuItem,
} from '@editor/package/plugin-menu'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { selectHasFocusedChild, useAppSelector } from '@editor/store'
import { isExerciseDocument } from '@editor/types/plugin-type-guards'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useContext, useMemo, useState } from 'react'

import { type ExerciseProps } from '.'
import { InteractiveExercisesSelection } from './components/interactive-exercises-selection'
import { PreviewProvider } from './context/preview-context'
import { ExerciseToolbar } from './toolbar/toolbar'
import { SerloLicenseChooser } from '../solution/serlo-license-chooser'
import { IsSerloContext } from '@/serlo-editor-integration/context/is-serlo-context'

export function ExerciseEditor(props: ExerciseProps) {
  const { state, focused, id } = props
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

  const [previewActive, setPreviewActive] = useState(false)

  // Initial state of interactive plugin menu items are wrapped with an exercise plugin
  // but for this component we need the interactive plugin directly
  // so we just unwrap them here:
  const unwrappedMenuItems = useMemo<PluginMenuItem[]>(() => {
    return getPluginMenuItems(editorStrings)
      .map((menuItem) => {
        if (!isExerciseDocument(menuItem.initialState)) return false
        const interactive = menuItem.initialState.state.interactive
        if (!interactive || !editorPlugins.isSupported(interactive.plugin)) {
          return false
        }
        const pluginMenuItem = {
          ...menuItem,
          initialState: interactive,
        }
        return pluginMenuItem
      })
      .filter(Boolean) as unknown as PluginMenuItem[]
  }, [editorStrings])

  const isFocusedInside = useAppSelector((state) => {
    return selectHasFocusedChild(state, id)
  })

  const isFocused = focused || isFocusedInside

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
              interactivePluginOptions={unwrappedMenuItems}
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
                isFocused ? 'block' : 'hidden'
              )}
            >
              <AddButton onClick={() => solution.create()}>
                {exTemplateStrings.createSolution}
              </AddButton>
            </div>
          )}
        </div>
      </div>
    </PreviewProvider>
  )
}
