import { StateType } from './internal-plugin-state'
import * as InternalPlugin from '../types/internal__plugin'

export type EditorPlugin<
  S extends StateType = StateType,
  Config extends {} = {}
> = InternalPlugin.EditorPlugin<S, Config>
export type EditorPluginProps<
  S extends StateType = StateType,
  Config extends {} = {}
> = InternalPlugin.EditorPluginProps<S, Config>
