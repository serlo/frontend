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

export const positionData = object({
  top: number(0),
  left: number(0),
})

export const layoutData = object({
  width: number(200),
  height: number(70),
  visible: boolean(true),
  lockedAspectRatio: boolean(true),
})

export const answerData = object({
  image: child({ plugin: EditorPluginType.Image }),
  text: child({ plugin: EditorPluginType.Text }),
})

export const answerZoneState = object({
  id: string(''),
  position: positionData,
  layout: layoutData,
  answer: answerData,
})

export const wrongAnswerState = object({
  id: string(''),
  answer: answerData,
})

const dragDropBgState = object({
  answerZones: list(answerZoneState, 0),
  canvasShape: string(''),
  backgroundType: string(''),
  backgroundImage: child({ plugin: EditorPluginType.Image }),
  extraDraggableAnswers: list(wrongAnswerState, 0),
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
