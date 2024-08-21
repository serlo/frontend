import { createContext, type Dispatch } from 'react'

import { imageGalleryPluginInitialState } from './state'
import type {
  ImageGalleryPluginActions,
  ImageGalleryPluginState,
} from './types'

export const ImageGalleryPluginContext = createContext<{
  imageGalleryPluginState: ImageGalleryPluginState
  imageGalleryPluginDispatch: Dispatch<ImageGalleryPluginActions>
}>({
  imageGalleryPluginState: imageGalleryPluginInitialState,
  imageGalleryPluginDispatch: () => null,
})
