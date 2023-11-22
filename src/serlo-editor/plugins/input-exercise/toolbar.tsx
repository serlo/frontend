import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
import { FaIcon, useEditorStrings, tw } from '@serlo/serlo-editor'
import { Dispatch, SetStateAction } from 'react'

import type { InputExerciseProps } from '.'
import { InputExerciseType } from './input-exercise-type'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

export const InputExerciseToolbar = ({
  state,
  previewActive,
  setPreviewActive,
  id,
}: InputExerciseProps & {
  previewActive: boolean
  setPreviewActive: Dispatch<SetStateAction<boolean>>
}) => {
  const inputExStrings = useEditorStrings().templatePlugins.inputExercise
  const scMcStrings = useEditorStrings().templatePlugins.scMcExercise

  return (
    <PluginToolbar
      pluginType={EditorPluginType.InputExercise}
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
            <EditorTooltip text={inputExStrings.chooseType} />
            <select
              value={state.type.value}
              onChange={(event) => state.type.set(event.target.value)}
              className={tw`
                bg-editor-primary-10 mr-2 max-w-[13rem] cursor-pointer rounded-md !border
                border-gray-500 bg-transparent px-1 py-[1px] text-sm transition-all
                hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
              `}
            >
              {Object.values(InputExerciseType).map((exerciseType) => (
                <option key={exerciseType} value={exerciseType}>
                  {inputExStrings.types[exerciseType]}
                </option>
              ))}
            </select>
          </label>
          <label className="serlo-tooltip-trigger">
            <EditorTooltip text={inputExStrings.unit} />
            <input
              placeholder={inputExStrings.unit}
              value={state.unit.value}
              onChange={({ target }) => {
                state.unit.set(target.value)
              }}
              className={tw`
              mr-2 w-20 cursor-pointer rounded-md !border border-gray-500
            bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
            hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
            `}
            />
          </label>
        </>
      }
      pluginControls={<InteractiveToolbarTools id={id} />}
    />
  )
}
