import { cn } from '@editor/utils/cn'
import { useEffect, useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import type { DraggableId } from '..'
import { DraggableAnswerPreview } from './draggable-answer-preview'
import { draggableAnswerStyle } from './draggable-answer-style'

export const blankDraggableAnswerDragType = 'blank-solution'

interface BlankDraggableAnswerProps {
  text: string
  draggableId: DraggableId
  isAnswerCorrect?: boolean
}

export interface BlankAnswerDragItem {
  draggableId: DraggableId
  text: string
}

export function BlankDraggableAnswer(props: BlankDraggableAnswerProps) {
  const { draggableId, text, isAnswerCorrect } = props

  const dragItem = useMemo<BlankAnswerDragItem>(
    () => ({ draggableId, text }),
    [draggableId, text]
  )

  const [, dragRef, preview] = useDrag({
    type: blankDraggableAnswerDragType,
    item: dragItem,
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  return (
    <div className="relative inline-block">
      <span
        className={cn(
          draggableAnswerStyle,
          isAnswerCorrect && 'border-green-500',
          isAnswerCorrect === false && 'border-red-500'
        )}
        ref={dragRef as unknown as React.LegacyRef<HTMLSpanElement>}
      >
        {text}
      </span>
      <DraggableAnswerPreview draggableId={draggableId} />
    </div>
  )
}
