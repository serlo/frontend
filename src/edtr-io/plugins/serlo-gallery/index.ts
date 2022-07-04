import {
  EditorPlugin,
  object,
  EditorPluginProps,
  child,
  list,
} from '@edtr-io/plugin'

import { SerloGalleryEditor } from './editor'

export const serloGalleryState = object({
  images: list(
    child({
      plugin: 'image',
    }),
    2
  ),
})

export type SerloGalleryPluginState = typeof serloGalleryState
export type SerloGalleryPluginProps = EditorPluginProps<SerloGalleryPluginState>

export function createSerloGalleryPlugin(): EditorPlugin<SerloGalleryPluginState> {
  return {
    Component: SerloGalleryEditor,
    config: {},
    state: serloGalleryState,
  }
}
