import { CanvasEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  object,
  string,
  number,
} from '../../plugin'

const canvasState = object({
  document: string(''),
  metadata: object({
    lastModified: number(0),
  }),
})

export type CanvasPluginState = typeof canvasState

export const canvasPlugin: EditorPlugin<CanvasPluginState> = {
  Component: CanvasEditor,
  config: {},
  state: canvasState,
  // We don't need onText for canvas
  onText: undefined,
}

export type CanvasProps = EditorPluginProps<CanvasPluginState>

export interface SerializedTLStore {
  // Serialized TLStoreSnapshot
  document: string
  metadata: {
    lastModified: number
  }
}
