import * as InternalPlugin from '../internal__plugin'
import { StateType } from './internal-plugin-state'

export type EditorPlugin<
  S extends StateType = StateType,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Config extends {} = {}
> = InternalPlugin.EditorPlugin<S, Config>
export type EditorPluginProps<
  S extends StateType = StateType,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Config extends {} = {}
> = InternalPlugin.EditorPluginProps<S, Config>
