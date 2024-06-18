import { selectStaticDocument, store } from '@editor/store'
import type { EditorImageDocument } from '@editor/types/editor-plugins'
import { useContext, useEffect, useState } from 'react'
import { XYCoord, useDrop } from 'react-dnd'

import type { DropzoneImageProps } from '../..'
import { AnswerZonesContext } from '../../context/context'
import { AnswerZoneState, ModalType } from '../../types'
import { AnswerZone, answerZoneDragType } from '../answer-zone/answer-zone'
import { cn } from '@/helper/cn'

interface EditorCanvasProps {
  state: DropzoneImageProps['state']
  setModalType: (type: ModalType) => void
}

export function EditorCanvas(props: EditorCanvasProps) {
  const { state, setModalType } = props
  const { answerZones, backgroundImage, canvasDimensions } = state

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
      const maxCanvasWidth = canvasDimensions.width.get()
      const maxCanvasHeight = canvasDimensions.height.get()
      let newCanvasWidth = maxCanvasWidth
      let newCanvasHeight = maxCanvasHeight

      if (maxCanvasWidth / maxCanvasHeight > imgAspectRatio) {
        newCanvasHeight = maxCanvasWidth / imgAspectRatio
        if (newCanvasHeight > maxCanvasHeight) {
          newCanvasHeight = maxCanvasHeight
          newCanvasWidth = newCanvasHeight * imgAspectRatio
        }
      } else {
        newCanvasWidth = maxCanvasHeight * imgAspectRatio
        if (newCanvasWidth > maxCanvasWidth) {
          newCanvasWidth = maxCanvasWidth
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
        const delta = change || ({ x: 0, y: 0 } as XYCoord)
        const left = Math.round(answerZone.position.left.get() + delta.x)
        const top = Math.round(answerZone.position.top.get() + delta.y)
        answerZone.position.left.set(left)
        answerZone.position.top.set(top)
      },
    }),
    [answerZones]
  )

  return (
    <div
      ref={drop}
      className={cn(`
          relative mx-auto overflow-hidden rounded-lg
          border border-almost-black
          bg-cover bg-center bg-no-repeat
        `)}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        height: `${canvasDimensions.height.get()}px`,
        width: `${canvasDimensions.width.get()}px`,
      }}
      data-qa="plugin-dropzone-image-editor-canvas"
    >
      {answerZones?.map((answerZone, index) => {
        const id = answerZone.id.get()
        return (
          <AnswerZone
            key={index}
            answerZone={answerZone}
            maxHeight={canvasDimensions.height.get()}
            maxWidth={canvasDimensions.width.get()}
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
