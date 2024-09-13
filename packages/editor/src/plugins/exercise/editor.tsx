import { AddButton } from '@editor/editor-ui'
import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useContext } from 'react'

import { type ExerciseProps } from '.'
import {
  type InteractivePluginType,
  interactivePluginTypes,
} from './interactive-plugin-types'
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

  const interactivePluginOptions = interactivePluginTypes
    .filter((type) => editorPlugins.isSupported(type))
    .map((type) => createOption(type, editorStrings.plugins))

  const templateStrings = useEditorStrings().templatePlugins
  const exTemplateStrings = templateStrings.exercise
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
          className="!right-[84px] !top-[-30px]"
        />
      ) : null}
      {focused ? (
        <ExerciseToolbar
          {...props}
          interactivePluginOptions={interactivePluginOptions}
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
          <>
            <p className="mb-2 text-gray-400">
              {exTemplateStrings.addOptionalInteractiveEx}
            </p>
            <div className="flex items-start">
              {interactivePluginOptions.map(
                ({ pluginType, title, icon, description }, index, arr) => {
                  const tooltipClassName =
                    index === 0
                      ? 'left-0'
                      : index + 1 < arr.length
                        ? '-left-24'
                        : 'right-0'
                  return (
                    <button
                      key={title}
                      data-qa={`add-exercise-${pluginType}`}
                      onClick={() =>
                        interactive.create({
                          plugin: pluginType as InteractivePluginType,
                        })
                      }
                      className="serlo-tooltip-trigger w-full rounded-md p-1 hover:shadow-xl focus:shadow-xl"
                    >
                      <EditorTooltip
                        className={tooltipClassName}
                        text={description}
                      />
                      {icon || <IconFallback />}
                      <b className="mt-2 block text-sm">{title}</b>
                    </button>
                  )
                }
              )}
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
          <div className={cn('mt-12 max-w-[50%]', focused && '!block')}>
            <AddButton onClick={() => solution.create()}>
              {exTemplateStrings.createSolution}
            </AddButton>
          </div>
        )}
      </div>
    </div>
  )
}
