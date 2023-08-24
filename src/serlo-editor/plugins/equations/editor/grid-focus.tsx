import { useState } from 'react'

import { TransformationTarget } from './editor-renderer'
import { StepSegment } from './step-segment'

type GridFocusState =
  | {
      row: number
      column: number
    }
  | 'firstExplanation'

export interface GridFocus {
  focus: GridFocusState | null
  isFocused: (cell: GridFocusState) => boolean
  setFocus: (cell: GridFocusState) => void
  moveRight: () => void
  moveLeft: () => void
}

// TODO: can't move out of plugin with tab, it just creates a new line every time

export function useGridFocus({
  rows,
  columns,
  transformationTarget,
}: {
  rows: number
  columns: number
  transformationTarget: TransformationTarget
}): GridFocus {
  const [focus, setFocusState] = useState<GridFocusState | null>(null)
  const setFocus = (state: GridFocusState) => {
    setFocusState(state)
  }
  const isFocused = (state: GridFocusState) => {
    if (focus === null) return false
    if (focus === 'firstExplanation') return state === focus

    return (
      state !== 'firstExplanation' &&
      focus.row === state.row &&
      focus.column === state.column
    )
  }

  return {
    focus,
    isFocused,
    setFocus(state) {
      if (!isFocused(state)) setFocus(state)
    },
    moveRight() {
      if (focus === null) return
      if (focus === 'firstExplanation') {
        setFocus({ row: 0, column: firstColumn(transformationTarget) })
        return
      }

      if (
        focus.row === rows - 1 &&
        focus.column === lastColumn(transformationTarget)
      ) {
        // do nothing for now
      } else if (transformationTarget === TransformationTarget.Term) {
        if (focus.column === StepSegment.Right) {
          setFocus({ row: focus.row, column: StepSegment.Explanation })
        } else {
          setFocus({
            row: focus.row + 1,
            column: firstColumn(transformationTarget),
          })
        }
      } else if (focus.column === columns - 1) {
        setFocus({ row: focus.row + 1, column: StepSegment.Left })
      } else {
        setFocus({ row: focus.row, column: focus.column + 1 })
      }
    },
    moveLeft() {
      if (focus === null) return
      if (focus === 'firstExplanation') return

      if (transformationTarget === TransformationTarget.Term) {
        if (focus.row === 0 && focus.column === StepSegment.Right) {
          // do nothing for now
        } else if (focus.column === StepSegment.Right) {
          setFocus({ row: focus.row - 1, column: StepSegment.Explanation })
        } else {
          setFocus({ row: focus.row, column: StepSegment.Right })
        }
      } else {
        if (focus.column === 0) {
          if (focus.row === 0) {
            setFocus('firstExplanation')
          } else {
            setFocus({ row: focus.row - 1, column: columns - 1 })
          }
        } else {
          setFocus({ row: focus.row, column: focus.column - 1 })
        }
      }
    },
  }
}

function firstColumn(transformationTarget: TransformationTarget) {
  return transformationTarget === TransformationTarget.Term
    ? StepSegment.Right
    : StepSegment.Left
}

function lastColumn(transformationTarget: TransformationTarget) {
  return transformationTarget === TransformationTarget.Term
    ? StepSegment.Right
    : StepSegment.Transform
}
