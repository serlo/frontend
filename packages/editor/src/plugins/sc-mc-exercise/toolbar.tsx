import { PluginToolbar, ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { ScMcExerciseProps } from '.'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'

export const ScMcExerciseToolbar = ({ state, id }: ScMcExerciseProps) => {
  const scMcStrings = useEditorStrings().templatePlugins.scMcExercise

  const handleChange = (value: string) => {
    state.isSingleChoice.set(value === 'sc')
    state.isSingleChoice.value &&
      state.answers.forEach((answer) => answer.isCorrect.set(false))
  }

  return (
    <PluginToolbar
      pluginType={EditorPluginType.ScMcExercise}
      pluginSettings={
        <ToolbarSelect
          tooltipText={scMcStrings.chooseType}
          value={state.isSingleChoice.value ? 'sc' : 'mc'}
          changeValue={handleChange}
          options={[
            { value: 'mc', text: scMcStrings.multipleChoice },
            { value: 'sc', text: scMcStrings.singleChoice },
          ]}
        />
      }
      pluginControls={<InteractiveToolbarTools id={id} />}
    />
  )
}
