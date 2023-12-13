import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    state.isSingleChoice.set(event.target.value === 'sc')
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
          <label className="serlo-tooltip-trigger mr-2">
            <EditorTooltip text={scMcStrings.chooseType} />
            <select
              value={state.isSingleChoice.value ? 'sc' : 'mc'}
              onChange={handleChange}
              className={cn(`
                bg-editor-primary-10 mr-2 max-w-[13rem] cursor-pointer rounded-md !border
                border-gray-500 bg-transparent px-1 py-[1px] text-sm transition-all
                hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
              `)}
            >
              <option value="mc">{scMcStrings.multipleChoice}</option>
              <option value="sc">{scMcStrings.singleChoice}</option>
            </select>
          </label>
        </>
      }
      pluginControls={<InteractiveToolbarTools id={id} />}
    />
  )
}
