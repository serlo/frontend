import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { v4 as uuidv4 } from 'uuid'

import type { DropzoneImageProps } from '..'
import { AnswerType, type AnswerZoneState } from '../types'
import {
  getAnswerZoneImageState,
  getAnswerZoneText,
} from '../utils/answer-zone'

export const defaultAnswerZonePosition = {
  left: 5,
  top: 5,
}

export const defaultAnswerZoneLayout = {
  width: 20,
  height: 10,
}

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
    const answerZone = answerZones.find((zone) => zone.id.get() === id)
    if (answerZone) {
      setCurrentAnswerZone(answerZone)
    }
  }

  const selectCurrentAnswer = (index: number, type: AnswerType) => {
    setCurrentAnswer(index)
    setCurrentAnswerType(type)
  }

  const insertAnswerZone = () => {
    const currentLength = answerZones.length
    answerZones.insert(currentLength, {
      id: `answerZone-${currentLength}`,
      name: '',
      position: defaultAnswerZonePosition,
      layout: defaultAnswerZoneLayout,
      answers: [],
    })
  }

  const duplicateAnswerZone = (idToDuplicate: string) => {
    const toCopy = answerZones.find((zone) => zone.id.get() === idToDuplicate)
    if (!toCopy) return
    const currentLength = answerZones.length
    const newZone = {
      id: `answerZone-${currentLength}`,
      name: toCopy.name.get(),
      position: {
        left: toCopy.position.left.get() + defaultAnswerZonePosition.left,
        top: toCopy.position.top.get() + defaultAnswerZonePosition.top,
      },
      layout: {
        width: toCopy.layout.width.get(),
        height: toCopy.layout.height.get(),
      },
      answers: toCopy.answers.map((answer) => ({
        id: uuidv4(),
        image: {
          plugin: EditorPluginType.Image,
          state: getAnswerZoneImageState(answer.image.get()),
        },
        text: {
          plugin: EditorPluginType.Text,
          state: getAnswerZoneText(answer.text.get()),
        },
      })),
    }
    answerZones.insert(currentLength, newZone)
  }

  const [answerZoneClipboardItem, setAnswerZoneClipboardItem] =
    useState<AnswerZoneState | null>(null)

  useHotkeys('backspace, del', (event) => {
    if (!currentAnswerZone) return
    const index = answerZones.findIndex(
      ({ id }) => id.get() === currentAnswerZone.id.get()
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
    const idToDuplicate = answerZoneClipboardItem.id.get()
    duplicateAnswerZone(idToDuplicate)
    event.preventDefault()
  })

  return {
    currentAnswerZone,
    currentAnswerIndex,
    currentAnswerType,
    selectAnswerZone,
    selectCurrentAnswer,
    insertAnswerZone,
    duplicateAnswerZone,
  }
}
