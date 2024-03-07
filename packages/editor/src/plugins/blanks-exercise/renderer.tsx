import {
  lazy,
  Suspense,
  type ReactNode,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { v4 as uuid_v4 } from 'uuid'

import type { BlankId, DraggableId, BlanksExerciseMode } from '.'
import { BlankCheckButton } from './components/blank-check-button'
import { BlankDraggableAnswer } from './components/blank-draggable-answer'
import { BlankDraggableArea } from './components/blank-draggable-area'
import { BlanksContext } from './context/blank-context'
import { Blank, type BlankType } from './types'
import { cn } from '@/helper/cn'

const DndWrapper = lazy(() =>
  import('@editor/core/components/dnd-wrapper').then((module) => ({
    default: module.DndWrapper,
  }))
)

type MathjsImport = typeof import('mathjs')

export interface BlanksExerciseRendererProps {
  childPlugin: ReactNode
  childPluginState: {
    plugin: string
    state?: unknown
    id?: string | undefined
  }
  mode: BlanksExerciseMode
  initialTextInBlank: 'empty' | 'correct-answer'
  extraDraggableAnswers?: Array<{ answer: string }>
  isEditing?: boolean
  onEvaluate?: (correct: boolean) => void
}

export function BlanksExerciseRenderer(props: BlanksExerciseRendererProps) {
  const {
    childPlugin,
    childPluginState,
    mode,
    extraDraggableAnswers,
    initialTextInBlank,
    isEditing,
    onEvaluate,
  } = props

  const [isFeedbackVisible, setIsFeedbackVisible] = useState<boolean>(false)

  // Maps blankId to the learner feedback after clicking solution check button
  // isCorrect === undefined -> no feedback
  const [feedbackForBlanks, setFeedbackForBlanks] = useState(
    new Map<BlankId, { isCorrect?: boolean }>()
  )

  // Array of blank elements extracted from text editor state
  const blanks: BlankType[] = useMemo(() => {
    return getBlanksWithinObject(childPluginState)
  }, [childPluginState])

  // Maps blankId to the text entered by the user. Modified when user types into a blank and causes rerender.
  const [textUserTypedIntoBlanks, setTextUserTypedIntoBlanks] = useState(
    new Map<BlankId, { text: string }>()
  )

  const [mathjs, setMathjs] = useState<MathjsImport | null>(null)
  useEffect(() => void import('mathjs').then((math) => setMathjs(math)), [])

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
      text: correctAnswers[0]?.answer,
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

  // Clear the blanks state when the type of the child plugin changes
  useEffect(() => {
    setTextUserTypedIntoBlanks(new Map<BlankId, { text: string }>())
    setLocationOfDraggables(new Map<DraggableId, BlankId>())
    setFeedbackForBlanks(new Map<BlankId, { isCorrect: boolean | undefined }>())
    setIsFeedbackVisible(false)
  }, [childPluginState.plugin])

  // replace with 'use client' directive once it leaves Canary, see
  // https://react.dev/reference/react/use-client
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Render nothing until the component is mounted client-side
    return null
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DndWrapper>
        <div
          className={cn(
            'mx-side mb-block',
            // Increase Slate line height in the editor
            '[&>div>div>div[data-slate-node="element"]]:leading-[30px]',
            // Increase Slate line height in the renderer
            '[&>p]:leading-[30px]'
          )}
        >
          <BlanksContext.Provider
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
            {childPlugin}
          </BlanksContext.Provider>

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
    </Suspense>
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
