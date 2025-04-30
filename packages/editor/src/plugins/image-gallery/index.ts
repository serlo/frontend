import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { ImageGalleryEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
  list,
  number,
} from '../../plugin'

const imageGalleryState = object({
  images: list(
    object({
      imagePlugin: child({ plugin: EditorPluginType.Image }),
      dimensions: object({ width: number(0), height: number(0) }),
    })
  ),
})

export const imageGalleryPlugin: EditorPlugin<ImageGalleryPluginState> = {
  Component: ImageGalleryEditor,
  state: imageGalleryState,
}

export type ImageGalleryPluginState = typeof imageGalleryState
export type ImageGalleryProps = EditorPluginProps<ImageGalleryPluginState>
