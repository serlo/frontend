import { StepSegment } from './editor'
import { TransformationTarget } from './editor-renderer'
import { GridFocus } from './grid-focus'
import { InlineMath } from './inline-math'
import { stepProps } from '..'
import { renderSignToString, Sign } from '../sign'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { StateTypeReturnType } from '@/serlo-editor/plugin'

export interface StepEditorProps {
  gridFocus: GridFocus
  row: number
  state: StateTypeReturnType<typeof stepProps>
  transformationTarget: TransformationTarget
}

export function StepEditor(props: StepEditorProps) {
  const equationsStrings = useEditorStrings().plugins.equations
  const { gridFocus, row, state, transformationTarget } = props

  return (
    <>
      {transformationTarget === TransformationTarget.Equation && (
        <td
          className="text-right"
          onClick={() => gridFocus.setFocus({ row, column: StepSegment.Left })}
        >
          <InlineMath
            focused={gridFocus.isFocused({ row, column: StepSegment.Left })}
            placeholder={
              row === 0 ? '3x+1' : `[${equationsStrings.leftHandSide}]`
            }
            state={state.left}
            onChange={(src) => state.left.set(src)}
            onFocusNext={() => gridFocus.moveRight()}
            onFocusPrevious={() => gridFocus.moveLeft()}
          />
        </td>
      )}
      <td className="px-[3px] py-0 text-center align-baseline">
        {(transformationTarget === 'equation' || row !== 0) && (
          <select
            className="ml-4 mr-2.5 h-8 w-9 rounded-md border-[1px] border-gray-200 bg-gray-200"
            tabIndex={-1}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              state.sign.set(e.target.value)
            }}
            value={state.sign.value}
          >
            {Object.values(Sign).map((sign) => {
              return (
                <option key={sign} value={sign}>
                  {renderSignToString(sign)}
                </option>
              )
            })}
          </select>
        )}
      </td>
      <td
        className="align-baseline"
        onClick={() => gridFocus.setFocus({ row, column: StepSegment.Right })}
      >
        <InlineMath
          focused={gridFocus.isFocused({ row, column: StepSegment.Right })}
          placeholder={
            row === 0
              ? '4x+3x'
              : transformationTarget === TransformationTarget.Term
              ? `[${equationsStrings.term}]`
              : `[${equationsStrings.rightHandSide}]`
          }
          state={state.right}
          onChange={(src) => state.right.set(src)}
          onFocusNext={() => gridFocus.moveRight()}
          onFocusPrevious={() => gridFocus.moveLeft()}
        />
      </td>
      {transformationTarget === TransformationTarget.Equation && (
        <td
          className="pl-[5px] align-baseline"
          onClick={() =>
            gridFocus.setFocus({ row, column: StepSegment.Transform })
          }
        >
          |{' '}
          <InlineMath
            focused={gridFocus.isFocused({
              row,
              column: StepSegment.Transform,
            })}
            placeholder={
              row === 0
                ? equationsStrings.transformationExample
                : `[${equationsStrings.transformation}]`
            }
            state={state.transform}
            onChange={(src) => state.transform.set(src)}
            onFocusNext={() => gridFocus.moveRight()}
            onFocusPrevious={() => gridFocus.moveLeft()}
          />
        </td>
      )}
    </>
  )
}
