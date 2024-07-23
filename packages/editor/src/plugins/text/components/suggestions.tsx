import IconDropzones from '@editor/editor-ui/assets/plugin-icons/icon-dropzones.svg'
import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import IconH5p from '@editor/editor-ui/assets/plugin-icons/icon-h5p.svg'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

import type { SuggestionOption } from '../hooks/use-suggestions'

interface SuggestionsProps {
  options: SuggestionOption[]
  suggestionsRef: React.MutableRefObject<HTMLDivElement | null>
  selected: number
  onMouseDown: (pluginType: string) => void
  onMouseMove: (index: number) => void
}

const allInteractiveExerciseTypes = [
  EditorPluginType.ScMcExercise,
  EditorPluginType.InputExercise,
  EditorPluginType.H5p,
  EditorPluginType.TextAreaExercise,
  EditorPluginType.BlanksExercise,
  EditorPluginType.DropzoneImage,
] as const

const exerciseIcons = {
  [EditorPluginType.DropzoneImage]: <IconDropzones />,
  [EditorPluginType.H5p]: <IconH5p />,
}
export const Suggestions = ({
  options,
  suggestionsRef,
  selected,
  onMouseDown,
  onMouseMove,
}: SuggestionsProps) => {
  const editorStrings = useEditorStrings()
  const exerciseTemplateStrings = editorStrings.templatePlugins.exercise

  const interactiveExerciseTypes = allInteractiveExerciseTypes.filter((type) =>
    editorPlugins.getAllWithData().some((plugin) => plugin.type === type)
  )

  if (options.length === 0) {
    return <div>{editorStrings.plugins.text.noItemsFound}</div>
  }

  const basicPlugins = options.filter(
    (option) =>
      option.pluginType !== 'exercise' && option.pluginType !== 'exerciseGroup'
  )

  const renderPluginItem = (
    { pluginType, title, icon }: SuggestionOption,
    index: number
  ) => {
    return (
      <div
        key={index}
        data-qa={`plugin-suggestion-${pluginType}`}
        data-active={index === selected}
        onMouseDown={(event: React.MouseEvent) => {
          event.preventDefault()
          onMouseDown(pluginType)
        }}
        onMouseMove={() => {
          onMouseMove(index)
        }}
        className={cn(`
      group/suggestion flex cursor-pointer flex-col items-center rounded-md
      border border-2 border-transparent p-2 pb-0
      hover:border-gray-300 data-[active=true]:border-brand-300
    `)}
      >
        <div
          className={cn(`
       mb-2 flex w-full items-center justify-center rounded-md
      `)}
        >
          {icon ?? <IconFallback className="h-full w-full" />}
        </div>
        <h5 className="text-center text-sm font-bold">{title}</h5>
      </div>
    )
  }

  return (
    <div ref={suggestionsRef} className=" overflow-auto">
      <h1 className="pl-8 pt-4 text-lg font-bold">
        {editorStrings.plugins.basicPluginsTitle}
      </h1>
      <div className="grid grid-cols-5 gap-4 p-4">
        {basicPlugins.map((basicItem, index) => {
          return <> {renderPluginItem(basicItem, index)}</>
        })}
      </div>
      <h1 className="pl-8 pt-4 text-lg font-bold">
        {editorStrings.plugins.interactivePluginsTitle}
      </h1>
      <div className="grid grid-cols-5 gap-4 p-4">
        {interactiveExerciseTypes.map((exerciseType, index) => {
          return (
            <>
              {' '}
              {renderPluginItem(
                {
                  pluginType: 'exercise',
                  title: exerciseTemplateStrings[exerciseType],
                  icon: exerciseIcons[exerciseType],
                },
                index
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}
