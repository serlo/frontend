import { type ReactNode, useReducer } from 'react'

import { ImageGalleryPluginContext } from './context'
import { imageGalleryPluginReducer } from './reducer'
import { imageGalleryPluginInitialState } from './state'

interface ImageGalleryPluginProviderProps {
  children: ReactNode
}

export const ImageGalleryPluginProvider = (
  props: ImageGalleryPluginProviderProps
) => {
  const { children } = props

  const [initialState, imageGalleryPluginDispatch] = useReducer(
    imageGalleryPluginReducer,
    imageGalleryPluginInitialState
  )

  const imageGalleryPluginState = {
    ...initialState,
  }

  return (
    <ImageGalleryPluginContext.Provider
      value={{ imageGalleryPluginState, imageGalleryPluginDispatch }}
    >
      {children}
    </ImageGalleryPluginContext.Provider>
  )
}
