import { PluginToolbar, ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { DropdownButton } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/dropdown-button'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { selectDocument, store } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { ExerciseProps } from '..'
import { InteractivePluginType } from '../interactive-plugin-types'

export const ExerciseToolbar = ({
  id,
  state,
  interactiveExerciseTypes,
}: ExerciseProps & {
  interactiveExerciseTypes: InteractivePluginType[]
}) => {
  const { interactive } = state
  const exTemplateStrings = useEditorStrings().templatePlugins.exercise
  const exPluginStrings = useEditorStrings().plugins.exercise

  const currentlySelected = interactive.defined
    ? selectDocument(store.getState(), interactive.id)?.plugin
    : undefined

  const pluginSettings = currentlySelected ? (
    <ToolbarSelect
      tooltipText={exTemplateStrings.changeInteractive}
      value={currentlySelected ?? ''}
      changeValue={(value) => {
        if (interactive.defined)
          interactive.replace(value as InteractivePluginType)
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
