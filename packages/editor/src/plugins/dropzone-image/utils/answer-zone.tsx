import { selectStaticDocument, store } from '@editor/store'
import {
  isImageDocument,
  isTextDocument,
} from '@editor/types/plugin-type-guards'

import type { AnswerData } from '../types'

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
