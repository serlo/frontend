import { RowsConfig, RowsPluginConfig } from '.'

export function useRowsConfig(config: RowsConfig): RowsPluginConfig {
  const { plugins } = config

  return {
    plugins,
  }
}
