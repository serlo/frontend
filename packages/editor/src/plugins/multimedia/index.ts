import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { MultimediaEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  boolean,
  child,
  number,
  object,
} from '../../plugin'

const multimediaState = object({
  explanation: child({ plugin: EditorPluginType.Rows }),
  multimedia: child({ plugin: EditorPluginType.Image }),
  illustrating: boolean(true),
  width: number(50), // percent
})

export const multimediaPlugin: EditorPlugin<MultimediaPluginState> = {
  Component: MultimediaEditor,
  state: multimediaState,
}

export const articleIntroduction: EditorPlugin<MultimediaPluginState> = {
  Component: MultimediaEditor,
  state: object({
    explanation: child({ plugin: EditorPluginType.Text }),
    multimedia: child({ plugin: EditorPluginType.Image }),
    illustrating: boolean(true),
    width: number(50), // percent
  }),
}

export type MultimediaPluginState = typeof multimediaState

export type MultimediaProps = EditorPluginProps<MultimediaPluginState>
