import { useCallback, useState } from 'react'

import type { DragDropBgProps } from '..'
import type { AnswerZoneSettings, answerZoneType } from '../types'

export function useAnswerZones({ state }: DragDropBgProps) {
  const { answerZones, canvasShape } = state

  const [currentAnswerZone, setCurrentAnswerZone] = useState<answerZoneType>(
    answerZones[0]
  )

  const getCanvasDimensions = () => {
    switch (canvasShape.get()) {
      case 'square':
        return { canvasHeight: '786px', canvasWidth: '786px' }
      case 'landscape':
        return { canvasHeight: '786px', canvasWidth: '1024px' }
      case 'portrait':
        return { canvasHeight: '500px', canvasWidth: '786px' }
      default:
        return { canvasHeight: '1px', canvasWidth: '1px' }
    }
  }

  const selectAnswerZone = (id: string) => {
    const answerZone = answerZones.find((zone) => zone.id.get() === id)
    if (answerZone) {
      setCurrentAnswerZone(answerZone)
    }
  }

  const onChangeAnswerZone = (id: string, settings: AnswerZoneSettings) => {
    const answerZone = answerZones.find((zone) => zone.id.get() === id)
    if (!answerZone) return

    settings?.visible && answerZone.layout.visible.set(settings?.visible)
    answerZone.layout.height.set(settings?.height)
    answerZone.layout.width.set(settings?.width)
    answerZone.layout.lockedAspectRatio.set(settings?.lockedAspectRatio)
  }

  const moveAnswerZone = useCallback(
    (answerZone: answerZoneType, left: number, top: number) => {
      answerZone.position.left.set(left)
      answerZone.position.top.set(top)
    },
    []
  )

  return {
    currentAnswerZone,
    selectAnswerZone,
    onChangeAnswerZone,
    moveAnswerZone,
    getCanvasDimensions,
  }
}
