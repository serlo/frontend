import { ImageEditor } from './editor'
import {
  EditorPlugin,
  EditorPluginProps,
  isTempFile,
  number,
  object,
  optional,
  string,
  upload,
  UploadHandler,
  UploadValidator,
  child,
} from '../../plugin'

const imageState = object({
  src: upload(''),
  link: optional(object({ href: string('') })),
  alt: optional(string('')),
  maxWidth: optional(number(0)),
  caption: optional(
    child({
      plugin: 'text',
      config: {
        formattingOptions: ['code', 'katex', 'links', 'math', 'richText'],
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
    onText(value) {
      if (/\.(jpe?g|png|bmp|gif|svg)$/.test(value.toLowerCase())) {
        return {
          state: {
            src: value,
            link: undefined,
            alt: undefined,
            maxWidth: undefined,
            caption: { plugin: 'text' },
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
              caption: { plugin: 'text' },
            },
          }
        }
      }
    },
    isEmpty: (serializedState) => {
      return (
        (!serializedState.src.value || isTempFile(serializedState.src.value)) &&
        (!serializedState.link.defined || !serializedState.link.href.value) &&
        (!serializedState.alt.defined || !serializedState.alt.value) &&
        (!serializedState.caption.defined || !serializedState.caption.get())
      )
    },
  }
}

export type ImageConfig = ImagePluginConfig
export type ImagePluginState = typeof imageState
export type ImageProps = EditorPluginProps<ImagePluginState, ImageConfig>

export interface ImagePluginConfig {
  upload: UploadHandler<string>
  validate: UploadValidator
}
