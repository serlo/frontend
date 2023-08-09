import type { ScMcExerciseProps } from '.'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const ScMcExerciseToolbar = ({ state }: ScMcExerciseProps) => {
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
          <label className="serlo-tooltip-trigger mr-2">
            <EditorTooltip text={scMcStrings.chooseType} />
            <select
              value={state.isSingleChoice.value ? 'sc' : 'mc'}
              onChange={handleChange}
              className={tw`
                bg-editor-primary-10 mr-2 max-w-[13rem] cursor-pointer rounded-md !border
                border-gray-500 bg-transparent px-1 py-[1px] text-sm transition-all
                hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
              `}
            >
              <option value="mc">{scMcStrings.multipleChoice}</option>
              <option value="sc">{scMcStrings.singleChoice}</option>
            </select>
          </label>
        </>
      }
    />
  )
}
