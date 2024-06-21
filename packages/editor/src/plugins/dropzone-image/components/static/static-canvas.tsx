import type {
  EditorDropzoneImageDocument,
  EditorImageDocument,
} from '@editor/types/editor-plugins'

import { BlankDropZone } from './blank-drop-zone'
import type {
  DraggableAnswerType,
  DropzoneVisibility,
  PossibleAnswerType,
} from '../../types'
import { cn } from '@/helper/cn'

interface StaticCanvasProps {
  state: EditorDropzoneImageDocument['state']
  dropzoneAnswerMap: Map<string, PossibleAnswerType[]>
  isZoneCorrectMap: Map<string, boolean | null>
  isAnswerCorrectMap: Map<string, Map<string, boolean | null> | null>
  draggableAnswerDragType: string
  onAnswerDrop: (
    answerId: DraggableAnswerType,
    dropzoneId: string,
    originDropzoneId?: string
  ) => void
}

export function StaticCanvas(props: StaticCanvasProps) {
  const {
    state,
    dropzoneAnswerMap,
    isZoneCorrectMap,
    isAnswerCorrectMap,
    draggableAnswerDragType,
    onAnswerDrop,
  } = props
  const { answerZones, backgroundImage, canvasDimensions, dropzoneVisibility } =
    state

  const bgImagePluginState = backgroundImage as EditorImageDocument
  const backgroundImageUrlFromPlugin = (bgImagePluginState?.state?.src ||
    '') as string

  return (
    <div
      className={cn(`
        relative mx-auto box-content max-w-full
        overflow-hidden rounded-lg border
        border-brand-500 bg-cover bg-center bg-no-repeat
      `)}
      style={{
        backgroundImage: `url(${backgroundImageUrlFromPlugin})`,
        width: canvasDimensions.width,
        aspectRatio: `${canvasDimensions.width} / ${canvasDimensions.height}`,
      }}
    >
      {answerZones.map((answerZone) => {
        const { answers, id, ...rest } = answerZone
        const dropZone = { ...rest, id }
        return (
          <BlankDropZone
            key={id}
            dropZone={dropZone}
            droppedAnswers={dropzoneAnswerMap.get(id) || []}
            isCorrect={isZoneCorrectMap.get(id)}
            isAnswerCorrectMap={isAnswerCorrectMap.get(id)}
            visibility={dropzoneVisibility as DropzoneVisibility}
            canvasDimensions={canvasDimensions}
            answersCount={answers.length}
            accept={draggableAnswerDragType}
            onAnswerDrop={onAnswerDrop}
          />
        )
      })}
    </div>
  )
}
