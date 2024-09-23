import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { getInitialState, PluginMenuType } from '@editor/package/plugin-menu'
import type { PluginMenuItemType } from '@editor/plugins/rows/contexts/plugin-menu/types'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { EditorExerciseDocument } from '@editor/types/editor-plugins'

import { type ExerciseProps } from '..'
import { type InteractivePluginType } from '../interactive-plugin-types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function InteractiveExercisesSelection({
  interactivePluginOptions,
  interactive,
}: {
  interactivePluginOptions: PluginMenuItemType[]
  interactive: ExerciseProps['state']['interactive']
}) {
  const templateStrings = useEditorStrings().templatePlugins
  const exTemplateStrings = templateStrings.exercise

  function getTooltipClass(index: number) {
    const isLastInLine = index % 4 === 3
    const isFirstInLine = index % 4 === 0
    return isFirstInLine ? 'left-0' : isLastInLine ? 'right-0' : '-left-24'
  }

  function handleOnClick(
    pluginType: EditorPluginType,
    pluginMenuType: PluginMenuType
  ) {
    if (interactive.defined) return
    const plugin = pluginType as InteractivePluginType
    const [exerciseState] = getInitialState(pluginMenuType)
    const pluginState = exerciseState.state as EditorExerciseDocument['state']
    if (!pluginState.interactive) return
    interactive.create({ plugin, state: pluginState.interactive.state })
  }

  return (
    <>
      <p className="mb-2 text-gray-400">
        {exTemplateStrings.addOptionalInteractiveEx}
      </p>
      <div className="grid grid-cols-4 items-start gap-2 pb-10">
        {interactivePluginOptions.map(
          ({ type, pluginType, title, icon, description }, index) => (
            <button
              key={title}
              data-qa={`add-exercise-${pluginType}`}
              onClick={() => handleOnClick(pluginType, type)}
              className="serlo-tooltip-trigger w-32 rounded-md p-1 hover:shadow-xl focus:shadow-xl"
            >
              <EditorTooltip
                className={getTooltipClass(index)}
                text={description}
              />
              {typeof icon !== 'string' ? icon() : <IconFallback />}
              <b className="mt-2 block text-sm">{title}</b>
            </button>
          )
        )}
      </div>
    </>
  )
}
