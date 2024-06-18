import { TextEditorFormattingOption } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { defaultLargeCanvasDimension } from './components/editor/background-shape-select'
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
  text: child({
    plugin: EditorPluginType.Text,
    config: {
      formattingOptions: [
        TextEditorFormattingOption.richTextBold,
        TextEditorFormattingOption.richTextItalic,
        TextEditorFormattingOption.colors,
        TextEditorFormattingOption.math,
        TextEditorFormattingOption.code,
      ],
    },
  }),
})

export const answerZoneState = object({
  id: string(''),
  name: string(''),
  position: positionData,
  layout: layoutData,
  answers: list(answerData, 0),
})

const dropzoneImageState = object({
  answerZones: list(answerZoneState, 0),
  canvasShape: string(BackgroundShape.Unset),
  canvasDimensions: object({
    height: number(defaultLargeCanvasDimension),
    width: number(defaultLargeCanvasDimension),
  }),
  backgroundType: string(''),
  backgroundImage: optional(child({ plugin: EditorPluginType.Image })),
  dropzoneVisibility: string(DropzoneVisibility.Full),
  extraDraggableAnswers: list(answerData, 0),
})

export const defaultConfig: DropzoneImageConfig = {}

export function createDropzoneImagePlugin(): EditorPlugin<DropzoneImagePluginState> {
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
