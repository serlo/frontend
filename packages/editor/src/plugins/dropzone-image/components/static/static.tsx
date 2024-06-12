import { DndWrapper } from '@editor/core/components/dnd-wrapper'
import { DraggableArea } from '@editor/editor-ui/exercises/draggable-area'
import type {
  EditorDropzoneImageDocument,
  EditorImageDocument,
} from '@editor/types/editor-plugins'
import { useMemo, useState } from 'react'

import { BlankDropZone } from './blank-drop-zone'
import type {
  DraggableAnswerType,
  DropzoneVisibility,
  PossibleAnswerType,
} from '../../types'
import {
  getAnswerZoneImageSrc,
  getAnswerZoneText,
} from '../../utils/answer-zone'
import {
  DraggableAnswer,
  draggableAnswerDragType,
} from '../shared/draggable-answer'
import { useInstanceData } from '@/contexts/instance-context'
import { cn } from '@/helper/cn'

export function DropzoneImageStaticRenderer(
  props: EditorDropzoneImageDocument
) {
  const { state } = props
  const {
    answerZones,
    backgroundImage,
    canvasDimensions,
    extraDraggableAnswers,
    dropzoneVisibility,
  } = state

  const exercisesStrings = useInstanceData().strings.content.exercises

  const bgImagePluginState = backgroundImage as EditorImageDocument
  const backgroundImageUrlFromPlugin = (bgImagePluginState?.state?.src ||
    '') as string

  const convertAnswers = (
    answers: EditorDropzoneImageDocument['state']['extraDraggableAnswers']
  ) => {
    return answers.map((answer) => {
      const answerImageUrl = getAnswerZoneImageSrc(answer.image.id || '')
      const answerText = getAnswerZoneText(answer.text.id || '')

      return {
        id: answer.id,
        text: answerText,
        imageUrl: answerImageUrl,
      }
    })
  }

  const correctAnswers = answerZones
    .map((zone) => {
      const answersForZone = convertAnswers(zone.answers)
      return answersForZone
    })
    .flat()

  const wrongAnswers = convertAnswers(extraDraggableAnswers)

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

  const [isCorrectAnswerMap, setIsCorrectAnswerMap] = useState(
    new Map<string, Map<string, boolean | null> | null>()
  )

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
        setIsCorrectAnswerMap((prev) => new Map(prev.set(answerId, null)))
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
    answerZones.forEach((answerZone) => {
      const expectedAnswerIds = answerZone.answers.map((a) => a.id)
      const droppedAnswerIds = dropzoneAnswerMap.get(answerZone.id) || []
      if (droppedAnswerIds.length === 0)
        return setIsAnswerZoneCorrectMap(
          (prev) => new Map(prev.set(answerZone.id, false))
        )
      const isAnswerCorrect =
        expectedAnswerIds.every((id) => droppedAnswerIds.includes(id)) &&
        expectedAnswerIds.length === droppedAnswerIds.length

      const correctAnswerMap = new Map<string, boolean | null>()
      droppedAnswerIds.forEach((id) => {
        correctAnswerMap.set(id, expectedAnswerIds.includes(id))
      })
      setIsCorrectAnswerMap(
        (prev) => new Map(prev.set(answerZone.id, correctAnswerMap))
      )
      setIsAnswerZoneCorrectMap(
        (prev) => new Map(prev.set(answerZone.id, isAnswerCorrect))
      )
    })
  }

  const isSmallScreen = () => window.innerWidth < 1024
  const scaler = isSmallScreen() ? 0.4 : 1

  return (
    <div className="mx-side">
      <DndWrapper>
        {/* TODO: Extract this into a StaticCanvas component */}
        <div
          className={cn(`
            relative mx-auto h-[786px] w-[786px] overflow-hidden rounded-lg
            border border-brand-500 bg-cover bg-center bg-no-repeat
          `)}
          style={{
            backgroundImage: `url(${backgroundImageUrlFromPlugin})`,
            height: `${canvasDimensions.height * scaler}px`,
            width: `${canvasDimensions.width * scaler}px`,
          }}
        >
          {answerZones.map((answerZone) => {
            const { answers, id, ...rest } = answerZone
            const dropZone = { ...rest, id }
            return (
              <BlankDropZone
                key={id}
                dropZone={dropZone}
                droppedAnswersIds={dropzoneAnswerMap.get(id) || []}
                isCorrect={isAnswerZoneCorrectMap.get(id)}
                isCorrectAnswerMap={isCorrectAnswerMap.get(id)}
                visibility={dropzoneVisibility as DropzoneVisibility}
                answersCount={answers.length}
                onAnswerDrop={onAnswerDrop}
              />
            )
          })}
        </div>

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

        {isCheckAnswersButtonVisible ? (
          <button
            className="serlo-button-blue mr-3 h-8"
            onClick={checkAnswers}
            data-qa="plugin-exercise-check-answer-button"
          >
            {exercisesStrings.check}
          </button>
        ) : null}
      </DndWrapper>
    </div>
  )
}
