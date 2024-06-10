import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { DropzoneImageEditor } from './components/editor/editor'
import { BackgroundShape, DropzoneVisibility } from './types'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  child,
  number,
  list,
  optional,
} from '../../plugin'

export const positionData = object({
  top: number(0),
  left: number(0),
})

export const layoutData = object({
  width: number(200),
  height: number(70),
})

export const answerData = object({
  id: string(''),
  image: child({ plugin: EditorPluginType.Image }),
  text: child({ plugin: EditorPluginType.Text }),
})

export const answerZoneState = object({
  id: string(''),
  name: string('aaa'),
  position: positionData,
  layout: layoutData,
  answers: list(answerData, 0),
})

const dropzoneImageState = object({
  answerZones: list(answerZoneState, 0),
  canvasShape: string(BackgroundShape.Unset),
  canvasDimensions: object({
    height: number(0),
    width: number(0),
  }),
  backgroundType: string(''),
  backgroundImage: optional(child({ plugin: EditorPluginType.Image })),
  dropzoneVisibility: string(DropzoneVisibility.Full),
  extraDraggableAnswers: list(answerData, 0),
})

export const defaultConfig: DropzoneImageConfig = {}

export function createDropzoneImagePlugin(): EditorPlugin<DropzoneImagePluginState> {
  // config = defaultConfig
  return {
    Component: DropzoneImageEditor,
    state: dropzoneImageState,
    config: {},
  }
}

export interface DropzoneImageConfig {
  allowedPlugins?: (EditorPluginType | string)[]
}

export type DropzoneImagePluginState = typeof dropzoneImageState

export type DropzoneImageProps = EditorPluginProps<DropzoneImagePluginState>
