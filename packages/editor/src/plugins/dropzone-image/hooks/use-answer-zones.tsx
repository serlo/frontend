import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import type { DropzoneImageProps } from '..'
import { AnswerType, type AnswerZoneState } from '../types'
import { duplicateAnswerZone } from '../utils/answer-zone'

export function useAnswerZones(
  answerZones: DropzoneImageProps['state']['answerZones']
) {
  const [currentAnswerZone, setCurrentAnswerZone] = useState<AnswerZoneState>(
    answerZones[0]
  )
  const [currentAnswerIndex, setCurrentAnswer] = useState<number>(0)
  const [currentAnswerType, setCurrentAnswerType] = useState<AnswerType>(
    AnswerType.Unset
  )

  const selectAnswerZone = (id: string) => {
    const answerZone = answerZones.find((zone) => zone.id.value === id)
    if (answerZone) {
      setCurrentAnswerZone(answerZone)
    }
  }

  const selectCurrentAnswer = (index: number, type: AnswerType) => {
    setCurrentAnswer(index)
    setCurrentAnswerType(type)
  }

  const [answerZoneClipboardItem, setAnswerZoneClipboardItem] =
    useState<AnswerZoneState | null>(null)

  useHotkeys('backspace, del', (event) => {
    if (!currentAnswerZone) return
    const index = answerZones.findIndex(
      ({ id }) => id.value === currentAnswerZone.id.value
    )
    index !== -1 && answerZones.remove(index)
    event.preventDefault()
  })

  useHotkeys(['ctrl+c, meta+c'], (event) => {
    setAnswerZoneClipboardItem(currentAnswerZone)
    event.preventDefault()
  })

  useHotkeys(['ctrl+v, meta+v'], (event) => {
    if (!answerZoneClipboardItem) return
    const idToDuplicate = answerZoneClipboardItem.id.value
    duplicateAnswerZone(answerZones, idToDuplicate)
    event.preventDefault()
  })

  return {
    currentAnswerZone,
    currentAnswerIndex,
    currentAnswerType,
    selectAnswerZone,
    selectCurrentAnswer,
  }
}
