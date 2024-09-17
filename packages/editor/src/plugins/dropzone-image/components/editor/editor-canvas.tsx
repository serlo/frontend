import { selectStaticDocument, store } from '@editor/store'
import type { EditorImageDocument } from '@editor/types/editor-plugins'
import { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'

import { defaultLargeCanvasDimension } from './background-shape-select'
import type { DropzoneImageProps } from '../..'
import {
  type AnswerType,
  AnswerZoneState,
  ModalType,
  type DropzoneVisibility,
} from '../../types'
import { getPercentageRounded } from '../../utils/percentage'
import { AnswerZone, answerZoneDragType } from '../answer-zone/answer-zone'
import { cn } from '@/helper/cn'

interface EditorCanvasProps {
  state: DropzoneImageProps['state']
  setModalType: (type: ModalType) => void
  selectAnswerZone: (id: string) => void
  selectCurrentAnswer: (index: number, type: AnswerType) => void
}

export function EditorCanvas({
  state,
  setModalType,
  selectAnswerZone,
  selectCurrentAnswer,
}: EditorCanvasProps) {
  const { answerZones, backgroundImage, canvasDimensions } = state
  const canvasWidth = canvasDimensions.width.value
  const canvasHeight = canvasDimensions.height.value

  const backgroundImageDocument = backgroundImage.defined
    ? (selectStaticDocument(
        store.getState(),
        backgroundImage.id
      ) as EditorImageDocument)
    : null
  const backgroundImageUrl = (backgroundImageDocument?.state?.src ||
    '') as string

  const [didAdjustCanvasDimensions, setDidAdjustCanvasDimensions] =
    useState(false)

  // adjust canvas size to fit the background image
  useEffect(() => {
    if (!backgroundImageDocument || didAdjustCanvasDimensions) return
    const img = new Image()
    img.src = backgroundImageUrl
    img.onload = () => {
      const imgAspectRatio = img.width / img.height
      const defaultDimension = defaultLargeCanvasDimension
      let newCanvasWidth = defaultDimension
      let newCanvasHeight = defaultDimension

      if (imgAspectRatio < 1) {
        if (defaultDimension / imgAspectRatio > defaultDimension) {
          newCanvasWidth = defaultDimension * imgAspectRatio
        }
      } else {
        if (defaultDimension * imgAspectRatio > defaultDimension) {
          newCanvasHeight = defaultDimension / imgAspectRatio
        }
      }
      canvasDimensions.width.set(newCanvasWidth)
      canvasDimensions.height.set(newCanvasHeight)
      setDidAdjustCanvasDimensions(true)
    }
  })

  // reset canvas size when background image changes
  useEffect(() => {
    setDidAdjustCanvasDimensions(false)
  }, [backgroundImageUrl])

  const [, drop] = useDrop(
    () => ({
      accept: answerZoneDragType,
      drop(answerZone: AnswerZoneState, monitor) {
        const change = monitor.getDifferenceFromInitialOffset()
        if (!change) return

        const width = answerZone.layout.width.value
        const currentAbsoluteLeft = canvasWidth * answerZone.position.left.value
        const newAbsoluteLeft = currentAbsoluteLeft + change.x
        const left = getPercentageRounded(canvasWidth, newAbsoluteLeft)
        const right = left + width
        // If overflowing on the left, snap to left edge
        if (left < 0) answerZone.position.left.set(0)
        // If overflowing on the right, snap to right edge
        else if (right > 1) answerZone.position.left.set(1 - width)
        // Otherwise, position horizontally exactly as dropped
        else answerZone.position.left.set(left)

        const height = answerZone.layout.height.value
        const currentAbsoluteTop = canvasHeight * answerZone.position.top.value
        const newAbsoluteTop = currentAbsoluteTop + change.y
        const top = getPercentageRounded(canvasHeight, newAbsoluteTop)
        const bottom = top + height
        // If overflowing on the top, snap to top edge
        if (top < 0) answerZone.position.top.set(0)
        // If overflowing on the bottom, snap to bottom edge
        else if (bottom > 1) answerZone.position.top.set(1 - height)
        // Otherwise, position vertically exactly as dropped
        else answerZone.position.top.set(top)
      },
    }),
    [answerZones]
  )

  return (
    <div
      ref={drop}
      className={cn(`
        relative mx-auto box-content max-w-full overflow-auto overflow-hidden
        rounded-lg border border-almost-black bg-cover bg-center bg-no-repeat
      `)}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        width: canvasWidth,
        aspectRatio: `${canvasWidth} / ${canvasHeight}`,
      }}
      data-qa="plugin-dropzone-image-editor-canvas"
    >
      {answerZones?.map((answerZone, index) => {
        const id = answerZone.id.value
        return (
          <AnswerZone
            key={index}
            answerZone={answerZone}
            canvasSize={[canvasWidth, canvasHeight]}
            dropzoneVisibility={
              state.dropzoneVisibility.value as DropzoneVisibility
            }
            onClick={() => selectAnswerZone(id)}
            onClickSettingsButton={() => {
              selectAnswerZone(id)
              setModalType(ModalType.Settings)
            }}
            onClickPlusButton={() => {
              selectAnswerZone(id)
              setModalType(ModalType.CreateDropZone)
            }}
            onClickEditAnswerButton={(answerIndex, answerType) => {
              selectAnswerZone(id)
              selectCurrentAnswer(answerIndex, answerType)
              setModalType(ModalType.Edit)
            }}
          />
        )
      })}
    </div>
  )
}
