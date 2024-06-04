import { StateTypeReturnType } from '@editor/plugin'
import { Descendant } from 'slate'

import type { answerData, answerZoneState } from '.'

export interface PossibleAnswerType {
  id: string
  imageUrl?: string
  text?: Descendant[]
}

export interface BasicDropZone {
  id: string
  name: string

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
  text?: Descendant[]
  imageUrl?: string
}

export interface BlankDropZoneSpec extends BasicDropZone {
  accepts?: string[]
  lastDroppedItem?: { id: string; imageUrl?: string }
}

export interface AnswerZoneSettings {
  visible: boolean
  height: number
  width: number
  lockedAspectRatio: boolean
}

export interface answerDataType
  extends StateTypeReturnType<typeof answerData> {}

export interface AnswerZoneState
  extends StateTypeReturnType<typeof answerZoneState> {}

export enum BackgroundType {
  Blank = 'blank',
  Image = 'image',
}

export enum BackgroundShape {
  Unset = '',
  Square = 'square',
  Landscape = 'landscape',
  Portrait = 'portrait',
}
