import { selectStaticDocument, store } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { EditorDropzoneImageDocument } from '@editor/types/editor-plugins'
import {
  isImageDocument,
  isTextDocument,
} from '@editor/types/plugin-type-guards'
import { v4 as uuidv4 } from 'uuid'

import { type DropzoneImageProps } from '..'
import type { AnswerData, PossibleAnswerType } from '../types'

export const defaultAnswerZonePosition = {
  left: 0.05,
  top: 0.05,
}

export const defaultAnswerZoneLayout = {
  width: 0.2,
  height: 0.1,
}

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

export const convertAnswer = (answer: AnswerData) => {
  const id = answer.image.id
  const imageUrl = getAnswerZoneImageSrc(id)
  const zoneTextId = answer.text.id
  const text = getAnswerZoneText(zoneTextId)
  return { id, imageUrl, text }
}

export const convertStaticAnswers = (
  answers: EditorDropzoneImageDocument['state']['extraDraggableAnswers']
): PossibleAnswerType[] => {
  return answers.map((answer) => {
    const imageUrl = isImageDocument(answer.image)
      ? (answer.image.state?.src as string).toString()
      : ''
    const text = isTextDocument(answer.text) ? answer.text.state : undefined
    return { id: answer.id, text, imageUrl }
  })
}

export function duplicateAnswerZone(
  answerZones: DropzoneImageProps['state']['answerZones'],
  idToDuplicate: string
) {
  const toCopy = answerZones.find((zone) => zone.id.value === idToDuplicate)
  if (!toCopy) return
  const currentLength = answerZones.length
  const newZone = {
    id: `answerZone-${currentLength}`,
    name: toCopy.name.value,
    position: {
      left: toCopy.position.left.value + defaultAnswerZonePosition.left,
      top: toCopy.position.top.value + defaultAnswerZonePosition.top,
    },
    layout: {
      width: toCopy.layout.width.value,
      height: toCopy.layout.height.value,
    },
    answers: toCopy.answers.map((answer) => ({
      id: uuidv4(),
      image: {
        plugin: EditorPluginType.Image,
        state: getAnswerZoneImageState(answer.image.id),
      },
      text: {
        plugin: EditorPluginType.Text,
        state: getAnswerZoneText(answer.text.id),
      },
    })),
  }
  answerZones.insert(currentLength, newZone)
}

export function insertAnswerZone(
  answerZones: DropzoneImageProps['state']['answerZones']
) {
  const currentLength = answerZones.length
  answerZones.insert(currentLength, {
    id: `answerZone-${currentLength}`,
    name: '',
    position: defaultAnswerZonePosition,
    layout: defaultAnswerZoneLayout,
    answers: [],
  })
}
