import { cn } from '@serlo/frontend/src/helper/cn'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { v4 as uuid_v4 } from 'uuid'

import { type BlanksMode, TableType, Blank, type BlankType } from './types'
import { BlankCheckButton } from '../fill-in-the-blanks-exercise/components/blank-check-button'
import { FillInTheBlanksContext } from '../fill-in-the-blanks-exercise/context/blank-context'

type MathjsImport = typeof import('mathjs')

interface BlanksTableRow {
  cells: JSX.Element[]
}

export interface BlanksTableRendererProps {
  tableType: TableType
  rows: BlanksTableRow[]
  tableState: Array<object>
  mode: BlanksMode
  initialTextInBlank: 'empty' | 'correct-answer'
  extraDraggableAnswers?: Array<{ answer: string }>
  isEditing?: boolean
  onEvaluate?: (correct: boolean) => void
}

export function BlanksTableRenderer(props: BlanksTableRendererProps) {
  const {
    tableType,
    rows,
    tableState,
    mode,
    initialTextInBlank,
    extraDraggableAnswers,
    isEditing,
    onEvaluate,
  } = props

  const showRowHeader =
    tableType === TableType.OnlyRowHeader ||
    tableType === TableType.ColumnAndRowHeader
  const showColumnHeader =
    tableType === TableType.OnlyColumnHeader ||
    tableType === TableType.ColumnAndRowHeader

  const [isFeedbackVisible, setIsFeedbackVisible] = useState<boolean>(false)

  // Maps blankId to the learner feedback after clicking solution check button
  // isCorrect === undefined -> no feedback
  const [feedbackForBlanks, setFeedbackForBlanks] = useState(
    new Map<string, { isCorrect?: boolean }>()
  )

  // Array of blank elements extracted from text editor state
  const blanks: BlankType[] = useMemo(() => {
    return getBlanksWithinObject(tableState)
  }, [tableState])

  // Maps blankId to the text entered by the user. Modified when user types into a blank and causes rerender.
  const [textUserTypedIntoBlanks, setTextUserTypedIntoBlanks] = useState(
    new Map<string, { text: string }>()
  )

  const [mathjs, setMathjs] = useState<MathjsImport | null>(null)
  useEffect(() => void import('mathjs').then((math) => setMathjs(math)), [])

  /** Maps blankId to the text that should be displayed in the blank.  */
  const textInBlanks = useMemo(() => {
    const newMap = new Map<string, { text: string }>()
    blanks.forEach((blankState) => {
      const firstCorrectAnswer = blankState.correctAnswers.at(0)?.answer ?? ''
      newMap.set(blankState.blankId, {
        text: initialTextInBlank === 'correct-answer' ? firstCorrectAnswer : '',
      })
    })
    textUserTypedIntoBlanks.forEach((textUserTypedIntoBlank, blankId) =>
      newMap.set(blankId, { text: textUserTypedIntoBlank.text })
    )
    return newMap
  }, [blanks, textUserTypedIntoBlanks, initialTextInBlank])

  const draggables = useMemo(() => {
    const sorted = blanks.map(({ blankId, correctAnswers }) => ({
      draggableId: `solution-${blankId}`,
      text: correctAnswers[0].answer,
    }))
    if (isEditing) return sorted

    const extraIncorrectAnswers =
      extraDraggableAnswers?.map(({ answer }) => ({
        draggableId: uuid_v4(),
        text: answer,
      })) ?? []
    const withExtraIncorrectAnswers = [...sorted, ...extraIncorrectAnswers]
    const shuffled = withExtraIncorrectAnswers
      .map((draggable) => ({ draggable, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ draggable }) => draggable)
    return shuffled
  }, [extraDraggableAnswers, blanks, isEditing])

  // Maps DraggableId to the BlankId where this draggable element is currently located
  const [locationOfDraggables, setLocationOfDraggables] = useState(
    new Map<string, string>()
  )

  const shouldShowCheckButton = useMemo(() => {
    if (blanks.length < 1) return false
    if (mode === 'typing') {
      return [...textInBlanks.values()].every(({ text }) => text.length > 0)
    }
    return blanks.length === locationOfDraggables.size
  }, [blanks.length, locationOfDraggables.size, mode, textInBlanks])

  return (
    <FillInTheBlanksContext.Provider
      value={{
        mode,
        feedbackForBlanks: {
          value: feedbackForBlanks,
          set: setFeedbackForBlanks,
        },
        textInBlanks,
        textUserTypedIntoBlanks: {
          value: textUserTypedIntoBlanks,
          set: setTextUserTypedIntoBlanks,
        },
        draggables,
        locationOfDraggables: {
          value: locationOfDraggables,
          set: setLocationOfDraggables,
        },
        isFeedbackVisible: {
          value: isFeedbackVisible,
          set: setIsFeedbackVisible,
        },
      }}
    >
      <table className="serlo-table mb-8">
        {showColumnHeader ? (
          <>
            <thead>{renderRows([rows[0]])}</thead>
            <tbody>{renderRows(rows.slice(1), 1)}</tbody>
          </>
        ) : (
          <tbody>{renderRows(rows)}</tbody>
        )}
      </table>

      {/* {mode === 'drag-and-drop' ? (
        <BlankDraggableArea onDrop={handleDraggableAreaDrop}>
          {draggables.map((draggable, index) =>
            locationOfDraggables.get(draggable.draggableId) ? null : (
              <BlankDraggableAnswer key={index} {...draggable} />
            )
          )}
        </BlankDraggableArea>
      ) : null} */}

      {!isEditing ? (
        <BlankCheckButton
          isVisible={shouldShowCheckButton}
          feedback={feedbackForBlanks}
          isFeedbackVisible={isFeedbackVisible}
          onClick={checkAnswers}
        />
      ) : null}
    </FillInTheBlanksContext.Provider>
  )

  function renderRows(rows: BlanksTableRow[], startIndex = 0) {
    return rows.map((row, rowIndex) => {
      return (
        <tr key={startIndex + rowIndex}>
          {row.cells.map((cell, colIndex) =>
            renderCell(cell, startIndex + rowIndex, colIndex)
          )}
        </tr>
      )
    })
  }

  function renderCell(cell: JSX.Element, rowIndex: number, colIndex: number) {
    const firstRow = rowIndex === 0
    const lastRow = rowIndex === rows.length - 1
    const isColHead = showColumnHeader && firstRow
    const isRowHead = showRowHeader && colIndex === 0
    const isHead = isRowHead || isColHead
    const scope = isColHead ? 'col' : 'row'

    const borderClass = cn(
      'first:border-l-3',
      firstRow && 'border-t-3 first:rounded-tl-xl last:rounded-tr-xl',
      lastRow && 'first:rounded-bl-xl last:rounded-br-xl'
    )

    return (
      <Fragment key={colIndex}>
        {isHead ? (
          <th
            scope={scope}
            className={cn('serlo-th px-0 align-top', borderClass)}
          >
            {cell}
          </th>
        ) : (
          <td className={cn('serlo-td px-0', borderClass)}>{cell}</td>
        )}
      </Fragment>
    )
  }

  function checkAnswers() {
    const newBlankAnswersCorrectList = new Map<
      string,
      { isCorrect: boolean | undefined }
    >()

    blanks.forEach((blankState) => {
      const trimmedBlankText = getTrimmedBlankText(blankState.blankId)

      // Go through all solutions and evaluate the submission against them
      const isCorrect = blankState.correctAnswers.some(({ answer }) => {
        // The submission is identical to the solution, so it's correct
        // regardless of the `acceptMathEquivalents` setting.
        if (answer === trimmedBlankText) return true

        // The submission is NOT identical to the solution, AND
        // `acceptMathEquivalents` is off, so the submission is incorrect.
        // (if acceptMathEquivalents is `undefined` we default to `true`)
        if (blankState.acceptMathEquivalents === false) return false

        // The `acceptMathEquivalents` setting is on, so first normalize both
        // submission and solution. If either of them are invalid mathematical
        // expressions, the submission is incorrect.
        const solution = normalize(answer)
        const submission = normalize(trimmedBlankText)
        if (!solution || !submission) return false

        // Both submission and solution are valid mathematical expressions.
        // Subtract the submission from the solution. If the result is 0,
        // submission and solution are mathematical equivalents.
        return solution - submission === 0
      })

      newBlankAnswersCorrectList.set(blankState.blankId, { isCorrect })
    })

    if (onEvaluate) {
      onEvaluate(
        [...newBlankAnswersCorrectList].every((entry) => entry[1].isCorrect)
      )
    }

    setFeedbackForBlanks(newBlankAnswersCorrectList)
    setIsFeedbackVisible(true)
  }

  function getTrimmedBlankText(blankId: string) {
    if (mode === 'typing') return textInBlanks.get(blankId)?.text.trim() ?? ''

    const draggableLocationInThisBlank = [...locationOfDraggables].find(
      ([, draggableBlankId]) => blankId === draggableBlankId
    )
    const draggableInThisBlank = draggables.find(
      ({ draggableId }) => draggableId === draggableLocationInThisBlank?.[0]
    )

    return draggableInThisBlank?.text.trim() ?? ''
  }

  function normalize(value: string) {
    const _value = collapseWhitespace(value)
    // mathjs throws when certain symbols are passed to its `evaluate` method.
    // In this case, return `undefined` as the result of the normalization.
    try {
      return mathjs?.evaluate(normalizeNumber(_value)) as number
    } catch {
      return undefined
    }
  }

  function collapseWhitespace(val: string): string {
    return val.replace(/[\s\xa0]+/g, ' ').trim()
  }

  function normalizeNumber(val: string) {
    return val.replace(/,/g, '.').replace(/^[+]/, '')
  }
}

/** Searches for blank objects in text plugin state. They can be at varying depths. */
function getBlanksWithinObject(obj: object): BlankType[] {
  if (Blank.is(obj)) return [obj]

  // Recursively search this object's values for blank objects
  return Object.values(obj).reduce((blanks: BlankType[], value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      return [...blanks, ...getBlanksWithinObject(value)]
    }
    return blanks
  }, [])
}
