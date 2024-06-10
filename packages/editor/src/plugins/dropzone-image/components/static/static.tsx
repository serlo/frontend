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

export function DropzoneImageStaticRenderer({
  state,
}: EditorDropzoneImageDocument) {
  const {
    answerZones,
    backgroundImage,
    extraDraggableAnswers,
    dropzoneVisibility,
  } = state

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
  const [isCorrectMap, setIsCorrectMap] = useState(
    new Map<string, boolean | null>()
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
      }
      return updatedMap
    })
    setIsCorrectMap((prev) => new Map(prev.set(dropzoneId, null)))
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
      setIsCorrectMap((prev) => new Map(prev.set(zoneToReset, null)))
    }
  }

  const checkAnswers = () => {
    answerZones.forEach((answerZone) => {
      const expectedAnswerIds = answerZone.answers.map((a) => a.id)
      const droppedAnswerIds = dropzoneAnswerMap.get(answerZone.id) || []
      if (droppedAnswerIds.length === 0)
        return setIsCorrectMap(
          (prev) => new Map(prev.set(answerZone.id, false))
        )
      const isAnswerCorrect =
        expectedAnswerIds.every((id) => droppedAnswerIds.includes(id)) &&
        expectedAnswerIds.length === droppedAnswerIds.length
      setIsCorrectMap(
        (prev) => new Map(prev.set(answerZone.id, isAnswerCorrect))
      )
    })
  }

  return (
    <DndWrapper>
      <div
        className="relative mx-auto h-[786px] w-[786px] overflow-hidden rounded-lg border border-brand-500 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrlFromPlugin})`,
        }}
      >
        {answerZones.map((answerZone) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { answers, id, ...rest } = answerZone
          const dropZone = { ...rest, id: id }
          return (
            <BlankDropZone
              key={id}
              visibility={dropzoneVisibility as DropzoneVisibility}
              accept={['answer']}
              dropZone={dropZone}
              droppedAnswersIds={dropzoneAnswerMap.get(id) || []}
              onAnswerDrop={onAnswerDrop}
              isCorrect={isCorrectMap.get(id)}
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
      <button onClick={() => checkAnswers()}>Check Answers</button>
    </DndWrapper>
  )
}
