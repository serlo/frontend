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

  // dropzone id to true/false
  const [isAnswerZoneCorrectMap, setIsAnswerZoneCorrectMap] = useState(
    new Map<string, boolean | null>()
  )

  const [isCorrectAnswerMap, setIsCorrectAnswerMap] = useState(
    new Map<string, Map<string, boolean | null> | null>()
  )

  const onAnswerDrop = (
    answerId: string,
    dropzoneId: string,
    droppableBlankId?: string
  ) => {
    setDropzoneAnswerMap((prev) => {
      const updatedMap = new Map(prev)
      const existingAnswers = updatedMap.get(dropzoneId) || []
      updatedMap.set(dropzoneId, [...existingAnswers, answerId])
      if (droppableBlankId) {
        const existingAnswersFromOrigin = updatedMap.get(droppableBlankId) || []
        updatedMap.set(
          droppableBlankId,
          existingAnswersFromOrigin.filter((id) => id !== answerId)
        )
        setIsAnswerZoneCorrectMap(
          (prev) => new Map(prev.set(droppableBlankId, null))
        )
        setIsCorrectAnswerMap((prev) => new Map(prev.set(answerId, null)))
      }
      return updatedMap
    })
    setIsAnswerZoneCorrectMap((prev) => new Map(prev.set(dropzoneId, null)))
  }

  const onDraggableAreaAnswerDrop = (answer: DraggableAnswerType) => {
    let zoneToReset: string = ''

    setDropzoneAnswerMap((prev) => {
      const updatedMap = new Map(prev)
      updatedMap.forEach((value, key) => {
        if (value.includes(answer.id)) {
          zoneToReset = key
          updatedMap.set(
            key,
            value.filter((id) => id !== answer.id)
          )
        }
      })
      return updatedMap
    })

    if (zoneToReset.length > 0) {
      setIsAnswerZoneCorrectMap((prev) => {
        const updatedMap = new Map(prev)
        updatedMap.delete(zoneToReset)
        return updatedMap
      })
    }
  }

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

  return (
    <div className="mx-side">
      <DndWrapper>
        <div
          className={cn(`
            relative mx-auto h-[786px] w-[786px] overflow-hidden rounded-lg
            border border-brand-500 bg-cover bg-center bg-no-repeat
          `)}
          style={{
            backgroundImage: `url(${backgroundImageUrlFromPlugin})`,
            height: `${canvasDimensions.height}px`,
            width: `${canvasDimensions.width}px`,
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
                isBackgroundTypeImage={!!backgroundImageUrlFromPlugin}
                isCorrect={isAnswerZoneCorrectMap.get(id)}
                isCorrectAnswerMap={isCorrectAnswerMap.get(id)}
                visibility={dropzoneVisibility as DropzoneVisibility}
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
              <DraggableAnswer
                draggableId={possibleAnswer.id}
                key={index}
                imageUrl={possibleAnswer.imageUrl}
                text={possibleAnswer.text}
              />
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
