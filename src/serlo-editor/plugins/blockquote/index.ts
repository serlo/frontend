import {
  child,
  ChildStateType,
  ChildStateTypeConfig,
  EditorPlugin,
  EditorPluginProps,
} from '../../plugin'
import { BlockquoteRenderer } from './renderer'

/**
 * @param config - {@link BlockquoteConfig | Plugin configuration}
 */
export function createBlockquotePlugin(
  config: BlockquoteConfig
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
