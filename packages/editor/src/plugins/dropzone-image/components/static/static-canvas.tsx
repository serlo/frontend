import type {
  EditorDropzoneImageDocument,
  EditorImageDocument,
} from '@editor/types/editor-plugins'

import { BlankDropZone } from './blank-drop-zone'
import type { DropzoneVisibility } from '../../types'
import { isSmallScreen } from '../../utils/is-small-screen'
import { cn } from '@/helper/cn'

interface StaticCanvasProps {
  state: EditorDropzoneImageDocument['state']
  dropzoneAnswerMap: Map<string, string[]>
  isAnswerZoneCorrectMap: Map<string, boolean | null>
  isAnswerCorrectMap: Map<string, Map<string, boolean | null> | null>
  onAnswerDrop: (
    answerId: string,
    dropzoneId: string,
    originDropzoneId?: string
  ) => void
}

export function StaticCanvas(props: StaticCanvasProps) {
  const {
    state,
    dropzoneAnswerMap,
    isAnswerZoneCorrectMap,
    isAnswerCorrectMap,
    onAnswerDrop,
  } = props
  const { answerZones, backgroundImage, canvasDimensions, dropzoneVisibility } =
    state

  const bgImagePluginState = backgroundImage as EditorImageDocument
  const backgroundImageUrlFromPlugin = (bgImagePluginState?.state?.src ||
    '') as string

  const scaler = isSmallScreen() ? 0.4 : 1

  return (
    <div
      className={cn(`
        relative mx-auto overflow-hidden rounded-lg
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
            isAnswerCorrectMap={isAnswerCorrectMap.get(id)}
            visibility={dropzoneVisibility as DropzoneVisibility}
            canvasDimensions={canvasDimensions}
            answersCount={answers.length}
            onAnswerDrop={onAnswerDrop}
          />
        )
      })}
    </div>
  )
}
