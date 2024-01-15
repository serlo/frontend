import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar/components/toolbar-select'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import type { Dispatch, SetStateAction } from 'react'

import type { ScMcExerciseProps } from '.'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'

export const ScMcExerciseToolbar = ({
  state,
  previewActive,
  setPreviewActive,
  id,
}: ScMcExerciseProps & {
  previewActive: boolean
  setPreviewActive: Dispatch<SetStateAction<boolean>>
}) => {
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
        <>
          <button
            onClick={() => setPreviewActive(!previewActive)}
            className="serlo-tooltip-trigger mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            <EditorTooltip
              text={
                previewActive
                  ? scMcStrings.previewIsActiveHint
                  : scMcStrings.previewIsDeactiveHint
              }
              className="-ml-5 !pb-1"
            />
            {scMcStrings.previewMode}{' '}
            <FaIcon icon={previewActive ? faCheckCircle : faCircle} />
          </button>
          <ToolbarSelect
            tooltipText={scMcStrings.chooseType}
            value={state.isSingleChoice.value ? 'sc' : 'mc'}
            changeValue={handleChange}
            options={[
              { value: 'mc', text: scMcStrings.multipleChoice },
              { value: 'sc', text: scMcStrings.singleChoice },
            ]}
          />
        </>
      }
      pluginControls={<InteractiveToolbarTools id={id} />}
    />
  )
}
