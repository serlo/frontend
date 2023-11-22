import { useEditorStrings, tw } from '@serlo/serlo-editor'

import type { ExerciseProps } from '..'
import type { InteractiveExerciseType } from '../editor'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { selectDocument, store } from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

export const ExerciseToolbar = ({
  id,
  state,
  interactiveExerciseTypes,
}: ExerciseProps & {
  interactiveExerciseTypes: InteractiveExerciseType[]
}) => {
  const { interactive } = state
  const exTemplateStrings = useEditorStrings().templatePlugins.exercise

  const currentlySelected = interactive.defined
    ? selectDocument(store.getState(), interactive.id)?.plugin
    : undefined

  const pluginSettings = currentlySelected ? (
    <>
      <label className="serlo-tooltip-trigger mr-2">
        <EditorTooltip text={exTemplateStrings.changeInteractive} />
        <select
          onChange={({ target }) => {
            if (interactive.defined)
              interactive.replace(target.value as InteractiveExerciseType)
          }}
          className={tw`
                    mr-2 cursor-pointer rounded-md !border border-gray-500 bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
                  hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
                  `}
          value={currentlySelected ?? ''}
        >
          {interactiveExerciseTypes.map((type) => {
            return (
              <option key={type} value={type}>
                {exTemplateStrings[type]}
              </option>
            )
          })}
        </select>
      </label>
    </>
  ) : undefined

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Exercise}
      pluginControls={<PluginDefaultTools pluginId={id} />}
      pluginSettings={pluginSettings}
      className="mt-2.5"
    />
  )
}
