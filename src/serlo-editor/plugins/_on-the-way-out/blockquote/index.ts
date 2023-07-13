import { BlockquoteRenderer } from './renderer'
import {
  child,
  ChildStateType,
  ChildStateTypeConfig,
  EditorPlugin,
  EditorPluginProps,
} from '../../../plugin'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const defaultConfig: BlockquoteConfig = {
  content: { plugin: EditorPluginType.Text },
}

export function createBlockquotePlugin(
  config = defaultConfig
): EditorPlugin<BlockquotePluginState> {
  return {
    Component: BlockquoteRenderer,
    config: {},
    state: createState(),
  }

  function createState() {
    return child(config.content)
  }
}

export interface BlockquoteConfig {
  content: ChildStateTypeConfig
}

export type BlockquotePluginState = ChildStateType

export type BlockquoteProps = EditorPluginProps<BlockquotePluginState>
