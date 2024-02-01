import { DndWrapper } from '@editor/core/components/dnd-wrapper'
import type A from 'algebra.js'
import {
  type ReactNode,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { v4 as uuid_v4 } from 'uuid'

import type { BlankId, DraggableId, FillInTheBlanksMode } from '.'
import { BlankCheckButton } from './components/blank-check-button'
import { BlankDraggableAnswer } from './components/blank-draggable-answer'
import { BlankDraggableArea } from './components/blank-draggable-area'
import { FillInTheBlanksContext } from './context/blank-context'
import { Blank, type BlankType } from './types'

type AlgebraJSImport = typeof import('algebra.js')

interface FillInTheBlanksRendererProps {
  text: ReactNode
  textPluginState: {
    plugin: string
    state?: unknown
    id?: string | undefined
  }
  mode: FillInTheBlanksMode
  initialTextInBlank: 'empty' | 'correct-answer'
  extraDraggableAnswers?: Array<{ answer: string }>
  isEditing?: boolean
}

export function FillInTheBlanksRenderer(props: FillInTheBlanksRendererProps) {
  const {
    text,
    textPluginState,
    mode,
    extraDraggableAnswers,
    initialTextInBlank,
    isEditing,
  } = props

  const [isFeedbackVisible, setIsFeedbackVisible] = useState<boolean>(false)

  // Maps blankId to the learner feedback after clicking solution check button
  // isCorrect === undefined -> no feedback
  const [feedbackForBlanks, setFeedbackForBlanks] = useState(
    new Map<BlankId, { isCorrect?: boolean }>()
  )

  const [AlgebraJs, setAlgebraJs] = useState<AlgebraJSImport | null>(null)
  useEffect(() => void import('algebra.js').then((A) => setAlgebraJs(A)), [])

  // Array of blank elements extracted from text editor state
  const blanks: BlankType[] = useMemo(() => {
    return getBlanksWithinObject(textPluginState)
  }, [textPluginState])

  // Maps blankId to the text entered by the user. Modified when user types into a blank and causes rerender.
  const [textUserTypedIntoBlanks, setTextUserTypedIntoBlanks] = useState(
    new Map<BlankId, { text: string }>()
  )

  /** Maps blankId to the text that should be displayed in the blank.  */
  const textInBlanks = useMemo(() => {
    const newMap = new Map<BlankId, { text: string }>()
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
    new Map<DraggableId, BlankId>()
  )

  const handleDraggableAreaDrop = useCallback(
    (item: { draggableId: DraggableId }) => {
      const newMap = new Map<DraggableId, BlankId>(locationOfDraggables)
      newMap.delete(item.draggableId)
      setLocationOfDraggables(newMap)
      setFeedbackForBlanks(
        new Map<BlankId, { isCorrect: boolean | undefined }>()
      )
      setIsFeedbackVisible(false)
    },
    [locationOfDraggables]
  )

  const shouldShowCheckButton = useMemo(() => {
    if (blanks.length < 1) return false
    if (mode === 'typing') {
      return [...textInBlanks.values()].every(({ text }) => text.length > 0)
    }
    return blanks.length === locationOfDraggables.size
  }, [blanks.length, locationOfDraggables.size, mode, textInBlanks])

  return (
    <DndWrapper>
      <div className="mx-side mb-block leading-[30px] [&>p]:leading-[30px]">
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
          {text}
        </FillInTheBlanksContext.Provider>

        {mode === 'drag-and-drop' ? (
          <BlankDraggableArea onDrop={handleDraggableAreaDrop}>
            {draggables.map((draggable, index) =>
              locationOfDraggables.get(draggable.draggableId) ? null : (
                <BlankDraggableAnswer key={index} {...draggable} />
              )
            )}
          </BlankDraggableArea>
        ) : null}

        {!isEditing ? (
          <BlankCheckButton
            isVisible={shouldShowCheckButton}
            feedback={feedbackForBlanks}
            isFeedbackVisible={isFeedbackVisible}
            onClick={checkAnswers}
          />
        ) : null}

        {/* Only debug output from here on */}
        <div className="hidden">
          Blanks state:
          {blanks.map((blank, index) => (
            <div key={index}>{JSON.stringify(blank)}</div>
          ))}
        </div>
        <div className="hidden">
          <div>State textUserTypedIntoBlank:</div>
          {[...textUserTypedIntoBlanks].map((entry, index) => {
            const blankId = entry[0]
            const text = entry[1].text
            return (
              <div
                className="ml-5"
                key={index}
              >{`Text: ${text} | BlankId: ${blankId}`}</div>
            )
          })}
        </div>
        <div className="hidden">
          {[...locationOfDraggables].map((entry, index) => (
            <div key={index}>
              {`DraggableId: ${entry[0]} in blankId: ${entry[1]}`}
            </div>
          ))}
        </div>
        <div className="hidden">
          {draggables.map((draggable, index) => (
            <div key={index}>
              {`DraggableId: ${draggable.draggableId} with text: ${draggable.text}`}
            </div>
          ))}
        </div>
      </div>
    </DndWrapper>
  )

  function checkAnswers() {
    const newBlankAnswersCorrectList = new Map<
      BlankId,
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
        if (blankState.acceptMathEquivalents === false) return false

        // The `acceptMathEquivalents` setting is on, so first normalize both
        // submission and solution. If either of them are invalid mathematical
        // expressions, the submission is incorrect.
        const solution = normalize(answer)
        const submission = normalize(trimmedBlankText)
        if (!solution || !submission) return false

        // Both submission and solution are valid mathematical expressions.
        // Using algebra.js, subtract the submission from the solution, and
        // if the result of the subtraction is 0, submission and solution are
        // mathematical equivalents, therefore the submission is correct.
        return solution.subtract(submission).toString() === '0'
      })

      newBlankAnswersCorrectList.set(blankState.blankId, { isCorrect })
    })

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
    // algebra.js throws an error if an invalid mathematical expression
    // is passed to its `parse` method. In this case, return `undefined`
    // as the result of the normalization.
    try {
      return AlgebraJs?.parse(normalizeNumber(_value)) as A.Expression
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
