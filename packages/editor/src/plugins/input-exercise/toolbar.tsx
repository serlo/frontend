import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import {
  PluginToolbar,
  PreviewButton,
  ToolbarSelect,
} from '@editor/editor-ui/plugin-toolbar'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { Dispatch, SetStateAction } from 'react'

import type { InputExerciseProps } from '.'
import { InputExerciseType } from './input-exercise-type'
import { InteractiveToolbarTools } from '../exercise/toolbar/interactive-toolbar-tools'

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

  return (
    <PluginToolbar
      pluginType={EditorPluginType.InputExercise}
      pluginSettings={
        <>
          <PreviewButton
            previewActive={previewActive}
            setPreviewActive={setPreviewActive}
          />
          <ToolbarSelect
            tooltipText={inputExStrings.chooseType}
            value={state.type.value}
            changeValue={(value) => state.type.set(value)}
            options={Object.values(InputExerciseType).map((exerciseType) => ({
              value: exerciseType,
              text: inputExStrings.types[exerciseType],
            }))}
          />
          <label className="serlo-tooltip-trigger">
            <EditorTooltip text={inputExStrings.unit} />
            <input
              placeholder={inputExStrings.unit}
              value={state.unit.value}
              onChange={({ target }) => {
                state.unit.set(target.value)
              }}
              className={cn(`
              mr-2 w-20 cursor-pointer rounded-md !border border-gray-500
            bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
            hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
            `)}
            />
          </label>
        </>
      }
      pluginControls={<InteractiveToolbarTools id={id} />}
    />
  )
}
