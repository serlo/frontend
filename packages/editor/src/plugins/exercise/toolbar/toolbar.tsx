import {
  PluginToolbar,
  PreviewButton,
  ToolbarSelect,
} from '@editor/editor-ui/plugin-toolbar'
import { DropdownButton } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/dropdown-button'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import {
  type PluginMenuItem,
  pluginMenuType,
  PluginMenuType,
} from '@editor/package/plugin-menu'
import { selectDocument, store } from '@editor/store'
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
  previewActive,
  setPreviewActive,
}: ExerciseProps & {
  previewActive: boolean
  setPreviewActive: (active: boolean) => void
  interactivePluginOptions: PluginMenuItem[]
}) => {
  const { interactive, hideInteractiveInitially } = state
  const editorStrings = useEditorStrings()
  const exTemplateStrings = editorStrings.templatePlugins.exercise
  const exPluginStrings = editorStrings.plugins.exercise

  const currentlySelected = getPluginMenuType(interactive)

  const pluginSettings = currentlySelected ? (
    <>
      <PreviewButton
        previewActive={previewActive}
        setPreviewActive={setPreviewActive}
      />
      <ToolbarSelect
        tooltipText={exTemplateStrings.changeInteractive}
        value={currentlySelected ?? ''}
        changeValue={(_value, index) => {
          if (interactive.defined) {
            const pluginInitialState =
              interactivePluginOptions[index].initialState
            const pluginType =
              pluginInitialState.plugin as InteractivePluginType
            interactive.replace(pluginType, pluginInitialState.state)
          }
        }}
        options={interactivePluginOptions.map(({ type, title }) => ({
          value: type,
          text: title,
        }))}
      />
    </>
  ) : undefined

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Exercise}
      pluginControls={
        <>
          <PluginDefaultTools pluginId={id} />
          {interactive.defined ? (
            <>
              <div className="m-2 h-0.25 bg-gray-500"></div>
              <DropdownButton
                onClick={() => {
                  if (hideInteractiveInitially.defined) {
                    hideInteractiveInitially.remove()
                  } else hideInteractiveInitially.create(true)
                }}
                label={
                  exPluginStrings.hideInteractiveInitially[
                    hideInteractiveInitially.defined ? 'deactivate' : 'activate'
                  ]
                }
                icon={hideInteractiveInitially.defined ? faEye : faEyeSlash}
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
  interactive: ExerciseProps['state']['interactive']
): PluginMenuType | undefined {
  const plugin = interactive.defined
    ? selectDocument(store.getState(), interactive.id)
    : null

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
