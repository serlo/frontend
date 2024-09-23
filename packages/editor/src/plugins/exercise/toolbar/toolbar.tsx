import { PluginToolbar, ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { DropdownButton } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/dropdown-button'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import {
  PluginMenuItem,
  pluginMenuType,
  PluginMenuType,
} from '@editor/package/plugin-menu'
import { type DocumentState, selectDocument, store } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type {
  EditorBlanksExerciseDocument,
  EditorScMcExerciseDocument,
} from '@editor/types/editor-plugins'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { ExerciseProps } from '..'
import { InteractivePluginType } from '../interactive-plugin-types'

export const ExerciseToolbar = ({
  id,
  state,
  interactivePluginOptions,
}: ExerciseProps & {
  interactivePluginOptions: PluginMenuItem[]
}) => {
  const { interactive } = state
  const exTemplateStrings = useEditorStrings().templatePlugins.exercise
  const exPluginStrings = useEditorStrings().plugins.exercise

  const currentPlugin = interactive.defined
    ? selectDocument(store.getState(), interactive.id)
    : null

  const currentlySelected = getPluginMenuType(currentPlugin)

  const pluginSettings = currentlySelected ? (
    <ToolbarSelect
      tooltipText={exTemplateStrings.changeInteractive}
      value={currentlySelected ?? ''}
      changeValue={(value, index) => {
        if (interactive.defined) {
          const pluginInitialState =
            interactivePluginOptions[index].initialState
          const pluginType = pluginInitialState.plugin as InteractivePluginType
          interactive.replace(pluginType, pluginInitialState.state)
        }
      }}
      options={interactivePluginOptions.map(({ type, title }) => ({
        value: type,
        text: title,
      }))}
    />
  ) : undefined

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Exercise}
      pluginControls={
        <>
          <PluginDefaultTools pluginId={id} />
          {state.interactive.defined ? (
            <>
              <div className="m-2 h-0.25 bg-gray-500"></div>
              <DropdownButton
                onClick={() => {
                  if (state.hideInteractiveInitially.defined) {
                    state.hideInteractiveInitially.remove()
                  } else state.hideInteractiveInitially.create(true)
                }}
                label={
                  exPluginStrings.hideInteractiveInitially[
                    state.hideInteractiveInitially.defined
                      ? 'deactivate'
                      : 'activate'
                  ]
                }
                icon={
                  state.hideInteractiveInitially.defined ? faEye : faEyeSlash
                }
                dataQa="toggle-interactive-default-visibility"
              />
            </>
          ) : null}
        </>
      }
      pluginSettings={pluginSettings}
      className="mt-2.5"
    />
  )
}

function getPluginMenuType(
  plugin: DocumentState | null
): PluginMenuType | undefined {
  if (!plugin) return undefined

  const pluginType = plugin.plugin

  if (pluginType === EditorPluginType.BlanksExercise) {
    const isDragAndDrop =
      (plugin as EditorBlanksExerciseDocument).state.mode === 'drag-and-drop'
    return isDragAndDrop
      ? pluginMenuType.BlanksExerciseDragAndDrop
      : pluginMenuType.BlanksExercise
  }

  if (pluginType === EditorPluginType.ScMcExercise) {
    return (plugin as EditorScMcExerciseDocument).state.isSingleChoice
      ? pluginMenuType.SingleChoiceExercise
      : pluginMenuType.MultipleChoiceExercise
  }

  return pluginType as PluginMenuType
}
