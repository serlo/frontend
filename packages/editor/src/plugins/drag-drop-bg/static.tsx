import { DndWrapper } from '@editor/core/components/dnd-wrapper'
import {
  EditorDragDropBgDocument,
  EditorImageDocument,
} from '@editor/types/editor-plugins'
import { useState } from 'react'

import { PossibleAnswers } from './components/shared/PossibleAnswers'
import { BlankDropZone } from './components/static/BlankDropZone'

export function DragDropBgStaticRenderer({ state }: EditorDragDropBgDocument) {
  const { answerZones, backgroundImage, extraDraggableAnswers } = state

  const bgImagePluginState = backgroundImage as EditorImageDocument
  const backgroundImageUrlFromPlugin = (bgImagePluginState?.state?.src ||
    '') as string

  const correctAnswers = answerZones.map((zone) => {
    const zoneImageId = zone.id
    const zoneImgUrl = zone.answer.image.state.src || ''

    return {
      id: zoneImageId,
      imageUrl: zoneImgUrl,
    }
  })

  const possibleAnswers = [...correctAnswers, ...extraDraggableAnswers]

  const [dropzoneAnswerMap, setDropzoneAnswerMap] = useState(
    new Map<string, string>()
  )

  const onDropAnswer = (answerId: string, dropzoneId: string) => {
    setDropzoneAnswerMap((prev) => new Map(prev.set(dropzoneId, answerId)))
    setIsCorrectMap((prev) => new Map(prev.set(dropzoneId, null)))
  }

  // dropzone id to true/false
  const [isCorrectMap, setIsCorrectMap] = useState(
    new Map<string, boolean | null>()
  )

  const checkAnswers = () => {
    answerZones.forEach((answerZone, index) => {
      const expectedAnswerId = answerZone.id
      const droppedAnswerId = dropzoneAnswerMap.get(index.toString())
      const isAnswerCorrect = expectedAnswerId === droppedAnswerId
      setIsCorrectMap(
        (prev) => new Map(prev.set(index.toString(), isAnswerCorrect))
      )
    })
  }

  return (
    <DndWrapper>
      <div
        className="relative h-[786px] w-[786px] overflow-hidden border border-black bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrlFromPlugin})`,
        }}
      >
        {answerZones.map((answerZone, index) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { answer, id, ...rest } = answerZone
          const dropZone = { ...rest, id: index.toString() }
          return (
            <BlankDropZone
              key={id}
              accept={['answer']}
              dropZone={dropZone}
              onDropAnswer={onDropAnswer}
              isCorrect={isCorrectMap.get(index.toString())}
            />
          )
        })}
      </div>
      <PossibleAnswers canEdit={false} possibleAnswers={possibleAnswers} />
      <button onClick={() => checkAnswers()}>Check Answers</button>
    </DndWrapper>
  )
}
