import { RowsConfig, RowsPluginConfig } from '.'

export function useRowsConfig(config: RowsConfig): RowsPluginConfig {
  const { allowedPlugins, parentType } = config

  return {
    allowedPlugins,
    parentType,
  }
}
