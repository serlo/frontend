type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum ImageGalleryPluginActionTypes {
  START = 'START',
  SET_IMAGES = 'SET_IMAGES',
  OPEN_IMAGE_IN_MODAL = 'OPEN_IMAGE_IN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SET_VIEW = 'SET_VIEW',
}

export enum ImageGalleryPluginViewType {
  INIT = 'INIT', // Initial state, no images
  ADD_IMAGES = 'ADD_IMAGES', // Image selection screen
  GALLERY = 'GALLERY', // Image grid
}

interface ImageGalleryPluginPayload {
  [ImageGalleryPluginActionTypes.START]: null
  [ImageGalleryPluginActionTypes.SET_IMAGES]: null
  [ImageGalleryPluginActionTypes.OPEN_IMAGE_IN_MODAL]: {
    imageId: string
  }
  [ImageGalleryPluginActionTypes.CLOSE_MODAL]: null
  [ImageGalleryPluginActionTypes.SET_VIEW]: {
    view: ImageGalleryPluginViewType
  }
}

export type ImageGalleryPluginActions =
  ActionMap<ImageGalleryPluginPayload>[keyof ActionMap<ImageGalleryPluginPayload>]

export interface ImageGalleryPluginState {
  view: ImageGalleryPluginViewType
  isEditImageModalOpen: boolean
  isLightboxOpen: boolean
  selectedImageId?: string
}
