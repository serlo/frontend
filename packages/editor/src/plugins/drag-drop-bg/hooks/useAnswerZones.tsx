import { useCallback, useState } from 'react'
import { XYCoord, useDrop } from 'react-dnd'

import type { DragDropBgProps } from '..'
import type { AnswerZoneSettings, answerZoneType } from '../types'

export function useAnswerZones({ state, id }: DragDropBgProps) {
  const { answerZones } = state

  const [currentAnswerZone, setCurrentAnswerZone] = useState<answerZoneType>(
    answerZones[0]
  )

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

  const onChangeDimensions = useCallback(
    (id: string, dimensions: { width: number; height: number }) => {
      const answerZone = answerZones.find((zone) => zone.id.get() === id)
      if (!answerZone) return

      answerZone.layout.width.set(dimensions.width)
      answerZone.layout.height.set(dimensions.height)
    },
    [answerZones]
  )

  const moveAnswerZone = useCallback(
    (answerZone: answerZoneType, left: number, top: number) => {
      answerZone.position.left.set(left)
      answerZone.position.top.set(top)
    },
    []
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'all',
      drop(answerZone: answerZoneType, monitor) {
        const change = monitor.getDifferenceFromInitialOffset()
        const delta = change || ({ x: 0, y: 0 } as XYCoord)
        const left = Math.round(answerZone.position.left.get() + delta.x)
        const top = Math.round(answerZone.position.top.get() + delta.y)
        moveAnswerZone(answerZone, left, top)
      },
    }),
    [answerZones]
  )

  return {
    currentAnswerZone,
    selectAnswerZone,
    onChangeAnswerZone,
    drop,
    onChangeDimensions,
  }
}
