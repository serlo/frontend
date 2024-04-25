import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { DragDropBgEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  child,
  number,
  boolean,
  list,
} from '../../plugin'

export const answerZoneImageProps = child({ plugin: EditorPluginType.Image })
export const answerZoneTextProps = child({ plugin: EditorPluginType.Text })

export const positionData = object({
  top: number(0),
  left: number(0),
})

export const layoutData = object({
  width: number(0),
  height: number(0),
  visible: boolean(true),
  lockedAspectRatio: boolean(true),
})

export const answerData = object({
  image: answerZoneImageProps,
  text: answerZoneTextProps,
})

export const answerZoneProps = object({
  id: string(''),
  position: positionData,
  layout: layoutData,
  answer: answerData,
})

export const wrongAnswerProps = object({
  id: string(''),
  answer: answerData,
})

const dragDropBgState = object({
  answerZones: list(answerZoneProps, 0),
  backgroundType: string(''),
  backgroundImage: child({ plugin: EditorPluginType.Image }),
  extraDraggableAnswers: list(wrongAnswerProps, 0),
})

export const defaultConfig: DragDropBgConfig = {}

export function createDragDropBgPlugin(): EditorPlugin<DragDropBgPluginState> {
  // config = defaultConfig
  return {
    Component: DragDropBgEditor,
    state: dragDropBgState,
    config: {},
  }
}

export interface DragDropBgConfig {
  allowedPlugins?: (EditorPluginType | string)[]
}

export type DragDropBgPluginState = typeof dragDropBgState

export type DragDropBgProps = EditorPluginProps<DragDropBgPluginState>
