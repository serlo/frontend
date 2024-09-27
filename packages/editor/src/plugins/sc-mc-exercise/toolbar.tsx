import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { useEditorStrings } from '@editor/utils/use-editor-strings'

import type { ScMcExerciseProps } from '.'
import { InteractiveToolbarPortal } from '../exercise/toolbar/interactive-toolbar-portal'

export const ScMcExerciseToolbar = ({
  state,
  containerRef,
}: ScMcExerciseProps) => {
  const scMcStrings = useEditorStrings().templatePlugins.scMcExercise

  const handleChange = (value: string) => {
    state.isSingleChoice.set(value === 'sc')
    state.isSingleChoice.value &&
      state.answers.forEach((answer) => answer.isCorrect.set(false))
  }

  return (
    <InteractiveToolbarPortal containerRef={containerRef}>
      <ToolbarSelect
        tooltipText={scMcStrings.chooseType}
        value={state.isSingleChoice.value ? 'sc' : 'mc'}
        changeValue={handleChange}
        options={[
          { value: 'mc', text: scMcStrings.multipleChoice },
          { value: 'sc', text: scMcStrings.singleChoice },
        ]}
      />
    </InteractiveToolbarPortal>
  )
}
