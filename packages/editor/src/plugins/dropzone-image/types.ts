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
  }
  answer?: PossibleAnswerType
}

export interface DraggableAnswerType {
  id: string
  draggableId: string
  droppableBlankId?: string
  text?: Descendant[]
  imageUrl?: string
}

export interface BlankDropZoneSpec extends BasicDropZone {
  accepts?: string[]
  lastDroppedItem?: { id: string; imageUrl?: string }
}

export interface AnswerZoneSettings {
  height: number
  width: number
}

export interface answerDataType
  extends StateTypeReturnType<typeof answerData> {}

export interface AnswerZoneState
  extends StateTypeReturnType<typeof answerZoneState> {}

export enum AnswerType {
  Unset = '',
  Image = 'image',
  Text = 'text',
}

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

export enum DropzoneVisibility {
  Full = 'full',
  Partial = 'partial',
  None = 'none',
}

export enum ModalType {
  Unset = '',
  Settings = 'settings',
  CreateDropZone = 'createDropZone',
  Edit = 'edit',
  CreateWrongAnswer = 'createWrongAnswer',
}
