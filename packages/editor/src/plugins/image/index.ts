import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { showToastNotice } from '@serlo/frontend/src/helper/show-toast-notice'
import type { FileError } from '@serlo/frontend/src/serlo-editor-integration/image-with-serlo-config'

import { ImageEditor } from './editor'
import { isImageUrl } from './utils/check-image-url'
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
  imageSource: optional(string('')),
  licence: optional(string('')),
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
          const response = await fetch(proxyUrl + encodeURIComponent(imageUrl))
          const blob = await response.blob()
          const { type } = blob
          const imagePlugin = editorPlugins.getByType('image')
          if (imagePlugin.onFiles) {
            return imagePlugin.onFiles([
              new File([blob], `image.${blob.type.split('/')[1]}`, {
                type,
              }),
            ])
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err)
        }
      }
      // ==================
      if (isImageUrl(value.toLowerCase())) {
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
              licence: undefined,
              imageSource: undefined,
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
  multiple?: boolean
  disableFileUpload?: boolean // HACK: Temporary solution to make image plugin available in Moodle & Chancenwerk integration with file upload disabled.
  upload: UploadHandler<string>
  validate: UploadValidator<FileError[]>
}
