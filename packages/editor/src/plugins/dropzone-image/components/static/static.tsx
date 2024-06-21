import { DndWrapper } from '@editor/core/components/dnd-wrapper'
import { DraggableArea } from '@editor/editor-ui/exercises/draggable-area'
import type { EditorDropzoneImageDocument } from '@editor/types/editor-plugins'
import { useEffect, useMemo, useState } from 'react'

import { FeedbackButton } from './feedback-button'
import { StaticCanvas } from './static-canvas'
import {
  FeedbackData,
  type PossibleAnswerType,
  type DraggableAnswerType,
} from '../../types'
import { convertStaticAnswers } from '../../utils/answer-zone'
import { DraggableAnswer } from '../shared/draggable-answer'
import { shuffleArray } from '@/helper/shuffle-array'

export function DropzoneImageStaticRenderer(
  props: EditorDropzoneImageDocument
) {
  const { state } = props
  const { answerZones, extraDraggableAnswers } = state

  const draggableAnswerDragType = 'draggableAnswer' + props.id

  const allAnswers = useMemo(() => {
    const correctAnswers = answerZones
      .map(({ answers }) => convertStaticAnswers(answers))
      .flat()
    const wrongAnswers = convertStaticAnswers(extraDraggableAnswers)
    return [...correctAnswers, ...wrongAnswers]
  }, [answerZones, extraDraggableAnswers])

  const [shuffledAnswers, setShuffledAnswers] = useState(allAnswers)
  const [dropzoneAnswerMap, setDropzoneAnswerMap] = useState(
    new Map<string, PossibleAnswerType[]>()
  )
  const [isZoneCorrectMap, setIsZoneCorrectMap] = useState(
    new Map<string, boolean | null>()
  )
  const [isAnswerCorrectMap, setIsAnswerCorrectMap] = useState(
    new Map<string, Map<string, boolean | null> | null>()
  )
  const [feedback, setFeedback] = useState<FeedbackData>(FeedbackData.Unset)

  useEffect(() => {
    setShuffledAnswers(shuffleArray(allAnswers))
  }, [allAnswers])

  // Filter out answers that are already in an answer zone
  const possibleAnswers = useMemo(() => {
    const droppedAnswers = Array.from(dropzoneAnswerMap.values()).flat()
    return shuffledAnswers.filter(({ id }) => {
      return !droppedAnswers.some((droppedAnswer) => droppedAnswer.id === id)
    })
  }, [shuffledAnswers, dropzoneAnswerMap])

  const handleAnswerDrop = (
    answer: DraggableAnswerType,
    dropzoneId: string,
    originDropzoneId?: string
  ) => {
    setDropzoneAnswerMap((prev) => {
      const updatedMap = new Map(prev)
      const existingAnswers = updatedMap.get(dropzoneId) || []

      // Add the dropped answer to the target zone.
      updatedMap.set(dropzoneId, [...existingAnswers, answer])

      // If the answer was dragged from another zone,
      // remove it from there and reset its correct/incorrect state.
      if (originDropzoneId) {
        const existingAnswersFromOrigin = updatedMap.get(originDropzoneId) || []
        updatedMap.set(
          originDropzoneId,
          existingAnswersFromOrigin.filter(({ id }) => id !== answer.id)
        )
        setIsAnswerCorrectMap((prev) => new Map(prev.set(answer.id, null)))
      }

      // Reset the correct/incorrect state of origin and target zones.
      setIsZoneCorrectMap((prev) => {
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

    setFeedback(FeedbackData.Unset)
  }

  const handleDraggableAreaDrop = (droppedAnswer: DraggableAnswerType) => {
    const originDropzoneId = droppedAnswer.originDropzoneId || ''

    setDropzoneAnswerMap((prev) => {
      const updatedMap = new Map(prev)
      const originAnswerZoneAnswers = updatedMap.get(originDropzoneId)

      // Remove the dropped answer from its origin zone.
      // This automatically places the answer in the draggable area.
      if (originAnswerZoneAnswers?.find(({ id }) => id === droppedAnswer.id)) {
        updatedMap.set(
          originDropzoneId,
          originAnswerZoneAnswers.filter(({ id }) => id !== droppedAnswer.id)
        )
      }

      // Reset the correct/incorrect state of the origin zone.
      setIsZoneCorrectMap((prev) => {
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

    setFeedback(FeedbackData.Unset)
  }

  // Show answer button if none of the zones are empty
  const isCheckAnswersButtonVisible = useMemo(() => {
    return isZoneCorrectMap.size === answerZones.length
  }, [isZoneCorrectMap.size, answerZones.length])

  const checkAnswers = () => {
    let newFeedback = FeedbackData.Unset

    answerZones.forEach((answerZone) => {
      const expectedAnswers = convertStaticAnswers(answerZone.answers)
      const droppedAnswers = dropzoneAnswerMap.get(answerZone.id) || []

      // Compare expected answers with dropped answers,
      // and mark each dropped answer as correct or incorrect accordingly
      const updatedIsAnswerCorrectMap = new Map<string, boolean | null>()
      const correctAnswers = droppedAnswers.filter((droppedAnswer) => {
        const isAnswerCorrect = expectedAnswers.some((expectedAnswer) => {
          // If the IDs match, the answer is correct
          if (expectedAnswer.id === droppedAnswer.id) return true
          // If the image URL is empty, it means the answer is a text answer,
          // so compare the text values.
          if (expectedAnswer.imageUrl === '' || droppedAnswer.imageUrl === '')
            return expectedAnswer.text === droppedAnswer.text
          // Otherwise, the answer is an image answer, so compare the image URLs.
          return expectedAnswer.imageUrl === droppedAnswer.imageUrl
        })
        updatedIsAnswerCorrectMap.set(droppedAnswer.id, isAnswerCorrect)
        return isAnswerCorrect
      })
      setIsAnswerCorrectMap(
        (prev) => new Map(prev.set(answerZone.id, updatedIsAnswerCorrectMap))
      )

      // If there is an equal amount of expected, dropped and correct answers,
      // the answer zone is correct.
      const isZoneCorrect =
        expectedAnswers.length === droppedAnswers.length &&
        correctAnswers.length === expectedAnswers.length
      setIsZoneCorrectMap(
        (prev) => new Map(prev.set(answerZone.id, isZoneCorrect))
      )

      // If an answer zone doesn't have enough dropped answers,
      // show a feedback message accordingly
      if (expectedAnswers.length > droppedAnswers.length) {
        newFeedback = FeedbackData.MissedSome
        setFeedback(newFeedback)
      }

      // If an answer zone has wrong answers,
      // show a feedback message accordingly
      if (
        !isZoneCorrect &&
        (newFeedback === FeedbackData.Unset ||
          newFeedback === FeedbackData.Correct)
      ) {
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
          isZoneCorrectMap={isZoneCorrectMap}
          isAnswerCorrectMap={isAnswerCorrectMap}
          draggableAnswerDragType={draggableAnswerDragType}
          onAnswerDrop={handleAnswerDrop}
        />

        <DraggableArea
          accept={draggableAnswerDragType}
          onDrop={handleDraggableAreaDrop}
        >
          {possibleAnswers.map((possibleAnswer, index) => (
            <DraggableAnswer
              key={index}
              answer={possibleAnswer}
              type={draggableAnswerDragType}
            />
          ))}
        </DraggableArea>

        <FeedbackButton
          feedback={feedback}
          isButtonVisible={isCheckAnswersButtonVisible}
          onClick={checkAnswers}
        />
      </DndWrapper>
    </div>
  )
}
