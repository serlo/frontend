import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import type { PluginMenuItemType } from '@editor/plugins/rows/contexts/plugin-menu/types'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

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

  function handleOnClick(pluginType: EditorPluginType) {
    if (interactive.defined) return
    const plugin = pluginType as InteractivePluginType
    interactive.create({ plugin })
  }

  return (
    <>
      <p className="mb-2 text-gray-400">
        {exTemplateStrings.addOptionalInteractiveEx}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {interactivePluginOptions.map(
          ({ pluginType, title, icon, description }, index) => (
            <button
              key={title}
              data-qa={`add-exercise-${pluginType}`}
              onClick={() => handleOnClick(pluginType)}
              className="serlo-tooltip-trigger w-32 rounded-md p-1 hover:shadow-xl focus:shadow-xl"
            >
              <EditorTooltip
                className={getTooltipClass(index)}
                text={description}
              />
              {icon && typeof icon !== 'string' ? icon() : <IconFallback />}
              <b className="mt-2 block text-sm">{title}</b>
            </button>
          )
        )}
      </div>
    </>
  )
}
