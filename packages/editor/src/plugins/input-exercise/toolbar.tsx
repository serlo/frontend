import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { cn } from '@editor/utils/cn'

import type { InputExerciseProps } from '.'
import { InputExerciseType } from './input-exercise-type'
import { InteractiveToolbarPortal } from '../exercise/toolbar/interactive-toolbar-portal'

export const InputExerciseToolbar = ({
  state,
  containerRef,
}: InputExerciseProps) => {
  const inputExStrings = useEditStrings().templatePlugins.inputExercise

  return (
    <InteractiveToolbarPortal containerRef={containerRef}>
      <>
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
    </InteractiveToolbarPortal>
  )
}
