import {
  ImageGalleryPluginActionTypes,
  ImageGalleryPluginViewType,
  type ImageGalleryPluginActions,
  type ImageGalleryPluginState,
} from './types'

export const imageGalleryPluginReducer = (
  state: ImageGalleryPluginState,
  action: ImageGalleryPluginActions
) => {
  switch (action.type) {
    case ImageGalleryPluginActionTypes.START:
      return {
        ...state,
        view: ImageGalleryPluginViewType.ADD_IMAGES,
        isEditImageModalOpen: false,
      }
    case ImageGalleryPluginActionTypes.SET_IMAGES:
      return {
        ...state,
        view: ImageGalleryPluginViewType.GALLERY,
        isEditImageModalOpen: false,
      }
    case ImageGalleryPluginActionTypes.OPEN_IMAGE_IN_MODAL:
      return {
        ...state,
        isEditImageModalOpen: true,
        selectedImageId: action.payload.imageId,
      }
    case ImageGalleryPluginActionTypes.CLOSE_MODAL:
      return {
        ...state,
        isEditImageModalOpen: false,
      }
    case ImageGalleryPluginActionTypes.SET_VIEW:
      return {
        ...state,
        view: action.payload.view,
      }
  }
}
