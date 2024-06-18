import { selectStaticDocument, store } from '@editor/store'
import type { EditorDropzoneImageDocument } from '@editor/types/editor-plugins'
import {
  isImageDocument,
  isTextDocument,
} from '@editor/types/plugin-type-guards'

import type { AnswerData, PossibleAnswerType } from '../types'

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
  const id = answer.image.get()
  const imageUrl = getAnswerZoneImageSrc(id)
  const zoneTextId = answer.text.get()
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
