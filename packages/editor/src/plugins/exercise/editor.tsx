import { AddButton } from '@editor/editor-ui'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { pluginMenuItems } from '@editor/package/plugin-menu'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useContext, useMemo } from 'react'

import { type ExerciseProps } from '.'
import { InteractiveExercisesSelection } from './components/interactive-exercises-selection'
import { ExerciseToolbar } from './toolbar/toolbar'
import { SerloLicenseChooser } from '../solution/serlo-license-chooser'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
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
  const { lang } = useInstanceData()
  const exTemplateStrings = editorStrings.templatePlugins.exercise
  const exPluginStrings = editorStrings.plugins.exercise

  const language = lang === Instance.De ? 'de' : 'en'

  const exerciseMenuItems = useMemo(() => {
    const exerciseItems = pluginMenuItems.filter((menuItem) => {
      const pluginType = menuItem.initialState.plugin
      return pluginType === 'exercise' && editorPlugins.isSupported(pluginType)
    })
    return exerciseItems.map((menuItem) => {
      return {
        type: menuItem.type,
        pluginType: menuItem.initialState.plugin as EditorPluginType,
        title: menuItem[language].name,
        description: menuItem[language].description,
        icon: menuItem.icon,
      }
    })
  }, [language])

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
          interactivePluginOptions={exerciseMenuItems}
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
          <InteractiveExercisesSelection
            interactivePluginOptions={exerciseMenuItems}
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
