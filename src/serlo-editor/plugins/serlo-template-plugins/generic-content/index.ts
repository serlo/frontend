import { GenericContentTypeEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  object,
} from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

const state = object({
  // Content is mandatory, everything else needs to be optional
  content: child({ plugin: EditorPluginType.Rows }),
})

export type GenericContentTypePluginState = typeof state
export type GenericContentTypePluginProps =
  EditorPluginProps<GenericContentTypePluginState>

/**
 * A generic content plugin. As opposed to other content types like 'article' that must contain additional information like 'title', 'id', ... this plugin must only contain a rows plugin containing the content. There can be additional properties but they are optional.
 */
export const genericContentTypePlugin: EditorPlugin<GenericContentTypePluginState> =
  {
    Component: GenericContentTypeEditor,
    state: state,
    config: {},
  }
