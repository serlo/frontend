import { editorPlugins } from '@editor/package'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { showToastNotice } from '@serlo/frontend/src/helper/show-toast-notice'

import { ImageEditor } from './editor'
import type { FileError } from './image-with-serlo-config'
import {
  type EditorPlugin,
  type EditorPluginProps,
  type UploadHandler,
  type UploadValidator,
  child,
  isTempFile,
  number,
  object,
  optional,
  string,
  upload,
} from '../../plugin'

const imageState = object({
  src: upload(''),
  link: optional(object({ href: string('') })),
  alt: optional(string('')),
  maxWidth: optional(number(0)),
  caption: optional(
    child({
      plugin: EditorPluginType.Text,
      config: {
        noLinebreaks: true,
      },
    })
  ),
})

export function createImagePlugin(
  config: ImageConfig
): EditorPlugin<ImagePluginState, ImageConfig> {
  return {
    Component: ImageEditor,
    config,
    state: imageState,
    async onText(value) {
      // ==================
      // experimental feature: upload directly when pasting url from mathpix
      // could maybe be used for all image urls in the future
      if (value.startsWith('![](https://cdn.mathpix.com')) {
        const imageUrl = value.substring(4, value.length - 1)
        const proxyUrl = '/api/frontend/mathpix-image-proxy?imageUrl='

        try {
          const response = await fetch(proxyUrl + imageUrl)
          const blob = await response.blob()
          const imagePlugin = editorPlugins.getByType('image')
          if (imagePlugin.onFiles)
            imagePlugin.onFiles([
              new File([blob], `image.${blob.type.split('/')[1]}`),
            ])
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err)
        }
      }
      // ==================
      if (/\.(gif|jpe?g|png|svg|webp)$/.test(value.toLowerCase())) {
        return {
          state: {
            src: value,
            link: undefined,
            alt: undefined,
            maxWidth: undefined,
            caption: { plugin: EditorPluginType.Text },
          },
        }
      }
    },
    onFiles(files) {
      if (files.length === 1) {
        const file = files[0]
        const validation = config.validate(file)
        if (validation.valid) {
          return {
            state: {
              src: { pending: files[0] },
              link: undefined,
              alt: undefined,
              maxWidth: undefined,
              caption: { plugin: EditorPluginType.Text },
            },
          }
        } else {
          for (const error of validation.errors) showToastNotice(error.message)
        }
      }
    },
    isEmpty: (staticState) => {
      return (
        (!staticState.src.value || isTempFile(staticState.src.value)) &&
        (!staticState.link.defined || !staticState.link.href.value) &&
        (!staticState.alt.defined || !staticState.alt.value)
      )
    },
  }
}

export type ImageConfig = ImagePluginConfig
export type ImagePluginState = typeof imageState
export type ImageProps = EditorPluginProps<ImagePluginState, ImageConfig>

export interface ImagePluginConfig {
  upload: UploadHandler<string>
  validate: UploadValidator<FileError[]>
}
