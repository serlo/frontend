import { StateTypeReturnType } from '@editor/plugin'

import type { answerZoneProps, wrongAnswerProps } from '.'

export interface PossibleAnswerType {
  id: string
  imageUrl?: string
  text?: string
}

export interface BasicDropZone {
  id: string

  position: {
    top: number
    left: number
  }

  layout: {
    width: number
    height: number
    visible: boolean
    lockedAspectRatio: boolean
  }
  answer?: PossibleAnswerType
}

export interface DraggableAnswerType {
  draggableId: string
  text?: string
  imageUrl?: string
}

export interface BlankDropZoneSpec extends BasicDropZone {
  accepts?: string[]
  lastDroppedItem?: { id: string; imageUrl?: string }
}

export interface answerZoneType
  extends StateTypeReturnType<typeof answerZoneProps> {}

export interface wrongAnswerType
  extends StateTypeReturnType<typeof wrongAnswerProps> {}
