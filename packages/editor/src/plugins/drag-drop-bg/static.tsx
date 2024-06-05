import { DndWrapper } from '@editor/core/components/dnd-wrapper'
import { DraggableArea } from '@editor/editor-ui/exercises/draggable-area'
import {
  EditorDragDropBgDocument,
  EditorImageDocument,
} from '@editor/types/editor-plugins'
import { isTextDocument } from '@editor/types/plugin-type-guards'
import { useMemo, useState } from 'react'

import { DraggableAnswer } from './components/shared/draggable-answer'
import { BlankDropZone } from './components/static/blank-drop-zone'
import type {
  DraggableAnswerType,
  DropzoneVisibility,
  PossibleAnswerType,
} from './types'

export function DragDropBgStaticRenderer({ state }: EditorDragDropBgDocument) {
  const {
    answerZones,
    backgroundImage,
    extraDraggableAnswers,
    dropzoneVisibility,
  } = state

  const bgImagePluginState = backgroundImage as EditorImageDocument
  const backgroundImageUrlFromPlugin = (bgImagePluginState?.state?.src ||
    '') as string

  const correctAnswers = answerZones
    .map((zone) => {
      const answersForZone = zone.answers.map((answer) => {
        const answerImageState = answer.image as EditorImageDocument

        const answerImageUrl = answerImageState.state.src as string

        const answerText = isTextDocument(answer.text)
          ? answer.text.state
          : undefined

        return {
          id: answer.id,
          text: answerText,
          imageUrl: answerImageUrl,
        }
      })
      return answersForZone
    })
    .flat()

  const possibleAnswers = useMemo(() => {
    return [...correctAnswers, ...extraDraggableAnswers]
      .map((possibleAnswer) => ({ possibleAnswer, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ possibleAnswer }) => possibleAnswer)
  }, [correctAnswers, extraDraggableAnswers])

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
    droppableBlankId: string
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
    answerZones.forEach((answerZone, index) => {
      const expectedAnswerId = answerZone.id
      const droppedAnswerIds = dropzoneAnswerMap.get(index.toString()) || []
      const isAnswerCorrect = droppedAnswerIds.includes(expectedAnswerId)
      setIsCorrectMap(
        (prev) => new Map(prev.set(index.toString(), isAnswerCorrect))
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
        {answerZones.map((answerZone, index) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { answers, id, ...rest } = answerZone
          const dropZone = { ...rest, id: index.toString() }
          return (
            <BlankDropZone
              key={id}
              visibility={dropzoneVisibility as DropzoneVisibility}
              accept={['answer']}
              dropZone={dropZone}
              droppedAnswersIds={dropzoneAnswerMap.get(index.toString()) || []}
              onAnswerDrop={onAnswerDrop}
              isCorrect={isCorrectMap.get(index.toString())}
            />
          )
        })}
      </div>
      <DraggableArea accept="all" onDrop={onDraggableAreaAnswerDrop}>
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
