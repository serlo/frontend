import { TransformationTarget } from './editor-renderer'
import { InlineMath } from './inline-math'
import type { stepProps } from '..'
import { renderSignToString, Sign } from '../sign'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { getPathDataAndIsFocus } from '@/serlo-editor/editor-ui/focus-helper'
import type { StateTypeReturnType } from '@/serlo-editor/plugin'
import { FocusPath } from '@/serlo-editor/types'

export interface StepEditorProps {
  row: number
  state: StateTypeReturnType<typeof stepProps>
  transformationTarget: TransformationTarget
  path: Array<string | number>
  currentFocus: FocusPath
  pluginId: string
}

export function StepEditor(props: StepEditorProps) {
  const equationsStrings = useEditorStrings().plugins.equations
  const { row, state, transformationTarget, path, currentFocus } = props
  const { pluginId } = props

  return (
    <>
      {transformationTarget === TransformationTarget.Equation && renderLeft()}
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
      {renderRight()}
      {transformationTarget === TransformationTarget.Equation &&
        renderTransform()}
    </>
  )

  function renderLeft() {
    const { isFocused, pathData } = getPathDataAndIsFocus({
      pluginId,
      path: [...path, 'left'],
      currentFocus,
    })

    return (
      <td className="text-right" {...pathData}>
        <InlineMath
          focused={isFocused}
          placeholder={
            row === 0 ? '3x+1' : `[${equationsStrings.leftHandSide}]`
          }
          state={state.left}
          onChange={(src) => state.left.set(src)}
          onFocusNext={() => void 0}
          onFocusPrevious={() => void 0}
        />
      </td>
    )
  }

  function renderRight() {
    const { isFocused, pathData } = getPathDataAndIsFocus({
      pluginId,
      path: [...path, 'right'],
      currentFocus,
    })

    return (
      <td className="align-baseline" {...pathData}>
        <InlineMath
          focused={isFocused}
          placeholder={
            row === 0
              ? '4x+3x'
              : transformationTarget === TransformationTarget.Term
              ? `[${equationsStrings.term}]`
              : `[${equationsStrings.rightHandSide}]`
          }
          state={state.right}
          onChange={(src) => state.right.set(src)}
          onFocusNext={() => void 0}
          onFocusPrevious={() => void 0}
        />
      </td>
    )
  }

  function renderTransform() {
    const { isFocused, pathData } = getPathDataAndIsFocus({
      pluginId,
      path: [...path, 'transform'],
      currentFocus,
    })

    return (
      <td className="pl-[5px] align-baseline" {...pathData}>
        |{' '}
        <InlineMath
          focused={isFocused}
          placeholder={
            row === 0
              ? equationsStrings.transformationExample
              : `[${equationsStrings.transformation}]`
          }
          state={state.transform}
          onChange={(src) => state.transform.set(src)}
          onFocusNext={() => void 0}
          onFocusPrevious={() => void 0}
        />
      </td>
    )
  }
}
