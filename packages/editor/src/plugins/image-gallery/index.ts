import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { ImageGalleryEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
  list,
  string,
} from '../../plugin'

export const defaultConfig: ImageGalleryConfig = {}

function createImageGalleryState() {
  return object({
    images: list(child({ plugin: EditorPluginType.Image })),
    orderedIds: string(),
  })
}

export function createImageGalleryPlugin(
  config = defaultConfig
): EditorPlugin<ImageGalleryPluginState, ImageGalleryConfig> {
  return {
    Component: ImageGalleryEditor,
    config,
    state: createImageGalleryState(),
  }
}

export type ImageGalleryPluginState = ReturnType<typeof createImageGalleryState>

export interface ImageGalleryConfig {}

export type ImageGalleryProps = EditorPluginProps<
  ImageGalleryPluginState,
  ImageGalleryConfig
>
