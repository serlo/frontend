import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { PluginMenuItem } from '@editor/package/plugin-menu'

import { type ExerciseProps } from '..'
import { type InteractivePluginType } from '../interactive-plugin-types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function InteractiveExercisesSelection({
  interactivePluginOptions,
  interactive,
}: {
  interactivePluginOptions: PluginMenuItem[]
  interactive: ExerciseProps['state']['interactive']
}) {
  const templateStrings = useEditorStrings().templatePlugins
  const exTemplateStrings = templateStrings.exercise

  function getTooltipClass(index: number) {
    const isLastInLine = index % 4 === 3
    const isFirstInLine = index % 4 === 0
    return isFirstInLine ? 'left-0' : isLastInLine ? 'right-0' : '-left-24'
  }

  function handleOnClick(initialState: PluginMenuItem['initialState']) {
    if (interactive.defined) return

    interactive.create({
      plugin: initialState.plugin as InteractivePluginType,
      state: initialState.state,
    })
  }

  return (
    <>
      <p className="mb-2 text-gray-400">
        {exTemplateStrings.addOptionalInteractiveEx}
      </p>
      <div className="grid grid-cols-4 items-start gap-2 pb-10">
        {interactivePluginOptions.map(
          ({ type, title, icon, description, initialState }, index) => (
            <button
              key={type}
              data-qa={`add-exercise-${initialState.plugin}`}
              onClick={() => handleOnClick(initialState)}
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
