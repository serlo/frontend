import { SerloInjectionEditor } from './editor'
import { type EditorPlugin, type EditorPluginProps, string } from '../../plugin'

const state = string()

// as far as i know this is only used in edusharing right now
export function createSerloInjectionPlugin(
  config: SerloInjectionConfig = {}
): EditorPlugin<SerloInjectionPluginState, SerloInjectionConfig> {
  return {
    Component: SerloInjectionEditor,
    config,
    state,
  }
}

export interface SerloInjectionConfig {
  i18n?: Partial<SerloInjectionPluginConfig['i18n']>
}

export type SerloInjectionPluginState = typeof state

export interface SerloInjectionPluginConfig {
  i18n: {
    label: string
    placeholder: string
  }
}

export type SerloInjectionProps = EditorPluginProps<
  SerloInjectionPluginState,
  SerloInjectionConfig
>
