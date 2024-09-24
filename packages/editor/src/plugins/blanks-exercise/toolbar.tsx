import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import { type BlanksExerciseProps } from '.'
import { InteractiveToolbarPortal } from '../exercise/toolbar/interactive-toolbar-portal'

export const BlanksExerciseToolbar = ({
  state,
  childPluginType,
  containerRef,
}: BlanksExerciseProps & {
  childPluginType: EditorPluginType
}) => {
  const pluginsStrings = useEditorStrings().plugins
  const blanksExerciseStrings = pluginsStrings.blanksExercise

  return (
    <InteractiveToolbarPortal containerRef={containerRef}>
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
    </InteractiveToolbarPortal>
  )
}
