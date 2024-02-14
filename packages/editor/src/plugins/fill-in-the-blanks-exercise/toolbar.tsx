import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar/components/toolbar-select'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { Dispatch, SetStateAction } from 'react'

import { type FillInTheBlanksExerciseProps } from '.'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'

export const FillInTheBlanksToolbar = ({
  id,
  state,
  previewActive,
  setPreviewActive,
  childPluginType,
}: FillInTheBlanksExerciseProps & {
  previewActive: boolean
  setPreviewActive: Dispatch<SetStateAction<boolean>>
  childPluginType: EditorPluginType
}) => {
  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  return (
    <PluginToolbar
      pluginType={EditorPluginType.FillInTheBlanksExercise}
      className="!left-[-9px] top-[-33px] w-[calc(100%+25px)]"
      pluginSettings={
        <>
          <button
            onClick={() => setPreviewActive(!previewActive)}
            className="serlo-tooltip-trigger mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
            data-qa="plugin-blanks-exercise-preview-button"
          >
            <EditorTooltip
              text={
                previewActive
                  ? blanksExerciseStrings.previewIsActiveHint
                  : blanksExerciseStrings.previewIsDeactiveHint
              }
              className="-ml-5 !pb-1"
            />
            {blanksExerciseStrings.previewMode}{' '}
            <FaIcon icon={previewActive ? faCheckCircle : faCircle} />
          </button>
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
            tooltipText={blanksExerciseStrings.chooseType}
            value={childPluginType}
            dataQa="plugin-blanks-mode-switch"
            changeValue={(value) => state.childPlugin.replace(value)}
            options={[
              { value: EditorPluginType.Text, text: 'Text' },
              { value: EditorPluginType.SerloTable, text: 'Table' },
            ]}
          />
        </>
      }
      pluginControls={<InteractiveToolbarTools id={id} />}
    />
  )
}
