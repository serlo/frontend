import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { Dispatch, SetStateAction } from 'react'

import { type FillInTheBlanksExerciseProps } from '.'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'

export const FillInTheBlanksToolbar = ({
  state,
  previewActive,
  setPreviewActive,
  id,
}: FillInTheBlanksExerciseProps & {
  previewActive: boolean
  setPreviewActive: Dispatch<SetStateAction<boolean>>
}) => {
  const blanksExerciseStrings = useEditorStrings().plugins.blanksExercise

  return (
    <PluginToolbar
      pluginType={EditorPluginType.FillInTheBlanksExercise}
      className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
      pluginSettings={
        <>
          <button
            onClick={() => setPreviewActive(!previewActive)}
            className="line-height-[normal] vertical-align serlo-tooltip-trigger mr-2 rounded-md border border-gray-500 px-1 py-[1px] text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
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
          <label className="serlo-custom-select serlo-tooltip-trigger relative mr-2 text-sm">
            <EditorTooltip text={blanksExerciseStrings.chooseType} />
            <select
              value={state.mode.value}
              onChange={(event) => {
                state.mode.set(event.target.value)
              }}
              className={cn(`
                bg-editor-primary-10 vertical-align
                mr-2 max-w-[13rem] cursor-pointer appearance-none rounded-md
                !border border-gray-500 bg-transparent px-1 py-[1px] text-sm
                transition-all hover:bg-editor-primary-200
                focus:bg-editor-primary-200
              `)}
            >
              {(['typing', 'drag-and-drop'] as const).map((mode) => (
                <option key={mode} value={mode}>
                  {blanksExerciseStrings.modes[mode]}
                </option>
              ))}
            </select>
          </label>
        </>
      }
      pluginControls={<InteractiveToolbarTools id={id} />}
    />
  )
}
