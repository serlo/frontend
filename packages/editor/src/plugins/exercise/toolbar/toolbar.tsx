import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar/components/toolbar-select'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { selectDocument, store } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { ExerciseProps } from '..'
import type { InteractiveExerciseType } from '../editor'

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
    <ToolbarSelect
      tooltipText={exTemplateStrings.changeInteractive}
      value={currentlySelected ?? ''}
      changeValue={(value) => {
        if (interactive.defined)
          interactive.replace(value as InteractiveExerciseType)
      }}
      options={interactiveExerciseTypes.map((type) => ({
        value: type,
        text: exTemplateStrings[type],
      }))}
    />
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
