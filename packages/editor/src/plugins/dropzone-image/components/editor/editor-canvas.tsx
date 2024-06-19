import { selectStaticDocument, store } from '@editor/store'
import type { EditorImageDocument } from '@editor/types/editor-plugins'
import { useContext, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'

import type { DropzoneImageProps } from '../..'
import { AnswerZonesContext } from '../../context/context'
import { AnswerZoneState, ModalType } from '../../types'
import { getPercentageRounded } from '../../utils/percentage'
import { AnswerZone, answerZoneDragType } from '../answer-zone/answer-zone'
import { cn } from '@/helper/cn'

interface EditorCanvasProps {
  state: DropzoneImageProps['state']
  setModalType: (type: ModalType) => void
}

export function EditorCanvas(props: EditorCanvasProps) {
  const { state, setModalType } = props
  const { answerZones, backgroundImage, canvasDimensions } = state
  const canvasWidth = canvasDimensions.width.get()
  const canvasHeight = canvasDimensions.height.get()

  const context = useContext(AnswerZonesContext)

  const { selectAnswerZone, selectCurrentAnswer } = context || {}

  const backgroundImageDocument = backgroundImage.defined
    ? (selectStaticDocument(
        store.getState(),
        backgroundImage.get()
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
      let newCanvasWidth = canvasWidth
      let newCanvasHeight = canvasHeight

      if (canvasWidth / canvasHeight > imgAspectRatio) {
        newCanvasHeight = canvasWidth / imgAspectRatio
        if (newCanvasHeight > canvasHeight) {
          newCanvasHeight = canvasHeight
          newCanvasWidth = newCanvasHeight * imgAspectRatio
        }
      } else {
        newCanvasWidth = canvasHeight * imgAspectRatio
        if (newCanvasWidth > canvasWidth) {
          newCanvasWidth = canvasWidth
          newCanvasHeight = newCanvasWidth / imgAspectRatio
        }
      }
      canvasDimensions.width.set(newCanvasWidth)
      canvasDimensions.height.set(newCanvasHeight)
      setDidAdjustCanvasDimensions(true)
    }
  })

  const [, drop] = useDrop(
    () => ({
      accept: answerZoneDragType,
      drop(answerZone: AnswerZoneState, monitor) {
        const change = monitor.getDifferenceFromInitialOffset()
        if (!change) return

        const width = answerZone.layout.width.get()
        const currentAbsoluteLeft = canvasWidth * answerZone.position.left.get()
        const newAbsoluteLeft = currentAbsoluteLeft + change.x
        const left = getPercentageRounded(canvasWidth, newAbsoluteLeft)
        const right = left + width
        // If overflowing on the left, snap to left edge
        if (left < 0) answerZone.position.left.set(0)
        // If overflowing on the right, snap to right edge
        else if (right > 1) answerZone.position.left.set(1 - width)
        // Otherwise, position horizontally exactly as dropped
        else answerZone.position.left.set(left)

        const height = answerZone.layout.height.get()
        const currentAbsoluteTop = canvasHeight * answerZone.position.top.get()
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
        relative mx-auto box-content max-w-full overflow-auto rounded-lg
        border border-almost-black bg-cover bg-center bg-no-repeat
      `)}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        width: canvasWidth,
        aspectRatio: `${canvasWidth} / ${canvasHeight}`,
      }}
      data-qa="plugin-dropzone-image-editor-canvas"
    >
      <div
        className="overflow-hidden"
        style={{ width: canvasWidth, height: canvasHeight }}
      >
        {answerZones?.map((answerZone, index) => {
          const id = answerZone.id.get()
          return (
            <AnswerZone
              key={index}
              answerZone={answerZone}
              canvasHeight={canvasHeight}
              canvasWidth={canvasWidth}
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
    </div>
  )
}
