import { useState } from 'react'

import type { DragDropBgProps } from '..'
import type { answerZoneType } from '../types'

export function useAnswerZones({ state }: DragDropBgProps) {
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

  const insertAnswerZone = () => {
    const currentLength = answerZones.length
    answerZones.insert(currentLength, {
      id: `answerZone-${currentLength}`,
      name: '',
      position: { left: 20 * currentLength + 1, top: 20 },
      layout: {
        width: 200,
        height: 70,
        visible: true,
        lockedAspectRatio: true,
      },
      answers: [],
    })
  }

  return {
    currentAnswerZone,
    selectAnswerZone,
    insertAnswerZone,
  }
}
