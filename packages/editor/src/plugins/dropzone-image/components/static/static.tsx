import { DndWrapper } from '@editor/core/components/dnd-wrapper'
import { DraggableArea } from '@editor/editor-ui/exercises/draggable-area'
import { ExerciseFeedback } from '@editor/editor-ui/exercises/exercise-feedback'
import type { EditorDropzoneImageDocument } from '@editor/types/editor-plugins'
import { useMemo, useState } from 'react'

import { StaticCanvas } from './static-canvas'
import type { DraggableAnswerType, PossibleAnswerType } from '../../types'
import { convertStaticAnswers } from '../../utils/answer-zone'
import {
  DraggableAnswer,
  draggableAnswerDragType,
} from '../shared/draggable-answer'
import { useInstanceData } from '@/contexts/instance-context'

enum FeedbackData {
  Unset = 'unset',
  Correct = 'correct',
  Wrong = 'wrong',
  MissedSome = 'missedSome',
}

export function DropzoneImageStaticRenderer(
  props: EditorDropzoneImageDocument
) {
  const { state } = props
  const { answerZones, extraDraggableAnswers } = state

  const exercisesStrings = useInstanceData().strings.content.exercises

  const correctAnswers = answerZones
    .map(({ answers }) => convertStaticAnswers(answers))
    .flat()

  const wrongAnswers = convertStaticAnswers(extraDraggableAnswers)

  const possibleAnswers = useMemo(() => {
    return [...correctAnswers, ...wrongAnswers]
      .map((possibleAnswer) => ({ possibleAnswer, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ possibleAnswer }) => possibleAnswer)
    // Prevent re-shuffling on every render - only shuffle when answers change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(correctAnswers), JSON.stringify(wrongAnswers)])

  const [dropzoneAnswerMap, setDropzoneAnswerMap] = useState(
    new Map<string, string[]>()
  )

  const [isAnswerZoneCorrectMap, setIsAnswerZoneCorrectMap] = useState(
    new Map<string, boolean | null>()
  )

  const [isAnswerCorrectMap, setIsAnswerCorrectMap] = useState(
    new Map<string, Map<string, boolean | null> | null>()
  )

  const [feedback, setFeedback] = useState<FeedbackData>(FeedbackData.Unset)

  const onAnswerDrop = (
    answerId: string,
    dropzoneId: string,
    originDropzoneId?: string
  ) => {
    setDropzoneAnswerMap((prev) => {
      const updatedMap = new Map(prev)
      const existingAnswers = updatedMap.get(dropzoneId) || []

      // Add the dropped answer to the target zone.
      updatedMap.set(dropzoneId, [...existingAnswers, answerId])

      // If the answer was dragged from another zone,
      // remove it from there and reset its correct/incorrect state.
      if (originDropzoneId) {
        const existingAnswersFromOrigin = updatedMap.get(originDropzoneId) || []
        updatedMap.set(
          originDropzoneId,
          existingAnswersFromOrigin.filter((id) => id !== answerId)
        )
        setIsAnswerCorrectMap((prev) => new Map(prev.set(answerId, null)))
      }

      // Reset the correct/incorrect state of origin and target zones.
      setIsAnswerZoneCorrectMap((prev) => {
        const updatedIsCorrectMap = new Map(prev)

        // Set the target zone as unchecked.
        updatedIsCorrectMap.set(dropzoneId, null)

        // If the answer was not dragged from another dropzone,
        // return early.
        if (!originDropzoneId) return updatedIsCorrectMap

        // If the origin zone still has answers, set it as unchecked.
        // Otherwise, set it as empty.
        if (updatedMap.get(originDropzoneId)?.length) {
          updatedIsCorrectMap.set(originDropzoneId, null)
        } else {
          updatedIsCorrectMap.delete(originDropzoneId)
        }
        return updatedIsCorrectMap
      })
      return updatedMap
    })
  }

  const onDraggableAreaAnswerDrop = (droppedAnswer: DraggableAnswerType) => {
    const originDropzoneId = droppedAnswer.originDropzoneId || ''

    setDropzoneAnswerMap((prev) => {
      const updatedMap = new Map(prev)
      const originAnswerZoneAnswersIds = updatedMap.get(originDropzoneId)

      // Remove the dropped answer from its origin zone.
      // This automatically places the answer in the draggable area.
      if (originAnswerZoneAnswersIds?.includes(droppedAnswer.id)) {
        updatedMap.set(
          originDropzoneId,
          originAnswerZoneAnswersIds.filter((id) => id !== droppedAnswer.id)
        )
      }

      // Reset the correct/incorrect state of the origin zone.
      setIsAnswerZoneCorrectMap((prev) => {
        const updatedIsCorrectMap = new Map(prev)
        // If the origin zone still has answers, set it as unchecked.
        // Otherwise, set it as empty.
        if (updatedMap.get(originDropzoneId)?.length) {
          updatedIsCorrectMap.set(originDropzoneId, null)
        } else {
          updatedIsCorrectMap.delete(originDropzoneId)
        }
        return updatedIsCorrectMap
      })

      return updatedMap
    })
  }

  // Show answer button if none of the zones are empty
  const isCheckAnswersButtonVisible = useMemo(() => {
    return isAnswerZoneCorrectMap.size === answerZones.length
  }, [isAnswerZoneCorrectMap.size, answerZones.length])

  const checkAnswers = () => {
    let newFeedback = FeedbackData.Unset

    answerZones.forEach((answerZone) => {
      const expectedAnswerIds = answerZone.answers.map(({ id }) => id)
      const droppedAnswerIds = dropzoneAnswerMap.get(answerZone.id) || []

      // Check if the answer zone has only and all expected answers,
      // and mark the answer zone as correct or incorrect accordingly
      const isAnswerZoneCorrect =
        expectedAnswerIds.every((id) => droppedAnswerIds.includes(id)) &&
        expectedAnswerIds.length === droppedAnswerIds.length
      setIsAnswerZoneCorrectMap(
        (prev) => new Map(prev.set(answerZone.id, isAnswerZoneCorrect))
      )

      // Compare expected answers with dropped answers,
      // and mark each dropped answer as correct or incorrect accordingly
      const correctAnswerMap = new Map<string, boolean | null>()
      droppedAnswerIds.forEach((id) => {
        correctAnswerMap.set(id, expectedAnswerIds.includes(id))
      })
      setIsAnswerCorrectMap(
        (prev) => new Map(prev.set(answerZone.id, correctAnswerMap))
      )

      // If an answer zone doesn't have enough dropped answers,
      // show a feedback message accordingly
      if (expectedAnswerIds.length > droppedAnswerIds.length) {
        newFeedback = FeedbackData.MissedSome
        setFeedback(newFeedback)
      }

      // If an answer zone has wrong answers,
      // show a feedback message accordingly
      if (!isAnswerZoneCorrect && newFeedback === FeedbackData.Unset) {
        newFeedback = FeedbackData.Wrong
        setFeedback(newFeedback)
      }

      // If an answer zone is correct,
      // show a feedback message accordingly
      if (newFeedback === FeedbackData.Unset) {
        newFeedback = FeedbackData.Correct
        setFeedback(newFeedback)
      }
    })
  }

  return (
    <div className="mx-side">
      <DndWrapper>
        <StaticCanvas
          state={state}
          dropzoneAnswerMap={dropzoneAnswerMap}
          isAnswerZoneCorrectMap={isAnswerZoneCorrectMap}
          isAnswerCorrectMap={isAnswerCorrectMap}
          onAnswerDrop={onAnswerDrop}
        />

        <DraggableArea
          accept={draggableAnswerDragType}
          onDrop={onDraggableAreaAnswerDrop}
        >
          {possibleAnswers
            .filter(
              (possibleAnswer: PossibleAnswerType) =>
                !Array.from(dropzoneAnswerMap)
                  .reduce((acc: string[], curr) => acc.concat(curr[1]), [])
                  .includes(possibleAnswer.id)
            )
            .map((possibleAnswer: PossibleAnswerType, index) => (
              <DraggableAnswer answer={possibleAnswer} key={index} />
            ))}
        </DraggableArea>

        <div className="flex">
          {isCheckAnswersButtonVisible ? (
            <button
              className="serlo-button-blue mr-3 h-8"
              onClick={checkAnswers}
              data-qa="plugin-exercise-check-answer-button"
            >
              {exercisesStrings.check}
            </button>
          ) : null}
          {feedback !== FeedbackData.Unset ? (
            <ExerciseFeedback
              correct={feedback === FeedbackData.Correct}
              missedSome={feedback === FeedbackData.MissedSome}
            />
          ) : null}
        </div>
      </DndWrapper>
    </div>
  )
}
