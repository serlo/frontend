import { ImageGalleryPluginState, ImageGalleryPluginViewType } from './types'

export const imageGalleryPluginInitialState: ImageGalleryPluginState = {
  view: ImageGalleryPluginViewType.INIT,
  isEditImageModalOpen: false,
  isLightboxOpen: false,
}
