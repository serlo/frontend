import { selectStaticDocument, store } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  isImageDocument,
  isTextDocument,
} from '@editor/types/plugin-type-guards'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { DragDropBgProps } from '..'
import { AnswerType, AnswerZoneState } from '../types'

export const getAnswerZoneImageState = (answerZoneImageId: string) => {
  const answerImageDocument = selectStaticDocument(
    store.getState(),
    answerZoneImageId
  )
  return isImageDocument(answerImageDocument) ? answerImageDocument.state : ''
}

export const getAnswerZoneImageSrc = (answerZoneImageId: string) => {
  const answerImageDocument = selectStaticDocument(
    store.getState(),
    answerZoneImageId
  )
  return isImageDocument(answerImageDocument)
    ? (answerImageDocument.state.src as string)
    : ''
}

export const getAnswerZoneText = (answerZoneTextId: string) => {
  const answerTextDocument = selectStaticDocument(
    store.getState(),
    answerZoneTextId
  )

  return isTextDocument(answerTextDocument)
    ? answerTextDocument.state
    : undefined
}

export function useAnswerZones({ state }: DragDropBgProps) {
  const { answerZones } = state

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
      position: { left: 20 * currentLength + 1, top: 20 },
      layout: {
        width: 200,
        height: 70,
      },
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
        left: toCopy.position.left.get() + 70,
        top: toCopy.position.top.get() + 50,
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

  return {
    currentAnswerZone,
    currentAnswerIndex,
    currentAnswerType,
    selectAnswerZone,
    selectCurrentAnswer,
    insertAnswerZone,
    duplicateAnswerZone,
    getAnswerZoneImageSrc,
    getAnswerZoneText,
  }
}
