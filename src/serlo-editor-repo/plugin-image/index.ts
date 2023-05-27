import {
  boolean,
  BooleanStateType,
  ChildStateType,
  EditorPlugin,
  EditorPluginProps,
  isTempFile,
  number,
  NumberStateType,
  object,
  ObjectStateType,
  optional,
  OptionalStateType,
  string,
  StringStateType,
  upload,
  UploadHandler,
  UploadStateType,
  UploadValidator,
  child,
} from '../plugin'
import { DeepPartial } from '../ui'
import { ImageEditor } from './editor'

/**
 * @param config - {@link ImageConfig | Plugin configuration}
 */
export function createImagePlugin(
  config: ImageConfig
): EditorPlugin<ImagePluginState, ImageConfig> {
  return {
    Component: ImageEditor,
    config,
    state: object({
      src: upload(''),
      link: optional(
        object({
          href: string(''),
          openInNewTab: boolean(false),
        })
      ),
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
    }),
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

export interface ImageConfig extends Omit<ImagePluginConfig, 'i18n'> {
  i18n?: DeepPartial<ImagePluginConfig['i18n']>
}

export type ImagePluginState = ObjectStateType<{
  src: UploadStateType<string>
  link: OptionalStateType<
    ObjectStateType<{
      href: StringStateType
      openInNewTab: BooleanStateType
    }>
  >
  alt: OptionalStateType<StringStateType>
  maxWidth: OptionalStateType<NumberStateType>
  caption: OptionalStateType<ChildStateType>
}>

export interface ImagePluginConfig {
  upload: UploadHandler<string>
  validate: UploadValidator
  secondInput?: 'description' | 'link'
  i18n: {
    label: string
    failedUploadMessage: string
    src: {
      label: string
      placeholder: {
        empty: string
        uploading: string
        failed: string
      }
      retryLabel: string
    }
    link: {
      href: {
        label: string
        placeholder: string
      }
      openInNewTab: {
        label: string
      }
    }
    alt: {
      label: string
      placeholder: string
    }
    maxWidth: {
      label: string
      placeholder: string
    }
    caption: {
      placeholder: string
    }
  }
}

export type ImageProps = EditorPluginProps<ImagePluginState, ImageConfig>
