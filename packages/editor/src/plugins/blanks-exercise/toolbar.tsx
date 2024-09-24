import { PluginToolbar, ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import { type BlanksExerciseProps } from '.'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'

export const BlanksExerciseToolbar = ({
  id,
  state,
  childPluginType,
  pluginTitle,
}: BlanksExerciseProps & {
  childPluginType: EditorPluginType
  pluginTitle: string
}) => {
  const pluginsStrings = useEditorStrings().plugins
  const blanksExerciseStrings = pluginsStrings.blanksExercise

  return (
    <PluginToolbar
      pluginType={EditorPluginType.BlanksExercise}
      pluginTitle={pluginTitle}
      className="top-[-33px]"
      pluginSettings={
        <>
          <ToolbarSelect
            tooltipText={blanksExerciseStrings.chooseType}
            value={state.mode.value}
            dataQa="plugin-blanks-mode-switch"
            changeValue={(value) => state.mode.set(value)}
            options={[
              { value: 'typing', text: blanksExerciseStrings.modes.typing },
              {
                value: 'drag-and-drop',
                text: blanksExerciseStrings.modes['drag-and-drop'],
              },
            ]}
          />
          <ToolbarSelect
            tooltipText={blanksExerciseStrings.chooseChildPluginType}
            value={childPluginType}
            dataQa="plugin-blanks-child-plugin-switch"
            changeValue={(value) => state.text.replace(value)}
            options={[
              {
                value: EditorPluginType.Text,
                text: pluginsStrings.text.title,
              },
              {
                value: EditorPluginType.SerloTable,
                text: pluginsStrings.serloTable.title,
              },
            ]}
          />
        </>
      }
      pluginControls={<InteractiveToolbarTools id={id} />}
    />
  )
}
