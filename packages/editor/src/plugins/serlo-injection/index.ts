import { SerloInjectionEditor } from './editor'
import { type EditorPlugin, type EditorPluginProps, string } from '../../plugin'

const state = string()

export function createSerloInjectionPlugin(
  config: SerloInjectionConfig = {}
): EditorPlugin<SerloInjectionPluginState, SerloInjectionConfig> {
  return {
    Component: SerloInjectionEditor,
    config,
    state,
    defaultTitle: 'serlo.org Inhalt',
    defaultDescription: 'Inhalte von serlo.org einbinden',
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
